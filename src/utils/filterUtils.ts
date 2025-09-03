import { useAppStore } from '@/store/appStore';

/**
 * Check if any filters are currently active
 */
export const hasActiveFilters = () => {
    const { 
        searchQuery, 
        categoryFilter, 
        minPrice, 
        maxPrice, 
        meetupType, 
        meetupDay, 
        locationFilter 
    } = useAppStore.getState();
    
    return (
        searchQuery || 
        categoryFilter !== 'All' || 
        minPrice > 0 || 
        maxPrice < 500 || 
        meetupType !== 'Any' || 
        meetupDay !== 'Any' || 
        locationFilter
    );
};

/**
 * Reset all filters to default values
 */
export const resetAllFilters = () => {
    const store = useAppStore.getState();
    store.setSearchQuery('');
    store.setCategoryFilter('All');
    store.setMinPrice(0);
    store.setMaxPrice(500);
    store.setMeetupType('Any');
    store.setMeetupDay('Any');
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
        meetupType, 
        meetupDay, 
        locationFilter 
    } = useAppStore.getState();
    
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
    if (meetupType !== 'Any') activeFilters.push(`Type: ${meetupType}`);
    if (meetupDay !== 'Any') activeFilters.push(`Day: ${meetupDay}`);
    if (locationFilter) activeFilters.push(`Location: ${locationFilter}`);
    
    return activeFilters;
};
