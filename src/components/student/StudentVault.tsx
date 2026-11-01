import React, { useState } from 'react';
import { 
  CreditCard, 
  Shield, 
  Lock, 
  RotateCw, 
  Download, 
  CheckCircle2, 
  Clock, 
  Share2, 
  Trash2, 
  Plus, 
  Key, 
  Eye, 
  BookOpen, 
  Award, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { 
  StudentRecord, 
  DpdpConsentToken, 
  AbcCreditCourse 
} from '../../types';
import { QrCodeCard } from '../common/QrCodeCard';
import { STUDENT_ABC_COURSES } from '../../data/mockData';
import confetti from 'canvas-confetti';

interface StudentVaultProps {
  currentStudent: StudentRecord;
  allStudents: StudentRecord[];
  onSelectStudent: (student: StudentRecord) => void;
  consentTokens: DpdpConsentToken[];
  onAddConsentToken: (token: DpdpConsentToken) => void;
  onRevokeConsentToken: (id: string) => void;
  onNavigateToVerifier: (apaarId: string) => void;
}

export const StudentVault: React.FC<StudentVaultProps> = ({
  currentStudent,
  allStudents,
  onSelectStudent,
  consentTokens,
  onAddConsentToken,
  onRevokeConsentToken,
  onNavigateToVerifier
}) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isSyncingDigiLocker, setIsSyncingDigiLocker] = useState(false);
  const [isNewConsentModalOpen, setIsNewConsentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'CARD' | 'ABC_CREDITS' | 'DPDP_PRIVACY'>('CARD');

  // New Consent Form State
  const [newVerifierName, setNewVerifierName] = useState('Google India Technical Hiring');
  const [newOrg, setNewOrg] = useState('Google India Pvt Ltd');
  const [newPurpose, setNewPurpose] = useState<DpdpConsentToken['purpose']>('EMPLOYMENT_SCREENING');
  const [newScope, setNewScope] = useState<DpdpConsentToken['scope']>('FULL_TRANSCRIPT');
  const [newValidityDays, setNewValidityDays] = useState(7);

  // Trigger DigiLocker Real-time Sync Simulation
  const handleSyncDigiLocker = () => {
    setIsSyncingDigiLocker(true);
    setTimeout(() => {
      setIsSyncingDigiLocker(false);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1200);
  };

  // Create Ephemeral DPDP Consent Token
  const handleCreateToken = (e: React.FormEvent) => {
    e.preventDefault();
    const tokenHash = `tok_live_${Math.random().toString(36).substring(2, 12)}${Date.now().toString(36)}`;
    const now = new Date();
    const expires = new Date(now.getTime() + newValidityDays * 24 * 60 * 60 * 1000);

    const token: DpdpConsentToken = {
      id: `CONSENT-${Math.floor(1000 + Math.random() * 9000)}`,
      verifierName: newVerifierName,
      organization: newOrg,
      purpose: newPurpose,
      scope: newScope,
      tokenHash,
      issuedAt: now.toLocaleString(),
      expiresAt: expires.toLocaleString(),
      status: 'ACTIVE',
      accessCount: 0
    };

    onAddConsentToken(token);
    setIsNewConsentModalOpen(false);
    setActiveTab('DPDP_PRIVACY');
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Student Profile Quick Switcher */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          {currentStudent.photoUrl ? (
            <img 
              src={currentStudent.photoUrl} 
              alt={currentStudent.fullName} 
              className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-lg flex items-center justify-center border border-blue-500/30">
              {currentStudent.fullName.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {currentStudent.fullName}
              </h2>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                DigiLocker Authenticated
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
              APAAR: {currentStudent.apaarId} · {currentStudent.branch} (Sem {currentStudent.semester})
            </p>
          </div>
        </div>

        {/* Switch Student Dropdown to test different students */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <label className="text-xs text-slate-500 whitespace-nowrap">Switch Demo Profile:</label>
          <select
            value={currentStudent.id}
            onChange={e => {
              const found = allStudents.find(s => s.id === e.target.value);
              if (found) onSelectStudent(found);
            }}
            className="px-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
          >
            {allStudents.map(stu => (
              <option key={stu.id} value={stu.id}>
                {stu.fullName} ({stu.apaarId.slice(0, 4)}...) - {stu.status}
              </option>
            ))}
          </select>

          <button
            onClick={handleSyncDigiLocker}
            disabled={isSyncingDigiLocker}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer shrink-0"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isSyncingDigiLocker ? 'animate-spin' : ''}`} />
            {isSyncingDigiLocker ? 'Syncing...' : 'Sync ABC Credits'}
          </button>
        </div>
      </div>

      {/* Vault Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('CARD')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'CARD'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <CreditCard className="w-3.5 h-3.5" />
          Virtual APAAR ID Card
        </button>

        <button
          onClick={() => setActiveTab('ABC_CREDITS')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'ABC_CREDITS'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          Academic Bank of Credits (ABC)
          <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {currentStudent.abcCredits} Credits
          </span>
        </button>

        <button
          onClick={() => setActiveTab('DPDP_PRIVACY')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'DPDP_PRIVACY'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          DPDP Privacy Vault & Consent
          <span className="bg-white/20 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {consentTokens.filter(t => t.status === 'ACTIVE').length} Active
          </span>
        </button>
      </div>

      {/* TAB 1: VIRTUAL APAAR ID CARD */}
      {activeTab === 'CARD' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Card Presentation Container */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {/* The 3D Flip Card */}
            <div 
              className="w-full max-w-md perspective-1000 select-none cursor-pointer"
              onClick={() => setIsCardFlipped(!isCardFlipped)}
            >
              {!isCardFlipped ? (
                /* CARD FRONT */
                <div className="w-full aspect-[1.586/1] rounded-2xl p-5 bg-gradient-to-br from-[#0B1E38] via-[#0A192F] to-[#071324] text-white shadow-2xl border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between">
                  {/* Hologram / Guilloche micro-pattern background */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FF9933_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Top National Ribbon */}
                  <div className="flex items-center justify-between border-b border-amber-500/30 pb-2 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <img 
                        src="/src/assets/images/aicte_emblem_seal_1793498042956.jpg" 
                        alt="Emblem" 
                        className="w-8 h-8 rounded-full border border-amber-400/50 object-cover shrink-0"
                      />
                      <div>
                        <div className="text-[10px] font-bold text-amber-400 uppercase tracking-widest leading-none">
                          GOVERNMENT OF INDIA
                        </div>
                        <div className="text-[9px] text-slate-300 font-medium">
                          Ministry of Education · AICTE
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-black tracking-widest text-amber-400 font-mono">
                        APAAR CARD
                      </span>
                      <div className="text-[8px] text-emerald-400 font-semibold uppercase">
                        One Nation, One Student ID
                      </div>
                    </div>
                  </div>

                  {/* Student Center Info */}
                  <div className="grid grid-cols-12 gap-3 items-center my-1 relative z-10">
                    {/* Student Photo */}
                    <div className="col-span-4 flex flex-col items-center">
                      {currentStudent.photoUrl ? (
                        <img 
                          src={currentStudent.photoUrl} 
                          alt={currentStudent.fullName} 
                          className="w-24 h-24 rounded-lg object-cover border-2 border-amber-400/60 shadow-md"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-lg bg-amber-500/20 text-amber-400 border-2 border-amber-400/60 font-bold text-3xl flex items-center justify-center">
                          {currentStudent.fullName.charAt(0)}
                        </div>
                      )}
                      <span className="text-[8px] font-mono text-slate-400 mt-1 uppercase">
                        DOB: {currentStudent.dob}
                      </span>
                    </div>

                    {/* Student Fields */}
                    <div className="col-span-5 space-y-1 text-left">
                      <div>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block">
                          Student Name
                        </span>
                        <div className="text-sm font-bold text-white tracking-tight truncate">
                          {currentStudent.fullName}
                        </div>
                      </div>

                      <div>
                        <span className="text-[8px] text-slate-400 uppercase tracking-wider block">
                          Institute Name
                        </span>
                        <div className="text-[10px] font-medium text-slate-200 line-clamp-2">
                          {currentStudent.collegeName}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1 text-[9px]">
                        <div>
                          <span className="text-[7px] text-slate-400 uppercase block">Gender</span>
                          <span className="font-semibold text-slate-200">{currentStudent.gender}</span>
                        </div>
                        <div>
                          <span className="text-[7px] text-slate-400 uppercase block">Blood Grp</span>
                          <span className="font-semibold text-amber-300">{currentStudent.bloodGroup}</span>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Vector QR Code */}
                    <div className="col-span-3 flex justify-end">
                      <QrCodeCard
                        payload={`https://trueroll.gov.in/verify/${currentStudent.apaarId}?hash=${currentStudent.verificationHash}`}
                        size={84}
                        label=""
                      />
                    </div>
                  </div>

                  {/* Bottom APAAR ID Big Barcode/Format */}
                  <div className="border-t border-amber-500/30 pt-2 flex items-center justify-between relative z-10">
                    <div>
                      <span className="text-[8px] text-amber-400 uppercase font-mono tracking-wider block">
                        AUTOMATED PERMANENT ACADEMIC ACCOUNT REGISTRY (APAAR)
                      </span>
                      <div className="text-base font-black tracking-widest font-mono text-white mt-0.5">
                        {currentStudent.apaarId}
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[8px] text-slate-400 uppercase font-mono block">
                        UDISE+ PEN
                      </span>
                      <div className="text-xs font-bold font-mono text-slate-300">
                        {currentStudent.udisePen}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* CARD BACK */
                <div className="w-full aspect-[1.586/1] rounded-2xl p-5 bg-gradient-to-br from-[#0A192F] via-[#071324] to-[#050C16] text-white shadow-2xl border-2 border-amber-500/40 relative overflow-hidden flex flex-col justify-between">
                  <div className="border-b border-slate-700 pb-2 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                      NATIONAL ACADEMIC BANK OF CREDITS (ABC)
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      ID: {currentStudent.abcAccountId}
                    </span>
                  </div>

                  <div className="space-y-2 text-[10px] text-slate-300 leading-relaxed">
                    <p>
                      1. This APAAR ID is a permanent digital identity issued under the National Education Policy (NEP 2020) and AICTE TrueRoll Protocol.
                    </p>
                    <p>
                      2. Real-time academic credit records and verified credentials are authenticated via DigiLocker and National Academic Depository (NAD).
                    </p>
                    <p>
                      3. Data access is governed by the Digital Personal Data Protection (DPDP) Act 2023. Unauthorized tampering is punishable under the IT Act 2000.
                    </p>
                  </div>

                  <div className="border-t border-slate-700 pt-2 flex items-center justify-between text-[9px] text-slate-400 font-mono">
                    <span>Tamper Hash: {currentStudent.verificationHash.slice(0, 16)}...</span>
                    <span className="text-amber-400 font-semibold">Tap to flip back</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={() => setIsCardFlipped(!isCardFlipped)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer shadow-xs"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Flip to {isCardFlipped ? 'Front' : 'Back'}
              </button>

              <button
                onClick={handlePrintCard}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-xs cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>

              <button
                onClick={() => onNavigateToVerifier(currentStudent.apaarId)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Simulate Instant Verification
              </button>
            </div>
          </div>

          {/* Quick Stats & Security Summary */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
                <Shield className="w-4 h-4 text-emerald-500" />
                Verified Identity Attestation
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">DigiLocker Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Linked & Verified
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Academic Bank of Credits</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {currentStudent.abcCredits} / 160 Credits
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">Anti-Seat Hoarding Check</span>
                  <span className={`font-semibold flex items-center gap-1 ${currentStudent.status === 'FLAGGED_CONCURRENCY' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {currentStudent.status === 'FLAGGED_CONCURRENCY' ? 'Multi-College Collision' : 'Zero Collisions (100% Unique)'}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500">DPDP Consent Tokens</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">
                    {consentTokens.filter(t => t.status === 'ACTIVE').length} Active Verifier(s)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Share Token Banner */}
            <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-xl p-4 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-300">
                <Share2 className="w-4 h-4 text-blue-500" />
                Need to share credentials with an employer?
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Generate a time-bound, cryptographic token complying with the Digital Personal Data Protection Act 2023. You can revoke access at any second.
              </p>
              <button
                onClick={() => setIsNewConsentModalOpen(true)}
                className="mt-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs cursor-pointer inline-flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Issue Ephemeral Access Token
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ACADEMIC BANK OF CREDITS (ABC) LEDGER */}
      {activeTab === 'ABC_CREDITS' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  Academic Bank of Credits (ABC) Repository
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  National NEP 2020 Credit Framework · Official Linked ABC Account: <strong className="font-mono text-slate-900 dark:text-white">{currentStudent.abcAccountId}</strong>
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-emerald-500">
                    {currentStudent.abcCredits}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                    Total Earned Credits
                  </div>
                </div>
              </div>
            </div>

            {/* Courses Table */}
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">Course Code & Title</th>
                    <th className="py-2.5 px-3">Accredited Institution</th>
                    <th className="py-2.5 px-3">Semester</th>
                    <th className="py-2.5 px-3">Credits</th>
                    <th className="py-2.5 px-3">Grade</th>
                    <th className="py-2.5 px-3 text-right">DigiLocker Seal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {STUDENT_ABC_COURSES.map((course, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-white font-sans">
                          {course.courseTitle}
                        </div>
                        <div className="text-[11px] text-slate-500">{course.courseCode}</div>
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-700 dark:text-slate-300">
                        {course.institution}
                      </td>
                      <td className="py-3 px-3 font-sans text-slate-500">{course.semester}</td>
                      <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                        {course.creditsEarned}
                      </td>
                      <td className="py-3 px-3 font-bold text-amber-500">{course.grade}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-sans font-semibold">
                          <CheckCircle2 className="w-3 h-3" />
                          DigiLocker Signed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DPDP ACT 2023 PRIVACY VAULT & CONSENT MANAGER */}
      {activeTab === 'DPDP_PRIVACY' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-indigo-500" />
                  DPDP Act 2023 Consent Manager
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  You have constitutional authority over your academic data. Issue, monitor, or revoke third-party verification tokens at any time.
                </p>
              </div>

              <button
                onClick={() => setIsNewConsentModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                Issue New Ephemeral Token
              </button>
            </div>

            {/* Consent Tokens List */}
            <div className="mt-5 space-y-3">
              {consentTokens.map(token => {
                const isActive = token.status === 'ACTIVE';

                return (
                  <div
                    key={token.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isActive
                        ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                        : 'border-slate-200/50 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/20 opacity-70'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {token.verifierName}
                          </h4>
                          <span className="text-[11px] font-mono text-slate-500">
                            ({token.organization})
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isActive
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                              : 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20'
                          }`}>
                            {token.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                          <span>Purpose: <strong className="text-slate-700 dark:text-slate-300">{token.purpose.replace(/_/g, ' ')}</strong></span>
                          <span>·</span>
                          <span>Scope: <strong className="text-slate-700 dark:text-slate-300">{token.scope.replace(/_/g, ' ')}</strong></span>
                          <span>·</span>
                          <span>Expires: <strong className="font-mono text-slate-700 dark:text-slate-300">{token.expiresAt}</strong></span>
                        </div>

                        <div className="font-mono text-[11px] text-slate-400 mt-2 flex items-center gap-2">
                          <Key className="w-3 h-3 text-amber-500" />
                          <span>Token: {token.tokenHash}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isActive && (
                          <button
                            onClick={() => onRevokeConsentToken(token.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Revoke Access
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW CONSENT MODAL */}
      {isNewConsentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              Issue DPDP-Compliant Verification Token
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Grant strictly scoped, time-bound read access to an employer or admission authority.
            </p>

            <form onSubmit={handleCreateToken} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Verifier Name / Department
                </label>
                <input
                  type="text"
                  required
                  value={newVerifierName}
                  onChange={e => setNewVerifierName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Organization / Entity
                </label>
                <input
                  type="text"
                  required
                  value={newOrg}
                  onChange={e => setNewOrg(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Purpose
                  </label>
                  <select
                    value={newPurpose}
                    onChange={e => setNewPurpose(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="EMPLOYMENT_SCREENING">Employment Screening</option>
                    <option value="HIGHER_STUDIES_ADMISSION">Higher Ed Admission</option>
                    <option value="SCHOLARSHIP_VALIDATION">Scholarship Validation</option>
                    <option value="VISA_PROCESSING">Visa / Embassy Verification</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Data Disclosure Scope
                  </label>
                  <select
                    value={newScope}
                    onChange={e => setNewScope(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="CREDENTIALS_ONLY">Credentials & Degree Only</option>
                    <option value="FULL_TRANSCRIPT">Full Transcript & ABC Credits</option>
                    <option value="IDENTITY_ONLY">Demographics Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Token Expiry Duration
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 7, 30].map(days => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setNewValidityDays(days)}
                      className={`py-1.5 px-3 rounded-lg border font-medium ${
                        newValidityDays === days
                          ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                          : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {days === 1 ? '24 Hours' : `${days} Days`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsNewConsentModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer"
                >
                  Generate & Activate Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
