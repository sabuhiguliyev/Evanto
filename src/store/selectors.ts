import { useMemo } from 'react';
import { useDataStore } from './dataStore';
import { useFiltersStore } from './filtersStore';

// Performance-optimized selectors using useMemo
export const useFilteredItems = () => {
  const items = useDataStore(state => state.items);
  const categoryFilter = useFiltersStore(state => state.categoryFilter);
  const searchQuery = useFiltersStore(state => state.searchQuery);
  const locationFilter = useFiltersStore(state => state.locationFilter);
  const priceRange = useFiltersStore(state => state.priceRange);
  const meetupType = useFiltersStore(state => state.meetupType);
  const meetupDay = useFiltersStore(state => state.meetupDay);
  
  return useMemo(() => {
    return items.filter(item => {
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
      
      // Meetup type filter
      if (meetupType !== 'Any') {
        if (meetupType === 'Online' && item.type !== 'meetup') return false;
        if (meetupType === 'In Person' && item.type !== 'event') return false;
      }
      
      // Meetup day filter
      if (meetupDay !== 'Any') {
        const itemDate = item.type === 'event' ? item.start_date : item.meetup_date;
        if (!itemDate) return false;
        
        const date = new Date(itemDate);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const thisWeek = new Date(today);
        thisWeek.setDate(thisWeek.getDate() + 7);
        
        switch (meetupDay) {
          case 'Today':
            if (date.toDateString() !== today.toDateString()) return false;
            break;
          case 'Tomorrow':
            if (date.toDateString() !== tomorrow.toDateString()) return false;
            break;
          case 'This Week':
            if (date < today || date > thisWeek) return false;
            break;
        }
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
  }, [items, categoryFilter, searchQuery, locationFilter, priceRange, meetupType, meetupDay]);
};

export const useEvents = () => {
  return useDataStore(state => state.events);
};

export const useMeetups = () => {
  return useDataStore(state => state.meetups);
};

export const useItemsByType = (type: 'event' | 'meetup') => {
  const getItemsByType = useDataStore(state => state.getItemsByType);
  
  return useMemo(() => getItemsByType(type), [getItemsByType, type]);
};

export const useItemById = (id: string) => {
  const getItemById = useDataStore(state => state.getItemById);
  
  return useMemo(() => getItemById(id), [getItemById, id]);
};

export const useEventById = (id: string) => {
  const getEventById = useDataStore(state => state.getEventById);
  
  return useMemo(() => getEventById(id), [getEventById, id]);
};

export const useMeetupById = (id: string) => {
  const getMeetupById = useDataStore(state => state.getMeetupById);
  
  return useMemo(() => getMeetupById(id), [getMeetupById, id]);
};

// Loading states - use individual selectors to avoid object creation
export const useDataLoading = () => {
  const isLoadingEvents = useDataStore(state => state.isLoadingEvents);
  const isLoadingMeetups = useDataStore(state => state.isLoadingMeetups);
  const isLoadingItems = useDataStore(state => state.isLoadingItems);
  
  return useMemo(() => ({
    isLoadingEvents,
    isLoadingMeetups,
    isLoadingItems,
    isLoading: isLoadingEvents || isLoadingMeetups || isLoadingItems,
  }), [isLoadingEvents, isLoadingMeetups, isLoadingItems]);
};

// Error states - use individual selectors to avoid object creation
export const useDataErrors = () => {
  const eventsError = useDataStore(state => state.eventsError);
  const meetupsError = useDataStore(state => state.meetupsError);
  const itemsError = useDataStore(state => state.itemsError);
  
  return useMemo(() => ({
    eventsError,
    meetupsError,
    itemsError,
    hasError: !!(eventsError || meetupsError || itemsError),
  }), [eventsError, meetupsError, itemsError]);
};

// Filter states - use individual selectors to avoid object creation
export const useFilterState = () => {
  const categoryFilter = useFiltersStore(state => state.categoryFilter);
  const searchQuery = useFiltersStore(state => state.searchQuery);
  const locationFilter = useFiltersStore(state => state.locationFilter);
  const priceRange = useFiltersStore(state => state.priceRange);
  const meetupType = useFiltersStore(state => state.meetupType);
  const meetupDay = useFiltersStore(state => state.meetupDay);
  
  const hasActiveFilters = useMemo(() => {
    return (
      categoryFilter !== 'All' ||
      searchQuery.trim() !== '' ||
      locationFilter.trim() !== '' ||
      priceRange[0] !== 0 ||
      priceRange[1] !== 500 ||
      meetupType !== 'Any' ||
      meetupDay !== 'Any'
    );
  }, [categoryFilter, searchQuery, locationFilter, priceRange, meetupType, meetupDay]);
  
  return useMemo(() => ({
    categoryFilter,
    searchQuery,
    locationFilter,
    priceRange,
    meetupType,
    meetupDay,
    hasActiveFilters,
  }), [categoryFilter, searchQuery, locationFilter, priceRange, meetupType, meetupDay, hasActiveFilters]);
};
