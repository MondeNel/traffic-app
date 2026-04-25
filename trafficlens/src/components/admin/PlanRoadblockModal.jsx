import { useState } from 'react';
import { motion } from 'framer-motion';

const provinces = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
  'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
];

const citiesByProvince = {
  'Gauteng': ['Johannesburg', 'Pretoria', 'Sandton', 'Soweto', 'Midrand', 'Rosebank', 'Randburg', 'Fourways'],
  'Western Cape': ['Cape Town', 'Stellenbosch', 'Paarl', 'Worcester', 'George', 'Knysna'],
  'KwaZulu-Natal': ['Durban', 'Pietermaritzburg', 'Richards Bay', 'Newcastle', 'Ladysmith'],
  'Eastern Cape': ['Gqeberha', 'East London', 'Grahamstown', 'Mthatha'],
  'Free State': ['Bloemfontein', 'Welkom', 'Bethlehem', 'Kroonstad'],
  'Limpopo': ['Polokwane', 'Tzaneen', 'Mokopane', 'Thohoyandou'],
  'Mpumalanga': ['Mbombela', 'Witbank', 'Secunda', 'Ermelo'],
  'Northern Cape': ['Kimberley', 'Upington', 'Springbok'],
  'North West': ['Mahikeng', 'Rustenburg', 'Potchefstroom', 'Klerksdorp']
};

// Predefined locations with coordinates for each city
const locationsByCity = {
  'Johannesburg': [
    { name: 'N1 & William Nicol Interchange', road: 'N1/M81', type: 'Highway Interchange', risk: 'High', tickets: 45 },
    { name: 'M1 & Empire Road', road: 'M1/M16', type: 'Highway Interchange', risk: 'High', tickets: 38 },
    { name: 'N12 & Vereeniging Road', road: 'N12/R59', type: 'Highway Interchange', risk: 'Medium', tickets: 22 },
    { name: 'N3 & Marlboro Drive', road: 'N3/M60', type: 'Highway Interchange', risk: 'High', tickets: 41 },
    { name: 'R24 & Barbara Road', road: 'R24', type: 'Provincial Road', risk: 'Medium', tickets: 18 },
    { name: 'Beyers Naudé & N1', road: 'M5/N1', type: 'Highway Interchange', risk: 'High', tickets: 33 },
  ],
  'Pretoria': [
    { name: 'N1 & N4 Interchange', road: 'N1/N4', type: 'Highway Interchange', risk: 'High', tickets: 40 },
    { name: 'N1 & Atterbury Road', road: 'N1/M11', type: 'Highway Interchange', risk: 'High', tickets: 35 },
    { name: 'N4 & Simon Vermooten', road: 'N4', type: 'Provincial Road', risk: 'Medium', tickets: 20 },
    { name: 'M7 & M10 Lynnwood', road: 'M7/M10', type: 'Metropolitan Route', risk: 'Medium', tickets: 15 },
  ],
  'Sandton': [
    { name: 'M1 & Grayston Drive', road: 'M1/M40', type: 'Highway Interchange', risk: 'High', tickets: 42 },
    { name: 'Rivonia Road & 5th Street', road: 'M9', type: 'CBD Main Road', risk: 'High', tickets: 28 },
    { name: 'M1 & Corlett Drive', road: 'M1/M30', type: 'Highway Interchange', risk: 'Medium', tickets: 19 },
    { name: 'Sandton Drive & William Nicol', road: 'M75', type: 'CBD Main Road', risk: 'High', tickets: 31 },
  ],
  'Soweto': [
    { name: 'N12 & Golden Highway', road: 'N12/R553', type: 'Highway Interchange', risk: 'Medium', tickets: 16 },
    { name: 'Moroka Nancefield Road', road: 'M68', type: 'CBD Main Road', risk: 'Medium', tickets: 12 },
  ],
  'Midrand': [
    { name: 'N1 & Olifantsfontein Road', road: 'N1/R562', type: 'Highway Interchange', risk: 'High', tickets: 36 },
    { name: 'N1 & Allandale Road', road: 'N1/M39', type: 'Highway Interchange', risk: 'High', tickets: 29 },
  ],
  'Rosebank': [
    { name: 'Oxford Road & Jellicoe', road: 'M81', type: 'CBD Main Road', risk: 'High', tickets: 25 },
    { name: 'Jan Smuts Avenue & Bolton', road: 'M27', type: 'CBD Main Road', risk: 'Medium', tickets: 14 },
  ],
  'Randburg': [
    { name: 'N1 & Malibongwe Drive', road: 'N1/M5', type: 'Highway Interchange', risk: 'High', tickets: 32 },
    { name: 'Beyers Naudé & N1', road: 'M5/N1', type: 'Highway Interchange', risk: 'High', tickets: 27 },
  ],
  'Fourways': [
    { name: 'N1 & William Nicol (Fourways)', road: 'N1/M81', type: 'Highway Interchange', risk: 'High', tickets: 34 },
    { name: 'Cedar Road & Witkoppen', road: 'M39', type: 'Metropolitan Route', risk: 'Medium', tickets: 17 },
  ],
  'Cape Town': [
    { name: 'N1 & N2 Interchange', road: 'N1/N2', type: 'Highway Interchange', risk: 'High', tickets: 44 },
    { name: 'N2 & M5 Koeberg', road: 'N2/M5', type: 'Highway Interchange', risk: 'High', tickets: 30 },
    { name: 'Strand Street & Adderley', road: 'M62', type: 'CBD Main Road', risk: 'High', tickets: 22 },
  ],
};

const roadTypes = [
  'Highway Interchange (N-Route)',
  'Provincial Road (R-Route)',
  'Metropolitan Route (M-Route)',
  'CBD Main Road',
  'Residential Street',
  'Industrial Area',
  'Shopping Mall Access'
];

const PlanRoadblockModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    province: 'Gauteng',
    city: 'Johannesburg',
    locationId: null,
    roadType: '',
    specificLocation: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '16:00',
    officers: 4,
    reason: 'routine_check',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const availableLocations = locationsByCity[formData.city] || [];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (location) => {
    setFormData({
      ...formData,
      locationId: location.name,
      name: location.name,
      roadType: location.type,
      specificLocation: `${location.road} — ${location.name}`
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!formData.locationId) return; // Require location selection
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
        if (onSubmit) onSubmit(formData);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  const selectedLocation = availableLocations.find(l => l.name === formData.locationId);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={isSubmitting ? undefined : onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 p-5 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isComplete ? 'Roadblock Scheduled' : isSubmitting ? 'Submitting...' : step === 1 ? 'Select Location' : step === 2 ? 'Suggested Positions' : 'Review & Confirm'}
            </h2>
            {!isSubmitting && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
          {!isComplete && (
            <div className="flex items-center gap-2 mt-3">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-white text-blue-800' : 'bg-white/20 text-white'}`}>{s}</div>
                  {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-white' : 'bg-white/20'}`} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {isComplete ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue-400 fill-none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Roadblock Scheduled!</h3>
            <p className="text-sm text-slate-400 mb-4">Officers deployed to {formData.name}. Notifications sent to all units.</p>
            <div className="bg-slate-800 rounded-xl p-4 text-left mb-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Location</span><span className="text-slate-300 font-medium">{formData.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Date</span><span className="text-slate-300">{new Date(formData.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'short' })}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Time</span><span className="text-slate-300">{formData.startTime} — {formData.endTime}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Officers</span><span className="text-blue-400 font-bold">{formData.officers}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Reference</span><span className="font-mono text-blue-400">RB-{Date.now().toString(36).toUpperCase()}</span></div>
            </div>
            <button onClick={onClose} className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">Done</button>
          </div>
        ) : isSubmitting ? (
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue-400 fill-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <p className="text-sm font-semibold text-slate-300">Scheduling roadblock...</p>
            <p className="text-xs text-slate-500">Notifying units and updating dispatch</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500">Step 1 of 3: Select city and location</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Province</label>
                <select name="province" value={formData.province} onChange={(e) => { 
                  const newProvince = e.target.value;
                  const firstCity = citiesByProvince[newProvince]?.[0] || '';
                  setFormData({ ...formData, province: newProvince, city: firstCity, locationId: null, name: '', roadType: '', specificLocation: '' }); 
                }} className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">City / Town</label>
                <select name="city" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value, locationId: null, name: '', roadType: '', specificLocation: '' })}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {(citiesByProvince[formData.province] || []).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {/* Location Selection Cards */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                {availableLocations.length > 0 ? 'Select a location' : 'No predefined locations for this city'}
              </label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {availableLocations.map((location) => (
                  <div
                    key={location.name}
                    onClick={() => handleLocationSelect(location)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      formData.locationId === location.name
                        ? 'border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/10'
                        : 'border-slate-700 bg-slate-800 hover:border-slate-600 hover:bg-slate-800/80'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-200">{location.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        location.risk === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {location.risk} Risk
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] text-slate-400">
                      <span>{location.road}</span>
                      <span>{location.type}</span>
                      <span className="text-blue-400">{location.tickets} avg tickets/month</span>
                    </div>
                    {formData.locationId === location.name && (
                      <div className="mt-2 flex items-center gap-1 text-blue-400 text-[10px] font-medium">
                        <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                        Selected — will show best positions next
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {availableLocations.length === 0 && (
                <div className="p-4 bg-slate-800 rounded-lg text-center text-slate-500 text-xs">
                  No hotspots available for this city yet. Try Johannesburg or Sandton.
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={!formData.locationId}
              className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
              Continue to Suggested Positions
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500">Step 2 of 3: Best positions for {formData.name}</p>
            
            {/* Location Summary */}
            {selectedLocation && (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <h3 className="text-sm font-bold text-blue-300">{selectedLocation.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedLocation.road} · {selectedLocation.type} · {selectedLocation.tickets} avg tickets/month</p>
              </div>
            )}

            {/* Suggested Positions */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Suggested Blocking Positions</label>
              <div className="space-y-2">
                {[
                  { pos: 'A', name: 'Southbound off-ramp', desc: 'Best visibility, catches vehicles exiting highway', score: '95%' },
                  { pos: 'B', name: 'Northbound on-ramp', desc: 'High traffic flow during peak hours', score: '88%' },
                  { pos: 'C', name: 'Service road parallel', desc: 'Alternative route — catches drivers avoiding main block', score: '72%' },
                ].map((pos) => (
                  <div key={pos.pos} className="p-3 bg-slate-800 rounded-lg border border-slate-700 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">{pos.pos}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-200">{pos.name}</span>
                        <span className="text-[10px] font-bold text-emerald-400">{pos.score} effective</span>
                      </div>
                      <p className="text-[10px] text-slate-500 mt-0.5">{pos.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Officer Count */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Officers to Deploy</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setFormData({ ...formData, officers: Math.max(1, formData.officers - 1) })}
                  className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 text-lg">−</button>
                <span className="text-2xl font-bold text-white w-12 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formData.officers}</span>
                <button type="button" onClick={() => setFormData({ ...formData, officers: Math.min(20, formData.officers + 1) })}
                  className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 text-lg">+</button>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 bg-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-700">Back</button>
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">Review</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500">Step 3 of 3: Review and confirm</p>
            
            <div className="bg-slate-800 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-200">{formData.name || 'Untitled Roadblock'}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div><p className="text-slate-500 text-[10px] uppercase">Province</p><p className="text-slate-300">{formData.province}</p></div>
                <div><p className="text-slate-500 text-[10px] uppercase">City</p><p className="text-slate-300">{formData.city}</p></div>
                <div><p className="text-slate-500 text-[10px] uppercase">Date</p><p className="text-slate-300">{new Date(formData.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</p></div>
                <div><p className="text-slate-500 text-[10px] uppercase">Time</p><p className="text-slate-300">{formData.startTime} — {formData.endTime}</p></div>
                <div className="col-span-2"><p className="text-slate-500 text-[10px] uppercase">Location</p><p className="text-slate-300">{formData.specificLocation}</p></div>
                <div><p className="text-slate-500 text-[10px] uppercase">Road Type</p><p className="text-slate-300">{formData.roadType}</p></div>
                <div><p className="text-slate-500 text-[10px] uppercase">Reason</p><p className="text-slate-300 capitalize">{formData.reason.replace(/_/g, ' ')}</p></div>
              </div>
              <div className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
                <span className="text-slate-400 text-sm">Officers assigned</span>
                <span className="text-2xl font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formData.officers}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 bg-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-700">Back</button>
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">Schedule Roadblock</button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default PlanRoadblockModal;