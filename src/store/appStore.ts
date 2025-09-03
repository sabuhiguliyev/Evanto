import { create } from 'zustand';

// Types
type Category = {
    name: string;
    iconName: string; // Use string identifier instead of React component
};

type Location = {
    lat: number;
    lng: number;
};

type AppState = {
    // Global app state
    loading: boolean;
    error: string | null;
    
    // Categories and filters
    categories: Category[];
    categoryFilter: string;
    locationFilter: string;
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
    meetupType: 'Any' | 'In Person' | 'Online';
    meetupDay: 'Today' | 'Tomorrow' | 'This Week' | 'Any';
    
    // Location state
    location: Location | null;
    city: string | null;
    country: string | null;
    locationError: string | null;
    
    // Payment state
    selectedPaymentMethod: string;
    
    // Actions
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    setLocationFilter: (location: string) => void;
    setSearchQuery: (query: string) => void;
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    setMeetupType: (type: 'Any' | 'In Person' | 'Online') => void;
    setMeetupDay: (day: 'Today' | 'Tomorrow' | 'This Week' | 'Any') => void;
    setLocation: (location: Location) => void;
    setCity: (city: string | null) => void;
    setCountry: (country: string | null) => void;
    setLocationError: (error: string | null) => void;
    setSelectedPaymentMethod: (method: string) => void;
    
    // Computed
    filteredAndSearchedItems: () => any[]; // Will be implemented when we connect data
};

// Fixed categories with string identifiers
const fixedCategories: Category[] = [
    { name: 'All', iconName: 'apps' },
    { name: 'Music', iconName: 'music_note' },
    { name: 'Sport', iconName: 'sports_soccer' },
    { name: 'Art', iconName: 'brush' },
    { name: 'Tech', iconName: 'computer' },
    { name: 'Food', iconName: 'restaurant' },
    { name: 'Education', iconName: 'school' },
    { name: 'Business', iconName: 'business' },
    { name: 'Other', iconName: 'more_horiz' },
];

export const useAppStore = create<AppState>((set, get) => ({
    // Initial state
    loading: false,
    error: null,
    categories: fixedCategories,
    categoryFilter: 'All',
    locationFilter: '',
    searchQuery: '',
    minPrice: 0,
    maxPrice: 500,
    meetupType: 'Any',
    meetupDay: 'Any',
    location: null,
    city: null,
    country: null,
    locationError: null,
    selectedPaymentMethod: '',
    
    // Actions
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),
    setLocationFilter: location => set({ locationFilter: location }),
    setSearchQuery: query => set({ searchQuery: query }),
    setMinPrice: value => set({ minPrice: value }),
    setMaxPrice: value => set({ maxPrice: value }),
    setMeetupType: type => set({ meetupType: type }),
    setMeetupDay: day => set({ meetupDay: day }),
    setLocation: location => set({ location }),
    setCity: city => set({ city }),
    setCountry: country => set({ country }),
    setLocationError: error => set({ locationError: error }),
    setSelectedPaymentMethod: method => set({ selectedPaymentMethod: method }),
    
    // Computed (placeholder - will be implemented when connecting data)
    filteredAndSearchedItems: () => [],
}));
