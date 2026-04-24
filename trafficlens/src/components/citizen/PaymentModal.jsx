import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import demoUser from '../../data/demoUser';

const PaymentModal = ({ isOpen, onClose, fine, onPay, isProcessing }) => {
  const [cardNumber, setCardNumber] = useState(demoUser.paymentAccount.cardNumber);
  const [expiry, setExpiry] = useState(demoUser.paymentAccount.expiryDate);
  const [cvv, setCvv] = useState(demoUser.paymentAccount.cvv);
  const [name, setName] = useState(demoUser.paymentAccount.cardholderName);
  const [showProcessing, setShowProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowProcessing(true);
    onPay(fine.id);
  };

  const handleClose = () => {
    if (!isProcessing) {
      setShowProcessing(false);
      onClose();
    }
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
    if (firstDigit === '4') return { name: 'VISA', color: 'text-ca' };
    if (firstDigit === '5') return { name: 'Mastercard', color: 'text-red-500' };
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
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {showProcessing || isProcessing ? (
              /* Processing State */
              <div className="p-6">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 border-t-ca rounded-full animate-spin" />
                    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-ca fill-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-slate-900">Processing payment...</p>
                    <p className="text-xs text-slate-400 mt-1">Verifying card details with bank</p>
                  </div>
                </div>

                {/* Bank Card Preview */}
                <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl p-5 text-white shadow-xl">
                  {/* Bank name and card type */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="1.5">
                          <rect x="2" y="4" width="20" height="16" rx="2"/>
                          <line x1="2" y1="10" x2="22" y2="10"/>
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase opacity-70">
                        {demoUser.paymentAccount.bank}
                      </span>
                    </div>
                    {cardType && (
                      <span className={`text-xs font-black tracking-wider ${cardType.color}`}>
                        {cardType.name}
                      </span>
                    )}
                  </div>

                  {/* Chip */}
                  <div className="mb-5">
                    <div className="w-10 h-8 rounded-md bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-80" />
                  </div>

                  {/* Card number */}
                  <div className="text-lg font-mono tracking-[0.2em] mb-4">
                    {maskedCard}
                  </div>

                  {/* Cardholder and expiry */}
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-semibold uppercase tracking-widest opacity-50 mb-1">Cardholder</p>
                      <p className="text-xs font-medium tracking-wide uppercase">{name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-semibold uppercase tracking-widest opacity-50 mb-1">Expires</p>
                      <p className="text-xs font-mono tracking-wider">{expiry}</p>
                    </div>
                  </div>

                  {/* Animated shimmer line */}
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </div>

                {/* Transaction details */}
                <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500">Amount</span>
                    <span className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      R {fine?.amount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Reference</span>
                    <span className="text-xs font-mono text-slate-600">TL-{Date.now().toString(36).toUpperCase()}</span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 text-center mt-4">
                  Please wait while we process your payment...
                </p>
              </div>
            ) : (
              /* Payment Form */
              <>
                {/* Header */}
                <div className="bg-gradient-to-r from-ca to-ca-dark p-5 text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Pay Fine
                    </h2>
                    <button onClick={handleClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
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

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                  {/* Account summary */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">Account Balance</p>
                      <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        R {demoUser.paymentAccount.balance.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">{demoUser.paymentAccount.bank}</p>
                      <p className="text-xs text-slate-600">{demoUser.paymentAccount.accountType}</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Cardholder Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ca focus:border-transparent bg-slate-50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="4532 7891 2345 6789"
                        className="w-full px-3 py-2.5 pl-10 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ca focus:border-transparent font-mono tracking-wider bg-slate-50"
                        required
                      />
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-400 fill-none absolute left-3 top-1/2 -translate-y-1/2" strokeWidth="1.5">
                        <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                      </svg>
                      {cardType && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <span className={`text-[10px] font-bold ${cardType.color}`}>{cardType.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">Expiry Date</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={handleExpiryChange}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ca focus:border-transparent font-mono bg-slate-50"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1.5">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        placeholder="123"
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ca focus:border-transparent font-mono bg-slate-50"
                        required
                      />
                    </div>
                  </div>

                  {/* Security badges */}
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <div className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-emerald-500 fill-none" strokeWidth="2">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      SSL Secure
                    </div>
                    <div className="flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3 h-3 stroke-emerald-500 fill-none" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      </svg>
                      POPIA Compliant
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-ca to-ca-dark text-white rounded-xl text-sm font-bold hover:shadow-lg transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                    Pay R {fine?.amount?.toLocaleString()}
                  </button>

                  <p className="text-[10px] text-slate-400 text-center">
                    This is a simulated payment. No real charges will be made.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;