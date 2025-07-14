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
    startTime?: Date;
    endTime?: Date;
    ticketPricingEnabled?: boolean;
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
    setInquiry: inquiry => set({ inquiry }),
    updateInquiryField: (field, value) =>
        set(state => ({
            inquiry: { ...state.inquiry, [field]: value },
        })),
    clearInquiry: () => set({ inquiry: {} }),
    filteredEvents: () => {
        const { events, categoryFilter } = get();
        return categoryFilter === 'All' ? events : events.filter(e => e.category === categoryFilter);
    },
}));

export default useEventStore;
