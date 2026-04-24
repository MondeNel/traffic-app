import { create } from 'zustand';
import { query } from '../lib/database';

const useCitizenStore = create((set) => ({
  fines: [],
  vehicles: [],
  license: null,
  isLoading: false,
  error: null,

  loadUserData: (userId) => {
    set({ isLoading: true });
    try {
      // Load fines
      const fines = query(`
        SELECT f.*, v.plate_number 
        FROM fines f 
        LEFT JOIN vehicles v ON f.vehicle_id = v.id 
        WHERE f.user_id = ? 
        ORDER BY f.issued_date DESC
      `, [userId]);

      // Load vehicles
      const vehicles = query(`
        SELECT * FROM vehicles WHERE user_id = ? AND status = 'active'
      `, [userId]);

      // Load license info from user
      const users = query(`
        SELECT license_number, license_expiry, vehicle_codes FROM users WHERE id = ?
      `, [userId]);

      set({ 
        fines, 
        vehicles, 
        license: users[0] || null,
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  payFine: (fineId) => {
    try {
      query(`
        UPDATE fines 
        SET status = 'paid', paid_date = datetime('now') 
        WHERE id = ?
      `, [fineId]);
      
      // Refresh data
      const state = useCitizenStore.getState();
      if (state.fines.length > 0) {
        const fine = state.fines.find(f => f.id === fineId);
        if (fine) state.loadUserData(fine.user_id);
      }
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useCitizenStore;