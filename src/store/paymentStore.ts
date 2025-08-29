import { create } from 'zustand';

interface PaymentStore {
    selectedPaymentMethod: string;
    setSelectedPaymentMethod: (method: string) => void;
}

export const usePaymentStore = create<PaymentStore>(set => ({
    selectedPaymentMethod: '',
    setSelectedPaymentMethod: (method: string) => set({ selectedPaymentMethod: method }),
}));
