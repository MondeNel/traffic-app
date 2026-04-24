import { create } from 'zustand';

const usePaymentStore = create((set, get) => ({
  fines: [],
  isProcessing: false,
  paymentSuccess: null,
  paymentError: null,

  setFines: (fines) => set({ fines }),

  processPayment: async (fineId) => {
    set({ isProcessing: true, paymentError: null, paymentSuccess: null });
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 90% success rate
    const isSuccess = Math.random() > 0.1;
    
    if (isSuccess) {
      set(state => ({
        fines: state.fines.map(fine => 
          fine.id === fineId 
            ? { 
                ...fine, 
                status: 'paid', 
                paid_date: new Date().toISOString().split('T')[0]
              } 
            : fine
        ),
        isProcessing: false,
        paymentSuccess: fineId
      }));
      
      // Clear success message after 3 seconds
      setTimeout(() => set({ paymentSuccess: null }), 3000);
    } else {
      set({ 
        isProcessing: false, 
        paymentError: 'Payment failed. Please try again.' 
      });
      
      // Clear error after 4 seconds
      setTimeout(() => set({ paymentError: null }), 4000);
    }
  },

  clearMessages: () => set({ paymentSuccess: null, paymentError: null })
}));

export default usePaymentStore;