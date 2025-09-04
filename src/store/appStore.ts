import { create } from 'zustand';

// Global app state - only what's truly global
interface AppState {
  // Global loading state
  isAppLoading: boolean;
  
  // Global error state
  appError: string | null;
  
  // App version and metadata
  appVersion: string;
  lastSyncTime: Date | null;
  
  // Categories for events/meetups
  categories: Array<{ name: string; iconName: string }>;
  
  // Actions
  setAppLoading: (loading: boolean) => void;
  setAppError: (error: string | null) => void;
  setLastSyncTime: (time: Date) => void;
  
  // Clear app state
  clearAppState: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isAppLoading: false,
  appError: null,
  appVersion: '2.0.0',
  lastSyncTime: null,
  categories: [
    { name: 'All', iconName: 'all' },
    { name: 'Music', iconName: 'music' },
    { name: 'Sport', iconName: 'sport' },
    { name: 'Art', iconName: 'art' },
    { name: 'Education', iconName: 'education' },
    { name: 'Tech', iconName: 'tech' },
    { name: 'Food', iconName: 'food' },
    { name: 'Other', iconName: 'other' },
  ],
  
  // Actions
  setAppLoading: (loading) => set({ isAppLoading: loading }),
  setAppError: (error) => set({ appError: error }),
  setLastSyncTime: (time) => set({ lastSyncTime: time }),
  
  // Clear app state
  clearAppState: () => set({
    isAppLoading: false,
    appError: null,
    lastSyncTime: null,
  }),
}));
