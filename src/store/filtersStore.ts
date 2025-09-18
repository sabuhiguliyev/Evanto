import { create } from 'zustand';
import { isToday, isTomorrow, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import type { UnifiedItem} from '@/utils/schemas';

export type EventType = 'Any' | 'Events' | 'Meetups';
export type DateFilter = 'Upcoming' | 'All' | 'Today' | 'Tomorrow' | 'This Week' | 'Past';

interface FiltersState {
  categoryFilter: string;
  searchQuery: string;
  locationFilter: string;
  priceRange: [number, number];
  minPrice: number;
  maxPrice: number;
  eventType: EventType;
  dateFilter: DateFilter;
  
  categories: Array<{ name: string; iconName: string }>;
  
  setCategoryFilter: (category: string) => void;
  setSearchQuery: (query: string) => void;
  setLocationFilter: (location: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setEventType: (type: EventType) => void;
  setDateFilter: (filter: DateFilter) => void;
  
  resetFilters: () => void;
  getFilteredItems: (items: UnifiedItem[]) => UnifiedItem[];
  hasActiveFilters: () => boolean;
}

const initialFilters = {
  categoryFilter: 'All',
  searchQuery: '',
  locationFilter: '',
  priceRange: [0, 500] as [number, number],
  minPrice: 0,
  maxPrice: 500,
  eventType: 'Any' as EventType,
  dateFilter: 'Upcoming' as DateFilter,
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
  ...initialFilters,
  
  setCategoryFilter: (category) => set({ categoryFilter: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setLocationFilter: (location) => set({ locationFilter: location }),
  setPriceRange: (range) => set({ 
    priceRange: range, 
    minPrice: range[0], 
    maxPrice: range[1] 
  }),
  setMinPrice: (price) => set((state) => ({ 
    minPrice: price, 
    priceRange: [price, state.maxPrice] 
  })),
  setMaxPrice: (price) => set((state) => ({ 
    maxPrice: price, 
    priceRange: [state.minPrice, price] 
  })),
  setEventType: (type) => set({ eventType: type }),
  setDateFilter: (filter) => set({ dateFilter: filter }),
  
  resetFilters: () => set(initialFilters),
  
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
      if (dateFilter !== 'All') {
        const itemDate = item.start_date;
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
            const weekStart = startOfWeek(now, { weekStartsOn: 1 });
            const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
            if (!isWithinInterval(date, { start: weekStart, end: weekEnd })) return false;
            break;
        }
      }
      
      if (categoryFilter !== 'All') {
        const categoryMatch = item.category && 
          item.category.toLowerCase() === categoryFilter.toLowerCase();
        if (!categoryMatch) return false;
      }
      
      if (searchQuery.trim() !== '') {
        const title = item.title;
        const description = item.description;
        const searchLower = searchQuery.toLowerCase().trim();
        
        if (!title?.toLowerCase().includes(searchLower) && 
            !description?.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      const price = item.type === 'event' ? (item.ticket_price ?? 0) : 0;
      if (price < priceRange[0] || price > priceRange[1]) return false;
      if (eventType !== 'Any') {
        if (eventType === 'Events' && item.type !== 'event') return false;
        if (eventType === 'Meetups' && item.type !== 'meetup') return false;
      }
      
      if (locationFilter.trim() !== '') {
        const itemLocation = item.location ?? '';
        if (!itemLocation.toLowerCase().includes(locationFilter.toLowerCase().trim())) {
          return false;
        }
      }
      
      return true;
    });
  },
}));
