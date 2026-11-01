import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { OfflineSyncBar } from './components/common/OfflineSyncBar';
import { RegistrarPortal } from './components/registrar/RegistrarPortal';
import { StudentVault } from './components/student/StudentVault';
import { RegulatorWatchtower } from './components/regulator/RegulatorWatchtower';
import { VerifierPortal } from './components/verifier/VerifierPortal';
import { PythonRulesEngine } from './components/rules/PythonRulesEngine';
import { AuditTrailLedger } from './components/audit/AuditTrailLedger';
import { AicteSaathi } from './components/assistant/AicteSaathi';
import { 
  INITIAL_STUDENTS, 
  INITIAL_QUOTA_CAPS, 
  INITIAL_CONCURRENCY_ALERTS, 
  INITIAL_DPDP_CONSENTS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { 
  StudentRecord, 
  QuotaCap, 
  ConcurrencyAlert, 
  DpdpConsentToken, 
  AuditTrailEntry, 
  OfflineMutation, 
  RoleType 
} from './types';
import { simulateSha256 } from './utils/helpers';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('trueroll_theme') !== 'light';
    } catch {
      return true;
    }
  });

  // Navigation & Role states
  const [currentTab, setCurrentTab] = useState<string>('registrar');
  const [activeRole, setActiveRole] = useState<RoleType>('REGISTRAR');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  // Core Data States
  const [students, setStudents] = useState<StudentRecord[]>(INITIAL_STUDENTS);
  const [currentStudent, setCurrentStudent] = useState<StudentRecord>(INITIAL_STUDENTS[0]);
  const [quotaCaps, setQuotaCaps] = useState<QuotaCap[]>(INITIAL_QUOTA_CAPS);
  const [concurrencyAlerts, setConcurrencyAlerts] = useState<ConcurrencyAlert[]>(INITIAL_CONCURRENCY_ALERTS);
  const [consentTokens, setConsentTokens] = useState<DpdpConsentToken[]>(INITIAL_DPDP_CONSENTS);
  const [auditLogs, setAuditLogs] = useState<AuditTrailEntry[]>(INITIAL_AUDIT_LOGS);

  // Offline / Low-Bandwidth Mode Simulation
  const [isOffline, setIsOffline] = useState(false);
  const [offlineQueue, setOfflineQueue] = useState<OfflineMutation[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Verifier quick-fill state
  const [verifierTargetApaar, setVerifierTargetApaar] = useState<string>('');

  // Sync theme changes to html element & localStorage
  const handleToggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('trueroll_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('trueroll_theme', 'light');
      }
    } catch (e) {}
  };

  // Toggle Low-Bandwidth Offline Mode
  const handleToggleOffline = () => {
    setIsOffline(prev => !prev);
  };

  // Sync Offline Queue
  const handleSyncNow = () => {
    if (offlineQueue.length === 0) return;
    setIsSyncing(true);

    setTimeout(() => {
      // Create audit logs for synced items
      const newLogs: AuditTrailEntry[] = offlineQueue.map((item, idx) => ({
        id: `LOG-${Date.now() + idx}`,
        blockNumber: (auditLogs[0]?.blockNumber || 10492) + idx + 1,
        timestamp: new Date().toLocaleString() + ' IST',
        actor: 'Offline Tier-3 Sync Agent',
        actorRole: 'SYSTEM_RULES_ENGINE',
        action: `OFFLINE_SYNC_${item.type}`,
        entityId: item.payload?.apaarId || 'MUTATION_QUEUE',
        ipAddress: '192.168.1.104 (INDEXED_DB_LOCAL)',
        prevHash: auditLogs[0]?.currentHash || '000000',
        currentHash: simulateSha256(`sync_${item.id}_${Date.now()}`),
        status: 'VALID'
      }));

      setAuditLogs(prev => [...newLogs, ...prev]);
      setOfflineQueue([]);
      setIsSyncing(false);
      setIsOffline(false);

      try {
        confetti({
          particleCount: 60,
          spread: 80,
          origin: { y: 0.3 }
        });
      } catch (e) {}
    }, 1200);
  };

  // Add Student Handler
  const handleAddStudent = (newStudent: StudentRecord) => {
    setStudents(prev => [newStudent, ...prev]);

    // Update Quota Count for the branch
    setQuotaCaps(prev =>
      prev.map(q => {
        if (q.branchName === newStudent.branch) {
          const nextCount = q.admittedCount + 1;
          return {
            ...q,
            admittedCount: nextCount,
            status: nextCount > q.approvedIntake ? 'OVER_CAPACITY' : 'COMPLIANT'
          };
        }
        return q;
      })
    );

    // If offline, queue mutation
    if (isOffline) {
      const mutation: OfflineMutation = {
        id: `MUT-${Date.now()}`,
        type: 'ENROLL_STUDENT',
        payload: newStudent,
        timestamp: new Date().toISOString(),
        synced: false
      };
      setOfflineQueue(prev => [...prev, mutation]);
    } else {
      // Add immediately to audit log
      const newLog: AuditTrailEntry = {
        id: `LOG-${Date.now()}`,
        blockNumber: (auditLogs[0]?.blockNumber || 10492) + 1,
        timestamp: new Date().toLocaleString() + ' IST',
        actor: 'Prof. Rajeshwar K. Sharma (Registrar)',
        actorRole: 'REGISTRAR',
        action: 'STUDENT_ENROLLMENT_VERIFIED',
        entityId: newStudent.apaarId,
        ipAddress: '14.139.224.18 (DELHI-CAMPUS)',
        prevHash: auditLogs[0]?.currentHash || '000000',
        currentHash: simulateSha256(newStudent.apaarId + Date.now()),
        status: 'VALID'
      };
      setAuditLogs(prev => [newLog, ...prev]);
    }
  };

  // Update Student Handler
  const handleUpdateStudent = (updated: StudentRecord) => {
    setStudents(prev => prev.map(s => (s.id === updated.id ? updated : s)));
    if (currentStudent.id === updated.id) {
      setCurrentStudent(updated);
    }

    const newLog: AuditTrailEntry = {
      id: `LOG-${Date.now()}`,
      blockNumber: (auditLogs[0]?.blockNumber || 10492) + 1,
      timestamp: new Date().toLocaleString() + ' IST',
      actor: 'Prof. Rajeshwar K. Sharma (Registrar)',
      actorRole: 'REGISTRAR',
      action: 'STUDENT_RECORD_RECONCILED',
      entityId: updated.apaarId,
      ipAddress: '14.139.224.18',
      prevHash: auditLogs[0]?.currentHash || '000000',
      currentHash: simulateSha256(updated.fullName + Date.now()),
      status: 'VALID'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Resolve Concurrency Alert Handler
  const handleResolveAlert = (id: string, resolution: 'REVOKED' | 'NOC') => {
    setConcurrencyAlerts(prev =>
      prev.map(a => {
        if (a.id === id) {
          return {
            ...a,
            status: resolution === 'REVOKED' ? 'RESOLVED_SEAT_RELEASED' : 'NOC_TRANSFERRED',
            penaltyStatus: resolution === 'REVOKED' ? 'Seat Released Back to Pool' : 'Inter-State NOC Approved'
          };
        }
        return a;
      })
    );

    // Also update student if matching
    const targetAlert = concurrencyAlerts.find(a => a.id === id);
    if (targetAlert) {
      setStudents(prev =>
        prev.map(s => {
          if (s.apaarId === targetAlert.apaarId) {
            return {
              ...s,
              status: 'VERIFIED',
              concurrencyDetails: undefined
            };
          }
          return s;
        })
      );
    }

    const newLog: AuditTrailEntry = {
      id: `LOG-${Date.now()}`,
      blockNumber: (auditLogs[0]?.blockNumber || 10492) + 1,
      timestamp: new Date().toLocaleString() + ' IST',
      actor: 'AICTE Central Enforcement Directorate',
      actorRole: 'AICTE_REGULATOR',
      action: `CONCURRENCY_ALERT_${resolution}`,
      entityId: id,
      ipAddress: '164.100.158.40',
      prevHash: auditLogs[0]?.currentHash || '000000',
      currentHash: simulateSha256(`conc_${id}_${Date.now()}`),
      status: 'VALID'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Add DPDP Consent Token
  const handleAddConsentToken = (token: DpdpConsentToken) => {
    setConsentTokens(prev => [token, ...prev]);
    const newLog: AuditTrailEntry = {
      id: `LOG-${Date.now()}`,
      blockNumber: (auditLogs[0]?.blockNumber || 10492) + 1,
      timestamp: new Date().toLocaleString() + ' IST',
      actor: `${currentStudent.fullName} (Student)`,
      actorRole: 'STUDENT',
      action: 'DPDP_CONSENT_ISSUED',
      entityId: token.tokenHash,
      ipAddress: '49.36.112.44',
      prevHash: auditLogs[0]?.currentHash || '000000',
      currentHash: simulateSha256(token.id + Date.now()),
      status: 'VALID'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Revoke DPDP Consent Token
  const handleRevokeConsentToken = (id: string) => {
    setConsentTokens(prev =>
      prev.map(t => (t.id === id ? { ...t, status: 'REVOKED' } : t))
    );
    const newLog: AuditTrailEntry = {
      id: `LOG-${Date.now()}`,
      blockNumber: (auditLogs[0]?.blockNumber || 10492) + 1,
      timestamp: new Date().toLocaleString() + ' IST',
      actor: `${currentStudent.fullName} (Student)`,
      actorRole: 'STUDENT',
      action: 'DPDP_CONSENT_REVOKED',
      entityId: id,
      ipAddress: '49.36.112.44',
      prevHash: auditLogs[0]?.currentHash || '000000',
      currentHash: simulateSha256(`revoke_${id}_${Date.now()}`),
      status: 'VALID'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Navigation callbacks
  const handleSelectStudentForVault = (student: StudentRecord) => {
    setCurrentStudent(student);
    setActiveRole('STUDENT');
    setCurrentTab('student');
  };

  const handleNavigateToVerifier = (apaarId: string) => {
    setVerifierTargetApaar(apaarId);
    setActiveRole('VERIFIER');
    setCurrentTab('verifier');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#060D17] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Navbar adhering to the strict 3-zone Top Bar Contract */}
      <Navbar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        activeRole={activeRole}
        onRoleChange={setActiveRole}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        isOffline={isOffline}
        onToggleOffline={handleToggleOffline}
        offlineQueueCount={offlineQueue.length}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      {/* Offline Sync Bar (Feature #5) */}
      <OfflineSyncBar
        isOffline={isOffline}
        offlineQueue={offlineQueue}
        onSyncNow={handleSyncNow}
        isSyncing={isSyncing}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {currentTab === 'registrar' && (
          <RegistrarPortal
            students={students}
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            quotaCaps={quotaCaps}
            concurrencyAlerts={concurrencyAlerts}
            onSelectStudentForVault={handleSelectStudentForVault}
            onNavigateToVerifier={handleNavigateToVerifier}
          />
        )}

        {currentTab === 'student' && (
          <StudentVault
            currentStudent={currentStudent}
            allStudents={students}
            onSelectStudent={setCurrentStudent}
            consentTokens={consentTokens}
            onAddConsentToken={handleAddConsentToken}
            onRevokeConsentToken={handleRevokeConsentToken}
            onNavigateToVerifier={handleNavigateToVerifier}
          />
        )}

        {currentTab === 'regulator' && (
          <RegulatorWatchtower
            concurrencyAlerts={concurrencyAlerts}
            onResolveAlert={handleResolveAlert}
            students={students}
          />
        )}

        {currentTab === 'verifier' && (
          <VerifierPortal
            students={students}
            initialApaarId={verifierTargetApaar}
          />
        )}

        {currentTab === 'rules' && <PythonRulesEngine />}

        {currentTab === 'audit' && <AuditTrailLedger logs={auditLogs} />}
      </main>

      {/* Floating AI Vernacular Assistant (Feature #7) */}
      <AicteSaathi
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
      />

      {/* Trigger button for Assistant when closed */}
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold text-xs shadow-xl transition-all cursor-pointer border border-amber-400/40"
          title="Open AICTE Saathi Assistant"
        >
          <Sparkles className="w-4 h-4" />
          <span>AICTE Saathi</span>
        </button>
      )}

      {/* Official AICTE / MoE Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#07111E] py-6 px-4 text-xs text-slate-500 dark:text-slate-400 no-print transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/src/assets/images/aicte_emblem_seal_1793498042956.jpg" 
              alt="AICTE Seal" 
              className="w-6 h-6 rounded-full opacity-80"
            />
            <span>
              Smart India Hackathon SIH26263 Prototype · All India Council for Technical Education (AICTE) & Ministry of Education
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span>DPDP Act 2023 Compliant</span>
            <span>·</span>
            <span>DigiLocker / ABC API Gateway v2.4</span>
            <span>·</span>
            <span className="font-mono text-slate-400">SHA-256 Hash Verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
