import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import AdminLayout from '../../components/layout/AdminLayout';
import 'leaflet/dist/leaflet.css';
import useAuthStore from '../../store/authStore';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// ─────────────────────────────────────────────────────────────────────────────
// JURISDICTION DATABASE — all provinces & cities with real coordinates
// ─────────────────────────────────────────────────────────────────────────────
export const JURISDICTION_DB = {
  Gauteng: {
    cities: {
      Johannesburg: { lat: -26.2041, lng: 28.0473, zoom: 12, density: 'high', trafficMultiplier: 1.4 },
      Pretoria:     { lat: -25.7461, lng: 28.1881, zoom: 12, density: 'high', trafficMultiplier: 1.2 },
      Ekurhuleni:   { lat: -26.3000, lng: 28.1670, zoom: 12, density: 'medium', trafficMultiplier: 1.0 },
      Soweto:       { lat: -26.2678, lng: 27.8585, zoom: 12, density: 'high', trafficMultiplier: 1.1 },
      Sandton:      { lat: -26.1070, lng: 28.0567, zoom: 13, density: 'high', trafficMultiplier: 1.5 },
      Midrand:      { lat: -25.9992, lng: 28.1284, zoom: 12, density: 'medium', trafficMultiplier: 0.9 },
      Centurion:    { lat: -25.8600, lng: 28.1900, zoom: 12, density: 'medium', trafficMultiplier: 1.0 },
    },
  },
  'Western Cape': {
    cities: {
      'Cape Town':    { lat: -33.9249, lng: 18.4241, zoom: 12, density: 'high', trafficMultiplier: 1.3 },
      Stellenbosch:   { lat: -33.9321, lng: 18.8602, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
      'George':       { lat: -33.9608, lng: 22.4597, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      Paarl:          { lat: -33.7310, lng: 18.9741, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
      Worcester:      { lat: -33.6462, lng: 19.4486, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      'Mossel Bay':   { lat: -34.1831, lng: 22.1392, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
    },
  },
  'KwaZulu-Natal': {
    cities: {
      Durban:         { lat: -29.8587, lng: 31.0218, zoom: 12, density: 'high', trafficMultiplier: 1.2 },
      Pietermaritzburg: { lat: -29.6186, lng: 30.3826, zoom: 12, density: 'medium', trafficMultiplier: 0.9 },
      Newcastle:      { lat: -27.7490, lng: 29.9319, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
      Richards_Bay:   { lat: -28.7833, lng: 32.0333, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
      Empangeni:      { lat: -28.7500, lng: 31.9000, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
    },
  },
  'Eastern Cape': {
    cities: {
      'Port Elizabeth': { lat: -33.9608, lng: 25.6022, zoom: 12, density: 'medium', trafficMultiplier: 0.9 },
      'East London':    { lat: -33.0153, lng: 27.9116, zoom: 12, density: 'medium', trafficMultiplier: 0.8 },
      Mthatha:          { lat: -31.5881, lng: 28.7847, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      Uitenhage:        { lat: -33.7667, lng: 25.4000, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      Grahamstown:      { lat: -33.3042, lng: 26.5328, zoom: 13, density: 'low', trafficMultiplier: 0.4 },
    },
  },
  'Free State': {
    cities: {
      Bloemfontein:   { lat: -29.1210, lng: 26.2140, zoom: 12, density: 'medium', trafficMultiplier: 0.8 },
      Welkom:         { lat: -27.9774, lng: 26.7342, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      Phuthaditjhaba: { lat: -28.5333, lng: 28.8000, zoom: 13, density: 'low', trafficMultiplier: 0.4 },
    },
  },
  Limpopo: {
    cities: {
      Polokwane:      { lat: -23.9015, lng: 29.4687, zoom: 12, density: 'medium', trafficMultiplier: 0.8 },
      Tzaneen:        { lat: -23.8333, lng: 30.1667, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      Musina:         { lat: -22.3383, lng: 30.0441, zoom: 13, density: 'low', trafficMultiplier: 0.4 },
      Thohoyandou:    { lat: -22.9500, lng: 30.4833, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
    },
  },
  Mpumalanga: {
    cities: {
      Nelspruit:      { lat: -25.4753, lng: 30.9694, zoom: 12, density: 'medium', trafficMultiplier: 0.8 },
      Witbank:        { lat: -25.8753, lng: 29.2303, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
      Secunda:        { lat: -26.5177, lng: 29.1762, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
      Middelburg:     { lat: -25.7725, lng: 29.4742, zoom: 13, density: 'low', trafficMultiplier: 0.5 },
    },
  },
  'North West': {
    cities: {
      Mahikeng:       { lat: -25.8556, lng: 25.6454, zoom: 12, density: 'medium', trafficMultiplier: 0.7 },
      Rustenburg:     { lat: -25.6758, lng: 27.2423, zoom: 12, density: 'medium', trafficMultiplier: 0.8 },
      Potchefstroom:  { lat: -26.7145, lng: 27.1018, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
      Klerksdorp:     { lat: -26.8667, lng: 26.6667, zoom: 13, density: 'low', trafficMultiplier: 0.6 },
    },
  },
  'Northern Cape': {
    cities: {
      Kimberley:      { lat: -28.7323, lng: 24.7620, zoom: 12, density: 'low', trafficMultiplier: 0.6 },
      Upington:       { lat: -28.4478, lng: 21.2561, zoom: 13, density: 'low', trafficMultiplier: 0.4 },
      Springbok:      { lat: -29.6651, lng: 17.8868, zoom: 13, density: 'low', trafficMultiplier: 0.3 },
    },
  },
};

// Province-specific licence plate prefixes
const PLATE_PREFIXES = {
  Gauteng: ['GP'],
  'Western Cape': ['WC', 'CA'],
  'KwaZulu-Natal': ['NP', 'ND'],
  'Eastern Cape': ['EC'],
  'Free State': ['FS'],
  Limpopo: ['LP'],
  Mpumalanga: ['MP'],
  'North West': ['NW'],
  'Northern Cape': ['NC'],
};

// Static color map to avoid Tailwind production purge
const FILTER_COLORS = {
  red:     { bg: 'bg-red-500/20',     border: 'border-red-500/30',     text: 'text-red-400' },
  amber:   { bg: 'bg-amber-500/20',   border: 'border-amber-500/30',   text: 'text-amber-400' },
  blue:    { bg: 'bg-blue-500/20',    border: 'border-blue-500/30',    text: 'text-blue-400' },
  emerald: { bg: 'bg-emerald-500/20', border: 'border-emerald-500/30', text: 'text-emerald-400' },
};

// ─────────────────────────────────────────────────────────────────────────────
// SEEDED RANDOM — deterministic per city so data stays consistent each render
// ─────────────────────────────────────────────────────────────────────────────
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function cityToSeed(cityName) {
  return cityName.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) * 31;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROAD NETWORK GENERATOR
// Generates realistic road spokes + ring roads around a city center
// ─────────────────────────────────────────────────────────────────────────────
function generateRoadNetwork(centerLat, centerLng, rand) {
  const networks = {};
  const latScale = 0.008;
  const lngScale = 0.012;

  // 8 radial arterials
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const arterialNames = ['N_Arterial', 'NE_Arterial', 'E_Arterial', 'SE_Arterial', 'S_Arterial', 'SW_Arterial', 'W_Arterial', 'NW_Arterial'];

  angles.forEach((angle, i) => {
    const rad = (angle * Math.PI) / 180;
    const points = [];
    const len = 12 + Math.floor(rand() * 8);
    const wobble = 0.0008;
    for (let j = 0; j < len; j++) {
      const t = j / (len - 1);
      const dist = t * (5 + rand() * 3);
      points.push([
        centerLat + dist * latScale * Math.cos(rad) + (rand() - 0.5) * wobble,
        centerLng + dist * lngScale * Math.sin(rad) + (rand() - 0.5) * wobble,
      ]);
    }
    networks[arterialNames[i]] = points;
  });

  // 2 ring roads (inner & outer)
  ['Inner_Ring', 'Outer_Ring'].forEach((name, ri) => {
    const radius = ri === 0 ? 1.5 : 3.5;
    const segments = 16;
    const points = [];
    for (let j = 0; j <= segments; j++) {
      const rad = (j / segments) * 2 * Math.PI;
      points.push([
        centerLat + radius * latScale * Math.cos(rad) + (rand() - 0.5) * 0.0005,
        centerLng + radius * lngScale * Math.sin(rad) + (rand() - 0.5) * 0.0005,
      ]);
    }
    networks[name] = points;
  });

  // 3 cross-city connectors
  ['Connector_A', 'Connector_B', 'Connector_C'].forEach((name, ci) => {
    const startAngle = ((ci * 60 + rand() * 40) * Math.PI) / 180;
    const endAngle = startAngle + Math.PI + (rand() - 0.5) * 0.8;
    const points = [];
    const steps = 10;
    for (let j = 0; j <= steps; j++) {
      const t = j / steps;
      const angle = startAngle + (endAngle - startAngle) * t;
      const r = 2 + rand() * 1.5;
      points.push([
        centerLat + r * latScale * Math.cos(angle),
        centerLng + r * lngScale * Math.sin(angle),
      ]);
    }
    networks[name] = points;
  });

  // CBD loop
  const cbdPoints = [];
  for (let j = 0; j <= 8; j++) {
    const rad = (j / 8) * 2 * Math.PI;
    cbdPoints.push([
      centerLat + 0.5 * latScale * Math.cos(rad),
      centerLng + 0.5 * lngScale * Math.sin(rad),
    ]);
  }
  networks['CBD_Loop'] = cbdPoints;

  return networks;
}

// ─────────────────────────────────────────────────────────────────────────────
// HOTSPOT GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const AREA_SUFFIXES = ['CBD', 'Industrial Zone', 'Residential Hub', 'Shopping District', 'Corridor', 'Interchange', 'Town Centre', 'Bypass'];
function generateHotspots(centerLat, centerLng, multiplier, cityName, rand) {
  const count = Math.floor(5 + rand() * 5);
  const hotspots = [];
  for (let i = 0; i < count; i++) {
    const angle = rand() * 2 * Math.PI;
    const dist = 0.5 + rand() * 3.5;
    const isHigh = rand() > 0.5;
    const tickets = Math.floor((80 + rand() * 280) * multiplier);
    const revenue = tickets * 1500;
    hotspots.push({
      id: i + 1,
      lat: centerLat + dist * 0.008 * Math.cos(angle),
      lng: centerLng + dist * 0.012 * Math.sin(angle),
      radius: Math.floor(800 + rand() * 1200),
      tickets,
      revenue: `R ${revenue.toLocaleString()}`,
      area: `${cityName} ${AREA_SUFFIXES[Math.floor(rand() * AREA_SUFFIXES.length)]}`,
      color: isHigh ? '#EF4444' : '#F59E0B',
      opacity: isHigh ? 0.10 + rand() * 0.04 : 0.07 + rand() * 0.03,
    });
  }
  return hotspots;
}

// ─────────────────────────────────────────────────────────────────────────────
// VEHICLE GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const VEHICLE_COLORS = ['#3B82F6','#EF4444','#6366F1','#F59E0B','#14B8A6','#10B981','#F97316','#8B5CF6','#EC4899','#06B6D4','#A855F7','#E11D48','#0EA5E9','#84CC16','#F43F5E'];
const FINE_TYPES = ['speeding', 'speeding', 'speeding', 'expired_disc', 'parking'];
const FINE_AMOUNTS = { speeding: [500, 750, 1000, 1500, 2000, 2500, 3000, 3500], expired_disc: [500, 700, 900, 1100], parking: [250, 350, 450, 600, 750] };

function randomPlate(province, rand) {
  const prefixes = PLATE_PREFIXES[province] || ['ZA'];
  const prefix = prefixes[Math.floor(rand() * prefixes.length)];
  const num = Math.floor(10 + rand() * 89);
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const l1 = letters[Math.floor(rand() * letters.length)];
  const l2 = letters[Math.floor(rand() * letters.length)];
  return `${prefix} ${num} ${l1}${l2}`;
}

function generateVehicles(roadNetworks, multiplier, province, rand) {
  const routeKeys = Object.keys(roadNetworks);
  const count = Math.floor(15 + multiplier * 12);
  const vehicles = [];

  for (let i = 0; i < count; i++) {
    const hasFine = rand() < 0.6;
    const fineType = hasFine ? FINE_TYPES[Math.floor(rand() * FINE_TYPES.length)] : null;
    const fineAmounts = fineType ? FINE_AMOUNTS[fineType] : null;
    const fineAmount = fineAmounts ? fineAmounts[Math.floor(rand() * fineAmounts.length)] : null;

    vehicles.push({
      id: i + 1,
      plate: randomPlate(province, rand),
      color: VEHICLE_COLORS[Math.floor(rand() * VEHICLE_COLORS.length)],
      route: routeKeys[Math.floor(rand() * routeKeys.length)],
      direction: rand() > 0.5 ? 1 : -1,
      speed: 0.00010 + rand() * 0.00035,
      fine: hasFine ? { type: fineType, amount: fineAmount } : null,
    });
  }

  // Police vehicles
  const policeCount = Math.floor(2 + multiplier * 2);
  for (let i = 0; i < policeCount; i++) {
    vehicles.push({
      id: `police-${i + 1}`,
      plate: `POLICE-${i + 1}`,
      route: routeKeys[Math.floor(rand() * routeKeys.length)],
      direction: rand() > 0.5 ? 1 : -1,
      speed: 0.00025 + rand() * 0.00020,
      isPolice: true,
      fine: null,
    });
  }

  return vehicles;
}

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVITY FEED GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
const ACTIVITY_TEMPLATES = [
  (plate, area) => ({ type: 'speeding', plate, location: `${area} N-Bound Freeway`, amount: Math.floor(Math.random() * 2500 + 500), color: 'red', time: '2m ago' }),
  (plate, area) => ({ type: 'expired_disc', plate, location: `${area} Main Road`, amount: Math.floor(Math.random() * 700 + 500), color: 'amber', time: '5m ago' }),
  (plate, area) => ({ type: 'parking', plate, location: `${area} CBD Precinct`, amount: Math.floor(Math.random() * 500 + 250), color: 'blue', time: '9m ago' }),
  (plate, area) => ({ type: 'speeding', plate, location: `${area} Bypass`, amount: Math.floor(Math.random() * 3000 + 1000), color: 'red', time: '14m ago' }),
  () => ({ type: 'roadblock', plate: '—', location: 'Intersection checkpoint active', amount: null, color: 'blue', time: '38m ago' }),
  (plate) => ({ type: 'payment', plate, location: `R 750 disc fine paid online`, amount: 750, color: 'emerald', time: '1h ago' }),
];

function generateActivityFeed(province, cityName, rand) {
  const platePrefix = (PLATE_PREFIXES[province] || ['ZA'])[0];
  const letters = 'ABCDEFGHJKLMNPRSTUVWXYZ';
  const makePlate = () => `${platePrefix} ${Math.floor(10 + rand() * 89)} ${letters[Math.floor(rand() * letters.length)]}${letters[Math.floor(rand() * letters.length)]}`;

  return ACTIVITY_TEMPLATES.map((tmpl, i) => ({
    id: i + 1,
    ...tmpl(makePlate(), cityName),
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HOOK — derives all simulation data from province + city
// ─────────────────────────────────────────────────────────────────────────────
export function useJurisdictionSimulation(province, cityName) {
  return useMemo(() => {
    const cityData = JURISDICTION_DB[province]?.cities[cityName];
    if (!cityData) return null;

    const seed = cityToSeed(`${province}:${cityName}`);
    const rand = seededRandom(seed);

    const { lat, lng, zoom, trafficMultiplier } = cityData;
    const center = [lat, lng];
    const roadNetworks = generateRoadNetwork(lat, lng, rand);
    const hotspots = generateHotspots(lat, lng, trafficMultiplier, cityName, rand);
    const vehicles = generateVehicles(roadNetworks, trafficMultiplier, province, rand);
    const activityFeed = generateActivityFeed(province, cityName, rand);

    const totalRevenue = hotspots.reduce((sum, h) => sum + parseInt(h.revenue.replace(/[^0-9]/g, '')), 0);
    const totalViolations = Math.floor(80 * trafficMultiplier + rand() * 100);
    const expiredDiscs = Math.floor(20 * trafficMultiplier + rand() * 30);

    return {
      center,
      zoom,
      roadNetworks,
      hotspots,
      vehicles: vehicles.filter(v => !v.isPolice),
      policeVehicles: vehicles.filter(v => v.isPolice),
      activityFeed,
      stats: { totalRevenue, totalViolations, expiredDiscs },
    };
  }, [province, cityName]);
}

// ─────────────────────────────────────────────────────────────────────────────
// CUSTOM ICONS
// ─────────────────────────────────────────────────────────────────────────────
const violationBadge = (amount) => new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap">R${amount}</div>`,
  iconSize: [40, 18], iconAnchor: [20, 30],
});

const expiredDiscBadge = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-white whitespace-nowrap">EXP DISC</div>`,
  iconSize: [50, 18], iconAnchor: [25, 30],
});

const roadblockIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-lg border-2 border-white">RB</div>`,
  iconSize: [32, 32], iconAnchor: [16, 16],
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
  iconSize: [35, 35], iconAnchor: [17, 17],
});

const policeIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 border-blue-300 animate-pulse" style="background:#1d4ed8">
    <svg viewBox="0 0 24 24" class="w-3.5 h-3.5 stroke-white fill-none" stroke-width="2.5"><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
  </div>`,
  iconSize: [28, 28], iconAnchor: [14, 14],
});

// ─────────────────────────────────────────────────────────────────────────────
// Pin icon for the location‑picking mode
// ─────────────────────────────────────────────────────────────────────────────
const pinIcon = new L.DivIcon({
  className: 'custom-marker',
  html: `<div class="relative">
    <div class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white animate-bounce">
      <svg viewBox="0 0 24 24" class="w-3 h-3 stroke-white fill-none" stroke-width="3">
        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
      </svg>
    </div>
    <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
  </div>`,
  iconSize: [20, 24],
  iconAnchor: [10, 24],
});

// ─────────────────────────────────────────────────────────────────────────────
// MAP CONTROLS COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const MapControls = ({ center, zoom }) => {
  const map = useMap();
  return (
    <div className="absolute bottom-16 md:bottom-4 right-3 z-[1000] flex flex-col gap-1.5">
      <button onClick={() => map.zoomIn()} className="w-9 h-9 bg-adm/95 backdrop-blur-sm border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg active:scale-95" title="Zoom in">
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <button onClick={() => map.zoomOut()} className="w-9 h-9 bg-adm/95 backdrop-blur-sm border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg active:scale-95" title="Zoom out">
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <div className="w-6 h-px bg-slate-700 mx-auto" />
      <button onClick={() => map.setView(center, zoom)} className="w-9 h-9 bg-adm/95 backdrop-blur-sm border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-all shadow-lg active:scale-95" title="Reset view">
        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="8 12 12 8 16 12"/><line x1="12" y1="8" x2="12" y2="16"/></svg>
      </button>
      <button onClick={() => map.setView(center, zoom + 2)} className="w-9 h-9 bg-adm/95 backdrop-blur-sm border border-slate-700 rounded-xl flex items-center justify-center text-slate-300 hover:bg-blue-900/30 hover:text-blue-400 hover:border-blue-500/30 transition-all shadow-lg active:scale-95" title="Go to jurisdiction">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7z"/></svg>
      </button>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// SET MAP VIEW (re-centres when jurisdiction changes)
// ─────────────────────────────────────────────────────────────────────────────
const SetMapView = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// SMOOTH MARKER COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const SmoothMarker = ({ vehicle, routePoints }) => {
  const markerRef = useRef(null);
  const fineRef = useRef(null);
  const stateRef = useRef({ segment: vehicle.direction === 1 ? 0 : routePoints.length - 2, progress: 0, dir: vehicle.direction });

  useEffect(() => {
    const totalSegments = routePoints.length - 1;
    const interval = setInterval(() => {
      const s = stateRef.current;
      s.progress += vehicle.speed;
      if (s.progress >= 1) {
        s.progress = 0;
        s.segment += s.dir;
        if (s.segment >= totalSegments) { s.segment = totalSegments - 1; s.dir = -1; }
        if (s.segment < 0) { s.segment = 0; s.dir = 1; }
      }
      const start = routePoints[s.segment];
      const nextIdx = Math.max(0, Math.min(s.segment + s.dir, totalSegments));
      const end = routePoints[nextIdx];
      if (!start || !end) return;
      const lat = start[0] + (end[0] - start[0]) * s.progress;
      const lng = start[1] + (end[1] - start[1]) * s.progress;
      if (markerRef.current) markerRef.current.setLatLng([lat, lng]);
      if (fineRef.current) fineRef.current.setLatLng([lat - 0.0008, lng]);
    }, 50);
    return () => clearInterval(interval);
  }, [routePoints, vehicle.speed]);

  const startPos = routePoints[vehicle.direction === 1 ? 0 : routePoints.length - 1] || routePoints[0];

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
      {vehicle.fine && (
        <Marker
          ref={fineRef}
          position={[startPos[0] - 0.0008, startPos[1]]}
          icon={vehicle.fine.type === 'expired_disc' ? expiredDiscBadge : violationBadge(vehicle.fine.amount)}
          interactive={false}
        />
      )}
    </>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Component that captures a single map click
// ─────────────────────────────────────────────────────────────────────────────
const MapClickPicker = ({ onPick }) => {
  useMapEvents({
    click(e) {
      onPick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

// ─────────────────────────────────────────────────────────────────────────────
// JURISDICTION UNAVAILABLE OVERLAY
// ─────────────────────────────────────────────────────────────────────────────
const JurisdictionLocked = ({ adminProvince, adminCity }) => (
  <div className="flex-1 flex items-center justify-center bg-slate-950">
    <div className="text-center max-w-xs px-6">
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-red-400 fill-none" strokeWidth="1.5">
          <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>
      <p className="text-slate-300 text-sm font-medium mb-1">Access Restricted</p>
      <p className="text-slate-500 text-xs leading-relaxed">
        You are only authorised to view traffic data for <span className="text-slate-400 font-medium">{adminCity}, {adminProvince}</span>. Contact your regional supervisor to request inter-provincial access.
      </p>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LIVE MAP COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
const LiveMap = () => {
  const { user } = useAuthStore();
  const jurisdiction = user?.jurisdiction;
  const effectiveProvince = jurisdiction?.province || 'Gauteng';
  const effectiveCity = jurisdiction?.city || 'Johannesburg';

  const [activeFilters, setActiveFilters] = useState({
    violations: true, expiredDiscs: true, roadblocks: true,
    hotspots: true, vehicles: true, revenue: true,
  });
  const [roadblocksList, setRoadblocksList] = useState([]);
  const [pickingActive, setPickingActive] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);
  const [pickFeedback, setPickFeedback] = useState(null);

  const sim = useJurisdictionSimulation(effectiveProvince, effectiveCity);

  useEffect(() => {
    if (!sim) return;
    const rand = seededRandom(cityToSeed(`rb:${effectiveProvince}:${effectiveCity}`));
    const initial = Array.from({ length: 2 }, (_, i) => {
      const angle = rand() * 2 * Math.PI;
      const dist = 0.5 + rand() * 2;
      return {
        id: i + 1,
        lat: sim.center[0] + dist * 0.008 * Math.cos(angle),
        lng: sim.center[1] + dist * 0.012 * Math.sin(angle),
        name: `${effectiveCity} Checkpoint ${i + 1}`,
        officers: Math.floor(3 + rand() * 4),
      };
    });
    setRoadblocksList(initial);
  }, [effectiveProvince, effectiveCity, sim]);

  const startPicking = useCallback(() => {
    setPickedLocation(null);
    setPickingActive(true);
    setPickFeedback(null);
  }, []);

  const cancelPicking = useCallback(() => {
    setPickingActive(false);
    setPickedLocation(null);
    setPickFeedback(null);
  }, []);

  const handleMapPick = useCallback((latlng) => {
    if (!pickingActive) return;
    const newRoadblock = {
      id: Date.now(),
      lat: latlng[0],
      lng: latlng[1],
      name: `${effectiveCity} Roadblock`,
      officers: 4,
    };
    setRoadblocksList(prev => [...prev, newRoadblock]);
    setPickedLocation(latlng);
    setPickFeedback('success');
    setPickingActive(false);
    setTimeout(() => setPickFeedback(null), 3000);
  }, [pickingActive, effectiveCity]);

  const toggleFilter = (key) => setActiveFilters(prev => ({ ...prev, [key]: !prev[key] }));

  const getDotColor = (color) => ({
    red: 'bg-red-500', amber: 'bg-amber-500', blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
  }[color] || 'bg-slate-500');

  if (!sim) {
    return (
      <AdminLayout>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-500 text-sm">No simulation data for this jurisdiction.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex h-full">
        <div className="flex-1 relative">
          <MapContainer
            center={sim.center}
            zoom={sim.zoom}
            zoomControl={false}
            className="h-full w-full z-0"
            style={{ background: '#0B1520', cursor: pickingActive ? 'crosshair' : undefined }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <SetMapView center={sim.center} zoom={sim.zoom} />
            <MapControls center={sim.center} zoom={sim.zoom} />

            {pickingActive && <MapClickPicker onPick={handleMapPick} />}

            {activeFilters.hotspots && sim.hotspots.map(h => (
              <div key={`hotspot-${h.id}`}>
                <Circle center={[h.lat, h.lng]} radius={h.radius * 1.5} pathOptions={{ color: 'transparent', fillColor: h.color, fillOpacity: 0.03, weight: 0, stroke: false }} interactive={false} />
                <Circle center={[h.lat, h.lng]} radius={h.radius} pathOptions={{ color: h.color, fillColor: h.color, fillOpacity: h.opacity, weight: 1.5, opacity: 0.7 }}>
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
              </div>
            ))}

            {activeFilters.vehicles && (
              <>
                {sim.vehicles.map(v => (
                  <SmoothMarker key={v.id} vehicle={v} routePoints={sim.roadNetworks[v.route] || sim.roadNetworks['CBD_Loop']} />
                ))}
                {sim.policeVehicles.map(v => (
                  <SmoothMarker key={v.id} vehicle={v} routePoints={sim.roadNetworks[v.route] || sim.roadNetworks['Inner_Ring']} />
                ))}
              </>
            )}

            {activeFilters.roadblocks && roadblocksList.map(rb => (
              <div key={rb.id}>
                <Marker position={[rb.lat, rb.lng]} icon={roadblockIcon}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-bold text-slate-900 mb-1">{rb.name}</p>
                      <p className="text-slate-600">{rb.officers} officers on site</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle center={[rb.lat, rb.lng]} radius={500} pathOptions={{ color: '#3B82F6', fillColor: '#3B82F6', fillOpacity: 0.1, weight: 2, dashArray: '10 5' }} />
              </div>
            ))}

            {/* Pin always visible after placement */}
            {pickedLocation && (
              <Marker position={pickedLocation} icon={pinIcon}>
                <Popup>
                  <div className="text-xs">
                    <p className="font-bold text-slate-900">New roadblock</p>
                    <p className="text-slate-500">
                      {pickedLocation[0].toFixed(5)}, {pickedLocation[1].toFixed(5)}
                    </p>
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>

          {pickingActive && (
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-[2000] bg-blue-600 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-3 animate-pulse">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              <span className="text-xs font-bold">Click on the map to place the roadblock</span>
              <button onClick={cancelPicking} className="ml-2 px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold hover:bg-white/30 transition-colors">
                Cancel
              </button>
            </div>
          )}

          {pickFeedback === 'success' && (
            <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[2000] bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-xs font-bold">Roadblock placed successfully!</span>
            </div>
          )}

          <div className="hidden md:block absolute top-3 left-3 z-[1000] space-y-2">
            {[
              { key: 'violations', label: 'Active violations', value: sim.stats.totalViolations, color: 'red', textColor: 'text-red-400', border: 'border-red-500/30' },
              { key: 'expiredDiscs', label: 'Expired discs', value: sim.stats.expiredDiscs, color: 'amber', textColor: 'text-amber-400', border: 'border-amber-500/30' },
              { key: 'roadblocks', label: 'Roadblocks active', value: roadblocksList.length, color: 'blue', textColor: 'text-blue-400', border: 'border-blue-500/30' },
              { key: 'revenue', label: 'Hotspot revenue', value: `R ${(sim.stats.totalRevenue / 1000000).toFixed(1)}M`, color: 'red', textColor: 'text-red-400', border: 'border-red-500/30' },
            ].map(stat => (
              <button key={stat.key} onClick={() => toggleFilter(stat.key)}
                className={`block text-left bg-adm/95 backdrop-blur-sm border rounded-lg px-3 py-2 transition-all w-full cursor-pointer ${activeFilters[stat.key] ? `${stat.border} hover:opacity-90` : 'border-slate-800 opacity-50 hover:opacity-75'}`}>
                <div className={`text-lg font-bold ${stat.textColor}`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{stat.value}</div>
                <div className="text-[9px] text-slate-500">{stat.label}</div>
              </button>
            ))}
            <div className="bg-adm/95 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2">
              <div className="text-[9px] text-slate-600 mb-0.5">Jurisdiction</div>
              <div className="text-[10px] font-medium text-slate-400">{effectiveCity}</div>
              <div className="text-[9px] text-slate-600">{effectiveProvince}</div>
            </div>
          </div>

          <div className="absolute top-3 right-3 z-[1000] flex gap-1.5 flex-wrap">
            {[
              { key: 'violations', label: 'Violations', color: 'red' },
              { key: 'expiredDiscs', label: 'Expired', color: 'amber' },
              { key: 'roadblocks', label: 'Roadblocks', color: 'blue' },
              { key: 'hotspots', label: 'Hotspots', color: 'red' },
              { key: 'vehicles', label: 'Vehicles', color: 'emerald' },
            ].map(f => {
              const { bg, border, text } = FILTER_COLORS[f.color] || FILTER_COLORS.red;
              return (
                <button key={f.key} onClick={() => toggleFilter(f.key)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-medium border transition-colors cursor-pointer ${
                    activeFilters[f.key]
                      ? `${bg} ${border} ${text}`
                      : 'bg-adm/90 border-slate-700 text-slate-500 opacity-50 hover:opacity-75'
                  }`}>
                  <span className={`w-1.5 h-1.5 bg-${f.color}-400 rounded-full inline-block mr-1.5`} />{f.label}
                </button>
              );
            })}
          </div>

          <div className="hidden md:block absolute bottom-4 left-3 z-[1000] bg-adm/90 backdrop-blur-sm border border-slate-800 rounded-lg px-3 py-2 text-[10px] text-slate-500">
            <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 bg-red-400 rounded-full" /> High revenue hotspot</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-3 h-3 bg-amber-400 rounded-full" /> Medium revenue hotspot</div>
            <div className="flex items-center gap-2 mb-1"><div className="w-2 h-2 bg-blue-400 rounded-full" /> Roadblock</div>
            <div className="flex items-center gap-2"><div className="w-2 h-2 bg-emerald-400 rounded-full" /> Active vehicle</div>
          </div>
        </div>

        <div className="hidden lg:flex w-60 bg-adm2 border-l border-slate-800 flex-col shrink-0">
          <div className="p-3 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-400">Recent activity</span>
            <span className="bg-emerald-500/10 text-emerald-400 rounded-md px-1.5 py-0.5 text-[10px] font-semibold">{sim.activityFeed.length}</span>
          </div>
          <div className="px-3 py-2 border-b border-slate-800/50 bg-slate-900/30">
            <div className="text-[9px] text-slate-600">Viewing: <span className="text-slate-500 font-medium">{effectiveCity}, {effectiveProvince}</span></div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {sim.activityFeed.map((activity) => (
              <div key={activity.id} className="p-2.5 rounded-lg bg-white/[0.02] border border-slate-800 hover:bg-white/[0.04] transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(activity.color)}`} />
                  <span className="text-[10px] font-medium text-slate-300 capitalize">{activity.type.replace('_', ' ')}</span>
                  <span className="text-[9px] text-slate-600 ml-auto">{activity.time}</span>
                </div>
                <div className="space-y-0.5">
                  <div className="flex justify-between text-[9px]"><span className="text-slate-500">Plate</span><span className="text-slate-400 font-mono">{activity.plate}</span></div>
                  <div className="text-[9px] text-slate-500 truncate">{activity.location}</div>
                  {activity.amount && <div className="flex justify-between text-[9px] mt-0.5"><span className="text-slate-500">Amount</span><span className="text-red-400 font-medium">R {activity.amount.toLocaleString()}</span></div>}
                </div>
              </div>
            ))}
          </div>
          <div className="p-2 border-t border-slate-800">
            <button
              onClick={startPicking}
              disabled={pickingActive}
              className={`w-full py-2 rounded-md text-[11px] font-semibold transition-colors ${
                pickingActive
                  ? 'bg-blue-900 text-blue-300 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {pickingActive ? 'Click map to place...' : 'Plan roadblock'}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default LiveMap;