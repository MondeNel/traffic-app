import { create } from 'zustand';

const STORAGE_KEY = 'trafficlens_user';
const TYPE_KEY = 'trafficlens_userType';

const persistUser = (user) => {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

// Helper to generate dates relative to today
const futureDate = (daysAhead) => {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
};

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  userType: null,
  isLoading: false,
  error: null,

  // ── Update profile (text fields + profile image) ──────
  updateProfile: (profileData) => {
    const current = get().user;
    if (!current) return;

    const updated = {
      ...current,
      first_name: profileData.firstName ?? current.first_name,
      last_name: profileData.lastName ?? current.last_name,
      email: profileData.email ?? current.email,
      phone: profileData.phone ?? current.phone,
      address: profileData.address ?? current.address,
      date_of_birth: profileData.dateOfBirth ?? current.date_of_birth,
      profileImage: profileData.profileImage ?? current.profileImage,
    };

    set({ user: updated });
    persistUser(updated);
  },

  // ── Register ─────────────────────────────────────────
  register: async (userData) => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 1000));

    const today = new Date();
    const issueDate = today.toISOString().split('T')[0];
    const expiryDate = new Date(today.setFullYear(today.getFullYear() + 5)).toISOString().split('T')[0];

    const newUser = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      id_number: userData.idNumber,
      email: userData.email,
      gender: userData.gender || 'MALE',
      phone: userData.phone || '',
      address: userData.address || '',
      date_of_birth: userData.dateOfBirth,
      profileImage: null,
      license: {
        license_number: `ZA-DL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        license_expiry: expiryDate,
        license_issued: issueDate,
        vehicle_codes: userData.licenseType || 'B',
        place_of_issue: userData.licenseCity || 'Cape Town',
        province_of_issue: userData.licenseProvince || 'Western Cape',
      },
      paymentAccount: {
        cardholderName: `${userData.firstName} ${userData.lastName}`,
        cardNumber: '4532 7891 2345 6789',
        expiryDate: '09/28',
        cvv: '123',
        cardType: 'VISA',
        balance: 12500,
        bank: 'Standard Bank',
        accountType: 'Current Account',
      },
      vehicles: [
        { id: 1, plate_number: 'GP 82 TT', make: 'Toyota', model: 'Corolla', year: 2019, engine: '1.8L Petrol', disc_expiry: futureDate(120), registered_date: '2021-08-14', status: 'ok' },
        { id: 2, plate_number: 'GP 14 KW', make: 'Volkswagen', model: 'Polo', year: 2022, engine: '1.0L TSI', disc_expiry: futureDate(30), registered_date: '2022-03-03', status: 'warning' },
      ],
      fines: [
        { id: 1, fine_type: 'speeding', description: 'Speeding — N1 Cape Town', amount: 1500, location: 'N1 Cape Town · 82km/h in 60km/h zone', issued_date: futureDate(-5), due_date: futureDate(25), status: 'unpaid', plate_number: 'GP 82 TT' },
        { id: 2, fine_type: 'expired_disc', description: 'Expired disc — GP 14 KW', amount: 750, location: 'CBD, Cape Town', issued_date: futureDate(-10), due_date: futureDate(20), status: 'unpaid', plate_number: 'GP 14 KW' },
        { id: 3, fine_type: 'parking', description: 'No-parking zone — Sea Point', amount: 600, location: 'Beach Road, Sea Point', issued_date: futureDate(-3), due_date: futureDate(27), status: 'unpaid', plate_number: null },
        { id: 4, fine_type: 'traffic_light', description: 'Traffic light — Observatory', amount: 500, location: 'Main Road, Observatory', issued_date: futureDate(-60), due_date: futureDate(-30), status: 'paid', paid_date: futureDate(-35), plate_number: null },
      ],
    };

    set({ user: newUser, isAuthenticated: true, userType: 'citizen', isLoading: false });
    persistUser(newUser);
    sessionStorage.setItem(TYPE_KEY, 'citizen');
  },

  // ── Login citizen ────────────────────────────────────
  loginCitizen: async (email, password) => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!email || !email.includes('@') || !password || password.length < 4) {
      set({ error: 'Please enter a valid email and password (min 4 characters)', isLoading: false });
      throw new Error('Invalid credentials');
    }

    const nameFromEmail = email.split('@')[0].replace(/[._-]/g, ' ');
    const names = nameFromEmail.split(' ');
    const firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1);
    const lastName = names.length > 1
      ? names[names.length - 1].charAt(0).toUpperCase() + names[names.length - 1].slice(1)
      : 'User';

    const today = new Date();
    const expiryDate = new Date(today.setFullYear(today.getFullYear() + 5)).toISOString().split('T')[0];

    const user = {
      first_name: firstName,
      last_name: lastName,
      id_number: '920512' + Math.random().toString().slice(2, 9),
      email,
      gender: 'MALE',
      phone: '+27 82 555 0134',
      address: 'Cape Town, South Africa',
      date_of_birth: '1996-06-17',
      profileImage: null,
      license: {
        license_number: 'ZA-DL-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        license_expiry: expiryDate,
        license_issued: '2021-09-29',
        vehicle_codes: 'B',
        place_of_issue: 'Cape Town',
        province_of_issue: 'Western Cape',
      },
      paymentAccount: {
        cardholderName: `${firstName} ${lastName}`,
        cardNumber: '4532 7891 2345 6789',
        expiryDate: '09/28',
        cvv: '123',
        cardType: 'VISA',
        balance: 12500,
        bank: 'Standard Bank',
        accountType: 'Current Account',
      },
      vehicles: [
        { id: 1, plate_number: 'GP 82 TT', make: 'Toyota', model: 'Corolla', year: 2019, engine: '1.8L Petrol', disc_expiry: futureDate(120), registered_date: '2021-08-14', status: 'ok' },
        { id: 2, plate_number: 'GP 14 KW', make: 'Volkswagen', model: 'Polo', year: 2022, engine: '1.0L TSI', disc_expiry: futureDate(14), registered_date: '2022-03-03', status: 'warning' },
      ],
      fines: [
        { id: 1, fine_type: 'speeding', description: 'Speeding — N1 Cape Town', amount: 1500, location: 'N1 Cape Town · 82km/h in 60km/h zone', issued_date: futureDate(-5), due_date: futureDate(25), status: 'unpaid', plate_number: 'GP 82 TT' },
        { id: 2, fine_type: 'expired_disc', description: 'Expired disc — GP 14 KW', amount: 750, location: 'CBD, Cape Town', issued_date: futureDate(-10), due_date: futureDate(20), status: 'unpaid', plate_number: 'GP 14 KW' },
        { id: 3, fine_type: 'parking', description: 'No-parking zone — Sea Point', amount: 600, location: 'Beach Road, Sea Point', issued_date: futureDate(-3), due_date: futureDate(27), status: 'unpaid', plate_number: null },
        { id: 4, fine_type: 'traffic_light', description: 'Traffic light — Observatory', amount: 500, location: 'Main Road, Observatory', issued_date: futureDate(-60), due_date: futureDate(-30), status: 'paid', paid_date: futureDate(-35), plate_number: null },
      ],
    };

    set({ user, isAuthenticated: true, userType: 'citizen', isLoading: false });
    persistUser(user);
    sessionStorage.setItem(TYPE_KEY, 'citizen');
  },

  // ── Login admin ──────────────────────────────────────
  loginAdmin: async (email, password, province, city) => {
    set({ isLoading: true, error: null });
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!email || !email.includes('@') || !password || password.length < 6) {
      set({ error: 'Please enter valid admin credentials (password min 6 characters)', isLoading: false });
      throw new Error('Invalid admin credentials');
    }

    const adminUser = {
      first_name: email.split('@')[0].replace(/[._-]/g, ' ').split(' ')[0].charAt(0).toUpperCase() +
        email.split('@')[0].replace(/[._-]/g, ' ').split(' ')[0].slice(1),
      last_name: 'Dlamini',
      id_number: 'ADMIN-001',
      email,
      role: 'admin',
      department: 'Metro Police',
      badgeNumber: 'JMPD-' + Math.random().toString().slice(2, 6),
      jurisdiction: { province: province || 'Gauteng', city: city || 'Johannesburg' },
    };

    set({ user: adminUser, isAuthenticated: true, userType: 'admin', isLoading: false });
    persistUser(adminUser);
    sessionStorage.setItem(TYPE_KEY, 'admin');
  },

  // ── Logout ───────────────────────────────────────────
  logout: () => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(TYPE_KEY);
    set({ user: null, isAuthenticated: false, userType: null, error: null });
  },

  // ── Check auth on load ───────────────────────────────
  checkAuth: () => {
    const savedUser = sessionStorage.getItem(STORAGE_KEY);
    const savedType = sessionStorage.getItem(TYPE_KEY);
    if (savedUser && savedType) {
      set({ user: JSON.parse(savedUser), isAuthenticated: true, userType: savedType });
    }
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;