import React, { useState } from 'react';
import { StationApplication, EVStation } from '../../types';
import { 
  Activity, 
  Users, 
  Building2, 
  Zap, 
  IndianRupee, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Filter, 
  Search, 
  ChevronRight, 
  FileText, 
  ShieldCheck, 
  AlertTriangle,
  BarChart3,
  Globe2,
  SlidersHorizontal,
  FolderKanban
} from 'lucide-react';

interface AdminDashboardViewProps {
  applications: StationApplication[];
  stations: EVStation[];
  onAdvanceApplicationStage: (appId: string) => void;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({
  applications,
  stations,
  onAdvanceApplicationStage,
}) => {
  const [activeSection, setActiveSection] = useState<'applications' | 'stations' | 'financials' | 'dpr_financing'>('applications');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const networkStats = {
    totalStationsLive: 42,
    activeChargerGuns: 264,
    totalEnergyDeliveredMwh: 1482.4,
    totalNetworkGmvLakhs: 266.8,
    pendingApplications: applications.length,
    activeProjectsUnderConstruction: 18,
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.applicant.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Title & Enterprise System Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-7 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-rose-500 text-white">
              Enterprise Admin Console
            </span>
            <span className="text-xs text-slate-400">Unite Powertek Central Operations</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black mt-1 text-white">
            National Network Command & Project Operations
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time pipeline monitoring for applications, DPR approvals, and station telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-950 border border-emerald-500/40 text-emerald-400 px-3 py-1.5 rounded-xl font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Central Cloud API v2.4 Online
          </span>
        </div>
      </div>

      {/* Network KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium">Live Stations</span>
          <div className="text-xl font-black text-slate-900 mt-1 font-mono">{networkStats.totalStationsLive}</div>
          <span className="text-[10px] text-emerald-600 font-semibold">Across 9 States</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium">Charger Guns</span>
          <div className="text-xl font-black text-slate-900 mt-1 font-mono">{networkStats.activeChargerGuns}</div>
          <span className="text-[10px] text-blue-600 font-semibold">98.8% Uptime</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium">Delivered Energy</span>
          <div className="text-xl font-black text-slate-900 mt-1 font-mono">{networkStats.totalEnergyDeliveredMwh} <span className="text-xs">MWh</span></div>
          <span className="text-[10px] text-emerald-600 font-semibold">1,020 T CO₂ Saved</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium">Network GMV</span>
          <div className="text-xl font-black text-[#002D62] mt-1 font-mono">₹{networkStats.totalNetworkGmvLakhs} L</div>
          <span className="text-[10px] text-emerald-600 font-semibold">+22% MoM</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium">Applications</span>
          <div className="text-xl font-black text-amber-600 mt-1 font-mono">{networkStats.pendingApplications}</div>
          <span className="text-[10px] text-amber-700 font-semibold">In Evaluation</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-500 font-medium">Projects In Build</span>
          <div className="text-xl font-black text-purple-700 mt-1 font-mono">{networkStats.activeProjectsUnderConstruction}</div>
          <span className="text-[10px] text-slate-400">Civil & Electrical</span>
        </div>
      </div>

      {/* Admin Module Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs font-bold no-scrollbar">
        {[
          { id: 'applications', label: 'Partner Applications Pipeline', icon: <FolderKanban className="w-4 h-4" /> },
          { id: 'stations', label: 'All India Stations Grid', icon: <Building2 className="w-4 h-4" /> },
          { id: 'financials', label: 'Settlements & Revenue Share', icon: <IndianRupee className="w-4 h-4" /> },
          { id: 'dpr_financing', label: 'DPR & Bank Financing Syndication', icon: <FileText className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSection(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
              activeSection === tab.id
                ? 'bg-[#002D62] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Section 1: Applications Pipeline */}
      {activeSection === 'applications' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Partner Proposal & Onboarding Intake</h3>
              <p className="text-xs text-slate-500">Review landowner proposals and advance project milestones</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Filter by name, ID or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="text-xs px-3 py-1.5 border border-slate-200 rounded-xl w-60"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <th className="p-3">Application ID</th>
                  <th className="p-3">Applicant</th>
                  <th className="p-3">Location & Type</th>
                  <th className="p-3">Land / Frontage</th>
                  <th className="p-3">Budget Tier</th>
                  <th className="p-3">Current Milestone</th>
                  <th className="p-3">Financing</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3 font-mono font-bold text-[#002D62]">{app.id}</td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{app.applicant.fullName}</div>
                      <div className="text-[10px] text-slate-400">{app.applicant.mobile}</div>
                    </td>
                    <td className="p-3">
                      <div>{app.location.city}, {app.location.state}</div>
                      <div className="text-[10px] text-slate-400 capitalize">{app.location.siteCategory}</div>
                    </td>
                    <td className="p-3">
                      <div>{app.property.landAreaSqFt} sq.ft</div>
                      <div className="text-[10px] text-slate-400">{app.property.roadFrontageFt} ft frontage</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      ₹{app.investment.budgetTier}
                    </td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-100 text-[#002D62] uppercase tracking-wider">
                        {app.currentStage.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="p-3">
                      {app.investment.wantsFinancingAssistance ? (
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                          Requested Debt
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400">Self-Funded</span>
                      )}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => onAdvanceApplicationStage(app.id)}
                        className="px-3 py-1.5 bg-[#002D62] text-white font-bold rounded-lg text-[11px] hover:bg-blue-900 transition-colors cursor-pointer"
                      >
                        Advance Milestone
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Section 2: All India Stations Grid */}
      {activeSection === 'stations' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Active Operational Hubs</h3>
              <p className="text-xs text-slate-500">Live grid power telemetry, occupied bays & tariff controls</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stations.map((st) => (
              <div key={st.id} className="p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-all space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{st.name}</h4>
                    <p className="text-[11px] text-slate-500">{st.city}, {st.state}</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-emerald-600">
                    ₹{st.pricePerKwh}/kWh
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-600">
                  <span>Available: <strong>{st.availableChargers} / {st.totalChargers}</strong></span>
                  <span>Peak Cap: <strong>{st.maxPowerKw} kW</strong></span>
                </div>

                <div className="flex items-center gap-1 pt-1">
                  {st.guns.map((g) => (
                    <span
                      key={g.id}
                      className={`h-2 flex-1 rounded-full ${
                        g.status === 'available'
                          ? 'bg-emerald-500'
                          : g.status === 'charging'
                          ? 'bg-blue-500'
                          : 'bg-slate-300'
                      }`}
                      title={`${g.name}: ${g.status}`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Financials & Settlement */}
      {activeSection === 'financials' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">National Settlement Clearinghouse</h3>
              <p className="text-xs text-slate-500">Automated Discom power pass-through and partner revenue disbursement</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
              <span className="text-xs text-blue-700 font-bold">Total September Energy GMV</span>
              <div className="text-2xl font-black text-[#002D62] mt-1 font-mono">₹1,84,92,400</div>
              <span className="text-[10px] text-slate-500 mt-1 block">Customer digital payments collected</span>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200">
              <span className="text-xs text-rose-700 font-bold">Discom Power Dues</span>
              <div className="text-2xl font-black text-rose-800 mt-1 font-mono">₹89,20,500</div>
              <span className="text-[10px] text-slate-500 mt-1 block">MSEDCL, BESCOM, UPPCL remittances</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-xs text-emerald-700 font-bold">Net Partner Payouts Cleared</span>
              <div className="text-2xl font-black text-emerald-800 mt-1 font-mono">₹74,45,200</div>
              <span className="text-[10px] text-emerald-700 mt-1 block">Disbursed on 5th of this month</span>
            </div>
          </div>
        </div>
      )}

      {/* Section 4: DPR & Financing */}
      {activeSection === 'dpr_financing' && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">DPR & Bank Syndication Console</h3>
              <p className="text-xs text-slate-500">State Bank of India, Canara Bank, Bank of Baroda & MSME CGTMSE tracking</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">NH48 Shirwal Superhub (UP-EV-2026-8842)</div>
                <div className="text-slate-500">Capex: ₹38.5 Lakhs • Requested Debt: ₹26.0 Lakhs (Canara Bank MSME)</div>
              </div>
              <span className="px-3 py-1 rounded-full font-bold bg-amber-100 text-amber-800 text-[11px]">
                In-Principle Credit Appraisal
              </span>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Vadgaon Toll Plaza Hub (UP-EV-2026-9142)</div>
                <div className="text-slate-500">Capex: ₹42.0 Lakhs • Requested Debt: ₹29.0 Lakhs (SBI Green Mobility)</div>
              </div>
              <span className="px-3 py-1 rounded-full font-bold bg-blue-100 text-blue-800 text-[11px]">
                DPR Technical Vetting Complete
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
