import CitizenLayout from '../../components/layout/CitizenLayout';
import LicenseCard from '../../components/citizen/LicenseCard';
import demoUser from '../../data/demoUser';

const codes = [
  { code: 'B', description: 'Light Motor Vehicles', active: true },
  { code: 'EB', description: 'Light Articulated Vehicles', active: false },
  { code: 'C1', description: 'Heavy Motor Vehicle up to 16 000kg', active: false },
  { code: 'C', description: 'Heavy Motor Vehicle', active: false },
  { code: 'EC1', description: 'Extra Heavy Articulated up to 16 000kg', active: false },
  { code: 'EC', description: 'Extra Heavy Articulated', active: false },
  { code: 'A', description: 'Motorcycles', active: false },
];

const License = () => {
  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-[#0F172A]" style={{ fontFamily: "'Inter', sans-serif" }}>
              My driver's license
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <p className="text-[11px] text-[#64748B]">
                Status: <span className="font-medium text-[#10B981]">Valid</span> · Tap QR to verify
              </p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#1B6CA8] text-white border-none rounded-lg text-sm font-medium hover:bg-[#0F4A7A] transition-colors shadow-sm">
            Renew License
          </button>
        </div>

        <div className="bg-[#0A0A0A] rounded-2xl overflow-hidden -mx-1 p-3 md:p-4">
          <LicenseCard user={demoUser} license={demoUser.license} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
            <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Vehicle Categories & Codes</h3>
            <div className="flex flex-col gap-2">
              {codes.map((item) => (
                <div key={item.code} className={`flex items-center justify-between p-2.5 rounded-lg border ${item.active ? 'border-[#10B981]/30 bg-[#10B981]/5' : 'border-[#E2E8F0]'}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-10 text-center text-lg font-bold py-1 rounded ${item.active ? 'bg-[#10B981] text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {item.code}
                    </span>
                    <span className={`text-xs ${item.active ? 'text-[#0F172A]' : 'text-[#64748B] opacity-60'}`}>{item.description}</span>
                  </div>
                  {item.active && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#10B981]">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Restrictions & Notes</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Driver Restrictions</span>
                  <span className="text-xs font-medium text-[#0F172A]">0 (None)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Vehicle Restrictions</span>
                  <span className="text-xs font-medium text-[#0F172A]">None</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 border border-[#E2E8F0] shadow-sm">
              <h3 className="text-sm font-semibold text-[#0F172A] mb-3">Place of Issue</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">City</span>
                  <span className="text-xs font-medium text-[#0F172A]">Cape Town</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Province</span>
                  <span className="text-xs font-medium text-[#0F172A]">Western Cape</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Postal Code</span>
                  <span className="text-xs font-medium text-[#0F172A]">8800</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#64748B]">Authority</span>
                  <span className="text-xs font-medium text-[#0F172A]">RTMC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CitizenLayout>
  );
};

export default License;