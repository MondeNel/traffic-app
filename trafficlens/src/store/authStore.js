import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  userType: null, // 'citizen' or 'admin'
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
    
    // Store in session
    sessionStorage.setItem('trafficlens_user', JSON.stringify(newUser));
    sessionStorage.setItem('trafficlens_userType', 'citizen');
  },

  // Login as citizen
  loginCitizen: async (email, password) => {
    set({ isLoading: true, error: null });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In demo, accept any valid-looking email/password
    if (!email || !password || password.length < 4) {
      set({ error: 'Invalid email or password', isLoading: false });
      throw new Error('Invalid email or password');
    }

    const { default: demoUser } = await import('../data/demoUser');
    set({ 
      user: demoUser, 
      isAuthenticated: true, 
      userType: 'citizen',
      isLoading: false 
    });
    
    sessionStorage.setItem('trafficlens_user', JSON.stringify(demoUser));
    sessionStorage.setItem('trafficlens_userType', 'citizen');
  },

  // Login as admin
  loginAdmin: async (email, password, badgeNumber) => {
    set({ isLoading: true, error: null });
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const { adminUser } = await import('../data/demoUser');
    
    if (email === adminUser.email && password === adminUser.password) {
      set({ 
        user: adminUser, 
        isAuthenticated: true, 
        userType: 'admin',
        isLoading: false 
      });
      
      sessionStorage.setItem('trafficlens_user', JSON.stringify(adminUser));
      sessionStorage.setItem('trafficlens_userType', 'admin');
    } else {
      set({ error: 'Invalid admin credentials', isLoading: false });
      throw new Error('Invalid admin credentials');
    }
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