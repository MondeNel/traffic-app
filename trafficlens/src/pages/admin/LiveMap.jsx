import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import AdminLayout from '../../components/layout/AdminLayout';
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

const gautengCenter = [-26.1000, 28.0500];

const violations = [
  { id: 1, lat: -26.1048, lng: 28.0535, type: 'speeding', amount: 1500, plate: 'GP 14 KW', area: 'Sandton', count: 7, time: '2m ago' },
  { id: 2, lat: -26.1453, lng: 28.0420, type: 'speeding', amount: 2100, plate: 'GP 82 TT', area: 'Rosebank', count: 5, time: '5m ago' },
  { id: 3, lat: -26.0800, lng: 28.0100, type: 'expired_disc', amount: 750, plate: 'GP 44 LZ', area: 'Randburg', count: 3, time: '8m ago' },
  { id: 4, lat: -26.0200, lng: 28.0000, type: 'speeding', amount: 1800, plate: 'GP 09 RR', area: 'Fourways', count: 4, time: '12m ago' },
  { id: 5, lat: -26.1900, lng: 28.1000, type: 'parking', amount: 600, plate: 'GP 55 ZN', area: 'Midrand', count: 2, time: '15m ago' },
  { id: 6, lat: -26.1600, lng: 28.0700, type: 'expired_disc', amount: 900, plate: 'WC 31 PP', area: 'Sandton', count: 6, time: '20m ago' },
  { id: 7, lat: -26.1200, lng: 28.0900, type: 'speeding', amount: 1350, plate: 'GP 14 KW', area: 'Rosebank', count: 3, time: '25m ago' },
  { id: 8, lat: -26.0500, lng: 28.0300, type: 'parking', amount: 500, plate: 'GP 82 TT', area: 'Randburg', count: 1, time: '30m ago' },
];

const roadblocks = [
  { id: 1, lat: -26.1000, lng: 28.0200, name: 'William Nicol & N1', officers: 4 },
  { id: 2, lat: -26.1500, lng: 28.0800, name: 'Oxford Road Checkpoint', officers: 3 },
];

const recentActivity = [
  { id: 1, type: 'speeding', plate: 'GP 14 KW', location: 'N1 Northbound, Sandton', amount: 1500, time: '2m ago', color: 'red' },
  { id: 2, type: 'expired_disc', plate: 'WC 31 PP', location: 'Rivonia Road, Sandton', amount: 900, time: '5m ago', color: 'amber' },
  { id: 3, type: 'speeding', plate: 'GP 82 TT', location: 'Oxford Road, Rosebank', amount: 2100, time: '8m ago', color: 'red' },
  { id: 4, type: 'parking', plate: 'GP 09 RR', location: 'Fourways Mall', amount: 600, time: '12m ago', color: 'blue' },
  { id: 5, type: 'roadblock', plate: '—', location: 'William Nicol & N1', amount: null, time: '38m ago', color: 'blue' },
  { id: 6, type: 'expired_disc', plate: 'GP 44 LZ', location: 'Beyers Naudé, Randburg', amount: 750, time: '1h ago', color: 'amber' },
  { id: 7, type: 'payment', plate: 'GP 82 TT', location: 'R 750 disc fine paid', amount: 750, time: '1h ago', color: 'emerald' },
];

const SetMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 12);
  return null;
};

const LiveMap = () => {
  const [activeFilters, setActiveFilters] = useState({
    unpaid: true,
    expiredDisc: true,
    roadblocks: true
  });

  const toggleFilter = (key) => {
    setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'speeding': return '⚡';
      case 'expired_disc': return '📋';
      case 'parking': return '🅿️';
      case 'roadblock': return '🚧';
      case 'payment': return '✅';
      default: return '📌';
    }
  };

  const getDotColor = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'amber': return 'bg-amber-500';
      case 'blue': return 'bg-blue-500';
      case 'emerald': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
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
          <div className="absolute top-3 right-3 z-[1000] flex gap-1.5 flex-wrap">
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

        {/* Right Panel - Recent Activity */}
        <div className="hidden lg:flex w-60 bg-adm2 border-l border-slate-800 flex-col shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Recent activity</span>
            <span className="bg-emerald-500/10 text-emerald-400 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">{recentActivity.length}</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="p-2.5 rounded-lg bg-white/[0.02] border border-slate-800 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(activity.color)}`} />
                  <span className="text-[10px] font-medium text-slate-300 capitalize">{activity.type.replace('_', ' ')}</span>
                  <span className="text-[9px] text-slate-600 ml-auto">{activity.time}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[9px]">
                    <span className="text-slate-500">Plate</span>
                    <span className="text-slate-400 font-mono">{activity.plate}</span>
                  </div>
                  <div className="text-[9px] text-slate-500 truncate">{activity.location}</div>
                  {activity.amount && (
                    <div className="flex justify-between text-[9px] mt-0.5">
                      <span className="text-slate-500">Amount</span>
                      <span className="text-red-400 font-medium">R {activity.amount.toLocaleString()}</span>
                    </div>
                  )}
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