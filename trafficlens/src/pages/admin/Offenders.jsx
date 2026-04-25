import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

// Warrant Modal
const WarrantModal = ({ isOpen, onClose, offender }) => {
  const [reason, setReason] = useState('');
  const [priority, setPriority] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsComplete(true);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={isSubmitting ? undefined : onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        
        <div className="bg-gradient-to-r from-red-800 to-red-900 p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isComplete ? 'Warrant Issued' : 'Issue Warrant'}
            </h2>
            {!isSubmitting && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
        </div>

        {isComplete ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-red-400 fill-none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-2">Warrant Issued!</h3>
            <p className="text-sm text-slate-400 mb-4">Warrant for {offender?.name} has been issued and dispatched to all units.</p>
            <div className="bg-slate-800 rounded-xl p-4 text-left mb-4 space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Subject</span><span className="text-slate-300 font-medium">{offender?.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Plates</span><span className="text-slate-300 font-mono">{offender?.plates?.join(', ')}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Priority</span><span className="text-red-400 font-bold uppercase">{priority}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">Reference</span><span className="font-mono text-red-400">WRNT-{Date.now().toString(36).toUpperCase()}</span></div>
            </div>
            <button onClick={onClose} className="w-full py-2.5 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-500">Done</button>
          </div>
        ) : isSubmitting ? (
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin" />
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-red-400 fill-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <p className="text-sm font-semibold text-slate-300">Issuing warrant...</p>
            <p className="text-xs text-slate-500">Notifying all units in {offender?.area}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[8px] font-bold text-slate-400">{offender?.initials}</div>
                <span className="text-sm font-bold text-slate-200">{offender?.name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <span className="text-slate-500">Fines: <span className="text-red-400">R {offender?.fines?.toLocaleString()}</span></span>
                <span className="text-slate-500">Violations: <span className="text-red-400">{offender?.violations}</span></span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Reason for Warrant</label>
              <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows={3}
                placeholder="Outstanding fines, failure to appear, etc..."
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" required />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Priority Level</label>
              <div className="flex gap-2">
                {['standard', 'high', 'urgent'].map(p => (
                  <button key={p} type="button" onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-colors capitalize ${
                      priority === p 
                        ? p === 'urgent' ? 'bg-red-500/20 border-red-500/30 text-red-400' :
                          p === 'high' ? 'bg-amber-500/20 border-amber-500/30 text-amber-400' :
                          'bg-blue-500/20 border-blue-500/30 text-blue-400'
                        : 'bg-slate-800 border-slate-700 text-slate-500'
                    }`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-red-600 text-white rounded-xl text-sm font-bold hover:bg-red-500 transition-colors">
              Issue Warrant
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

// Full Report Modal
const FullReportModal = ({ isOpen, onClose, offender }) => {
  if (!isOpen || !offender) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="relative bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto">
        
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-5 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-slate-400">{offender.initials}</div>
              <div>
                <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{offender.name}</h2>
                <p className="text-xs text-slate-400">{offender.address}</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* Risk & Status */}
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
              offender.level === 'HIGH' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
              offender.level === 'MED' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              {offender.level} Risk
            </span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${
              offender.licenseStatus === 'Valid' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
            }`}>
              License: {offender.licenseStatus}
            </span>
            {offender.warrants > 0 && (
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                {offender.warrants} Warrant{offender.warrants > 1 ? 's' : ''}
              </span>
            )}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R {offender.fines.toLocaleString()}</div>
              <div className="text-[9px] text-slate-500">Total Fines</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{offender.violations}</div>
              <div className="text-[9px] text-slate-500">Violations</div>
            </div>
            <div className="bg-slate-800 rounded-xl p-3 text-center">
              <div className="text-xl font-bold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{offender.plates.length}</div>
              <div className="text-[9px] text-slate-500">Vehicles</div>
            </div>
          </div>

          {/* Vehicle Details */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Registered Vehicles</h3>
            <div className="space-y-2">
              {offender.plates.map((plate, i) => (
                <div key={i} className="bg-slate-800 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-blue-500/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-blue-400 fill-none" strokeWidth="2"><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></svg>
                    </div>
                    <span className="text-sm font-mono text-slate-300">{plate}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">Last seen: {offender.seen}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Violation History */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Violation History</h3>
            <div className="space-y-2">
              {[
                { desc: offender.lastViolation, date: 'Recent', amount: Math.round(offender.fines / offender.violations) },
                { desc: 'Expired license disc — GP 14 KW', date: '2 weeks ago', amount: 750 },
                { desc: 'Illegal parking — Sandton CBD', date: '1 month ago', amount: 600 },
              ].slice(0, offender.violations).map((v, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-800 rounded-lg p-2.5">
                  <div>
                    <p className="text-[10px] text-slate-300">{v.desc}</p>
                    <p className="text-[9px] text-slate-600">{v.date}</p>
                  </div>
                  <span className="text-[10px] font-bold text-red-400">R {v.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Area Activity */}
          <div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Area Activity</h3>
            <div className="bg-slate-800 rounded-xl p-3">
              <div className="flex items-center gap-2 text-[10px]">
                <div className="w-2 h-2 bg-red-400 rounded-full" />
                <span className="text-slate-400">Frequently seen in <span className="text-slate-300">{offender.area}</span></span>
              </div>
              <div className="flex items-center gap-2 text-[10px] mt-1.5">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <span className="text-slate-400">Last active: <span className="text-slate-300">{offender.seen}</span></span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Main Offenders Component
const Offenders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('fines');
  const [filterLevel, setFilterLevel] = useState('all');
  const [selectedOffender, setSelectedOffender] = useState(null);
  const [showWarrant, setShowWarrant] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [warrantOffender, setWarrantOffender] = useState(null);
  const [reportOffender, setReportOffender] = useState(null);

  const offenders = [
    { id: 1, name: 'T. Molefe', initials: 'TM', fines: 4200, plates: ['GP 14 KW', 'GP 19 MP'], area: 'Rosebank', seen: '2h ago', level: 'HIGH', violations: 7, lastViolation: 'Speeding 92km/h in 60 zone', address: 'Sandton, Johannesburg', licenseStatus: 'Valid', warrants: 1 },
    { id: 2, name: 'N. Khumalo', initials: 'NK', fines: 3750, plates: ['GP 82 TT'], area: 'Sandton', seen: '5h ago', level: 'HIGH', violations: 5, lastViolation: 'Expired license disc', address: 'Alexandra, Johannesburg', licenseStatus: 'Valid', warrants: 0 },
    { id: 3, name: 'P. van der Berg', initials: 'PV', fines: 2100, plates: ['WC 31 PP'], area: 'Fourways', seen: '1d ago', level: 'MED', violations: 4, lastViolation: 'Expired disc detected', address: 'Fourways, Johannesburg', licenseStatus: 'Valid', warrants: 0 },
    { id: 4, name: 'S. Mthembu', initials: 'SM', fines: 1800, plates: ['GP 44 LZ'], area: 'Randburg', seen: '3h ago', level: 'MED', violations: 3, lastViolation: 'Illegal parking', address: 'Randburg, Johannesburg', licenseStatus: 'Valid', warrants: 0 },
    { id: 5, name: 'A. Botha', initials: 'AB', fines: 1350, plates: ['GP 09 RR'], area: 'Midrand', seen: '6h ago', level: 'MED', violations: 3, lastViolation: 'Red light violation', address: 'Midrand, Johannesburg', licenseStatus: 'Valid', warrants: 0 },
    { id: 6, name: 'G. Petersen', initials: 'GP', fines: 1200, plates: ['GP 55 ZN'], area: 'Fourways', seen: '1d ago', level: 'LOW', violations: 2, lastViolation: 'Expired disc', address: 'Fourways, Johannesburg', licenseStatus: 'Expired', warrants: 0 },
    { id: 7, name: 'L. van Wyk', initials: 'LV', fines: 950, plates: ['GP 33 LS'], area: 'Bryanston', seen: '2d ago', level: 'LOW', violations: 2, lastViolation: 'Parking violation', address: 'Bryanston, Johannesburg', licenseStatus: 'Valid', warrants: 0 },
    { id: 8, name: 'M. Ndlovu', initials: 'MN', fines: 850, plates: ['GP 88 WJ'], area: 'Soweto', seen: '3d ago', level: 'LOW', violations: 1, lastViolation: 'Speeding 72km/h in 60 zone', address: 'Soweto, Johannesburg', licenseStatus: 'Valid', warrants: 0 },
  ];

  const filteredOffenders = offenders
    .filter(o => filterLevel === 'all' || o.level === filterLevel)
    .filter(o => !searchQuery || 
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.plates.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
      o.area.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'fines') return b.fines - a.fines;
      if (sortBy === 'violations') return b.violations - a.violations;
      if (sortBy === 'recent') return a.seen.localeCompare(b.seen);
      return 0;
    });

  const getLevelBadge = (level) => {
    switch (level) {
      case 'HIGH': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'MED': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'LOW': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const totalFines = offenders.reduce((sum, o) => sum + o.fines, 0);
  const highRisk = offenders.filter(o => o.level === 'HIGH').length;
  const totalWarrants = offenders.filter(o => o.warrants > 0).length;

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Offender database</h1>
            <p className="text-[10px] text-slate-600 mt-0.5">{offenders.length} registered · {highRisk} high risk · R {totalFines.toLocaleString()} total fines</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3"><div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{highRisk}</div><div className="text-[9px] text-slate-500">High risk</div></div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3"><div className="text-lg font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R {totalFines.toLocaleString()}</div><div className="text-[9px] text-slate-500">Total fines</div></div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3"><div className="text-lg font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{totalWarrants}</div><div className="text-[9px] text-slate-500">Active warrants</div></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-500 fill-none absolute left-3 top-1/2 -translate-y-1/2" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by name, plate, or area..."
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="flex gap-1.5">
            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300"><option value="all">All Levels</option><option value="HIGH">High Risk</option><option value="MED">Medium Risk</option><option value="LOW">Low Risk</option></select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300"><option value="fines">Sort by Fines</option><option value="violations">Sort by Violations</option><option value="recent">Sort by Recent</option></select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredOffenders.map((offender) => (
            <motion.div key={offender.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedOffender(selectedOffender?.id === offender.id ? null : offender)}
              className={`bg-white/[0.02] border rounded-xl p-4 cursor-pointer transition-all ${selectedOffender?.id === offender.id ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">{offender.initials}</div>
                  <div><h3 className="text-sm font-bold text-slate-200">{offender.name}</h3><p className="text-[10px] text-slate-500">{offender.area} · Seen {offender.seen}</p></div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${getLevelBadge(offender.level)}`}>{offender.level}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">Fines</p><p className="text-xs font-bold text-red-400">R {offender.fines.toLocaleString()}</p></div>
                <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">Violations</p><p className="text-xs font-bold text-slate-300">{offender.violations}</p></div>
                <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">Plates</p><p className="text-xs font-mono text-slate-400">{offender.plates.join(', ')}</p></div>
              </div>
              {selectedOffender?.id === offender.id && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-t border-slate-800 pt-3 space-y-2">
                  <div className="grid grid-cols-2 gap-3">
                    <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">Last Violation</p><p className="text-[10px] text-slate-400">{offender.lastViolation}</p></div>
                    <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">License</p><p className={`text-[10px] font-bold ${offender.licenseStatus === 'Valid' ? 'text-emerald-400' : 'text-red-400'}`}>{offender.licenseStatus}</p></div>
                    <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">Address</p><p className="text-[10px] text-slate-400">{offender.address}</p></div>
                    <div><p className="text-[8px] text-slate-500 uppercase tracking-wider">Warrants</p><p className={`text-[10px] font-bold ${offender.warrants > 0 ? 'text-red-400' : 'text-slate-400'}`}>{offender.warrants > 0 ? `${offender.warrants} active` : 'None'}</p></div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); setWarrantOffender(offender); setShowWarrant(true); }}
                      className="flex-1 py-2 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-[10px] font-bold hover:bg-red-500/25 transition-colors">Issue Warrant</button>
                    <button onClick={(e) => { e.stopPropagation(); setReportOffender(offender); setShowReport(true); }}
                      className="flex-1 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-[10px] font-bold hover:bg-slate-700 transition-colors">View Full Record</button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredOffenders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3"><svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-500 fill-none" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div>
            <p className="text-sm text-slate-500">No offenders found</p>
          </div>
        )}
      </div>

      <WarrantModal isOpen={showWarrant} onClose={() => setShowWarrant(false)} offender={warrantOffender} />
      <FullReportModal isOpen={showReport} onClose={() => setShowReport(false)} offender={reportOffender} />
    </AdminLayout>
  );
};

export default Offenders;