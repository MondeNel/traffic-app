import CitizenLayout from '../../components/layout/CitizenLayout';

const demoData = {
  user: {
    first_name: 'Sipho',
    last_name: 'Khumalo',
    id_number: '9205125432082',
    license_number: 'ZA-DL-0298431',
    vehicle_codes: 'B'
  }
};

const License = () => {
  return (
    <CitizenLayout user={demoData.user}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              My driver's license
            </h1>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              Digital copy · tap QR to share with officer
            </p>
          </div>
          <button className="px-3 py-1.5 bg-[#1B6CA8] text-white border-none rounded text-xs font-medium hover:bg-[#0F4A7A] transition-colors">
            Renew license
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

        {/* Full license card */}
        <div className="bg-[#1B3A6B] rounded-[10px] p-5 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute -right-5 -top-5 w-[120px] h-[120px] rounded-full border-[18px] border-white/5"></div>

          <div className="relative z-10">
            {/* Top section */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[9px] font-semibold tracking-widest opacity-60">
                  REPUBLIC OF SOUTH AFRICA
                </div>
                <div className="text-[17px] font-bold mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Driver's License
                </div>
              </div>
              <div className="bg-white/15 border border-white/25 rounded-full px-3.5 py-1.5 text-xs font-medium">
                Valid
              </div>
            </div>

            {/* Details grid - 3 columns */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="text-[8px] opacity-55 tracking-wider font-semibold block">1. Surname</label>
                <span className="text-xs font-medium block mt-0.5">Khumalo</span>
              </div>
              <div>
                <label className="text-[8px] opacity-55 tracking-wider font-semibold block">2. Initials</label>
                <span className="text-xs font-medium block mt-0.5">S P</span>
              </div>
              <div>
                <label className="text-[8px] opacity-55 tracking-wider font-semibold block">3. ID Number</label>
                <span className="text-xs font-medium block mt-0.5">9205125432082</span>
              </div>
              <div>
                <label className="text-[8px] opacity-55 tracking-wider font-semibold block">4a. Date issued</label>
                <span className="text-xs font-medium block mt-0.5">14 Aug 2021</span>
              </div>
              <div>
                <label className="text-[8px] opacity-55 tracking-wider font-semibold block">5. Expires</label>
                <span className="text-xs font-medium block mt-0.5">04 Jun 2025</span>
              </div>
              <div>
                <label className="text-[8px] opacity-55 tracking-wider font-semibold block">4b. Country</label>
                <span className="text-xs font-medium block mt-0.5">ZA</span>
              </div>
            </div>

            {/* Bottom section */}
            <div className="flex items-center gap-3.5 pt-2.5 border-t border-white/10">
              {/* Photo placeholder */}
              <div className="w-[52px] h-[62px] rounded-sm bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-white/50">
                  <circle cx="12" cy="8" r="4"/>
                  <path d="M20 21a8 8 0 1 0-16 0"/>
                </svg>
              </div>

              {/* Vehicle codes */}
              <div className="flex-1">
                <div className="text-[9px] opacity-50 tracking-wider font-semibold mb-1.5">
                  10. Vehicle codes authorised
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  <span className="bg-white/15 border border-white/30 rounded-sm px-2.5 py-0.5 text-xs font-semibold">B</span>
                  <span className="bg-white/15 border border-white/30 rounded-sm px-2.5 py-0.5 text-xs font-semibold opacity-30">C</span>
                  <span className="bg-white/15 border border-white/30 rounded-sm px-2.5 py-0.5 text-xs font-semibold opacity-30">EB</span>
                  <span className="bg-white/15 border border-white/30 rounded-sm px-2.5 py-0.5 text-xs font-semibold opacity-30">EC</span>
                  <span className="bg-white/15 border border-white/30 rounded-sm px-2.5 py-0.5 text-xs font-semibold opacity-30">A</span>
                </div>
              </div>

              {/* QR code */}
              <div className="text-center flex-shrink-0">
                <div className="w-[52px] h-[52px] bg-white/90 rounded-sm p-1">
                  <div 
                    className="w-full h-full"
                    style={{
                      background: 'repeating-conic-gradient(#1B3A6B 0% 25%, transparent 0% 50%) 0 0/5px 5px'
                    }}
                  ></div>
                </div>
                <div className="text-[9px] opacity-50 mt-1.5">Scan to verify</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default License;