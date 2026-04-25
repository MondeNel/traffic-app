import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';

const ActivityLog = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allActivities = [
    { id: 1, type: 'violation', action: 'Fine Issued', officer: 'Officer Dlamini', detail: 'Speeding fine R1,500 issued to GP 14 KW on N1 Northbound', location: 'Sandton', time: '2025-04-25T08:15:00', icon: '⚠️', color: 'red' },
    { id: 2, type: 'payment', action: 'Payment Received', officer: 'System', detail: 'R 750 expired disc fine paid by S. Khumalo via portal', location: 'Online', time: '2025-04-25T08:02:00', icon: '💰', color: 'emerald' },
    { id: 3, type: 'roadblock', action: 'Roadblock Started', officer: 'Officer Dlamini', detail: 'William Nicol & N1 checkpoint activated — 4 officers deployed', location: 'Sandton', time: '2025-04-25T07:30:00', icon: '🚧', color: 'blue' },
    { id: 4, type: 'verification', action: 'License Verified', officer: 'Officer Dlamini', detail: 'David Gareth (020608175379081) — license valid, 2 outstanding fines', location: 'Rosebank', time: '2025-04-25T07:15:00', icon: '🔍', color: 'emerald' },
    { id: 5, type: 'alert', action: 'Forged Document', officer: 'Officer Dlamini', detail: 'GP 55 ZN flagged with forged license — suspect detained', location: 'Fourways', time: '2025-04-24T22:45:00', icon: '🚨', color: 'red' },
    { id: 6, type: 'violation', action: 'Fine Issued', officer: 'Officer Ndlovu', detail: 'Expired disc fine R900 issued to WC 31 PP', location: 'Sandton', time: '2025-04-24T20:30:00', icon: '⚠️', color: 'red' },
    { id: 7, type: 'payment', action: 'Payment Received', officer: 'System', detail: 'R 2,100 speeding fine paid by T. Molefe via EFT', location: 'Online', time: '2025-04-24T18:45:00', icon: '💰', color: 'emerald' },
    { id: 8, type: 'roadblock', action: 'Roadblock Ended', officer: 'Officer Ndlovu', detail: 'Oxford Road checkpoint completed — 54 vehicles stopped, 15 fines, 0 arrests', location: 'Rosebank', time: '2025-04-24T18:00:00', icon: '🚧', color: 'blue' },
    { id: 9, type: 'verification', action: 'License Verified', officer: 'Officer Ndlovu', detail: 'N. Khumalo — license valid, vehicle disc expired', location: 'Midrand', time: '2025-04-24T16:20:00', icon: '🔍', color: 'amber' },
    { id: 10, type: 'violation', action: 'Fine Issued', officer: 'Officer Dlamini', detail: 'Parking fine R600 issued to GP 44 LZ — Beach Road, Sea Point', location: 'Cape Town', time: '2025-04-24T15:10:00', icon: '⚠️', color: 'red' },
    { id: 11, type: 'alert', action: 'Stolen Vehicle', officer: 'Officer Dlamini', detail: 'GP 14 KW reported stolen — recovered at Rosebank', location: 'Rosebank', time: '2025-04-24T14:00:00', icon: '🚨', color: 'red' },
    { id: 12, type: 'payment', action: 'Payment Received', officer: 'System', detail: 'R 500 traffic light fine paid by A. Botha', location: 'Online', time: '2025-04-24T12:30:00', icon: '💰', color: 'emerald' },
    { id: 13, type: 'verification', action: 'License Verified', officer: 'Officer Ndlovu', detail: 'P. van der Berg — WC 31 PP, expired disc detected', location: 'Fourways', time: '2025-04-24T11:15:00', icon: '🔍', color: 'amber' },
    { id: 14, type: 'roadblock', action: 'Roadblock Started', officer: 'Officer Dlamini', detail: 'Rivonia Road checkpoint activated — 3 officers deployed', location: 'Sandton', time: '2025-04-24T10:00:00', icon: '🚧', color: 'blue' },
    { id: 15, type: 'violation', action: 'Fine Issued', officer: 'Officer Dlamini', detail: 'Speeding fine R2,500 issued to GP 21 NT on Oxford Road', location: 'Rosebank', time: '2025-04-24T09:45:00', icon: '⚠️', color: 'red' },
    { id: 16, type: 'verification', action: 'License Verified', officer: 'Officer Ndlovu', detail: 'S. Mthembu — all clear, no outstanding fines', location: 'Randburg', time: '2025-04-24T09:00:00', icon: '🔍', color: 'emerald' },
    { id: 17, type: 'payment', action: 'Payment Received', officer: 'System', detail: 'R 1,350 speeding fine paid by S. Mthembu', location: 'Online', time: '2025-04-24T08:30:00', icon: '💰', color: 'emerald' },
    { id: 18, type: 'alert', action: 'System Alert', officer: 'System', detail: 'High violation area detected — Sandton CBD, 42 violations this month', location: 'Sandton', time: '2025-04-24T07:00:00', icon: '🚨', color: 'red' },
    { id: 19, type: 'violation', action: 'Fine Issued', officer: 'Officer Dlamini', detail: 'Red light violation R1,500 — GP 82 TT, Beyers Naudé Drive', location: 'Randburg', time: '2025-04-23T20:45:00', icon: '⚠️', color: 'red' },
    { id: 20, type: 'payment', action: 'Payment Received', officer: 'System', detail: 'R 800 expired disc fine paid by G. Petersen', location: 'Online', time: '2025-04-23T18:00:00', icon: '💰', color: 'emerald' },
  ];

  const filterOptions = [
    { key: 'all', label: 'All Activity' },
    { key: 'violation', label: 'Fines Issued' },
    { key: 'payment', label: 'Payments' },
    { key: 'roadblock', label: 'Roadblocks' },
    { key: 'verification', label: 'Verifications' },
    { key: 'alert', label: 'Alerts' },
  ];

  const filteredActivities = allActivities
    .filter(a => filter === 'all' || a.type === filter)
    .filter(a => !searchQuery || 
      a.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.officer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getDotColor = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'amber': return 'bg-amber-500';
      case 'blue': return 'bg-blue-500';
      case 'emerald': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const getActionBadge = (type) => {
    switch (type) {
      case 'violation': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'payment': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'roadblock': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'verification': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'alert': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffHours < 1) return `${Math.floor(diffMs / 60000)}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Activity log
            </h1>
            <p className="text-[10px] text-slate-600 mt-0.5">
              {filteredActivities.length} entries · All officer actions and system events
            </p>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-slate-500 fill-none absolute left-3 top-1/2 -translate-y-1/2" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search activities..."
              className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {filterOptions.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-medium transition-colors ${
                  filter === opt.key
                    ? 'bg-slate-700 text-slate-200'
                    : 'bg-slate-800 text-slate-500 hover:text-slate-400 border border-slate-700'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Activity List */}
        <div className="bg-white/[0.02] border border-slate-800 rounded-xl overflow-hidden">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3">
                <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-500 fill-none" strokeWidth="1.5"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
              </div>
              <p className="text-sm text-slate-500">No activities found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800/50">
              {filteredActivities.map((activity, i) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.02 }}
                  className="flex items-start gap-3 p-3.5 hover:bg-white/[0.02] transition-colors"
                >
                  {/* Icon */}
                  <div className="text-base shrink-0 mt-0.5">{activity.icon}</div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${getActionBadge(activity.type)}`}>
                        {activity.action}
                      </span>
                      <span className="text-[10px] text-slate-500">{activity.officer}</span>
                    </div>
                    <p className="text-[11px] text-slate-300">{activity.detail}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${getDotColor(activity.color)}`} />
                        <span className="text-[9px] text-slate-600">{activity.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Time */}
                  <span className="text-[10px] text-slate-600 shrink-0 mt-1">
                    {formatTime(activity.time)}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActivityLog;