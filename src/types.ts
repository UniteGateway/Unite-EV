export type UserRole = 'customer' | 'partner' | 'admin' | 'fleet' | 'franchise';

export type MainNavTab = 'home' | 'map' | 'charge' | 'partner' | 'calculator' | 'tracker' | 'financing' | 'fleet' | 'energy' | 'admin' | 'account';

export interface ApplicantInfo {
  applicantType: 'individual' | 'company';
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  panNumber: string;
  aadhaarNumber?: string;
  companyName?: string;
  gstNumber?: string;
}

export interface LocationInfo {
  siteAddress: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  gpsCoordinates: string;
  siteCategory: 'highway' | 'urban' | 'commercial' | 'residential' | 'industrial';
  nearbyLandmark: string;
}

export interface PropertyInfo {
  ownershipType: 'owned' | 'lease' | 'rental' | 'partnership' | 'existing_commercial';
  landAreaSqFt: number;
  roadFrontageFt: number;
  parkingBays: number;
  existingBuilding: boolean;
  existingPowerConnection: boolean;
  sanctionedLoadKw: number;
  transformerAvailable: boolean;
  uploadedDocuments: {
    landDocs?: string;
    leaseAgreement?: string;
    electricityBill?: string;
    sitePhotos?: string[];
    sitePlan?: string;
  };
}

export interface InvestmentInfo {
  budgetTier: '5L-10L' | '10L-25L' | '25L-50L' | '50L-1Cr' | '1Cr+';
  wantsFinancingAssistance: boolean;
  equityContributionLakhs?: number;
  desiredTenureYears?: number;
}

export interface ChargingRequirementInfo {
  chargerTypes: string[]; // 'AC Type 2', 'DC Fast 30kW', 'DC Fast 60kW', 'DC Fast 120kW', etc.
  desiredChargersCount: number;
  targetVehicles: ('cars' | 'buses' | 'trucks' | 'two_wheelers' | 'fleets')[];
  additionalNotes?: string;
}

export type ApplicationStage = 
  | 'application_received'
  | 'site_verification'
  | 'feasibility'
  | 'dpr'
  | 'financing'
  | 'approvals'
  | 'equipment'
  | 'installation'
  | 'testing'
  | 'go_live'
  | 'revenue';

export interface StationApplication {
  id: string; // e.g. UP-EV-2026-8842
  createdAt: string;
  status: 'under_review' | 'site_visit_scheduled' | 'feasibility_approved' | 'dpr_in_progress' | 'commissioned';
  currentStage: ApplicationStage;
  completedStages: ApplicationStage[];
  applicant: ApplicantInfo;
  location: LocationInfo;
  property: PropertyInfo;
  investment: InvestmentInfo;
  chargingRequirement: ChargingRequirementInfo;
  relationshipManager: {
    name: string;
    designation: string;
    phone: string;
    email: string;
    avatarUrl: string;
  };
  expectedNextStep: string;
  targetGoLiveDate: string;
  estimatedProjectCostLakhs: number;
}

export interface ChargerGun {
  id: string;
  name: string;
  type: 'CCS2' | 'Type 2' | 'CHAdeMO' | 'GB/T';
  powerKw: number;
  status: 'available' | 'charging' | 'reserved' | 'fault' | 'offline';
  pricePerKwh: number;
}

export interface EVStation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
  distanceKm?: number;
  category: 'highway' | 'mall' | 'hotel' | 'restaurant' | 'fleet' | 'urban' | 'commercial';
  is24x7: boolean;
  totalChargers: number;
  availableChargers: number;
  maxPowerKw: number;
  pricePerKwh: number;
  rating: number;
  reviewsCount: number;
  openingHours: string;
  amenities: string[]; // 'Café', 'Restroom', 'Free WiFi', 'CCTV', 'EV Lounge', 'Kids Play Area'
  photoUrl: string;
  guns: ChargerGun[];
}

export interface ChargingSession {
  sessionId: string;
  stationId: string;
  stationName: string;
  chargerGunId: string;
  connectorType: string;
  vehicleModel: string;
  vehicleRegNo: string;
  startedAt: string;
  currentPowerKw: number;
  energyConsumedKwh: number;
  durationSeconds: number;
  currentCostInr: number;
  batteryPercent: number;
  targetPercent: number;
  status: 'idle' | 'plugged' | 'charging' | 'completed' | 'paused';
}

export interface ChargingInvoice {
  invoiceId: string;
  date: string;
  stationName: string;
  stationAddress: string;
  vehicleNumber: string;
  energyKwh: number;
  durationMinutes: number;
  energyChargeInr: number;
  gstInr: number;
  convenienceFeeInr: number;
  totalInr: number;
  paymentMethod: 'wallet' | 'upi' | 'card' | 'fleet_account';
  transactionId: string;
}

export interface CalculatorInputs {
  landAvailableSqFt: number;
  numberOfChargers: number;
  chargerCapacityKw: number;
  investmentLakhs: number;
  electricityTariffInr: number; // Discom cost per kWh
  chargingSellingPriceInr: number; // Selling price per kWh
  averageDailySessions: number;
  averageKwhPerSession: number;
  operatingDaysPerYear: number;
  maintenanceCostPerMonthInr: number;
  rentPerMonthInr: number;
  financingInterestRate: number; // % annual
}

export interface CalculatorOutputs {
  dailyUnitsKwh: number;
  monthlyUnitsKwh: number;
  annualUnitsKwh: number;
  dailyGrossRevenueInr: number;
  annualGrossRevenueInr: number;
  annualElectricityCostInr: number;
  annualOperatingExpensesInr: number;
  annualEbitdaInr: number;
  annualFinancingCostInr: number;
  annualNetCashFlowInr: number;
  estimatedPaybackPeriodYears: number;
  annualRoiPercent: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'application' | 'charging' | 'finance' | 'alert' | 'system';
}

export interface FleetVehicle {
  id: string;
  regNumber: string;
  model: string;
  driverName: string;
  driverPhone: string;
  batteryCapacityKwh: number;
  dailyConsumptionKwh: number;
  status: 'on_route' | 'charging' | 'idle';
  allocatedDailyLimitKwh: number;
}
