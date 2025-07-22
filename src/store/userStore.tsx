import { create } from 'zustand';

export interface User {
    id: string;
    full_name?: string;
    email: string;
    avatar_url?: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
}

const useUserStore = create<UserState>(set => ({
    user: null,
    setUser: user => set({ user }),
}));

export default useUserStore;
