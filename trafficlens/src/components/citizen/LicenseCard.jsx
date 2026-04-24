import { motion } from 'framer-motion';
import { Fingerprint, Globe, ShieldCheck, FileText, MapPin } from 'lucide-react';
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
      className="relative w-full mx-auto border border-white/10 rounded-3xl p-4 md:p-6 shadow-2xl overflow-hidden font-sans"
    >
      {/* South Africa Flag Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img 
          src={saFlag} 
          alt="" 
          className="w-full h-full object-cover opacity-[0.04]"
          style={{ filter: 'grayscale(100%) brightness(1.5)' }}
        />
      </div>

      {/* South Africa Map Outline */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <svg viewBox="0 0 400 350" className="w-[60%] h-[60%] fill-white opacity-[0.03]">
          <path d="M195 48 C188 44 170 38 158 40 C142 42 130 36 122 42 C114 48 98 52 92 48 C86 44 72 48 66 54 C60 60 54 58 52 64 C50 70 42 74 38 80 C34 86 28 88 30 94 C32 100 28 108 31 114 C34 120 30 128 34 136 C38 144 32 152 36 160 C40 168 44 172 48 178 C52 184 58 190 64 196 C70 202 74 210 80 216 C86 222 88 230 94 236 C100 242 108 248 116 250 C124 252 132 256 140 254 C148 252 158 250 166 248 C174 246 182 242 190 240 C198 238 206 234 212 230 C218 226 228 224 234 218 C240 212 244 206 248 198 C252 190 254 180 252 172 C250 164 248 156 244 148 C240 140 238 132 234 124 C230 116 228 108 224 100 C220 92 218 84 214 76 C210 68 208 62 204 56 C200 50 202 48 195 48Z M158 62 C152 62 146 66 142 70 C138 74 132 76 130 82 C128 88 126 94 124 100 C122 106 120 112 122 118 C124 124 120 130 118 136 C116 142 114 148 116 154 C118 160 116 166 118 172 C120 178 124 182 128 186 C132 190 138 192 144 194 C150 196 156 196 162 194 C168 192 174 188 178 184 C182 180 188 178 192 174 C196 170 198 164 200 158 C202 152 204 146 204 140 C204 134 206 128 204 122 C202 116 202 110 200 104 C198 98 196 92 192 86 C188 80 184 74 178 70 C172 66 166 62 158 62Z" />
          <path d="M225 138 C230 132 236 128 238 122 C240 116 242 110 240 104 C238 98 234 94 228 92 C222 90 216 92 214 98 C212 104 214 112 218 118 C222 124 222 132 225 138Z" className="fill-brand-card" />
          <path d="M250 110 C254 106 260 104 264 100 C268 96 270 92 268 88 C266 84 260 82 254 84 C248 86 244 90 246 96 C248 102 248 106 250 110Z" className="fill-brand-card" />
        </svg>
      </div>

      {/* Background Micro-Text Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden leading-none z-0">
        {Array(20).fill("SOUTH AFRICAN DRIVERS LICENCE ").map((t, i) => (
          <div key={i} className="whitespace-nowrap text-[8px] font-black tracking-widest py-1 -rotate-2">
            {t.repeat(10)}
          </div>
        ))}
      </div>

      {/* Header Row */}
      <div className="flex justify-between items-start mb-4 md:mb-6 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-brand-neon opacity-70" />
            <span className="text-[9px] text-white/50 font-black tracking-[0.4em] uppercase">Republic of South Africa</span>
          </div>
          <p className="text-[10px] text-brand-neon/80 font-bold tracking-widest uppercase italic">Digital Driving Licence</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[7px] text-white/30 font-black uppercase">Document No.</p>
            <p className="text-[10px] text-white font-bold">{data.docNo}</p>
          </div>
          <Fingerprint className="text-brand-neon w-6 h-6 md:w-8 md:h-8 opacity-60" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:gap-6 relative z-10">
        {/* Left Column */}
        <div className="md:w-[30%] space-y-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-brand-neon/20 rounded-xl blur-md" />
            <div className="relative aspect-3/4 bg-black rounded-xl border border-white/10 overflow-hidden shadow-inner">
              <img 
                src={userIdImage} 
                alt="David Gareth" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-neon/10 to-transparent w-full animate-scan pointer-events-none border-b border-brand-neon/40 z-10" />
            </div>
          </div>

          <div className="bg-black/40 backdrop-blur-sm p-3 rounded-xl border border-white/5 space-y-3">
            <div>
              <p className="text-[8px] text-brand-neon font-black uppercase tracking-widest mb-1">Lic. No. / Lisensienr.</p>
              <p className="text-white text-base md:text-lg font-bold tracking-tighter">{data.licenseNo}</p>
            </div>
            <div>
              <p className="text-[8px] text-white/40 font-black uppercase tracking-widest mb-1">Surname / Van</p>
              <p className="text-white text-2xl md:text-3xl font-black italic tracking-tighter uppercase leading-none">{data.lastName}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex-1 flex flex-col justify-between">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:pl-6 md:border-l border-white/10">
            <div>
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">Voorname / First Names</p>
              <p className="text-white text-sm md:text-base font-bold">{data.firstName}</p>
            </div>
            <div>
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">Geboorte / DOB</p>
              <p className="text-white text-sm md:text-base font-bold">{data.dob}</p>
            </div>
            <div>
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">Gender / Geslag</p>
              <p className="text-white text-sm md:text-base font-bold">{data.gender}</p>
            </div>
            <div className="col-span-2">
              <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1">ID No. / ID-nr.</p>
              <p className="text-white text-sm md:text-base font-bold tracking-[0.15em]">{data.idNumber}</p>
            </div>
            <div>
              <p className="text-[8px] text-rose-400/80 font-black uppercase tracking-widest mb-1">Vervaldatum / Expiry</p>
              <p className="text-rose-400 text-base md:text-lg font-black">{data.expiry}</p>
            </div>
          </div>

          {/* Issue Location */}
          <div className="mt-4 md:mt-6 md:pl-6 space-y-3 border-t border-white/5 pt-4">
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
               <div><p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Issued / Uitgereik</p><p className="text-white/60 text-xs font-bold">{data.issued}</p></div>
               <div><p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">First Issue / Eerste</p><p className="text-white/60 text-xs font-bold">{data.firstIssue}</p></div>
               <div><p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Driver Restr. / Beperk.</p><p className="text-white/60 text-xs font-bold">{data.restrictions}</p></div>
            </div>
            
            <div className="p-2.5 bg-black/30 backdrop-blur-sm rounded-lg border border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3 h-3 text-brand-neon/60" />
                <p className="text-[7px] text-white/20 font-black uppercase tracking-widest">Place of Issue / Plek van Uitreiking</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div><p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">City / Stad</p><p className="text-white/80 text-xs md:text-sm font-bold">{data.placeOfIssue}</p></div>
                <div><p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Province / Provinsie</p><p className="text-white/80 text-xs md:text-sm font-bold">{data.province}</p></div>
                <div><p className="text-[7px] text-white/20 font-black uppercase tracking-widest mb-1">Code / Kode</p><p className="text-white/80 text-xs md:text-sm font-bold">{data.postalCode}</p></div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 md:mt-6 flex items-end justify-between md:pl-6">
            <div className="flex gap-6 items-end">
              <div>
                <p className="text-[8px] text-white/30 font-black uppercase tracking-widest mb-1.5">Vehicle Codes / Kodes</p>
                <div className="flex gap-2">
                   <span className="px-2.5 py-1 bg-brand-neon text-brand-dark rounded-md text-[10px] font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">{data.vehicleCode}</span>
                   <span className="px-2.5 py-1 bg-white/5 text-white/10 rounded-md text-[10px] font-black border border-white/5">EB</span>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 pb-1 opacity-20">
                <FileText className="w-3 h-3 text-white" />
                <span className="text-[7px] font-bold text-white uppercase tracking-widest">Digital Auth v2.4</span>
              </div>
            </div>
            <div className="relative group p-1 bg-white rounded-lg shadow-xl shrink-0">
               <div className="absolute top-0 left-0 w-full h-px bg-brand-neon animate-scan z-10" />
               <div className="w-10 h-10 md:w-14 md:h-14" style={{ background: 'repeating-conic-gradient(#000 0% 25%, transparent 0% 50%) 0 0/4px 4px' }} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LicenseCard;