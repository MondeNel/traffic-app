import { useState } from 'react';
import CitizenLayout from '../../components/layout/CitizenLayout';
import StatsCards from '../../components/citizen/StatsCards';
import FinesList from '../../components/citizen/FinesList';
import LicenseCard from '../../components/citizen/LicenseCard';
import RenewalModal from '../../components/citizen/RenewalModal';
import demoUser from '../../data/demoUser';
import usePaymentStore from '../../store/paymentStore';

const Dashboard = () => {
  const [showRenewal, setShowRenewal] = useState(false);
  const fines = usePaymentStore(state => state.fines);
  const displayFines = fines.length > 0 ? fines : demoUser.fines;

  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Good morning, {demoUser.first_name}
          </h1>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {new Date().toLocaleDateString('en-ZA', { 
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
            })} · Last login: Today 08:14
          </p>
        </div>

        <StatsCards fines={displayFines} license={demoUser.license} />

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-900">Outstanding fines</span>
          <button className="text-[11px] text-ca hover:text-ca-dark">View all</button>
        </div>
        <FinesList fines={displayFines} />

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-slate-900">Digital license</span>
          <button 
            onClick={() => setShowRenewal(true)}
            className="text-[11px] text-ca hover:text-ca-dark"
          >
            Renew now
          </button>
        </div>
        
        <div className="bg-brand-card rounded-2xl overflow-hidden w-full">
          <LicenseCard user={demoUser} license={demoUser.license} />
        </div>
        
        <div className="h-4 md:hidden" />
      </div>

      <RenewalModal isOpen={showRenewal} onClose={() => setShowRenewal(false)} />
    </CitizenLayout>
  );
};

export default Dashboard;