const StatsCards = ({ fines = [], license }) => {
  const unpaidFines = fines.filter(f => f.status === 'unpaid');
  const totalAmount = unpaidFines.reduce((sum, f) => sum + f.amount, 0);
  
  const getLicenseDays = () => {
    if (!license?.license_expiry) return 0;
    const expiry = new Date(license.license_expiry);
    const today = new Date();
    // Reset time parts for accurate day calculation
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const licenseDays = getLicenseDays();

  return (
    <div className="grid grid-cols-3 gap-2.5">
      {/* Outstanding fines */}
      <div className="bg-white border-l-[3px] border-l-[#EF4444] border border-[#E2E8F0] rounded-r-[10px] p-3 relative">
        <div className="absolute right-2.5 top-2.5 w-7 h-7 rounded-md bg-[#FEF2F2] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#EF4444] fill-none" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
        <div className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">Outstanding fines</div>
        <div className="text-xl font-semibold text-[#0F172A] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          R {totalAmount.toLocaleString()}
        </div>
        <div className="text-[10px] text-[#475569] mt-0.5">
          {unpaidFines.length} unpaid {unpaidFines.length === 1 ? 'notice' : 'notices'}
        </div>
      </div>

      {/* License expiry */}
      <div className="bg-white border-l-[3px] border-l-[#F59E0B] border border-[#E2E8F0] rounded-r-[10px] p-3 relative">
        <div className="absolute right-2.5 top-2.5 w-7 h-7 rounded-md bg-[#FFFBEB] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#F59E0B] fill-none" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
        </div>
        <div className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">License expires</div>
        <div className="text-xl font-semibold text-[#0F172A] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {licenseDays > 0 ? `${licenseDays} days` : 'Expired'}
        </div>
        <div className="text-[10px] text-[#475569] mt-0.5">
          {license?.license_expiry 
            ? `Renew before ${new Date(license.license_expiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}` 
            : 'Not set'}
        </div>
      </div>

      {/* Registered vehicles */}
      <div className="bg-white border-l-[3px] border-l-[#10B981] border border-[#E2E8F0] rounded-r-[10px] p-3 relative">
        <div className="absolute right-2.5 top-2.5 w-7 h-7 rounded-md bg-[#ECFDF5] flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#10B981] fill-none" strokeWidth="2">
            <polyline points="9 11 12 14 22 4"/>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
          </svg>
        </div>
        <div className="text-[10px] text-[#94A3B8] font-medium uppercase tracking-wider">Registered vehicles</div>
        <div className="text-xl font-semibold text-[#0F172A] mt-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          2
        </div>
        <div className="text-[10px] text-[#475569] mt-0.5">1 disc expiring soon</div>
      </div>
    </div>
  );
};

export default StatsCards;