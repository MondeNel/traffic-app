import { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../components/layout/AdminLayout';
import PlanRoadblockModal from '../../components/admin/PlanRoadblockModal';

const activeRoadblocks = [
  {
    id: 1,
    name: 'William Nicol & N1 Interchange',
    location: 'William Nicol Drive, Sandton',
    province: 'Gauteng',
    city: 'Johannesburg',
    date: '2025-04-25',
    startTime: '08:00',
    endTime: '16:00',
    officers: 4,
    status: 'active',
    reason: 'routine_check',
    roadType: 'Highway Interchange',
    vehiclesStopped: 87,
    finesIssued: 23,
    arrests: 1
  },
  {
    id: 2,
    name: 'Oxford Road Checkpoint',
    location: 'Oxford Road, Rosebank',
    province: 'Gauteng',
    city: 'Johannesburg',
    date: '2025-04-25',
    startTime: '10:00',
    endTime: '18:00',
    officers: 3,
    status: 'active',
    reason: 'alcohol_testing',
    roadType: 'CBD Main Road',
    vehiclesStopped: 54,
    finesIssued: 15,
    arrests: 0
  }
];

const pastRoadblocks = [
  {
    id: 3,
    name: 'N1 Southbound Checkpoint',
    location: 'N1 & Allandale Road, Midrand',
    province: 'Gauteng',
    city: 'Midrand',
    date: '2025-04-24',
    startTime: '06:00',
    endTime: '14:00',
    officers: 5,
    status: 'completed',
    reason: 'taxi_enforcement',
    roadType: 'Highway Interchange',
    vehiclesStopped: 156,
    finesIssued: 42,
    arrests: 3
  },
  {
    id: 4,
    name: 'Rivonia Road Operation',
    location: 'Rivonia Road & 5th Street, Sandton',
    province: 'Gauteng',
    city: 'Sandton',
    date: '2025-04-23',
    startTime: '20:00',
    endTime: '02:00',
    officers: 6,
    status: 'completed',
    reason: 'alcohol_testing',
    roadType: 'CBD Main Road',
    vehiclesStopped: 92,
    finesIssued: 31,
    arrests: 5
  }
];

const Roadblocks = () => {
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [roadblocks, setRoadblocks] = useState(activeRoadblocks);
  const [pastBlocks, setPastBlocks] = useState(pastRoadblocks);
  const [activeTab, setActiveTab] = useState('active');
  const [selectedRoadblock, setSelectedRoadblock] = useState(null);

  const handlePlanRoadblock = (data) => {
    const newRoadblock = {
      id: roadblocks.length + pastBlocks.length + 1,
      name: data.name || `${data.location}, ${data.city}`,
      location: data.specificLocation,
      province: data.province,
      city: data.city,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      officers: data.officers,
      status: 'active',
      reason: data.reason,
      roadType: data.roadType,
      vehiclesStopped: 0,
      finesIssued: 0,
      arrests: 0
    };
    setRoadblocks(prev => [...prev, newRoadblock]);
  };

  const displayRoadblocks = activeTab === 'active' ? roadblocks : pastBlocks;

  const getStatusBadge = (status) => {
    if (status === 'active') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  };

  const getReasonLabel = (reason) => {
    const labels = {
      routine_check: 'Routine Check',
      alcohol_testing: 'Alcohol Testing',
      taxi_enforcement: 'Taxi Enforcement',
      high_crime: 'High Crime Area',
      intelligence: 'Intelligence-Led',
      festive_season: 'Festive Season'
    };
    return labels[reason] || reason;
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-sm font-semibold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Roadblock management
            </h1>
            <p className="text-[10px] text-slate-600 mt-0.5">
              {roadblocks.length} active · {pastBlocks.length} completed · {roadblocks.length + pastBlocks.length} total
            </p>
          </div>
          <button 
            onClick={() => setShowPlanModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500 transition-colors flex items-center gap-2"
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Plan Roadblock
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-emerald-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{roadblocks.length}</div>
            <div className="text-[9px] text-slate-500">Active roadblocks</div>
          </div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {roadblocks.reduce((sum, r) => sum + r.officers, 0)}
            </div>
            <div className="text-[9px] text-slate-500">Officers deployed</div>
          </div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {[...roadblocks, ...pastBlocks].reduce((sum, r) => sum + r.finesIssued, 0)}
            </div>
            <div className="text-[9px] text-slate-500">Total fines issued</div>
          </div>
          <div className="bg-white/[0.02] border border-slate-800 rounded-xl p-3">
            <div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {[...roadblocks, ...pastBlocks].reduce((sum, r) => sum + r.arrests, 0)}
            </div>
            <div className="text-[9px] text-slate-500">Total arrests</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-800/50 rounded-lg p-0.5 mb-4 w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-1.5 rounded-md text-[11px] font-medium transition-colors ${activeTab === 'active' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-500 hover:text-slate-400'}`}
          >
            Active ({roadblocks.length})
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`px-4 py-1.5 rounded-md text-[11px] font-medium transition-colors ${activeTab === 'past' ? 'bg-slate-700 text-slate-300' : 'text-slate-500 hover:text-slate-400'}`}
          >
            Past ({pastBlocks.length})
          </button>
        </div>

        {/* Roadblocks List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayRoadblocks.map((rb) => (
            <motion.div
              key={rb.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setSelectedRoadblock(selectedRoadblock?.id === rb.id ? null : rb)}
              className={`bg-white/[0.02] border rounded-xl p-4 cursor-pointer transition-all ${
                selectedRoadblock?.id === rb.id 
                  ? 'border-emerald-500/30 bg-emerald-500/5' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">{rb.name}</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">{rb.location}</p>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[9px] font-bold border ${getStatusBadge(rb.status)}`}>
                  {rb.status === 'active' ? '● Active' : 'Completed'}
                </span>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Date</p>
                  <p className="text-[10px] text-slate-400">{new Date(rb.date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Time</p>
                  <p className="text-[10px] text-slate-400">{rb.startTime} — {rb.endTime}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Officers</p>
                  <p className="text-[10px] text-slate-400 font-bold">{rb.officers}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Type</p>
                  <p className="text-[10px] text-slate-400 capitalize">{rb.roadType}</p>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase tracking-wider">Reason</p>
                  <p className="text-[10px] text-slate-400">{getReasonLabel(rb.reason)}</p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedRoadblock?.id === rb.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-slate-800 pt-3 space-y-2"
                >
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-slate-200" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{rb.vehiclesStopped}</div>
                      <div className="text-[8px] text-slate-500">Vehicles stopped</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-amber-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{rb.finesIssued}</div>
                      <div className="text-[8px] text-slate-500">Fines issued</div>
                    </div>
                    <div className="bg-slate-800/50 rounded-lg p-2.5 text-center">
                      <div className="text-lg font-bold text-red-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{rb.arrests}</div>
                      <div className="text-[8px] text-slate-500">Arrests</div>
                    </div>
                  </div>
                  {rb.status === 'active' && (
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg text-[10px] font-bold hover:bg-red-500/25 transition-colors">
                        End Roadblock
                      </button>
                      <button className="flex-1 py-2 bg-blue-500/15 border border-blue-500/30 text-blue-400 rounded-lg text-[10px] font-bold hover:bg-blue-500/25 transition-colors">
                        Request Backup
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {displayRoadblocks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-slate-500 fill-none" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            </div>
            <h3 className="text-lg font-bold text-slate-400 mb-2">No roadblocks</h3>
            <p className="text-sm text-slate-500 mb-4">
              {activeTab === 'active' ? 'No active roadblocks. Plan one now.' : 'No past roadblocks.'}
            </p>
            {activeTab === 'active' && (
              <button onClick={() => setShowPlanModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-500">
                Plan Roadblock
              </button>
            )}
          </div>
        )}
      </div>

      <PlanRoadblockModal 
        isOpen={showPlanModal} 
        onClose={() => setShowPlanModal(false)} 
        onSubmit={handlePlanRoadblock} 
      />
    </AdminLayout>
  );
};

export default Roadblocks;