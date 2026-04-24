import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from './PaymentModal';
import usePaymentStore from '../../store/paymentStore';

const fineIcons = {
  speeding: {
    bg: 'bg-red-50',
    color: '#EF4444',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  },
  expired_disc: {
    bg: 'bg-amber-50',
    color: '#F59E0B',
    icon: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>
  },
  parking: {
    bg: 'bg-blue-50',
    color: '#3B82F6',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>
  },
  traffic_light: {
    bg: 'bg-emerald-50',
    color: '#10B981',
    icon: <polyline points="9 11 12 14 22 4"/>
  }
};

const FinesList = ({ fines: initialFines = [] }) => {
  const [selectedFine, setSelectedFine] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const { fines, setFines, processPayment, isProcessing, paymentSuccess, paymentError } = usePaymentStore();

  useState(() => {
    if (initialFines.length > 0 && fines.length === 0) {
      setFines(initialFines);
    }
  });

  const displayFines = fines.length > 0 ? fines : initialFines;

  const handlePayClick = (fine) => {
    setSelectedFine(fine);
    setShowPayment(true);
  };

  const handlePayment = async (fineId) => {
    await processPayment(fineId);
    setShowPayment(false);
    setSelectedFine(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-ZA', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-emerald-500 fill-none" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Payment successful! Fine marked as paid.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-red-500 fill-none" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {paymentError}
          </motion.div>
        )}
      </AnimatePresence>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => { 
          if (!isProcessing) {
            setShowPayment(false);
            setSelectedFine(null); 
          }
        }}
        fine={selectedFine}
        onPay={handlePayment}
        isProcessing={isProcessing}
      />

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {displayFines.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">No fines found</div>
        ) : (
          displayFines.map((fine, index) => {
            const iconConfig = fineIcons[fine.fine_type] || fineIcons.traffic_light;
            const isPaid = fine.status === 'paid';

            return (
              <div 
                key={fine.id} 
                className={`flex items-center gap-2 px-3 py-2.5 transition-colors ${
                  index < displayFines.length - 1 ? 'border-b border-slate-200' : ''
                } ${isPaid ? 'bg-slate-50' : ''}`}
              >
                <div className={`w-7.5 h-7.5 rounded-md flex items-center justify-center shrink-0 ${iconConfig.bg}`}>
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none" strokeWidth="2" style={{ stroke: iconConfig.color }}>
                    {iconConfig.icon}
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium ${isPaid ? 'text-slate-400' : 'text-slate-900'}`}>
                    {fine.description}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Issued {formatDate(fine.issued_date)}
                    {fine.location && ` · ${fine.location}`}
                  </div>
                </div>

                <div 
                  className="text-[13px] font-semibold whitespace-nowrap"
                  style={{ 
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: isPaid ? '#10B981' : '#0F172A'
                  }}
                >
                  {isPaid ? 'Paid' : `R ${fine.amount.toLocaleString()}`}
                </div>

                {isPaid ? (
                  <button className="px-2.5 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[11px] whitespace-nowrap hover:bg-emerald-100 transition-colors">
                    Receipt
                  </button>
                ) : (
                  <button 
                    onClick={() => handlePayClick(fine)}
                    className="px-3 py-1.5 bg-ca text-white rounded-md text-[11px] font-medium whitespace-nowrap hover:bg-ca-dark transition-colors"
                  >
                    Pay now
                  </button>
                )}
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default FinesList;