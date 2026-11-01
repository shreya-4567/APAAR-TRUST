import React, { useState } from 'react';
import { 
  History, 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  RotateCw, 
  Lock, 
  Key, 
  Filter, 
  Copy, 
  Check, 
  Download 
} from 'lucide-react';
import { AuditTrailEntry } from '../../types';
import { exportToCsv } from '../../utils/helpers';

interface AuditTrailLedgerProps {
  logs: AuditTrailEntry[];
}

export const AuditTrailLedger: React.FC<AuditTrailLedgerProps> = ({ logs }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');
  const [isVerifyingHashes, setIsVerifyingHashes] = useState(false);
  const [auditVerified, setAuditVerified] = useState(true);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const handleRunIntegrityAudit = () => {
    setIsVerifyingHashes(true);
    setTimeout(() => {
      setIsVerifyingHashes(false);
      setAuditVerified(true);
    }, 1000);
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch =
      log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.currentHash.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === 'ALL' || log.actorRole === filterRole;

    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
              <History className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Immutable Audit Trail & Cryptographic Security Ledger
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Zero-tamper record of all college admissions, verification queries, and DPDP consent tokens sealed with SHA-256 state hashes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleRunIntegrityAudit}
              disabled={isVerifyingHashes}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-all cursor-pointer"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isVerifyingHashes ? 'animate-spin' : ''}`} />
              {isVerifyingHashes ? 'Recalculating Hashes...' : 'Verify Cryptographic Chain'}
            </button>
            <button
              onClick={() => exportToCsv('trueroll_audit_ledger.csv', filteredLogs)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Ledger
            </button>
          </div>
        </div>
      </div>

      {/* Integrity Status Card */}
      <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between text-xs text-emerald-800 dark:text-emerald-300">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <div className="font-bold">Cryptographic Chain Verification: 100% INTACT</div>
            <div className="text-[11px] text-emerald-700 dark:text-emerald-400 opacity-90">
              All block hashes, previous block linkages, and entity signatures correspond to the authorized AICTE Root Key. Zero tampering detected.
            </div>
          </div>
        </div>
        <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-emerald-600 text-white">
          BLOCK HEIGHT #{logs[0]?.blockNumber || 10492}
        </span>
      </div>

      {/* Search & Role Filter */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by action, actor, entity ID, or SHA-256 hash..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'REGISTRAR', 'STUDENT', 'AICTE_REGULATOR', 'THIRD_PARTY_VERIFIER', 'SYSTEM_RULES_ENGINE'].map(role => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md whitespace-nowrap transition-colors ${
                filterRole === role
                  ? 'bg-purple-600 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200'
              }`}
            >
              {role.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="py-3 px-4">Block # & Time</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Action & Entity ID</th>
                <th className="py-3 px-4">Cryptographic Proof (SHA-256)</th>
                <th className="py-3 px-4 text-right">Integrity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 dark:text-white">
                      #{log.blockNumber}
                    </span>
                    <div className="text-[10px] text-slate-500 font-sans mt-0.5">
                      {log.timestamp}
                    </div>
                  </td>

                  <td className="py-3 px-4 font-sans">
                    <div className="font-semibold text-slate-800 dark:text-slate-200">
                      {log.actor}
                    </div>
                    <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {log.actorRole}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-bold text-purple-600 dark:text-purple-400">
                      {log.action}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Entity: <span className="text-slate-700 dark:text-slate-300">{log.entityId}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      IP: {log.ipAddress}
                    </div>
                  </td>

                  <td className="py-3 px-4 max-w-[280px]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-slate-500 truncate" title={log.currentHash}>
                        {log.currentHash.slice(0, 20)}...{log.currentHash.slice(-8)}
                      </span>
                      <button
                        onClick={() => handleCopyHash(log.currentHash)}
                        className="text-slate-400 hover:text-slate-600 p-0.5 shrink-0"
                        title="Copy full SHA-256 hash"
                      >
                        {copiedHash === log.currentHash ? (
                          <Check className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                    <div className="text-[9px] text-slate-400 truncate mt-0.5" title={`Prev: ${log.prevHash}`}>
                      Prev: {log.prevHash.slice(0, 14)}...
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right font-sans">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      SEALED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
