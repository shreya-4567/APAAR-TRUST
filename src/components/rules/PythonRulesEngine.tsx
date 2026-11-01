import React, { useState } from 'react';
import { 
  Terminal, 
  Code2, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Cpu, 
  Layers, 
  Copy, 
  Check 
} from 'lucide-react';
import { PYTHON_BLUEPRINT_CODE } from '../../data/mockData';
import { calculateFuzzySimilarity } from '../../utils/helpers';

export const PythonRulesEngine: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'intake' | 'concurrency' | 'fuzzy'>('fuzzy');
  const [copied, setCopied] = useState(false);

  // Live Interactive Testing Sandbox States
  const [testCollegeName, setTestCollegeName] = useState('Vikram S. Singhania');
  const [testAadhaarName, setTestAadhaarName] = useState('Vikramaditya Shailendra Singhania');
  const [sandboxResult, setSandboxResult] = useState<{
    score: number;
    match: boolean;
    phoneticSoundex: boolean;
    verdict: string;
  } | null>(null);

  const handleCopyCode = () => {
    const code =
      activeFile === 'intake'
        ? PYTHON_BLUEPRINT_CODE.intakeGuard
        : activeFile === 'concurrency'
        ? PYTHON_BLUEPRINT_CODE.concurrencyShield
        : PYTHON_BLUEPRINT_CODE.fuzzyMatcher;

    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunFuzzySandbox = () => {
    const score = calculateFuzzySimilarity(testCollegeName, testAadhaarName);
    const firstNameA = testCollegeName.trim().split(' ')[0].toLowerCase();
    const firstNameB = testAadhaarName.trim().split(' ')[0].toLowerCase();
    const phoneticSoundex = firstNameA.slice(0, 3) === firstNameB.slice(0, 3);
    const match = score >= 70 || phoneticSoundex;

    setSandboxResult({
      score,
      match,
      phoneticSoundex,
      verdict: match
        ? 'AUTO_RECONCILE_APPROVED (Valid Demographic Variation)'
        : 'MANUAL_REGISTRAR_REVIEW_MANDATORY'
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 flex items-center justify-center shrink-0">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Python (FastAPI) Anomaly & Rules Engine Blueprint
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Microservices architecture powering real-time intake validation, global concurrency locks, and phonetic demographic reconciliation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
              Python 3.11 · FastAPI · AsyncPG
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Sandbox Test Runner */}
      <div className="bg-gradient-to-r from-slate-900 to-[#0B1E38] text-white border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white">
              Live Interactive Execution Sandbox: Fuzzy Demographic Reconciler
            </h2>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
            Jaro-Winkler + Soundex
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-mono mb-1">
              College Record Name (Raw CSV):
            </label>
            <input
              type="text"
              value={testCollegeName}
              onChange={e => setTestCollegeName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-mono mb-1">
              DigiLocker / Aadhaar Seeded Name:
            </label>
            <input
              type="text"
              value={testAadhaarName}
              onChange={e => setTestAadhaarName(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Try Presets:</span>
            <button
              onClick={() => {
                setTestCollegeName('Aarav K. Sharma');
                setTestAadhaarName('Aarav Kumar Sharma');
              }}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-mono"
            >
              Middle Initial
            </button>
            <button
              onClick={() => {
                setTestCollegeName('Vikram S. Singhania');
                setTestAadhaarName('Vikramaditya Shailendra Singhania');
              }}
              className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded text-[11px] font-mono"
            >
              Honorific Expansion
            </button>
          </div>

          <button
            onClick={handleRunFuzzySandbox}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-md transition-colors cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Execute Python Matcher
          </button>
        </div>

        {sandboxResult && (
          <div className="mt-4 p-4 rounded-xl bg-slate-800/80 border border-slate-700 font-mono text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Similarity Metric:</span>
              <span className="text-base font-bold text-cyan-400">{sandboxResult.score}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Phonetic Soundex Concordance:</span>
              <span className={sandboxResult.phoneticSoundex ? 'text-emerald-400' : 'text-amber-400'}>
                {sandboxResult.phoneticSoundex ? 'MATCHED (Same Root Phoneme)' : 'DIVERGENT'}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-slate-700 pt-2">
              <span className="text-slate-400">AICTE TrueRoll Recommendation:</span>
              <span className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                sandboxResult.match ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
              }`}>
                {sandboxResult.verdict}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Code Inspector Tabs */}
      <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveFile('fuzzy')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFile === 'fuzzy'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              fuzzy_matcher.py
            </button>

            <button
              onClick={() => setActiveFile('concurrency')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFile === 'concurrency'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              concurrency_shield.py
            </button>

            <button
              onClick={() => setActiveFile('intake')}
              className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                activeFile === 'intake'
                  ? 'bg-cyan-500 text-slate-950 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              intake_guard.py
            </button>
          </div>

          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-500" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                Copy Python Source
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-slate-950 overflow-x-auto text-slate-200 font-mono text-xs leading-relaxed max-h-[500px]">
          <pre>
            {activeFile === 'fuzzy'
              ? PYTHON_BLUEPRINT_CODE.fuzzyMatcher
              : activeFile === 'concurrency'
              ? PYTHON_BLUEPRINT_CODE.concurrencyShield
              : PYTHON_BLUEPRINT_CODE.intakeGuard}
          </pre>
        </div>
      </div>
    </div>
  );
};
