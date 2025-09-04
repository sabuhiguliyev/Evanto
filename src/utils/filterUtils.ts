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

/**
 * Get filter summary for display
 */
export const getFilterSummary = () => {
    const { 
        searchQuery, 
        categoryFilter, 
        minPrice, 
        maxPrice, 
        eventType, 
        dateFilter, 
        locationFilter 
    } = useFiltersStore.getState();
    
    const activeFilters = [];
    
    if (searchQuery) activeFilters.push(`Search: "${searchQuery}"`);
    if (categoryFilter !== 'All') activeFilters.push(`Category: ${categoryFilter}`);
    if (minPrice > 0 || maxPrice < 500) {
        const priceRange = minPrice > 0 && maxPrice < 500 
            ? `$${minPrice} - $${maxPrice}`
            : minPrice > 0 
                ? `$${minPrice}+`
                : `$${maxPrice} and below`;
        activeFilters.push(`Price: ${priceRange}`);
    }
    if (eventType !== 'Any') activeFilters.push(`Type: ${eventType}`);
    if (dateFilter !== 'Upcoming') activeFilters.push(`Date: ${dateFilter}`);
    if (locationFilter) activeFilters.push(`Location: ${locationFilter}`);
    
    return activeFilters;
};
