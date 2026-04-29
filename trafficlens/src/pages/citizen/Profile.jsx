import { useState } from 'react';
import { motion } from 'framer-motion';
import CitizenLayout from '../../components/layout/CitizenLayout';
import useAuthStore from '../../store/authStore';
import demoUser from '../../data/demoUser';

const EditProfileModal = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: userData.first_name,
    lastName: userData.last_name,
    email: userData.email,
    phone: userData.phone,
    address: userData.address,
    dateOfBirth: userData.date_of_birth,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSave(formData);
    setIsSaving(false);
    setSuccess(true);
    setTimeout(() => { setSuccess(false); onClose(); }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-ca to-ca-dark p-5 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{success ? 'Profile Updated' : 'Edit Profile'}</h2>
            {!isSaving && <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20"><svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
          </div>
        </div>
        {success ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4"><svg viewBox="0 0 24 24" className="w-8 h-8 stroke-emerald-500 fill-none" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg></div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Profile Updated!</h3>
            <p className="text-sm text-slate-500">Your information has been saved successfully.</p>
          </div>
        ) : isSaving ? (
          <div className="p-8 flex flex-col items-center gap-4"><div className="w-16 h-16 border-4 border-slate-200 border-t-ca rounded-full animate-spin" /><p className="text-sm font-semibold text-slate-900">Saving changes...</p></div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-slate-600 mb-1">First Name</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required /></div>
              <div><label className="block text-xs font-medium text-slate-600 mb-1">Last Name</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required /></div>
            </div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Address</label><input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" /></div>
            <div><label className="block text-xs font-medium text-slate-600 mb-1">Date of Birth</label><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required /></div>
            <button type="submit" className="w-full py-3 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark">Save Changes</button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const Profile = () => {
  const { user, updateProfile } = useAuthStore();
  const currentUser = user || demoUser;
  const [profilePic, setProfilePic] = useState(currentUser.profileImage || null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [consents, setConsents] = useState({ identity: true, vehicle: true, payment: true, location: false, notifications: true });
  const [saveMessage, setSaveMessage] = useState('');

  const toggleConsent = (key) => {
    setConsents(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      setSaveMessage(`${key.replace(/_/g, ' ')} ${updated[key] ? 'enabled' : 'disabled'}`);
      setTimeout(() => setSaveMessage(''), 2000);
      return updated;
    });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfilePic(base64);
        updateProfile({ profileImage: base64 });
        setSaveMessage('Profile picture updated');
        setTimeout(() => setSaveMessage(''), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (formData) => {
    updateProfile(formData);
  };

  return (
    <CitizenLayout user={currentUser}>
      <div className="flex flex-col gap-4">
        <div><h1 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My profile</h1><p className="text-[11px] text-slate-400 mt-0.5">Personal information & privacy settings</p></div>
        {saveMessage && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-slate-800 text-white text-xs px-4 py-2 rounded-lg text-center capitalize">{saveMessage}</motion.div>}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3.5">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex flex-col items-center text-center pb-3 border-b border-slate-200 mb-3">
              <div className="relative group mb-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-ca-light shadow-sm">
                    {profilePic ? <img src={profilePic} alt="Profile" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-ca flex items-center justify-center text-white text-lg font-bold">{currentUser.first_name?.[0]}{currentUser.last_name?.[0]}</div>}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>
                </label>
              </div>
              <div className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{currentUser.first_name} {currentUser.last_name}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">ID · {currentUser.id_number}</div>
            </div>
            <div className="space-y-0">
              {[{ label: 'Full name', value: `${currentUser.first_name} ${currentUser.last_name}` }, { label: 'Date of birth', value: new Date(currentUser.date_of_birth).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' }) }, { label: 'ID Number', value: currentUser.id_number }, { label: 'Email', value: currentUser.email }, { label: 'Phone', value: currentUser.phone }, { label: 'Address', value: currentUser.address }].map((item, i) => (
                <div key={i} className={`flex justify-between items-center py-1.5 ${i < 5 ? 'border-b border-slate-200' : ''}`}><label className="text-[11px] text-slate-400">{item.label}</label><span className="text-xs font-medium text-slate-900 text-right max-w-[60%] truncate">{item.value}</span></div>
              ))}
            </div>
            <button onClick={() => setShowEditModal(true)} className="w-full mt-3 py-2 bg-ca text-white border-none rounded text-xs font-medium hover:bg-ca-dark transition-colors">Edit profile</button>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="text-xs font-medium text-slate-900 mb-2.5">Privacy & data permissions</div>
            {[{ key: 'identity', label: 'Identity & license data', desc: 'Required to use the platform.', required: true }, { key: 'vehicle', label: 'Vehicle & fine records', desc: 'Required to display your vehicles and fines.', required: true }, { key: 'payment', label: 'Payment processing', desc: 'Required to process fine payments.', required: true }, { key: 'location', label: 'Location sharing (optional)', desc: 'Allows traffic dept. to use your location for enforcement.', required: false }, { key: 'notifications', label: 'Email & SMS notifications', desc: 'Receive reminders for fines and renewals.', required: false }].map((item, index, arr) => (
              <div key={item.key} className={`flex items-start justify-between py-2 gap-2.5 ${index < arr.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <div className="flex-1 min-w-0"><div className="text-xs font-medium text-slate-900">{item.label}</div><div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div></div>
                <button onClick={() => toggleConsent(item.key)} disabled={item.required} className={`w-[34px] h-[19px] rounded-full relative shrink-0 mt-0.5 transition-all duration-200 ${consents[item.key] ? 'bg-emerald-500' : 'bg-slate-300'} ${item.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}>
                  <div className={`w-[15px] h-[15px] rounded-full bg-white absolute top-0.5 shadow-sm transition-all duration-200 ${consents[item.key] ? 'left-[17px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
            <div className="mt-3 p-2 bg-slate-50 rounded-lg text-[10px] text-slate-500 text-center">
              {Object.entries(consents).filter(([key]) => key !== 'identity' && key !== 'vehicle' && key !== 'payment').map(([key, value]) => (
                <span key={key} className="mr-3 last:mr-0">{key.replace(/_/g, ' ')}: <span className={value ? 'text-emerald-600 font-medium' : 'text-slate-400'}>{value ? 'ON' : 'OFF'}</span></span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} userData={currentUser} onSave={handleProfileUpdate} />
    </CitizenLayout>
  );
};

export default Profile;