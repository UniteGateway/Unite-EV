import React, { useState, useEffect } from 'react';
import { MainNavTab, UserRole, StationApplication, EVStation, NotificationItem, ChargingInvoice, CalculatorInputs } from './types';
import { INITIAL_STATIONS, INITIAL_APPLICATION, INITIAL_NOTIFICATIONS, SAMPLE_INVOICES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Homepage } from './components/views/Homepage';
import { FindChargerMapView } from './components/views/FindChargerMapView';
import { ChargingSessionView } from './components/views/ChargingSessionView';
import { BusinessCalculatorView } from './components/views/BusinessCalculatorView';
import { ProjectTrackerView } from './components/views/ProjectTrackerView';
import { PartnerDashboardView } from './components/views/PartnerDashboardView';
import { AdminDashboardView } from './components/views/AdminDashboardView';
import { FleetManagementView } from './components/views/FleetManagementView';
import { EnergyManagementView } from './components/views/EnergyManagementView';
import { StartStationModal } from './components/views/StartStationModal';
import { NotificationModal } from './components/NotificationModal';
import { WalletModal } from './components/WalletModal';
import { UnitevLogo } from './components/UnitevLogo';
import { 
  Zap, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  ExternalLink,
  Landmark,
  Coins
} from 'lucide-react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  logOut, 
  testFirestoreConnection, 
  saveApplicationToDB, 
  updateApplicationStageInDB, 
  subscribeToApplications, 
  saveWalletBalanceToDB, 
  saveInvoiceToDB 
} from './lib/firebase';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState<MainNavTab>('home');
  const [userRole, setUserRole] = useState<UserRole>('customer');

  // Firebase Auth & Cloud Connection State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dbConnected, setDbConnected] = useState<boolean>(true);

  // Application Data State
  const [stations, setStations] = useState<EVStation[]>(INITIAL_STATIONS);
  const [selectedStation, setSelectedStation] = useState<EVStation>(INITIAL_STATIONS[0]);
  const [applications, setApplications] = useState<StationApplication[]>([INITIAL_APPLICATION]);
  const [activeApplication, setActiveApplication] = useState<StationApplication>(INITIAL_APPLICATION);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [walletBalance, setWalletBalance] = useState<number>(2450.0);
  const [hasActiveChargingSession, setHasActiveChargingSession] = useState<boolean>(true);
  const [invoices, setInvoices] = useState<ChargingInvoice[]>(SAMPLE_INVOICES);

  // Modals
  const [isStartStationOpen, setIsStartStationOpen] = useState<boolean>(false);
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false);

  // Initialize Firebase Auth & Real-Time Firestore Sync
  useEffect(() => {
    // 1. Mandatory connection test on boot
    testFirestoreConnection().then(ok => setDbConnected(ok));

    // 2. Auth State Listener
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email === 'uniterealbricks@gmail.com') {
        setUserRole('admin');
      }
    });

    // 3. Realtime Firestore subscription for station applications
    const unsubscribeApps = subscribeToApplications((dbApps) => {
      if (dbApps && dbApps.length > 0) {
        setApplications(dbApps);
        // If current active application is in the list, refresh it
        setActiveApplication(prev => {
          const found = dbApps.find(a => a.id === prev.id);
          return found || dbApps[0];
        });
      }
    });

    // 4. Backend Health Check Verification
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        console.log('Unite Powertek Backend Service Status:', data);
      })
      .catch(err => {
        console.warn('Backend endpoint status check:', err.message);
      });

    return () => {
      unsubscribeAuth();
      unsubscribeApps();
    };
  }, []);

  // Synchronize role change with corresponding primary view
  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    if (role === 'partner' || role === 'franchise') {
      setCurrentTab('partner');
    } else if (role === 'admin') {
      setCurrentTab('admin');
    } else if (role === 'fleet') {
      setCurrentTab('fleet');
    } else {
      setCurrentTab('home');
    }
  };

  // Handler when user submits the 6-step proposal
  const handleApplicationSubmitted = async (newApp: StationApplication) => {
    // 1. Optimistic local update
    setApplications(prev => [newApp, ...prev.filter(a => a.id !== newApp.id)]);
    setActiveApplication(newApp);

    // 2. Save persistently to Firestore Database
    try {
      await saveApplicationToDB(newApp);
    } catch (err) {
      console.warn('Persisting application to Firestore:', err);
    }

    // Create confirmation notification
    const newNotice: NotificationItem = {
      id: `notice-${Date.now()}`,
      title: 'Station Application Saved to Cloud DB!',
      message: `Your site proposal (${newApp.id}) for ${newApp.location.city} is securely stored in Firestore and queued for technical feasibility review.`,
      timestamp: 'Just now',
      read: false,
      type: 'application',
    };
    setNotifications(prev => [newNotice, ...prev]);

    // Navigate to visual tracker
    setCurrentTab('tracker');
  };

  // Advance stage (from admin view)
  const handleAdvanceStage = async (appId: string) => {
    const stageSequence: any[] = [
      'application_received',
      'site_verification',
      'feasibility',
      'dpr',
      'financing',
      'approvals',
      'equipment',
      'installation',
      'testing',
      'go_live',
      'revenue',
    ];

    let targetNextStage = '';
    let targetCompletedStages: string[] = [];

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const currentIdx = stageSequence.indexOf(app.currentStage);
        if (currentIdx < stageSequence.length - 1) {
          const nextStage = stageSequence[currentIdx + 1];
          const updatedCompleted = Array.from(new Set([...app.completedStages, app.currentStage]));
          targetNextStage = nextStage;
          targetCompletedStages = updatedCompleted;
          return {
            ...app,
            currentStage: nextStage,
            completedStages: updatedCompleted,
          };
        }
      }
      return app;
    }));

    // Update active app if it matches
    if (activeApplication.id === appId) {
      const currentIdx = stageSequence.indexOf(activeApplication.currentStage);
      if (currentIdx < stageSequence.length - 1) {
        const nextStage = stageSequence[currentIdx + 1];
        setActiveApplication(prev => ({
          ...prev,
          currentStage: nextStage,
          completedStages: Array.from(new Set([...prev.completedStages, prev.currentStage])),
        }));
      }
    }

    // Sync to Firestore Cloud DB
    if (targetNextStage) {
      try {
        await updateApplicationStageInDB(appId, targetNextStage, targetCompletedStages);
      } catch (err) {
        console.warn('Updating stage in Firestore:', err);
      }
    }
  };

  // Handle wallet addition
  const handleAddFunds = async (amount: number) => {
    const newBal = walletBalance + amount;
    setWalletBalance(newBal);

    // Save to Firestore
    try {
      await saveWalletBalanceToDB(currentUser?.uid || 'guest-user', newBal);
    } catch (err) {
      console.warn('Saving wallet balance to Firestore:', err);
    }

    const newNotice: NotificationItem = {
      id: `wallet-${Date.now()}`,
      title: 'Wallet Recharged Successfully',
      message: `₹${amount.toFixed(2)} added to your Unitev EV Wallet.`,
      timestamp: 'Just now',
      read: false,
      type: 'charging',
    };
    setNotifications(prev => [newNotice, ...prev]);
  };

  // Handle session payment
  const handlePaySession = async (amount: number, invoice: ChargingInvoice) => {
    const newBal = Math.max(0, walletBalance - amount);
    setWalletBalance(newBal);
    setInvoices(prev => [invoice, ...prev]);
    setHasActiveChargingSession(false);

    // Persist invoice & wallet balance to Firestore
    try {
      await saveInvoiceToDB(invoice);
      await saveWalletBalanceToDB(currentUser?.uid || 'guest-user', newBal);
    } catch (err) {
      console.warn('Saving invoice to Firestore:', err);
    }
  };

  // Google Login / Logout handlers
  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google sign-in error:', err);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setCurrentUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Quick navigation helpers
  const handleSelectStationForCharging = (station: EVStation) => {
    setSelectedStation(station);
    setCurrentTab('charge');
  };

  const handleApplyFromCalculator = (inputs: CalculatorInputs) => {
    setIsStartStationOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-emerald-500 selection:text-slate-950">
      {/* Platform Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        setUserRole={handleRoleChange}
        walletBalance={walletBalance}
        onOpenWalletModal={() => setIsWalletOpen(true)}
        onOpenStartStationModal={() => setIsStartStationOpen(true)}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationOpen(true)}
        hasActiveSession={hasActiveChargingSession}
        dbConnected={dbConnected}
        currentUser={currentUser}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <Homepage
            onOpenStartStationModal={() => setIsStartStationOpen(true)}
            onNavigateToTab={(tab) => setCurrentTab(tab as MainNavTab)}
            onOpenCalculator={() => setCurrentTab('calculator')}
          />
        )}

        {currentTab === 'map' && (
          <FindChargerMapView
            stations={stations}
            onSelectStationForCharging={handleSelectStationForCharging}
          />
        )}

        {currentTab === 'charge' && (
          <ChargingSessionView
            station={selectedStation}
            walletBalance={walletBalance}
            onPaySession={handlePaySession}
            onSessionCompleteStateChange={setHasActiveChargingSession}
          />
        )}

        {currentTab === 'calculator' && (
          <BusinessCalculatorView
            onApplyWithParameters={handleApplyFromCalculator}
          />
        )}

        {currentTab === 'tracker' && (
          <ProjectTrackerView
            application={activeApplication}
            onOpenStartStationModal={() => setIsStartStationOpen(true)}
          />
        )}

        {currentTab === 'partner' && (
          <PartnerDashboardView
            station={selectedStation}
          />
        )}

        {currentTab === 'admin' && (
          <AdminDashboardView
            applications={applications}
            stations={stations}
            onAdvanceApplicationStage={handleAdvanceStage}
          />
        )}

        {currentTab === 'fleet' && (
          <FleetManagementView />
        )}

        {currentTab === 'energy' && (
          <EnergyManagementView />
        )}

        {currentTab === 'financing' && (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-8">
            <div className="bg-[#002D62] text-white p-8 rounded-3xl shadow-xl">
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                Financing & Bank Debt Syndication
              </span>
              <h1 className="text-3xl font-black mt-3">Bank Debt & MSME Subsidy Center</h1>
              <p className="text-xs sm:text-sm text-blue-100 mt-2 max-w-2xl">
                Unite Powertek coordinates with public sector banks, NBFCs, and state agencies to help qualified site applicants secure up to 70% debt financing and CGTMSE collateral-free support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <Landmark className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-slate-900 text-base">SBI Green Mobility Loan</h3>
                <p className="text-xs text-slate-600 mt-1">Concessional interest rates for commercial EV charging infrastructure under MSME credit lines.</p>
                <div className="mt-4 pt-3 border-t text-xs font-mono text-emerald-700 font-bold">Up to ₹50 Lakhs Debt</div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <ShieldCheck className="w-8 h-8 text-emerald-600 mb-3" />
                <h3 className="font-bold text-slate-900 text-base">CGTMSE Coverage</h3>
                <p className="text-xs text-slate-600 mt-1">Credit Guarantee Fund Trust for Micro and Small Enterprises collateral-free guarantee scheme.</p>
                <div className="mt-4 pt-3 border-t text-xs font-mono text-emerald-700 font-bold">Zero Third-Party Collateral</div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
                <Coins className="w-8 h-8 text-amber-600 mb-3" />
                <h3 className="font-bold text-slate-900 text-base">State EV Subsidies</h3>
                <p className="text-xs text-slate-600 mt-1">FAME II & State EV Policy capital subsidies on chargers and dedicated distribution transformers.</p>
                <div className="mt-4 pt-3 border-t text-xs font-mono text-emerald-700 font-bold">DPR Vetting Support</div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setIsStartStationOpen(true)}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm shadow-md cursor-pointer inline-flex items-center gap-2"
              >
                <span>Apply For Station With Financing Assistance</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Platform Global Footer (Except on full-bleed map view) */}
      {currentTab !== 'map' && (
        <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-24 lg:pb-12 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-3">
                <UnitevLogo size="md" theme="dark" />
                <p className="text-slate-400 text-xs leading-relaxed mt-2">
                  <strong>UNITE POWERTEK</strong> — India's Integrated EV Charging Infrastructure & Turnkey Business Platform.
                </p>
                <p className="text-[11px] text-emerald-400 font-semibold">
                  Tagline: Apply. We Build. You Earn.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                  Ecosystem Solutions
                </h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentTab('home')} className="hover:text-white">Build a Charging Station</button></li>
                  <li><button onClick={() => setCurrentTab('calculator')} className="hover:text-white">Business ROI Calculator</button></li>
                  <li><button onClick={() => setCurrentTab('tracker')} className="hover:text-white">11-Stage Project Tracker</button></li>
                  <li><button onClick={() => setCurrentTab('financing')} className="hover:text-white">MSME & Bank Financing</button></li>
                  <li><button onClick={() => setCurrentTab('energy')} className="hover:text-white">Microgrid & Solar BESS</button></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                  Driver & Fleet Network
                </h4>
                <ul className="space-y-2">
                  <li><button onClick={() => setCurrentTab('map')} className="hover:text-white">Find Nearest Charger</button></li>
                  <li><button onClick={() => setCurrentTab('fleet')} className="hover:text-white">Fleet Management Portal</button></li>
                  <li><button onClick={() => setCurrentTab('charge')} className="hover:text-white">Live Vehicle Charging Session</button></li>
                  <li><button onClick={() => setIsWalletOpen(true)} className="hover:text-white">Unitev Digital EV Wallet</button></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">
                  National Partner Desk
                </h4>
                <div className="space-y-1.5 text-slate-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Toll Free: 1800 209 8899</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>partner@unitepowertek.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>HQ: Nariman Point, Mumbai, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mandatory Statutory Notice */}
            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-500 leading-relaxed">
              <p>
                <strong>Statutory Notice & Disclaimers:</strong> Unite Powertek operates as an electric vehicle charging infrastructure developer, turnkey project management partner, and OCPP network aggregator. Loan financing assistance, bank debt syndications, MSME Udyam subsidies, and Discom power sanctions are subject to statutory verification, independent banking credit approvals, site feasibility criteria, and state/central government EV regulatory guidelines. Projections generated through the business calculator represent indicative techno-economic simulations and do not constitute promised or guaranteed returns.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4 text-slate-500">
                <span>© 2026 Unite Powertek Energy Private Limited. All rights reserved.</span>
                <span className="flex items-center gap-3">
                  <span className="hover:underline cursor-pointer">Privacy Policy</span>
                  <span>•</span>
                  <span className="hover:underline cursor-pointer">Terms of Service</span>
                  <span>•</span>
                  <span className="hover:underline cursor-pointer">Discom Guidelines</span>
                </span>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Mobile Sticky Bottom Nav */}
      <MobileBottomNav
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenStartStationModal={() => setIsStartStationOpen(true)}
        hasActiveSession={hasActiveChargingSession}
      />

      {/* Global Modals */}
      <StartStationModal
        isOpen={isStartStationOpen}
        onClose={() => setIsStartStationOpen(false)}
        onSubmitSuccess={handleApplicationSubmitted}
      />

      <WalletModal
        isOpen={isWalletOpen}
        onClose={() => setIsWalletOpen(false)}
        balance={walletBalance}
        onAddFunds={handleAddFunds}
      />

      <NotificationModal
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
        notifications={notifications}
        onMarkAllRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
      />
    </div>
  );
}
