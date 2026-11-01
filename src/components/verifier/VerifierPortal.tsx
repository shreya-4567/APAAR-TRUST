import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  FileCheck2, 
  Printer, 
  QrCode, 
  Building, 
  Key, 
  ExternalLink,
  RotateCw,
  Award
} from 'lucide-react';
import { StudentRecord } from '../../types';
import { formatApaarId } from '../../utils/helpers';
import confetti from 'canvas-confetti';

interface VerifierPortalProps {
  students: StudentRecord[];
  initialApaarId?: string;
}

export const VerifierPortal: React.FC<VerifierPortalProps> = ({
  students,
  initialApaarId = ''
}) => {
  const [apaarInput, setApaarInput] = useState(initialApaarId || '9845-2104-7832');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [verifiedResult, setVerifiedResult] = useState<StudentRecord | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Sync initial query if passed
  useEffect(() => {
    if (initialApaarId) {
      setApaarInput(initialApaarId);
      handleExecuteVerification(initialApaarId);
    }
  }, [initialApaarId]);

  const handleExecuteVerification = (idToVerify?: string) => {
    const rawId = (idToVerify || apaarInput).trim();
    if (!rawId) return;

    setIsVerifying(true);
    setVerificationStep(1);
    setVerifiedResult(null);
    setNotFound(false);

    // Step 1: MoE National Registry query
    setTimeout(() => {
      setVerificationStep(2); // RSA Key Verification
      setTimeout(() => {
        setVerificationStep(3); // Concurrency Shield Check
        setTimeout(() => {
          setVerificationStep(4); // ABC Credit Depository
          setTimeout(() => {
            setIsVerifying(false);
            const found = students.find(
              s => s.apaarId === rawId || s.apaarId.replace(/-/g, '') === rawId.replace(/-/g, '')
            );

            if (found) {
              setVerifiedResult(found);
              if (found.status === 'VERIFIED') {
                try {
                  confetti({
                    particleCount: 50,
                    spread: 70,
                    origin: { y: 0.6 }
                  });
                } catch (e) {}
              }
            } else {
              setNotFound(true);
            }
          }, 350);
        }, 350);
      }, 350);
    }, 400);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Employer & Third-Party Instant Verification Portal
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Cryptographic MoE & AICTE TrueRoll verification API. Real-time background check on degree, seat validity, and academic credits.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              DigiLocker Gateway 200 OK
            </span>
          </div>
        </div>
      </div>

      {/* Verification Query Engine */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
            Enter 12-Digit APAAR ID / EduID or Scan QR Code
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={apaarInput}
                onChange={e => setApaarInput(e.target.value)}
                placeholder="e.g. 9845-2104-7832"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm font-semibold focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <button
              onClick={() => handleExecuteVerification()}
              disabled={isVerifying}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  Verify Degree & Credits
                </>
              )}
            </button>
          </div>
        </div>

        {/* Demo Preset Buttons to test different scenarios */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 text-[11px]">Quick Demo Presets:</span>
          {students.slice(0, 4).map(s => (
            <button
              key={s.id}
              onClick={() => {
                setApaarInput(s.apaarId);
                handleExecuteVerification(s.apaarId);
              }}
              className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition-colors text-[11px]"
            >
              {s.fullName} ({s.status.replace(/_/g, ' ')})
            </button>
          ))}
        </div>
      </div>

      {/* Simulated Live Handshake Indicator */}
      {isVerifying && (
        <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <RotateCw className="w-4 h-4 text-indigo-500 animate-spin" />
            Simulating Government Database Gateway Handshake...
          </h3>

          <div className="space-y-3 text-xs">
            <div className={`flex items-center gap-3 p-2.5 rounded-lg ${verificationStep >= 1 ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className={`w-4 h-4 ${verificationStep >= 1 ? 'text-indigo-500' : 'text-slate-300'}`} />
              <span>Step 1: Connecting to MoE National APAAR Root Directory</span>
            </div>
            <div className={`flex items-center gap-3 p-2.5 rounded-lg ${verificationStep >= 2 ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className={`w-4 h-4 ${verificationStep >= 2 ? 'text-indigo-500' : 'text-slate-300'}`} />
              <span>Step 2: Validating RSA Digital Signature & Root Certificate Authority</span>
            </div>
            <div className={`flex items-center gap-3 p-2.5 rounded-lg ${verificationStep >= 3 ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className={`w-4 h-4 ${verificationStep >= 3 ? 'text-indigo-500' : 'text-slate-300'}`} />
              <span>Step 3: Querying Anti-Seat Hoarding Cross-College Concurrency Index</span>
            </div>
            <div className={`flex items-center gap-3 p-2.5 rounded-lg ${verificationStep >= 4 ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold' : 'text-slate-400'}`}>
              <CheckCircle2 className={`w-4 h-4 ${verificationStep >= 4 ? 'text-indigo-500' : 'text-slate-300'}`} />
              <span>Step 4: Pulling Academic Bank of Credits (ABC) Transcript</span>
            </div>
          </div>
        </div>
      )}

      {/* Not Found Alert */}
      {notFound && !isVerifying && (
        <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-xl text-center space-y-2">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="text-sm font-bold text-red-600 dark:text-red-400">
            No Matching APAAR Record Found
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            The APAAR ID <strong>{apaarInput}</strong> could not be authenticated in the AICTE National Database. Please verify the 12-digit number or check candidate consent tokens.
          </p>
        </div>
      )}

      {/* Verified Certificate Result */}
      {verifiedResult && !isVerifying && (
        <div className="space-y-4">
          {/* Status Alert Banner */}
          {verifiedResult.status === 'FLAGGED_CONCURRENCY' ? (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-between text-xs text-red-700 dark:text-red-400">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-500 shrink-0" />
                <span>
                  <strong>AUTHENTICATION REJECTED:</strong> Student is concurrently enrolled in another AICTE institution (Anti-Seat Hoarding Violation). Credentials are temporarily suspended pending AICTE inquiry.
                </span>
              </div>
              <span className="font-mono font-bold px-2 py-0.5 bg-red-500 text-white rounded">
                VIOLATION ACTIVE
              </span>
            </div>
          ) : verifiedResult.status === 'NAME_MISMATCH' ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-700 dark:text-amber-400">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                <span>
                  <strong>NAME VARIATION DETECTED:</strong> College registered name (<strong>{verifiedResult.fullName}</strong>) differs slightly from Aadhaar seed (<strong>{verifiedResult.aadhaarMatchName}</strong>).
                </span>
              </div>
              <span className="font-mono font-bold px-2 py-0.5 bg-amber-500 text-white rounded">
                RECONCILE PENDING
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>
                  <strong>AUTHENTICATED AICTE CREDENTIAL:</strong> Student record is 100% verified against MoE APAAR root, DigiLocker, and Academic Bank of Credits. Zero concurrency anomalies.
                </span>
              </div>
              <span className="font-mono font-bold px-2 py-0.5 bg-emerald-600 text-white rounded">
                100% AUTHENTIC
              </span>
            </div>
          )}

          {/* Official Verification Attestation Certificate */}
          <div className="bg-white dark:bg-[#0B1728] border-2 border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl relative overflow-hidden">
            {/* Ashoka watermark */}
            <div className="absolute right-4 top-4 opacity-5 pointer-events-none">
              <img src="/src/assets/images/aicte_emblem_seal_1793498042956.jpg" alt="" className="w-72 h-72 rounded-full" />
            </div>

            {/* Header */}
            <div className="border-b border-slate-200 dark:border-slate-800 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img 
                  src="/src/assets/images/aicte_emblem_seal_1793498042956.jpg" 
                  alt="AICTE Seal" 
                  className="w-12 h-12 rounded-full border border-amber-500/40 object-cover"
                />
                <div>
                  <div className="text-[11px] font-bold tracking-widest uppercase text-amber-500 font-mono">
                    GOVERNMENT OF INDIA · MINISTRY OF EDUCATION
                  </div>
                  <h2 className="text-lg font-black text-slate-900 dark:text-white">
                    National Student Credential Verification Attestation
                  </h2>
                  <div className="text-xs text-slate-500">
                    Issued under AICTE TrueRoll National Verification Framework (SIH26263)
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">
                  CERT-TR-{Date.now().toString().slice(-8)}
                </div>
                <div className="text-[11px] text-slate-500">
                  Verified: {new Date().toLocaleString()} IST
                </div>
              </div>
            </div>

            {/* Candidate & Academic Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6 items-start">
              {/* Photo & APAAR */}
              <div className="md:col-span-4 flex flex-col items-center p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                {verifiedResult.photoUrl ? (
                  <img 
                    src={verifiedResult.photoUrl} 
                    alt={verifiedResult.fullName} 
                    className="w-24 h-24 rounded-xl object-cover border-2 border-amber-500/40 shadow-sm"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-amber-500/10 text-amber-500 font-bold text-2xl flex items-center justify-center border border-amber-500/30">
                    {verifiedResult.fullName.charAt(0)}
                  </div>
                )}

                <div className="mt-3">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    {verifiedResult.fullName}
                  </h3>
                  <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                    {verifiedResult.apaarId}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                    UDISE+ PEN: {verifiedResult.udisePen}
                  </div>
                </div>
              </div>

              {/* Verified Degree Metadata */}
              <div className="md:col-span-8 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Institution</span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{verifiedResult.collegeName}</span>
                    <span className="text-slate-500 font-mono text-[11px]">{verifiedResult.collegeId}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Program & Branch</span>
                    <span className="font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{verifiedResult.program} in {verifiedResult.branch}</span>
                    <span className="text-slate-500 font-mono text-[11px]">Roll: {verifiedResult.rollNumber}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">ABC Bank Credits</span>
                    <span className="font-mono font-bold text-emerald-500 text-sm mt-0.5 block">{verifiedResult.abcCredits} Credits</span>
                    <span className="text-slate-400 font-mono text-[10px]">ID: {verifiedResult.abcAccountId}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Academic Year</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{verifiedResult.academicYear}</span>
                    <span className="text-slate-500 text-[10px]">Semester {verifiedResult.semester}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Quota Category</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white text-xs mt-0.5 block">{verifiedResult.quotaCategory}</span>
                    <span className="text-slate-500 text-[10px]">DOB: {verifiedResult.dob}</span>
                  </div>
                </div>

                {/* Cryptographic Proof Hash */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Cryptographic SHA-256 Ledger Stamp
                  </span>
                  <div className="font-mono text-[10px] text-slate-600 dark:text-slate-400 break-all mt-1">
                    {verifiedResult.verificationHash}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Official Digital Stamp · Digitally Signed by AICTE TrueRoll National Key
              </span>

              <button
                onClick={handlePrintCertificate}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                Print Verified Attestation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
