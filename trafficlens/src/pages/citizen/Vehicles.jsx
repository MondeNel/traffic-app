import CitizenLayout from '../../components/layout/CitizenLayout';

const demoData = {
  user: {
    first_name: 'David',
    last_name: 'Gareth',
    id_number: '020608175379081'
  },
  vehicles: [
    {
      id: 1,
      plate_number: 'GP 82 TT',
      make: 'Toyota',
      model: 'Corolla',
      year: 2019,
      engine: '1.8L Petrol',
      disc_expiry: '2025-04-28',
      registered_date: '2021-08-14',
      status: 'warning'
    },
    {
      id: 2,
      plate_number: 'GP 14 KW',
      make: 'Volkswagen',
      model: 'Polo',
      year: 2022,
      engine: '1.0L TSI',
      disc_expiry: '2026-02-01',
      registered_date: '2022-03-03',
      status: 'ok'
    }
  ]
};

const Vehicles = () => {
  return (
    <CitizenLayout user={demoData.user}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              My vehicles
            </h1>
            <p className="text-[11px] text-[#94A3B8] mt-0.5">
              {demoData.vehicles.length} registered vehicles
            </p>
          </div>
          <button className="px-3 py-1.5 bg-[#1B6CA8] text-white border-none rounded text-xs font-medium hover:bg-[#0F4A7A] transition-colors">
            + Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {demoData.vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white border border-[#E2E8F0] rounded-[10px] p-3.5 flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#E8F3FB] flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-[#1B6CA8] fill-none" strokeWidth="2">
                    <rect x="1" y="9" width="22" height="11" rx="2"/>
                    <path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/>
                    <circle cx="7" cy="17" r="1.5"/>
                    <circle cx="17" cy="17" r="1.5"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-[#0F172A]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {vehicle.plate_number}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] truncate">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold flex-shrink-0 ${
                  vehicle.status === 'ok' 
                    ? 'bg-[#ECFDF5] text-[#059669]' 
                    : 'bg-[#FFFBEB] text-[#B45309]'
                }`}>
                  {vehicle.status === 'ok' ? 'All clear' : 'Disc expiring'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#E2E8F0]">
                <div>
                  <label className="text-[9px] text-[#94A3B8] uppercase tracking-wider block">Disc expires</label>
                  <span className={`text-xs font-medium mt-0.5 block ${
                    vehicle.status === 'ok' ? 'text-[#10B981]' : 'text-[#F59E0B]'
                  }`}>
                    {new Date(vehicle.disc_expiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] text-[#94A3B8] uppercase tracking-wider block">Fines</label>
                  <span className={`text-xs font-medium mt-0.5 block ${
                    vehicle.status === 'ok' ? 'text-[#10B981]' : 'text-[#F59E0B]'
                  }`}>
                    {vehicle.status === 'ok' ? 'None' : 'R 750'}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] text-[#94A3B8] uppercase tracking-wider block">Registered</label>
                  <span className="text-xs font-medium text-[#10B981] mt-0.5 block">
                    {new Date(vehicle.registered_date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] text-[#94A3B8] uppercase tracking-wider block">Engine</label>
                  <span className="text-xs font-medium text-[#0F172A] mt-0.5 block">
                    {vehicle.engine}
                  </span>
                </div>
              </div>

              {vehicle.status === 'warning' ? (
                <button className="w-full py-2 bg-[#1B6CA8] text-white border-none rounded text-xs font-medium hover:bg-[#0F4A7A] transition-colors">
                  Renew disc — R 120
                </button>
              ) : (
                <button className="w-full py-2 bg-white border border-[#E2E8F0] rounded text-xs text-[#475569] hover:bg-[#F8FAFC] transition-colors">
                  View details
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </CitizenLayout>
  );
};

export default Vehicles;