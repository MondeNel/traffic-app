import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet';
import L from 'leaflet';
import AdminLayout from '../../components/layout/AdminLayout';
import PlanRoadblockModal from '../../components/admin/PlanRoadblockModal';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Custom Icons
const violationBadge = (amount) => new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap">R${amount}</div>`,
  iconSize: [40, 18], iconAnchor: [20, 30]
});

const expiredDiscBadge = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap">EXP DISC</div>`,
  iconSize: [50, 18], iconAnchor: [25, 30]
});

const roadblockIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white">RB</div>`,
  iconSize: [32, 32], iconAnchor: [16, 16]
});

const carIcon = (color, plate, hasFine) => new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="relative">
    <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-white" style="background:${color}">
      <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 stroke-white fill-none" stroke-width="2.5"><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
    </div>
    <div class="absolute -top-0.5 -right-3 text-[7px] font-bold text-white bg-black/70 px-1 rounded whitespace-nowrap">${plate}</div>
    ${hasFine ? `<div class="absolute -bottom-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white animate-pulse"></div>` : ''}
  </div>`,
  iconSize: [35, 35], iconAnchor: [17, 17]
});

const policeIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300 animate-pulse" style="background:#1d4ed8">
    <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 stroke-white fill-none" stroke-width="2.5"><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
  </div>`,
  iconSize: [28, 28], iconAnchor: [14, 14]
});

const gautengCenter = [-26.1000, 28.0500];

const hotspots = [
  { id: 1, lat: -26.1050, lng: 28.0540, radius: 1800, tickets: 342, revenue: 'R 513,000', area: 'Sandton CBD', color: '#EF4444', opacity: 0.12 },
  { id: 2, lat: -26.1450, lng: 28.0420, radius: 1400, tickets: 256, revenue: 'R 384,000', area: 'Rosebank', color: '#EF4444', opacity: 0.10 },
  { id: 3, lat: -26.0800, lng: 28.0100, radius: 1200, tickets: 198, revenue: 'R 297,000', area: 'Randburg', color: '#F59E0B', opacity: 0.10 },
  { id: 4, lat: -26.0250, lng: 28.0000, radius: 1500, tickets: 289, revenue: 'R 433,500', area: 'Fourways', color: '#EF4444', opacity: 0.11 },
  { id: 5, lat: -26.1900, lng: 28.1000, radius: 1000, tickets: 145, revenue: 'R 217,500', area: 'Midrand', color: '#F59E0B', opacity: 0.09 },
  { id: 6, lat: -26.1200, lng: 28.0700, radius: 1600, tickets: 310, revenue: 'R 465,000', area: 'M1 Corridor', color: '#EF4444', opacity: 0.13 },
  { id: 7, lat: -26.0600, lng: 28.0450, radius: 1300, tickets: 234, revenue: 'R 351,000', area: 'Bryanston', color: '#F59E0B', opacity: 0.10 },
  { id: 8, lat: -26.1550, lng: 28.0650, radius: 1100, tickets: 178, revenue: 'R 267,000', area: 'Parktown', color: '#F59E0B', opacity: 0.08 },
];

const roadNetworks = {
  'N1_North': [
    [-26.1900, 28.1000], [-26.1850, 28.0980], [-26.1780, 28.0950], [-26.1700, 28.0900],
    [-26.1620, 28.0860], [-26.1550, 28.0820], [-26.1480, 28.0780], [-26.1400, 28.0740],
    [-26.1320, 28.0700], [-26.1240, 28.0660], [-26.1160, 28.0620], [-26.1080, 28.0580],
    [-26.1000, 28.0540], [-26.0920, 28.0500], [-26.0840, 28.0460], [-26.0760, 28.0420],
    [-26.0680, 28.0380], [-26.0600, 28.0340], [-26.0520, 28.0300], [-26.0440, 28.0260],
    [-26.0360, 28.0220], [-26.0280, 28.0180], [-26.0200, 28.0140], [-26.0120, 28.0100]
  ],
  'M1_Sandton': [
    [-26.1200, 28.0100], [-26.1180, 28.0160], [-26.1160, 28.0220], [-26.1140, 28.0280],
    [-26.1120, 28.0340], [-26.1100, 28.0400], [-26.1080, 28.0460], [-26.1060, 28.0520],
    [-26.1040, 28.0580], [-26.1020, 28.0640], [-26.1000, 28.0700], [-26.0980, 28.0760],
    [-26.0960, 28.0820], [-26.0940, 28.0880], [-26.0920, 28.0940]
  ],
  'William_Nicol': [
    [-26.0300, 28.0200], [-26.0380, 28.0220], [-26.0460, 28.0240], [-26.0540, 28.0260],
    [-26.0620, 28.0280], [-26.0700, 28.0300], [-26.0780, 28.0320], [-26.0860, 28.0340],
    [-26.0940, 28.0360], [-26.1020, 28.0380], [-26.1100, 28.0400], [-26.1180, 28.0420],
    [-26.1260, 28.0440], [-26.1340, 28.0460], [-26.1420, 28.0480]
  ],
  'Oxford_Road': [
    [-26.1650, 28.0400], [-26.1620, 28.0440], [-26.1590, 28.0480], [-26.1560, 28.0520],
    [-26.1530, 28.0560], [-26.1500, 28.0600], [-26.1470, 28.0640], [-26.1440, 28.0680],
    [-26.1410, 28.0720], [-26.1380, 28.0760], [-26.1350, 28.0800], [-26.1320, 28.0840],
    [-26.1290, 28.0880]
  ],
  'Rivonia_Road': [
    [-26.0550, 28.0750], [-26.0600, 28.0720], [-26.0650, 28.0690], [-26.0700, 28.0660],
    [-26.0750, 28.0630], [-26.0800, 28.0600], [-26.0850, 28.0570], [-26.0900, 28.0540],
    [-26.0950, 28.0510], [-26.1000, 28.0480], [-26.1050, 28.0450], [-26.1100, 28.0420],
    [-26.1150, 28.0390], [-26.1200, 28.0360], [-26.1250, 28.0330]
  ],
  'Sandton_CBD_Loop': [
    [-26.1080, 28.0560], [-26.1070, 28.0580], [-26.1050, 28.0590], [-26.1030, 28.0570],
    [-26.1020, 28.0540], [-26.1040, 28.0520], [-26.1060, 28.0510], [-26.1090, 28.0530],
    [-26.1100, 28.0550], [-26.1080, 28.0560]
  ],
  'Rosebank_Zone': [
    [-26.1480, 28.0420], [-26.1460, 28.0440], [-26.1440, 28.0430], [-26.1430, 28.0400],
    [-26.1450, 28.0380], [-26.1470, 28.0390], [-26.1490, 28.0410], [-26.1480, 28.0420]
  ],
  'Fourways_Mall': [
    [-26.0220, 28.0020], [-26.0200, 28.0040], [-26.0180, 28.0030], [-26.0190, 28.0000],
    [-26.0210, 27.9980], [-26.0240, 27.9990], [-26.0250, 28.0010], [-26.0220, 28.0020]
  ],
  'Midrand_Industrial': [
    [-26.1920, 28.1020], [-26.1900, 28.1040], [-26.1880, 28.1030], [-26.1870, 28.1000],
    [-26.1890, 28.0980], [-26.1910, 28.0990], [-26.1930, 28.1010], [-26.1920, 28.1020]
  ],
  'Bryanston_Drive': [
    [-26.0580, 28.0460], [-26.0560, 28.0480], [-26.0540, 28.0470], [-26.0550, 28.0440],
    [-26.0570, 28.0420], [-26.0600, 28.0430], [-26.0610, 28.0450], [-26.0580, 28.0460]
  ],
  'Parktown_Road': [
    [-26.1580, 28.0660], [-26.1560, 28.0680], [-26.1540, 28.0670], [-26.1530, 28.0640],
    [-26.1550, 28.0620], [-26.1570, 28.0630], [-26.1590, 28.0650], [-26.1580, 28.0660]
  ],
  'Randburg_Main': [
    [-26.0820, 28.0120], [-26.0800, 28.0140], [-26.0780, 28.0130], [-26.0770, 28.0100],
    [-26.0790, 28.0080], [-26.0810, 28.0090], [-26.0830, 28.0110], [-26.0820, 28.0120]
  ],
};

const simulatedVehicles = [
  { id: 1, plate: 'GP 14 KW', color: '#3B82F6', route: 'N1_North', direction: 1, speed: 0.00035, fine: { type: 'speeding', amount: 1500 } },
  { id: 2, plate: 'GP 82 TT', color: '#EF4444', route: 'N1_North', direction: -1, speed: 0.00028, fine: { type: 'speeding', amount: 2100 } },
  { id: 3, plate: 'GP 19 MP', color: '#6366F1', route: 'N1_North', direction: 1, speed: 0.00040, fine: { type: 'speeding', amount: 3200 } },
  { id: 4, plate: 'WC 31 PP', color: '#F59E0B', route: 'M1_Sandton', direction: 1, speed: 0.00022, fine: { type: 'expired_disc', amount: 900 } },
  { id: 5, plate: 'GP 77 XM', color: '#14B8A6', route: 'M1_Sandton', direction: -1, speed: 0.00030, fine: { type: 'speeding', amount: 1800 } },
  { id: 6, plate: 'GP 09 RR', color: '#10B981', route: 'William_Nicol', direction: 1, speed: 0.00024, fine: null },
  { id: 7, plate: 'GP 33 LS', color: '#F97316', route: 'William_Nicol', direction: -1, speed: 0.00026, fine: { type: 'parking', amount: 500 } },
  { id: 8, plate: 'GP 44 LZ', color: '#8B5CF6', route: 'Oxford_Road', direction: 1, speed: 0.00020, fine: { type: 'parking', amount: 600 } },
  { id: 9, plate: 'GP 21 NT', color: '#EC4899', route: 'Oxford_Road', direction: -1, speed: 0.00032, fine: { type: 'speeding', amount: 2500 } },
  { id: 10, plate: 'GP 55 ZN', color: '#06B6D4', route: 'Rivonia_Road', direction: -1, speed: 0.00030, fine: { type: 'speeding', amount: 1350 } },
  { id: 11, plate: 'GP 88 WJ', color: '#A855F7', route: 'Rivonia_Road', direction: 1, speed: 0.00025, fine: null },
  { id: 12, plate: 'GP 12 AB', color: '#E11D48', route: 'Sandton_CBD_Loop', direction: 1, speed: 0.00018, fine: { type: 'speeding', amount: 2800 } },
  { id: 13, plate: 'GP 45 CD', color: '#0EA5E9', route: 'Sandton_CBD_Loop', direction: -1, speed: 0.00015, fine: { type: 'parking', amount: 750 } },
  { id: 14, plate: 'GP 67 EF', color: '#84CC16', route: 'Sandton_CBD_Loop', direction: 1, speed: 0.00020, fine: null },
  { id: 15, plate: 'WC 89 GH', color: '#F43F5E', route: 'Sandton_CBD_Loop', direction: -1, speed: 0.00022, fine: { type: 'expired_disc', amount: 1100 } },
  { id: 16, plate: 'GP 23 JK', color: '#8B5CF6', route: 'Rosebank_Zone', direction: 1, speed: 0.00016, fine: { type: 'speeding', amount: 1950 } },
  { id: 17, plate: 'GP 56 LM', color: '#FB923C', route: 'Rosebank_Zone', direction: -1, speed: 0.00019, fine: null },
  { id: 18, plate: 'GP 90 NP', color: '#34D399', route: 'Rosebank_Zone', direction: 1, speed: 0.00017, fine: { type: 'parking', amount: 450 } },
  { id: 19, plate: 'GP 34 QR', color: '#F87171', route: 'Fourways_Mall', direction: 1, speed: 0.00014, fine: { type: 'expired_disc', amount: 800 } },
  { id: 20, plate: 'GP 78 ST', color: '#60A5FA', route: 'Fourways_Mall', direction: -1, speed: 0.00016, fine: { type: 'speeding', amount: 1650 } },
  { id: 21, plate: 'GP 15 UV', color: '#C084FC', route: 'Bryanston_Drive', direction: 1, speed: 0.00013, fine: null },
  { id: 22, plate: 'GP 92 WX', color: '#FB7185', route: 'Bryanston_Drive', direction: -1, speed: 0.00015, fine: { type: 'speeding', amount: 2200 } },
  { id: 23, plate: 'GP 41 YZ', color: '#38BDF8', route: 'Parktown_Road', direction: 1, speed: 0.00012, fine: { type: 'parking', amount: 550 } },
  { id: 24, plate: 'GP 63 AA', color: '#A3E635', route: 'Randburg_Main', direction: -1, speed: 0.00014, fine: { type: 'expired_disc', amount: 700 } },
  { id: 25, plate: 'GP 86 BB', color: '#FDBA74', route: 'Randburg_Main', direction: 1, speed: 0.00016, fine: null },
  { id: 26, plate: 'GP 29 CC', color: '#E879F9', route: 'Midrand_Industrial', direction: 1, speed: 0.00013, fine: { type: 'speeding', amount: 1450 } },
  { id: 27, plate: 'GP 50 DD', color: '#4ADE80', route: 'Midrand_Industrial', direction: -1, speed: 0.00015, fine: null },
];

const policeVehicles = [
  { id: 'police-1', plate: 'POLICE-1', route: 'Sandton_CBD_Loop', direction: 1, speed: 0.00035, isPolice: true },
  { id: 'police-2', plate: 'POLICE-2', route: 'Rosebank_Zone', direction: -1, speed: 0.00030, isPolice: true },
  { id: 'police-3', plate: 'POLICE-3', route: 'M1_Sandton', direction: 1, speed: 0.00040, isPolice: true },
];

const recentActivity = [
  { id: 1, type: 'speeding', plate: 'GP 14 KW', location: 'N1 Northbound, Sandton', amount: 1500, time: '2m ago', color: 'red' },
  { id: 2, type: 'expired_disc', plate: 'WC 31 PP', location: 'Rivonia Road, Sandton', amount: 900, time: '5m ago', color: 'amber' },
  { id: 3, type: 'speeding', plate: 'GP 82 TT', location: 'Oxford Road, Rosebank', amount: 2100, time: '8m ago', color: 'red' },
  { id: 4, type: 'parking', plate: 'GP 44 LZ', location: 'Fourways Mall', amount: 600, time: '12m ago', color: 'blue' },
  { id: 5, type: 'roadblock', plate: '—', location: 'William Nicol & N1', amount: null, time: '38m ago', color: 'blue' },
  { id: 6, type: 'expired_disc', plate: 'GP 44 LZ', location: 'Beyers Naudé, Randburg', amount: 750, time: '1h ago', color: 'amber' },
  { id: 7, type: 'payment', plate: 'GP 82 TT', location: 'R 750 disc fine paid', amount: 750, time: '1h ago', color: 'emerald' },
];

const MapControls = () => {
  const map = useMap();
  return (
    <div className="absolute bottom-20 right-3 z-[1000] flex flex-col gap-1">
      <button onClick={() => map.zoomIn()} className="w-8 h-8 bg-adm/90 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-adm2 hover:text-white transition-colors text-lg font-bold">+</button>
      <button onClick={() => map.zoomOut()} className="w-8 h-8 bg-adm/90 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-adm2 hover:text-white transition-colors text-lg font-bold">−</button>
      <button onClick={() => map.setView(gautengCenter, 12)} className="w-8 h-8 bg-adm/90 backdrop-blur-sm border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-adm2 hover:text-white transition-colors" title="Reset view">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 8 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
      </button>
    </div>
  );
};

const SetMapView = ({ center }) => {
  const map = useMap();
  map.setView(center, 12);
  return null;
};

const SmoothMarker = ({ vehicle, routePoints }) => {
  const markerRef = useRef(null);
  const fineRef = useRef(null);

  useEffect(() => {
    let currentSegment = vehicle.direction === 1 ? 0 : routePoints.length - 2;
    let segmentProgress = 0;
    const totalSegments = routePoints.length - 1;
    
    const interval = setInterval(() => {
      if (vehicle.direction === 1) {
        segmentProgress += vehicle.speed;
        if (segmentProgress >= 1) { segmentProgress = 0; currentSegment++; if (currentSegment >= totalSegments) { currentSegment = totalSegments - 1; vehicle.direction = -1; } }
      } else {
        segmentProgress += vehicle.speed;
        if (segmentProgress >= 1) { segmentProgress = 0; currentSegment--; if (currentSegment < 0) { currentSegment = 0; vehicle.direction = 1; } }
      }
      
      const dir = vehicle.direction;
      const start = routePoints[currentSegment];
      const end = routePoints[dir === 1 ? Math.min(currentSegment + 1, totalSegments) : Math.max(currentSegment - 1, 0)];
      if (!start || !end) return;
      
      const lat = start[0] + (end[0] - start[0]) * segmentProgress;
      const lng = start[1] + (end[1] - start[1]) * segmentProgress;
      
      if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
      if (fineRef.current) fineRef.current.setLatLng([lat - 0.0008, lng]);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const startPos = routePoints[vehicle.direction === 1 ? 0 : routePoints.length - 1];

  return (
    <>
      <Marker ref={markerRef} position={startPos} icon={vehicle.isPolice ? policeIcon : carIcon(vehicle.color, vehicle.plate, !!vehicle.fine)}>
        <Popup>
          <div className="text-xs">
            <p className="font-bold text-slate-900 mb-1">{vehicle.plate}</p>
            {vehicle.isPolice && <p className="text-blue-600 font-medium">🚔 Patrol Unit</p>}
            {vehicle.fine && <div className="mt-1 p-1.5 bg-red-50 rounded"><p className="text-red-600 font-medium">⚠ {vehicle.fine.type.replace('_', ' ')}</p><p className="text-red-500 font-bold">R {vehicle.fine.amount.toLocaleString()}</p></div>}
            {!vehicle.fine && !vehicle.isPolice && <p className="text-emerald-600 font-medium">✓ Clear</p>}
          </div>
        </Popup>
      </Marker>
      {vehicle.fine && <Marker ref={fineRef} position={[startPos[0] - 0.0008, startPos[1]]} icon={vehicle.fine.type === 'expired_disc' ? expiredDiscBadge : violationBadge(vehicle.fine.amount)} interactive={false} />}
    </>
  );
};

const LiveMap = () => {
  const [activeFilters, setActiveFilters] = useState({ hotspots: true, vehicles: true, roadblocks: true });
  const [showPlanRoadblock, setShowPlanRoadblock] = useState(false);
  const [roadblocksList, setRoadblocksList] = useState([
    { id: 1, lat: -26.1000, lng: 28.0400, name: 'William Nicol & N1', officers: 4 },
    { id: 2, lat: -26.1500, lng: 28.0800, name: 'Oxford Road Checkpoint', officers: 3 },
  ]);

  const toggleFilter = (key) => setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));

  const handlePlanRoadblock = (data) => {
    setRoadblocksList(prev => [...prev, {
      id: prev.length + 1,
      lat: gautengCenter[0] + (Math.random() - 0.5) * 0.1,
      lng: gautengCenter[1] + (Math.random() - 0.5) * 0.1,
      name: data.name || `${data.location}, ${data.city}`,
      officers: data.officers
    }]);
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

  const totalRevenue = hotspots.reduce((sum, h) => sum + parseInt(h.revenue.replace(/[^0-9]/g, '')), 0);

  return (
    <AdminLayout>
      <div className="flex h-full">
        <div className="flex-1 relative">
          <MapContainer center={gautengCenter} zoom={12} zoomControl={false} className="h-full w-full z-0" style={{ background: '#0B1520' }}>
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
            <SetMapView center={gautengCenter} />
            <MapControls />

            {activeFilters.hotspots && hotspots.map(h => (
              <Circle key={`hotspot-${h.id}`} center={[h.lat, h.lng]} radius={h.radius}
                pathOptions={{ color: h.color, fillColor: h.color, fillOpacity: h.opacity, weight: 2, dashArray: h.area === 'Sandton CBD' || h.area === 'M1 Corridor' ? '5 5' : '10 5' }}>
                <Popup>
                  <div className="text-xs min-w-[140px]">
                    <p className="font-bold text-slate-900 mb-2">{h.area}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between"><span className="text-slate-500">Tickets</span><span className="font-bold text-red-600">{h.tickets}</span></div>
                      <div className="flex justify-between"><span className="text-slate-500">Revenue</span><span className="font-bold text-red-600">{h.revenue}</span></div>
                    </div>
                  </div>
                </Popup>
              </Circle>
            ))}

            {activeFilters.vehicles && (
              <>
                {simulatedVehicles.map(v => <SmoothMarker key={v.id} vehicle={v} routePoints={roadNetworks[v.route]} />)}
                {policeVehicles.map(v => <SmoothMarker key={v.id} vehicle={v} routePoints={roadNetworks[v.route]} />)}
              </>
            )}

            {activeFilters.roadblocks && roadblocksList.map(rb => (
              <div key={rb.id}>
                <Marker position={[rb.lat, rb.lng]} icon={roadblockIcon}>
                  <Popup><div className="text-xs"><p className="font-bold text-slate-900 mb-1">{rb.name}</p><p className="text-slate-600">{rb.officers} officers on site</p></div></Popup>
                </Marker>
                <Circle center={[rb.lat, rb.lng]} radius={500} pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1, weight: 2, dashArray: '10 5' }} />
              </div>
            ))}
          </MapContainer>

          {/* Stats Overlay */}
          <div className="absolute top-3 left-3 z-[1000] space-y-2">
            <div className="bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2"><div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>147</div><div className="text-[9px] text-slate-500">Active violations</div></div>
            <div className="bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2"><div className="text-lg font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>38</div><div className="text-[9px] text-slate-500">Expired discs</div></div>
            <div className="bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2"><div className="text-lg font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{roadblocksList.length}</div><div className="text-[9px] text-slate-500">Roadblocks active</div></div>
            {activeFilters.hotspots && <div className="bg-adm/90 backdrop-blur-sm border border-red-500/30 rounded-lg px-3 py-2"><div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R {(totalRevenue / 1000000).toFixed(1)}M</div><div className="text-[9px] text-slate-500">Hotspot revenue</div></div>}
          </div>

          {/* Filters */}
          <div className="absolute top-3 right-3 z-[1000] flex gap-1.5 flex-wrap">
            {[
              { key: 'hotspots', label: 'Hotspots', color: 'red' },
              { key: 'vehicles', label: 'Vehicles', color: 'emerald' },
              { key: 'roadblocks', label: 'Roadblocks', color: 'blue' }
            ].map(f => (
              <button key={f.key} onClick={() => toggleFilter(f.key)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-colors ${activeFilters[f.key] ? `bg-${f.color}-500/20 border-${f.color}-500/30 text-${f.color}-400` : 'bg-adm/90 border-slate-700 text-slate-500'}`}>
                <span className={`w-1.5 h-1.5 bg-${f.color}-400 rounded-full inline-block mr-1.5`} />{f.label}
              </button>
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-3 left-3 z-[1000] bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" /> High revenue hotspot</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-amber-400 rounded-full" /> Medium revenue hotspot</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-blue-400 rounded-full" /> Roadblock</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full" /> Active vehicle</div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="hidden lg:flex w-60 bg-adm2 border-l border-slate-800 flex-col shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between"><span className="text-[11px] font-medium text-slate-400">Recent activity</span><span className="bg-emerald-500/10 text-emerald-400 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">{recentActivity.length}</span></div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-2.5 rounded-lg bg-white/[0.02] border border-slate-800 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-2 mb-1.5"><div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(activity.color)}`} /><span className="text-[10px] font-medium text-slate-300 capitalize">{activity.type.replace('_', ' ')}</span><span className="text-[9px] text-slate-600 ml-auto">{activity.time}</span></div>
                <div className="space-y-0.5"><div className="flex justify-between text-[9px]"><span className="text-slate-500">Plate</span><span className="text-slate-400 font-mono">{activity.plate}</span></div><div className="text-[9px] text-slate-500 truncate">{activity.location}</div>{activity.amount && <div className="flex justify-between text-[9px] mt-0.5"><span className="text-slate-500">Amount</span><span className="text-red-400 font-medium">R {activity.amount.toLocaleString()}</span></div>}</div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-slate-800">
            <button onClick={() => setShowPlanRoadblock(true)} className="w-full py-2 bg-blue-600 text-white rounded-md text-[11px] font-semibold hover:bg-blue-500 transition-colors">Plan roadblock</button>
          </div>
        </div>
      </div>

      <PlanRoadblockModal isOpen={showPlanRoadblock} onClose={() => setShowPlanRoadblock(false)} onSubmit={handlePlanRoadblock} />
    </AdminLayout>
  );
};

export default LiveMap;