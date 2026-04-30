import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import userIdImage from '../../assets/ID.jpg';

const SAFlag = () => (
  <div
    className="flex-shrink-0 overflow-hidden rounded"
    style={{ width: 28, height: 19, border: '1px solid rgba(255,255,255,0.25)', position: 'relative' }}
  >
    <svg viewBox="0 0 3 2" width="28" height="19" xmlns="http://www.w3.org/2000/svg">
      {/* Red top band */}
      <rect x="0" y="0" width="3" height="0.666" fill="#DE3831"/>
      {/* White thin stripe */}
      <rect x="0" y="0.666" width="3" height="0.111" fill="white"/>
      {/* Green center band */}
      <rect x="0" y="0.777" width="3" height="0.444" fill="#007A4D"/>
      {/* White thin stripe */}
      <rect x="0" y="1.222" width="3" height="0.111" fill="white"/>
      {/* Blue bottom band */}
      <rect x="0" y="1.333" width="3" height="0.667" fill="#002395"/>
      {/* Black outer chevron */}
      <polygon points="0,0 0,2 1.08,1" fill="#000000"/>
      {/* Gold middle chevron */}
      <polygon points="0,0 0,2 0.96,1" fill="#FFB81C"/>
      {/* Green inner chevron */}
      <polygon points="0,0.18 0,1.82 0.72,1" fill="#007A4D"/>
    </svg>
  </div>
);

const HologramStrip = () => (
  <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 14, zIndex: 2, background: 'repeating-linear-gradient(-30deg, rgba(27,108,168,0.35) 0px, rgba(200,145,47,0.35) 3px, rgba(14,138,95,0.35) 6px, rgba(27,108,168,0.35) 9px)', opacity: 0.5, pointerEvents: 'none' }} />
);

const SecurityPattern = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 14px, rgba(27,108,168,0.025) 14px, rgba(27,108,168,0.025) 15px)' }} />
);

const MicroText = () => (
  <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: 0.035, lineHeight: 1.4 }}>
    {Array(14).fill(null).map((_, i) => (
      <div key={i} style={{ whiteSpace: 'nowrap', fontSize: 6, fontWeight: 700, letterSpacing: '0.15em', color: '#0B1628', transform: 'rotate(-2deg)' }}>
        {'SOUTH AFRICAN DRIVERS LICENCE · SUID-AFRIKAANSE BESTUURDERSLISENSIE · '.repeat(6)}
      </div>
    ))}
  </div>
);

const QRCode = () => (
  <svg viewBox="0 0 100 100" width="72" height="72">
    {[[10,10],[66,10],[10,66]].map(([x,y], i) => (
      <g key={i}><rect x={x} y={y} width="24" height="24" rx="3" fill="#0F172A"/><rect x={x+4} y={y+4} width="16" height="16" rx="2" fill="white"/><rect x={x+8} y={y+8} width="8" height="8" rx="1" fill="#0F172A"/></g>
    ))}
    {[[40,10],[46,10],[52,10],[40,16],[52,16],[40,22],[46,22],[52,22],[10,40],[16,40],[22,40],[10,46],[22,46],[10,52],[16,52],[22,52],[66,40],[72,40],[78,40],[66,46],[72,46],[66,52],[78,52],[40,66],[46,66],[52,66],[40,72],[52,72],[40,78],[46,78],[52,78],[34,34],[40,34],[58,34],[34,40],[46,40],[52,40],[58,40],[34,46],[58,46],[40,52],[46,52],[58,52],[34,58],[52,58],[58,58],[34,64],[66,64],[78,64],[34,70],[34,76],[66,76],[72,76],[66,70],[72,70],[78,70],[46,46],[50,46],[46,50],[50,50]].map(([x,y], i) => (
      <rect key={i} x={x} y={y} width="4" height="4" rx="0.5" fill="#0F172A" opacity="0.82"/>
    ))}
  </svg>
);

const FieldGroup = ({ label, value, className = '', mono = false, danger = false }) => (
  <div className="flex flex-col gap-0.5">
    <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8' }}>{label}</span>
    <span style={{ fontSize: mono ? 11 : 12, fontWeight: 600, color: danger ? '#C13333' : '#1E293B', fontFamily: mono ? "'IBM Plex Mono', monospace" : undefined, letterSpacing: mono ? '0.04em' : undefined }} className={className}>{value}</span>
  </div>
);

const LicenseCard = ({ user, license }) => {
  const profilePic = user?.profileImage || userIdImage;

  const data = {
    firstName: user?.first_name || 'DAVID',
    lastName: user?.last_name || 'GARETH',
    idNumber: user?.id_number || '020608 1753 790 8 1',
    dob: user?.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString('en-ZA', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '17/06/1996',
    gender: 'MALE',
    issued: '29/09/2021',
    expiry: license?.license_expiry ? new Date(license.license_expiry).toLocaleDateString('en-ZA', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '28/09/2026',
    licenseNo: license?.license_number || '1063003041FS',
    docNo: '1',
    restrictions: 'None (0)',
    vehicleCode: license?.vehicle_codes || 'B',
    firstIssue: '13/10/2014',
    placeOfIssue: 'Cape Town',
    province: 'Western Cape',
    postalCode: '8800',
    authority: 'RTMC',
  };

  const codes = ['B', 'EB', 'C1', 'C', 'EC1', 'EC', 'A'];
  const activeCode = data.vehicleCode;

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
      style={{ position: 'relative', background: 'white', borderRadius: 16, border: '1px solid #CBD5E1', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.07)', fontFamily: "'DM Sans', sans-serif" }}>
      <SecurityPattern /><MicroText /><HologramStrip />

      <div style={{ background: 'linear-gradient(135deg, #0B1628 0%, #162B4A 55%, #1B3A5E 100%)', padding: '14px 20px 12px', position: 'relative', overflow: 'hidden', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 130, height: 130, borderRadius: '50%', background: 'rgba(27,108,168,0.18)', pointerEvents: 'none' }} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><SAFlag /><div><div style={{ fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 600 }}>Republic of South Africa</div><div style={{ fontSize: 12, fontWeight: 700, color: 'white', marginTop: 1, letterSpacing: '0.02em' }}>Digital Driving Licence</div></div></div>
          <div style={{ textAlign: 'right' }}><div style={{ fontSize: 8, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.38)', textTransform: 'uppercase' }}>Doc No.</div><div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: 'white', fontWeight: 500, marginTop: 1 }}>{data.docNo}</div></div>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, background: 'rgba(14,138,95,0.22)', border: '1px solid rgba(74,222,128,0.35)', borderRadius: 20, padding: '3px 10px' }}>
          <div style={{ width: 6, height: 6, background: '#4ADE80', borderRadius: '50%' }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: '#4ADE80', letterSpacing: '0.05em' }}>VALID · Expires {data.expiry}</span>
        </div>
      </div>

      <div style={{ padding: '14px 20px 10px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 76, height: 94, borderRadius: 8, border: '1.5px solid #CBD5E1', overflow: 'hidden', background: '#F1F5F9' }}>
              <img src={profilePic} alt={`${data.firstName} ${data.lastName}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                onError={(e) => { e.target.style.display = 'none'; e.target.parentNode.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:#94A3B8;font-family:'Syne',sans-serif;">${data.firstName[0]}${data.lastName[0]}</div>`; }} />
            </div>
            <div style={{ background: '#0E8A5F', borderRadius: 6, padding: '4px 10px', textAlign: 'center', width: '100%' }}>
              <div style={{ fontSize: 7, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Code</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'white', fontFamily: "'Syne', sans-serif", lineHeight: 1 }}>{activeCode}</div>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1 }}>{data.lastName}</div>
              <div style={{ fontSize: 13, fontWeight: 500, color: '#64748B', marginTop: 3 }}>{data.firstName} · {data.gender}</div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px 16px' }}>
              <FieldGroup label="Date of Birth" value={data.dob} />
              <FieldGroup label="Date Issued" value={data.issued} />
              <FieldGroup label="Expiry Date" value={data.expiry} danger />
              <div style={{ gridColumn: 'span 2' }}><FieldGroup label="ID Number" value={data.idNumber} mono /></div>
              <FieldGroup label="License No." value={data.licenseNo} mono />
              <FieldGroup label="Restrictions" value={data.restrictions} />
              <FieldGroup label="First Issue" value={data.firstIssue} />
              <FieldGroup label="Place of Issue" value={data.placeOfIssue} />
            </div>
          </div>
        </div>
        <div style={{ position: 'relative', margin: '12px 0 0' }}>
          <div style={{ height: 1, background: '#E2E8F0' }} />
          <div style={{ position: 'absolute', top: -7, left: '50%', transform: 'translateX(-50%)', background: 'white', padding: '0 8px', fontSize: 7, letterSpacing: '0.14em', color: '#CBD5E1', whiteSpace: 'nowrap', fontWeight: 600 }}>SOUTH AFRICA · SUID-AFRIKA · NINGIZIMU AFRIKA</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '10px 20px 14px', position: 'relative', zIndex: 1 }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div>
              <div style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', marginBottom: 5 }}>Vehicle codes</div>
              <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                {codes.map(code => (
                  <span key={code} style={{ padding: '3px 9px', borderRadius: 5, fontSize: 11, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace", background: code === activeCode ? '#0E8A5F' : '#F1F5F9', color: code === activeCode ? 'white' : '#CBD5E1', border: code === activeCode ? 'none' : '1px solid #E2E8F0' }}>{code}</span>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={10} color="#94A3B8" /><span style={{ fontSize: 10, color: '#94A3B8' }}>{data.placeOfIssue}, {data.province} · {data.postalCode} · {data.authority}</span></div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <div style={{ background: 'white', border: '2px solid #0F172A', borderRadius: 9, padding: 5 }}><QRCode /></div>
          <span style={{ fontSize: 7.5, color: '#94A3B8', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Scan to verify</span>
        </div>
      </div>
    </motion.div>
  );
};

export default LicenseCard;