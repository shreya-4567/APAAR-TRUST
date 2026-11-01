import React from 'react';
import { WifiOff, RefreshCw, Database, CheckCircle2 } from 'lucide-react';
import { OfflineMutation } from '../../types';

interface OfflineSyncBarProps {
  isOffline: boolean;
  offlineQueue: OfflineMutation[];
  onSyncNow: () => void;
  isSyncing: boolean;
}

export const OfflineSyncBar: React.FC<OfflineSyncBarProps> = ({
  isOffline,
  offlineQueue,
  onSyncNow,
  isSyncing
}) => {
  if (!isOffline && offlineQueue.length === 0) return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 border-b border-amber-500/30 px-4 py-2 text-xs transition-all">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 font-medium">
          <WifiOff className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Low-Bandwidth Mode Active (Tier-3 Rural College Protocol):</strong>{' '}
            {offlineQueue.length > 0
              ? `${offlineQueue.length} student transaction(s) queued locally in IndexedDB storage.`
              : 'Transactions will be buffered locally and synced to AICTE central registry once connected.'}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <Database className="w-3 h-3 text-slate-400" />
            Local Queue: {offlineQueue.length}
          </span>

          <button
            onClick={onSyncNow}
            disabled={isSyncing || offlineQueue.length === 0}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold shadow-sm transition-all ${
              offlineQueue.length > 0
                ? 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Reconciling Ledger...' : 'Sync Queued Records'}
          </button>
        </div>
      </div>
    </div>
  );
};
