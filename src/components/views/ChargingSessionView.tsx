import React, { useState, useEffect } from 'react';
import { EVStation, ChargingSession, ChargingInvoice } from '../../types';
import { 
  Zap, 
  BatteryCharging, 
  Clock, 
  IndianRupee, 
  ShieldCheck, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Car,
  Play,
  Square,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface ChargingSessionViewProps {
  station: EVStation;
  walletBalance: number;
  onPaySession: (amount: number, invoice: ChargingInvoice) => void;
  onSessionCompleteStateChange: (isActive: boolean) => void;
}

export const ChargingSessionView: React.FC<ChargingSessionViewProps> = ({
  station,
  walletBalance,
  onPaySession,
  onSessionCompleteStateChange,
}) => {
  // Session simulation state
  const [session, setSession] = useState<ChargingSession>({
    sessionId: `SESS-UP-${Math.floor(100000 + Math.random() * 900000)}`,
    stationId: station.id,
    stationName: station.name,
    chargerGunId: station.guns[0]?.id || 'gun-1',
    connectorType: 'CCS2 Fast (120 kW)',
    vehicleModel: 'Tata Nexon EV Max (40.5 kWh)',
    vehicleRegNo: 'MH 01 DX 4492',
    startedAt: new Date().toLocaleTimeString(),
    currentPowerKw: 58.4,
    energyConsumedKwh: 12.4,
    durationSeconds: 780, // ~13 mins
    currentCostInr: 229.4,
    batteryPercent: 38,
    targetPercent: 85,
    status: 'charging',
  });

  const [paymentDone, setPaymentDone] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'wallet' | 'upi' | 'card'>('wallet');
  const [generatedInvoice, setGeneratedInvoice] = useState<ChargingInvoice | null>(null);

  // Inform parent about active session
  useEffect(() => {
    onSessionCompleteStateChange(session.status === 'charging');
  }, [session.status, onSessionCompleteStateChange]);

  // Live timer & energy accumulator loop
  useEffect(() => {
    let interval: any = null;
    if (session.status === 'charging') {
      interval = setInterval(() => {
        setSession((prev) => {
          if (prev.batteryPercent >= prev.targetPercent) {
            return { ...prev, status: 'completed' };
          }
          const newDuration = prev.durationSeconds + 1;
          const energyIncrement = 0.015; // realistic simulation step
          const newEnergy = Number((prev.energyConsumedKwh + energyIncrement).toFixed(2));
          const newCost = Number((newEnergy * station.pricePerKwh).toFixed(2));
          const newSoc = Math.min(prev.targetPercent, Number((prev.batteryPercent + 0.05).toFixed(1)));

          return {
            ...prev,
            durationSeconds: newDuration,
            energyConsumedKwh: newEnergy,
            currentCostInr: newCost,
            batteryPercent: newSoc,
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [session.status, station.pricePerKwh]);

  const handleStartCharging = () => {
    setSession(prev => ({
      ...prev,
      status: 'charging',
      startedAt: new Date().toLocaleTimeString(),
    }));
  };

  const handleStopCharging = () => {
    const finalEnergy = session.energyConsumedKwh;
    const baseEnergyCost = Number((finalEnergy * station.pricePerKwh).toFixed(2));
    const gstCost = Number((baseEnergyCost * 0.18).toFixed(2));
    const convenienceCost = 25.0;
    const grandTotal = Number((baseEnergyCost + gstCost + convenienceCost).toFixed(2));

    const invoice: ChargingInvoice = {
      invoiceId: `UP-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      stationName: station.name,
      stationAddress: station.address,
      vehicleNumber: `${session.vehicleRegNo} (${session.vehicleModel})`,
      energyKwh: finalEnergy,
      durationMinutes: Math.ceil(session.durationSeconds / 60),
      energyChargeInr: baseEnergyCost,
      gstInr: gstCost,
      convenienceFeeInr: convenienceCost,
      totalInr: grandTotal,
      paymentMethod: selectedPaymentMethod,
      transactionId: `TXN_UP_${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    setGeneratedInvoice(invoice);
    setSession(prev => ({ ...prev, status: 'completed' }));
  };

  const handleExecutePayment = () => {
    if (generatedInvoice) {
      onPaySession(generatedInvoice.totalInr, generatedInvoice);
      setPaymentDone(true);
    }
  };

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Session Title Bar */}
      <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-sm">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Live Dispenser Session: {session.connectorType}
              </h2>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                session.status === 'charging'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse'
                  : session.status === 'completed'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-700'
              }`}>
                {session.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {station.name} • Bay 2 (CCS2 Gun A)
            </p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="text-[10px] uppercase font-bold text-slate-400">Session ID</span>
          <div className="text-xs font-mono font-bold text-slate-700">{session.sessionId}</div>
        </div>
      </div>

      {/* Main Active Charging Cockpit */}
      {session.status !== 'completed' ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Visual Battery SoC & Power Delivery Dial (Left) */}
          <div className="md:col-span-6 bg-gradient-to-b from-[#002D62] to-[#0A2540] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col items-center justify-between text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />

            <div className="w-full flex items-center justify-between text-xs text-blue-200">
              <span className="flex items-center gap-1.5">
                <Car className="w-4 h-4 text-emerald-400" />
                {session.vehicleModel}
              </span>
              <span className="font-mono">{session.vehicleRegNo}</span>
            </div>

            {/* Circular SoC Progress */}
            <div className="my-8 relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#1E293B"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="url(#greenGradient)"
                  strokeWidth="8"
                  strokeDasharray="251.2"
                  strokeDashoffset={251.2 - (251.2 * session.batteryPercent) / 100}
                  strokeLinecap="round"
                  fill="none"
                  className="transition-all duration-700"
                />
                <defs>
                  <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#22C55E" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute flex flex-col items-center justify-center">
                <BatteryCharging className="w-8 h-8 text-emerald-400 mb-1 animate-bounce" />
                <span className="text-3xl font-black tracking-tight">{session.batteryPercent.toFixed(0)}%</span>
                <span className="text-[10px] text-blue-200">State of Charge (SoC)</span>
              </div>
            </div>

            {/* Live Power Output */}
            <div className="w-full bg-white/10 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-300 block text-[10px]">Charging Power</span>
                <span className="text-lg font-black text-amber-300 font-mono">
                  {session.currentPowerKw.toFixed(1)} kW
                </span>
              </div>
              <div className="h-6 w-[1px] bg-white/20" />
              <div>
                <span className="text-slate-300 block text-[10px]">Target Cutoff</span>
                <span className="text-lg font-bold text-white font-mono">
                  {session.targetPercent}%
                </span>
              </div>
              <div className="h-6 w-[1px] bg-white/20" />
              <div>
                <span className="text-slate-300 block text-[10px]">Est. Time to 80%</span>
                <span className="text-lg font-bold text-emerald-300 font-mono">
                  18 mins
                </span>
              </div>
            </div>
          </div>

          {/* Metrics & Control Actions (Right) */}
          <div className="md:col-span-6 space-y-4">
            {/* Live Meters */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Elapsed Duration
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                  {formatDuration(session.durationSeconds)}
                </div>
                <span className="text-[10px] text-slate-400">Started at {session.startedAt}</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Energy Consumed
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                  {session.energyConsumedKwh.toFixed(2)} <span className="text-xs text-slate-500">kWh</span>
                </div>
                <span className="text-[10px] text-emerald-600 font-semibold">
                  ~{(session.energyConsumedKwh * 6.5).toFixed(0)} km Range Added
                </span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-600" /> Current Accrued Cost
                </span>
                <div className="text-2xl font-black text-slate-900 mt-1 font-mono">
                  ₹{session.currentCostInr.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-400">@ ₹{station.pricePerKwh.toFixed(1)} / kWh</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> Est. Final Cost
                </span>
                <div className="text-2xl font-black text-blue-900 mt-1 font-mono">
                  ₹{((session.energyConsumedKwh + 12) * station.pricePerKwh).toFixed(0)}
                </div>
                <span className="text-[10px] text-slate-400">Full 85% Charge</span>
              </div>
            </div>

            {/* Safety & Protocol Card */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                OCPP 2.0.1 Smart Protocol Active
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ground fault interrupt, temperature sensors and voltage regulation are active. Unplugging gun will safely disconnect high-voltage relay.
              </p>
            </div>

            {/* Big Action Buttons */}
            <div className="pt-2">
              {session.status === 'charging' ? (
                <button
                  onClick={handleStopCharging}
                  className="w-full py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-white" />
                  <span>Stop Charging & Proceed to Payment</span>
                </button>
              ) : (
                <button
                  onClick={handleStartCharging}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Resume Charging</span>
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Completed State & GST Invoice Payment View */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6 animate-in zoom-in-95 duration-200">
          <div className="text-center space-y-2 pb-4 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Charging Completed Successfully!</h3>
            <p className="text-xs text-slate-500">
              Vehicle unlatched and dispenser gun returned safely to dock.
            </p>
          </div>

          {generatedInvoice && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Detailed Tax Invoice (Left) */}
              <div className="md:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Official Tax Invoice</span>
                    <div className="text-sm font-bold text-[#002D62] font-mono">{generatedInvoice.invoiceId}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400">{generatedInvoice.date}</span>
                    <div className="text-xs font-semibold text-slate-700">{generatedInvoice.vehicleNumber}</div>
                  </div>
                </div>

                {/* Line Items */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Units Consumed ({generatedInvoice.energyKwh} kWh @ ₹{station.pricePerKwh}/kWh)</span>
                    <span className="font-mono text-slate-900 font-bold">₹{generatedInvoice.energyChargeInr.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST (18% Integrated Goods & Service Tax)</span>
                    <span className="font-mono text-slate-900">₹{generatedInvoice.gstInr.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform & Cloud Telemetry Fee</span>
                    <span className="font-mono text-slate-900">₹{generatedInvoice.convenienceFeeInr.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-slate-200 text-base font-extrabold text-slate-900">
                    <span>Total Amount Payable</span>
                    <span className="font-mono text-[#002D62]">₹{generatedInvoice.totalInr.toFixed(2)}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => alert(`Downloaded GST Tax Invoice PDF: ${generatedInvoice.invoiceId}`)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Digital Tax Invoice Receipt
                  </button>
                </div>
              </div>

              {/* Payment Section (Right) */}
              <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                    Select Payment Method
                  </h4>
                  <div className="space-y-2 text-xs">
                    <button
                      onClick={() => setSelectedPaymentMethod('wallet')}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'wallet'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div>Unitev EV Wallet</div>
                        <div className="text-[11px] text-slate-500 font-normal">
                          Available: ₹{walletBalance.toFixed(2)}
                        </div>
                      </div>
                      {selectedPaymentMethod === 'wallet' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod('upi')}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'upi'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div>Instant UPI / QR</div>
                        <div className="text-[11px] text-slate-500 font-normal">Google Pay, PhonePe, Paytm</div>
                      </div>
                      {selectedPaymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>

                    <button
                      onClick={() => setSelectedPaymentMethod('card')}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                        selectedPaymentMethod === 'card'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div>Credit / Debit Card</div>
                        <div className="text-[11px] text-slate-500 font-normal">Visa, Mastercard, RuPay</div>
                      </div>
                      {selectedPaymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    </button>
                  </div>
                </div>

                {paymentDone ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-800 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Payment Settled! Receipt sent to registered email.
                  </div>
                ) : (
                  <button
                    onClick={handleExecutePayment}
                    className="w-full py-3.5 bg-[#002D62] hover:bg-[#00224D] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Pay ₹{generatedInvoice.totalInr.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
