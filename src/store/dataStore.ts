import { create } from 'zustand';
import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';
import { UnifiedItem } from '@/types/UnifiedItem';
import { addFavorite, deleteFavorite, fetchFavorites } from '@/utils/supabaseService';
import { isSameDay } from 'date-fns';

// Types
type Favorite = {
    item_id: string | number;
    online: boolean;
    user_id: string;
};

type Booking = {
    booking_id: string;
    user_id: string;
    item_id: string;
    item_type: 'event' | 'meetup';
    status: 'pending' | 'confirmed' | 'cancelled';
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    gender: 'male' | 'female';
    birth_date: string;
    country: string;
    selected_seats: string[];
    total_price: number;
    promo_code?: string;
    payment_method?: string;
    created_at: string;
    updated_at: string;
};

// Meetup creation state
type MeetupCreationState = {
    currentStep: number;
    meetupName: string;
    meetupDate: Date | null;
    meetupLink: string;
    meetupDescription: string;
    selectedPhoto: string | null;
    photos: string[];
};

// Booking flow state
type BookingFlowState = {
    event_id: string | null;
    selected_seats: Array<{
        row: number;
        column: number;
        type: string;
        price: number;
        id: string;
    }>;
    total_price: number;
};

type DataState = {
    // Data arrays
    events: Event[];
    meetups: Meetup[];
    items: UnifiedItem[];
    favorites: Favorite[];
    bookings: Booking[];
    
    // Filter state
    categoryFilter: string | null;
    searchQuery: string;
    locationFilter: string;
    meetupType: 'Any' | 'In Person' | 'Online';
    meetupDay: 'Today' | 'Tomorrow' | 'This Week' | 'Any';
    minPrice: number;
    maxPrice: number;
    
    // Meetup creation state
    meetupCreation: MeetupCreationState;
    
    // Booking flow state
    bookingFlow: BookingFlowState;
    
    // Actions for events
    setEvents: (events: Event[]) => void;
    setMeetups: (meetups: Meetup[]) => void;
    setItems: (items: UnifiedItem[]) => void;
    deleteEvent: (id: string) => void;
    updateEvent: (id: string, updates: Partial<Event>) => void;
    deleteMeetup: (id: string) => void;
    updateMeetup: (id: number, updates: Partial<Meetup>) => void;
    
    // Actions for favorites
    setFavorites: (favorites: Favorite[]) => void;
    toggleFavorite: (item: UnifiedItem, userId: string) => Promise<void>;
    loadFavorites: (userId: string) => Promise<void>;
    
    // Actions for bookings
    setBookings: (bookings: Booking[]) => void;
    addBooking: (booking: Booking) => void;
    updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
    deleteBooking: (bookingId: string) => void;
    
    // Actions for meetup creation
    setMeetupStep: (step: number) => void;
    setMeetupName: (name: string) => void;
    setMeetupDate: (date: Date | null) => void;
    setMeetupLink: (link: string) => void;
    setMeetupDescription: (description: string) => void;
    setSelectedPhoto: (photo: string | null) => void;
    addPhoto: (photo: string) => void;
    removePhoto: (photoIndex: number) => void;
    resetMeetupCreation: () => void;
    
    // Actions for filters
    setCategoryFilter: (category: string) => void;
    setSearchQuery: (query: string) => void;
    setLocationFilter: (location: string) => void;
    setMeetupType: (type: 'Any' | 'In Person' | 'Online') => void;
    setMeetupDay: (day: 'Today' | 'Tomorrow' | 'This Week' | 'Any') => void;
    setMinPrice: (price: number) => void;
    setMaxPrice: (price: number) => void;
    
    // Actions for booking flow
    setEventId: (eventId: string | null) => void;
    addSeat: (seat: { row: number; column: number; type: string; price: number; id: string }) => void;
    removeSeat: (seatId: string) => void;
    setTotalPrice: (price: number) => void;
    resetBookingFlow: () => void;
    
    // Computed
    getFavoritesForUser: (userId: string) => Favorite[];
    getBookingsForUser: (userId: string) => Booking[];
    getItemsByStatus: (status: string) => UnifiedItem[];
};

export const useDataStore = create<DataState>((set, get) => ({
    // Initial state
    events: [],
    meetups: [],
    items: [],
    favorites: [],
    bookings: [],
    
    // Meetup creation initial state
    meetupCreation: {
        currentStep: 1,
        meetupName: '',
        meetupDate: null,
        meetupLink: '',
        meetupDescription: '',
        selectedPhoto: null,
        photos: [
            'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2f8MXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://images.unsplash.com/photo-1561489396-888724a1543d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://media.istockphoto.com/id/2193248014/photo/happy-businessman-talking-to-his-colleagues-in-hallway-of-a-convention-center.webp?a=1&b=1&s=612x612&w=0&k=20&c=z_tKiGLufPWuuNWMXe2bwuI5U1kU2KGdkRTBtYUPMtU=',
            'https://media.istockphoto.com/id/1805953261/photo/embroidered-red-pins-on-a-calendar-event-planner-calendar-clock-to-set-timetable-organize.webp?a=1&b=1&s=612x612&w=0&k=20&c=0OTpK7A4PmlMA7WvGA5oo4Tm3GlCVhw_y6ueOsZHj9o=',
            'https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://images.unsplash.com/file-1705123271268-c3eaf6a79b21image?w=416&dpr=2&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGV2ZW50fGVufDB8fDB8fHwy',
            'https://images.unsplash.com/photo-1692261874907-a50930aa2972?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1507608443039-bfde4fbcd142?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
            'https://images.unsplash.com/photo-1465060810938-30bbe7c40e76?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
        ]
    },
    
    // Booking flow initial state
    bookingFlow: {
        event_id: null,
        selected_seats: [],
        total_price: 0
    },
    
    // Event actions
    setEvents: events => set({ events }),
    setMeetups: meetups => set({ meetups }),
    setItems: items => set({ items }),
    
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
    
    deleteMeetup: (id: string) => set(state => ({
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
    
    // Favorite actions
    setFavorites: favorites => set({ favorites }),
    
    toggleFavorite: async (item, userId) => {
        if (!item.id) return; // Skip if item has no ID
        
        const { favorites } = get();
        const existingFavorite = favorites.find(fav => 
            fav.item_id === item.id && fav.user_id === userId
        );
        
        if (existingFavorite) {
            await deleteFavorite(item, userId);
            set(state => ({
                favorites: state.favorites.filter(fav => 
                    !(fav.item_id === item.id && fav.user_id === userId)
                )
            }));
        } else {
            await addFavorite(item, userId);
            const newFavorite = {
                item_id: item.id,
                user_id: userId,
                online: item.online || false
            };
            set(state => ({ favorites: [...state.favorites, newFavorite] }));
        }
    },
    
    loadFavorites: async (userId) => {
        try {
            const favorites = await fetchFavorites(userId);
            set({ favorites });
        } catch (error) {
            console.error('Failed to load favorites:', error);
        }
    },
    
    // Booking actions
    setBookings: bookings => set({ bookings }),
    addBooking: booking => set(state => ({ bookings: [...state.bookings, booking] })),
    
    updateBookingStatus: (bookingId, status) => set(state => ({
        bookings: state.bookings.map(booking => 
            booking.booking_id === bookingId 
                ? { ...booking, status, updated_at: new Date().toISOString() }
                : booking
        )
    })),
    
    deleteBooking: bookingId => set(state => ({
        bookings: state.bookings.filter(booking => booking.booking_id !== bookingId)
    })),
    
    // Meetup creation actions
    setMeetupStep: step => set(state => ({
        meetupCreation: { ...state.meetupCreation, currentStep: step }
    })),
    
    setSelectedPhoto: photo => set(state => ({
        meetupCreation: { ...state.meetupCreation, selectedPhoto: photo }
    })),
    
    addPhoto: photo => set(state => ({
        meetupCreation: { 
            ...state.meetupCreation, 
            photos: [...state.meetupCreation.photos, photo] 
        }
    })),
    
    removePhoto: photoIndex => set(state => ({
        meetupCreation: {
            ...state.meetupCreation,
            photos: state.meetupCreation.photos.filter((_, index) => index !== photoIndex)
        }
    })),
    
    setMeetupName: name => set(state => ({
        meetupCreation: { ...state.meetupCreation, meetupName: name }
    })),
    
    setMeetupDate: date => set(state => ({
        meetupCreation: { ...state.meetupCreation, meetupDate: date }
    })),
    
    setMeetupLink: link => set(state => ({
        meetupCreation: { ...state.meetupCreation, meetupLink: link }
    })),
    
    setMeetupDescription: description => set(state => ({
        meetupCreation: { ...state.meetupCreation, meetupDescription: description }
    })),
    
    resetMeetupCreation: () => set(state => ({
        meetupCreation: {
            currentStep: 1,
            meetupName: '',
            meetupDate: null,
            meetupLink: '',
            meetupDescription: '',
            selectedPhoto: null,
            photos: [
                'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
                'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
                'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
                'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
                'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fHwy',
                'https://images.unsplash.com/photo-1561489396-888724a1543d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHwy',
                'https://media.istockphoto.com/id/2193248014/photo/happy-businessman-talking-to-his-colleagues-in-hallway-of-a-convention-center.webp?a=1&b=1&s=612x612&w=0&k=20&c=z_tKiGLufPWuuNWMXe2bwuI5U1kU2KGdkRTBtYUPMtU=',
                'https://images.unsplash.com/photo-1805953261/photo/embroidered-red-pins-on-a-calendar-event-planner-calendar-clock-to-set-timetable-organize.webp?a=1&b=1&s=612x612&w=0&k=20&c=0OTpK7A4PmlMA7WvGA5oo4Tm3GlCVhw_y6ueOsZHj9o=',
                'https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGV2ZW50fGVufDB8fDB8fHwy',
                'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGV2ZW50fGVufDB8fDB8fHwy',
                'https://images.unsplash.com/file-1705123271268-c3eaf6a79b21image?w=416&dpr=2&auto=format&fit=crop&q=60',
                'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
                'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGV2ZW50fGVufDB8fDB8fHwy',
                'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGV2ZW50fGVufDB8fDB8fHwy',
                'https://images.unsplash.com/photo-1692261874907-a50930aa2972?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
                'https://images.unsplash.com/photo-1507608443039-bfde4fbcd142?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
                'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
                'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
                'https://images.unsplash.com/photo-1465060810938-30bbe7c40e76?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
            ]
        }
    })),
    
    // Booking flow actions
    setEventId: eventId => set(state => ({
        bookingFlow: { ...state.bookingFlow, event_id: eventId }
    })),
    
    addSeat: seat => set(state => {
        // Generate a unique ID for the seat if it doesn't have one
        const seatWithId = { ...seat, id: `${seat.row}-${seat.column}` };
        return {
            bookingFlow: {
                ...state.bookingFlow,
                selected_seats: [...state.bookingFlow.selected_seats, seatWithId],
                total_price: state.bookingFlow.total_price + seat.price
            }
        };
    }),
    
    removeSeat: seatId => set(state => {
        const seat = state.bookingFlow.selected_seats.find(s => s.id === seatId);
        return {
            bookingFlow: {
                ...state.bookingFlow,
                selected_seats: state.bookingFlow.selected_seats.filter(s => s.id !== seatId),
                total_price: seat ? state.bookingFlow.total_price - seat.price : state.bookingFlow.total_price
            }
        };
    }),
    
    setTotalPrice: price => set(state => ({
        bookingFlow: { ...state.bookingFlow, total_price: price }
    })),
    
    resetBookingFlow: () => set(state => ({
        bookingFlow: {
            event_id: null,
            selected_seats: [],
            total_price: 0
        }
    })),
    
    // Computed
    getFavoritesForUser: (userId) => get().favorites.filter(fav => fav.user_id === userId),
    getBookingsForUser: (userId) => get().bookings.filter(booking => booking.user_id === userId),
    getItemsByStatus: (status) => get().items, // Placeholder - implement filtering logic
    
    // Comprehensive filtering function
    filteredAndSearchedItems: () => {
        const { items, categoryFilter, searchQuery, locationFilter, meetupType, meetupDay, minPrice, maxPrice } = get();
        
        return items.filter(item => {
            // Category filter
            if (categoryFilter && categoryFilter !== 'All') {
                const categoryMatch = item.category && item.category.toLowerCase() === categoryFilter.toLowerCase();
                if (!categoryMatch) return false;
            }
            
            // Search filter
            if (searchQuery && searchQuery.trim() !== '') {
                const title = item.title || item.meetup_name || '';
                const description = item.description || item.meetup_description || '';
                const searchLower = searchQuery.toLowerCase().trim();
                if (!title.toLowerCase().includes(searchLower) && 
                    !description.toLowerCase().includes(searchLower)) {
                    return false;
                }
            }
            
            // Price filter
            const price = item.ticket_price || 0;
            if (price < minPrice || price > maxPrice) return false;
            
            // Meetup type filter
            if (meetupType !== 'Any') {
                if (meetupType === 'Online' && item.type !== 'meetup') return false;
                if (meetupType === 'In Person' && item.type !== 'event') return false;
            }
            
            // Meetup day filter
            if (meetupDay !== 'Any') {
                const itemDate = item.type === 'event' ? item.start_date : item.meetup_date;
                if (!itemDate) return false;
                
                const date = new Date(itemDate);
                const today = new Date();
                const tomorrow = new Date(today);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const thisWeek = new Date(today);
                thisWeek.setDate(thisWeek.getDate() + 7);
                
                switch (meetupDay) {
                    case 'Today':
                        if (!isSameDay(date, today)) return false;
                        break;
                    case 'Tomorrow':
                        if (!isSameDay(date, tomorrow)) return false;
                        break;
                    case 'This Week':
                        if (date < today || date > thisWeek) return false;
                        break;
                }
            }
            
            // Location filter
            if (locationFilter && locationFilter.trim() !== '') {
                const itemLocation = item.location || '';
                if (!itemLocation.toLowerCase().includes(locationFilter.toLowerCase().trim())) {
                    return false;
                }
            }
            
            return true;
        });
    },
}));
