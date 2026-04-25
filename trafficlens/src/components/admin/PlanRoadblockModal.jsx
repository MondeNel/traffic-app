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

const roadTypes = [
  'National Highway (N-Route)',
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
    roadType: 'Metropolitan Route (M-Route)',
    location: '',
    date: new Date().toISOString().split('T')[0],
    startTime: '08:00',
    endTime: '16:00',
    officers: 4,
    reason: 'routine_check',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
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

  const getStepLabel = () => {
    if (isComplete) return 'Roadblock Scheduled';
    if (isSubmitting) return 'Submitting...';
    if (step === 1) return 'Location Details';
    if (step === 2) return 'Resources & Timing';
    return 'Review & Confirm';
  };

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
              {getStepLabel()}
            </h2>
            {!isSubmitting && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
          {!isComplete && (
            <div className="flex items-center gap-2 mt-3">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    step >= s ? 'bg-white text-blue-800' : 'bg-white/20 text-white'
                  }`}>{s}</div>
                  {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? 'bg-white' : 'bg-white/20'}`} />}
                </div>
              ))}
            </div>
          )}
        </div>

        {isComplete ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-blue-400 fill-none" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Roadblock Scheduled!</h3>
            <p className="text-sm text-slate-400 mb-4">
              Officers will be deployed to the designated location. Notifications have been sent to all units in the area.
            </p>
            <div className="bg-slate-800 rounded-xl p-4 text-left mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Location</span>
                <span className="text-slate-300 font-medium">{formData.location}, {formData.city}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-300">{new Date(formData.date).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Time</span>
                <span className="text-slate-300">{formData.startTime} — {formData.endTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Officers</span>
                <span className="text-blue-400 font-bold">{formData.officers}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Reference</span>
                <span className="font-mono text-blue-400">RB-{Date.now().toString(36).toUpperCase()}</span>
              </div>
            </div>
            <button onClick={onClose} className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">
              Done
            </button>
          </div>
        ) : isSubmitting ? (
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-blue-400 fill-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <p className="text-sm font-semibold text-slate-300">Scheduling roadblock...</p>
            <p className="text-xs text-slate-500">Notifying units and updating dispatch</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500">Step 1 of 3: Select location and road type</p>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Roadblock Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange}
                placeholder="N1 & William Nicol Interchange"
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Province</label>
                <select name="province" value={formData.province} onChange={(e) => { setFormData({ ...formData, province: e.target.value, city: citiesByProvince[e.target.value]?.[0] || '' }); }}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {provinces.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">City / Town</label>
                <select name="city" value={formData.city} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  {(citiesByProvince[formData.province] || []).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Road Type</label>
              <select name="roadType" value={formData.roadType} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                {roadTypes.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Specific Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange}
                placeholder="Corner of William Nicol Drive and N1 off-ramp"
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Reason</label>
              <select name="reason" value={formData.reason} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="routine_check">Routine License & Vehicle Check</option>
                <option value="high_crime">High Crime Area Patrol</option>
                <option value="intelligence">Intelligence-Led Operation</option>
                <option value="festive_season">Festive Season Operation</option>
                <option value="taxi_enforcement">Taxi Enforcement</option>
                <option value="alcohol_testing">Alcohol & Drug Testing</option>
              </select>
            </div>

            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500 transition-colors">
              Continue
            </button>
          </form>
        ) : step === 2 ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500">Step 2 of 3: Set date, time & resources</p>
            
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Start Time</label>
                <input type="time" name="startTime" value={formData.startTime} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">End Time</label>
                <input type="time" name="endTime" value={formData.endTime} onChange={handleChange}
                  className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Number of Officers</label>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setFormData({ ...formData, officers: Math.max(1, formData.officers - 1) })}
                  className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 text-lg">−</button>
                <span className="text-2xl font-bold text-white w-12 text-center" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formData.officers}</span>
                <button type="button" onClick={() => setFormData({ ...formData, officers: Math.min(20, formData.officers + 1) })}
                  className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-700 text-lg">+</button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Additional Notes</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={3}
                placeholder="Any special instructions or equipment needed..."
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 py-3 bg-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-700">
                Back
              </button>
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">
                Review
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500">Step 3 of 3: Review and confirm</p>
            
            <div className="bg-slate-800 rounded-xl p-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-200">{formData.name || 'Untitled Roadblock'}</h3>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-slate-500 text-[10px] uppercase">Province</p>
                  <p className="text-slate-300">{formData.province}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase">City</p>
                  <p className="text-slate-300">{formData.city}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase">Date</p>
                  <p className="text-slate-300">{new Date(formData.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase">Time</p>
                  <p className="text-slate-300">{formData.startTime} — {formData.endTime}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-500 text-[10px] uppercase">Location</p>
                  <p className="text-slate-300">{formData.location}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase">Road Type</p>
                  <p className="text-slate-300">{formData.roadType}</p>
                </div>
                <div>
                  <p className="text-slate-500 text-[10px] uppercase">Reason</p>
                  <p className="text-slate-300 capitalize">{formData.reason.replace(/_/g, ' ')}</p>
                </div>
              </div>

              <div className="bg-slate-700 rounded-lg p-3 flex items-center justify-between">
                <span className="text-slate-400 text-sm">Officers assigned</span>
                <span className="text-2xl font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formData.officers}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 py-3 bg-slate-800 text-slate-400 rounded-xl text-sm font-bold hover:bg-slate-700">
                Back
              </button>
              <button type="submit" className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-500">
                Schedule Roadblock
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default PlanRoadblockModal;