import { useState } from 'react';
import { motion } from 'framer-motion';
import demoUser from '../../data/demoUser';

const RenewalModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: `${demoUser.first_name} ${demoUser.last_name}`,
    idNumber: demoUser.id_number,
    dob: demoUser.date_of_birth,
    address: demoUser.address,
    phone: demoUser.phone,
    email: demoUser.email,
    eyeTestFile: null,
    eyeTestName: '',
    optometristName: '',
    optometristPractice: '',
    eyeTestDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, eyeTestFile: file, eyeTestName: file.name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={isSubmitting ? undefined : onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-ca to-ca-dark p-5 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isComplete ? 'Renewal Submitted' : 'Renew Driver\'s License'}
            </h2>
            {!isSubmitting && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
          {!isComplete && (
            <div className="flex items-center gap-3 mt-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-white text-ca' : 'bg-white/20 text-white'}`}>1</div>
              <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-white' : 'bg-white/20'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-white text-ca' : 'bg-white/20 text-white'}`}>2</div>
            </div>
          )}
        </div>

        {isComplete ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-emerald-500 fill-none" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Application Submitted!</h3>
            <p className="text-sm text-slate-500 mb-4">
              Your license renewal application has been submitted. You will receive an SMS when your new license is ready for collection at your nearest DLTC.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 text-left mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Reference Number</span>
                <span className="font-mono font-bold text-ca">DL-REN-{Date.now().toString(36).toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Amount Paid</span>
                <span className="font-bold text-slate-900">R 200.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Estimated Collection</span>
                <span className="font-bold text-slate-900">4-6 weeks</span>
              </div>
            </div>
            <button onClick={onClose} className="w-full py-2.5 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark">
              Done
            </button>
          </div>
        ) : isSubmitting ? (
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-ca rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-900">Processing renewal...</p>
            <p className="text-xs text-slate-400">Submitting application to NaTIS</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500 mb-2">Step 1 of 2: Personal Details & Eye Test</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">ID Number</label>
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Residential Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
            </div>

            {/* Eye Test Section */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-amber-600 fill-none" strokeWidth="2">
                  <circle cx="12" cy="12" r="2"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                </svg>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Eye Test Results Required</span>
              </div>
              <p className="text-[10px] text-amber-700 mb-3">
                You must provide eye test results from a registered optometrist. The test must be no older than 6 months.
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Optometrist Name</label>
                  <input type="text" name="optometristName" value={formData.optometristName} onChange={handleChange} placeholder="Dr. J. Smith" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Practice Name</label>
                  <input type="text" name="optometristPractice" value={formData.optometristPractice} onChange={handleChange} placeholder="Spec-Savers Cape Town" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Date of Eye Test</label>
                  <input type="date" name="eyeTestDate" value={formData.eyeTestDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Upload Eye Test Certificate</label>
                  <label className="flex items-center gap-3 p-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-ca transition-colors bg-white">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-400 fill-none" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <span className="text-xs text-slate-500">{formData.eyeTestName || 'Click to upload PDF or image'}</span>
                    <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark">
              Continue to Payment
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500 mb-2">Step 2 of 2: Payment</p>
            
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-3">Renewal Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">License Renewal Fee</span><span className="font-bold">R 200.00</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Admin Fee</span><span className="font-bold">R 0.00</span></div>
                <div className="border-t border-slate-200 pt-2 flex justify-between"><span className="font-bold text-slate-900">Total</span><span className="font-bold text-ca text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R 200.00</span></div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400 uppercase">Account Balance</p>
                <p className="text-sm font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>R {demoUser.paymentAccount.balance.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 uppercase">{demoUser.paymentAccount.bank}</p>
                <p className="text-xs text-slate-600">{demoUser.paymentAccount.accountType}</p>
              </div>
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-ca to-ca-dark text-white rounded-xl text-sm font-bold hover:shadow-lg flex items-center justify-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Pay R 200.00
            </button>
            
            <button type="button" onClick={() => setStep(1)} className="w-full py-2 text-slate-500 text-sm hover:text-slate-700">
              ← Back to details
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default RenewalModal;