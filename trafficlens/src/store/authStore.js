import { create } from 'zustand';
import { authenticateUser, createUser, getUserById } from '../lib/auth';

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const user = await authenticateUser(email, password);
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      // Store user ID in session storage for persistence
      sessionStorage.setItem('userId', user.id);
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  signup: async (userData) => {
    set({ isLoading: true, error: null });
    try {
      const userId = await createUser(userData);
      // Auto login after signup
      const user = getUserById(userId);
      set({ 
        user, 
        isAuthenticated: true, 
        isLoading: false 
      });
      sessionStorage.setItem('userId', userId);
    } catch (error) {
      set({ 
        error: error.message, 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: () => {
    sessionStorage.removeItem('userId');
    set({ 
      user: null, 
      isAuthenticated: false, 
      error: null 
    });
  },

  checkAuth: () => {
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      const user = getUserById(parseInt(userId));
      if (user) {
        set({ user, isAuthenticated: true });
      }
    }
  },

  clearError: () => set({ error: null })
}));

export default useAuthStore;