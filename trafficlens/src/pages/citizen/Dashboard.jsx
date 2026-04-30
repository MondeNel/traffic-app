import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CitizenLayout from '../../components/layout/CitizenLayout';
import StatsCards from '../../components/citizen/StatsCards';
import FinesList from '../../components/citizen/FinesList';
import LicenseCard from '../../components/citizen/LicenseCard';
import RenewalModal from '../../components/citizen/RenewalModal';
import PaymentModal from '../../components/citizen/PaymentModal';
import Skeleton, { StatCardSkeleton, FineRowSkeleton, LicenseCardSkeleton } from '../../components/ui/Skeleton';
import useAuthStore from '../../store/authStore';
import demoUser from '../../data/demoUser';
import usePaymentStore from '../../store/paymentStore';

const QuickAction = ({ label, icon, onClick }) => (
  <button onClick={onClick} style={{ background: 'white', border: '1px solid #E2E8F0', borderRadius: 8, padding: '8px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center', fontFamily: "'DM Sans', sans-serif" }} className="md:p-3 md:gap-7 md:rounded-[10px]"
    onMouseEnter={e => { e.currentTarget.style.borderColor = '#1B6CA8'; e.currentTarget.style.background = '#E8F2FA'; }} onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = 'white'; }}>
    <div style={{ width: 28, height: 28, borderRadius: 6, background: '#E8F2FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className="md:w-9 md:h-9 md:rounded-[9px]">
      <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, stroke: '#1B6CA8', fill: 'none', strokeWidth: 2 }} className="md:w-4 md:h-4">{icon}</svg>
    </div>
    <span style={{ fontSize: 9, fontWeight: 600, color: '#334155', lineHeight: 1.2 }} className="md:text-[10.5px]">{label}</span>
  </button>
);

const SectionHeader = ({ title, action, onAction }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
    <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{title}</span>
    {action && <button onClick={onAction} style={{ fontSize: 11, color: '#1B6CA8', fontWeight: 500, border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontFamily: "'DM Sans', sans-serif" }} onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'} onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>{action}</button>}
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const currentUser = user || demoUser;
  const [showRenewal, setShowRenewal] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedFine, setSelectedFine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fines = usePaymentStore(state => state.fines);
  const displayFines = fines.length > 0 ? fines : currentUser.fines || demoUser.fines;

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 700); return () => clearTimeout(t); }, []);

  const quickActions = [
    { label: 'Pay Fine', onClick: () => { const unpaidFine = displayFines.find(f => f.status === 'unpaid'); if (unpaidFine) { setSelectedFine(unpaidFine); setShowPayment(true); } }, icon: <><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></> },
    { label: 'Renew License', onClick: () => setShowRenewal(true), icon: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></> },
    { label: 'Renew Disc', onClick: () => navigate('/vehicles'), icon: <><rect x="1" y="9" width="22" height="11" rx="2"/><path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/></> },
    { label: 'Upload Docs', onClick: () => navigate('/documents'), icon: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></> },
  ];

  const handlePayment = async (fineId) => { await usePaymentStore.getState().processPayment(fineId); setShowPayment(false); setSelectedFine(null); };

  if (isLoading) {
    return (
      <CitizenLayout user={currentUser}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Stats skeletons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }} className="md:gap-2.5">
            <StatCardSkeleton /><StatCardSkeleton /><StatCardSkeleton />
          </div>
          {/* Quick action skeletons */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }} className="md:gap-2.5">
            {Array(4).fill(null).map((_, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-lg p-2 flex flex-col items-center gap-2 md:p-3 md:gap-7 md:rounded-[10px]">
                <Skeleton className="w-7 h-7 md:w-9 md:h-9 rounded-md" />
                <Skeleton className="h-2 w-14 md:w-16" />
              </div>
            ))}
          </div>
          {/* Fines skeletons */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-2.5 w-14" />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <FineRowSkeleton /><FineRowSkeleton /><FineRowSkeleton /><FineRowSkeleton />
            </div>
          </div>
          {/* License card skeleton */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <Skeleton className="h-3 w-36" />
              <Skeleton className="h-2.5 w-20" />
            </div>
            <LicenseCardSkeleton />
          </div>
          <div style={{ height: 8 }} />
        </div>
      </CitizenLayout>
    );
  }

  return (
    <CitizenLayout user={currentUser}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <StatsCards fines={displayFines} license={currentUser.license} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 6 }} className="md:grid-cols-4 md:gap-2.5">
          {quickActions.map(a => <QuickAction key={a.label} label={a.label} icon={a.icon} onClick={a.onClick} />)}
        </div>
        <div><SectionHeader title="Outstanding fines" action="View all" /><FinesList fines={displayFines} /></div>
        <div><SectionHeader title="Digital driver's license" action="Renew now" onAction={() => setShowRenewal(true)} /><LicenseCard user={currentUser} license={currentUser.license} /></div>
        <div style={{ height: 8 }} />
      </div>
      <RenewalModal isOpen={showRenewal} onClose={() => setShowRenewal(false)} />
      <PaymentModal isOpen={showPayment} onClose={() => { setShowPayment(false); setSelectedFine(null); }} fine={selectedFine} onPay={handlePayment} isProcessing={false} />
    </CitizenLayout>
  );
};

export default Dashboard;