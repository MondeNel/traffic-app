import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const navItems = [
  { group: 'Operations', items: [
    { icon: 'map', label: 'Live Map', path: '/admin/map' },
    { icon: 'search', label: 'Verify', path: '/admin/verify' },
    { icon: 'users', label: 'Offenders', path: '/admin/offenders' },
    { icon: 'home', label: 'Roadblocks', path: '/admin/roadblocks' }
  ]},
  { group: 'Analytics', items: [
    { icon: 'chart', label: 'Reports', path: '/admin/reports' },
    { icon: 'activity', label: 'Activity Log', path: '/admin/activity' }
  ]}
];

const mobileNavItems = [
  { icon: 'map', label: 'Map', path: '/admin/map' },
  { icon: 'search', label: 'Verify', path: '/admin/verify' },
  { icon: 'users', label: 'Offenders', path: '/admin/offenders' },
  { icon: 'chart', label: 'Reports', path: '/admin/reports' },
  { icon: 'home', label: 'Blocks', path: '/admin/roadblocks' }
];

const iconPaths = {
  map: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>,
  search: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  users: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>,
  home: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  chart: <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.5"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  activity: <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
};

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const isActive = (path) => location.pathname === path;
  const [menuOpen, setMenuOpen] = useState(false);
  const jurisdiction = user?.jurisdiction;

  const handleLogout = () => { logout(); navigate('/'); };

  const pageTitle = () => {
    const loc = jurisdiction ? `${jurisdiction.city}, ${jurisdiction.province}` : 'Gauteng';
    const path = location.pathname;
    if (path.includes('/map')) return `Live violations map — ${loc}`;
    if (path.includes('/verify')) return 'License & vehicle verification';
    if (path.includes('/offenders')) return 'Offender database';
    if (path.includes('/roadblocks')) return 'Roadblock management';
    if (path.includes('/reports')) return `Enforcement reports — ${loc}`;
    return 'Admin console';
  };

  const pageSubtitle = () => {
    const path = location.pathname;
    if (path.includes('/map')) return 'Updated 2 min ago · 147 active violations';
    if (path.includes('/verify')) return 'Roadside check — scan QR or enter manually';
    if (path.includes('/offenders')) return '42 registered offenders';
    if (path.includes('/roadblocks')) return '2 active roadblocks';
    if (path.includes('/reports')) return 'April 2025';
    return '';
  };

  return (
    <div className="flex flex-col h-screen bg-adm">
      {/* Top Bar */}
      <div className="bg-adm2 border-b border-slate-800 px-4 py-3 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden w-8 h-8 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400">
            {menuOpen ? (
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            )}
          </button>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{pageTitle()}</h1>
            <p className="text-[10px] text-slate-600 mt-0.5">{pageSubtitle()}</p>
          </div>
          <div className="md:hidden">
            <h1 className="text-sm font-semibold text-slate-200 truncate max-w-[180px]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TrafficLens Admin</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-emerald-400 font-medium hidden sm:inline">Live</span>
          </div>
          <button onClick={handleLogout} className="md:hidden w-7 h-7 rounded-lg border border-slate-700 flex items-center justify-center text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-colors" title="Sign out">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          </button>
          <div className="hidden md:flex w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/40 items-center justify-center text-[9px] font-bold text-emerald-400 shrink-0">
            {user?.first_name?.[0]}{user?.last_name?.[0]}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-48 bg-adm2 border-r border-slate-800 flex-col shrink-0">
          <div className="p-3.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-slate-900 fill-none" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TrafficLens</div>
                <div className="text-[9px] text-slate-500">Admin console</div>
              </div>
            </div>
          </div>
          <nav className="p-2 flex-1 space-y-4">
            {navItems.map((group, idx) => (
              <div key={idx}>
                <div className="text-[8px] font-semibold tracking-[0.15em] text-slate-600 uppercase px-2 py-1">{group.group}</div>
                {group.items.map((item) => (
                  <button key={item.path} onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-[11px] mb-0.5 transition-all w-full text-left ${isActive(item.path) ? 'bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20' : 'text-slate-500 hover:bg-white/5 hover:text-slate-400'}`}>
                    {iconPaths[item.icon]}{item.label}
                  </button>
                ))}
              </div>
            ))}
          </nav>
          <div className="p-3 border-t border-slate-800 flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-[9px] font-bold text-emerald-400 shrink-0">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium text-slate-400 truncate">{user?.first_name} {user?.last_name}</div>
              <div className="text-[8px] text-slate-600 truncate">{user?.department || 'Metro Police'}</div>
            </div>
            <button onClick={handleLogout} className="w-6 h-6 rounded hover:bg-white/5 flex items-center justify-center text-slate-600 hover:text-red-400 transition-colors" title="Sign out">
              <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-current fill-none" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
            </button>
          </div>
        </div>

        {/* Mobile Slide-out Menu */}
        {menuOpen && (
          <div className="md:hidden fixed top-12 left-0 bottom-0 w-56 bg-adm2 border-r border-slate-800 z-50 overflow-y-auto">
            <div className="p-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-emerald-500 rounded-md flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-slate-900 fill-none" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                </div>
                <div><div className="text-xs font-semibold text-slate-300" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>TrafficLens</div><div className="text-[9px] text-slate-500">Admin console</div></div>
              </div>
            </div>
            <nav className="p-2 space-y-4">
              {navItems.map((group, idx) => (
                <div key={idx}>
                  <div className="text-[8px] font-semibold tracking-[0.15em] text-slate-600 uppercase px-2 py-1">{group.group}</div>
                  {group.items.map((item) => (
                    <button key={item.path} onClick={() => { navigate(item.path); setMenuOpen(false); }}
                      className={`flex items-center gap-2 px-2 py-2.5 rounded-md cursor-pointer text-[11px] mb-0.5 transition-all w-full text-left ${isActive(item.path) ? 'bg-emerald-500/10 text-emerald-400 font-medium' : 'text-slate-500 hover:bg-white/5 hover:text-slate-400'}`}>
                      {iconPaths[item.icon]}{item.label}
                    </button>
                  ))}
                </div>
              ))}
            </nav>
            <div className="p-3 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-[9px] font-bold text-emerald-400 shrink-0">{user?.first_name?.[0]}{user?.last_name?.[0]}</div>
                <div className="flex-1 min-w-0"><div className="text-[10px] font-medium text-slate-400 truncate">{user?.first_name} {user?.last_name}</div><div className="text-[8px] text-slate-600 truncate">{user?.department || 'Metro Police'}</div></div>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-2 py-2 rounded-md cursor-pointer text-[11px] w-full text-left text-red-400 hover:bg-red-500/10">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="1.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign out
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto admin-scrollbar">{children}</div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-adm2 border-t border-slate-800 flex items-center justify-around py-1 px-2 z-50 safe-area-bottom">
        {mobileNavItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button key={item.path} onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-0.5 py-1 px-1.5 rounded-lg min-w-[48px] transition-colors ${active ? 'text-emerald-400' : 'text-slate-500'}`}>
              {active && <div className="absolute -top-0.5 w-6 h-0.5 bg-emerald-400 rounded-full" />}
              <div className={`${active ? 'scale-110' : ''} transition-transform`}>{iconPaths[item.icon]}</div>
              <span className={`text-[9px] font-medium ${active ? 'font-semibold' : ''}`}>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLayout;