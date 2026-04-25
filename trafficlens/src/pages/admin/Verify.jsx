import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import LicenseCard from '../../components/citizen/LicenseCard';

const Verify = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('id');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearched(true);
    
    setTimeout(() => {
      if (searchQuery.toLowerCase().includes('forged') || searchQuery.includes('55 ZN')) {
        setResults([{
          id: 1,
          type: 'forged',
          name: 'Z. Nkosi',
          idNumber: 'No NaTIS match',
          licenseNumber: 'Unregistered',
          plate: 'GP 55 ZN — stolen',
          issuedBy: 'Unverified',
          fines: [{ desc: 'Document flagged as fraudulent by NaTIS', amount: null }],
          status: 'FORGED — ALERT'
        }]);
      } else {
        setResults([{
          id: 1,
          type: 'valid',
          user: {
            first_name: 'David',
            last_name: 'Gareth',
            id_number: '020608175379081',
            date_of_birth: '1996-06-17'
          },
          license: {
            license_number: '1063003041FS',
            license_expiry: '2026-09-28',
            vehicle_codes: 'B'
          },
          fines: [
            { desc: 'Speeding — N1 Cape Town · 12 Apr 2025', amount: 1500 },
            { desc: 'Expired disc — GP 82 TT · 28 Mar 2025', amount: 750 }
          ],
          status: 'VALID'
        }]);
      }
      setIsSearching(false);
    }, 1200);
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Search Bar */}
        <div className="mb-6">
          <form onSubmit={handleSearch} className="flex gap-2 flex-col sm:flex-row">
            <div className="flex gap-2 flex-1">
              <select 
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="id">ID Number</option>
                <option value="license">License No.</option>
                <option value="plate">Plate Number</option>
              </select>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'id' ? 'Enter ID number...' : searchType === 'license' ? 'Enter license number...' : 'Enter plate number...'}
                className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSearching}
              className="px-6 py-2.5 bg-emerald-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <><div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" /> Searching...</>
              ) : (
                <><svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg> Verify</>
              )}
            </button>
          </form>
          
          <div className="flex gap-2 mt-3 flex-wrap">
            <button onClick={() => { setSearchQuery('020608175379081'); setSearchType('id'); }} className="text-[10px] text-slate-500 hover:text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">ID: 020608175379081</button>
            <button onClick={() => { setSearchQuery('GP 55 ZN'); setSearchType('plate'); }} className="text-[10px] text-slate-500 hover:text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">Plate: GP 55 ZN (forged)</button>
            <button onClick={() => { setSearchQuery('1063003041FS'); setSearchType('license'); }} className="text-[10px] text-slate-500 hover:text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">License: 1063003041FS</button>
          </div>
        </div>

        {/* Results */}
        {isSearching ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-slate-400 text-sm">Searching NaTIS database...</p>
            </div>
          </div>
        ) : searched && results ? (
          <div className="space-y-6">
            {results.map((result) => (
              <motion.div key={result.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {result.type === 'valid' ? (
                  /* Valid — Show License Card */
                  <div>
                    {/* Status badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        ✓ {result.status}
                      </span>
                    </div>

                    {/* License Card */}
                    <div className="bg-brand-card rounded-2xl overflow-hidden mb-4">
                      <LicenseCard user={result.user} license={result.license} />
                    </div>

                    {/* Fines & Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Outstanding Fines */}
                      <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-4">
                        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">Outstanding Fines</h3>
                        {result.fines.map((fine, i) => (
                          <div key={i} className={`flex justify-between items-center py-2 ${i < result.fines.length - 1 ? 'border-b border-slate-800' : ''}`}>
                            <span className="text-[10px] text-slate-400">{fine.desc}</span>
                            <span className="text-[10px] font-bold text-red-400 ml-2 shrink-0">R {fine.amount.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-4 flex flex-col justify-center gap-3">
                        <button className="w-full py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/25 transition-colors">
                          🚩 Flag Driver
                        </button>
                        <button className="w-full py-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500/25 transition-colors">
                          ✓ Release Driver
                        </button>
                        <button className="w-full py-2 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">
                          📋 Issue Fine
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Forged — Show Alert Card */
                  <div className="rounded-2xl overflow-hidden border border-red-500/30 bg-red-500/5">
                    <div className="p-4 border-b border-red-500/20 bg-red-500/10">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-200">{result.name}</h3>
                        <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          {result.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div><label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">ID Number</label><span className="text-xs font-bold text-red-400">{result.idNumber}</span></div>
                        <div><label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">License No.</label><span className="text-xs font-bold text-red-400">{result.licenseNumber}</span></div>
                        <div><label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Plate</label><span className="text-xs font-bold text-red-400">{result.plate}</span></div>
                        <div><label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Issued By</label><span className="text-xs font-bold text-red-400">{result.issuedBy}</span></div>
                      </div>
                      <div className="border-t border-red-500/20 pt-3 mb-4">
                        <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block mb-2">System Alert</label>
                        {result.fines.map((fine, i) => (
                          <p key={i} className="text-[10px] text-red-400">{fine.desc}</p>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/25">🚨 Escalate & Detain</button>
                        <button className="flex-1 py-2.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-700">Dismiss</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : searched && !results ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-slate-500 fill-none" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">No records found</h3>
            <p className="text-sm text-slate-500">No matching records in NaTIS database</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-emerald-400 fill-none" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">Ready to verify</h3>
            <p className="text-sm text-slate-500">Enter an ID, license number, or plate to search NaTIS</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Verify;