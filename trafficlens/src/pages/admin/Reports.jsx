import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import useAuthStore from '../../store/authStore';

const Reports = () => {
  const { user } = useAuthStore();
const jurisdiction = user?.jurisdiction || { province: 'Gauteng', city: 'Johannesburg' };
const location = `${jurisdiction.city}, ${jurisdiction.province}`;

  const [timeframe, setTimeframe] = useState('month');

  // Timeframe-based data
  const timeframeData = {
    week: {
      stats: { revenue: 112000, violations: 42, expiredDiscs: 11, paymentRate: 96 },
      label: 'This Week',
      months: [
        { month: 'Mon', violations: 12, revenue: 36000 },
        { month: 'Tue', violations: 18, revenue: 54000 },
        { month: 'Wed', violations: 22, revenue: 66000 },
        { month: 'Thu', violations: 15, revenue: 45000 },
        { month: 'Fri', violations: 28, revenue: 84000 },
        { month: 'Sat', violations: 32, revenue: 96000 },
        { month: 'Sun', violations: 20, revenue: 60000 },
      ]
    },
    month: {
      stats: { revenue: 482000, violations: 147, expiredDiscs: 38, paymentRate: 94 },
      label: 'April 2025',
      months: [
        { month: 'Week 1', violations: 32, revenue: 96000 },
        { month: 'Week 2', violations: 45, revenue: 135000 },
        { month: 'Week 3', violations: 38, revenue: 114000 },
        { month: 'Week 4', violations: 32, revenue: 96000 },
      ]
    },
    quarter: {
      stats: { revenue: 1260000, violations: 420, expiredDiscs: 98, paymentRate: 91 },
      label: 'Q1 2025',
      months: [
        { month: 'Jan', violations: 89, revenue: 267000 },
        { month: 'Feb', violations: 104, revenue: 312000 },
        { month: 'Mar', violations: 127, revenue: 381000 },
      ]
    },
    year: {
      stats: { revenue: 3840000, violations: 1680, expiredDiscs: 356, paymentRate: 89 },
      label: '2025',
      months: [
        { month: 'Jan', violations: 89, revenue: 267000 },
        { month: 'Feb', violations: 104, revenue: 312000 },
        { month: 'Mar', violations: 127, revenue: 381000 },
        { month: 'Apr', violations: 147, revenue: 482000 },
        { month: 'May', violations: 132, revenue: 396000 },
        { month: 'Jun', violations: 145, revenue: 435000 },
      ]
    }
  };

  const currentData = timeframeData[timeframe];
  const maxViolations = Math.max(...currentData.months.map(d => d.violations));

  const violationTypes = [
    { type: 'Speeding', percentage: 40, color: '#FF5A5A', count: Math.round(currentData.stats.violations * 0.4) },
    { type: 'Expired Disc', percentage: 26, color: '#FFB020', count: Math.round(currentData.stats.violations * 0.26) },
    { type: 'Parking', percentage: 16, color: '#60A5FA', count: Math.round(currentData.stats.violations * 0.16) },
    { type: 'Other', percentage: 18, color: '#334155', count: Math.round(currentData.stats.violations * 0.18) },
  ];

  const recentActivities = [
    { id: 1, type: 'violation', text: 'T. Molefe — speeding fine issued on N1 Northbound · R 1,500', time: '2m ago', color: 'red' },
    { id: 2, type: 'payment', text: 'S. Khumalo — R 750 expired disc fine paid via portal', time: '14m ago', color: 'emerald' },
    { id: 3, type: 'roadblock', text: 'Roadblock confirmed — William Nicol & N1 interchange · 4 officers', time: '38m ago', color: 'blue' },
    { id: 4, type: 'violation', text: 'P. van der Berg — expired disc detected, Fourways · R 900', time: '1h ago', color: 'amber' },
    { id: 5, type: 'alert', text: 'Forged license alert — GP 55 ZN flagged by Officer Dlamini', time: '2h ago', color: 'red' },
    { id: 6, type: 'payment', text: 'A. Botha — R 600 parking fine paid, Rosebank', time: '3h ago', color: 'emerald' },
    { id: 7, type: 'violation', text: 'N. Khumalo — speeding 92km/h in 60 zone, Sandton · R 2,100', time: '4h ago', color: 'red' },
    { id: 8, type: 'payment', text: 'M. Ndlovu — R 1,200 speeding fine paid via EFT', time: '5h ago', color: 'emerald' },
    { id: 9, type: 'violation', text: 'G. Petersen — red light violation, Beyers Naudé · R 1,500', time: '6h ago', color: 'red' },
    { id: 10, type: 'roadblock', text: 'Oxford Road checkpoint completed — 54 vehicles, 15 fines', time: '8h ago', color: 'blue' },
    { id: 11, type: 'payment', text: 'L. van Wyk — R 450 parking fine paid, Fourways Mall', time: '10h ago', color: 'emerald' },
    { id: 12, type: 'violation', text: 'C. Hendricks — expired license disc, Midrand · R 750', time: '12h ago', color: 'amber' },
    { id: 13, type: 'payment', text: 'B. Naidoo — R 1,800 speeding fine paid, N1 South', time: '14h ago', color: 'emerald' },
    { id: 14, type: 'violation', text: 'K. Mokoena — illegal parking, Sandton CBD · R 600', time: '16h ago', color: 'red' },
    { id: 15, type: 'alert', text: 'Stolen vehicle recovered — GP 14 KW, Rosebank', time: '18h ago', color: 'red' },
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

const getActivityIcon = (type) => {
  switch (type) {
    case 'violation':
      return (
        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-red-400 fill-none" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
      );
    case 'payment':
      return (
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-emerald-400 fill-none" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
      );
    case 'roadblock':
      return (
        <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-blue-400 fill-none" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
      );
    case 'alert':
      return (
        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-red-400 fill-none" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-5 h-5 rounded-full bg-slate-500/20 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-slate-400 fill-none" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
          </svg>
        </div>
      );
  }
};

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
  Enforcement reports — {location}
</h1>
            <p className="text-[10px] text-slate-600 mt-0.5">{currentData.label}</p>
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
          {[
            { label: 'Revenue collected', value: `R ${(currentData.stats.revenue / 1000).toFixed(0)}K`, color: 'emerald', change: '+12%' },
            { label: 'Active violations', value: currentData.stats.violations, color: 'red', change: '+16%' },
            { label: 'Expired discs', value: currentData.stats.expiredDiscs, color: 'amber', change: '+8%' },
            { label: 'Payment rate', value: `${currentData.stats.paymentRate}%`, color: 'blue', change: '+2%' }
          ].map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-slate-800 rounded-xl p-4"
            >
              <div className={`text-2xl font-bold text-${stat.color}-400`} style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">{stat.label}</div>
              <div className={`text-[9px] text-${stat.color}-500/50 mt-0.5`}>{stat.change} from last {timeframe}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          {/* Bar Chart */}
          <div className="lg:col-span-2 bg-white/[0.02] border border-slate-800 rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-300 mb-4 uppercase tracking-wider">
              Violations — {currentData.label}
            </h3>
            <div className="flex items-end gap-3 h-48 px-2">
              {currentData.months.map((month, i) => (
                <div key={month.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] font-bold text-slate-400">{month.violations}</span>
                    <span className="text-[9px] text-slate-600">R {(month.revenue / 1000).toFixed(0)}K</span>
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(month.violations / maxViolations) * 100}%` }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="w-full rounded-t-md cursor-pointer relative group"
                    style={{ 
                      minHeight: 4,
                      background: `linear-gradient(to top, rgba(255,90,90,0.8), rgba(255,90,90,0.4))`
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[9px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {month.violations} violations · R {(month.revenue / 1000).toFixed(0)}K
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
            <div className="flex flex-col items-center gap-4">
              {/* Donut */}
              <div className="relative w-28 h-28">
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
                  <text x="50" y="48" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontWeight="bold" fontFamily="'Space Grotesk', sans-serif" transform="rotate(90, 50, 50)">
                    {currentData.stats.violations}
                  </text>
                  <text x="50" y="58" textAnchor="middle" fill="#64748B" fontSize="6" fontWeight="bold" transform="rotate(90, 50, 50)">TOTAL</text>
                </svg>
              </div>
              {/* Legend */}
              <div className="w-full space-y-2">
                {violationTypes.map((type) => (
                  <div key={type.type} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: type.color }} />
                    <span className="text-[10px] text-slate-400 flex-1">{type.type}</span>
                    <span className="text-[9px] text-slate-500">{type.count}</span>
                    <span className="text-[10px] font-bold text-slate-300 w-8 text-right">{type.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Recent Activity</h3>
            <span className="text-[9px] text-slate-600">{recentActivities.length} entries</span>
          </div>
          <div className="space-y-0 max-h-[400px] overflow-y-auto">
            {recentActivities.map((activity, i) => (
  <div key={activity.id} className={`flex items-center gap-3 py-2.5 ${i < recentActivities.length - 1 ? 'border-b border-slate-800/50' : ''}`}>
    {getActivityIcon(activity.type)}
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