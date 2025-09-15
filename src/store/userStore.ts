import { create } from 'zustand';
import type { User, UserProfile } from '@/utils/schemas';

interface UserState {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>(set => ({
    user: null,
    setUser: user => {
        set({ user });
    },
}));
