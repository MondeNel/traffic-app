import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Landing = () => {
  const navigate = useNavigate();
  const { register, loginCitizen, loginAdmin, isLoading, error, clearError } = useAuthStore();
  
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register' | 'admin'
  const [showPassword, setShowPassword] = useState(false);
  
  // Citizen login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form
  const [regForm, setRegForm] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: ''
  });
  const [regError, setRegError] = useState('');
  
  // Admin login form
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminBadge, setAdminBadge] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError('');
    
    if (regForm.password !== regForm.confirmPassword) {
      setRegError('Passwords do not match');
      return;
    }
    if (regForm.password.length < 6) {
      setRegError('Password must be at least 6 characters');
      return;
    }
    if (!/^\d{13}$/.test(regForm.idNumber)) {
      setRegError('ID number must be 13 digits');
      return;
    }

    try {
      await register(regForm);
      navigate('/dashboard');
    } catch (err) {
      // Error handled in store
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginCitizen(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (err) {
      // Error handled in store
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      await loginAdmin(adminEmail, adminPassword, adminBadge);
      navigate('/admin/map');
    } catch (err) {
      // Error handled in store
    }
  };

  const handleRegChange = (e) => {
    setRegForm({ ...regForm, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-ca rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                TrafficLens
              </h1>
              <p className="text-[10px] text-slate-400">South Africa's Traffic Management Portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Tab Switcher */}
          <div className="flex gap-1 bg-white border border-slate-200 rounded-xl p-1 mb-6 shadow-sm">
            {[
              { key: 'login', label: 'Citizen Login' },
              { key: 'register', label: 'Register' },
              { key: 'admin', label: 'Admin Portal' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); clearError(); setRegError(''); }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.key 
                    ? 'bg-ca text-white shadow-md' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Forms */}
          <AnimatePresence mode="wait">
            {activeTab === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Welcome back
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
                </div>

                {(error) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-red-500 fill-none shrink-0" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="text-sm text-red-700">{error}</p>
                    <button onClick={clearError} className="ml-auto text-red-500 hover:text-red-700">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Email</label>
                    <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="david.gareth@gmail.com" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ca focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1.5">Password</label>
                    <div className="relative">
                      <input type={showPassword ? 'text' : 'password'} value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter password" className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ca focus:border-transparent" required />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-slate-400 fill-none" strokeWidth="2">
                          {showPassword ? (
                            <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></>
                          ) : (
                            <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>
                          )}
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading}
                    className="w-full py-3 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</> : 'Sign in'}
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Don't have an account?{' '}
                  <button onClick={() => setActiveTab('register')} className="text-ca font-medium hover:text-ca-dark">
                    Register here
                  </button>
                </p>
              </motion.div>
            )}

            {activeTab === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm"
              >
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Create your account
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">Join TrafficLens to manage fines and licenses</p>
                </div>

                {(error || regError) && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-red-500 fill-none shrink-0" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="text-sm text-red-700">{error || regError}</p>
                    <button onClick={() => { clearError(); setRegError(''); }} className="ml-auto text-red-500">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">First name</label>
                      <input type="text" name="firstName" value={regForm.firstName} onChange={handleRegChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Last name</label>
                      <input type="text" name="lastName" value={regForm.lastName} onChange={handleRegChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">ID Number (13 digits)</label>
                    <input type="text" name="idNumber" value={regForm.idNumber} onChange={handleRegChange}
                      maxLength={13} placeholder="9205125432082"
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Email</label>
                    <input type="email" name="email" value={regForm.email} onChange={handleRegChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Phone (optional)</label>
                      <input type="tel" name="phone" value={regForm.phone} onChange={handleRegChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Date of birth</label>
                      <input type="date" name="dateOfBirth" value={regForm.dateOfBirth} onChange={handleRegChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-600 mb-1">Address</label>
                    <input type="text" name="address" value={regForm.address} onChange={handleRegChange}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Password</label>
                      <input type="password" name="password" value={regForm.password} onChange={handleRegChange}
                        placeholder="Min. 6 characters" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-600 mb-1">Confirm password</label>
                      <input type="password" name="confirmPassword" value={regForm.confirmPassword} onChange={handleRegChange}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm" required />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoading}
                    className="w-full py-3 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isLoading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</> : 'Create account'}
                  </button>
                </form>

                <p className="text-center text-xs text-slate-500 mt-4">
                  Already have an account?{' '}
                  <button onClick={() => setActiveTab('login')} className="text-ca font-medium hover:text-ca-dark">
                    Sign in
                  </button>
                </p>
              </motion.div>
            )}

            {activeTab === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-xl"
              >
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-emerald-400 fill-none" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    Admin Portal
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Authorized personnel only</p>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-red-400 fill-none shrink-0" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p className="text-sm text-red-400">{error}</p>
                    <button onClick={clearError} className="ml-auto text-red-400 hover:text-red-300">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Email</label>
                    <input type="email" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="officer.dlamini@trafficlens.gov.za"
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Password</label>
                    <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-400 mb-1.5">Badge Number (optional)</label>
                    <input type="text" value={adminBadge} onChange={(e) => setAdminBadge(e.target.value)}
                      placeholder="JMPD-4421"
                      className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" />
                  </div>
                  <button type="submit" disabled={isLoading}
                    className="w-full py-3 bg-emerald-500 text-slate-900 rounded-xl text-sm font-bold hover:bg-emerald-400 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {isLoading ? <><div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" /> Authenticating...</> : 'Access Admin Portal'}
                  </button>
                </form>

                <div className="mt-4 p-3 bg-slate-800 rounded-lg">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Demo Credentials</p>
                  <div className="space-y-1 text-xs text-slate-400">
                    <p>Email: <span className="text-slate-300 font-mono">officer.dlamini@trafficlens.gov.za</span></p>
                    <p>Password: <span className="text-slate-300 font-mono">admin123</span></p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Landing;