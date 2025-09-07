import { useFiltersStore } from '@/store/filtersStore';

/**
 * Check if any filters are currently active
 */
export const hasActiveFilters = () => {
    const { 
        searchQuery, 
        categoryFilter, 
        minPrice, 
        maxPrice, 
        eventType, 
        dateFilter, 
        locationFilter 
    } = useFiltersStore.getState();
    
    return (
        searchQuery || 
        categoryFilter !== 'All' || 
        minPrice > 0 || 
        maxPrice < 500 || 
        eventType !== 'Any' || 
        dateFilter !== 'Upcoming' || 
        locationFilter
    );
};

/**
 * Reset all filters to default values
 */
export const resetAllFilters = () => {
    const store = useFiltersStore.getState();
    store.setSearchQuery('');
    store.setCategoryFilter('All');
    store.setMinPrice(0);
    store.setMaxPrice(500);
    store.setEventType('Any');
    store.setDateFilter('Upcoming');
    store.setLocationFilter('');
};

