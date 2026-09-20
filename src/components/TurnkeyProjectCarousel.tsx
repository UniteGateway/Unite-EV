import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Zap, 
  MapPin, 
  Calendar, 
  Landmark, 
  ShieldCheck, 
  ArrowUpRight, 
  Pause, 
  Play, 
  Layers, 
  CheckCircle2,
  Building2,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ProjectShowcase {
  id: string;
  title: string;
  corridor: string;
  city: string;
  state: string;
  phaseLabel: string;
  phaseNumber: string;
  landownerType: string;
  hardware: string;
  powerLoad: string;
  timelineDays: number;
  financing: string;
  imageUrl: string;
  fallbackUrl: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const SHOWCASE_PROJECTS: ProjectShowcase[] = [
  {
    id: 'proj-01',
    title: 'NH-48 Expressway Superhub',
    corridor: 'Delhi–Mumbai Industrial Corridor',
    city: 'Bharuch',
    state: 'Gujarat',
    phaseLabel: 'Operational & Grid Synchronized',
    phaseNumber: 'Stage 10/11',
    landownerType: 'Highway Fuel Station Partner',
    hardware: '4× 240kW CCS2 Dual Hyper-Dispensers',
    powerLoad: '11kV HT Dedicated 1,000kVA Substation',
    timelineDays: 34,
    financing: '70% SBI Green Mobility Term Debt (CGTMSE)',
    imageUrl: 'https://images.unsplash.com/photo-1558441719-74765c363d68?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://picsum.photos/seed/ev-superhub-1/1200/675',
    description: 'A 24/7 high-density highway charging plaza developed on a 6,500 sq.ft roadside plot, equipped with heavy-duty canopy protection and automated billing.',
    metrics: [
      { label: 'Avg Daily Sessions', value: '54 EV Cars' },
      { label: 'Monthly Throughput', value: '42,100 kWh' },
      { label: 'Partner Net EBITDA', value: '₹3,45,000 / mo' },
    ],
  },
  {
    id: 'proj-02',
    title: 'Grand Horizon Hospitality Plaza',
    corridor: 'Outer Ring Road Commercial Belt',
    city: 'Bengaluru',
    state: 'Karnataka',
    phaseLabel: 'Commissioned & Live On Network',
    phaseNumber: 'Stage 10/11',
    landownerType: '5-Star Hotel & Convention Center',
    hardware: '2× 120kW DC Fast + 4× 22kW Type-2 AC',
    powerLoad: '350kVA Dedicated Commercial Line',
    timelineDays: 28,
    financing: 'Direct Equity + State EV Capital Subsidy',
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://picsum.photos/seed/ev-hotel-2/1200/675',
    description: 'Turnkey hotel parking transformation providing premier charging amenities to hotel guests, corporate fleets, and airport commute travelers.',
    metrics: [
      { label: 'Turnaround Time', value: '38 mins (80% SOC)' },
      { label: 'Guest Dwell Time', value: '52 mins average' },
      { label: 'Uptime Reliability', value: '99.8% OCPP 2.0.1' },
    ],
  },
  {
    id: 'proj-03',
    title: 'Bhiwandi E-Logistics Fleet Depot',
    corridor: 'Mumbai–Nashik Freight Belt',
    city: 'Bhiwandi',
    state: 'Maharashtra',
    phaseLabel: 'Testing & Telemetry Sync',
    phaseNumber: 'Stage 09/11',
    landownerType: 'Logistics Park & Warehousing Group',
    hardware: '6× 60kW DC Dual-Gun Fleet Pods',
    powerLoad: '500kVA HT Supply + Automated Load Balancer',
    timelineDays: 41,
    financing: 'Bank of Baroda MSME Clean Energy Credit',
    imageUrl: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://picsum.photos/seed/ev-fleet-3/1200/675',
    description: 'Custom overnight fleet charging terminal featuring high-volume power distribution and automated RFID billing for 60+ last-mile delivery vans.',
    metrics: [
      { label: 'Active Commercial EVs', value: '64 Fleet Vans' },
      { label: 'Night Shift Peak Load', value: '360 kW continuous' },
      { label: 'Per-Km Fuel Savings', value: '₹4.20 vs Diesel' },
    ],
  },
  {
    id: 'proj-04',
    title: 'CyberCity Solar-Integrated Smart Hub',
    corridor: 'Kalyani Nagar Tech Corridor',
    city: 'Pune',
    state: 'Maharashtra',
    phaseLabel: 'Microgrid & Solar BESS Live',
    phaseNumber: 'Stage 10/11',
    landownerType: 'Commercial IT Park Real Estate',
    hardware: '2× 180kW CCS2 DC + 45kWp Rooftop Solar',
    powerLoad: 'Discom 250kVA + 100kWh Battery Energy Storage',
    timelineDays: 32,
    financing: 'Private Turnkey Investor Lease',
    imageUrl: 'https://images.unsplash.com/photo-1621361365424-06f0e1eb5c49?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://picsum.photos/seed/ev-solar-4/1200/675',
    description: 'State-of-the-art green microgrid charging hub utilizing rooftop solar generation to shave peak Discom demand charges and lower carbon footprints.',
    metrics: [
      { label: 'Solar Self-Consumption', value: '28% Total Energy' },
      { label: 'Peak Tariff Reduction', value: '-₹2.10 / kWh' },
      { label: 'CO2 Offset / Month', value: '14.8 Metric Tons' },
    ],
  },
  {
    id: 'proj-05',
    title: 'Mysuru Expressway Traveler Oasis',
    corridor: 'Bengaluru–Mysuru 10-Lane Expressway',
    city: 'Mandya',
    state: 'Karnataka',
    phaseLabel: 'Civil Fabrication & Transformer Pod',
    phaseNumber: 'Stage 07/11',
    landownerType: 'Highway Dhaba & Food Court Owner',
    hardware: '4× 120kW Dual Fast DC Dispensers',
    powerLoad: '630kVA Bescom Express HT Feeder',
    timelineDays: 30,
    financing: 'Canara Bank Green Infrastructure Loan',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    fallbackUrl: 'https://picsum.photos/seed/ev-expressway-5/1200/675',
    description: 'High-visibility highway station built alongside a premium restaurant stop, converting roadside frontage into reliable non-fuel revenue.',
    metrics: [
      { label: 'Rest Stop Footfall Boost', value: '+42% Customers' },
      { label: 'Avg Charge Duration', value: '28 minutes' },
      { label: 'Target Payback', value: '2.6 Years' },
    ],
  },
];

interface TurnkeyProjectCarouselProps {
  onOpenApplicationModal?: () => void;
  onExploreTracker?: () => void;
}

export const TurnkeyProjectCarousel: React.FC<TurnkeyProjectCarouselProps> = ({
  onOpenApplicationModal,
  onExploreTracker,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const currentProject = SHOWCASE_PROJECTS[currentIndex];

  // Auto-play interval (6 seconds)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setDirection('right');
      setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prev) => (prev + 1) % SHOWCASE_PROJECTS.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + SHOWCASE_PROJECTS.length) % SHOWCASE_PROJECTS.length);
  };

  const handleSelectIndex = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  return (
    <div className="w-full bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* Top International Modernist Header Bar */}
      <div className="px-6 py-4 border-b border-slate-800/80 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
              PORTFOLIO ARCHIVE • TURNKEY SITES
            </span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-xs text-slate-400 hidden sm:inline font-mono">
            LIVE INFRASTRUCTURE COMMISSIONED ACROSS INDIA
          </span>
        </div>

        {/* Carousel Controls & Numeric Index */}
        <div className="flex items-center gap-3">
          <div className="font-mono text-xs text-slate-400 tracking-wider">
            <span className="text-white font-bold text-sm">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
            <span className="mx-1 text-slate-600">/</span>
            <span>{String(SHOWCASE_PROJECTS.length).padStart(2, '0')}</span>
          </div>

          <div className="flex items-center gap-1 bg-slate-800/70 p-1 rounded-full border border-slate-700/60">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Auto-slide' : 'Play Auto-slide'}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
            <button
              onClick={handlePrev}
              aria-label="Previous Project"
              className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Project"
              className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Viewport: Split Architectural Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Left Column: Media & Visual Proof (7 cols) */}
        <div className="lg:col-span-7 relative bg-slate-950 overflow-hidden group min-h-[300px] lg:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentProject.imageUrl}
                alt={currentProject.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Graceful fallback to Picsum seed if primary CDN is blocked
                  const target = e.currentTarget;
                  if (target.src !== currentProject.fallbackUrl) {
                    target.src = currentProject.fallbackUrl;
                  }
                }}
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle architectural vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-900" />
            </motion.div>
          </AnimatePresence>

          {/* Floating Location Tag & Milestone Pill */}
          <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-white/10 shadow-lg">
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>{currentProject.city}, {currentProject.state}</span>
            </span>

            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-mono font-medium px-3 py-1.5 rounded-lg border border-emerald-500/30 shadow-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{currentProject.phaseLabel}</span>
            </span>
          </div>

          {/* Bottom Left Badge: Turnkey Duration */}
          <div className="absolute bottom-4 left-4 z-10 hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs font-mono text-slate-200">
            <Calendar className="w-3.5 h-3.5 text-blue-400" />
            <span>Turnkey Build Time:</span>
            <span className="font-bold text-emerald-400">{currentProject.timelineDays} Calendar Days</span>
          </div>

          {/* Expand / Inspect Action */}
          <button
            onClick={() => setIsModalOpen(true)}
            aria-label="View Project Specs Modal"
            className="absolute bottom-4 right-4 z-10 bg-slate-900/80 hover:bg-slate-800 backdrop-blur-md p-2 rounded-lg border border-white/15 text-slate-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Right Column: Architectural Project Specifications (5 cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, x: direction === 'right' ? 12 : -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'right' ? -12 : 12 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-5"
            >
              {/* Corridor & Phase Marker */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span className="uppercase tracking-wider">{currentProject.corridor}</span>
                  <span className="bg-emerald-950/70 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">
                    {currentProject.phaseNumber}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                  {currentProject.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed pt-1">
                  {currentProject.description}
                </p>
              </div>

              {/* Technical Specifications Grid */}
              <div className="space-y-2.5 pt-2 border-t border-slate-800 text-xs">
                <div className="flex items-start justify-between py-1 border-b border-slate-800/60 gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    Hardware Setup
                  </span>
                  <span className="text-slate-200 font-medium text-right">{currentProject.hardware}</span>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-slate-800/60 gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    Grid / Power Load
                  </span>
                  <span className="text-slate-200 font-mono text-[11px] text-right">{currentProject.powerLoad}</span>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-slate-800/60 gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                    <Layers className="w-3.5 h-3.5 text-purple-400" />
                    Site Partner Model
                  </span>
                  <span className="text-slate-200 font-medium text-right">{currentProject.landownerType}</span>
                </div>

                <div className="flex items-start justify-between py-1 border-b border-slate-800/60 gap-4">
                  <span className="text-slate-400 flex items-center gap-1.5 shrink-0">
                    <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                    Capital Support
                  </span>
                  <span className="text-emerald-300 font-medium text-[11px] text-right">{currentProject.financing}</span>
                </div>
              </div>

              {/* Verified Operational Performance Metrics */}
              <div className="pt-2">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-500 block mb-2 font-bold">
                  VERIFIED RUNTIME METRICS
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {currentProject.metrics.map((m, i) => (
                    <div key={i} className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-800 text-left">
                      <span className="text-[10px] text-slate-400 block truncate">{m.label}</span>
                      <span className="text-xs sm:text-sm font-extrabold text-white font-mono block mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Row */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center gap-3">
            {onOpenApplicationModal && (
              <button
                onClick={onOpenApplicationModal}
                className="w-full sm:flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Build Similar Station</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            )}

            {onExploreTracker && (
              <button
                onClick={onExploreTracker}
                className="w-full sm:w-auto py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-bold rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Track 11 Stages</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Thumbnail / Indicator Track */}
      <div className="px-6 py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-2">
          {SHOWCASE_PROJECTS.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => handleSelectIndex(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                idx === currentIndex
                  ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 font-bold shadow-xs'
                  : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span className={idx === currentIndex ? 'text-emerald-400' : 'text-slate-500'}>
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="hidden md:inline truncate max-w-[120px]">{proj.city}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] text-slate-500 font-mono hidden sm:flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          <span>Turnkey Execution By Unite Powertek Technical Field Engineers</span>
        </div>
      </div>

      {/* Inspect Technical Specs Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-mono text-emerald-400 font-bold">
                  TECHNICAL BLUEPRINT & COMMISSIONING DOSSIER
                </span>
                <h3 className="text-xl font-black text-white mt-1">{currentProject.title}</h3>
                <p className="text-xs text-slate-400">{currentProject.corridor} • {currentProject.city}, {currentProject.state}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
              <img
                src={currentProject.imageUrl}
                alt={currentProject.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== currentProject.fallbackUrl) {
                    target.src = currentProject.fallbackUrl;
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Civil Build Time</span>
                <span className="text-sm font-bold text-white font-mono">{currentProject.timelineDays} Days</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Substation Load</span>
                <span className="text-sm font-bold text-white font-mono">{currentProject.powerLoad.split(' ')[0]}</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Charging Protocol</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">OCPP 2.0.1</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Financing Vetted</span>
                <span className="text-sm font-bold text-white font-mono">CGTMSE MSME</span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Close Dossier
              </button>
              {onOpenApplicationModal && (
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    onOpenApplicationModal();
                  }}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Apply For Your Site</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
