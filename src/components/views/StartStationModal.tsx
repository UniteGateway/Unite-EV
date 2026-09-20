import React, { useState } from 'react';
import { StationApplication, ApplicantInfo, LocationInfo, PropertyInfo, InvestmentInfo, ChargingRequirementInfo } from '../../types';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  MapPin, 
  Building2, 
  Zap, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  Crosshair,
  User,
  IndianRupee,
  Calendar,
  CheckCircle2,
  FileCheck
} from 'lucide-react';

interface StartStationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (application: StationApplication) => void;
}

export const StartStationModal: React.FC<StartStationModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedApplication, setSubmittedApplication] = useState<StationApplication | null>(null);

  // Form State
  const [applicant, setApplicant] = useState<ApplicantInfo>({
    applicantType: 'individual',
    fullName: 'Ananya Deshmukh',
    mobile: '+91 98230 76543',
    email: 'ananya.deshmukh@gmail.com',
    city: 'Pune',
    state: 'Maharashtra',
    panNumber: 'BNMPD8912K',
    aadhaarNumber: 'XXXX-XXXX-4519',
    companyName: '',
    gstNumber: '',
  });

  const [location, setLocation] = useState<LocationInfo>({
    siteAddress: 'Plot 48, Near Vadgaon Toll Plaza, Pune-Bengaluru NH48',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Vadgaon / Pune',
    pincode: '412106',
    gpsCoordinates: '18.7182° N, 73.6548° E',
    siteCategory: 'highway',
    nearbyLandmark: 'Adjacent to Vadgaon Food Hub & BPCL Fuel Station',
  });

  const [property, setProperty] = useState<PropertyInfo>({
    ownershipType: 'owned',
    landAreaSqFt: 5500,
    roadFrontageFt: 65,
    parkingBays: 8,
    existingBuilding: false,
    existingPowerConnection: true,
    sanctionedLoadKw: 125,
    transformerAvailable: true,
    uploadedDocuments: {
      landDocs: 'Land_Title_7_12_Extract.pdf',
      leaseAgreement: '',
      electricityBill: 'MSEDCL_Power_Sanction_Bill.pdf',
      sitePhotos: ['front_access_road.jpg', 'electrical_meter_room.jpg'],
      sitePlan: 'Survey_Master_Layout.pdf',
    },
  });

  const [investment, setInvestment] = useState<InvestmentInfo>({
    budgetTier: '25L-50L',
    wantsFinancingAssistance: true,
    equityContributionLakhs: 10,
    desiredTenureYears: 5,
  });

  const [chargingReq, setChargingReq] = useState<ChargingRequirementInfo>({
    chargerTypes: ['DC Fast 60kW Dual Gun', 'DC Fast 120kW Dual Gun', 'AC 22kW Type 2'],
    desiredChargersCount: 4,
    targetVehicles: ['cars', 'buses', 'fleets'],
    additionalNotes: 'Space for 6-8 vehicles with dedicated cafe seating.',
  });

  if (!isOpen) return null;

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(prev => ({
            ...prev,
            gpsCoordinates: `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`,
          }));
        },
        () => {
          // fallback
          setLocation(prev => ({
            ...prev,
            gpsCoordinates: '18.5204° N, 73.8567° E (Detected via GPS)',
          }));
        }
      );
    }
  };

  const handleDocumentSelect = (docType: string, filename: string) => {
    setProperty(prev => ({
      ...prev,
      uploadedDocuments: {
        ...prev.uploadedDocuments,
        [docType]: filename,
      }
    }));
  };

  const toggleChargerType = (type: string) => {
    setChargingReq(prev => {
      const exists = prev.chargerTypes.includes(type);
      return {
        ...prev,
        chargerTypes: exists 
          ? prev.chargerTypes.filter(t => t !== type)
          : [...prev.chargerTypes, type]
      };
    });
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newAppId = `UP-EV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp: StationApplication = {
        id: newAppId,
        createdAt: new Date().toISOString(),
        status: 'under_review',
        currentStage: 'application_received',
        completedStages: ['application_received'],
        applicant,
        location,
        property,
        investment,
        chargingRequirement: chargingReq,
        relationshipManager: {
          name: 'Rajesh Sharma',
          designation: 'Senior Director - Infrastructure Development & Partner Alliances',
          phone: '+91 99870 12345',
          email: 'rajesh.sharma@unitepowertek.com',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        },
        expectedNextStep: 'Technical Site Verification & Grid Feasibility Desk Review within 48 business hours.',
        targetGoLiveDate: '30 November 2026',
        estimatedProjectCostLakhs: investment.budgetTier === '5L-10L' ? 9.5 : investment.budgetTier === '10L-25L' ? 21.0 : investment.budgetTier === '25L-50L' ? 36.5 : 75.0,
      };

      setSubmittedApplication(newApp);
      setIsSubmitting(false);
      setCurrentStep(6);
      onSubmitSuccess(newApp);
    }, 1000);
  };

  const stepTitles = [
    'Applicant Details',
    'Site Location',
    'Property & Power',
    'Investment & Debt',
    'Charger Requirements',
    'Submitted',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#002D62] to-[#0A3D78] text-white p-4 sm:p-5 flex items-center justify-between flex-shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider bg-orange-500 text-white px-2 py-0.5 rounded-full">
                Partner Application
              </span>
              <span className="text-xs text-slate-300">Turnkey Project Setup</span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold mt-0.5">Start an EV Charging Station</h2>
            <p className="text-xs text-blue-100">Apply. We Build. You Earn.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        {currentStep < 6 && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex-shrink-0">
            <div className="flex items-center justify-between">
              {stepTitles.slice(0, 5).map((title, idx) => {
                const stepNum = idx + 1;
                const isCompleted = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;
                return (
                  <div key={title} className="flex items-center gap-1.5 sm:gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCompleted
                          ? 'bg-emerald-600 text-white'
                          : isCurrent
                          ? 'bg-[#002D62] text-white ring-2 ring-blue-300'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {isCompleted ? <Check className="w-3.5 h-3.5" /> : stepNum}
                    </div>
                    <span
                      className={`text-[11px] hidden md:inline font-medium ${
                        isCurrent ? 'text-slate-900 font-bold' : 'text-slate-500'
                      }`}
                    >
                      {title}
                    </span>
                    {idx < 4 && (
                      <div
                        className={`h-[2px] w-4 sm:w-8 hidden sm:block ${
                          isCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5">
          {/* STEP 1: APPLICANT */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-4 h-4 text-[#002D62]" />
                  Step 1 — Applicant Profile & KYC
                </h3>
                <p className="text-xs text-slate-500">
                  Select your applicant entity type and provide primary KYC details.
                </p>
              </div>

              {/* Individual or Company */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Applicant Entity Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setApplicant(prev => ({ ...prev, applicantType: 'individual' }))}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      applicant.applicantType === 'individual'
                        ? 'border-[#002D62] bg-blue-50/60 ring-1 ring-[#002D62]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Individual / Landowner</div>
                    <div className="text-[11px] text-slate-500">Self-owned land, commercial plot, or entrepreneur</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setApplicant(prev => ({ ...prev, applicantType: 'company' }))}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      applicant.applicantType === 'company'
                        ? 'border-[#002D62] bg-blue-50/60 ring-1 ring-[#002D62]'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">Company / Business / LLP</div>
                    <div className="text-[11px] text-slate-500">Petrol pumps, hotels, malls, logistics firms & trusts</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {applicant.applicantType === 'company' ? 'Authorized Representative Name' : 'Full Legal Name'} *
                  </label>
                  <input
                    type="text"
                    value={applicant.fullName}
                    onChange={(e) => setApplicant(prev => ({ ...prev, fullName: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002D62]"
                    placeholder="e.g. Vikramaditya Singhania"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Number (WhatsApp Enabled) *</label>
                  <input
                    type="text"
                    value={applicant.mobile}
                    onChange={(e) => setApplicant(prev => ({ ...prev, mobile: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002D62]"
                    placeholder="+91 98201 XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={applicant.email}
                    onChange={(e) => setApplicant(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002D62]"
                    placeholder="name@domain.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">PAN Card Number *</label>
                  <input
                    type="text"
                    value={applicant.panNumber}
                    onChange={(e) => setApplicant(prev => ({ ...prev, panNumber: e.target.value.toUpperCase() }))}
                    className="w-full text-xs font-mono font-medium px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#002D62]"
                    placeholder="ABCDE1234F"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City / District *</label>
                  <input
                    type="text"
                    value={applicant.city}
                    onChange={(e) => setApplicant(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">State *</label>
                  <select
                    value={applicant.state}
                    onChange={(e) => setApplicant(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Punjab">Punjab</option>
                  </select>
                </div>

                {applicant.applicantType === 'company' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Company / Entity Name</label>
                      <input
                        type="text"
                        value={applicant.companyName}
                        onChange={(e) => setApplicant(prev => ({ ...prev, companyName: e.target.value }))}
                        className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                        placeholder="Apex Logistics & Infra Pvt Ltd"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number</label>
                      <input
                        type="text"
                        value={applicant.gstNumber}
                        onChange={(e) => setApplicant(prev => ({ ...prev, gstNumber: e.target.value.toUpperCase() }))}
                        className="w-full text-xs font-mono font-medium px-3 py-2 border border-slate-200 rounded-xl"
                        placeholder="27ABCDE1234F1Z5"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* STEP 2: LOCATION */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Step 2 — Proposed Station Site & Geo Coordinates
                </h3>
                <p className="text-xs text-slate-500">
                  Pinpoint your land or property location. Accurate details enable rapid grid verification.
                </p>
              </div>

              {/* Quick Geo Actions */}
              <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#002D62] text-white text-xs font-semibold rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                  Use Current Location
                </button>
                <div className="text-xs text-blue-900 font-mono font-semibold flex items-center gap-1">
                  <span className="text-slate-500">GPS:</span>
                  <span>{location.gpsCoordinates || 'Not set'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Site Full Address / Survey Number *</label>
                  <input
                    type="text"
                    value={location.siteAddress}
                    onChange={(e) => setLocation(prev => ({ ...prev, siteAddress: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Site Category *</label>
                  <select
                    value={location.siteCategory}
                    onChange={(e) => setLocation(prev => ({ ...prev, siteCategory: e.target.value as any }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl bg-white"
                  >
                    <option value="highway">National / State Highway (NH/SH)</option>
                    <option value="urban">Urban Main Road / Junction</option>
                    <option value="commercial">Commercial Complex / Mall / IT Park</option>
                    <option value="residential">Residential Township / Gated Community</option>
                    <option value="industrial">Industrial Estate / Warehouse Hub</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">District / City *</label>
                  <input
                    type="text"
                    value={location.city}
                    onChange={(e) => setLocation(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={location.pincode}
                    onChange={(e) => setLocation(prev => ({ ...prev, pincode: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Prominent Nearby Landmark *</label>
                  <input
                    type="text"
                    value={location.nearbyLandmark}
                    onChange={(e) => setLocation(prev => ({ ...prev, nearbyLandmark: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. Near Toll Plaza, Opp HPCL Pump"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: PROPERTY & POWER */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-600" />
                  Step 3 — Property Dimensions & Electrical Infrastructure
                </h3>
                <p className="text-xs text-slate-500">
                  Unite Powertek engineers handle civil foundation & transformer upgrades.
                </p>
              </div>

              {/* Ownership */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Do you own or lease the land? *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { key: 'owned', label: 'Self Owned Land' },
                    { key: 'lease', label: 'Long-term Lease' },
                    { key: 'rental', label: 'Rental Agreement' },
                    { key: 'partnership', label: 'Joint Partnership' },
                    { key: 'existing_commercial', label: 'Existing Commercial Hub' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setProperty(prev => ({ ...prev, ownershipType: item.key as any }))}
                      className={`p-2.5 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                        property.ownershipType === item.key
                          ? 'border-[#002D62] bg-blue-50/70 text-[#002D62] font-bold'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Land Area (Sq. Ft) *</label>
                  <input
                    type="number"
                    value={property.landAreaSqFt}
                    onChange={(e) => setProperty(prev => ({ ...prev, landAreaSqFt: Number(e.target.value) }))}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Road Frontage (Ft) *</label>
                  <input
                    type="number"
                    value={property.roadFrontageFt}
                    onChange={(e) => setProperty(prev => ({ ...prev, roadFrontageFt: Number(e.target.value) }))}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dedicated Bays *</label>
                  <input
                    type="number"
                    value={property.parkingBays}
                    onChange={(e) => setProperty(prev => ({ ...prev, parkingBays: Number(e.target.value) }))}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sanctioned Load (kW)</label>
                  <input
                    type="number"
                    value={property.sanctionedLoadKw}
                    onChange={(e) => setProperty(prev => ({ ...prev, sanctionedLoadKw: Number(e.target.value) }))}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={property.existingPowerConnection}
                    onChange={(e) => setProperty(prev => ({ ...prev, existingPowerConnection: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-sm"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Existing Electrical Connection on Site</div>
                    <div className="text-[11px] text-slate-500">LT or HT meter connection available</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={property.transformerAvailable}
                    onChange={(e) => setProperty(prev => ({ ...prev, transformerAvailable: e.target.checked }))}
                    className="w-4 h-4 text-emerald-600 rounded-sm"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Distribution Transformer Nearby (&lt;100m)</div>
                    <div className="text-[11px] text-slate-500">Easier Discom sanction and cabling</div>
                  </div>
                </label>
              </div>

              {/* Document Upload Simulator */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Document Uploads (Verification)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <div className="p-3 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">Land 7/12 or Title Deed</div>
                      <div className="text-[10px] text-slate-500 truncate">{property.uploadedDocuments.landDocs || 'Not uploaded'}</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleDocumentSelect('landDocs', '7_12_Extract_Verified.pdf')}
                      className="mt-2 text-[11px] text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Upload className="w-3 h-3" /> Upload / Replace
                    </button>
                  </div>

                  <div className="p-3 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">Electricity Bill</div>
                      <div className="text-[10px] text-slate-500 truncate">{property.uploadedDocuments.electricityBill || 'Not uploaded'}</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleDocumentSelect('electricityBill', 'Latest_MSEDCL_HT_Bill.pdf')}
                      className="mt-2 text-[11px] text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Upload className="w-3 h-3" /> Upload Bill
                    </button>
                  </div>

                  <div className="p-3 border border-dashed border-slate-300 rounded-xl bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">Site Photographs & Plan</div>
                      <div className="text-[10px] text-slate-500 truncate">2 site photos attached</div>
                    </div>
                    <button 
                      type="button" 
                      onClick={() => handleDocumentSelect('sitePlan', 'Architect_Cad_Site_Plan.pdf')}
                      className="mt-2 text-[11px] text-blue-600 font-bold flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <Upload className="w-3 h-3" /> Add Photos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: INVESTMENT & FINANCING */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-emerald-600" />
                  Step 4 — Planned Investment & Bank Financing Assistance
                </h3>
                <p className="text-xs text-slate-500">
                  Select your expected investment scale. Unite Powertek coordinates DPR & Bank/NBFC syndication.
                </p>
              </div>

              {/* Budget Tiers */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Target Capital Expenditure Tier
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { tier: '5L-10L', title: '₹5L – ₹10 Lakh', desc: 'Single Dual DC (30kW) or Multiple AC Guns' },
                    { tier: '10L-25L', title: '₹10L – ₹25 Lakh', desc: 'Dual 60kW DC Fast Charger + AC Backup' },
                    { tier: '25L-50L', title: '₹25L – ₹50 Lakh', desc: '120kW Supercharger + 60kW Fast Gun' },
                    { tier: '50L-1Cr', title: '₹50L – ₹1 Crore', desc: 'Highway Supercharging Plaza (240kW Hub)' },
                    { tier: '1Cr+', title: '₹1 Crore+', desc: 'Mega Fleet / Bus / Heavy Truck Multi-Gun Plaza' },
                  ].map((item) => (
                    <button
                      key={item.tier}
                      type="button"
                      onClick={() => setInvestment(prev => ({ ...prev, budgetTier: item.tier as any }))}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        investment.budgetTier === item.tier
                          ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{item.title}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Financing Assistance Toggle */}
              <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#002D62]" />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        I Want Bank / NBFC Financing & MSME Udyam Assistance
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Unite Powertek assists with DPR, credit appraisal, CGTMSE coverage & subsidies.
                      </p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={investment.wantsFinancingAssistance}
                    onChange={(e) => setInvestment(prev => ({ ...prev, wantsFinancingAssistance: e.target.checked }))}
                    className="w-5 h-5 text-emerald-600 rounded-sm"
                  />
                </div>

                {investment.wantsFinancingAssistance && (
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-blue-200/60">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Self Equity Contribution (₹ Lakhs)
                      </label>
                      <input
                        type="number"
                        value={investment.equityContributionLakhs || 10}
                        onChange={(e) => setInvestment(prev => ({ ...prev, equityContributionLakhs: Number(e.target.value) }))}
                        className="w-full text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Desired Loan Tenure (Years)
                      </label>
                      <select
                        value={investment.desiredTenureYears || 5}
                        onChange={(e) => setInvestment(prev => ({ ...prev, desiredTenureYears: Number(e.target.value) }))}
                        className="w-full text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg bg-white"
                      >
                        <option value={3}>3 Years (Accelerated)</option>
                        <option value={5}>5 Years (Standard MSME)</option>
                        <option value={7}>7 Years (Infrastructure)</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                <strong>Statutory Notice:</strong> Loans, interest rates, capital subsidies and clearances are subject to applicant eligibility, lender appraisal decisions, and applicable state EV policies. Financing is not guaranteed.
              </div>
            </div>
          )}

          {/* STEP 5: CHARGING REQUIREMENT */}
          {currentStep === 5 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  Step 5 — Charging Configuration & Vehicle Compatibility
                </h3>
                <p className="text-xs text-slate-500">
                  Select your intended charger mix and target customer vehicles.
                </p>
              </div>

              {/* Charger Types */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Preferred Charger Types (Multi-select)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'AC Type 2 (11kW / 22kW)',
                    'DC Fast 30kW Single Gun',
                    'DC Fast 60kW Dual Gun',
                    'DC Fast 120kW Dual Gun',
                    'DC Ultra-Fast 240kW Hub',
                    'Highway Heavy Bus Charging (CCS2 / GB/T)',
                    'Fleet Depot Smart Cluster',
                    'Commercial Mall Hub',
                  ].map((type) => {
                    const selected = chargingReq.chargerTypes.includes(type);
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => toggleChargerType(type)}
                        className={`p-2.5 rounded-xl border text-xs font-medium text-left cursor-pointer transition-all ${
                          selected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{type}</span>
                          {selected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Desired Number of Charging Guns / Dispensers *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={chargingReq.desiredChargersCount}
                    onChange={(e) => setChargingReq(prev => ({ ...prev, desiredChargersCount: Number(e.target.value) }))}
                    className="w-full text-xs font-semibold px-3 py-2 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Site Notes or Specific Requests
                  </label>
                  <input
                    type="text"
                    value={chargingReq.additionalNotes}
                    onChange={(e) => setChargingReq(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    className="w-full text-xs font-medium px-3 py-2 border border-slate-200 rounded-xl"
                    placeholder="e.g. Include solar canopy or restaurant lounge"
                  />
                </div>
              </div>

              {/* Review Summary Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900">Application Summary Snapshot:</div>
                <div className="text-slate-600">Applicant: <strong>{applicant.fullName}</strong> ({applicant.applicantType})</div>
                <div className="text-slate-600">Location: <strong>{location.siteAddress}, {location.city}</strong></div>
                <div className="text-slate-600">Land & Frontage: <strong>{property.landAreaSqFt} sq.ft / {property.roadFrontageFt} ft frontage</strong></div>
                <div className="text-slate-600">Capital Tier: <strong>{investment.budgetTier}</strong> (Financing Assistance: {investment.wantsFinancingAssistance ? 'Yes' : 'No'})</div>
              </div>
            </div>
          )}

          {/* STEP 6: SUBMISSION CONFIRMATION */}
          {currentStep === 6 && submittedApplication && (
            <div className="space-y-6 py-4 animate-in zoom-in-95 duration-200 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900">Your Application Has Been Submitted Successfully!</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-md mx-auto">
                  Welcome to Unite Powertek. Your proposal has entered our automated site evaluation and technical grid review workflow.
                </p>
              </div>

              {/* Generated Ticket Card */}
              <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 p-5 rounded-2xl border border-blue-200 max-w-lg mx-auto text-left shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Application ID</span>
                    <div className="text-base font-black text-[#002D62]">{submittedApplication.id}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                    Desk Verification Underway
                  </span>
                </div>

                <div className="py-3.5 space-y-2 text-xs border-b border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Site Location:</span>
                    <span className="font-semibold text-slate-800 text-right">{submittedApplication.location.city}, {submittedApplication.location.state}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Project Cost:</span>
                    <span className="font-semibold text-slate-800">₹{submittedApplication.estimatedProjectCostLakhs} Lakhs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target Commissioning:</span>
                    <span className="font-semibold text-emerald-700">{submittedApplication.targetGoLiveDate}</span>
                  </div>
                </div>

                {/* Assigned Relationship Manager */}
                <div className="pt-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-2">
                    Assigned Relationship Manager
                  </span>
                  <div className="flex items-center gap-3">
                    <img 
                      src={submittedApplication.relationshipManager.avatarUrl} 
                      alt={submittedApplication.relationshipManager.name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-300"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-slate-900">{submittedApplication.relationshipManager.name}</div>
                      <div className="text-[11px] text-slate-500">{submittedApplication.relationshipManager.designation}</div>
                      <div className="text-[11px] text-blue-700 font-mono mt-0.5">
                        {submittedApplication.relationshipManager.phone} | {submittedApplication.relationshipManager.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Next Step */}
                <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs">
                  <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    Expected Immediate Next Step:
                  </div>
                  <p className="text-emerald-800 mt-0.5 text-[11px] leading-relaxed">
                    {submittedApplication.expectedNextStep}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#002D62] text-white rounded-xl text-xs font-bold shadow-md hover:bg-blue-900 cursor-pointer"
                >
                  View & Track in Project Tracker
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        {currentStep < 6 && (
          <div className="p-4 sm:px-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-[#002D62] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-all shadow-sm cursor-pointer"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Application...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Submit Station Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
