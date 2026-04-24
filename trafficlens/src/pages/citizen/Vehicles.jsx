import { useState } from 'react';
import { motion } from 'framer-motion';
import CitizenLayout from '../../components/layout/CitizenLayout';
import demoUser from '../../data/demoUser';

const AddVehicleModal = ({ isOpen, onClose, onAdd }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    plateNumber: '',
    make: '',
    model: '',
    year: '',
    engine: '',
    vin: '',
    color: '',
    vehicleClass: '',
    registeredProvince: 'Western Cape',
    ownerName: `${demoUser.first_name} ${demoUser.last_name}`,
    ownerId: demoUser.id_number,
    registrationDoc: null,
    registrationDocName: '',
    proofOfOwnership: null,
    proofOfOwnershipName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ 
        ...formData, 
        [field]: file, 
        [`${field}Name`]: file.name 
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setIsComplete(true);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  const provinces = [
    'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal',
    'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'
  ];

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={isSubmitting ? undefined : onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-ca to-ca-dark p-5 text-white sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {isComplete ? 'Vehicle Registered' : 'Register New Vehicle'}
            </h2>
            {!isSubmitting && (
              <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-white fill-none" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            )}
          </div>
          {!isComplete && (
            <div className="flex items-center gap-3 mt-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-white text-ca' : 'bg-white/20 text-white'}`}>1</div>
              <div className={`flex-1 h-0.5 ${step >= 2 ? 'bg-white' : 'bg-white/20'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-white text-ca' : 'bg-white/20 text-white'}`}>2</div>
            </div>
          )}
        </div>

        {isComplete ? (
          <div className="p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" className="w-8 h-8 stroke-emerald-500 fill-none" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Vehicle Registered!</h3>
            <p className="text-sm text-slate-500 mb-4">
              Your vehicle has been registered. The license disc will be issued within 7-10 working days.
            </p>
            <div className="bg-slate-50 rounded-xl p-4 text-left mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Plate Number</span>
                <span className="font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{formData.plateNumber}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-500">Vehicle</span>
                <span className="font-bold text-slate-900">{formData.year} {formData.make} {formData.model}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Reference</span>
                <span className="font-mono font-bold text-ca">REG-{Date.now().toString(36).toUpperCase()}</span>
              </div>
            </div>
            <button onClick={onClose} className="w-full py-2.5 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark">
              Done
            </button>
          </div>
        ) : isSubmitting ? (
          <div className="p-8 flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-ca rounded-full animate-spin" />
            <p className="text-sm font-semibold text-slate-900">Registering vehicle...</p>
            <p className="text-xs text-slate-400">Submitting to NaTIS database</p>
          </div>
        ) : step === 1 ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500 mb-2">Step 1 of 2: Vehicle Details</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">License Plate *</label>
                <input type="text" name="plateNumber" value={formData.plateNumber} onChange={handleChange} 
                  placeholder="GP 15 XX" maxLength="10"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 font-mono uppercase tracking-wider" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Year *</label>
                <input type="number" name="year" value={formData.year} onChange={handleChange} 
                  placeholder="2023" min="1980" max="2026"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Make *</label>
                <input type="text" name="make" value={formData.make} onChange={handleChange} 
                  placeholder="Toyota" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Model *</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} 
                  placeholder="Corolla" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">VIN Number *</label>
                <input type="text" name="vin" value={formData.vin} onChange={handleChange} 
                  placeholder="AHTZZ29J901234567" maxLength="17"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 font-mono uppercase" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Color</label>
                <input type="text" name="color" value={formData.color} onChange={handleChange} 
                  placeholder="White" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Engine *</label>
                <input type="text" name="engine" value={formData.engine} onChange={handleChange} 
                  placeholder="1.8L Petrol" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Vehicle Class</label>
                <select name="vehicleClass" value={formData.vehicleClass} onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                  <option value="">Select class</option>
                  <option value="Motor Car">Motor Car</option>
                  <option value="Light Delivery">Light Delivery</option>
                  <option value="Heavy Vehicle">Heavy Vehicle</option>
                  <option value="Motorcycle">Motorcycle</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Registered Province</label>
              <select name="registeredProvince" value={formData.registeredProvince} onChange={handleChange} 
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50">
                {provinces.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <button type="submit" className="w-full py-3 bg-ca text-white rounded-xl text-sm font-bold hover:bg-ca-dark">
              Continue to Documents
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-500 mb-2">Step 2 of 2: Owner Details & Documents</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Owner Name *</label>
                <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50" required />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Owner ID *</label>
                <input type="text" name="ownerId" value={formData.ownerId} onChange={handleChange} 
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 font-mono" required />
              </div>
            </div>

            {/* Registration Document Upload */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-blue-600 fill-none" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Vehicle Registration Certificate</span>
              </div>
              <p className="text-[10px] text-blue-700 mb-3">
                Upload the vehicle registration certificate (RC1 form) from the previous owner or dealer.
              </p>
              <label className="flex items-center gap-3 p-3 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-ca transition-colors bg-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-400 fill-none" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span className="text-xs text-slate-500">{formData.registrationDocName || 'Click to upload RC1 form (PDF/JPG)'}</span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'registrationDoc')} className="hidden" />
              </label>
            </div>

            {/* Proof of Ownership Upload */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-amber-600 fill-none" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M16 12l-4-4-4 4"/><line x1="12" y1="8" x2="12" y2="16"/>
                </svg>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Proof of Ownership</span>
              </div>
              <p className="text-[10px] text-amber-700 mb-3">
                Upload proof of ownership (sale agreement, invoice, or affidavit).
              </p>
              <label className="flex items-center gap-3 p-3 border-2 border-dashed border-amber-300 rounded-lg cursor-pointer hover:border-ca transition-colors bg-white">
                <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-slate-400 fill-none" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <span className="text-xs text-slate-500">{formData.proofOfOwnershipName || 'Click to upload proof (PDF/JPG)'}</span>
                <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(e, 'proofOfOwnership')} className="hidden" />
              </label>
            </div>

            {/* Declarations */}
            <div className="space-y-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-0.5" />
                <span className="text-[10px] text-slate-500">I declare that the vehicle is roadworthy and complies with the National Road Traffic Act.</span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-0.5" />
                <span className="text-[10px] text-slate-500">I confirm that all information provided is true and correct.</span>
              </label>
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-ca to-ca-dark text-white rounded-xl text-sm font-bold hover:shadow-lg">
              Register Vehicle
            </button>
            
            <button type="button" onClick={() => setStep(1)} className="w-full py-2 text-slate-500 text-sm hover:text-slate-700">
              ← Back to vehicle details
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

const Vehicles = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [vehicles, setVehicles] = useState(demoUser.vehicles);

  const handleAddVehicle = (vehicleData) => {
    const newVehicle = {
      id: vehicles.length + 1,
      plate_number: vehicleData.plateNumber,
      make: vehicleData.make,
      model: vehicleData.model,
      year: parseInt(vehicleData.year),
      engine: vehicleData.engine,
      disc_expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      registered_date: new Date().toISOString().split('T')[0],
      status: 'ok'
    };
    setVehicles([...vehicles, newVehicle]);
    setShowAddModal(false);
  };

  return (
    <CitizenLayout user={demoUser}>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[15px] font-semibold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              My vehicles
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {vehicles.length} registered vehicles
            </p>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-3 py-1.5 bg-ca text-white border-none rounded text-xs font-medium hover:bg-ca-dark transition-colors"
          >
            + Add
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {vehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-white border border-slate-200 rounded-xl p-3.5 flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-ca-light flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] stroke-ca fill-none" strokeWidth="2">
                    <rect x="1" y="9" width="22" height="11" rx="2"/>
                    <path d="M5 9V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/>
                    <circle cx="7" cy="17" r="1.5"/><circle cx="17" cy="17" r="1.5"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-base font-bold text-slate-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {vehicle.plate_number}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold shrink-0 ${
                  vehicle.status === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {vehicle.status === 'ok' ? 'All clear' : 'Disc expiring'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200">
                <div>
                  <label className="text-[9px] text-slate-400 uppercase tracking-wider block">Disc expires</label>
                  <span className={`text-xs font-medium mt-0.5 block ${vehicle.status === 'ok' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {new Date(vehicle.disc_expiry).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 uppercase tracking-wider block">Fines</label>
                  <span className={`text-xs font-medium mt-0.5 block ${vehicle.status === 'ok' ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {vehicle.status === 'ok' ? 'None' : 'R 750'}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 uppercase tracking-wider block">Registered</label>
                  <span className="text-xs font-medium text-emerald-500 mt-0.5 block">
                    {new Date(vehicle.registered_date).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <label className="text-[9px] text-slate-400 uppercase tracking-wider block">Engine</label>
                  <span className="text-xs font-medium text-slate-900 mt-0.5 block">{vehicle.engine}</span>
                </div>
              </div>

              {vehicle.status === 'warning' ? (
                <button className="w-full py-2 bg-ca text-white border-none rounded text-xs font-medium hover:bg-ca-dark transition-colors">
                  Renew disc — R 120
                </button>
              ) : (
                <button className="w-full py-2 bg-white border border-slate-200 rounded text-xs text-slate-600 hover:bg-slate-50 transition-colors">
                  View details
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddVehicleModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={handleAddVehicle} />
    </CitizenLayout>
  );
};

export default Vehicles;