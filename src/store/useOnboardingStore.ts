import { create } from 'zustand';

interface OnboardingState {
    step: number;
    nextStep: () => void;
}

export const useOnboardingStore = create<OnboardingState>(set => ({
    step: 0,
    nextStep: () => set(state => ({ step: state.step + 1 })),
}));
