import React, { useState } from 'react';
import { EVStation } from '../../types';
import { 
  Building2, 
  Zap, 
  TrendingUp, 
  IndianRupee, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Wrench, 
  ShieldCheck,
  PowerOff,
  Radio,
  ArrowUpRight
} from 'lucide-react';

interface PartnerDashboardViewProps {
  station: EVStation;
}

export const PartnerDashboardView: React.FC<PartnerDashboardViewProps> = ({ station }) => {
  const [activeFilter, setActiveFilter] = useState<'today' | 'month'>('today');
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  // Realistic station metrics
  const todayMetrics = {
    sessions: 24,
    energySoldKwh: 684.2,
    revenueInr: 12657.7,
    utilizationPercent: 68.4,
    averageSessionMins: 32,
  };

  const monthMetrics = {
    unitsSoldKwh: 18420.0,
    revenueInr: 340770.0,
    electricityCostInr: 156570.0,
    operatingExpensesInr: 38200.0,
    netOperatingIncomeInr: 146000.0,
  };

  const chargerStatuses = [
    { id: 'gun-1', name: 'Dispenser 1 - Gun A (120kW)', status: 'online', power: 58.4, sessionMins: 14, car: 'Tata Nexon EV Max' },
    { id: 'gun-2', name: 'Dispenser 1 - Gun B (120kW)', status: 'occupied', power: 84.0, sessionMins: 22, car: 'BYD Atto 3' },
    { id: 'gun-3', name: 'Dispenser 2 - Gun A (240kW Ultra)', status: 'online', power: 0, sessionMins: 0, car: 'Ready for Plug-in' },
    { id: 'gun-4', name: 'Dispenser 2 - Gun B (240kW Ultra)', status: 'occupied', power: 142.5, sessionMins: 8, car: 'Volvo EX40' },
    { id: 'gun-5', name: 'Dispenser 3 - Gun A (60kW)', status: 'online', power: 0, sessionMins: 0, car: 'Ready for Plug-in' },
    { id: 'gun-6', name: 'Dispenser 3 - Gun B (22kW AC)', status: 'under_maintenance', power: 0, sessionMins: 0, car: 'Routine Firmware Upgrade' },
  ];

  const alerts = [
    { id: 'alt-1', title: 'Grid Voltage Fluctuation Detected', type: 'warning', time: '14 mins ago', desc: 'Input line 415V dropped to 392V momentarily. Automatic servo stabilizer corrected.' },
    { id: 'alt-2', title: 'Routine 90-Day Maintenance Due', type: 'info', time: '2 hours ago', desc: 'Quarterly filter cleaning & contactor tightening scheduled for 25th Sep.' },
    { id: 'alt-3', title: 'Settlement Payout Credited', type: 'success', time: 'Yesterday', desc: 'Net Operating Income of ₹1,46,000 credited to HDFC Bank A/C ending 8812.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Station Badge */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-[#002D62]">
              Station Owner Portal
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <Radio className="w-3.5 h-3.5 animate-pulse" /> Telemetry Live
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            {station.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">{station.address}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setTicketModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Wrench className="w-3.5 h-3.5 text-blue-600" />
            <span>Raise Service Ticket</span>
          </button>

          <button 
            onClick={() => alert('Downloading September Official Partner Settlement Statement (PDF)')}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#002D62] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-emerald-400" />
            <span>Monthly Payout Ledger</span>
          </button>
        </div>
      </div>

      {/* TODAY & MONTH Metrics Overview */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Operational Revenue & Throughput
          </h3>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveFilter('today')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'today' ? 'bg-white text-[#002D62] shadow-xs' : 'text-slate-600'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveFilter('month')}
              className={`px-3 py-1 rounded-lg transition-colors cursor-pointer ${
                activeFilter === 'month' ? 'bg-white text-[#002D62] shadow-xs' : 'text-slate-600'
              }`}
            >
              This Month
            </button>
          </div>
        </div>

        {activeFilter === 'today' ? (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Today's Sessions</span>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{todayMetrics.sessions}</div>
              <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-1">
                <ArrowUpRight className="w-3 h-3" /> +14% vs yesterday
              </span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Energy Sold</span>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                {todayMetrics.energySoldKwh} <span className="text-xs text-slate-400">kWh</span>
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">~28.5 kWh avg/session</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Gross Revenue</span>
              <div className="text-2xl font-black text-[#002D62] mt-1 font-mono">
                ₹{todayMetrics.revenueInr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Real-time billed</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Peak Utilization</span>
              <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">{todayMetrics.utilizationPercent}%</div>
              <span className="text-[10px] text-slate-400 mt-1 block">Peak: 12 PM - 3 PM</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs col-span-2 lg:col-span-1">
              <span className="text-xs text-slate-500 font-medium">Average Session</span>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{todayMetrics.averageSessionMins} <span className="text-xs text-slate-400">mins</span></div>
              <span className="text-[10px] text-slate-400 mt-1 block">High turnover speed</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Monthly Units Sold</span>
              <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                {monthMetrics.unitsSoldKwh.toLocaleString('en-IN')} <span className="text-xs text-slate-400">kWh</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Gross Revenue</span>
              <div className="text-2xl font-black text-blue-900 mt-1 font-mono">
                ₹{monthMetrics.revenueInr.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Electricity Cost (Discom)</span>
              <div className="text-2xl font-black text-rose-700 mt-1 font-mono">
                ₹{monthMetrics.electricityCostInr.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 font-medium">Operating Expenses</span>
              <div className="text-2xl font-black text-slate-700 mt-1 font-mono">
                ₹{monthMetrics.operatingExpensesInr.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-green-600 text-white p-5 rounded-2xl shadow-sm col-span-2 lg:col-span-1">
              <span className="text-xs text-emerald-100 font-medium">Net Operating Income (NOI)</span>
              <div className="text-2xl font-black mt-1 font-mono">
                ₹{monthMetrics.netOperatingIncomeInr.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-emerald-100 mt-1 block">Direct Bank Credit</span>
            </div>
          </div>
        )}
      </div>

      {/* Charger Gun Status Live Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Dispenser Gun Telemetry Status</h3>
            <p className="text-xs text-slate-500">Live operational status across all installed bays</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Online (4)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Occupied (2)</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Maintenance (1)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {chargerStatuses.map((gun) => (
            <div
              key={gun.id}
              className={`p-4 rounded-xl border transition-all ${
                gun.status === 'occupied'
                  ? 'border-blue-300 bg-blue-50/50'
                  : gun.status === 'online'
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-amber-200 bg-amber-50/40'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{gun.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  gun.status === 'occupied'
                    ? 'bg-blue-100 text-blue-800'
                    : gun.status === 'online'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {gun.status.replace('_', ' ')}
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">Current Delivery</span>
                  <span className="font-mono font-bold text-slate-800">{gun.power > 0 ? `${gun.power} kW` : 'Idle'}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Vehicle</span>
                  <span className="font-semibold text-slate-700 truncate max-w-[120px] block">{gun.car}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts & System Notifications */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            Station Operating Alerts & Notifications
          </h3>
          <span className="text-xs text-slate-400">Live feed from central telemetry</span>
        </div>

        <div className="space-y-2.5">
          {alerts.map((alt) => (
            <div
              key={alt.id}
              className={`p-3.5 rounded-xl border flex items-start gap-3 ${
                alt.type === 'warning'
                  ? 'border-amber-200 bg-amber-50/50'
                  : alt.type === 'success'
                  ? 'border-emerald-200 bg-emerald-50/50'
                  : 'border-blue-200 bg-blue-50/50'
              }`}
            >
              <div className="mt-0.5">
                {alt.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                {alt.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {alt.type === 'info' && <Radio className="w-4 h-4 text-blue-600" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">{alt.title}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{alt.time}</span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">{alt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Service Ticket Modal */}
      {ticketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-2xl p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Submit Technical Service Request</h3>
              <button 
                onClick={() => { setTicketModalOpen(false); setTicketSubmitted(false); }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {ticketSubmitted ? (
              <div className="py-8 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-bold text-slate-900">Ticket Logged: #TKT-UP-8819</h4>
                <p className="text-xs text-slate-600">Field engineer dispatched. SLA resolution within 4 hours.</p>
                <button
                  onClick={() => { setTicketModalOpen(false); setTicketSubmitted(false); }}
                  className="mt-4 px-4 py-2 bg-[#002D62] text-white text-xs font-bold rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Issue Category</label>
                  <select className="w-full text-xs p-2 border rounded-xl bg-white">
                    <option>Charger Gun Hardware / Physical</option>
                    <option>Power Quality / Grid Voltage</option>
                    <option>Internet / Cloud Gateway Communication</option>
                    <option>Consumables / Canopy Lighting</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Describe Issue</label>
                  <textarea 
                    rows={3} 
                    className="w-full text-xs p-2 border rounded-xl" 
                    placeholder="Provide details for field maintenance team..."
                    defaultValue="Gun B latch sensor showing intermittent disconnect during high-voltage initiation."
                  />
                </div>
                <button
                  onClick={() => setTicketSubmitted(true)}
                  className="w-full py-2.5 bg-[#002D62] text-white font-bold rounded-xl hover:bg-blue-900"
                >
                  Dispatch Ticket
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
