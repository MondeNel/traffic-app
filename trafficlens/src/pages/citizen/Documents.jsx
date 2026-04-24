import CitizenLayout from '../../components/layout/CitizenLayout';

const demoData = {
  user: {
    first_name: 'Sipho',
    last_name: 'Khumalo',
    id_number: '9205125432082'
  },
  documents: [
    {
      id: 1,
      name: 'Driver\'s License',
      type: 'license',
      issued: '2021-08-14',
      expires: '2026-06-04',
      status: 'valid'
    },
    {
      id: 2,
      name: 'Vehicle Registration — GP 82 TT',
      type: 'registration',
      issued: '2021-08-14',
      expires: null,
      status: 'valid'
    },
    {
      id: 3,
      name: 'Vehicle Registration — GP 14 KW',
      type: 'registration',
      issued: '2022-03-03',
      expires: null,
      status: 'valid'
    },
    {
      id: 4,
      name: 'Proof of Residence',
      type: 'residence',
      issued: '2025-01-10',
      expires: '2025-07-10',
      status: 'valid'
    },
    {
      id: 5,
      name: 'Fine Payment Receipt — R500',
      type: 'receipt',
      issued: '2025-02-05',
      expires: null,
      status: 'paid'
    }
  ]
};

const documentIcons = {
  license: {
    bg: '#E8F3FB',
    color: '#1B6CA8',
    icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></>
  },
  registration: {
    bg: '#ECFDF5',
    color: '#10B981',
    icon: <><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></>
  },
  residence: {
    bg: '#EFF6FF',
    color: '#3B82F6',
    icon: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></>
  },
  receipt: {
    bg: '#FFFBEB',
    color: '#F59E0B',
    icon: <><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>
  }
};

const Documents = () => {
  return (
    <CitizenLayout user={demoData.user}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              My documents
            </h1>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              {demoData.documents.length} documents on file
            </p>
          </div>
          <button className="px-3 py-1.5 bg-[#1B6CA8] text-white border-none rounded text-xs font-medium hover:bg-[#0F4A7A] transition-colors">
            + Upload document
          </button>
        </div>

        {/* Documents list */}
        <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden">
          {demoData.documents.map((doc, index) => {
            const iconConfig = documentIcons[doc.type] || documentIcons.receipt;
            return (
              <div 
                key={doc.id}
                className={`flex items-center gap-3 px-4 py-3 ${index < demoData.documents.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
              >
                {/* Icon */}
                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: iconConfig.bg }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none" strokeWidth="2" style={{ stroke: iconConfig.color }}>
                    {iconConfig.icon}
                  </svg>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-[#0F172A]">{doc.name}</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">
                    Issued {new Date(doc.issued).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {doc.expires && ` · Expires ${new Date(doc.expires).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}`}
                  </div>
                </div>

                {/* Status badge */}
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                  doc.status === 'valid' 
                    ? 'bg-[#ECFDF5] text-[#059669]' 
                    : 'bg-[#E8F3FB] text-[#1B6CA8]'
                }`}>
                  {doc.status === 'valid' ? 'Valid' : 'Recorded'}
                </span>

                {/* Download button */}
                <button className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center hover:bg-[#F8FAFC] transition-colors">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#475569] fill-none" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Documents;