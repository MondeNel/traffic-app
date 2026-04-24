import { useState } from 'react';
import CitizenLayout from '../../components/layout/CitizenLayout';
import demoUser from '../../data/demoUser';

const Settings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    fineReminders: true,
    licenseReminders: true,
    darkMode: false,
    twoFactor: false
  });
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('Africa/Johannesburg');
  const toggleSetting = (key) => setSettings(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Settings
          </h1>
          <p className="text-[11px] text-[#94A3B8] mt-0.5">Manage your account preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-3.5">
          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <div className="text-xs font-medium text-[#0F172A] mb-3">Account information</div>
            <div className="space-y-0">
              <div className="flex justify-between items-center py-2 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Email</label>
                <span className="text-xs font-medium text-[#0F172A]">{demoUser.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Phone</label>
                <span className="text-xs font-medium text-[#0F172A]">{demoUser.phone}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className="text-xs font-medium text-[#0F172A] border border-[#E2E8F0] rounded px-2 py-1 bg-white">
                  <option value="en">English</option>
                  <option value="af">Afrikaans</option>
                  <option value="zu">isiZulu</option>
                  <option value="xh">isiXhosa</option>
                </select>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#E2E8F0]">
                <label className="text-[11px] text-[#94A3B8]">Timezone</label>
                <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="text-xs font-medium text-[#0F172A] border border-[#E2E8F0] rounded px-2 py-1 bg-white">
                  <option value="Africa/Johannesburg">SAST (UTC+2)</option>
                  <option value="Africa/Windhoek">WAST (UTC+2)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
              <div className="flex justify-between items-center py-2">
                <label className="text-[11px] text-[#94A3B8]">Password</label>
                <button className="text-xs font-medium text-[#1B6CA8] hover:text-[#0F4A7A]">Change password</button>
              </div>
            </div>
          </div>

          <div className="bg-white border border-[#E2E8F0] rounded-[10px] p-4">
            <div className="text-xs font-medium text-[#0F172A] mb-3">Notification preferences</div>
            {[
              { key: 'emailNotifications', label: 'Email notifications', desc: 'Receive notifications via email' },
              { key: 'smsNotifications', label: 'SMS notifications', desc: 'Receive notifications via SMS' },
              { key: 'fineReminders', label: 'Fine reminders', desc: 'Get reminded before fines are due' },
              { key: 'licenseReminders', label: 'License renewal reminders', desc: 'Get reminded before your license expires' },
              { key: 'darkMode', label: 'Dark mode', desc: 'Use dark theme (coming soon)' },
              { key: 'twoFactor', label: 'Two-factor authentication', desc: 'Add an extra layer of security' }
            ].map((item, index, arr) => (
              <div key={item.key} className={`flex items-center justify-between py-2.5 ${index < arr.length - 1 ? 'border-b border-[#E2E8F0]' : ''}`}>
                <div>
                  <div className="text-xs font-medium text-[#0F172A]">{item.label}</div>
                  <div className="text-[10px] text-[#94A3B8] mt-0.5">{item.desc}</div>
                </div>
                <button onClick={() => toggleSetting(item.key)} className={`w-[34px] h-[19px] rounded-full relative flex-shrink-0 transition-colors cursor-pointer ${settings[item.key] ? 'bg-[#1B6CA8]' : 'bg-[#E2E8F0]'}`}>
                  <div className={`w-[15px] h-[15px] rounded-full bg-white absolute top-0.5 transition-all ${settings[item.key] ? 'left-[17px]' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-[#FECACA] rounded-[10px] p-4">
          <div className="text-xs font-medium text-[#EF4444] mb-2">Danger zone</div>
          <p className="text-[10px] text-[#94A3B8] mb-3">Once you delete your account, there is no going back. Please be certain.</p>
          <button className="px-3 py-1.5 bg-white border border-[#FECACA] text-[#EF4444] rounded text-xs font-medium hover:bg-[#FEF2F2] transition-colors">Delete account</button>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Settings;