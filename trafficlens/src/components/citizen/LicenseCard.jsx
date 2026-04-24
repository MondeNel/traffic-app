const LicenseCard = ({ user, license }) => {
  return (
    <div className="bg-[#1B3A6B] rounded-[10px] p-4 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -right-5 -top-5 w-[120px] h-[120px] rounded-full border-[18px] border-white/5"></div>

      <div className="relative z-10">
        {/* Top section */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="text-[9px] font-semibold tracking-widest opacity-60">
              REPUBLIC OF SOUTH AFRICA
            </div>
            <div className="text-sm font-bold mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Driver's License
            </div>
          </div>
          <div className="bg-white/15 border border-white/25 rounded-full px-2.5 py-1 text-[10px] font-medium">
            {license?.license_expiry && new Date(license.license_expiry) > new Date() ? 'Valid' : 'Expired'}
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-[8px] opacity-55 tracking-wider font-semibold block">1. Surname</label>
            <span className="text-xs font-medium block mt-0.5">{user?.last_name || '—'}</span>
          </div>
          <div>
            <label className="text-[8px] opacity-55 tracking-wider font-semibold block">2. Initials</label>
            <span className="text-xs font-medium block mt-0.5">
              {user?.first_name?.[0] || '—'} {user?.last_name?.[0] || '—'}
            </span>
          </div>
          <div>
            <label className="text-[8px] opacity-55 tracking-wider font-semibold block">3. ID Number</label>
            <span className="text-xs font-medium block mt-0.5">{user?.id_number || '—'}</span>
          </div>
          <div>
            <label className="text-[8px] opacity-55 tracking-wider font-semibold block">5. Expires</label>
            <span className="text-xs font-medium block mt-0.5">
              {license?.license_expiry 
                ? new Date(license.license_expiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })
                : '—'
              }
            </span>
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/10">
          {/* Photo placeholder */}
          <div className="w-[38px] h-[46px] rounded-sm bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white/50">
              <circle cx="12" cy="8" r="4"/>
              <path d="M20 21a8 8 0 1 0-16 0"/>
            </svg>
          </div>

          {/* Vehicle codes */}
          <div className="flex-1">
            <div className="text-[9px] opacity-50 tracking-wider font-semibold mb-1">
              10. Vehicle codes
            </div>
            <div className="flex gap-1 flex-wrap">
              {(license?.vehicle_codes || 'B').split(',').map((code, i) => (
                <span 
                  key={i}
                  className="bg-white/15 border border-white/30 rounded-sm px-1.5 py-0.5 text-[11px] font-semibold"
                >
                  {code.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* QR placeholder */}
          <div className="w-[38px] h-[38px] bg-white/90 rounded-sm p-0.5 flex-shrink-0">
            <div 
              className="w-full h-full"
              style={{
                background: 'repeating-conic-gradient(#1B3A6B 0% 25%, transparent 0% 50%) 0 0/5px 5px'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseCard;