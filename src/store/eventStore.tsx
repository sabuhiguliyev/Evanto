import React from 'react';
import { create } from 'zustand';
import { Apps, MusicNote, SportsSoccer, Brush, Computer, Restaurant } from '@mui/icons-material';
import { Event } from '@/types/Event';
import { Meetup } from '@/types/Meetup';

export type UnifiedItem = (Event & { type: 'event' }) | (Meetup & { type: 'meetup' });

type Category = {
    name: string;
    icon: React.ReactNode;
};

type EventStore = {
    events: Event[];
    meetups: Meetup[];
    items: UnifiedItem[];
    loading: boolean;
    error: string | null;
    categories: Category[];
    categoryFilter: string | null;
    searchQuery: string;
    minPrice: number;
    maxPrice: number;
    filteredAndSearchedItems: () => UnifiedItem[];
    setEvents: (events: Event[]) => void;
    setMeetups: (meetups: Meetup[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    setSearchQuery: (query: string) => void;
    setItems: (items: UnifiedItem[]) => void;
    setMinPrice: (value: number) => void;
    setMaxPrice: (value: number) => void;
    meetupType: 'Any' | 'In Person' | 'Online';
    setMeetupType: (type: 'Any' | 'In Person' | 'Online') => void;
    meetupDay: 'Today' | 'Tomorrow' | 'This Week' | 'Any';
    setMeetupDay: (day: 'Today' | 'Tomorrow' | 'This Week' | 'Any') => void;
    locationFilter: string;
    setLocationFilter: (location: string) => void;
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
    maxPrice: 100,
    meetupType: 'Any',
    meetupDay: 'Any',
    locationFilter: '',

    setMeetupDay: day => set({ meetupDay: day }),
    setMeetupType: type => set({ meetupType: type }),
    setEvents: events => {
        // console.log(
        //     'Setting events with online:',
        //     events.map(e => e.online),
        // );
        set({ events });
    },
    setMeetups: meetups => {
        // console.log(
        //     'Setting meetups with online:',
        //     meetups.map(m => m.online),
        // );
        set({ meetups });
    },
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),
    setSearchQuery: query => set({ searchQuery: query }),
    setItems: (items: UnifiedItem[]) => set({ items }),
    setMinPrice: value => set({ minPrice: value }),
    setMaxPrice: value => set({ maxPrice: value }),
    setLocationFilter: location => set({ locationFilter: location }),

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

            const now = new Date();

            const matchesDay = (item: UnifiedItem) => {
                const date = item.type === 'event' ? item.start_date : item.type === 'meetup' ? item.meetup_date : null;
                if (!date) return false;

                const itemDate = new Date(date);
                const today = new Date(now);
                const tomorrow = new Date(now);
                tomorrow.setDate(tomorrow.getDate() + 1);

                switch (meetupDay) {
                    case 'Today':
                        return itemDate.toDateString() === today.toDateString();
                    case 'Tomorrow':
                        return itemDate.toDateString() === tomorrow.toDateString();
                    case 'This Week': {
                        const startOfWeek = new Date(now);
                        startOfWeek.setDate(now.getDate() - now.getDay());
                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setDate(startOfWeek.getDate() + 6);
                        return itemDate >= startOfWeek && itemDate <= endOfWeek;
                    }
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
