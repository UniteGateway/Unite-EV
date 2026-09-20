import React, { useState } from 'react';
import { UnitevLogo } from './UnitevLogo';
import { UserRole, MainNavTab, NotificationItem } from '../types';
import { 
  Bell, 
  Wallet, 
  Zap, 
  MapPin, 
  Calculator, 
  PlusCircle, 
  Building2, 
  ChevronDown, 
  UserCheck, 
  ShieldCheck,
  Truck,
  Activity,
  CheckCircle2,
  Database,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { User } from 'firebase/auth';

interface NavbarProps {
  currentTab: MainNavTab;
  setCurrentTab: (tab: MainNavTab) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  walletBalance: number;
  onOpenWalletModal: () => void;
  onOpenStartStationModal: () => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  hasActiveSession: boolean;
  dbConnected?: boolean;
  currentUser?: User | null;
  onSignIn?: () => void;
  onSignOut?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  userRole,
  setUserRole,
  walletBalance,
  onOpenWalletModal,
  onOpenStartStationModal,
  notifications,
  onOpenNotifications,
  hasActiveSession,
  dbConnected = true,
  currentUser = null,
  onSignIn,
  onSignOut,
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const roleLabels: Record<UserRole, { label: string; icon: React.ReactNode; color: string }> = {
    customer: { label: 'EV Driver / Customer', icon: <Zap className="w-3.5 h-3.5 text-emerald-600" />, color: 'bg-emerald-50 text-emerald-800 border-emerald-200' },
    partner: { label: 'Station Partner / Owner', icon: <Building2 className="w-3.5 h-3.5 text-blue-600" />, color: 'bg-blue-50 text-blue-800 border-blue-200' },
    franchise: { label: 'Franchise Partner', icon: <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />, color: 'bg-purple-50 text-purple-800 border-purple-200' },
    fleet: { label: 'Fleet Customer', icon: <Truck className="w-3.5 h-3.5 text-amber-600" />, color: 'bg-amber-50 text-amber-800 border-amber-200' },
    admin: { label: 'Unite Powertek Admin', icon: <Activity className="w-3.5 h-3.5 text-rose-600" />, color: 'bg-rose-50 text-rose-800 border-rose-200' },
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top micro-announcement & trust bar */}
      <div className="bg-[#002D62] text-white text-xs py-1.5 px-4 hidden md:flex items-center justify-between font-medium">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full text-[11px] font-semibold border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Turnkey EV Ecosystem
          </span>
          <span className="text-slate-200">
            Apply. We Build. You Earn. Transform suitable land into high-yield EV charging infrastructure.
          </span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-slate-300">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-blue-950/60 border border-blue-800/60 font-mono text-[10px]">
            <Database className="w-3 h-3 text-emerald-400" />
            <span className="text-emerald-300">Firestore Cloud DB</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
          </div>
          <span className="text-slate-600">|</span>
          <button 
            onClick={() => setCurrentTab('financing')} 
            className="hover:text-emerald-300 transition-colors cursor-pointer"
          >
            MSME / Bank Financing Assistance
          </button>
          <span className="text-slate-600">|</span>
          <button 
            onClick={() => setCurrentTab('tracker')} 
            className="hover:text-amber-300 transition-colors cursor-pointer flex items-center gap-1"
          >
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            Track Application
          </button>
          <span className="text-slate-600">|</span>
          <span>National Helpline: 1800-266-9900</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentTab('home')} 
          className="cursor-pointer flex items-center group py-2"
        >
          <UnitevLogo variant="full" size="md" />
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => setCurrentTab('home')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
              currentTab === 'home'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setCurrentTab('map')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'map'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            <MapPin className="w-4 h-4 text-emerald-600" />
            Find Charger
          </button>

          <button
            onClick={() => setCurrentTab('charge')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 relative ${
              currentTab === 'charge'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            Live Charge
            {hasActiveSession && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping absolute top-2 right-1" />
            )}
          </button>

          <button
            onClick={() => setCurrentTab('calculator')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'calculator'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            <Calculator className="w-4 h-4 text-blue-600" />
            Business Calculator
          </button>

          <button
            onClick={() => setCurrentTab('partner')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              currentTab === 'partner'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            <Building2 className="w-4 h-4 text-slate-700" />
            Partner Portal
          </button>

          <button
            onClick={() => setCurrentTab('financing')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
              currentTab === 'financing'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            Financing
          </button>

          <button
            onClick={() => setCurrentTab('energy')}
            className={`px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
              currentTab === 'energy'
                ? 'text-[#002D62] bg-blue-50/80 font-bold'
                : 'text-slate-600 hover:text-[#002D62] hover:bg-slate-100/60'
            }`}
          >
            Energy & BESS
          </button>

          <button
            onClick={() => setCurrentTab('admin')}
            className={`px-2.5 py-1.5 text-xs font-semibold rounded-md border transition-all ${
              currentTab === 'admin'
                ? 'border-rose-300 text-rose-700 bg-rose-50'
                : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
            }`}
          >
            Admin Ops
          </button>
        </nav>

        {/* Right Action Icons & Role Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Active Role Selector Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full border shadow-2xs transition-all ${roleLabels[userRole].color}`}
              title="Switch Perspective / Role"
            >
              {roleLabels[userRole].icon}
              <span className="hidden sm:inline font-semibold">{roleLabels[userRole].label.split('/')[0]}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {roleDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onClick={() => setRoleDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                  Select User Perspective
                </div>
                {(Object.keys(roleLabels) as UserRole[]).map((role) => (
                  <button
                    key={role}
                    onClick={() => {
                      setUserRole(role);
                      if (role === 'partner') setCurrentTab('partner');
                      if (role === 'admin') setCurrentTab('admin');
                      if (role === 'fleet') setCurrentTab('fleet');
                      if (role === 'customer') setCurrentTab('home');
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg text-left transition-colors ${
                      userRole === role ? 'bg-slate-100 font-bold text-[#002D62]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {roleLabels[role].icon}
                      <span>{roleLabels[role].label}</span>
                    </div>
                    {userRole === role && <UserCheck className="w-3.5 h-3.5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wallet Balance Pill */}
          <button
            onClick={onOpenWalletModal}
            className="hidden sm:flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border border-slate-200"
          >
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>₹{walletBalance.toLocaleString('en-IN')}</span>
          </button>

          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-full text-slate-600 hover:text-[#002D62] hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {/* User / Authentication Pill */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1.5 rounded-full text-xs font-semibold transition-colors border border-slate-200"
              >
                {currentUser.photoURL ? (
                  <img 
                    src={currentUser.photoURL} 
                    alt={currentUser.displayName || 'User'} 
                    className="w-4 h-4 rounded-full"
                    referrerPolicy="no-referrer" 
                  />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-blue-600" />
                )}
                <span className="max-w-[80px] truncate hidden md:inline">
                  {currentUser.displayName?.split(' ')[0] || currentUser.email?.split('@')[0] || 'User'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-white border border-slate-200 rounded-xl shadow-xl p-2 z-50 text-xs"
                  onClick={() => setUserDropdownOpen(false)}
                >
                  <div className="px-2.5 py-2 border-b border-slate-100">
                    <p className="font-bold text-slate-900 truncate">{currentUser.displayName || 'EV User'}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  </div>
                  <button
                    onClick={onSignOut}
                    className="w-full mt-1 flex items-center gap-2 px-2.5 py-2 text-rose-600 hover:bg-rose-50 rounded-lg text-left font-medium transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onSignIn}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-2xs transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Primary CTA - Start a Station */}
          <button
            onClick={onOpenStartStationModal}
            className="flex items-center gap-1.5 bg-gradient-to-r from-[#002D62] to-[#0A3D78] hover:from-[#00224D] hover:to-[#002D62] text-white px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md transition-all border border-blue-900/30 cursor-pointer"
          >
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Apply to Build Station</span>
            <span className="sm:hidden">Apply</span>
          </button>
        </div>
      </div>
    </header>
  );
};
