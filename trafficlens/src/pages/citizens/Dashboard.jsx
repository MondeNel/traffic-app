import { useEffect } from 'react';
import useAuthStore from '../../store/authStore';
import CitizenLayout from '../../components/layout/CitizenLayout';
import StatsCards from '../../components/citizen/StatsCards';
import FinesList from '../../components/citizen/FinesList';
import LicenseCard from '../../components/citizen/LicenseCard';
import useCitizenStore from '../../store/citizenStore';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { fines, license, loadUserData } = useCitizenStore();

  useEffect(() => {
    if (user) {
      loadUserData(user.id);
    }
  }, [user]);

  return (
    <CitizenLayout>
      <div className="flex flex-col gap-4">
        {/* Welcome header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Good morning, {user?.first_name}
            </h1>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              {new Date().toLocaleDateString('en-ZA', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })} · Last login: Today
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg border border-[#E2E8F0] flex items-center justify-center bg-white relative">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#475569] fill-none" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full border border-white"></div>
            </button>
            <div className="w-6 h-6 rounded-full bg-[#1B6CA8] text-white text-[9px] font-bold flex items-center justify-center">
              {user?.first_name?.[0]}{user?.last_name?.[0]}
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <StatsCards fines={fines} license={license} />

        {/* Fines section */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0F172A]">Outstanding fines</span>
          <button className="text-[11px] text-[#1B6CA8] hover:text-[#0F4A7A]">View all</button>
        </div>
        <FinesList fines={fines} />

        {/* Digital license */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0F172A]">Digital license</span>
          <button className="text-[11px] text-[#1B6CA8] hover:text-[#0F4A7A]">Renew now</button>
        </div>
        <LicenseCard user={user} license={license} />
      </div>
    </CitizenLayout>
  );
};

export default Dashboard;