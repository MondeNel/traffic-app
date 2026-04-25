import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import useAuthStore from '../../store/authStore';

const Reports = () => {
  const { user } = useAuthStore();
  const jurisdiction = user?.jurisdiction;
  const location = jurisdiction ? `${jurisdiction.city}, ${jurisdiction.province}` : 'Johannesburg, Gauteng';

  const [timeframe, setTimeframe] = useState('month');

  const stats = {
    revenue: 482000,
    violations: 147,
    expiredDiscs: 38,
    paymentRate: 94
  };

  const monthlyData = [
    { month: 'Jan', violations: 89, revenue: 267000 },
    { month: 'Feb', violations: 104, revenue: 312000 },
    { month: 'Mar', violations: 127, revenue: 381000 },
    { month: 'Apr', violations: 147, revenue: 482000 },
  ];

  const violationTypes = [
    { type: 'Speeding', percentage: 40, color: '#FF5A5A', count: 59 },
    { type: 'Expired Disc', percentage: 26, color: '#FFB020', count: 38 },
    { type: 'Parking', percentage: 16, color: '#60A5FA', count: 24 },
    { type: 'Other', percentage: 18, color: '#334155', count: 26 },
  ];

  const recentActivity = [
    { id: 1, type: 'violation', text: 'T. Molefe — speeding fine issued on N1 Northbound', time: '2m ago', color: 'red' },
    { id: 2, type: 'payment', text: 'S. Khumalo — R 750 disc fine paid via portal', time: '14m ago', color: 'emerald' },
    { id: 3, type: 'roadblock', text: 'Roadblock confirmed — William Nicol & N1 interchange', time: '38m ago', color: 'blue' },
    { id: 4, type: 'violation', text: 'P. van der Berg — expired disc detected, Fourways', time: '1h ago', color: 'amber' },
    { id: 5, type: 'alert', text: 'Forged license alert — GP 55 ZN flagged by officer', time: '2h ago', color: 'red' },
  ];

  const getDotColor = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'amber': return 'bg-amber-500';
      case 'blue': return 'bg-blue-500';
      case 'emerald': return 'bg-emerald-500';
      default: return 'bg-slate-500';
    }
  };

  const maxViolations = Math.max(...monthlyData.map(d => d.violations));

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Enforcement reports — {location}
            </h1>
            <p className="text-[10px] text-slate-600 mt-0.5">April 2025</p>
          </div>
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/[0.02] border border-slate-800 rounded-xl p-4"
          >
            <div className="text-2xl font-bold text-emerald-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              R {(stats.revenue / 1000).toFixed(0)}K
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Revenue collected</div>
            <div className="text-[9px] text-emerald-500/50 mt-0.5">+12% from last month</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.02] border border-slate-800 rounded-xl p-4"
          >
            <div className="text-2xl font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stats.violations}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Active violations</div>
            <div className="text-[9px] text-red-500/50 mt-0.5">+16% from last month</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/[0.02] border border-slate-800 rounded-xl p-4"
          >
            <div className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stats.expiredDiscs}
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Expired discs</div>
            <div className="text-[9px] text-amber-500/50 mt-0.5">+8% from last month</div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/[0.02] border border-slate-800 rounded-xl p-4"
          >
            <div className="text-2xl font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {stats.paymentRate}%
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Payment rate</div>
            <div className="text-[9px] text-blue-500/50 mt-0.5">+2% from last month</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white/[0.02] border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">Violations by Month — 2025</h3>
            <div className="flex items-end gap-3 h-48 px-2">
              {monthlyData.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-bold text-slate-400">{month.violations}</span>
                    <span className="text-[9px] text-slate-600">R {(month.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(month.violations / maxViolations) * 100}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full bg-red-500/80 rounded-t-md hover:bg-red-500 transition-colors cursor-pointer relative group"
                    style={{ minHeight: 4 }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {month.violations} violations
                    </div>
                  </motion.div>
                  <span className="text-[10px] text-slate-500 font-medium">{month.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">Violation Types</h3>
            <div className="flex items-center gap-4">
              {/* Donut */}
              <div className="relative w-24 h-24 shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {violationTypes.reduce((acc, type, i) => {
                    const offset = violationTypes.slice(0, i).reduce((sum, t) => sum + t.percentage, 0);
                    const circumference = 100;
                    return [
                      ...acc,
                      <circle
                        key={type.type}
                        cx="50" cy="50" r="35"
                        fill="none"
                        stroke={type.color}
                        strokeWidth="16"
                        strokeDasharray={`${type.percentage} ${circumference - type.percentage}`}
                        strokeDashoffset={-offset}
                        className="opacity-80"
                      />
                    ];
                  }, [])}
                  <circle cx="50" cy="50" r="27" fill="#112030" />
                  <text x="50" y="50" textAnchor="middle" dy="4" fill="#E2E8F0" fontSize="11" fontWeight="bold" fontFamily="'Space Grotesk', sans-serif" transform="rotate(90, 50, 50)">{stats.violations}</text>
                </svg>
              </div>
              {/* Legend */}
              <div className="flex-1 space-y-2">
                {violationTypes.map((type) => (
                  <div key={type.type} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: type.color }} />
                    <span className="text-[10px] text-slate-400 flex-1">{type.type}</span>
                    <span className="text-[10px] font-bold text-slate-300">{type.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-4">
          <h3 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">Recent Activity</h3>
          <div className="space-y-0">
            {recentActivity.map((activity, i) => (
              <div key={activity.id} className={`flex items-center gap-3 py-2.5 ${i < recentActivity.length - 1 ? 'border-b border-slate-800/50' : ''}`}>
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${getDotColor(activity.color)}`} />
                <span className="text-[11px] text-slate-400 flex-1">{activity.text}</span>
                <span className="text-[10px] text-slate-600 shrink-0">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Reports;