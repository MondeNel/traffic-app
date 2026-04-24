import { motion } from 'framer-motion';
import { Fingerprint, Globe, MapPin } from 'lucide-react';
import userIdImage from '../../assets/ID.jpg';
import saFlag from '../../assets/sa_flag.png';

const LicenseCard = ({ user, license }) => {
  const data = {
    firstName: user?.first_name || 'DAVID',
    lastName: user?.last_name || 'GARETH',
    idNumber: user?.id_number || '020608 1753 790 8 1',
    dob: '17/06/1996',
    gender: 'MALE', 
    issued: '29/09/2021',
    expiry: '28/09/2026',
    licenseNo: '1063003041FS',
    docNo: '1',
    restrictions: '0',
    vehicleCode: 'B',
    firstIssue: '13/10/2014',
    placeOfIssue: 'Cape Town',
    province: 'Western Cape',
    postalCode: '8800',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full mx-auto bg-white border border-slate-300 rounded-2xl p-4 md:p-6 shadow-md overflow-hidden font-sans"
    >

          {/* South Africa Flag Watermark - covers entire card */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img 
          src={saFlag} 
          alt="" 
          className="w-full h-full object-cover opacity-10"
          style={{ filter: 'grayscale(100%) brightness(0.4) contrast(1.3)' }}
        />
      </div>

      {/* Background Micro-Text Pattern */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none select-none overflow-hidden leading-none z-0">
        {Array(12).fill("SOUTH AFRICAN DRIVERS LICENCE ").map((t, i) => (
          <div key={i} className="whitespace-nowrap text-[6px] font-bold tracking-widest py-0.5 -rotate-2 text-slate-400">
            {t.repeat(8)}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-5 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-slate-500" />
            <span className="text-[9px] text-slate-500 font-bold tracking-[0.3em] uppercase">Republic of South Africa</span>
          </div>
          <h2 className="text-[11px] font-bold tracking-widest uppercase text-slate-700 mt-0.5">
            Digital Driving Licence
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[8px] text-slate-400 font-bold uppercase">Doc No.</span>
          <span className="text-xs font-bold text-slate-700">{data.docNo}</span>
          <Fingerprint className="text-slate-300 w-5 h-5 md:w-6 md:h-6" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10">
        {/* Left Column - Photo & License Info */}
        <div className="md:w-[25%] flex flex-row md:flex-col gap-4">
          <div className="relative shrink-0">
            <div className="w-[90px] h-[110px] md:w-full md:h-auto md:aspect-[3/4] rounded-lg border border-slate-300 overflow-hidden bg-slate-100">
              <img 
                src={userIdImage} 
                alt="User" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 space-y-2 md:space-y-3">
            <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Lic. No.</p>
              <p className="text-xs md:text-sm font-bold text-slate-900 tracking-tight">{data.licenseNo}</p>
            </div>
                <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">Surname</p>
              <p className="text-lg md:text-xl font-bold tracking-tight uppercase text-slate-900 leading-none" style={{ fontFamily: "'Inter', sans-serif" }}>
                {data.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3 md:pl-6 md:border-l border-slate-200">
            <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">First Names</p>
              <p className="text-xs md:text-sm font-bold text-slate-800">{data.firstName}</p>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Date of Birth</p>
              <p className="text-xs md:text-sm font-bold text-slate-800">{data.dob}</p>
            </div>
            <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Gender</p>
              <p className="text-xs md:text-sm font-bold text-slate-800">{data.gender}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">ID Number</p>
              <p className="text-xs md:text-sm font-bold text-slate-800 tracking-[0.1em]">{data.idNumber}</p>
            </div>
            <div>
              <p className="text-[8px] text-rose-500 font-bold uppercase tracking-widest mb-0.5">Expiry Date</p>
              <p className="text-sm md:text-base font-black text-rose-500">{data.expiry}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-100 md:ml-6">
            <div>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Issued</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-600">{data.issued}</p>
            </div>
            <div>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">First Issue</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-600">{data.firstIssue}</p>
            </div>
            <div>
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Restrictions</p>
              <p className="text-[10px] md:text-xs font-bold text-slate-600">{data.restrictions}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 md:ml-6">
            <div className="flex items-center gap-1.5 mb-2">
              <MapPin className="w-3 h-3 text-slate-400" />
              <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest">Place of Issue</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">City</p>
                <p className="text-[10px] md:text-xs font-bold text-slate-700">{data.placeOfIssue}</p>
              </div>
              <div>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Province</p>
                <p className="text-[10px] md:text-xs font-bold text-slate-700">{data.province}</p>
              </div>
              <div>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Code</p>
                <p className="text-[10px] md:text-xs font-bold text-slate-700">{data.postalCode}</p>
              </div>
            </div>
          </div>

          {/* Footer - Codes & QR */}
          <div className="flex items-end justify-between mt-5 pt-4 border-t border-slate-100 md:ml-6">
            <div>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1.5">Vehicle Codes</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-emerald-500 text-white rounded-md text-[10px] md:text-xs font-black shadow-sm">
                  {data.vehicleCode}
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-300 rounded-md text-[10px] md:text-xs font-black border border-slate-200">
                  EB
                </span>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white border-2 border-slate-800 rounded-xl p-2 shadow-md">
                <svg viewBox="0 0 100 100" className="w-16 h-16 md:w-20 md:h-20">
                  {[[10,10],[66,10],[10,66]].map(([x,y], i) => (
                    <g key={i}>
                      <rect x={x} y={y} width="24" height="24" rx="3" fill="#0F172A" />
                      <rect x={x+4} y={y+4} width="16" height="16" rx="2" fill="white" />
                      <rect x={x+8} y={y+8} width="8" height="8" rx="1" fill="#0F172A" />
                    </g>
                  ))}
                  {[
                    [40,10],[46,10],[52,10],[42,16],[48,16],[54,16],[40,22],[46,22],[52,22],
                    [10,40],[16,40],[22,40],[10,46],[16,46],[22,46],[10,52],[16,52],[22,52],
                    [66,40],[72,40],[78,40],[66,46],[72,46],[78,46],[66,52],[72,52],[78,52],
                    [40,66],[46,66],[52,66],[42,72],[48,72],[54,72],[40,78],[46,78],[52,78],
                    [34,34],[38,34],[44,34],[50,34],[56,34],[60,34],
                    [34,38],[60,38],[34,44],[60,44],[34,50],[60,50],
                    [34,56],[60,56],[34,60],[60,60],
                    [66,34],[72,34],[78,34],[34,66],[34,72],[34,78],
                    [42,42],[46,42],[50,42],[54,42],
                    [42,46],[54,46],[42,50],[54,50],
                    [42,54],[46,54],[50,54],[54,54],
                    [66,66],[72,66],[78,66],[66,72],[72,72],[78,72],[66,78],[72,78],[78,78],
                    [46,46],[50,46],[46,50],[50,50]
                  ].map((pos, i) => (
                    <rect key={i} x={pos[0]} y={pos[1]} width="4" height="4" rx="0.5" fill="#0F172A" opacity="0.85" />
                  ))}
                </svg>
              </div>
              <p className="text-[7px] md:text-[8px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">Scan QR</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LicenseCard;