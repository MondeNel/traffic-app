import { useState } from 'react';
import CitizenLayout from '../../components/layout/CitizenLayout';

const demoData = {
  user: {
    first_name: 'Sipho',
    last_name: 'Khumalo',
    id_number: '9205125432082',
    email: 'sipho.k@gmail.com',
    phone: '+27 82 555 0134',
    address: '14 Smit St, Braamfontein',
    date_of_birth: '1992-05-12'
  }
};

const Profile = () => {
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

  return (
    <CitizenLayout user={demoData.user}>
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div>
          <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            My profile
          </h1>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">
            Personal information & privacy settings
          </p>
        </div>

        <div className="grid grid-cols-[1fr_1.4fr] gap-3.5">
          {/* Profile card */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <div className="flex flex-col items-center text-center pb-3 border-b border-[#E2E8F0] mb-3">
              <div className="w-14 h-14 rounded-full bg-[#1B6CA8] text-white text-lg font-bold flex items-center justify-center mb-2">
                SK
              </div>
              <div className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Sipho P. Khumalo
              </div>
              <div className="text-[11px] text-[#94A3B8] mt-0.5">
                ID · 9205125432082
              </div>
            </div>

            <div className="space-y-0">
              <div className="flex justify-between items-center py-1.5 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Full name</label>
                <span className="text-xs font-medium text-[#0F172A]">Sipho Petros Khumalo</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Date of birth</label>
                <span className="text-xs font-medium text-[#0F172A]">12 May 1992</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Email</label>
                <span className="text-xs font-medium text-[#0F172A]">sipho.k@gmail.com</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Phone</label>
                <span className="text-xs font-medium text-[#0F172A]">+27 82 555 0134</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Address</label>
                <span className="text-xs font-medium text-[#0F172A]">14 Smit St, Braamfontein</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <label className="text-[11px] text-[#94A3B8]">Member since</label>
                <span className="text-xs font-medium text-[#0F172A]">March 2023</span>
              </div>
            </div>

            <button className="w-full mt-3 py-2 bg-[#1B6CA8] text-white border-none rounded text-xs font-medium hover:bg-[#0F4A7A] transition-colors">
              Edit profile
            </button>
          </div>

          {/* Privacy & consents */}
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-3.5">
            <div className="text-xs font-medium text-[#0F172A] mb-2.5">
              Privacy & data permissions
            </div>

            {[
              {
                key: 'identity',
                label: 'Identity & license data',
                desc: 'Required to use the platform. Used to verify your identity and license status.',
                required: true
              },
              {
                key: 'vehicle',
                label: 'Vehicle & fine records',
                desc: 'Required to display your vehicles and outstanding fines.',
                required: true
              },
              {
                key: 'payment',
                label: 'Payment processing',
                desc: 'Required to process fine payments securely via the gateway.',
                required: true
              },
              {
                key: 'location',
                label: 'Location sharing (optional)',
                desc: 'Allows traffic dept. to use your consented location for enforcement. POPIA s.11(1)(a) — you may withdraw at any time.',
                required: false
              },
              {
                key: 'notifications',
                label: 'Email & SMS notifications',
                desc: 'Receive reminders for fine due dates and license renewals.',
                required: false
              }
            ].map((item, index, arr) => (
              <div 
                key={item.key}
                className={`flex items-start justify-between py-2 gap-2.5 ${index < arr.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}
              >
                <div>
                  <div className="text-xs font-medium text-[#0F172A]">{item.label}</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5 leading-relaxed">{item.desc}</div>
                </div>
                <button
                  onClick={() => !item.required && toggleConsent(item.key)}
                  disabled={item.required}
                  className={`w-[34px] h-[19px] rounded-full relative flex-shrink-0 mt-0.5 transition-colors ${
                    item.required || consents[item.key] ? 'bg-[#1B6CA8]' : 'bg-[#E2E8F0]'
                  } ${item.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div 
                    className={`w-[15px] h-[15px] rounded-full bg-white absolute top-0.5 transition-all ${
                      item.required || consents[item.key] ? 'left-[17px]' : 'left-0.5'
                    }`}
                  />
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