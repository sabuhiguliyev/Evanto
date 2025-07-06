import { create } from 'zustand';

export type Event = {
    id: string;
    title: string;
    image_url: string;
    start_date: string;
    end_date: string;
    location: string;
    category: string;
    member_avatars: string[];
    member_count: number;
};

type EventStore = {
    events: Event[];
    loading: boolean;
    error: string | null;
    categoryFilter: string;
    setEvents: (events: Event[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    filteredEvents: () => Event[];
};

const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    loading: false,
    error: null,
    categoryFilter: 'All',
    setEvents: events => set({ events }),
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),
    filteredEvents: () => {
        const { events, categoryFilter } = get();
        return categoryFilter === 'All' ? events : events.filter(e => e.category === categoryFilter);
    },
}));
export default useEventStore;
