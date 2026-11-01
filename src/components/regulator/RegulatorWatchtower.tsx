import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Building2, 
  Users, 
  MapPin, 
  Download, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  FileCheck,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Printer
} from 'lucide-react';
import { ConcurrencyAlert, StudentRecord } from '../../types';
import { AICTE_REGIONAL_STATS } from '../../data/mockData';
import { exportToCsv } from '../../utils/helpers';

interface RegulatorWatchtowerProps {
  concurrencyAlerts: ConcurrencyAlert[];
  onResolveAlert: (id: string, resolution: 'REVOKED' | 'NOC') => void;
  students: StudentRecord[];
}

export const RegulatorWatchtower: React.FC<RegulatorWatchtowerProps> = ({
  concurrencyAlerts,
  onResolveAlert,
  students
}) => {
  const [selectedState, setSelectedState] = useState('ALL');
  const [reportGenerated, setReportGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'COLLISIONS' | 'STATE_MAP'>('OVERVIEW');

  // Handle Generating Mock AICTE Compliance Report
  const handleGenerateReport = () => {
    setReportGenerated(true);
    const reportData = AICTE_REGIONAL_STATS.map(stat => ({
      Region: stat.state,
      Approved_Institutions: stat.colleges,
      Enrolled_Students: stat.enrolled,
      APAAR_Compliance_Rate: `${stat.compliantPct}%`,
      Active_Seat_Anomalies: stat.anomalies
    }));
    exportToCsv('AICTE_National_Compliance_Report_2024_2025.csv', reportData);
    setTimeout(() => setReportGenerated(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Regulator Banner */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#0E2342] to-[#0A192F] text-white border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-8 h-8 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-mono">
                  CENTRAL SURVEILLANCE & ENFORCEMENT
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                  Live MoE Gateway
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
                AICTE Central Regulator Watchtower
              </h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                National real-time monitor for AICTE-approved institutions enforcing NEP 2020 seat quotas, APAAR verification fidelity, and anti-seat hoarding shields.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleGenerateReport}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-md transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              {reportGenerated ? 'Report Downloaded!' : 'Generate AICTE Audit Report'}
            </button>
          </div>
        </div>
      </div>

      {/* 4 National Macro KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1728] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Total Enrolled Students</span>
            <Users className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-2">
            3,842,910
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" />
            +4.2% YoY NEP Adoption
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1728] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>APAAR / DigiLocker Fidelity</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-2">
            98.4%
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            3.78M records authenticated
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1728] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Active Seat Hoarding Collisions</span>
            <AlertOctagon className="w-4 h-4 text-red-500" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-red-500 mt-2">
            14 Active
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            1,420 resolved this cycle
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B1728] shadow-sm">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>AICTE Approved Institutions</span>
            <Building2 className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold font-mono tracking-tight text-slate-900 dark:text-white mt-2">
            8,940
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Across 28 States & 8 UTs
          </div>
        </div>
      </div>

      {/* Watchtower Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'OVERVIEW'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          State Compliance Analytics
        </button>

        <button
          onClick={() => setActiveTab('COLLISIONS')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'COLLISIONS'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          Anti-Seat Hoarding Radar
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold">
            {concurrencyAlerts.filter(c => c.status === 'ACTIVE_VIOLATION').length} Active
          </span>
        </button>
      </div>

      {/* TAB 1: STATE COMPLIANCE ANALYTICS */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* State Table */}
          <div className="lg:col-span-8 bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Regional AICTE Intake & Compliance Radar
                </h3>
                <p className="text-xs text-slate-500">
                  Real-time synchronization across state directorates of technical education (DTE)
                </p>
              </div>

              <span className="font-mono text-xs text-slate-400">
                AY 2024-25
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="py-2.5 px-3">State / Region</th>
                    <th className="py-2.5 px-3">Approved Colleges</th>
                    <th className="py-2.5 px-3">Students Enrolled</th>
                    <th className="py-2.5 px-3">Compliance %</th>
                    <th className="py-2.5 px-3 text-right">Anomalies</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                  {AICTE_REGIONAL_STATS.map(stat => (
                    <tr key={stat.state} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-3 font-sans font-bold text-slate-900 dark:text-white">
                        {stat.state}
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                        {stat.colleges.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                        {stat.enrolled.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-emerald-500">
                            {stat.compliantPct}%
                          </span>
                          <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${stat.compliantPct}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 text-right">
                        {stat.anomalies > 10 ? (
                          <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 font-bold">
                            {stat.anomalies} Flagged
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-bold">
                            {stat.anomalies} Nominal
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AICTE Quota Rule Breakdown Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-500" />
                Statutory Reservation Caps
              </h3>
              <p className="text-xs text-slate-500">
                AICTE Approval Process Handbook (APH 2024-27) Quota Mandates:
              </p>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Open / General Merit</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">50.0%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">OBC-NCL Category</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">27.0%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">SC (Scheduled Caste)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">15.0%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">ST (Scheduled Tribe)</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">7.5%</span>
                </div>
                <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">EWS Supernumerary</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">10.0%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ANTI-SEAT HOARDING WORKBENCH */}
      {activeTab === 'COLLISIONS' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-[#0B1728] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-red-500" />
                Cross-College Concurrency Shield Interceptions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Real-time national unique constraint on <code className="font-mono px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-red-500 font-bold">(apaar_id, academic_year)</code>. Flagging students who hoarded multiple engineering seats across state lines.
              </p>
            </div>

            <div className="space-y-4 mt-4">
              {concurrencyAlerts.map(alert => {
                const isViolation = alert.status === 'ACTIVE_VIOLATION';

                return (
                  <div
                    key={alert.id}
                    className={`p-5 rounded-xl border transition-all ${
                      isViolation
                        ? 'border-red-500/50 bg-red-500/5 dark:bg-red-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-xs text-slate-500">
                            {alert.id}
                          </span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            isViolation
                              ? 'bg-red-500 text-white'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {alert.status.replace(/_/g, ' ')}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                          Student: {alert.studentName}
                        </h4>
                        <div className="font-mono text-xs text-slate-500 mt-0.5">
                          APAAR ID: <strong className="text-slate-900 dark:text-white">{alert.apaarId}</strong> · Academic Year: {alert.academicYear}
                        </div>
                      </div>

                      {isViolation && (
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => onResolveAlert(alert.id, 'REVOKED')}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors cursor-pointer"
                          >
                            Revoke Duplicate Seat
                          </button>
                          <button
                            onClick={() => onResolveAlert(alert.id, 'NOC')}
                            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                          >
                            Approve Transfer NOC
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Conflicting Institutions Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800/60 text-xs">
                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] font-bold uppercase text-slate-400 font-mono">
                          Institution A (First Enrollment)
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white mt-1">
                          {alert.collegeA.name}
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          Code: <span className="font-mono">{alert.collegeA.id}</span> · Branch: {alert.collegeA.branch}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 mt-1">
                          Admitted On: {alert.collegeA.admissionDate}
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] font-bold uppercase text-red-500 font-mono">
                          Institution B (Conflicting Second Claim)
                        </div>
                        <div className="font-bold text-slate-900 dark:text-white mt-1">
                          {alert.collegeB.name}
                        </div>
                        <div className="text-slate-500 mt-0.5">
                          Code: <span className="font-mono">{alert.collegeB.id}</span> · Branch: {alert.collegeB.branch}
                        </div>
                        <div className="font-mono text-[11px] text-red-400 mt-1">
                          Admitted On: {alert.collegeB.admissionDate} (DUPLICATE)
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-slate-500 flex items-center justify-between">
                      <span>Detected: {alert.detectedTimestamp}</span>
                      <span className="font-semibold text-amber-600 dark:text-amber-400">
                        {alert.penaltyStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
