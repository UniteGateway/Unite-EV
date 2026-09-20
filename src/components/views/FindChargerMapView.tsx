import React, { useState, useMemo } from 'react';
import { EVStation, ChargerGun } from '../../types';
import { 
  MapPin, 
  Search, 
  Filter, 
  Zap, 
  Navigation, 
  Clock, 
  Star, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Coffee,
  Wifi,
  Video,
  X,
  Compass,
  CheckCircle2
} from 'lucide-react';

interface FindChargerMapViewProps {
  stations: EVStation[];
  onSelectStationForCharging: (station: EVStation, gun?: ChargerGun) => void;
}

export const FindChargerMapView: React.FC<FindChargerMapViewProps> = ({
  stations,
  onSelectStationForCharging,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [powerFilter, setPowerFilter] = useState<string>('all');
  const [availableOnly, setAvailableOnly] = useState(false);
  const [open247Only, setOpen247Only] = useState(false);
  const [selectedStation, setSelectedStation] = useState<EVStation>(stations[0]);
  const [navigationModalOpen, setNavigationModalOpen] = useState(false);

  // Filtered station list
  const filteredStations = useMemo(() => {
    return stations.filter((station) => {
      // Search
      const matchesSearch = 
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.address.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      // Category
      if (selectedCategory !== 'all' && station.category !== selectedCategory) return false;

      // Power
      if (powerFilter === '180plus' && station.maxPowerKw < 180) return false;
      if (powerFilter === '120' && station.maxPowerKw < 120) return false;
      if (powerFilter === '60' && station.maxPowerKw < 60) return false;
      if (powerFilter === 'ac' && !station.guns.some(g => g.type === 'Type 2')) return false;

      // Available now
      if (availableOnly && station.availableChargers === 0) return false;

      // 24/7
      if (open247Only && !station.is24x7) return false;

      return true;
    });
  }, [stations, searchQuery, selectedCategory, powerFilter, availableOnly, open247Only]);

  return (
    <div className="h-[calc(100vh-4.5rem)] flex flex-col lg:flex-row overflow-hidden bg-slate-100">
      {/* Sidebar / List & Filter Panel (Left) */}
      <div className="w-full lg:w-[460px] xl:w-[500px] h-full bg-white border-r border-slate-200 flex flex-col z-20 shadow-lg flex-shrink-0">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 bg-white space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Find EV Charging Stations</h2>
                <p className="text-[11px] text-slate-500">Unitev Nationwide Rapid Network</p>
              </div>
            </div>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
              {filteredStations.length} Stations Found
            </span>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search highway, city, landmark (e.g. Pune, NH48, BKC)..."
              className="w-full text-xs font-medium pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#002D62] focus:bg-white"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              { id: 'all', label: 'All Stations' },
              { id: 'highway', label: '🛣️ Highway' },
              { id: 'commercial', label: '🏢 City Core' },
              { id: 'mall', label: '🛍️ Mall / Hotel' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#002D62] text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200/70 text-slate-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Power Speed Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            <button
              onClick={() => setPowerFilter(powerFilter === '180plus' ? 'all' : '180plus')}
              className={`px-2.5 py-0.5 rounded-md border font-medium ${
                powerFilter === '180plus' ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold' : 'border-slate-200 text-slate-600'
              }`}
            >
              ⚡ 180 kW+ Ultra Fast
            </button>
            <button
              onClick={() => setPowerFilter(powerFilter === '120' ? 'all' : '120')}
              className={`px-2.5 py-0.5 rounded-md border font-medium ${
                powerFilter === '120' ? 'bg-blue-50 text-blue-800 border-blue-300 font-bold' : 'border-slate-200 text-slate-600'
              }`}
            >
              120 kW Fast
            </button>
            <button
              onClick={() => setPowerFilter(powerFilter === 'ac' ? 'all' : 'ac')}
              className={`px-2.5 py-0.5 rounded-md border font-medium ${
                powerFilter === 'ac' ? 'bg-purple-50 text-purple-800 border-purple-300 font-bold' : 'border-slate-200 text-slate-600'
              }`}
            >
              Type 2 AC
            </button>
            <label className="flex items-center gap-1 cursor-pointer pl-1 text-slate-700">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-3.5 h-3.5 text-emerald-600 rounded-sm"
              />
              <span>Available Now</span>
            </label>
          </div>
        </div>

        {/* Stations Scrollable List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-3 space-y-2.5">
          {filteredStations.map((station) => {
            const isSelected = selectedStation?.id === station.id;
            return (
              <div
                key={station.id}
                onClick={() => setSelectedStation(station)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#002D62] bg-blue-50/40 shadow-sm ring-1 ring-[#002D62]'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1">
                        {station.name}
                      </h3>
                      {station.maxPowerKw >= 180 && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded-sm flex items-center">
                          {station.maxPowerKw}kW
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{station.address}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-slate-900 block font-mono">
                      {station.distanceKm} km
                    </span>
                    <span className="text-[10px] text-emerald-600 font-semibold">
                      ₹{station.pricePerKwh.toFixed(1)}/kWh
                    </span>
                  </div>
                </div>

                {/* Status & Charger count pill */}
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      station.availableChargers > 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${station.availableChargers > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                      {station.availableChargers} of {station.totalChargers} Free
                    </span>

                    <span className="text-[11px] text-slate-400">
                      ★ {station.rating} ({station.reviewsCount})
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStation(station);
                        setNavigationModalOpen(true);
                      }}
                      className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                      title="Navigate"
                    >
                      <Navigation className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectStationForCharging(station);
                      }}
                      className="px-2.5 py-1 bg-[#002D62] text-white text-[11px] font-bold rounded-lg hover:bg-blue-900 transition-colors cursor-pointer"
                    >
                      Charge
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Map Visual Viewport (Right / Center) */}
      <div className="flex-1 relative h-full flex flex-col">
        {/* Vector Map Canvas with Stations Overlay */}
        <div className="w-full h-full bg-[#0F172A] relative overflow-hidden flex items-center justify-center select-none">
          {/* Subtle Grid Map Lines */}
          <div 
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#38BDF8 1px, transparent 1px), radial-gradient(#38BDF8 1px, #0F172A 1px)',
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 20px 20px'
            }}
          />

          {/* Stylized Expressways & Highway lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 800 600">
            {/* NH48 Expressway Arterial */}
            <path d="M 150 100 Q 300 250 450 350 T 700 550" stroke="#38BDF8" strokeWidth="4" fill="none" strokeDasharray="6,6" />
            <path d="M 250 80 Q 400 200 450 350 T 600 580" stroke="#10B981" strokeWidth="3" fill="none" />
            <path d="M 500 120 L 450 350 L 300 520" stroke="#F59E0B" strokeWidth="3" fill="none" strokeDasharray="4,4" />
          </svg>

          {/* Floating Map Pin Markers for Stations */}
          <div className="relative w-full h-full max-w-4xl max-h-[650px] p-8">
            {stations.map((st, index) => {
              const isSelected = selectedStation?.id === st.id;
              // Mock coordinates spread on view
              const positions = [
                { top: '35%', left: '28%' },
                { top: '48%', left: '32%' },
                { top: '65%', left: '46%' },
                { top: '22%', left: '42%' },
                { top: '56%', left: '55%' },
                { top: '28%', left: '48%' },
              ];
              const pos = positions[index % positions.length];

              return (
                <div
                  key={st.id}
                  style={{ top: pos.top, left: pos.left }}
                  onClick={() => setSelectedStation(st)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-30"
                >
                  {/* Pulse aura if selected */}
                  {isSelected && (
                    <div className="absolute -inset-2 bg-emerald-400/40 rounded-full animate-ping pointer-events-none" />
                  )}

                  {/* Marker Pin */}
                  <div className={`px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-xl transition-transform transform group-hover:scale-110 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-black ring-4 ring-white'
                      : st.availableChargers > 0
                      ? 'bg-[#002D62] text-white border-2 border-emerald-400'
                      : 'bg-slate-800 text-slate-300 border border-slate-600'
                  }`}>
                    <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                    <span className="text-[11px] font-bold font-mono">{st.maxPowerKw}kW</span>
                    <span className="text-[10px] opacity-80">({st.availableChargers})</span>
                  </div>

                  {/* Pin label tooltips */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-700 shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {st.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Map Controls Floating in Top Right */}
          <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-xl p-2 text-white flex flex-col gap-2 z-20">
            <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-sm font-bold font-mono">
              +
            </button>
            <div className="h-[1px] bg-slate-700" />
            <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-sm font-bold font-mono">
              -
            </button>
            <div className="h-[1px] bg-slate-700" />
            <button className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center" title="Recenter Location">
              <Compass className="w-4 h-4 text-emerald-400" />
            </button>
          </div>

          {/* Map Layer Badges */}
          <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold z-20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Unitev High Voltage Corridor • Real-Time Telemetry</span>
          </div>

          {/* Selected Station Bottom Floating Drawer / Card */}
          {selectedStation && (
            <div className="absolute bottom-4 left-4 right-4 max-w-2xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-4 sm:p-5 z-30 animate-in slide-in-from-bottom-4 duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <img
                    src={selectedStation.photoUrl}
                    alt={selectedStation.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-slate-900">
                        {selectedStation.name}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {selectedStation.is24x7 ? '24/7 Open' : selectedStation.openingHours}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{selectedStation.address}</p>
                    <div className="flex items-center gap-3 text-xs text-slate-600 mt-1.5 font-medium">
                      <span className="text-emerald-700 font-bold">
                        ₹{selectedStation.pricePerKwh.toFixed(1)} / kWh
                      </span>
                      <span>•</span>
                      <span>{selectedStation.distanceKm} km away</span>
                      <span>•</span>
                      <span className="text-blue-700 font-bold">
                        {selectedStation.availableChargers} of {selectedStation.totalChargers} Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setNavigationModalOpen(true)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Navigate</span>
                  </button>

                  <button
                    onClick={() => onSelectStationForCharging(selectedStation)}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 bg-[#002D62] hover:bg-blue-900 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Start Charging</span>
                  </button>
                </div>
              </div>

              {/* Station Amenities strip */}
              <div className="flex items-center gap-2 mt-3 pt-2.5 border-t border-slate-100 overflow-x-auto text-[11px] text-slate-500">
                <span className="font-semibold text-slate-700">Amenities:</span>
                {selectedStation.amenities.map((amenity, idx) => (
                  <span key={idx} className="bg-slate-100 px-2 py-0.5 rounded-md whitespace-nowrap">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Modal */}
      {navigationModalOpen && selectedStation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full rounded-2xl p-5 border border-slate-200 shadow-2xl space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Navigation className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-base">GPS Turn-by-Turn Navigation</h3>
              </div>
              <button 
                onClick={() => setNavigationModalOpen(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1 text-xs">
              <div className="font-bold text-slate-900">{selectedStation.name}</div>
              <div className="text-slate-500">{selectedStation.address}</div>
              <div className="font-mono text-blue-700 pt-1">
                Distance: {selectedStation.distanceKm} km • ETA: ~{Math.round((selectedStation.distanceKm || 5) * 1.8)} mins
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Head southeast on main arterial expressway towards Exit 14.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Take the slip road at Service Lane indicator for Unitev Charging Superhub.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Designated EV bays 1 to 8 with automated ground sensors will guide your parking.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setNavigationModalOpen(false);
                  onSelectStationForCharging(selectedStation);
                }}
                className="w-full py-2.5 bg-[#002D62] text-white rounded-xl font-bold text-xs hover:bg-blue-900 cursor-pointer"
              >
                Proceed to Connect & Charge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
