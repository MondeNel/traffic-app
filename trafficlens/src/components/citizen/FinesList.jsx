import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from './PaymentModal';
import usePaymentStore from '../../store/paymentStore';

const fineIcons = {
  speeding: {
    bg: '#FEF2F2',
    color: '#EF4444',
    icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  },
  expired_disc: {
    bg: '#FFFBEB',
    color: '#F59E0B',
    icon: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>
  },
  parking: {
    bg: '#EFF6FF',
    color: '#3B82F6',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>
  },
  traffic_light: {
    bg: '#ECFDF5',
    color: '#10B981',
    icon: <polyline points="9 11 12 14 22 4"/>
  }
};

const FinesList = ({ fines: initialFines = [] }) => {
  const [selectedFine, setSelectedFine] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const { fines, setFines, processPayment, isProcessing, paymentSuccess, paymentError } = usePaymentStore();

  // Initialize fines from props
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
    // Modal will close after processing
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
      {/* Success toast */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#10B981] fill-none" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Payment successful! Fine marked as paid.
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error toast */}
      <AnimatePresence>
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[110] bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm font-medium"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#EF4444] fill-none" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {paymentError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment modal */}
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

      {/* Fines list */}
      <div className="bg-white border border-[#E2E8F0] rounded-[10px] overflow-hidden">
        {displayFines.length === 0 ? (
          <div className="p-6 text-center text-[#94A3B8] text-xs">No fines found</div>
        ) : (
          displayFines.map((fine, index) => {
            const iconConfig = fineIcons[fine.fine_type] || fineIcons.traffic_light;
            const isPaid = fine.status === 'paid';

            return (
              <div 
                key={fine.id} 
                className={`flex items-center gap-2 px-3 py-2.5 transition-colors ${
                  index < displayFines.length - 1 ? 'border-b border-[#E2E8F0]' : ''
                } ${isPaid ? 'bg-[#F8FAFC]' : ''}`}
              >
                <div 
                  className="w-[30px] h-[30px] rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: iconConfig.bg }}
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-none" strokeWidth="2" style={{ stroke: iconConfig.color }}>
                    {iconConfig.icon}
                  </svg>
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-medium ${isPaid ? 'text-[#94A3B8]' : 'text-[#0F172A]'}`}>
                    {fine.description}
                  </div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">
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
                  <button className="px-2.5 py-1.5 bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] rounded-md text-[11px] whitespace-nowrap hover:bg-[#D1FAE5] transition-colors">
                    Receipt
                  </button>
                ) : (
                  <button 
                    onClick={() => handlePayClick(fine)}
                    className="px-3 py-1.5 bg-[#1B6CA8] text-white rounded-md text-[11px] font-medium whitespace-nowrap hover:bg-[#0F4A7A] transition-colors"
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