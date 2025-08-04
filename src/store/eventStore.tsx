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
    filteredAndSearchedItems: () => UnifiedItem[];
    setEvents: (events: Event[]) => void;
    setMeetups: (meetups: Meetup[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    setSearchQuery: (query: string) => void;
    setItems: (items: UnifiedItem[]) => void;
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

    setEvents: events => set({ events }),
    setMeetups: meetups => set({ meetups }),
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),
    setSearchQuery: query => set({ searchQuery: query }),
    setItems: (items: UnifiedItem[]) => set({ items }),

    filteredAndSearchedItems: (): UnifiedItem[] => {
        const { events, meetups, categoryFilter, searchQuery } = get();

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

        return combined.filter(
            item =>
                (categoryFilter === 'All' || item.category === categoryFilter) &&
                item.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    },
}));

export default useEventStore;
