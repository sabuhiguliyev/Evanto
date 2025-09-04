import { create } from 'zustand';
import { isToday, isTomorrow, isThisWeek } from 'date-fns';
import type { UnifiedItem } from '@/types/UnifiedItem';

// Filter types
export type EventType = 'Any' | 'Events' | 'Meetups';
export type DateFilter = 'Upcoming' | 'All' | 'Today' | 'Tomorrow' | 'This Week' | 'Past';

// Filter state
interface FiltersState {
  // Filter values
  categoryFilter: string;
  searchQuery: string;
  locationFilter: string;
  priceRange: [number, number];
  eventType: EventType;
  dateFilter: DateFilter;
  
  // Legacy properties for backward compatibility
  minPrice: number;
  maxPrice: number;
  categories: Array<{ name: string; iconName: string }>;
  
  // Actions
  setCategoryFilter: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setLocationFilter: (location: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setEventType: (type: EventType) => void;
  setDateFilter: (filter: DateFilter) => void;
  
  // Legacy actions for backward compatibility
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  
  // Reset filters
  resetFilters: () => void;
  
  // Computed - filtering logic
  getFilteredItems: (items: UnifiedItem[]) => UnifiedItem[];
  
  // Check if any filters are active
  hasActiveFilters: () => boolean;
}

// Initial filter state
const initialFilters = {
  categoryFilter: 'All',
  searchQuery: '',
  locationFilter: '',
  priceRange: [0, 500] as [number, number],
  eventType: 'Any' as EventType,
  dateFilter: 'Upcoming' as DateFilter,
  minPrice: 0,
  maxPrice: 500,
  categories: [
    { name: 'All', iconName: 'apps' },
    { name: 'Music', iconName: 'music_note' },
    { name: 'Sport', iconName: 'sports_soccer' },
    { name: 'Art', iconName: 'brush' },
    { name: 'Education', iconName: 'school' },
    { name: 'Tech', iconName: 'computer' },
    { name: 'Food', iconName: 'restaurant' },
    { name: 'Other', iconName: 'more_horiz' },
  ],
};

export const useFiltersStore = create<FiltersState>((set, get) => ({
  // Initial state
  ...initialFilters,
  
  // Actions
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLocationFilter: (location) => set({ locationFilter: location }),
  setPriceRange: (range) => set({ priceRange: range, minPrice: range[0], maxPrice: range[1] }),
  setEventType: (type) => set({ eventType: type }),
  setDateFilter: (filter) => set({ dateFilter: filter }),
  
  // Legacy actions for backward compatibility
  setMinPrice: (price) => set({ minPrice: price, priceRange: [price, get().maxPrice] }),
  setMaxPrice: (price) => set({ maxPrice: price, priceRange: [get().minPrice, price] }),
  
  // Reset all filters
  resetFilters: () => set(initialFilters),
  
  // Check if any filters are active
  hasActiveFilters: () => {
    const state = get();
    return (
      state.categoryFilter !== 'All' ||
      state.searchQuery.trim() !== '' ||
      state.locationFilter.trim() !== '' ||
      state.priceRange[0] !== 0 ||
      state.priceRange[1] !== 500 ||
      state.eventType !== 'Any' ||
      state.dateFilter !== 'Upcoming'
    );
  },
  
  // Main filtering logic
  getFilteredItems: (items: UnifiedItem[]) => {
    const {
      categoryFilter,
      searchQuery,
      locationFilter,
      priceRange,
      eventType,
      dateFilter,
    } = get();
    
    return items.filter(item => {
      // Date filter - most important filter, apply first
      if (dateFilter !== 'All') {
        const itemDate = item.type === 'event' ? item.start_date : item.meetup_date;
        if (!itemDate) return false;
        
        const date = new Date(itemDate);
        const now = new Date();
        
        switch (dateFilter) {
          case 'Upcoming':
            if (date <= now) return false;
            break;
          case 'Past':
            if (date >= now) return false;
            break;
          case 'Today':
            if (!isToday(date)) return false;
            break;
          case 'Tomorrow':
            if (!isTomorrow(date)) return false;
            break;
          case 'This Week':
            if (!isThisWeek(date)) return false;
            break;
        }
      }
      
      // Category filter
      if (categoryFilter !== 'All') {
        const categoryMatch = item.category && 
          item.category.toLowerCase() === categoryFilter.toLowerCase();
        if (!categoryMatch) return false;
      }
      
      // Search filter
      if (searchQuery.trim() !== '') {
        const title = item.type === 'event' ? item.title : item.meetup_name;
        const description = item.type === 'event' ? item.description : item.description;
        const searchLower = searchQuery.toLowerCase().trim();
        
        if (!title?.toLowerCase().includes(searchLower) && 
            !description?.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      // Price filter
      const price = item.type === 'event' ? item.ticket_price : item.meetup_price || 0;
      if ((price || 0) < priceRange[0] || (price || 0) > priceRange[1]) return false;
      
      // Event type filter
      if (eventType !== 'Any') {
        if (eventType === 'Events' && item.type !== 'event') return false;
        if (eventType === 'Meetups' && item.type !== 'meetup') return false;
      }
      
      // Location filter
      if (locationFilter.trim() !== '') {
        const itemLocation = item.location || '';
        if (!itemLocation.toLowerCase().includes(locationFilter.toLowerCase().trim())) {
          return false;
        }
      }
      
      return true;
    });
  },
}));
