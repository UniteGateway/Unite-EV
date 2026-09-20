import React, { useState } from 'react';
import { 
  Truck, 
  Car, 
  Zap, 
  CreditCard, 
  Calendar, 
  TrendingUp, 
  Plus, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Fuel, 
  ArrowRight,
  BatteryCharging,
  Sliders,
  Radio,
  FileSpreadsheet
} from 'lucide-react';

export const FleetManagementView: React.FC = () => {
  const [fleetVehicles, setFleetVehicles] = useState([
    { id: 'FL-01', regNo: 'MH 12 QX 9081', model: 'Tata Ace EV (17 kWh)', driver: 'Suresh Patil', soc: 78, status: 'on_route', assignedDepot: 'Pune Chakan Hub', rfidTag: 'RFID-UP-9921', costPerKm: 1.42 },
    { id: 'FL-02', regNo: 'MH 14 TC 4420', model: 'Mahindra Zor Grand', driver: 'Kailash Verma', soc: 42, status: 'charging', assignedDepot: 'Pimpri Logistics Bay', rfidTag: 'RFID-UP-9922', costPerKm: 1.38 },
    { id: 'FL-03', regNo: 'DL 01 EV 8122', model: 'BYD E6 Commercial Cab', driver: 'Amrit Singh', soc: 91, status: 'idle', assignedDepot: 'Delhi NCR Hub', rfidTag: 'RFID-UP-9923', costPerKm: 1.95 },
    { id: 'FL-04', regNo: 'KA 03 MM 7711', model: 'Tata Nexon EV Prime Fleet', driver: 'Girish Gowda', soc: 24, status: 'scheduled', assignedDepot: 'Bengaluru Tech Corridors', rfidTag: 'RFID-UP-9924', costPerKm: 2.10 },
  ]);

  const [addVehicleOpen, setAddVehicleOpen] = useState(false);
  const [newRegNo, setNewRegNo] = useState('');
  const [newDriver, setNewDriver] = useState('');
  const [newModel, setNewModel] = useState('Tata Ace EV');

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRegNo || !newDriver) return;
    const newV = {
      id: `FL-0${fleetVehicles.length + 1}`,
      regNo: newRegNo,
      model: newModel,
      driver: newDriver,
      soc: 100,
      status: 'idle',
      assignedDepot: 'Central Commercial Depot',
      rfidTag: `RFID-UP-${Math.floor(1000 + Math.random() * 9000)}`,
      costPerKm: 1.55,
    };
    setFleetVehicles([...fleetVehicles, newV]);
    setNewRegNo('');
    setNewDriver('');
    setAddVehicleOpen(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Fleet Hero & Corporate Credit Line Bar */}
      <div className="bg-gradient-to-r from-[#002D62] via-[#0A3D78] to-[#002047] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
            <Truck className="w-3.5 h-3.5" />
            Commercial EV Fleet Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Logistics & Taxi Fleet Charging Portal
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
            Centralized post-paid corporate billing, RFID digital keys, overnight off-peak charging schedules, and cost-per-km telemetry.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 text-right flex flex-col items-end">
          <span className="text-[10px] uppercase font-bold text-slate-300">Corporate Credit Facility</span>
          <div className="text-2xl font-black text-emerald-400 font-mono">₹8,50,000</div>
          <span className="text-xs text-blue-200 mt-0.5">30-Day Consolidated Net Invoice</span>
        </div>
      </div>

      {/* Fleet KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Enrolled Vehicles</span>
          <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{fleetVehicles.length} EVs</div>
          <span className="text-[10px] text-emerald-600 font-semibold">100% RFID Enabled</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Average Energy Cost / Km</span>
          <div className="text-2xl font-black text-[#002D62] mt-1 font-mono">₹1.68 / km</div>
          <span className="text-[10px] text-emerald-600 font-semibold">74% savings vs diesel</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Overnight Depot Slots Booked</span>
          <div className="text-2xl font-black text-purple-700 mt-1 font-mono">4 Bays</div>
          <span className="text-[10px] text-slate-400">11:00 PM - 05:00 AM off-peak</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total CO₂ Offset This Month</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">14.2 Tons</div>
          <span className="text-[10px] text-emerald-700 font-semibold">ESG Audited Report</span>
        </div>
      </div>

      {/* Fleet Vehicles Table & Dispatch Actions */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Enrolled Fleet Assets & Live Battery Telemetry</h3>
            <p className="text-xs text-slate-500">Manage drivers, RFID pass cards, and scheduled depot charging</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAddVehicleOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#002D62] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Onboard New EV Asset</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="p-3">Vehicle ID</th>
                <th className="p-3">Registration & Model</th>
                <th className="p-3">Assigned Driver</th>
                <th className="p-3">RFID Smart Tag</th>
                <th className="p-3">Battery SoC</th>
                <th className="p-3">Live Status</th>
                <th className="p-3">Energy Cost / Km</th>
                <th className="p-3 text-right">Depot Slot</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {fleetVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-50/70">
                  <td className="p-3 font-mono font-bold text-[#002D62]">{v.id}</td>
                  <td className="p-3">
                    <div className="font-bold text-slate-900">{v.regNo}</div>
                    <div className="text-[10px] text-slate-400">{v.model}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-semibold text-slate-800">{v.driver}</div>
                    <div className="text-[10px] text-slate-400">KYC Verified Driver</div>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{v.rfidTag}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${v.soc > 50 ? 'bg-emerald-500' : v.soc > 25 ? 'bg-amber-500' : 'bg-rose-500'}`}
                          style={{ width: `${v.soc}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold text-slate-900">{v.soc}%</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'charging'
                        ? 'bg-blue-100 text-blue-800 animate-pulse'
                        : v.status === 'on_route'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {v.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-emerald-700 font-bold">
                    ₹{v.costPerKm.toFixed(2)}/km
                  </td>
                  <td className="p-3 text-right">
                    <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                      {v.assignedDepot}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Overnight Depot Scheduling Box */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
            Automated Off-Peak Optimization
          </span>
          <h3 className="text-base font-bold text-white mt-1">
            Overnight Depot Smart Charging Algorithms
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Automatically schedules vehicle charging during state Discom off-peak tariff hours (typically 10 PM - 6 AM), saving your business up to 28% on energy costs per kWh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => alert('Exporting Fleet Consolidated GST Ledger & Session Logs (CSV)')}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export Fleet Billing CSV</span>
          </button>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {addVehicleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-2xl p-5 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Onboard Fleet Commercial EV</h3>
              <button onClick={() => setAddVehicleOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vehicle Registration Number</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MH 12 AB 1234"
                  value={newRegNo}
                  onChange={(e) => setNewRegNo(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Driver Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Shinde"
                  value={newDriver}
                  onChange={(e) => setNewDriver(e.target.value)}
                  className="w-full p-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Vehicle Model Category</label>
                <select
                  value={newModel}
                  onChange={(e) => setNewModel(e.target.value)}
                  className="w-full p-2 border rounded-xl bg-white"
                >
                  <option value="Tata Ace EV">Tata Ace EV (17 kWh Mini Truck)</option>
                  <option value="Mahindra Zor Grand">Mahindra Zor Grand 3W L5</option>
                  <option value="Tata Nexon EV Prime">Tata Nexon EV Fleet Sedan</option>
                  <option value="BYD E6 Commercial">BYD E6 Commercial MUV</option>
                  <option value="Switch Mobility EiV12">Switch Mobility Electric Bus</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#002D62] text-white font-bold rounded-xl hover:bg-blue-900"
                >
                  Assign Digital RFID & Add Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
