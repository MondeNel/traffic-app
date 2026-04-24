import { motion } from 'framer-motion';
import { Fingerprint, Globe, Zap, ShieldCheck, FileText, MapPin } from 'lucide-react';
import userIdImage from '../../assets/ID.jpg';

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
    vehicleRestr: 'None',
    vehicleCode: 'B',
    firstIssue: '13/10/2014',
    placeOfIssue: 'Cape Town',
    province: 'Western Cape',
    postalCode: '8800',
    issuingAuthority: 'RTMC'
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-4xl mx-auto bg-brand-card border border-white/10 rounded-[1.5rem] p-5 md:p-7 shadow-2xl overflow-hidden font-sans"
    >
      {/* Background Micro-Text Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none select-none overflow-hidden leading-none">
        {Array(30).fill("SOUTH AFRICAN DRIVERS LICENCE ").map((t, i) => (
          <div key={i} className="whitespace-nowrap text-[8px] font-black tracking-widest py-1 rotate-[-5deg]">
            {t.repeat(10)}
          </div>
        ))}
      </div>

      {/* Header Row */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-brand-neon opacity-70" />
            <span className="text-[9px] text-white/50 font-black tracking-[0.4em] uppercase">Republic of South Africa</span>
          </div>
          <p className="text-[10px] text-brand-neon/80 font-bold tracking-widest uppercase italic">Digital Driving Licence</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-[7px] text-white/30 font-black uppercase">Document No.</p>
            <p className="text-[10px] text-white font-bold">{data.docNo}</p>
          </div>
          <Fingerprint className="text-brand-neon w-8 h-8 opacity-60" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
        
        {/* Left Column: Photo & Core Identifiers */}
        <div className="md:w-[30%] space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-brand-neon/20 rounded-xl blur-md" />
            <div className="relative aspect-[3/4] bg-black rounded-xl border border-white/10 overflow-hidden shadow-inner">
              <img 
                src={userIdImage} 
                alt="David Gareth" 
                className="w-full h-full object-cover"
              />
              {/* Scanning line overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-neon/10 to-transparent h-1/2 w-full animate-scan pointer-events-none border-b border-brand-neon/40 shadow-[0_4px_10px_rgba(16,185,129,0.2)] z-10" />
            </div>
          </div>

          <div className="bg-black/40 p-4 rounded-xl border border-white/5 space-y-4">
            <div>
              <p className="text-[8px] text-brand-neon font-black uppercase tracking-widest mb-1">Lic. No. / Lisensienr.</p>
              <p className="text-white text-lg font-bold tracking-tighter">{data.licenseNo}</p>
            </div>
            <div>
              <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mb-1">Surname / Van</p>
              <p className="text-white text-3xl font-black italic tracking-tighter uppercase leading-none">{data.lastName}</p>
            </div>
          </div>
        </div>

        {/* Right Column: Data Layout */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 md:pl-8 md:border-l border-white/10">
            <div>
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">Voorname / First Names</p>
              <p className="text-white text-base font-bold">{data.firstName}</p>
            </div>
            <div>
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">Geboorte / DOB</p>
              <p className="text-white text-base font-bold">{data.dob}</p>
            </div>
            <div>
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">Gender / Geslag</p>
              <p className="text-white text-base font-bold">{data.gender}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">ID No. / ID-nr.</p>
              <p className="text-white text-base font-bold tracking-[0.15em]">{data.idNumber}</p>
            </div>
            <div>
              <p className="text-[8px] text-rose-500/80 font-black uppercase tracking-widest mb-1">Vervaldatum / Expiry</p>
              <p className="text-rose-500 text-lg font-black">{data.expiry}</p>
            </div>
          </div>

          {/* Issue Location & Details */}
          <div className="mt-8 md:pl-8 space-y-4 border-t border-white/5 pt-6">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
               <div>
                  <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Issued / Uitgereik</p>
                  <p className="text-white/60 text-xs font-bold">{data.issued}</p>
               </div>
               <div>
                  <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">First Issue / Eerste</p>
                  <p className="text-white/60 text-xs font-bold">{data.firstIssue}</p>
               </div>
               <div>
                  <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Driver Restr. / Beperk.</p>
                  <p className="text-white/60 text-xs font-bold">{data.restrictions}</p>
               </div>
            </div>
            
            {/* Location of Issue */}
            <div className="mt-3 p-3 bg-black/30 rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-3 h-3 text-brand-neon/60" />
                <p className="text-[7px] text-white/20 font-black uppercase tracking-widest">Place of Issue / Plek van Uitreiking</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">City / Stad</p>
                  <p className="text-white/80 text-sm font-bold">{data.placeOfIssue}</p>
                </div>
                <div>
                  <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Province / Provinsie</p>
                  <p className="text-white/80 text-sm font-bold">{data.province}</p>
                </div>
                <div>
                  <p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Code / Kode</p>
                  <p className="text-white/80 text-sm font-bold">{data.postalCode}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer: Codes & Digital Security */}
          <div className="mt-8 flex items-end justify-between md:pl-8">
            <div className="flex gap-8 items-end">
              <div>
                <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-2">Vehicle Codes / Kodes</p>
                <div className="flex gap-2">
                   <span className="px-3 py-1.5 bg-brand-neon text-brand-dark rounded-md text-[10px] font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                     {data.vehicleCode}
                   </span>
                   <span className="px-3 py-1.5 bg-white/5 text-white/10 rounded-md text-[10px] font-black border border-white/5">
                     EB
                   </span>
                </div>
              </div>
              <div className="flex items-center gap-2 pb-1 opacity-20">
                <FileText className="w-3 h-3 text-white" />
                <span className="text-[7px] font-bold text-white uppercase tracking-widest">Digital Auth v2.4</span>
              </div>
            </div>

            {/* Micro QR Section */}
            <div className="relative group p-1 bg-white rounded-lg shadow-xl">
               <div className="absolute top-0 left-0 w-full h-[1px] bg-brand-neon animate-scan z-10" />
               <div className="w-14 h-14" style={{ 
                background: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/4px 4px' 
              }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LicenseCard;