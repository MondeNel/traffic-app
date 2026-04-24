const fineIcons = {
  speeding: {
    bg: '#FEF2F2',
    color: '#EF4444',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  },
  expired_disc: {
    bg: '#FFFBEB',
    color: '#F59E0B',
    icon: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>
  },
  parking: {
    bg: '#EFF6FF',
    color: '#3B82F6',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>
  },
  traffic_light: {
    bg: '#ECFDF5',
    color: '#10B981',
    icon: <polyline points="9 11 12 14 22 4"/>
  }
};

const FinesList = ({ fines = [] }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-ZA', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden">
      {fines.length === 0 ? (
        <div className="p-6 text-center text-[#94A3B8] text-xs">
          No fines found
        </div>
      ) : (
        fines.map((fine, index) => {
          const iconConfig = fineIcons[fine.fine_type] || fineIcons.traffic_light;
          const isPaid = fine.status === 'paid';

          return (
            <div 
              key={fine.id} 
              className={`flex items-center px-3 py-2.5 gap-2 ${index < fines.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
            >
              {/* Icon */}
              <div 
                className="w-[30px] h-[30px] rounded-md flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: iconConfig.bg }}
              >
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-none" strokeWidth="2" style={{ stroke: iconConfig.color }}>
                  {iconConfig.icon}
                </svg>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[#0F172A] truncate">
                  {fine.description}
                </div>
                <div className="text-[10px] text-[#94A3B8] mt-0.5">
                  Issued {formatDate(fine.issued_date)}
                  {fine.location && ` · ${fine.location}`}
                </div>
              </div>

              {/* Amount */}
              <div 
                className="text-[13px] font-semibold mr-2 whitespace-nowrap"
                style={{ 
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: isPaid ? '#10B981' : '#0F172A'
                }}
              >
                {isPaid ? 'Paid' : `R ${fine.amount.toLocaleString()}`}
              </div>

              {/* Action button */}
              {isPaid ? (
                <button className="px-2.5 py-1.5 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded text-[11px] whitespace-nowrap hover:bg-[#D1FAE5] transition-colors">
                  Receipt
                </button>
              ) : (
                <button className="px-3 py-1.5 bg-[#1B6CA8] text-white border-none rounded text-[11px] font-medium whitespace-nowrap hover:bg-[#0F4A7A] transition-colors">
                  Pay now
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default FinesList;