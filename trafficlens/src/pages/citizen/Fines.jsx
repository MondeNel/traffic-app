import { useState, useEffect } from 'react';
import CitizenLayout from '../../components/layout/CitizenLayout';
import FinesList from '../../components/citizen/FinesList';
import PaymentModal from '../../components/citizen/PaymentModal';
import Skeleton, { FineRowSkeleton } from '../../components/ui/Skeleton';
import useAuthStore from '../../store/authStore';
import demoUser from '../../data/demoUser';
import usePaymentStore from '../../store/paymentStore';

const SectionHeader = ({ title }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
    <span style={{ fontSize: 12, fontWeight: 600, color: '#0F172A' }}>{title}</span>
  </div>
);

const Fines = () => {
  const { user } = useAuthStore();
  const currentUser = user || demoUser;
  const [showPayment, setShowPayment] = useState(false);
  const [selectedFine, setSelectedFine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fines = usePaymentStore(state => state.fines);
  const displayFines = fines.length > 0 ? fines : currentUser.fines || demoUser.fines;

  useEffect(() => { const t = setTimeout(() => setIsLoading(false), 600); return () => clearTimeout(t); }, []);

  const unpaidCount = displayFines.filter(f => f.status === 'unpaid').length;
  const totalAmount = displayFines.filter(f => f.status === 'unpaid').reduce((sum, f) => sum + f.amount, 0);

  const handlePayment = async (fineId) => {
    await usePaymentStore.getState().processPayment(fineId);
    setShowPayment(false);
    setSelectedFine(null);
  };

  return (
    <CitizenLayout user={currentUser}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {isLoading ? (
          <>
            {/* Header skeleton */}
            <div className="space-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-2.5 w-40" />
            </div>
            {/* Section header skeleton */}
            <div className="flex items-center mb-2.5">
              <Skeleton className="h-3 w-16" />
            </div>
            {/* Fine rows skeleton */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
              <FineRowSkeleton />
              <FineRowSkeleton />
              <FineRowSkeleton />
              <FineRowSkeleton />
            </div>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Traffic fines
              </h1>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {unpaidCount} unpaid · R {totalAmount.toLocaleString()} outstanding
              </p>
            </div>
            <div>
              <SectionHeader title="All fines" />
              <FinesList fines={displayFines} />
            </div>
            <div style={{ height: 8 }} />
          </>
        )}
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => { setShowPayment(false); setSelectedFine(null); }}
        fine={selectedFine}
        onPay={handlePayment}
        isProcessing={false}
      />
    </CitizenLayout>
  );
};

export default Fines;