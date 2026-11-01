import React from 'react';
import { 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Terminal, 
  History, 
  Sun, 
  Moon, 
  Wifi, 
  WifiOff, 
  Sparkles
} from 'lucide-react';
import { RoleType } from '../../types';

interface NavbarProps {
  currentTab: string;
  onTabChange: (tab: string) => void;
  activeRole: RoleType;
  onRoleChange: (role: RoleType) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  isOffline: boolean;
  onToggleOffline: () => void;
  offlineQueueCount: number;
  onOpenAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onTabChange,
  activeRole,
  onRoleChange,
  isDark,
  onToggleTheme,
  isOffline,
  onToggleOffline,
  offlineQueueCount,
  onOpenAssistant
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#07111E]/95 backdrop-blur-md transition-colors">
      {/* Top National Advisory Ribbon */}
      <div className="bg-[#0A192F] text-slate-300 px-4 py-1 text-[11px] font-medium flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-[#FF9933] font-semibold tracking-wide flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF9933]"></span>
            GOVERNMENT OF INDIA
          </span>
          <span className="text-slate-500">·</span>
          <span>Ministry of Education & AICTE National Academic Registry</span>
          <span className="text-slate-500">·</span>
          <span className="text-emerald-400 font-mono">SIH26263 TrueRoll Protocol</span>
        </div>
        <div className="flex items-center gap-4 text-[11px]">
          <span className="text-slate-400">DigiLocker API Gateway: <strong className="text-emerald-400">Connected</strong></span>
          <span className="text-slate-600">|</span>
          <button
            onClick={onOpenAssistant}
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" />
            AICTE Saathi Assistant
          </button>
        </div>
      </div>

      {/* Main Navigation Header - 3 Zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6 h-16">
        {/* Zone 1: Single text element Brand wordmark with Seal */}
        <div className="flex items-center gap-3 shrink-0">
          <img 
            src="/src/assets/images/aicte_emblem_seal_1793498042956.jpg" 
            alt="AICTE Seal" 
            className="w-10 h-10 rounded-full border border-amber-500/30 object-cover shadow-sm shrink-0"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                True<span className="text-amber-500">Roll</span>
              </span>
              <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                APAAR v2.4
              </span>
            </div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 whitespace-nowrap">
              National Student Registry & Anti-Hoarding Shield
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links / Portal Switcher */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => {
              onRoleChange('REGISTRAR');
              onTabChange('registrar');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'registrar'
                ? 'bg-white dark:bg-[#0E2038] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-amber-500" />
            Registrar Portal
          </button>

          <button
            onClick={() => {
              onRoleChange('STUDENT');
              onTabChange('student');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'student'
                ? 'bg-white dark:bg-[#0E2038] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-blue-500" />
            Student Vault
          </button>

          <button
            onClick={() => {
              onRoleChange('REGULATOR');
              onTabChange('regulator');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'regulator'
                ? 'bg-white dark:bg-[#0E2038] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            AICTE Watchtower
          </button>

          <button
            onClick={() => {
              onRoleChange('VERIFIER');
              onTabChange('verifier');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'verifier'
                ? 'bg-white dark:bg-[#0E2038] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
            Verifier Portal
          </button>

          <button
            onClick={() => onTabChange('rules')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'rules'
                ? 'bg-white dark:bg-[#0E2038] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-500" />
            Python Engine
          </button>

          <button
            onClick={() => onTabChange('audit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              currentTab === 'audit'
                ? 'bg-white dark:bg-[#0E2038] text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-3.5 h-3.5 text-purple-500" />
            Audit Ledger
          </button>
        </nav>

        {/* Zone 3: Interactive Status, Offline Sim & Theme Controls */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Offline Mode Low-Bandwidth Simulator Button */}
          <button
            onClick={onToggleOffline}
            title={isOffline ? "Currently running Offline (Rural College Mode) - Click to reconnect" : "Simulate Low-Bandwidth Rural College Offline Mode"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-all ${
              isOffline
                ? 'bg-amber-500/10 text-amber-500 border-amber-500/40 hover:bg-amber-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden sm:inline">Offline Mode</span>
                {offlineQueueCount > 0 && (
                  <span className="bg-amber-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                    {offlineQueueCount}
                  </span>
                )}
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">Online</span>
              </>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Portal Tab Selector */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#07111E]">
        <button
          onClick={() => { onRoleChange('REGISTRAR'); onTabChange('registrar'); }}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'registrar' ? 'bg-amber-500 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Registrar
        </button>
        <button
          onClick={() => { onRoleChange('STUDENT'); onTabChange('student'); }}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'student' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Student Vault
        </button>
        <button
          onClick={() => { onRoleChange('REGULATOR'); onTabChange('regulator'); }}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'regulator' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          AICTE Watchtower
        </button>
        <button
          onClick={() => { onRoleChange('VERIFIER'); onTabChange('verifier'); }}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'verifier' ? 'bg-indigo-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Verifier
        </button>
        <button
          onClick={() => onTabChange('rules')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'rules' ? 'bg-cyan-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Python Rules
        </button>
        <button
          onClick={() => onTabChange('audit')}
          className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap ${currentTab === 'audit' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Audit Ledger
        </button>
      </div>
    </header>
  );
};
