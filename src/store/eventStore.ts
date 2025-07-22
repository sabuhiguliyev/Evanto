import { create } from 'zustand';

export type Event = {
    id: string;
    title: string;
    start_date: string;
    end_date: string;
    start_time?: Date;
    end_time?: Date;
    location: string;
    image_url: string;
    category: string;
    member_avatars: string[];
    member_count: number;
    ticket_price?: string;
    organizer?: string;
};

type EventStore = {
    events: Event[];
    loading: boolean;
    error: string | null;
    categoryFilter: string;
    inquiry: Partial<Event>;
    setEvents: (events: Event[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setCategoryFilter: (category: string) => void;
    filteredEvents: () => Event[];
    setInquiry: (inquiry: Partial<Event>) => void;
    updateInquiryField: <K extends keyof Event>(field: K, value: Event[K]) => void;
    clearInquiry: () => void;
};

const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    loading: false,
    error: null,
    categoryFilter: 'All',
    inquiry: {},

    setEvents: events => set({ events }),
    setLoading: loading => set({ loading }),
    setError: error => set({ error }),
    setCategoryFilter: category => set({ categoryFilter: category }),

    filteredEvents: () => {
        const { events, categoryFilter } = get();
        return categoryFilter === 'All' ? events : events.filter(event => event.category === categoryFilter);
    },

    setInquiry: inquiry => set({ inquiry }),
    updateInquiryField: (field, value) =>
        set(state => ({
            inquiry: { ...state.inquiry, [field]: value },
        })),
    clearInquiry: () => set({ inquiry: {} }),
}));

export default useEventStore;
