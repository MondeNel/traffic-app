import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

const Offenders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('fines');
  const [filterLevel, setFilterLevel] = useState('all');
  const [selectedOffender, setSelectedOffender] = useState(null);

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
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Offender database
            </h1>
            <p className="text-[10px] text-slate-600 mt-0.5">
              {offenders.length} registered offenders · {highRisk} high risk · R {totalFines.toLocaleString()} total fines
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{highRisk}</div>
            <div className="text-[9px] text-slate-500">High risk</div>
          </div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R {totalFines.toLocaleString()}</div>
            <div className="text-[9px] text-slate-500">Total fines</div>
          </div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{totalWarrants}</div>
            <div className="text-[9px] text-slate-500">Active warrants</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-500 fill-none absolute left-3 top-1/2 -translate-y-1/2" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, plate, or area..."
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-1.5">
            <select value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="all">All Levels</option>
              <option value="HIGH">High Risk</option>
              <option value="MED">Medium Risk</option>
              <option value="LOW">Low Risk</option>
            </select>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
              <option value="fines">Sort by Fines</option>
              <option value="violations">Sort by Violations</option>
              <option value="recent">Sort by Recent</option>
            </select>
          </div>
        </div>

        {/* Offenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredOffenders.map((offender) => (
            <motion.div
              key={offender.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedOffender(selectedOffender?.id === offender.id ? null : offender)}
              className={`bg-white/[0.02] border rounded-xl p-4 cursor-pointer transition-all ${
                selectedOffender?.id === offender.id 
                  ? 'border-emerald-500/30 bg-emerald-500/5' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">
                    {offender.initials}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-200">{offender.name}</h3>
                    <p className="text-[10px] text-slate-500">{offender.area} · Seen {offender.seen}</p>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${getLevelBadge(offender.level)}`}>
                  {offender.level}
                </span>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Fines</p>
                  <p className="text-xs font-bold text-red-400">R {offender.fines.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Violations</p>
                  <p className="text-xs font-bold text-slate-300">{offender.violations}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Plates</p>
                  <p className="text-xs font-mono text-slate-400">{offender.plates.join(', ')}</p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOffender?.id === offender.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-slate-800 pt-3 space-y-2"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase tracking-wider">Last Violation</p>
                      <p className="text-[10px] text-slate-400">{offender.lastViolation}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase tracking-wider">License Status</p>
                      <p className={`text-[10px] font-bold ${offender.licenseStatus === 'Valid' ? 'text-emerald-400' : 'text-red-400'}`}>
                        {offender.licenseStatus}
                      </p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase tracking-wider">Address</p>
                      <p className="text-[10px] text-slate-400">{offender.address}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-slate-500 uppercase tracking-wider">Warrants</p>
                      <p className={`text-[10px] font-bold ${offender.warrants > 0 ? 'text-red-400' : 'text-slate-400'}`}>
                        {offender.warrants > 0 ? `${offender.warrants} active` : 'None'}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-[10px] font-bold hover:bg-red-500/25 transition-colors">
                      Issue Warrant
                    </button>
                    <button className="flex-1 py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-[10px] font-bold hover:bg-slate-700 transition-colors">
                      View Full Record
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {filteredOffenders.length === 0 && (
          <div className="text-center py-16">
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
              <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-500 fill-none" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
            </div>
            <p className="text-sm text-slate-500">No offenders found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Offenders;