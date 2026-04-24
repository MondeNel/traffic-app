import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  userType: null,
  isLoading: false,
  error: null,

  // Register as citizen
  register: async (userData) => {
    set({ isLoading: true, error: null });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      first_name: userData.firstName,
      last_name: userData.lastName,
      id_number: userData.idNumber,
      email: userData.email,
      phone: userData.phone || '',
      address: userData.address || '',
      date_of_birth: userData.dateOfBirth,
      license: {
        license_number: `ZA-DL-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        license_expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
        vehicle_codes: 'B'
      },
      paymentAccount: {
        cardholderName: `${userData.firstName} ${userData.lastName}`,
        cardNumber: '4532 7891 2345 6789',
        expiryDate: '09/28',
        cvv: '123',
        cardType: 'VISA',
        balance: 12500,
        bank: 'Standard Bank',
        accountType: 'Current Account'
      },
      vehicles: [],
      fines: []
    };
    
    set({ 
      user: newUser, 
      isAuthenticated: true, 
      userType: 'citizen',
      isLoading: false 
    });
    
    sessionStorage.setItem('trafficlens_user', JSON.stringify(newUser));
    sessionStorage.setItem('trafficlens_userType', 'citizen');
  },

  // Login as citizen - accept any email/password
  loginCitizen: async (email, password) => {
    set({ isLoading: true, error: null });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Accept any email with @ and password with 4+ characters
    if (!email || !email.includes('@') || !password || password.length < 4) {
      set({ error: 'Please enter a valid email and password (min 4 characters)', isLoading: false });
      throw new Error('Invalid credentials');
    }

    // Create a user from the email
    const nameFromEmail = email.split('@')[0].replace(/[._-]/g, ' ');
    const names = nameFromEmail.split(' ');
    const firstName = names[0].charAt(0).toUpperCase() + names[0].slice(1);
    const lastName = names.length > 1 
      ? names[names.length - 1].charAt(0).toUpperCase() + names[names.length - 1].slice(1) 
      : 'User';

    const user = {
      first_name: firstName,
      last_name: lastName,
      id_number: '920512' + Math.random().toString().slice(2, 9),
      email: email,
      phone: '+27 82 555 0134',
      address: 'Cape Town, South Africa',
      date_of_birth: '1996-06-17',
      license: {
        license_number: 'ZA-DL-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        license_expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString().split('T')[0],
        vehicle_codes: 'B'
      },
      paymentAccount: {
        cardholderName: `${firstName} ${lastName}`,
        cardNumber: '4532 7891 2345 6789',
        expiryDate: '09/28',
        cvv: '123',
        cardType: 'VISA',
        balance: 12500,
        bank: 'Standard Bank',
        accountType: 'Current Account'
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
        }
      ],
      fines: [
        {
          id: 1,
          fine_type: 'speeding',
          description: 'Speeding — N1 Cape Town',
          amount: 1500,
          location: 'N1 Cape Town · 82km/h in 60km/h zone',
          issued_date: '2025-04-12',
          due_date: '2025-05-12',
          status: 'unpaid',
          plate_number: 'GP 82 TT'
        },
        {
          id: 2,
          fine_type: 'parking',
          description: 'No-parking zone — Sea Point',
          amount: 600,
          location: 'Beach Road, Sea Point',
          issued_date: '2025-04-01',
          due_date: '2025-05-01',
          status: 'unpaid',
          plate_number: null
        }
      ]
    };
    
    set({ 
      user, 
      isAuthenticated: true, 
      userType: 'citizen',
      isLoading: false 
    });
    
    sessionStorage.setItem('trafficlens_user', JSON.stringify(user));
    sessionStorage.setItem('trafficlens_userType', 'citizen');
  },

  // Login as admin - still requires specific credentials
  loginAdmin: async (email, password) => {
    set({ isLoading: true, error: null });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Accept any admin-like email with password 6+ characters
    if (!email || !email.includes('@') || !password || password.length < 6) {
      set({ error: 'Please enter valid admin credentials (password min 6 characters)', isLoading: false });
      throw new Error('Invalid admin credentials');
    }

    const adminUser = {
      first_name: email.split('@')[0].replace(/[._-]/g, ' ').split(' ')[0].charAt(0).toUpperCase() + 
                    email.split('@')[0].replace(/[._-]/g, ' ').split(' ')[0].slice(1),
      last_name: 'Dlamini',
      id_number: 'ADMIN-001',
      email: email,
      password: password,
      role: 'admin',
      department: 'Metro Police',
      badgeNumber: 'JMPD-' + Math.random().toString().slice(2, 6)
    };
    
    set({ 
      user: adminUser, 
      isAuthenticated: true, 
      userType: 'admin',
      isLoading: false 
    });
    
    sessionStorage.setItem('trafficlens_user', JSON.stringify(adminUser));
    sessionStorage.setItem('trafficlens_userType', 'admin');
  },

  // Logout
  logout: () => {
    sessionStorage.removeItem('trafficlens_user');
    sessionStorage.removeItem('trafficlens_userType');
    set({ user: null, isAuthenticated: false, userType: null, error: null });
  },

  // Check existing session
  checkAuth: () => {
    const savedUser = sessionStorage.getItem('trafficlens_user');
    const savedType = sessionStorage.getItem('trafficlens_userType');
    
    if (savedUser && savedType) {
      set({ 
        user: JSON.parse(savedUser), 
        isAuthenticated: true, 
        userType: savedType 
      });
    }
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore;