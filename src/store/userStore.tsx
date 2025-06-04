import { create } from 'zustand';

interface UserState {
    user: { id: string; email: string } | null;
    setUser: (user: { id: string; email: string }) => void;
}

const useUserStore = create<UserState>(set => ({
    user: null,
    setUser: user => set({ user }),
}));

export default useUserStore;
