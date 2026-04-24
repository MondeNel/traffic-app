import { create } from 'zustand';
import db from '../lib/database';

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
      const fines = db.prepare(`
        SELECT f.*, v.plate_number 
        FROM fines f 
        LEFT JOIN vehicles v ON f.vehicle_id = v.id 
        WHERE f.user_id = ? 
        ORDER BY f.issued_date DESC
      `).all(userId);

      // Load vehicles
      const vehicles = db.prepare(`
        SELECT * FROM vehicles WHERE user_id = ? AND status = 'active'
      `).all(userId);

      // Load license info from user
      const user = db.prepare(`
        SELECT license_number, license_expiry, vehicle_codes FROM users WHERE id = ?
      `).get(userId);

      set({ 
        fines, 
        vehicles, 
        license: user,
        isLoading: false 
      });
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  payFine: (fineId) => {
    try {
      db.prepare(`
        UPDATE fines 
        SET status = 'paid', paid_date = datetime('now') 
        WHERE id = ?
      `).run(fineId);
      
      // Refresh data
      const state = useCitizenStore.getState();
      if (state.fines.length > 0) {
        const userId = db.prepare('SELECT user_id FROM fines WHERE id = ?').get(fineId)?.user_id;
        if (userId) state.loadUserData(userId);
      }
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useCitizenStore;