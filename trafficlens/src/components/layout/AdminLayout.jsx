import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const navItems = [
  {
    group: 'Operations',
    items: [
      { icon: 'map', label: 'Live Map', path: '/admin/map' },
      { icon: 'search', label: 'Verify', path: '/admin/verify' },
      { icon: 'users', label: 'Offenders', path: '/admin/offenders' },
      { icon: 'home', label: 'Roadblocks', path: '/admin/roadblocks' }
    ]
  },
  {
    group: 'Analytics',
    items: [
      { icon: 'chart', label: 'Reports', path: '/admin/reports' },
      { icon: 'activity', label: 'Activity Log', path: '/admin/activity' }
    ]
  }
];

const iconPaths = {
  map: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  search: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  users: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  home: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  chart: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  activity: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isActive = (path) => location.pathname === path;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pageTitle = () => {
    const path = location.pathname;
    if (path.includes('/map')) return 'Live violations map — Gauteng';
    if (path.includes('/verify')) return 'License & vehicle verification';
    if (path.includes('/offenders')) return 'Offender database';
    if (path.includes('/roadblocks')) return 'Roadblock management';
    if (path.includes('/reports')) return 'Enforcement reports';
    if (path.includes('/activity')) return 'Activity log';
    return 'Admin console';
  };

  const pageSubtitle = () => {
    const path = location.pathname;
    if (path.includes('/map')) return 'Updated 2 min ago · 147 active violations';
    if (path.includes('/verify')) return 'Roadside check — scan QR or enter manually';
    if (path.includes('/offenders')) return '42 registered offenders';
    if (path.includes('/roadblocks')) return '2 active roadblocks';
    if (path.includes('/reports')) return 'Gauteng Metro · April 2025';
    return '';
  };

  return (
    <div className="flex h-screen bg-adm">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-48 bg-adm2 border-r border-slate-800 flex-col shrink-0">
        {/* Logo */}
        <div className="p-3.5 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-slate-900 fill-none" strokeWidth="2.5">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                TrafficLens
              </div>
              <div className="text-[9px] text-slate-500">Admin console</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-2 flex-1 space-y-4">
          {navItems.map((group, idx) => (
            <div key={idx}>
              <div className="text-[8px] font-semibold tracking-[0.15em] text-slate-600 uppercase px-2 py-1">
                {group.group}
              </div>
              {group.items.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-[11px] mb-0.5 transition-all w-full text-left ${
                    isActive(item.path) 
                      ? 'bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-400'
                  }`}
                >
                  {iconPaths[item.icon]}
                  {item.label}
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t border-slate-800 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-[9px] font-bold text-emerald-400 shrink-0">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-medium text-slate-400 truncate">
              {user?.first_name} {user?.last_name}
            </div>
            <div className="text-[8px] text-slate-600 truncate">{user?.department || 'Metro Police'}</div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-6 h-6 rounded hover:bg-white/5 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors"
            title="Sign out"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <div className="bg-adm2 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {pageTitle()}
            </h1>
            <p className="text-[10px] text-slate-600 mt-0.5">{pageSubtitle()}</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Live badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-medium">Live</span>
            </div>
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5">
                {mobileMenuOpen ? <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/> : <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-12 left-0 right-0 bg-adm2 border-b border-slate-800 z-50 p-3">
            {navItems.map((group, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="text-[8px] font-semibold tracking-[0.15em] text-slate-600 uppercase px-2 py-1">
                  {group.group}
                </div>
                {group.items.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => { navigate(item.path); setMobileMenuOpen(false); }}
                    className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-[11px] mb-0.5 transition-all w-full text-left ${
                      isActive(item.path) 
                        ? 'bg-emerald-500/10 text-emerald-400 font-medium' 
                        : 'text-slate-500 hover:bg-white/5 hover:text-slate-400'
                    }`}
                  >
                    {iconPaths[item.icon]}
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-[11px] w-full text-left text-red-400 hover:bg-red-500/10 mt-2 border-t border-slate-800 pt-2"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Sign out
            </button>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto admin-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;