import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import AdminLayout from '../../components/layout/AdminLayout';
import useAuthStore from '../../store/authStore';
import 'leaflet/dist/leaflet.css';

// Fix default marker icon issue with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom icons
const violationIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white">!</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const expiredDiscIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white">D</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

const roadblockIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white">RB</div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16]
});

// Gauteng center coordinates
const gautengCenter = [-26.1000, 28.0500];

const violations = [
  { id: 1, lat: -26.1048, lng: 28.0535, type: 'speeding', amount: 1500, plate: 'GP 14 KW', area: 'Sandton', count: 7 },
  { id: 2, lat: -26.1453, lng: 28.0420, type: 'speeding', amount: 2100, plate: 'GP 82 TT', area: 'Rosebank', count: 5 },
  { id: 3, lat: -26.0800, lng: 28.0100, type: 'expired_disc', amount: 750, plate: 'GP 44 LZ', area: 'Randburg', count: 3 },
  { id: 4, lat: -26.0200, lng: 28.0000, type: 'speeding', amount: 1800, plate: 'GP 09 RR', area: 'Fourways', count: 4 },
  { id: 5, lat: -26.1900, lng: 28.1000, type: 'parking', amount: 600, plate: 'GP 55 ZN', area: 'Midrand', count: 2 },
  { id: 6, lat: -26.1600, lng: 28.0700, type: 'expired_disc', amount: 900, plate: 'WC 31 PP', area: 'Sandton', count: 6 },
  { id: 7, lat: -26.1200, lng: 28.0900, type: 'speeding', amount: 1350, plate: 'GP 14 KW', area: 'Rosebank', count: 3 },
  { id: 8, lat: -26.0500, lng: 28.0300, type: 'parking', amount: 500, plate: 'GP 82 TT', area: 'Randburg', count: 1 },
];

const roadblocks = [
  { id: 1, lat: -26.1000, lng: 28.0200, name: 'William Nicol & N1', officers: 4 },
  { id: 2, lat: -26.1500, lng: 28.0800, name: 'Oxford Road Checkpoint', officers: 3 },
];

const topOffenders = [
  { id: 1, name: 'T. Molefe', initials: 'TM', fines: 4200, plate: 'GP 14 KW', area: 'Rosebank', seen: '2h ago', level: 'HIGH' },
  { id: 2, name: 'N. Khumalo', initials: 'NK', fines: 3750, plate: 'GP 82 TT', area: 'Sandton', seen: '5h ago', level: 'HIGH' },
  { id: 3, name: 'P. van der Berg', initials: 'PV', fines: 2100, plate: 'WC 31 PP', area: 'Fourways', seen: '1d ago', level: 'MED' },
  { id: 4, name: 'S. Mthembu', initials: 'SM', fines: 1800, plate: 'GP 44 LZ', area: 'Randburg', seen: '3h ago', level: 'MED' },
  { id: 5, name: 'A. Botha', initials: 'AB', fines: 1350, plate: 'GP 09 RR', area: 'Midrand', seen: '6h ago', level: 'MED' },
];

const SetMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 12);
  return null;
};

const LiveMap = () => {
  const { user } = useAuthStore();
  const [activeFilters, setActiveFilters] = useState({
    unpaid: true,
    expiredDisc: true,
    roadblocks: true
  });
  const [selectedOffender, setSelectedOffender] = useState(null);

  const toggleFilter = (key) => {
    setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getMarkerIcon = (type) => {
    if (type === 'expired_disc') return expiredDiscIcon;
    return violationIcon;
  };

  return (
    <AdminLayout>
      <div className="flex h-full">
        {/* Map Panel */}
        <div className="flex-1 relative">
          <MapContainer
            center={gautengCenter}
            zoom={12}
            className="h-full w-full z-0"
            style={{ background: '#0B1520' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <SetMapView center={gautengCenter} />

            {/* Violations */}
            {activeFilters.unpaid && violations.map(v => (
              v.type !== 'expired_disc' && (
                <div key={v.id}>
                  <Marker position={[v.lat, v.lng]} icon={violationIcon}>
                    <Popup>
                      <div className="text-xs">
                        <p className="font-bold text-slate-900 mb-1">{v.plate} — {v.area}</p>
                        <p className="text-slate-600">Fine: R {v.amount.toLocaleString()}</p>
                        <p className="text-slate-600">Type: {v.type}</p>
                        <p className="text-slate-500 mt-1">{v.count} violations in area</p>
                      </div>
                    </Popup>
                  </Marker>
                  {v.count > 3 && (
                    <Circle
                      center={[v.lat, v.lng]}
                      radius={v.count * 100}
                      pathOptions={{
                        color: '#FF5A5A',
                        fillColor: '#FF5A5A',
                        fillOpacity: 0.15,
                        weight: 1
                      }}
                    />
                  )}
                </div>
              )
            ))}

            {/* Expired Discs */}
            {activeFilters.expiredDisc && violations.map(v => (
              v.type === 'expired_disc' && (
                <Marker key={`disc-${v.id}`} position={[v.lat, v.lng]} icon={expiredDiscIcon}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900 mb-1">{v.plate} — {v.area}</p>
                      <p className="text-slate-600">Fine: R {v.amount.toLocaleString()}</p>
                      <p className="text-slate-600">Expired Disc</p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}

            {/* Roadblocks */}
            {activeFilters.roadblocks && roadblocks.map(rb => (
              <div key={rb.id}>
                <Marker position={[rb.lat, rb.lng]} icon={roadblockIcon}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900 mb-1">{rb.name}</p>
                      <p className="text-slate-600">{rb.officers} officers on site</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={[rb.lat, rb.lng]}
                  radius={500}
                  pathOptions={{
                    color: '#3B82F6',
                    fillColor: '#3B82F6',
                    fillOpacity: 0.1,
                    weight: 2,
                    dashArray: '10 5'
                  }}
                />
              </div>
            ))}
          </MapContainer>

          {/* Stats Overlay */}
          <div className="absolute top-3 left-3 z-[1000] space-y-2">
            <div className="bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>147</div>
              <div className="text-[9px] text-slate-500">Active violations</div>
            </div>
            <div className="bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-lg font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>38</div>
              <div className="text-[9px] text-slate-500">Expired discs</div>
            </div>
            <div className="bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-lg font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>2</div>
              <div className="text-[9px] text-slate-500">Roadblocks active</div>
            </div>
          </div>

          {/* Filters */}
          <div className="absolute top-3 right-3 z-[1000] flex gap-1.5">
            <button onClick={() => toggleFilter('unpaid')}
              className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-colors ${
                activeFilters.unpaid ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'bg-adm/90 border-slate-700 text-slate-500'
              }`}>
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full inline-block mr-1.5" />
              Unpaid fines
            </button>
            <button onClick={() => toggleFilter('expiredDisc')}
              className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-colors ${
                activeFilters.expiredDisc ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' : 'bg-adm/90 border-slate-700 text-slate-500'
              }`}>
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full inline-block mr-1.5" />
              Expired disc
            </button>
            <button onClick={() => toggleFilter('roadblocks')}
              className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-colors ${
                activeFilters.roadblocks ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' : 'bg-adm/90 border-slate-700 text-slate-500'
              }`}>
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full inline-block mr-1.5" />
              Roadblocks
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 z-[1000] bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-red-400 rounded-full" /> Unpaid fine — size = count</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-amber-400 rounded-full" /> Expired disc / licence</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-blue-400 rounded-full" /> Active roadblock</div>
          </div>
        </div>

        {/* Right Panel - Top Offenders */}
        <div className="hidden lg:flex w-56 bg-adm2 border-l border-slate-800 flex-col shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Top offenders</span>
            <span className="bg-emerald-500/10 text-emerald-400 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">42</span>
          </div>
          <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
            {topOffenders.map((offender) => (
              <div
                key={offender.id}
                onClick={() => setSelectedOffender(offender)}
                className={`p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedOffender?.id === offender.id ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/[0.02] border border-slate-800 hover:bg-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-[8px] font-bold text-slate-400 shrink-0">
                    {offender.initials}
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 truncate flex-1">{offender.name}</span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${
                    offender.level === 'HIGH' ? 'bg-red-500/15 text-red-400' : 'bg-amber-500/15 text-amber-400'
                  }`}>
                    {offender.level}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-1 text-[9px]">
                  <div><span className="text-slate-600 block">Fines</span><span className="text-slate-400">R {offender.fines.toLocaleString()}</span></div>
                  <div><span className="text-slate-600 block">Plate</span><span className="text-slate-400">{offender.plate}</span></div>
                  <div><span className="text-slate-600 block">Area</span><span className="text-slate-400">{offender.area}</span></div>
                  <div><span className="text-slate-600 block">Seen</span><span className="text-slate-400">{offender.seen}</span></div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-slate-800">
            <button className="w-full py-2 bg-emerald-500 text-slate-900 rounded-md text-[11px] font-semibold hover:bg-emerald-400 transition-colors">
              Plan roadblock
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LiveMap;