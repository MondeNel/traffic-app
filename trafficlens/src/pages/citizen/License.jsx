import CitizenLayout from '../../components/layout/CitizenLayout';
import LicenseCard from '../../components/citizen/LicenseCard';

const demoData = {
  user: {
    first_name: 'DAVID',
    last_name: 'GARETH',
    id_number: '020608 1753 790 8 1',
    date_of_birth: '1996-06-17'
  },
  license: {
    license_number: '1063003041FS',
    license_expiry: '2026-09-28'
  }
};

const License = () => {
  const codes = [
    { code: 'B', description: 'Light Motor Vehicles', active: true },
    { code: 'EB', description: 'Light Articulated Vehicles', active: false },
    { code: 'C1', description: 'Heavy Motor Vehicle up to 16 000kg', active: false },
    { code: 'C', description: 'Heavy Motor Vehicle', active: false },
    { code: 'EC1', description: 'Extra Heavy Articulated up to 16 000kg', active: false },
    { code: 'EC', description: 'Extra Heavy Articulated', active: false },
    { code: 'A', description: 'Motorcycles', active: false },
  ];

  return (
    <CitizenLayout user={{
      first_name: 'MBB',
      last_name: 'NEL',
      id_number: '020608175379081'
    }}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Inter', sans-serif" }}>
              My driver's license
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <p className="text-[11px] text-[#64748B]">
                Status: <span className="font-medium text-[#10B981]">Valid</span> · Tap QR to verify
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#1B6CA8] text-white border-none rounded-lg text-sm font-medium hover:bg-[#0F4A7A] transition-colors shadow-sm">
            Renew License
          </button>
        </div>

        {/* Warning banner */}
        <div className="bg-[#FEF3C7] border border-[#F59E0B] rounded-lg p-2.5 flex items-center gap-2 text-xs text-[#92400E]">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#D97706] fill-none flex-shrink-0" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          Your license expires in 42 days. Renew now to avoid a lapse in driving privileges.
        </div>

        {/* Dark background section for the license card */}
        <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden -mx-2 p-4">
          <LicenseCard user={demoData.user} license={demoData.license} />
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Vehicle Codes */}
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
              Vehicle Categories & Codes
            </h3>
            <div className="flex flex-col gap-2">
              {codes.map((item) => (
                <div 
                  key={item.code} 
                  className={`flex items-center justify-between p-2.5 rounded-lg border ${
                    item.active 
                      ? 'border-[#10B981]/30 bg-[#10B981]/5' 
                      : 'border-[#E2E8F0]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className={`w-10 text-center text-lg font-bold py-1 rounded ${
                        item.active 
                          ? 'bg-[#10B981] text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]' 
                          : 'bg-gray-100 text-gray-400'
                      }`}
                      style={{ fontFamily: "'Space Mono', monospace" }}
                    >
                      {item.code}
                    </span>
                    <span className={`text-xs ${item.active ? 'text-[#0F172A]' : 'text-[#64748B] opacity-60'}`}>
                      {item.description}
                    </span>
                  </div>
                  {item.active && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#10B981]">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Restrictions & Admin */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Restrictions & Notes
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Driver Restrictions</span>
                  <span className="text-xs font-medium text-[#0F172A]">0 (None)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Vehicle Restrictions</span>
                  <span className="text-xs font-medium text-[#0F172A]">None</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm flex-1">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                Administrative Data
              </h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                <div>
                  <span className="text-[8px] font-semibold uppercase text-[#94A3B8] block">First Issue Date</span>
                  <span className="text-[#475569] font-medium">13/10/2014</span>
                </div>
                <div>
                  <span className="text-[8px] font-semibold uppercase text-[#94A3B8] block">Issuing Authority</span>
                  <span className="text-[#475569] font-medium">RTMC</span>
                </div>
                <div>
                  <span className="text-[8px] font-semibold uppercase text-[#94A3B8] block">Document Version</span>
                  <span className="text-[#475569] font-medium">v2.4 Digital</span>
                </div>
                <div>
                  <span className="text-[8px] font-semibold uppercase text-[#94A3B8] block">Country of Issue</span>
                  <span className="text-[#475569] font-medium">ZA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default License;