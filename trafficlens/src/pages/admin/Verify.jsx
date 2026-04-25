import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

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
    
    // Simulate search delay
    setTimeout(() => {
      // Mock results based on search query
      if (searchQuery.toLowerCase().includes('forged') || searchQuery.includes('55 ZN')) {
        setResults([
          {
            id: 1,
            type: 'forged',
            name: 'Z. Nkosi',
            idNumber: 'No NaTIS match',
            licenseNumber: 'Unregistered',
            plate: 'GP 55 ZN — stolen',
            issuedBy: 'Unverified',
            fines: [{ desc: 'Document flagged as fraudulent by NaTIS', amount: null }],
            status: 'FORGED — ALERT'
          }
        ]);
      } else {
        setResults([
          {
            id: 1,
            type: 'valid',
            name: 'Sipho P. Khumalo',
            idNumber: '9205125432082',
            licenseNumber: 'ZA-DL-0298431',
            expiry: '04 Jun 2026',
            vehicleCodes: 'B',
            plate: 'GP 82 TT',
            discExpiry: '28 Apr 2025',
            discExpiryWarning: true,
            fines: [
              { desc: 'Speeding — N1 · 12 Apr 2025', amount: 1500 },
              { desc: 'Expired disc · 28 Mar 2025', amount: 750 }
            ],
            status: 'VALID'
          }
        ]);
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
          
          {/* Quick search hints */}
          <div className="flex gap-2 mt-3 flex-wrap">
            <button onClick={() => { setSearchQuery('9205125432082'); setSearchType('id'); }} className="text-[10px] text-slate-500 hover:text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              ID: 9205125432082
            </button>
            <button onClick={() => { setSearchQuery('GP 55 ZN'); setSearchType('plate'); }} className="text-[10px] text-slate-500 hover:text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              Plate: GP 55 ZN (forged)
            </button>
            <button onClick={() => { setSearchQuery('ZA-DL-0298431'); setSearchType('license'); }} className="text-[10px] text-slate-500 hover:text-slate-300 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700">
              License: ZA-DL-0298431
            </button>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {results.map((result) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-2xl overflow-hidden border ${
                  result.type === 'forged' 
                    ? 'border-red-500/30 bg-red-500/5' 
                    : 'border-slate-800 bg-white/[0.02]'
                }`}
              >
                {/* Header */}
                <div className={`p-4 border-b ${
                  result.type === 'forged' 
                    ? 'border-red-500/20 bg-red-500/10' 
                    : 'border-slate-800'
                }`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-200">{result.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                      result.type === 'forged'
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                        : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    }`}>
                      {result.status}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">ID Number</label>
                      <span className={`text-xs font-bold ${result.type === 'forged' && result.idNumber.includes('No') ? 'text-red-400' : 'text-slate-300'}`}>
                        {result.idNumber}
                      </span>
                    </div>
                    <div>
                      <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">License No.</label>
                      <span className={`text-xs font-bold ${result.type === 'forged' && result.licenseNumber === 'Unregistered' ? 'text-red-400' : 'text-slate-300'}`}>
                        {result.licenseNumber}
                      </span>
                    </div>
                    {result.expiry && (
                      <div>
                        <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Expires</label>
                        <span className="text-xs font-bold text-slate-300">{result.expiry}</span>
                      </div>
                    )}
                    {result.vehicleCodes && (
                      <div>
                        <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Vehicle Codes</label>
                        <span className="text-xs font-bold text-slate-300">{result.vehicleCodes}</span>
                      </div>
                    )}
                    {result.plate && (
                      <div>
                        <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Plate</label>
                        <span className={`text-xs font-bold ${result.type === 'forged' ? 'text-red-400' : 'text-slate-300'}`}>
                          {result.plate}
                        </span>
                      </div>
                    )}
                    {result.discExpiry && (
                      <div>
                        <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Disc Expiry</label>
                        <span className={`text-xs font-bold ${result.discExpiryWarning ? 'text-amber-400' : 'text-slate-300'}`}>
                          {result.discExpiry} {result.discExpiryWarning && '⚠'}
                        </span>
                      </div>
                    )}
                    {result.issuedBy && (
                      <div>
                        <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block">Issued By</label>
                        <span className="text-xs font-bold text-red-400">{result.issuedBy}</span>
                      </div>
                    )}
                  </div>

                  {/* Fines */}
                  {result.fines && result.fines.length > 0 && (
                    <div className="border-t border-slate-800 pt-3 mb-4">
                      <label className="text-[8px] text-slate-500 uppercase tracking-wider font-bold block mb-2">
                        {result.type === 'forged' ? 'System Alert' : 'Outstanding Fines'}
                      </label>
                      {result.fines.map((fine, i) => (
                        <div key={i} className={`flex justify-between py-1.5 ${i < result.fines.length - 1 ? 'border-b border-slate-800/50' : ''}`}>
                          <span className={`text-[10px] ${result.type === 'forged' ? 'text-red-400' : 'text-slate-400'}`}>
                            {fine.desc}
                          </span>
                          {fine.amount && (
                            <span className="text-[10px] font-bold text-red-400">R {fine.amount.toLocaleString()}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {result.type === 'forged' ? (
                      <>
                        <button className="flex-1 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/25 transition-colors">
                          🚨 Escalate & Detain
                        </button>
                        <button className="flex-1 py-2.5 bg-slate-800 border border-slate-700 text-slate-400 rounded-lg text-xs font-bold hover:bg-slate-700 transition-colors">
                          Dismiss
                        </button>
                      </>
                    ) : (
                      <>
                        <button className="flex-1 py-2.5 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/25 transition-colors">
                          Flag
                        </button>
                        <button className="flex-1 py-2.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold hover:bg-emerald-500/25 transition-colors">
                          Release
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : searched && !results ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-slate-500 fill-none" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">No records found</h3>
            <p className="text-sm text-slate-500">No matching records in NaTIS database</p>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-10 h-10 stroke-emerald-400 fill-none" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">Ready to verify</h3>
            <p className="text-sm text-slate-500">Enter an ID, license number, or plate to search NaTIS</p>
            <div className="flex items-center justify-center gap-4 mt-4 text-[10px] text-slate-600">
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> Valid records</div>
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 bg-red-500 rounded-full" /> Flagged records</div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Verify;