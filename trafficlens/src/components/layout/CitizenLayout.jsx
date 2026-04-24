import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
  {
    group: 'Main',
    items: [
      { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { icon: 'license', label: 'My license', path: '/license', badge: '!' },
      { icon: 'clock', label: 'Vehicles', path: '/vehicles' }
    ]
  },
  {
    group: 'Account',
    items: [
      { icon: 'document', label: 'Documents', path: '/documents' },
      { icon: 'user', label: 'Profile', path: '/profile' },
      { icon: 'settings', label: 'Settings', path: '/settings' }
    ]
  }
];

const mobileNavItems = [
  { icon: 'dashboard', label: 'Home', path: '/dashboard' },
  { icon: 'license', label: 'License', path: '/license' },
  { icon: 'clock', label: 'Vehicles', path: '/vehicles' },
  { icon: 'document', label: 'Docs', path: '/documents' },
  { icon: 'user', label: 'Profile', path: '/profile' }
];

const iconPaths = {
  dashboard: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  license: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><circle cx="12" cy="12" r="2"/></svg>,
  clock: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><rect x="1" y="7" width="22" height="14" rx="2"/><path d="M5 7V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>,
  document: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  user: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>,
  settings: <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M22 12h-2M2 12h2M12 2v2M12 20v2"/></svg>
};

const CitizenLayout = ({ children, user }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC]">
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-[210px] bg-white border-r border-[#E2E8F0] flex-col flex-shrink-0">
          {/* Logo */}
          <div className="p-4 pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#1B6CA8] rounded-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <div>
                <div className="text-[13px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  TrafficLens
                </div>
                <div className="text-[10px] text-[#94A3B8]">Citizen portal</div>
              </div>
            </div>
          </div>

          <nav className="p-2 flex-1">
            {navItems.map((group, idx) => (
              <div key={idx}>
                <div className="text-[9px] font-semibold tracking-widest text-[#94A3B8] uppercase px-2 py-2">
                  {group.group}
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-md cursor-pointer text-xs mb-0.5 transition-colors w-full text-left ${
                      isActive(item.path) 
                        ? 'bg-[#E8F3FB] text-[#1B6CA8] font-medium' 
                        : 'text-[#475569] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    {iconPaths[item.icon]}
                    {item.label}
                    {item.badge && (
                      <span className="ml-auto bg-[#EF4444] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-lg">
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className="p-3 border-t border-[#E2E8F0] flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-[#1B6CA8] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
              DG
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium text-[#0F172A] truncate">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="text-[10px] text-[#94A3B8] truncate">
                {user?.id_number}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Mobile Header */}
          <div className="md:hidden bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#1B6CA8] rounded-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-white fill-none" strokeWidth="2.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                </svg>
              </div>
              <span className="text-sm font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                TrafficLens
              </span>
            </div>
            <div className="flex items-center gap-2">
              {/* Notification bell - only here on mobile */}
              <button className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center bg-white relative">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#475569] fill-none" strokeWidth="1.5">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
                <div className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full border border-white"></div>
              </button>
              <div className="w-7 h-7 rounded-full bg-[#1B6CA8] text-white text-[10px] font-bold flex items-center justify-center">
                DG
              </div>
            </div>
          </div>

          <div className="p-3 md:p-5 pb-20 md:pb-5">
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E8F0] flex items-center justify-around py-1 px-2 z-50 safe-area-bottom">
        {mobileNavItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg min-w-[56px] transition-colors ${
                active ? 'text-[#1B6CA8]' : 'text-[#94A3B8]'
              }`}
            >
              {active && (
                <div className="absolute -top-0.5 w-8 h-0.5 bg-[#1B6CA8] rounded-full" />
              )}
              <div className={`${active ? 'scale-110' : ''} transition-transform`}>
                {iconPaths[item.icon]}
              </div>
              <span className={`text-[10px] font-medium ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CitizenLayout;