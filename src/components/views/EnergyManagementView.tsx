import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  BatteryCharging, 
  Zap, 
  Leaf, 
  IndianRupee, 
  Activity, 
  ArrowRight, 
  ShieldCheck, 
  Radio, 
  Sliders,
  TrendingDown
} from 'lucide-react';

export const EnergyManagementView: React.FC = () => {
  // Live fluctuating power nodes
  const [telemetry, setTelemetry] = useState({
    solarGenerationKw: 48.6,
    batterySocPercent: 82,
    batteryPowerKw: 25.0, // positive = discharging to chargers
    gridImportKw: 42.4,
    chargersTotalLoadKw: 116.0,
    dailySolarGenerationKwh: 342.0,
    dailyCarbonSavedKg: 284,
    dailyEnergyCostSavedInr: 2907,
  });

  // Simulated live fluctuating telemetry
  useEffect(() => {
    const timer = setInterval(() => {
      setTelemetry(prev => {
        const solarJitter = (Math.random() - 0.5) * 1.5;
        const newSolar = Math.max(30, Math.min(65, Number((prev.solarGenerationKw + solarJitter).toFixed(1))));
        const loadJitter = (Math.random() - 0.5) * 3.0;
        const newLoad = Math.max(90, Math.min(140, Number((prev.chargersTotalLoadKw + loadJitter).toFixed(1))));
        const batteryDischarge = 25.0;
        const newGrid = Math.max(10, Number((newLoad - newSolar - batteryDischarge).toFixed(1)));

        return {
          ...prev,
          solarGenerationKw: newSolar,
          chargersTotalLoadKw: newLoad,
          gridImportKw: newGrid,
          dailyCarbonSavedKg: prev.dailyCarbonSavedKg + 0.1,
          dailyEnergyCostSavedInr: prev.dailyEnergyCostSavedInr + 0.5,
        };
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-950 via-[#0A2E1F] to-[#002D62] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Microgrid & BESS Energy Orchestrator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Hybrid Energy Flow & Storage (BESS)
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 mt-1 max-w-2xl">
            Real-time telemetry showing Solar Rooftop generation, Battery Energy Storage (BESS) peak-shaving, and Discom grid import optimization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            Smart Inverter Bus Active
          </span>
        </div>
      </div>

      {/* Top Sustainability & Savings Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Solar Generation Today</span>
          <div className="text-2xl font-black text-amber-600 mt-1 font-mono">
            {telemetry.dailySolarGenerationKwh.toFixed(0)} <span className="text-xs text-slate-400">kWh</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Zero Marginal Cost</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">BESS Battery State (SoC)</span>
          <div className="text-2xl font-black text-blue-600 mt-1 font-mono">
            {telemetry.batterySocPercent}%
          </div>
          <span className="text-[10px] text-slate-400">100 kWh LFP Pack Healthy</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Daily Energy Savings</span>
          <div className="text-2xl font-black text-emerald-700 mt-1 font-mono">
            ₹{Math.round(telemetry.dailyEnergyCostSavedInr).toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Avoided Peak Discom Tariff</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">CO₂ Avoided Today</span>
          <div className="text-2xl font-black text-slate-800 mt-1 font-mono">
            {Math.round(telemetry.dailyCarbonSavedKg)} <span className="text-xs text-slate-400">kg</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Equivalent to 12 Trees</span>
        </div>
      </div>

      {/* Visual Energy Flow Diagram: Grid → Solar → BESS → Chargers */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Live Microgrid Energy Flow Bus</h3>
            <p className="text-xs text-slate-400">Interactive schematic showing power sources routing into EV chargers</p>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">Total Dispenser Demand</span>
            <span className="text-xl font-black text-emerald-400 font-mono">{telemetry.chargersTotalLoadKw} kW</span>
          </div>
        </div>

        {/* 4 Connected Nodes Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
          {/* Node 1: Grid */}
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full border border-blue-500/30">
                Discom 11 kV
              </span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-400">Grid Import</span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {telemetry.gridImportKw} kW
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Tariff: ₹8.50 / kWh</p>
            </div>
          </div>

          {/* Node 2: Solar Rooftop */}
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/30">
                Solar Array
              </span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-400">Solar Generation</span>
              <div className="text-2xl font-black text-amber-300 font-mono mt-0.5">
                {telemetry.solarGenerationKw} kW
              </div>
              <p className="text-[11px] text-emerald-400 mt-1">42% of station load</p>
            </div>
          </div>

          {/* Node 3: BESS Battery */}
          <div className="bg-slate-800/80 border border-slate-700 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <BatteryCharging className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
                BESS LFP
              </span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-400">Discharging Load</span>
              <div className="text-2xl font-black text-purple-300 font-mono mt-0.5">
                {telemetry.batteryPowerKw} kW
              </div>
              <p className="text-[11px] text-slate-400 mt-1">SoC: {telemetry.batterySocPercent}% Available</p>
            </div>
          </div>

          {/* Node 4: EV Charging Hub */}
          <div className="bg-gradient-to-br from-[#002D62] to-[#0A3D78] border border-blue-500/40 p-5 rounded-2xl flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
                Vehicle Dispensers
              </span>
            </div>
            <div className="mt-4">
              <span className="text-xs text-blue-200">Active Load Delivered</span>
              <div className="text-2xl font-black text-white font-mono mt-0.5">
                {telemetry.chargersTotalLoadKw} kW
              </div>
              <p className="text-[11px] text-emerald-300 mt-1">6 Active vehicle sessions</p>
            </div>
          </div>
        </div>

        {/* Dynamic Energy Mix Breakdown */}
        <div className="pt-2">
          <div className="flex justify-between text-xs text-slate-300 mb-2">
            <span>Current Real-Time Energy Mix:</span>
            <span className="font-mono text-emerald-400 font-bold">
              {Math.round(((telemetry.solarGenerationKw + telemetry.batteryPowerKw) / telemetry.chargersTotalLoadKw) * 100)}% Green Energy
            </span>
          </div>
          <div className="h-3.5 bg-slate-800 rounded-full flex overflow-hidden">
            <div 
              className="bg-amber-400 h-full" 
              style={{ width: `${(telemetry.solarGenerationKw / telemetry.chargersTotalLoadKw) * 100}%` }}
              title="Solar Rooftop" 
            />
            <div 
              className="bg-purple-500 h-full" 
              style={{ width: `${(telemetry.batteryPowerKw / telemetry.chargersTotalLoadKw) * 100}%` }}
              title="BESS Storage" 
            />
            <div 
              className="bg-blue-500 h-full flex-1" 
              title="Discom Utility Grid" 
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-2">
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Solar: {telemetry.solarGenerationKw} kW</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> Battery: {telemetry.batteryPowerKw} kW</span>
            <span className="flex items-center gap-1 text-blue-400"><span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Utility Grid: {telemetry.gridImportKw} kW</span>
          </div>
        </div>
      </div>
    </div>
  );
};
