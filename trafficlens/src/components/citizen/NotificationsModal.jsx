import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const notificationIcons = {
  warning: {
    bg: 'bg-amber-50',
    dot: 'bg-amber-500',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-amber-500 fill-none" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    )
  },
  success: {
    bg: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-emerald-500 fill-none" strokeWidth="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    )
  },
  info: {
    bg: 'bg-blue-50',
    dot: 'bg-blue-500',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-blue-500 fill-none" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    )
  },
  error: {
    bg: 'bg-red-50',
    dot: 'bg-red-500',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-red-500 fill-none" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    )
  }
};

const NotificationsModal = ({ isOpen, onClose, notifications, onMarkRead, onMarkAllRead, onAction }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredNotifications = activeFilter === 'all' 
    ? notifications 
    : activeFilter === 'unread' 
      ? notifications.filter(n => !n.isRead) 
      : notifications.filter(n => n.isRead);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const formatTime = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
  };

  const isActionable = (notification) => {
    return notification.type === 'warning' && 
           (notification.title.includes('Fine') || notification.title.includes('Payment'));
  };

  const isLinked = (notification) => {
    return notification.title.includes('License') || 
           notification.title.includes('Vehicle');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[70vh] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 shrink-0">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Notifications
                </h2>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button 
                      onClick={onMarkAllRead}
                      className="text-[11px] text-ca hover:text-ca-dark font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                  <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-slate-100 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-500 fill-none" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="flex gap-1 bg-slate-100 rounded-lg p-0.5">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'unread', label: `Unread (${unreadCount})` },
                  { key: 'read', label: 'Read' }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`flex-1 py-1.5 rounded-md text-[11px] font-medium transition-colors ${
                      activeFilter === filter.key 
                        ? 'bg-white text-slate-900 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notification list */}
            <div className="flex-1 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-slate-400 fill-none" strokeWidth="1.5">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">No {activeFilter === 'unread' ? 'unread ' : activeFilter === 'read' ? 'read ' : ''}notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredNotifications.map((notification) => {
                    const iconConfig = notificationIcons[notification.type] || notificationIcons.info;
                    const actionable = isActionable(notification);
                    const linked = isLinked(notification);
                    
                    return (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-slate-50 transition-colors ${!notification.isRead ? 'bg-ca-light/30' : ''}`}
                      >
                        <div className="flex gap-3">
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${iconConfig.bg}`}>
                            {iconConfig.icon}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className={`text-xs font-semibold ${!notification.isRead ? 'text-slate-900' : 'text-slate-600'}`}>
                                {notification.title}
                              </h4>
                              <div className="flex items-center gap-2 shrink-0">
                                {!notification.isRead && (
                                  <div className={`w-2 h-2 rounded-full ${iconConfig.dot}`} />
                                )}
                                <span className="text-[10px] text-slate-400">
                                  {formatTime(notification.created_at)}
                                </span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                              {notification.message}
                            </p>
                            
                            {/* Action buttons */}
                            <div className="flex gap-2 mt-2">
                              {actionable && (
                                <button
                                  onClick={() => onAction && onAction(notification)}
                                  className="px-3 py-1.5 bg-ca text-white rounded-md text-[10px] font-medium hover:bg-ca-dark transition-colors"
                                >
                                  Pay now
                                </button>
                              )}
                              {linked && (
                                <button
                                  onClick={() => onMarkRead(notification.id)}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                  View details
                                </button>
                              )}
                              {!actionable && !linked && (
                                <button
                                  onClick={() => onMarkRead(notification.id)}
                                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[10px] font-medium text-slate-600 hover:bg-slate-50 transition-colors"
                                >
                                  Mark as read
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NotificationsModal;