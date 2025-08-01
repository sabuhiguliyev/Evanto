import React from 'react';
import { create } from 'zustand';
import { Apps, MusicNote, SportsSoccer, Brush, Computer, Restaurant } from '@mui/icons-material';
import { Event } from '@/types/Event';

type Category = {
    name: string;
    icon: React.ReactNode;
};

type EventStore = {
    events: Event[];
    loading: boolean;
    error: string | null;
    categories: Category[];
    categoryFilter: string | null;
    searchQuery: string;
    filteredAndSearchedEvents: () => Event[];
    setEvents: (events: Event[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    setSearchQuery: (query: string) => void;
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
    loading: false,
    error: null,
    categoryFilter: 'All',
    categories: fixedCategories,
    searchQuery: '',

    setEvents: events => set({ events }),
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),
    setSearchQuery: query => set({ searchQuery: query }),

    filteredAndSearchedEvents: () => {
        const { events, categoryFilter, searchQuery } = get();
        return events.filter(
            event =>
                (categoryFilter === 'All' || event.category === categoryFilter) &&
                event.title.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    },
}));

export default useEventStore;
