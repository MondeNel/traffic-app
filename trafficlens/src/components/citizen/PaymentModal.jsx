import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import demoUser from '../../data/demoUser';

const PaymentModal = ({ isOpen, onClose, fine, onPay, isProcessing }) => {
  const [cardNumber, setCardNumber] = useState(demoUser.paymentAccount.cardNumber);
  const [expiry, setExpiry] = useState(demoUser.paymentAccount.expiryDate);
  const [cvv, setCvv] = useState(demoUser.paymentAccount.cvv);
  const [name, setName] = useState(demoUser.paymentAccount.cardholderName);
  const [step, setStep] = useState('review'); // 'review' | 'processing' | 'success'

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep('processing');
    
    // Simulate processing then call parent
    setTimeout(() => {
      onPay(fine.id);
      setStep('review');
    }, 1500);
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
    setExpiry(val.slice(0, 5));
  };

  const getCardType = (number) => {
    const firstDigit = number.replace(/\s/g, '')[0];
    if (firstDigit === '4') return { name: 'VISA', color: '#1B6CA8' };
    if (firstDigit === '5') return { name: 'Mastercard', color: '#EF4444' };
    return null;
  };

  const cardType = getCardType(cardNumber);
  const rawCardNumber = cardNumber.replace(/\s/g, '');
  const maskedCard = rawCardNumber.length > 8 
    ? '•••• •••• •••• ' + rawCardNumber.slice(-4)
    : cardNumber;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={step === 'review' ? onClose : undefined}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#1B6CA8] to-[#0F4A7A] p-5 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step === 'processing' ? 'Processing...' : 'Pay Fine'}
                </h2>
                {step === 'review' && (
                  <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs uppercase tracking-wider">{fine?.fine_type}</p>
                  <p className="text-sm font-medium mt-0.5">{fine?.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs">Amount</p>
                  <p className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    R {fine?.amount?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {step === 'processing' ? (
              /* Processing state */
              <div className="p-8 flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-[#E2E8F0] border-t-[#1B6CA8] rounded-full animate-spin" />
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-[#1B6CA8] fill-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <p className="text-sm font-medium text-[#475569]">Processing payment...</p>
                <p className="text-xs text-[#94A3B8]">Verifying card details with bank</p>
                
                {/* Card preview */}
                <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold tracking-wider uppercase opacity-60">
                      {demoUser.paymentAccount.bank}
                    </span>
                    {cardType && (
                      <span className="text-[10px] font-bold" style={{ color: cardType.color }}>
                        {cardType.name}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-mono tracking-widest mb-3">{maskedCard}</div>
                  <div className="flex justify-between text-[10px] opacity-60">
                    <span>{name.toUpperCase()}</span>
                    <span>{expiry}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-5 space-y-4">
                {/* Account summary */}
                <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Account Balance</p>
                    <p className="text-sm font-bold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      R {demoUser.paymentAccount.balance.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">{demoUser.paymentAccount.bank}</p>
                    <p className="text-xs text-[#475569]">{demoUser.paymentAccount.accountType}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1.5">Cardholder Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent bg-[#F8FAFC]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1.5">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      placeholder="4532 7891 2345 6789"
                      className="w-full px-3 py-2.5 pl-10 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent font-mono tracking-wider bg-[#F8FAFC]"
                      required
                    />
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#94A3B8] fill-none absolute left-3 top-1/2 -translate-y-1/2" strokeWidth="1.5">
                      <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    {cardType && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <span className="text-[10px] font-bold" style={{ color: cardType.color }}>
                          {cardType.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1.5">Expiry Date</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent font-mono bg-[#F8FAFC]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1.5">CVV</label>
                    <input
                      type="text"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                      placeholder="123"
                      className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent font-mono bg-[#F8FAFC]"
                      required
                    />
                  </div>
                </div>

                {/* Security badges */}
                <div className="flex items-center gap-3 text-[10px] text-[#94A3B8]">
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#10B981] fill-none" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    SSL Secure
                  </div>
                  <div className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-[#10B981] fill-none" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    POPIA Compliant
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-[#1B6CA8] to-[#0F4A7A] text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Pay R {fine?.amount?.toLocaleString()}
                </button>

                <p className="text-[10px] text-[#94A3B8] text-center">
                  This is a simulated payment. No real charges will be made.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;