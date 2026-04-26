import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModal from './PaymentModal';
import usePaymentStore from '../../store/paymentStore';

const FINE_ICONS = {
  speeding: {
    bg: '#FCEAEA', stroke: '#C13333',
    path: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>,
  },
  expired_disc: {
    bg: '#FDF3E4', stroke: '#B86B1A',
    path: <><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></>,
  },
  parking: {
    bg: '#E8F2FA', stroke: '#1B6CA8',
    path: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></>,
  },
  traffic_light: {
    bg: '#E6F5F0', stroke: '#0E8A5F',
    path: <polyline points="9 11 12 14 22 4"/>,
  },
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
};

const FinesList = ({ fines: initialFines = [] }) => {
  const [selectedFine, setSelectedFine] = useState(null);
  const [showPayment,  setShowPayment]  = useState(false);

  const {
    fines, setFines,
    processPayment,
    isProcessing,
    paymentSuccess,
    paymentError,
  } = usePaymentStore();

  useState(() => {
    if (initialFines.length > 0 && fines.length === 0) setFines(initialFines);
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

  return (
    <>
      {/* Toast notifications */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
              zIndex: 110,
              background: '#E6F5F0',
              border: '1px solid rgba(14,138,95,0.25)',
              color: '#0E8A5F',
              padding: '10px 16px',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: '#0E8A5F', fill: 'none', strokeWidth: 2.5 }}>
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            Payment successful — fine marked as paid.
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paymentError && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            style={{
              position: 'fixed', top: 16, left: '50%', transform: 'translateX(-50%)',
              zIndex: 110,
              background: '#FCEAEA',
              border: '1px solid rgba(193,51,51,0.25)',
              color: '#C13333',
              padding: '10px 16px',
              borderRadius: 10,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', gap: 8,
              fontSize: 13, fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, stroke: '#C13333', fill: 'none', strokeWidth: 2 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {paymentError}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div style={{
        background: 'white',
        border: '1px solid #E2E8F0',
        borderRadius: 12,
        overflow: 'hidden',
        fontFamily: "'DM Sans', sans-serif",
      }}>
        {displayFines.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8', fontSize: 12 }}>
            No fines found
          </div>
        ) : displayFines.map((fine, index) => {
          const icon    = FINE_ICONS[fine.fine_type] || FINE_ICONS.traffic_light;
          const isPaid  = fine.status === 'paid';
          const isLast  = index === displayFines.length - 1;

          return (
            <div
              key={fine.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderBottom: isLast ? 'none' : '1px solid #E2E8F0',
                background: isPaid ? '#F8FAFC' : 'white',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => { if (!isPaid) e.currentTarget.style.background = '#F8FAFC'; }}
              onMouseLeave={e => { e.currentTarget.style.background = isPaid ? '#F8FAFC' : 'white'; }}
            >
              {/* Icon */}
              <div style={{
                width: 34, height: 34,
                borderRadius: 8,
                background: icon.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, stroke: icon.stroke, fill: 'none', strokeWidth: 2 }}>
                  {icon.path}
                </svg>
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  fontSize: 12, fontWeight: 500,
                  color: isPaid ? '#94A3B8' : '#0F172A',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {fine.description}
                </div>
                <div style={{ fontSize: 10, color: '#94A3B8', marginTop: 1 }}>
                  Issued {formatDate(fine.issued_date)}
                  {fine.location && ` · ${fine.location}`}
                </div>
              </div>

              {/* Amount */}
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13, fontWeight: 600,
                color: isPaid ? '#0E8A5F' : '#0F172A',
                whiteSpace: 'nowrap',
              }}>
                {isPaid ? 'Paid' : `R ${fine.amount.toLocaleString()}`}
              </div>

              {/* Action */}
              {isPaid ? (
                <button style={{
                  padding: '5px 12px',
                  background: '#E6F5F0',
                  color: '#0E8A5F',
                  border: '1px solid rgba(14,138,95,0.2)',
                  borderRadius: 6,
                  fontSize: 11, fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  whiteSpace: 'nowrap',
                }}>
                  Receipt
                </button>
              ) : (
                <button
                  onClick={() => handlePayClick(fine)}
                  style={{
                    padding: '5px 12px',
                    background: '#1B6CA8',
                    color: 'white',
                    border: 'none',
                    borderRadius: 6,
                    fontSize: 11, fontWeight: 600,
                    cursor: 'pointer',
                    fontFamily: "'DM Sans', sans-serif",
                    whiteSpace: 'nowrap',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#145a8f'}
                  onMouseLeave={e => e.currentTarget.style.background = '#1B6CA8'}
                >
                  Pay now
                </button>
              )}
            </div>
          );
        })}
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => { if (!isProcessing) { setShowPayment(false); setSelectedFine(null); } }}
        fine={selectedFine}
        onPay={handlePayment}
        isProcessing={isProcessing}
      />
    </>
  );
};

export default FinesList;