import React, { useState } from 'react';
import { StationApplication, ApplicationStage } from '../../types';
import { 
  CheckCircle2, 
  Clock, 
  Circle, 
  FileText, 
  Download, 
  Calendar, 
  UserCheck, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  TrendingUp,
  MapPin,
  HelpCircle
} from 'lucide-react';

interface ProjectTrackerViewProps {
  application: StationApplication;
  onOpenStartStationModal: () => void;
}

export const ProjectTrackerView: React.FC<ProjectTrackerViewProps> = ({
  application,
  onOpenStartStationModal,
}) => {
  const [selectedStage, setSelectedStage] = useState<ApplicationStage>(application.currentStage);
  const [inspectionScheduled, setInspectionScheduled] = useState(false);

  // 11 Milestone definitions from specification
  const stagesList: { id: ApplicationStage; label: string; desc: string; estimatedDays: string }[] = [
    { id: 'application_received', label: 'APPLICATION RECEIVED', desc: 'Online submission logged & KYC verified.', estimatedDays: 'Day 1' },
    { id: 'site_verification', label: 'SITE VERIFICATION', desc: 'Physical and GIS survey of road frontage & HT lines.', estimatedDays: 'Day 3 - 5' },
    { id: 'feasibility', label: 'FEASIBILITY', desc: 'Grid capacity simulation & traffic footfall analysis.', estimatedDays: 'Day 7' },
    { id: 'dpr', label: 'DPR (PROJECT REPORT)', desc: 'Detailed techno-economic project report compiled.', estimatedDays: 'Day 10' },
    { id: 'financing', label: 'FINANCING ASSISTANCE', desc: 'Bank/NBFC debt syndication & MSME Udyam documentation.', estimatedDays: 'Day 15 - 20' },
    { id: 'approvals', label: 'DISCOM APPROVALS', desc: 'Sanction load release, transformer NOC & municipal permits.', estimatedDays: 'Day 25' },
    { id: 'equipment', label: 'EQUIPMENT SELECTION', desc: 'Heavy-duty CCS2 chargers & switchgear dispatch.', estimatedDays: 'Day 30' },
    { id: 'installation', label: 'CIVIL & ELECTRICAL', desc: 'Canopy installation, cabling, earthing & civil bays.', estimatedDays: 'Day 38' },
    { id: 'testing', label: 'TESTING & GRID SYNC', desc: 'High voltage load testing, OCPP backend handshake.', estimatedDays: 'Day 42' },
    { id: 'go_live', label: 'GO LIVE', desc: 'Inauguration & addition to Unitev National EV Map.', estimatedDays: 'Day 45' },
    { id: 'revenue', label: 'REVENUE GENERATION', desc: 'Daily customer charging sessions & automated monthly payout.', estimatedDays: 'Day 46+' },
  ];

  const getStageStatus = (stageId: ApplicationStage) => {
    if (application.completedStages.includes(stageId)) return 'completed';
    if (application.currentStage === stageId) return 'in_progress';
    return 'pending';
  };

  const stageDetailsData: Record<ApplicationStage, { title: string; bullets: string[]; documents: string[] }> = {
    application_received: {
      title: 'Digital Application & KYC Verification',
      bullets: [
        'Application ID generated and assigned to Regional Project Office.',
        'Primary KYC (PAN, Aadhaar, Land Ownership records) checked and confirmed.',
        'Site registered in Unite Powertek national grid database.',
      ],
      documents: ['Application_Confirmation_Receipt.pdf', 'KYC_Verification_Certificate.pdf'],
    },
    site_verification: {
      title: 'Field Engineering & Civil Survey',
      bullets: [
        'Site inspection conducted by Senior Infrastructure Engineer.',
        'Frontage clearance: 65 ft wide access along highway confirmed.',
        'Discom transformer distance measured at 45 meters (Optimal).',
      ],
      documents: ['Site_Inspection_Report_Field_V1.pdf', 'Geo_Topography_Survey.dwg'],
    },
    feasibility: {
      title: 'Grid Load & Commercial Feasibility Study',
      bullets: [
        'Power Sanction Feasibility: 150 kW LT/HT sanctioned availability confirmed with Discom.',
        'EV Traffic Density Model: Estimated 28-36 vehicle charges per day at peak corridor hours.',
        'Solar Canopy Integration: Feasible for 20 kWp rooftop solar array offset.',
      ],
      documents: ['Technical_Grid_Feasibility_Report.pdf', 'EV_Traffic_Simulation_Deck.pdf'],
    },
    dpr: {
      title: 'Detailed Project Report (DPR) Finalization',
      bullets: [
        'Complete capital expenditure breakdown (₹38.5 Lakhs total project capex).',
        'Projected 5-year Cashflow Statement and EBITDA margins.',
        'MSME Udyam subsidy eligibility report under National & State EV Schemes.',
      ],
      documents: ['Detailed_Project_Report_DPR_Final.pdf', 'Bankable_Financial_Model_5Yr.xlsx'],
    },
    financing: {
      title: 'Bank / NBFC Financing & Subsidy Coordination',
      bullets: [
        'Partner Bank Consortium (State Bank of India MSME / Canara Bank) dossier submission.',
        'CGTMSE collateral-free loan coverage eligibility appraisal.',
        'Equity-to-debt ratio structured at 30% Equity / 70% Debt.',
      ],
      documents: ['Loan_Syndication_Terms_Sheet.pdf', 'CGTMSE_Coverage_Eligibility_Letter.pdf'],
    },
    approvals: {
      title: 'Statutory Discom & Fire Clearances',
      bullets: [
        'Discom Load Sanction Order & Metering bay demarcation.',
        'Local municipal town planning NOC for EV charging hub.',
        'Fire & Safety electrical inspectorate audit clearance.',
      ],
      documents: ['Discom_Load_Sanction_Order.pdf', 'Statutory_NOC_Checklist.pdf'],
    },
    equipment: {
      title: 'EV Chargers & Electrical Switchgear Dispatch',
      bullets: [
        'Heavy-duty Unitev CCS2 Dual 120kW Fast Chargers allocated from manufacturing hub.',
        'Distribution Panel, Isolation Transformer, and Lightning Arrestor dispatched.',
        'OCPP 2.0.1 smart energy management firmware pre-installed.',
      ],
      documents: ['Equipment_Dispatch_Challan.pdf', 'Charger_Factory_Acceptance_Test.pdf'],
    },
    installation: {
      title: 'Turnkey Civil & Electrical Construction',
      bullets: [
        'RCC Foundation bays, heavy cable trenching and polymer conduit laying.',
        'Canopy fabrication with Unitev corporate brand signage and illumination.',
        'Earth pit grid installation with <1 Ohm resistance verified.',
      ],
      documents: ['Civil_Milestone_Completion_Certificate.pdf'],
    },
    testing: {
      title: 'Grid Synchronization & EV Testing Protocols',
      bullets: [
        'Full load testing with commercial EV fleet (Tata Nexon, MG ZS, BYD).',
        'Emergency stop mechanisms, ground fault interrupt, and insulation checks verified.',
        'Cloud telemetry handshake with Unitev central remote monitoring operations center.',
      ],
      documents: ['Commissioning_Test_Protocol_Sheet.pdf'],
    },
    go_live: {
      title: 'Public Commissioning & National App Listing',
      bullets: [
        'Station live on Google Maps and Unitev Driver App.',
        'Automated billing, UPI payments, and wallet gateway unlocked.',
        'Promotional launch campaign triggered to 45,000+ local EV drivers.',
      ],
      documents: ['Commercial_Go_Live_Notification.pdf'],
    },
    revenue: {
      title: 'Daily Operations & Monthly Revenue Payouts',
      bullets: [
        'Automated real-time telemetry streaming session revenue to owner dashboard.',
        'Electricity Discom reconciliation handled by Unite Powertek.',
        'Net Operating Income directly credited to partner bank account on 5th of every month.',
      ],
      documents: ['Monthly_Settlement_Ledger_Template.pdf'],
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Quick Status */}
      <div className="bg-gradient-to-br from-[#002D62] via-[#083670] to-[#0A2540] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Project Tracker — Unitev Ecosystem
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Application ID: {application.id}
            </h1>
            <p className="text-sm text-slate-300 mt-1 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span>{application.location.siteAddress}, {application.location.city}</span>
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center gap-4">
            <img
              src={application.relationshipManager.avatarUrl}
              alt={application.relationshipManager.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-400"
            />
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-300 font-bold">Assigned Relationship Manager</span>
              <div className="text-sm font-bold text-white">{application.relationshipManager.name}</div>
              <div className="flex items-center gap-3 text-xs text-emerald-300 mt-1">
                <a href={`tel:${application.relationshipManager.phone}`} className="flex items-center gap-1 hover:underline">
                  <Phone className="w-3 h-3" /> Call
                </a>
                <span>•</span>
                <a href={`mailto:${application.relationshipManager.email}`} className="flex items-center gap-1 hover:underline">
                  <Mail className="w-3 h-3" /> Email
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Immediate Next Step Card */}
        <div className="mt-6 pt-5 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Current Active Stage</span>
            <span className="font-bold text-white text-sm">
              {stagesList.find(s => s.id === application.currentStage)?.label}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Next Milestone Action</span>
            <span className="font-semibold text-emerald-300">
              {application.expectedNextStep}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Target Commercial Go-Live</span>
            <span className="font-bold text-amber-300 text-sm">
              {application.targetGoLiveDate}
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Step Tracker (Left) and Selected Stage Details (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 11 Milestone Visual Flow */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Project Lifecycle</h3>
              <p className="text-xs text-slate-500">11-Stage Turnkey Execution</p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              {application.completedStages.length} of 11 Completed
            </span>
          </div>

          <div className="relative pl-6 space-y-6">
            {/* Vertical connecting line */}
            <div className="absolute left-[17px] top-3 bottom-3 w-[2px] bg-slate-200" />

            {stagesList.map((stage, idx) => {
              const status = getStageStatus(stage.id);
              const isSelected = selectedStage === stage.id;

              return (
                <div
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`relative flex items-start gap-3.5 p-2.5 rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/80 border border-blue-200 shadow-2xs'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  {/* Status Indicator Icon */}
                  <div className="relative z-10 flex-shrink-0 -ml-5 mt-0.5">
                    {status === 'completed' && (
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                    )}
                    {status === 'in_progress' && (
                      <div className="w-7 h-7 rounded-full bg-[#002D62] text-white flex items-center justify-center ring-4 ring-blue-100 animate-pulse">
                        <Clock className="w-4 h-4" />
                      </div>
                    )}
                    {status === 'pending' && (
                      <div className="w-7 h-7 rounded-full bg-slate-100 border-2 border-slate-300 text-slate-400 flex items-center justify-center">
                        <Circle className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${
                        isSelected ? 'text-[#002D62]' : status === 'completed' ? 'text-slate-800' : 'text-slate-500'
                      }`}>
                        {stage.label}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">{stage.estimatedDays}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{stage.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Stage Detailed Card, Actions, & Documents */}
        <div className="lg:col-span-7 space-y-6">
          {/* Detail Card for selected milestone */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  Milestone Details
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {stageDetailsData[selectedStage].title}
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                {getStageStatus(selectedStage) === 'completed' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Stage Cleared
                  </span>
                )}
                {getStageStatus(selectedStage) === 'in_progress' && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-[#002D62] border border-blue-200 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 animate-spin" /> In Progress
                  </span>
                )}
                {getStageStatus(selectedStage) === 'pending' && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    Upcoming Stage
                  </span>
                )}
              </div>
            </div>

            {/* Checklist items */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Key Deliverables & Verification Checklist
              </h4>
              <ul className="space-y-2.5">
                {stageDetailsData[selectedStage].bullets.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Associated Documents */}
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Official Project Reports & Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stageDetailsData[selectedStage].documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-colors">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-xs font-medium text-slate-800 truncate">{doc}</span>
                    </div>
                    <button 
                      onClick={() => alert(`Downloading verified document: ${doc}`)}
                      className="p-1.5 text-slate-500 hover:text-[#002D62] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage specific quick action */}
            {selectedStage === 'site_verification' && (
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h5 className="text-xs font-bold text-blue-900">Schedule Physical Site Inspection Visit</h5>
                  <p className="text-[11px] text-blue-700">Select a convenient 2-hour window for our engineer team.</p>
                </div>
                <button
                  onClick={() => setInspectionScheduled(true)}
                  disabled={inspectionScheduled}
                  className="px-4 py-2 bg-[#002D62] text-white text-xs font-bold rounded-xl hover:bg-blue-900 transition-colors flex-shrink-0"
                >
                  {inspectionScheduled ? 'Inspection Visit Confirmed' : 'Confirm Site Visit Date'}
                </button>
              </div>
            )}
          </div>

          {/* Quick Support & Help Card */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#002D62] text-white flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Have Questions About This Milestone?</h4>
                <p className="text-[11px] text-slate-500">Unite Powertek partner support desk is available 24/7.</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <a 
                href={`tel:${application.relationshipManager.phone}`}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-300 bg-white text-slate-700 hover:bg-slate-100"
              >
                Call Relationship Manager
              </a>
              <button
                onClick={onOpenStartStationModal}
                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-[#002D62] text-white hover:bg-blue-900"
              >
                Apply Another Site
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
