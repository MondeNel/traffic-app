import CitizenLayout from '../../components/layout/CitizenLayout';
import StatsCards from '../../components/citizen/StatsCards';
import FinesList from '../../components/citizen/FinesList';
import LicenseCard from '../../components/citizen/LicenseCard';

// Hardcoded demo data
const demoData = {
  user: {
    first_name: 'Sipho',
    last_name: 'Khumalo',
    id_number: '9205125432082',
    email: 'sipho.k@gmail.com',
    phone: '+27 82 555 0134',
    address: '14 Smit St, Braamfontein',
    date_of_birth: '1992-05-12'
  },
  license: {
    license_number: 'ZA-DL-0298431',
    license_expiry: '2025-06-04',
    vehicle_codes: 'B'
  },
  fines: [
    {
      id: 1,
      fine_type: 'speeding',
      description: 'Speeding — N1 Johannesburg',
      amount: 1500,
      location: 'N1 Johannesburg',
      issued_date: '2025-04-12',
      due_date: '2025-05-12',
      status: 'unpaid',
      plate_number: 'GP 82 TT'
    },
    {
      id: 2,
      fine_type: 'expired_disc',
      description: 'Expired disc — GP 82 TT',
      amount: 750,
      location: 'Sandton CBD',
      issued_date: '2025-03-28',
      due_date: '2025-04-28',
      status: 'unpaid',
      plate_number: 'GP 82 TT'
    },
    {
      id: 3,
      fine_type: 'parking',
      description: 'No-parking zone — Rosebank',
      amount: 600,
      location: 'Oxford Road, Rosebank',
      issued_date: '2025-04-01',
      due_date: '2025-05-01',
      status: 'unpaid',
      plate_number: null
    },
    {
      id: 4,
      fine_type: 'traffic_light',
      description: 'Traffic light — Fourways',
      amount: 500,
      location: 'Fourways',
      issued_date: '2025-01-15',
      due_date: '2025-02-15',
      status: 'paid',
      paid_date: '2025-02-05',
      plate_number: null
    }
  ]
};

const Dashboard = () => {
  return (
    <CitizenLayout user={demoData.user}>
      <div className="flex flex-col gap-4">
        {/* Welcome header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Good morning, {demoData.user.first_name}
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
          <div className="flex items-center gap-2">
            <button className="w-7 h-7 rounded-lg border border-[#E2E8F0] flex items-center justify-center bg-white relative">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-[#475569] fill-none" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#EF4444] rounded-full border border-white"></div>
            </button>
            <div className="w-6 h-6 rounded-full bg-[#1B6CA8] text-white text-[9px] font-bold flex items-center justify-center">
              {demoData.user.first_name[0]}{demoData.user.last_name[0]}
            </div>
          </div>
        </div>

        {/* Stats cards */}
        <StatsCards fines={demoData.fines} license={demoData.license} />

        {/* Fines section */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0F172A]">Outstanding fines</span>
          <button className="text-[11px] text-[#1B6CA8] hover:text-[#0F4A7A]">View all</button>
        </div>
        <FinesList fines={demoData.fines} />

        {/* Digital license */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-[#0F172A]">Digital license</span>
          <button className="text-[11px] text-[#1B6CA8] hover:text-[#0F4A7A]">Renew now</button>
        </div>
        <LicenseCard user={demoData.user} license={demoData.license} />
      </div>
    </CitizenLayout>
  );
};

export default Dashboard;