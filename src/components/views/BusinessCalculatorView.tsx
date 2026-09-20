import React, { useState, useMemo } from 'react';
import { CalculatorInputs } from '../../types';
import { 
  Calculator, 
  IndianRupee, 
  TrendingUp, 
  Clock, 
  Zap, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  Sliders,
  BarChart3,
  PieChart,
  Percent
} from 'lucide-react';

interface BusinessCalculatorViewProps {
  onApplyWithParameters: (inputs: CalculatorInputs) => void;
}

export const BusinessCalculatorView: React.FC<BusinessCalculatorViewProps> = ({
  onApplyWithParameters,
}) => {
  // Configurable inputs state with realistic defaults
  const [inputs, setInputs] = useState<CalculatorInputs>({
    landAvailableSqFt: 5000,
    numberOfChargers: 4,
    chargerCapacityKw: 120, // 120kW Dual Gun Fast Charger
    investmentLakhs: 36, // ₹36 Lakhs Capex
    electricityTariffInr: 8.5, // Discom industrial EV tariff
    chargingSellingPriceInr: 18.0, // Commercial retail selling price
    averageDailySessions: 8, // sessions per charger gun per day
    averageKwhPerSession: 28, // ~28 kWh per charge
    operatingDaysPerYear: 365,
    maintenanceCostPerMonthInr: 12000,
    rentPerMonthInr: 25000,
    financingInterestRate: 9.5, // 9.5% bank loan interest on 70% debt
  });

  // Derived financial computations
  const calculations = useMemo(() => {
    const totalGuns = inputs.numberOfChargers;
    const totalDailySessions = totalGuns * inputs.averageDailySessions;
    const dailyUnitsKwh = totalDailySessions * inputs.averageKwhPerSession;
    const monthlyUnitsKwh = dailyUnitsKwh * 30.4;
    const annualUnitsKwh = dailyUnitsKwh * inputs.operatingDaysPerYear;

    // Gross Revenues
    const dailyGrossRevenueInr = dailyUnitsKwh * inputs.chargingSellingPriceInr;
    const annualGrossRevenueInr = annualUnitsKwh * inputs.chargingSellingPriceInr;

    // Costs
    const annualElectricityCostInr = annualUnitsKwh * inputs.electricityTariffInr;
    const annualOpexInr = (inputs.maintenanceCostPerMonthInr + inputs.rentPerMonthInr) * 12 + (annualGrossRevenueInr * 0.04); // software + network platform fee 4%

    // EBITDA
    const annualEbitdaInr = annualGrossRevenueInr - annualElectricityCostInr - annualOpexInr;

    // Debt Financing (Assuming 70% debt, 30% equity)
    const loanAmountInr = (inputs.investmentLakhs * 100000) * 0.70;
    const annualFinancingCostInr = loanAmountInr * (inputs.financingInterestRate / 100);

    // Net Annual Cashflow to Partner
    const annualNetCashFlowInr = Math.max(0, annualEbitdaInr - annualFinancingCostInr);

    // Payback Period (Years on total investment)
    const estimatedPaybackPeriodYears = annualNetCashFlowInr > 0
      ? Number(((inputs.investmentLakhs * 100000) / annualNetCashFlowInr).toFixed(1))
      : 9.9;

    const annualRoiPercent = Number(((annualNetCashFlowInr / (inputs.investmentLakhs * 100000)) * 100).toFixed(1));

    return {
      dailyUnitsKwh,
      monthlyUnitsKwh,
      annualUnitsKwh,
      dailyGrossRevenueInr,
      annualGrossRevenueInr,
      annualElectricityCostInr,
      annualOpexInr,
      annualEbitdaInr,
      annualFinancingCostInr,
      annualNetCashFlowInr,
      estimatedPaybackPeriodYears,
      annualRoiPercent,
    };
  }, [inputs]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#002D62] to-[#0A3D78] text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
          <Calculator className="w-3.5 h-3.5" />
          Interactive Techno-Economic Model
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          EV Charging Station Business ROI Calculator
        </h1>
        <p className="text-xs sm:text-sm text-blue-100 mt-1 max-w-2xl">
          Simulate capital investment, electricity input tariff, retail price per kWh, operating expenses, and estimated annual net cash flows.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Sliders & Controls */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[#002D62]" />
              Operating Assumptions & Infrastructure Inputs
            </h3>
            <span className="text-xs text-slate-400 font-medium">Instant Recalculation</span>
          </div>

          {/* Grid of Sliders */}
          <div className="space-y-5 text-xs">
            {/* Number of Chargers / Guns */}
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1.5">
                <span>Number of Charging Dispensers (Guns)</span>
                <span className="text-[#002D62] font-mono text-sm">{inputs.numberOfChargers} Guns</span>
              </div>
              <input
                type="range"
                min={2}
                max={16}
                step={2}
                value={inputs.numberOfChargers}
                onChange={(e) => setInputs(prev => ({ ...prev, numberOfChargers: Number(e.target.value) }))}
                className="w-full accent-[#002D62] h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>2 Guns (Basic)</span>
                <span>8 Guns (Corridor Hub)</span>
                <span>16 Guns (Superhub)</span>
              </div>
            </div>

            {/* Total Capital Investment (₹ Lakhs) */}
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1.5">
                <span>Total Project Investment (Civil + Electrical + Chargers)</span>
                <span className="text-emerald-700 font-mono text-sm">₹{inputs.investmentLakhs} Lakhs</span>
              </div>
              <input
                type="range"
                min={10}
                max={150}
                step={2}
                value={inputs.investmentLakhs}
                onChange={(e) => setInputs(prev => ({ ...prev, investmentLakhs: Number(e.target.value) }))}
                className="w-full accent-emerald-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>₹10 Lakhs</span>
                <span>₹75 Lakhs</span>
                <span>₹1.50 Crore+</span>
              </div>
            </div>

            {/* Average Daily Sessions Per Gun */}
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1.5">
                <span>Average Sessions per Gun per Day</span>
                <span className="text-blue-700 font-mono text-sm">{inputs.averageDailySessions} Sessions/day</span>
              </div>
              <input
                type="range"
                min={3}
                max={20}
                step={1}
                value={inputs.averageDailySessions}
                onChange={(e) => setInputs(prev => ({ ...prev, averageDailySessions: Number(e.target.value) }))}
                className="w-full accent-blue-600 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>3 (Moderate city traffic)</span>
                <span>10 (Busy corridor)</span>
                <span>20 (Heavy highway turnaround)</span>
              </div>
            </div>

            {/* Average Energy Per Session */}
            <div>
              <div className="flex justify-between font-bold text-slate-800 mb-1.5">
                <span>Average Energy Consumed per Session (kWh)</span>
                <span className="text-slate-800 font-mono text-sm">{inputs.averageKwhPerSession} kWh</span>
              </div>
              <input
                type="range"
                min={15}
                max={60}
                step={1}
                value={inputs.averageKwhPerSession}
                onChange={(e) => setInputs(prev => ({ ...prev, averageKwhPerSession: Number(e.target.value) }))}
                className="w-full accent-slate-700 h-2 bg-slate-100 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>15 kWh (City EVs / 2W)</span>
                <span>30 kWh (Standard SUV)</span>
                <span>60 kWh (Long Range / Commercial)</span>
              </div>
            </div>

            {/* Tariffs Two-column */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Discom Electricity Tariff (₹/kWh)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step={0.5}
                    value={inputs.electricityTariffInr}
                    onChange={(e) => setInputs(prev => ({ ...prev, electricityTariffInr: Number(e.target.value) }))}
                    className="w-full text-xs font-mono font-bold px-3 py-1.5 border border-slate-300 rounded-lg bg-white"
                  />
                  <span className="text-xs text-slate-500 whitespace-nowrap">₹ / kWh</span>
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Input cost from power utility</span>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200">
                <label className="block text-[11px] font-bold text-emerald-900 mb-1">
                  Selling Charging Price (₹/kWh)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step={0.5}
                    value={inputs.chargingSellingPriceInr}
                    onChange={(e) => setInputs(prev => ({ ...prev, chargingSellingPriceInr: Number(e.target.value) }))}
                    className="w-full text-xs font-mono font-bold px-3 py-1.5 border border-emerald-300 rounded-lg bg-white text-emerald-900"
                  />
                  <span className="text-xs text-emerald-700 whitespace-nowrap">₹ / kWh</span>
                </div>
                <span className="text-[10px] text-emerald-600 mt-1 block">
                  Spread margin: ₹{(inputs.chargingSellingPriceInr - inputs.electricityTariffInr).toFixed(1)}/kWh
                </span>
              </div>
            </div>

            {/* Monthly Fixed Overheads */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Land Lease / Rent per Month (₹)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={inputs.rentPerMonthInr}
                  onChange={(e) => setInputs(prev => ({ ...prev, rentPerMonthInr: Number(e.target.value) }))}
                  className="w-full text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Maintenance & Attendant (₹/mo)
                </label>
                <input
                  type="number"
                  step={1000}
                  value={inputs.maintenanceCostPerMonthInr}
                  onChange={(e) => setInputs(prev => ({ ...prev, maintenanceCostPerMonthInr: Number(e.target.value) }))}
                  className="w-full text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Results & Indicative ROI */}
        <div className="lg:col-span-5 space-y-6">
          {/* Key Output Metrics Cards */}
          <div className="bg-gradient-to-br from-slate-900 to-[#002D62] text-white p-6 sm:p-7 rounded-2xl shadow-lg space-y-6">
            <div className="flex items-center justify-between border-b border-white/15 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                  Estimated Financial Yield
                </span>
                <h3 className="text-lg font-bold text-white">Annual Business Projections</h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Payback Period</span>
                <div className="text-xl font-black text-amber-400 font-mono">
                  {calculations.estimatedPaybackPeriodYears} Years
                </div>
              </div>
            </div>

            {/* Big Numbers */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-300">Annual Gross Revenue</span>
                <div className="text-xl font-black text-white mt-0.5">
                  ₹{(calculations.annualGrossRevenueInr / 100000).toFixed(2)} Lakhs
                </div>
                <span className="text-[10px] text-emerald-300">
                  {Math.round(calculations.annualUnitsKwh).toLocaleString('en-IN')} kWh / yr
                </span>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <span className="text-[11px] text-slate-300">Annual Net Cash Flow</span>
                <div className="text-xl font-black text-emerald-400 mt-0.5">
                  ₹{(calculations.annualNetCashFlowInr / 100000).toFixed(2)} Lakhs
                </div>
                <span className="text-[10px] text-slate-300">
                  ROI: ~{calculations.annualRoiPercent}% p.a.
                </span>
              </div>
            </div>

            {/* Financial Breakdown Waterfall */}
            <div className="space-y-2.5 text-xs pt-2 border-t border-white/15">
              <div className="flex justify-between text-slate-300">
                <span>Annual Units Sold:</span>
                <span className="font-mono text-white font-bold">{Math.round(calculations.annualUnitsKwh).toLocaleString('en-IN')} kWh</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Electricity Cost (to Discom):</span>
                <span className="font-mono text-rose-300">- ₹{(calculations.annualElectricityCostInr / 100000).toFixed(2)} L</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Annual Operating Opex & Rent:</span>
                <span className="font-mono text-rose-300">- ₹{(calculations.annualOpexInr / 100000).toFixed(2)} L</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Estimated EBITDA:</span>
                <span className="font-mono text-white font-bold">₹{(calculations.annualEbitdaInr / 100000).toFixed(2)} L</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Debt Servicing Interest (70% Debt):</span>
                <span className="font-mono text-amber-300">- ₹{(calculations.annualFinancingCostInr / 100000).toFixed(2)} L</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/20 text-emerald-400 font-bold text-sm">
                <span>Net Partner Take-Home Cash Flow:</span>
                <span className="font-mono">₹{(calculations.annualNetCashFlowInr / 100000).toFixed(2)} Lakhs</span>
              </div>
            </div>

            {/* Visual Ratio Bar */}
            <div className="pt-2">
              <div className="text-[10px] text-slate-300 uppercase tracking-wider mb-1.5 flex justify-between">
                <span>Revenue Allocation Breakdown</span>
              </div>
              <div className="h-3 w-full bg-slate-800 rounded-full flex overflow-hidden">
                <div 
                  className="bg-rose-500 h-full" 
                  style={{ width: `${Math.min(65, (calculations.annualElectricityCostInr / calculations.annualGrossRevenueInr) * 100)}%` }} 
                  title="Electricity Cost"
                />
                <div 
                  className="bg-amber-500 h-full" 
                  style={{ width: `${Math.min(20, (calculations.annualOpexInr / calculations.annualGrossRevenueInr) * 100)}%` }} 
                  title="Operating Opex"
                />
                <div 
                  className="bg-emerald-500 h-full flex-1" 
                  title="Net Partner Earnings"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" /> Power Cost</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> Opex & Debt</span>
                <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Net Profit</span>
              </div>
            </div>
          </div>

          {/* Mandatory Disclaimer as per prompt */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Important Statutory Notice:</strong> These calculations are indicative estimates based on user-entered parameters, modeled occupancy and typical state discom rates. They do not constitute guaranteed returns, promised yields, or binding bank loan commitments. Actual performance varies by vehicle density, local competition, and grid uptime.
            </p>
          </div>

          {/* Direct CTA */}
          <button
            onClick={() => onApplyWithParameters(inputs)}
            className="w-full py-3.5 bg-[#002D62] hover:bg-[#002047] text-white font-bold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Apply to Build Station with These Parameters</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
