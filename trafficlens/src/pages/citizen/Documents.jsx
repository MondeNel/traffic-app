import { useState, useEffect } from 'react';
import CitizenLayout from '../../components/layout/CitizenLayout';
import RenewalModal from '../../components/citizen/RenewalModal';
import Skeleton, { TableRowSkeleton } from '../../components/ui/Skeleton';
import demoUser from '../../data/demoUser';

const documents = [
  { id: 1, name: "Driver's License", type: 'license', issued: '2021-08-14', expires: '2026-09-28', status: 'valid' },
  { id: 2, name: 'Vehicle Registration — GP 82 TT', type: 'registration', issued: '2021-08-14', expires: null, status: 'valid' },
  { id: 3, name: 'Vehicle Registration — GP 14 KW', type: 'registration', issued: '2022-03-03', expires: null, status: 'valid' },
  { id: 4, name: 'Proof of Residence — Cape Town', type: 'residence', issued: '2025-01-10', expires: '2025-07-10', status: 'valid' },
  { id: 5, name: 'Fine Payment Receipt — R500', type: 'receipt', issued: '2025-02-05', expires: null, status: 'paid' }
];

const documentIcons = {
  license: { bg: 'bg-ca-light', color: 'text-ca', icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></> },
  registration: { bg: 'bg-emerald-50', color: 'text-emerald-500', icon: <><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></> },
  residence: { bg: 'bg-blue-50', color: 'text-blue-500', icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></> },
  receipt: { bg: 'bg-amber-50', color: 'text-amber-500', icon: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></> }
};

const Documents = () => {
  const [showRenewal, setShowRenewal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(t); }, []);

  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <>
            {/* Header skeleton */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-2.5 w-32" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="h-7 w-24 rounded" />
                <Skeleton className="h-7 w-16 rounded" />
              </div>
            </div>
            {/* Document rows skeleton */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {Array(5).fill(null).map((_, i) => (
                <div key={i} className={`flex items-center gap-3 px-4 py-3 ${i < 4 ? 'border-b border-slate-200' : ''}`}>
                  <Skeleton className="w-9 h-9 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-1.5 min-w-0">
                    <Skeleton className="h-3 w-44" />
                    <Skeleton className="h-2 w-56" />
                  </div>
                  <Skeleton className="h-5 w-12 rounded-full shrink-0" />
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  My documents
                </h1>
                <p className="text-[11px] text-slate-400 mt-0.5">{documents.length} documents on file</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setShowRenewal(true)} className="px-3 py-1.5 bg-ca text-white border-none rounded text-xs font-medium hover:bg-ca-dark transition-colors">
                  Renew License
                </button>
                <button className="px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                  + Upload
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              {documents.map((doc, index) => {
                const iconConfig = documentIcons[doc.type] || documentIcons.receipt;
                return (
                  <div key={doc.id} className={`flex items-center gap-3 px-4 py-3 ${index < documents.length - 1 ? 'border-b border-slate-200' : ''}`}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconConfig.bg}`}>
                      <svg viewBox="0 0 24 24" className={`w-4 h-4 fill-none ${iconConfig.color}`} strokeWidth="2">{iconConfig.icon}</svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-slate-900">{doc.name}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Issued {new Date(doc.issued).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {doc.expires && ` · Expires ${new Date(doc.expires).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${doc.status === 'valid' ? 'bg-emerald-50 text-emerald-700' : 'bg-ca-light text-ca'}`}>
                      {doc.status === 'valid' ? 'Valid' : 'Recorded'}
                    </span>
                    <button className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-500 fill-none" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      <RenewalModal isOpen={showRenewal} onClose={() => setShowRenewal(false)} />
    </CitizenLayout>
  );
};

export default Documents;