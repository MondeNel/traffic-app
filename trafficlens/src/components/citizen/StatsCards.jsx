const StatCard = ({ accent, icon, label, value, sub }) => {
  const accents = {
    red:   { border: '#C13333', iconBg: '#FCEAEA', iconStroke: '#C13333' },
    amber: { border: '#B86B1A', iconBg: '#FDF3E4', iconStroke: '#B86B1A' },
    green: { border: '#0E8A5F', iconBg: '#E6F5F0', iconStroke: '#0E8A5F' },
  };
  const a = accents[accent] || accents.green;

  return (
    <div style={{
      background: 'white',
      border: '1px solid #E2E8F0',
      borderLeft: `3px solid ${a.border}`,
      borderRadius: '0 8px 8px 0',
      padding: '6px 8px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }} className="md:p-3.5 md:gap-1.5 md:rounded-r-[10px]">
      {/* Icon */}
      <div style={{
        position: 'absolute', right: 6, top: 6,
        width: 22, height: 22,
        borderRadius: 6,
        background: a.iconBg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }} className="md:w-[30px] md:h-[30px] md:right-3.5 md:top-3.5 md:rounded-lg">
        <svg viewBox="0 0 24 24" style={{ width: 10, height: 10, stroke: a.iconStroke, fill: 'none', strokeWidth: 2 }} className="md:w-[13px] md:h-[13px]">
          {icon}
        </svg>
      </div>

      <div style={{
        fontSize: 7.5,
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        color: '#94A3B8',
      }} className="md:text-[9.5px]">
        {label}
      </div>

      <div style={{
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 14,
        fontWeight: 600,
        color: '#0F172A',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }} className="md:text-[22px]">
        {value}
      </div>

      <div style={{ fontSize: 7.5, color: '#64748B' }} className="md:text-[10px]">
        {sub}
      </div>
    </div>
  );
};

const StatsCards = ({ fines = [], license }) => {
  const unpaidFines   = fines.filter(f => f.status === 'unpaid');
  const totalAmount   = unpaidFines.reduce((sum, f) => sum + f.amount, 0);

  const getLicenseDays = () => {
    if (!license?.license_expiry) return 0;
    const expiry = new Date(license.license_expiry);
    const today  = new Date();
    expiry.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const licenseDays = getLicenseDays();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }} className="md:gap-3">
      <StatCard
        accent="red"
        label="Outstanding fines"
        value={`R ${totalAmount.toLocaleString()}`}
        sub={`${unpaidFines.length} unpaid ${unpaidFines.length === 1 ? 'notice' : 'notices'}`}
        icon={<><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>}
      />

      <StatCard
        accent="amber"
        label="License expires"
        value={licenseDays > 0 ? `${licenseDays} days` : 'Expired'}
        sub={license?.license_expiry
          ? `Renew before ${new Date(license.license_expiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}`
          : 'Not set'}
        icon={<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>}
      />

      <StatCard
        accent="green"
        label="Registered vehicles"
        value="2"
        sub="1 disc expiring soon"
        icon={<><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>}
      />
    </div>
  );
};

export default StatsCards;