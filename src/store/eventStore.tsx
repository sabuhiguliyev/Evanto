import React from 'react';
import { create } from 'zustand';
import { isToday, isTomorrow, isThisWeek } from 'date-fns';
import { Apps, MusicNote, SportsSoccer, Brush, Computer, Restaurant } from '@mui/icons-material';
import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';
import { UnifiedItem } from '@/types/UnifiedItem';

type Category = {
    name: string;
    icon: React.ReactNode;
};

type EventStore = {
    events: Event[];
    meetups: Meetup[];
    items: UnifiedItem[];
    categories: Category[];
    loading: boolean;
    error: string | null;
    categoryFilter: string | null;
    locationFilter: string;
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
    meetupType: 'Any' | 'In Person' | 'Online';
    meetupDay: 'Today' | 'Tomorrow' | 'This Week' | 'Any';
    filteredAndSearchedItems: () => UnifiedItem[];
    setEvents: (events: Event[]) => void;
    setMeetups: (meetups: Meetup[]) => void;
    setItems: (items: UnifiedItem[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    setLocationFilter: (location: string) => void;
    setSearchQuery: (query: string) => void;
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    setMeetupType: (type: 'Any' | 'In Person' | 'Online') => void;
    setMeetupDay: (day: 'Today' | 'Tomorrow' | 'This Week' | 'Any') => void;
    // New functions for managing events and meetups
    deleteEvent: (id: string) => void;
    updateEvent: (id: string, updates: Partial<Event>) => void;
    deleteMeetup: (id: number) => void;
    updateMeetup: (id: number, updates: Partial<Meetup>) => void;
};

const fixedCategories: Category[] = [
    { name: 'All', icon: <Apps fontSize='small' /> },
    { name: 'Music', icon: <MusicNote fontSize='small' /> },
    { name: 'Sport', icon: <SportsSoccer fontSize='small' /> },
    { name: 'Art', icon: <Brush fontSize='small' /> },
    { name: 'Tech', icon: <Computer fontSize='small' /> },
    { name: 'Food', icon: <Restaurant fontSize='small' /> },
];

const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    meetups: [],
    items: [],
    loading: false,
    error: null,
    categoryFilter: 'All',
    categories: fixedCategories,
    searchQuery: '',
    minPrice: 0,
    maxPrice: 500,
    meetupType: 'Any',
    meetupDay: 'Any',
    locationFilter: '',

    setEvents: events => set({ events }),
    setMeetups: meetups => set({ meetups }),
    setItems: items => set({ items }),
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),
    setSearchQuery: query => set({ searchQuery: query }),
    setMeetupDay: day => set({ meetupDay: day }),
    setMeetupType: type => set({ meetupType: type }),
    setMinPrice: value => set({ minPrice: value }),
    setMaxPrice: value => set({ maxPrice: value }),
    setLocationFilter: location => set({ locationFilter: location }),
    
    // New functions for managing events and meetups
    deleteEvent: (id: string) => set(state => ({
        events: state.events.filter(event => event.id !== id),
        items: state.items.filter(item => item.id !== id)
    })),
    
    updateEvent: (id: string, updates: Partial<Event>) => set(state => ({
        events: state.events.map(event => 
            event.id === id ? { ...event, ...updates } : event
        ),
        items: state.items.map(item => 
            item.id === id && item.type === 'event' 
                ? { ...item, ...updates } : item
        )
    })),
    
    deleteMeetup: (id: number) => set(state => ({
        meetups: state.meetups.filter(meetup => meetup.id !== id),
        items: state.items.filter(item => item.id !== id)
    })),
    
    updateMeetup: (id: number, updates: Partial<Meetup>) => set(state => ({
        meetups: state.meetups.map(meetup => 
            meetup.id === id ? { ...meetup, ...updates } : meetup
        ),
        items: state.items.map(item => 
            item.id === id && item.type === 'meetup' 
                ? { ...item, ...updates } : item
        )
    })),

    filteredAndSearchedItems: (): UnifiedItem[] => {
        const { events, meetups, categoryFilter, searchQuery, locationFilter, meetupType, meetupDay } = get();

        const combined = [
            ...events.map(e => ({
                ...e,
                type: 'event' as const,
                title: e.title || '',
                category: e.category || 'Other',
            })),
            ...meetups.map(m => ({
                ...m,
                type: 'meetup' as const,
                title: m.meetup_name || '',
                category: m.category || 'Meetup',
            })),
        ];

        return combined.filter(item => {
            const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            const price = 'ticket_price' in item ? (item.ticket_price ?? 0) : 0;
            const matchesPrice = price >= get().minPrice && price <= get().maxPrice;
            const matchesLocation =
                locationFilter.trim() === '' ||
                (item.type === 'event' &&
                    item.location &&
                    item.location.toLowerCase().includes(locationFilter.trim().toLowerCase()));

            const matchesMeetupType =
                meetupType === 'Any' ||
                (meetupType === 'Online' && item.type === 'meetup') ||
                (meetupType === 'In Person' && item.type === 'event');

            const matchesDay = (item: UnifiedItem) => {
                const date = item.type === 'event' ? item.start_date : item.type === 'meetup' ? item.meetup_date : null;

                if (!date) return false;

                switch (meetupDay) {
                    case 'Today':
                        return isToday(new Date(date));
                    case 'Tomorrow':
                        return isTomorrow(new Date(date));
                    case 'This Week':
                        return isThisWeek(new Date(date));
                    case 'Any':
                    default:
                        return true;
                }
            };

            return (
                matchesCategory &&
                matchesSearch &&
                matchesPrice &&
                matchesLocation &&
                matchesMeetupType &&
                matchesDay(item)
            );
        });
    },
}));

export default useEventStore;
