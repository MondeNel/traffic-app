import CitizenLayout from '../../components/layout/CitizenLayout';
import StatsCards from '../../components/citizen/StatsCards';
import FinesList from '../../components/citizen/FinesList';
import LicenseCard from '../../components/citizen/LicenseCard';
import demoUser from '../../data/demoUser';
import usePaymentStore from '../../store/paymentStore';

const Dashboard = () => {
  const fines = usePaymentStore(state => state.fines);
  const displayFines = fines.length > 0 ? fines : demoUser.fines;

  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Good morning, {demoUser.first_name}
            </h1>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              {new Date().toLocaleDateString('en-ZA', { 
                weekday: 'long', 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })} · Last login: Today 08:14
            </p>
          </div>
        </div>

        <StatsCards fines={displayFines} license={demoUser.license} />

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0F172A]">Outstanding fines</span>
          <button className="text-[11px] text-[#1B6CA8] hover:text-[#0F4A7A]">View all</button>
        </div>
        <FinesList fines={displayFines} />

        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0F172A]">Digital license</span>
          <button className="text-[11px] text-[#1B6CA8] hover:text-[#0F4A7A]">Renew now</button>
        </div>
        <LicenseCard user={demoUser} license={demoUser.license} />
      </div>
    </CitizenLayout>
  );
};

export default Dashboard;