import React, { useState } from 'react';
import { 
  Building2, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Download, 
  Plus, 
  UserCheck, 
  ShieldAlert, 
  FileSpreadsheet, 
  ExternalLink, 
  RefreshCw, 
  Copy, 
  Check, 
  X,
  Eye,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { 
  StudentRecord, 
  QuotaCap, 
  ConcurrencyAlert 
} from '../../types';
import { CURRENT_COLLEGE } from '../../data/mockData';
import { exportToCsv, formatApaarId, calculateFuzzySimilarity } from '../../utils/helpers';

interface RegistrarPortalProps {
  students: StudentRecord[];
  onAddStudent: (student: StudentRecord) => void;
  onUpdateStudent: (student: StudentRecord) => void;
  quotaCaps: QuotaCap[];
  concurrencyAlerts: ConcurrencyAlert[];
  onSelectStudentForVault: (student: StudentRecord) => void;
  onNavigateToVerifier: (apaarId: string) => void;
}

export const RegistrarPortal: React.FC<RegistrarPortalProps> = ({
  students,
  onAddStudent,
  onUpdateStudent,
  quotaCaps,
  concurrencyAlerts,
  onSelectStudentForVault,
  onNavigateToVerifier
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Bulk Upload Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadStep, setUploadStep] = useState<'SELECT' | 'VALIDATING' | 'RESULTS'>('SELECT');
  const [uploadedRecordsCount, setUploadedRecordsCount] = useState(12);

  // Quick Enroll Modal State
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    fullName: '',
    apaarId: '',
    udisePen: '',
    branch: 'Computer Science & Engineering',
    program: 'B.Tech',
    quotaCategory: 'OPEN' as const,
    dob: '2005-04-12',
    gender: 'MALE' as const,
    bloodGroup: 'B+',
    contactPhone: '+91-98100-11223',
    contactEmail: ''
  });

  // Selected Student Dossier Modal
  const [selectedStudentForDossier, setSelectedStudentForDossier] = useState<StudentRecord | null>(null);

  // Copy handler
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Sample CSV Template download
  const handleDownloadTemplate = () => {
    const sampleData = [
      {
        apaar_id: '9921-3841-5502',
        udise_pen: 'PEN2024-991024',
        full_name: 'Anirudh S. Iyer',
        dob: '2004-05-18',
        gender: 'MALE',
        branch_code: 'CSE-101',
        quota_category: 'OPEN',
        roll_number: '0492CSE202499',
        academic_year: '2024-2025'
      },
      {
        apaar_id: '8812-4401-2294',
        udise_pen: 'PEN2024-882019',
        full_name: 'Kavita Sundaram',
        dob: '2004-11-03',
        gender: 'FEMALE',
        branch_code: 'AIDS-102',
        quota_category: 'OBC',
        roll_number: '0492AIDS202450',
        academic_year: '2024-2025'
      }
    ];
    exportToCsv('AICTE_Batch_Enrollment_Template.csv', sampleData);
  };

  // Filtered Students
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.apaarId.includes(searchTerm) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.udisePen.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBranch = filterBranch === 'ALL' || student.branch === filterBranch;
    const matchesStatus = filterStatus === 'ALL' || student.status === filterStatus;

    return matchesSearch && matchesBranch && matchesStatus;
  });

  // Handle Quick Reconcile of Name Mismatch
  const handleReconcileName = (student: StudentRecord) => {
    const updated: StudentRecord = {
      ...student,
      fullName: student.aadhaarMatchName,
      status: 'VERIFIED',
      nameMismatchScore: 100
    };
    onUpdateStudent(updated);
    if (selectedStudentForDossier?.id === student.id) {
      setSelectedStudentForDossier(updated);
    }
  };

  // Simulate Batch File Upload & Python Validation
  const handleRunBatchValidation = () => {
    setUploadStep('VALIDATING');
    setTimeout(() => {
      setUploadStep('RESULTS');
    }, 1200);
  };

  const handleApplyBatchImport = () => {
    // Add realistic validated mock student from the batch
    const batchStudent: StudentRecord = {
      id: `STU-2024-${Date.now().toString().slice(-4)}`,
      apaarId: '9120-4491-6632',
      udisePen: 'PEN2024-918234',
      fullName: 'Anirudh S. Iyer',
      aadhaarMatchName: 'Anirudh S. Iyer',
      dob: '2004-05-18',
      gender: 'MALE',
      bloodGroup: 'O+',
      collegeId: CURRENT_COLLEGE.id,
      collegeName: CURRENT_COLLEGE.name,
      program: 'B.Tech',
      branch: 'Computer Science & Engineering',
      academicYear: '2024-2025',
      semester: 1,
      rollNumber: '0492CSE202499',
      quotaCategory: 'OPEN',
      status: 'VERIFIED',
      abcCredits: 20,
      abcAccountId: 'ABC-551-920-112',
      enrollmentDate: '2024-08-10',
      photoUrl: '',
      verificationHash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2',
      contactEmail: 'anirudh.iyer@diet.ac.in',
      contactPhone: '+91-99880-12345'
    };
    onAddStudent(batchStudent);
    setIsUploadModalOpen(false);
    setUploadStep('SELECT');
  };

  // Submit manual enrollment form
  const handleManualEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.fullName || !newStudent.apaarId) return;

    const formatted = formatApaarId(newStudent.apaarId);
    const enrolled: StudentRecord = {
      id: `STU-2024-${Date.now().toString().slice(-4)}`,
      apaarId: formatted,
      udisePen: newStudent.udisePen || `PEN2024-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName: newStudent.fullName,
      aadhaarMatchName: newStudent.fullName,
      dob: newStudent.dob,
      gender: newStudent.gender,
      bloodGroup: newStudent.bloodGroup,
      collegeId: CURRENT_COLLEGE.id,
      collegeName: CURRENT_COLLEGE.name,
      program: newStudent.program,
      branch: newStudent.branch,
      academicYear: '2024-2025',
      semester: 1,
      rollNumber: `0492${newStudent.branch.slice(0, 3).toUpperCase()}2024${Math.floor(10 + Math.random() * 89)}`,
      quotaCategory: newStudent.quotaCategory,
      status: 'VERIFIED',
      abcCredits: 0,
      abcAccountId: `ABC-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}-${Math.floor(100 + Math.random() * 900)}`,
      enrollmentDate: new Date().toISOString().split('T')[0],
      photoUrl: '',
      verificationHash: `hash_${Date.now()}`,
      contactEmail: newStudent.contactEmail || `${newStudent.fullName.toLowerCase().replace(/\s+/g, '.')}@diet.ac.in`,
      contactPhone: newStudent.contactPhone
    };

    onAddStudent(enrolled);
    setIsEnrollModalOpen(false);
    setNewStudent({
      fullName: '',
      apaarId: '',
      udisePen: '',
      branch: 'Computer Science & Engineering',
      program: 'B.Tech',
      quotaCategory: 'OPEN',
      dob: '2005-04-12',
      gender: 'MALE',
      bloodGroup: 'B+',
      contactPhone: '+91-98100-11223',
      contactEmail: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* College Header Banner */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {CURRENT_COLLEGE.name}
                </h1>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                  {CURRENT_COLLEGE.id}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20">
                  AICTE Approved (Est. {CURRENT_COLLEGE.approvalYear})
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {CURRENT_COLLEGE.location} · Affiliated to {CURRENT_COLLEGE.affiliation}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              Batch CSV Upload
            </button>
            <button
              onClick={() => setIsEnrollModalOpen(true)}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 shadow-sm transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Enroll Single Student
            </button>
          </div>
        </div>

        {/* Real-time Over-Capacity Alert Ribbon if detected */}
        {quotaCaps.some(q => q.status === 'OVER_CAPACITY') && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-between text-xs text-red-700 dark:text-red-400">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
              <span>
                <strong>Quota & Intake Guard Triggered:</strong> Branch <strong>Artificial Intelligence & Data Science</strong> has 121 admitted students against approved AICTE cap of 120. Automatic AICTE Show-Cause Notice pending.
              </span>
            </div>
            <span className="font-mono font-semibold px-2 py-0.5 bg-red-500 text-white rounded text-[10px]">
              CRITICAL ANOMALY
            </span>
          </div>
        )}
      </div>

      {/* Quota & Intake Monitoring Strip (4 Branches) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quotaCaps.map(quota => {
          const percentage = Math.round((quota.admittedCount / quota.approvedIntake) * 100);
          const isOver = quota.status === 'OVER_CAPACITY';

          return (
            <div 
              key={quota.branchCode}
              className={`p-4 rounded-xl border bg-white dark:bg-[#0B1728] shadow-sm transition-all ${
                isOver 
                  ? 'border-red-500/50 bg-red-500/5 dark:bg-red-950/20' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  {quota.branchCode}
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isOver 
                    ? 'bg-red-500 text-white' 
                    : percentage >= 95 
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20' 
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {isOver ? 'OVER CAP' : `${quota.approvedIntake - quota.admittedCount} Seats Left`}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-slate-900 dark:text-white mt-1 truncate" title={quota.branchName}>
                {quota.branchName}
              </h3>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white">
                  {quota.admittedCount}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  / {quota.approvedIntake} Approved Cap
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOver ? 'bg-red-500' : percentage >= 95 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                />
              </div>

              {/* Category Quota Breakdown */}
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-center">
                <div>
                  <div className="text-slate-600 dark:text-slate-400">GEN</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{quota.generalQuota.filled}/{quota.generalQuota.cap}</div>
                </div>
                <div>
                  <div className="text-slate-600 dark:text-slate-400">OBC</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{quota.obcQuota.filled}/{quota.obcQuota.cap}</div>
                </div>
                <div>
                  <div className="text-slate-600 dark:text-slate-400">SC/ST</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{quota.scStQuota.filled}/{quota.scStQuota.cap}</div>
                </div>
                <div>
                  <div className="text-slate-600 dark:text-slate-400">EWS</div>
                  <div className="font-semibold text-slate-700 dark:text-slate-300">{quota.ewsQuota.filled}/{quota.ewsQuota.cap}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Filter and Search Bar for Students */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search by 12-digit APAAR ID, Student Name, Roll No..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            {/* Status Tabs */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg text-xs">
              <button
                onClick={() => setFilterStatus('ALL')}
                className={`px-3 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterStatus === 'ALL'
                    ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                All Records ({students.length})
              </button>
              <button
                onClick={() => setFilterStatus('VERIFIED')}
                className={`px-3 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterStatus === 'VERIFIED'
                    ? 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Verified ({students.filter(s => s.status === 'VERIFIED').length})
              </button>
              <button
                onClick={() => setFilterStatus('FLAGGED_CONCURRENCY')}
                className={`px-3 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterStatus === 'FLAGGED_CONCURRENCY'
                    ? 'bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Dual Enrollment ({students.filter(s => s.status === 'FLAGGED_CONCURRENCY').length})
              </button>
              <button
                onClick={() => setFilterStatus('NAME_MISMATCH')}
                className={`px-3 py-1 font-medium rounded-md transition-colors whitespace-nowrap ${
                  filterStatus === 'NAME_MISMATCH'
                    ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                Name Reconcile ({students.filter(s => s.status === 'NAME_MISMATCH').length})
              </button>
            </div>

            {/* CSV Export Button */}
            <button
              onClick={() => exportToCsv('diet_aicte_students_registry.csv', filteredStudents)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Main Student Records Data Table */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-3 px-4">Student & APAAR ID</th>
                <th className="py-3 px-4">Branch & Roll No</th>
                <th className="py-3 px-4">Quota</th>
                <th className="py-3 px-4">ABC Credits</th>
                <th className="py-3 px-4">Status & Validation</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    No student records matching your current filter.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => {
                  return (
                    <tr 
                      key={student.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors group"
                    >
                      {/* Student Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          {student.photoUrl ? (
                            <img 
                              src={student.photoUrl} 
                              alt={student.fullName} 
                              className="w-9 h-9 rounded-lg object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-bold flex items-center justify-center shrink-0">
                              {student.fullName.charAt(0)}
                            </div>
                          )}

                          <div>
                            <div className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                              {student.fullName}
                              {student.status === 'VERIFIED' && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                {student.apaarId}
                              </span>
                              <button
                                onClick={() => handleCopy(student.apaarId)}
                                title="Copy 12-digit APAAR ID"
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                              >
                                {copiedId === student.apaarId ? (
                                  <Check className="w-3 h-3 text-emerald-500" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Branch & Roll */}
                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">
                          {student.branch}
                        </div>
                        <div className="font-mono text-[11px] text-slate-500">
                          {student.rollNumber} · Sem {student.semester}
                        </div>
                      </td>

                      {/* Quota */}
                      <td className="py-3 px-4">
                        <span className="font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                          {student.quotaCategory}
                        </span>
                      </td>

                      {/* ABC Credits */}
                      <td className="py-3 px-4 font-mono">
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                          {student.abcCredits}
                        </span>
                        <span className="text-[11px] text-slate-500 ml-1">Credits</span>
                        <div className="text-[10px] text-slate-400 truncate max-w-[110px]" title={student.abcAccountId}>
                          {student.abcAccountId}
                        </div>
                      </td>

                      {/* Status & Alerts */}
                      <td className="py-3 px-4">
                        {student.status === 'VERIFIED' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            DigiLocker Synced
                          </span>
                        )}

                        {student.status === 'FLAGGED_CONCURRENCY' && (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 font-semibold">
                              <ShieldAlert className="w-3 h-3" />
                              Cross-College Conflict!
                            </span>
                            <span className="text-[10px] text-red-500 dark:text-red-400 truncate max-w-[170px]" title={student.concurrencyDetails?.secondCollegeName}>
                              Also at {student.concurrencyDetails?.secondCollegeName}
                            </span>
                          </div>
                        )}

                        {student.status === 'NAME_MISMATCH' && (
                          <div className="flex flex-col gap-0.5">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                              <AlertTriangle className="w-3 h-3" />
                              Fuzzy Mismatch ({student.nameMismatchScore}%)
                            </span>
                            <span className="text-[10px] text-slate-500 truncate max-w-[170px]" title={`Aadhaar: ${student.aadhaarMatchName}`}>
                              Gov: {student.aadhaarMatchName}
                            </span>
                          </div>
                        )}

                        {student.status === 'PENDING' && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Awaiting ABC Link
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {student.status === 'NAME_MISMATCH' && (
                            <button
                              onClick={() => handleReconcileName(student)}
                              className="px-2 py-1 text-[11px] font-semibold rounded bg-amber-500 hover:bg-amber-600 text-white shadow-xs transition-colors cursor-pointer"
                              title="Accept official DigiLocker name into college database"
                            >
                              1-Click Reconcile
                            </button>
                          )}

                          <button
                            onClick={() => setSelectedStudentForDossier(student)}
                            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                            title="Inspect Student Verification Dossier"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => onSelectStudentForVault(student)}
                            className="p-1.5 text-blue-600 hover:text-blue-700 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-lg transition-colors cursor-pointer"
                            title="View Virtual APAAR ID Card in Student Vault"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Bulk CSV Upload & Automated Python Rules Engine */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative">
            <button
              onClick={() => {
                setIsUploadModalOpen(false);
                setUploadStep('SELECT');
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Batch Enrollment via Python Rules Engine
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Pre-flight validation against AICTE Intake Caps & Anti-Hoarding Registry
                </p>
              </div>
            </div>

            {uploadStep === 'SELECT' && (
              <div className="space-y-4">
                <div 
                  onClick={handleRunBatchValidation}
                  className="border-2 border-dashed border-amber-500/40 hover:border-amber-500 rounded-xl p-8 text-center bg-amber-500/5 hover:bg-amber-500/10 transition-all cursor-pointer group"
                >
                  <Upload className="w-8 h-8 text-amber-500 mx-auto mb-2 group-hover:-translate-y-0.5 transition-transform" />
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Drop AICTE CSV / Excel Batch File here
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Simulates intake validation for 12 candidate records
                  </p>
                  <span className="inline-block mt-3 px-3 py-1 bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-xs">
                    Select File & Run AICTE Validation
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span>Need the official template?</span>
                  <button
                    onClick={handleDownloadTemplate}
                    className="text-amber-600 dark:text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    Download CSV Template
                  </button>
                </div>
              </div>
            )}

            {uploadStep === 'VALIDATING' && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                <RefreshCw className="w-10 h-10 text-amber-500 animate-spin" />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Executing Python FastAPI Rules Engine...
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    1. Checking branch seat caps · 2. Concurrency Shield lookup · 3. Jaro-Winkler phonetic match
                  </p>
                </div>
              </div>
            )}

            {uploadStep === 'RESULTS' && (
              <div className="space-y-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between font-semibold">
                    <span className="text-slate-700 dark:text-slate-300">Batch Inspection Summary:</span>
                    <span className="font-mono text-emerald-500">10 / 12 Clean Pass</span>
                  </div>
                  <div className="text-[11px] space-y-1 text-slate-600 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>10 records match DigiLocker APAAR & within Branch Quotas.</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>1 record with 88% Fuzzy Name match (Auto-Reconciled).</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>1 record blocked: Exceeds Artificial Intelligence cap (120).</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3">
                  <button
                    onClick={() => {
                      setIsUploadModalOpen(false);
                      setUploadStep('SELECT');
                    }}
                    className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyBatchImport}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all cursor-pointer"
                  >
                    Import 10 Approved Students into Registry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 2: Quick Single Student Enrollment */}
      {isEnrollModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setIsEnrollModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/30 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Direct Student Admission & APAAR Link
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Real-time validation against AICTE seat limits
                </p>
              </div>
            </div>

            <form onSubmit={handleManualEnroll} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  12-Digit APAAR ID / EduID *
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.apaarId}
                  onChange={e => setNewStudent({ ...newStudent, apaarId: e.target.value })}
                  placeholder="e.g. 9845 2104 7832"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student Full Name (As per Aadhaar/10th Marksheet) *
                </label>
                <input
                  type="text"
                  required
                  value={newStudent.fullName}
                  onChange={e => setNewStudent({ ...newStudent, fullName: e.target.value })}
                  placeholder="e.g. Divyansh Rajan"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Branch Allocation
                  </label>
                  <select
                    value={newStudent.branch}
                    onChange={e => setNewStudent({ ...newStudent, branch: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  >
                    <option value="Computer Science & Engineering">CSE (180 Cap)</option>
                    <option value="Artificial Intelligence & Data Science">AI & DS (120 Cap)</option>
                    <option value="Electronics & Communication Engg">ECE (120 Cap)</option>
                    <option value="Mechanical & Automation Engg">Mechanical (60 Cap)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Quota Category
                  </label>
                  <select
                    value={newStudent.quotaCategory}
                    onChange={e => setNewStudent({ ...newStudent, quotaCategory: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  >
                    <option value="OPEN">OPEN / General</option>
                    <option value="OBC">OBC-NCL</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                    <option value="EWS">EWS (Economically Weaker)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={newStudent.dob}
                    onChange={e => setNewStudent({ ...newStudent, dob: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Blood Group
                  </label>
                  <select
                    value={newStudent.bloodGroup}
                    onChange={e => setNewStudent({ ...newStudent, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-all cursor-pointer"
                >
                  Validate & Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Detailed Student Verification Dossier */}
      {selectedStudentForDossier && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedStudentForDossier(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              {selectedStudentForDossier.photoUrl ? (
                <img 
                  src={selectedStudentForDossier.photoUrl} 
                  alt={selectedStudentForDossier.fullName} 
                  className="w-16 h-16 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xl flex items-center justify-center border border-amber-500/20">
                  {selectedStudentForDossier.fullName.charAt(0)}
                </div>
              )}

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedStudentForDossier.fullName}
                  </h2>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold">
                    {selectedStudentForDossier.rollNumber}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  APAAR: <strong className="font-mono text-slate-900 dark:text-white">{selectedStudentForDossier.apaarId}</strong> · UDISE+ PEN: <span className="font-mono">{selectedStudentForDossier.udisePen}</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  Academic Mapping
                </span>
                <div><strong>Program:</strong> {selectedStudentForDossier.program}</div>
                <div><strong>Branch:</strong> {selectedStudentForDossier.branch}</div>
                <div><strong>Quota Category:</strong> {selectedStudentForDossier.quotaCategory}</div>
                <div><strong>Academic Year:</strong> {selectedStudentForDossier.academicYear}</div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                  DigiLocker & ABC Bank
                </span>
                <div><strong>ABC Account ID:</strong> <span className="font-mono">{selectedStudentForDossier.abcAccountId}</span></div>
                <div><strong>Cumulative Credits:</strong> <span className="font-mono font-bold text-emerald-500">{selectedStudentForDossier.abcCredits}</span></div>
                <div><strong>Aadhaar Match Name:</strong> {selectedStudentForDossier.aadhaarMatchName}</div>
                <div><strong>DOB:</strong> {selectedStudentForDossier.dob} ({selectedStudentForDossier.gender})</div>
              </div>
            </div>

            {/* If Concurrency Alert */}
            {selectedStudentForDossier.status === 'FLAGGED_CONCURRENCY' && (
              <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-red-600 dark:text-red-400">
                  <ShieldAlert className="w-4 h-4" />
                  Anti-Seat Hoarding Violation Detected
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  TrueRoll Concurrency Shield intercepted a simultaneous active enrollment under APAAR ID <strong>{selectedStudentForDossier.apaarId}</strong> at:
                </p>
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border border-red-500/20 font-mono text-[11px] text-slate-800 dark:text-slate-200">
                  Institution: {selectedStudentForDossier.concurrencyDetails?.secondCollegeName} ({selectedStudentForDossier.concurrencyDetails?.secondCollegeId})<br />
                  Program: {selectedStudentForDossier.concurrencyDetails?.secondBranch}<br />
                  Timestamp: {selectedStudentForDossier.concurrencyDetails?.detectedAt}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => {
                      alert(`Show-cause notice dispatched to ${selectedStudentForDossier.contactEmail}. Required to submit Transfer NOC within 48 hours.`);
                    }}
                    className="px-3 py-1.5 rounded bg-red-600 text-white font-semibold hover:bg-red-700 cursor-pointer"
                  >
                    Issue 48-Hour Notice
                  </button>
                  <button
                    onClick={() => {
                      const updated: StudentRecord = { ...selectedStudentForDossier, status: 'VERIFIED', concurrencyDetails: undefined };
                      onUpdateStudent(updated);
                      setSelectedStudentForDossier(updated);
                    }}
                    className="px-3 py-1.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold hover:bg-slate-300 cursor-pointer"
                  >
                    NOC Verified (Clear Collision)
                  </button>
                </div>
              </div>
            )}

            {/* If Name Mismatch */}
            {selectedStudentForDossier.status === 'NAME_MISMATCH' && (
              <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-600 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  Fuzzy Demographic Name Variation ({selectedStudentForDossier.nameMismatchScore}% Match)
                </div>
                <p className="text-slate-700 dark:text-slate-300">
                  College Admission Record: <strong>{selectedStudentForDossier.fullName}</strong><br />
                  DigiLocker / Aadhaar Seed: <strong>{selectedStudentForDossier.aadhaarMatchName}</strong>
                </p>
                <button
                  onClick={() => handleReconcileName(selectedStudentForDossier)}
                  className="px-3 py-1.5 rounded bg-amber-500 hover:bg-amber-600 text-white font-semibold cursor-pointer"
                >
                  Accept DigiLocker Legal Name & Verify
                </button>
              </div>
            )}

            {/* SHA-256 Proof */}
            <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
              <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                Cryptographic Audit Proof (SHA-256)
              </span>
              <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 break-all mt-1">
                {selectedStudentForDossier.verificationHash}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  onSelectStudentForVault(selectedStudentForDossier);
                  setSelectedStudentForDossier(null);
                }}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
              >
                Open Virtual APAAR Card in Student Vault
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  onNavigateToVerifier(selectedStudentForDossier.apaarId);
                  setSelectedStudentForDossier(null);
                }}
                className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer"
              >
                Simulate Employer Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
