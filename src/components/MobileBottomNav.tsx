import React, { useState } from 'react';
import { MainNavTab } from '../types';
import { 
  Home, 
  MapPin, 
  Zap, 
  Briefcase, 
  User, 
  PlusCircle, 
  Calculator, 
  FileText, 
  Building2, 
  Landmark,
  X 
} from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: MainNavTab;
  setCurrentTab: (tab: MainNavTab) => void;
  onOpenStartStationModal: () => void;
  hasActiveSession: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenStartStationModal,
  hasActiveSession,
}) => {
  const [businessMenuOpen, setBusinessMenuOpen] = useState(false);

  return (
    <>
      {/* Business Bottom Sheet Drawer for Mobile */}
      {businessMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/60 backdrop-blur-xs">
          <div 
            className="bg-white rounded-t-2xl p-5 border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#002D62] flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Partner & Business Hub</h3>
                  <p className="text-xs text-slate-500">Apply. We Build. You Earn.</p>
                </div>
              </div>
              <button 
                onClick={() => setBusinessMenuOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 py-4">
              <button
                onClick={() => {
                  setBusinessMenuOpen(false);
                  onOpenStartStationModal();
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-900 text-left hover:bg-emerald-100 transition-colors"
              >
                <PlusCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold">Start Station</div>
                  <div className="text-[10px] text-emerald-700">6-Step Application</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setBusinessMenuOpen(false);
                  setCurrentTab('tracker');
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-blue-200 bg-blue-50/70 text-blue-900 text-left hover:bg-blue-100 transition-colors"
              >
                <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold">My Project Tracker</div>
                  <div className="text-[10px] text-blue-700">11 Milestone Flow</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setBusinessMenuOpen(false);
                  setCurrentTab('calculator');
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-left hover:bg-slate-100 transition-colors"
              >
                <Calculator className="w-5 h-5 text-amber-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold">ROI Calculator</div>
                  <div className="text-[10px] text-slate-500">Capex, Opex & Payback</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setBusinessMenuOpen(false);
                  setCurrentTab('partner');
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-left hover:bg-slate-100 transition-colors"
              >
                <Building2 className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold">Partner Dashboard</div>
                  <div className="text-[10px] text-slate-500">Live Station Revenue</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setBusinessMenuOpen(false);
                  setCurrentTab('financing');
                }}
                className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 text-left hover:bg-slate-100 transition-colors col-span-2"
              >
                <Landmark className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <div>
                  <div className="text-xs font-bold">Financing & MSME Centre</div>
                  <div className="text-[10px] text-slate-500">DPR, Bank Coordination, CGTMSE & Subsidies</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 lg:hidden py-1.5 px-2 shadow-lg">
        <div className="flex items-center justify-around">
          {/* Home */}
          <button
            onClick={() => setCurrentTab('home')}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
              currentTab === 'home' ? 'text-[#002D62] font-bold' : 'text-slate-500'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Home</span>
          </button>

          {/* Map */}
          <button
            onClick={() => setCurrentTab('map')}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
              currentTab === 'map' ? 'text-[#002D62] font-bold' : 'text-slate-500'
            }`}
          >
            <MapPin className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Map</span>
          </button>

          {/* Charge Button (Highlighted) */}
          <button
            onClick={() => setCurrentTab('charge')}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg relative transition-colors ${
              currentTab === 'charge' ? 'text-amber-600 font-bold' : 'text-slate-500'
            }`}
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md -mt-3">
                <Zap className="w-4 h-4" />
              </div>
              {hasActiveSession && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -top-3 -right-1 ring-2 ring-white animate-pulse" />
              )}
            </div>
            <span className="text-[10px] mt-0.5">Charge</span>
          </button>

          {/* Business Hub */}
          <button
            onClick={() => setBusinessMenuOpen(true)}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
              ['partner', 'calculator', 'tracker', 'financing', 'energy', 'fleet'].includes(currentTab)
                ? 'text-[#002D62] font-bold'
                : 'text-slate-500'
            }`}
          >
            <Briefcase className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Business</span>
          </button>

          {/* Account */}
          <button
            onClick={() => setCurrentTab('account')}
            className={`flex flex-col items-center justify-center w-14 py-1 rounded-lg transition-colors ${
              currentTab === 'account' ? 'text-[#002D62] font-bold' : 'text-slate-500'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">Account</span>
          </button>
        </div>
      </div>
    </>
  );
};
