import { useState } from 'react';
import CitizenLayout from '../../components/layout/CitizenLayout';
import demoUser from '../../data/demoUser';
import userIdImage from '../../assets/ID.jpg';

const Profile = () => {
  const [profilePic, setProfilePic] = useState(userIdImage);
  const [consents, setConsents] = useState({
    identity: true,
    vehicle: true,
    payment: true,
    location: true,
    notifications: true
  });

  const toggleConsent = (key) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My profile
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Personal information & privacy settings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3.5">
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="flex flex-col items-center text-center pb-3 border-b border-slate-200 mb-3">
              {/* Profile Picture with upload */}
              <div className="relative group mb-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-ca-light">
                    <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-white fill-none" strokeWidth="2">
                      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                      <circle cx="12" cy="13" r="4"/>
                    </svg>
                  </div>
                </label>
              </div>
              <div className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {demoUser.first_name} {demoUser.last_name}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                ID · {demoUser.id_number}
              </div>
            </div>

            <div className="space-y-0">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <label className="text-[11px] text-slate-400">Full name</label>
                <span className="text-xs font-medium text-slate-900">{demoUser.first_name} {demoUser.last_name}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <label className="text-[11px] text-slate-400">Date of birth</label>
                <span className="text-xs font-medium text-slate-900">
                  {new Date(demoUser.date_of_birth).toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <label className="text-[11px] text-slate-400">ID Number</label>
                <span className="text-xs font-medium text-slate-900">{demoUser.id_number}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <label className="text-[11px] text-slate-400">Email</label>
                <span className="text-xs font-medium text-slate-900">{demoUser.email}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-200">
                <label className="text-[11px] text-slate-400">Phone</label>
                <span className="text-xs font-medium text-slate-900">{demoUser.phone}</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <label className="text-[11px] text-slate-400">Address</label>
                <span className="text-xs font-medium text-slate-900">{demoUser.address}</span>
              </div>
            </div>

            <button className="w-full mt-3 py-2 bg-ca text-white border-none rounded text-xs font-medium hover:bg-ca-dark transition-colors">
              Edit profile
            </button>
          </div>

          {/* Privacy & Consents */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5">
            <div className="text-xs font-medium text-slate-900 mb-2.5">
              Privacy & data permissions
            </div>
            {[
              { key: 'identity', label: 'Identity & license data', desc: 'Required to use the platform. Used to verify your identity and license status.', required: true },
              { key: 'vehicle', label: 'Vehicle & fine records', desc: 'Required to display your vehicles and outstanding fines.', required: true },
              { key: 'payment', label: 'Payment processing', desc: 'Required to process fine payments securely via the gateway.', required: true },
              { key: 'location', label: 'Location sharing (optional)', desc: 'Allows traffic dept. to use your consented location for enforcement. POPIA s.11(1)(a) — you may withdraw at any time.', required: false },
              { key: 'notifications', label: 'Email & SMS notifications', desc: 'Receive reminders for fine due dates and license renewals.', required: false }
            ].map((item, index, arr) => (
              <div key={item.key} className={`flex items-start justify-between py-2 gap-2.5 ${index < arr.length - 1 ? 'border-b border-slate-200' : ''}`}>
                <div>
                  <div className="text-xs font-medium text-slate-900">{item.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
                <button
                  onClick={() => !item.required && toggleConsent(item.key)}
                  disabled={item.required}
                  className={`w-[34px] h-[19px] rounded-full relative shrink-0 mt-0.5 transition-colors ${
                    item.required || consents[item.key] ? 'bg-ca' : 'bg-slate-200'
                  } ${item.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className={`w-[15px] h-[15px] rounded-full bg-white absolute top-0.5 transition-all ${
                    item.required || consents[item.key] ? 'left-[17px]' : 'left-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Profile;