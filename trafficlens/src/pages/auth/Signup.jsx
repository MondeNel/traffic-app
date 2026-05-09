import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuthStore();
  
  const [formData, setFormData] = useState({
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
  
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    if (!/^\d{13}$/.test(formData.idNumber)) {
      setFormError('ID number must be 13 digits');
      return false;
    }
    if (!termsAccepted) {
      setFormError('You must accept the terms and conditions');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!validateForm()) return;

    try {
      const { confirmPassword, ...signupData } = formData;
      await signup(signupData);
      navigate('/dashboard');
    } catch (err) {
      // Error handled in store
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#1B6CA8] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                TrafficLens
              </h1>
              <p className="text-xs text-[#94A3B8]">Citizen Portal</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Create your account
          </h2>
          <p className="text-sm text-[#64748B] mt-1">Join TrafficLens to manage your fines and licenses</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
          {(error || formError) && (
            <div className="mb-4 p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[#EF4444] fill-none" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-sm text-[#991B1B]">{error || formError}</p>
              <button onClick={() => { clearError(); setFormError(''); }} className="ml-auto text-[#991B1B] hover:text-[#7F1D1D]">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                  placeholder="Sipho"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#475569] mb-1.5">Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                  placeholder="Khumalo"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">ID Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                placeholder="13-digit SA ID number"
                maxLength="13"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Phone (optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                placeholder="+27 82 555 0134"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Address (optional)</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                placeholder="Your address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Date of birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                placeholder="Min. 6 characters"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#475569] mb-1.5">Confirm password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#1B6CA8] focus:border-transparent"
                placeholder="Re-enter password"
                required
              />
            </div>

            {/* Terms and Conditions – custom styled checkbox */}
            <label className="flex items-start gap-3 cursor-pointer py-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                  termsAccepted
                    ? 'border-[#1B6CA8] bg-[#1B6CA8]'
                    : 'border-[#CBD5E1] bg-white'
                }`}
              >
                {termsAccepted && (
                  <svg viewBox="0 0 24 24" className="h-3 w-3 stroke-white fill-none" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-xs text-[#64748B] leading-relaxed">
                I agree to the{' '}
                <a href="#" className="text-[#1B6CA8] underline hover:text-[#0F4A7A]">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-[#1B6CA8] underline hover:text-[#0F4A7A]">
                  Privacy Policy
                </a>
                . I understand that my personal information will be processed in accordance with POPIA.
              </span>
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1B6CA8] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-[#0F4A7A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#64748B]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#1B6CA8] font-medium hover:text-[#0F4A7A]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;