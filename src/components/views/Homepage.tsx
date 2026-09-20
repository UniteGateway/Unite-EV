import React from 'react';
import { 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  TrendingUp, 
  FileText, 
  Wrench, 
  CheckCircle2, 
  MapPin, 
  Coins, 
  Sliders, 
  ChevronRight,
  BatteryCharging,
  Compass,
  Sparkles,
  PhoneCall,
  Download,
  Landmark,
  Layers,
  HelpCircle,
  Truck,
  Hotel,
  Fuel,
  Store
} from 'lucide-react';
import { CalculatorInputs } from '../../types';
import { TurnkeyProjectCarousel } from '../TurnkeyProjectCarousel';

interface HomepageProps {
  onOpenStartStationModal: () => void;
  onNavigateToTab: (tab: string) => void;
  onOpenCalculator: () => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  onOpenStartStationModal,
  onNavigateToTab,
  onOpenCalculator,
}) => {
  const partnerCategories = [
    {
      icon: <MapPin className="w-6 h-6 text-emerald-600" />,
      title: 'Highway Landowners',
      desc: 'Monetize roadside land along National & State highways with high EV traffic.',
    },
    {
      icon: <Fuel className="w-6 h-6 text-amber-600" />,
      title: 'Petrol Pump Dealers',
      desc: 'Upgrade traditional fuel stations with dual-gun DC rapid charging bays.',
    },
    {
      icon: <Hotel className="w-6 h-6 text-blue-600" />,
      title: 'Hotels & Highway Dhabas',
      desc: 'Attract high-spending EV travelers for 30-45 minute food & charging stops.',
    },
    {
      icon: <Store className="w-6 h-6 text-purple-600" />,
      title: 'Commercial Malls & Hubs',
      desc: 'Add green EV infrastructure amenities for shoppers and tenant fleets.',
    },
    {
      icon: <Truck className="w-6 h-6 text-indigo-600" />,
      title: 'Fleet & Logistics Depots',
      desc: 'Deploy dedicated high-voltage charging slots for 3W, 4W, and commercial EVs.',
    },
    {
      icon: <Landmark className="w-6 h-6 text-teal-600" />,
      title: 'Private Investors',
      desc: 'Deploy capital in asset-backed sustainable clean energy infrastructure.',
    },
  ];

  const turnkeySteps = [
    {
      number: '01',
      title: 'Apply Online',
      desc: 'Submit site GPS location, land dimensions, and power availability in 3 minutes.',
    },
    {
      number: '02',
      title: 'Technical Feasibility',
      desc: 'Field engineers conduct GIS grid load audit, transformer distance, and traffic study.',
    },
    {
      number: '03',
      title: 'Bankable DPR & Loan',
      desc: 'Detailed Project Report structured for bank debt syndication and MSME subsidies.',
    },
    {
      number: '04',
      title: 'Civil & Discom Sanction',
      desc: 'Load release, canopy fabrication, heavy cable trenching, and safety approvals.',
    },
    {
      number: '05',
      title: 'Equipment & Testing',
      desc: 'CCS2 Dual 120kW/240kW fast chargers dispatched, installed, and OCPP cloud synced.',
    },
    {
      number: '06',
      title: 'Live Network Revenue',
      desc: 'Station listed on national map. Automated driver billing and monthly payouts.',
    },
  ];

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#002D62] via-[#053775] to-[#0A2540] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Brand Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-4 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>UNITE POWERTEK • APPLY. WE BUILD. YOU EARN.</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight sm:leading-none">
            BUILD YOUR OWN <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-cyan-400">
              EV CHARGING STATION
            </span>
          </h1>

          {/* Subtitle / Value Proposition */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Turn your land, commercial property, highway plot, hotel, restaurant, or parking space into a high-yielding EV charging business. Unite Powertek provides complete end-to-end turnkey project development — from site feasibility and Discom power sanction to equipment commissioning and daily automated revenue.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onOpenStartStationModal}
              className="w-full sm:w-auto px-7 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-xl shadow-emerald-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-slate-950" />
              <span>START A CHARGING STATION</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateToTab('map')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-sm border border-white/20 backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Compass className="w-4 h-4 text-emerald-300" />
              <span>FIND A CHARGER</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 font-bold rounded-xl text-sm border border-blue-400/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Coins className="w-4 h-4 text-amber-300" />
              <span>ESTIMATE ROI</span>
            </button>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10 text-left">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Turnkey Model</span>
              <span className="text-base font-extrabold text-white">100% Managed</span>
              <span className="text-[10px] text-emerald-400 block">Site to Commissioning</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Discom Clearances</span>
              <span className="text-base font-extrabold text-white">Full Assistance</span>
              <span className="text-[10px] text-emerald-400 block">Sanction Load & NOCs</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Bank Debt Syndication</span>
              <span className="text-base font-extrabold text-white">MSME / CGTMSE</span>
              <span className="text-[10px] text-emerald-400 block">Collateral-Free Support</span>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <span className="text-[11px] text-slate-400 uppercase font-semibold block">Hardware Reliability</span>
              <span className="text-base font-extrabold text-white">Dual CCS2 120kW+</span>
              <span className="text-[10px] text-emerald-400 block">OCPP 2.0.1 Cloud Bus</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PARTNER MODELS (WHO CAN APPLY?) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#002D62] bg-blue-50 px-3 py-1 rounded-full">
            Partnership Ecosystem
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Who Can Start An EV Charging Station?
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Whether you own commercial real estate, highway frontage, a hotel, or want to deploy investment capital — Unite Powertek builds the complete station for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerCategories.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-[#002D62] hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              <button
                onClick={onOpenStartStationModal}
                className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#002D62] hover:text-blue-700"
              >
                <span>Check site eligibility</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. HOW IT WORKS (6-STEP TURNKEY LIFECYCLE) */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-2 mb-12">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Seamless Project Execution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Unite Powertek Builds Your Station
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              You don't need electrical engineering or Discom experience. We handle the entire project lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {turnkeySteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
                <span className="text-3xl font-black text-slate-200 font-mono absolute top-4 right-5">
                  {step.number}
                </span>
                <div className="w-8 h-8 rounded-lg bg-[#002D62] text-white flex items-center justify-center text-xs font-bold mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Actual Commissioned Project Builds Carousel */}
          <div className="mt-16 pt-12 border-t border-slate-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#002D62] font-extrabold bg-blue-100/70 border border-blue-200 px-3 py-1 rounded-full inline-block mb-2">
                  PORTFOLIO ARCHIVE • ACTUAL BUILDS
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Turnkey EV Stations Delivered Across India
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg leading-relaxed">
                Photographic and engineering evidence of high-power highway superhubs, commercial plazas, and fleet depots executed through our turnkey development pipeline.
              </p>
            </div>

            <TurnkeyProjectCarousel
              onOpenApplicationModal={onOpenStartStationModal}
              onExploreTracker={() => onNavigateToTab('tracker')}
            />
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigateToTab('tracker')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#002D62] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-all shadow-xs cursor-pointer"
            >
              <span>Explore The 11-Stage Interactive Project Tracker</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. FINANCING & DPR ASSISTANCE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-slate-900 via-[#002D62] to-[#0A2540] text-white p-8 sm:p-12 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              Capital Structuring & Subsidies
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Bankable DPRs & Debt Financing Assistance
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We prepare certified Detailed Project Reports (DPR) aligned with bank loan appraisal formats. Our syndication team assists eligible MSME entrepreneurs in accessing bank loans (e.g. State Bank of India, Canara Bank, Bank of Baroda) and collateral-free CGTMSE credit schemes.
            </p>
            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Complete financial modeling: 5-year cash flows, DSCR, and payback analysis.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Documentation support for central and state EV capital subsidies.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>30% Equity / 70% Debt syndication assistance for eligible sites.</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 w-full lg:w-80 flex-shrink-0 space-y-4 text-center">
            <FileText className="w-10 h-10 text-emerald-400 mx-auto" />
            <h4 className="font-bold text-sm text-white">Need Project Financing?</h4>
            <p className="text-xs text-slate-300">
              Select "Need Financing Assistance" during the 6-step online application.
            </p>
            <button
              onClick={onOpenStartStationModal}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Apply With Financing Support
            </button>
          </div>
        </div>
      </section>

      {/* 5. HARDWARE & CHARGER INFRASTRUCTURE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs uppercase font-bold tracking-wider text-[#002D62] bg-blue-50 px-3 py-1 rounded-full">
            Engineered For Rugged Reliability
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Unitev High-Voltage EV Charging Hardware
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Industrial-grade DC fast dispensers engineered for high ambient temperatures, dust resistance, and 24/7 continuous operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">City Hub & Fleet</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Dual 60 kW DC Fast</h3>
              <p className="text-xs text-slate-500 mt-1">Ideal for restaurants, urban malls, and commercial fleets.</p>
              <div className="mt-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b pb-1 border-slate-100">
                  <span>Connectors</span>
                  <span className="font-semibold">Dual CCS2 Guns</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-slate-100">
                  <span>Charging Time</span>
                  <span className="font-semibold">45 - 55 mins (10-80%)</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-slate-100">
                  <span>Enclosure</span>
                  <span className="font-semibold">IP54 All-Weather</span>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenStartStationModal}
              className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
            >
              Select 60 kW Model
            </button>
          </div>

          <div className="bg-gradient-to-b from-blue-50/70 to-white p-6 rounded-2xl border-2 border-[#002D62] shadow-md flex flex-col justify-between relative">
            <span className="absolute -top-3 right-6 bg-[#002D62] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider">
              Most Popular
            </span>
            <div>
              <span className="text-xs font-bold text-blue-700 uppercase">Highway Superhub Standard</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Dual 120 kW Rapid DC</h3>
              <p className="text-xs text-slate-500 mt-1">Optimized for highway corridors, expressways, and petrol pumps.</p>
              <div className="mt-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b pb-1 border-slate-200">
                  <span>Connectors</span>
                  <span className="font-semibold">Dual CCS2 Dynamic Balancing</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-slate-200">
                  <span>Charging Time</span>
                  <span className="font-semibold text-emerald-700 font-bold">20 - 30 mins (10-80%)</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-slate-200">
                  <span>Firmware</span>
                  <span className="font-semibold">OCPP 2.0.1 + RFID</span>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenStartStationModal}
              className="mt-6 w-full py-2.5 bg-[#002D62] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-xs"
            >
              Select 120 kW Model
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase">Ultra Heavy Corridor</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">240 kW Ultra Rapid</h3>
              <p className="text-xs text-slate-500 mt-1">Liquid-cooled cable option for premium EVs and heavy electric buses.</p>
              <div className="mt-4 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between border-b pb-1 border-slate-100">
                  <span>Connectors</span>
                  <span className="font-semibold">Dual Liquid-Cooled CCS2</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-slate-100">
                  <span>Charging Time</span>
                  <span className="font-semibold text-emerald-700 font-bold">12 - 18 mins (10-80%)</span>
                </div>
                <div className="flex justify-between border-b pb-1 border-slate-100">
                  <span>Grid Compatibility</span>
                  <span className="font-semibold">Dedicated 11kV Substation</span>
                </div>
              </div>
            </div>
            <button
              onClick={onOpenStartStationModal}
              className="mt-6 w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
            >
              Select 240 kW Model
            </button>
          </div>
        </div>
      </section>

      {/* 6. MANDATORY STATUTORY DISCLAIMER AS PER PROMPT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 leading-relaxed space-y-2">
          <div className="font-bold flex items-center gap-2 text-amber-950">
            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>Important Statutory & Financial Information Notice:</span>
          </div>
          <p>
            Unite Powertek is an EV charging infrastructure development and network technology platform. Unite Powertek does not guarantee loan sanctions, subsidies, electricity load release, or financial return metrics. All bank loans, NBFC credit approvals, MSME subsidies, and Discom electrical load releases are subject to applicable institutional eligibility norms, lender credit evaluations, site technical feasibility, and state/central regulatory authority decisions. Financial models and ROI projections presented in this portal are indicative estimates for planning purposes only.
          </p>
        </div>
      </section>
    </div>
  );
};
