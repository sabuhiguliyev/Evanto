import { create } from 'zustand';
import type { Booking, BookingFormData } from '@/utils/schemas';

interface SeatSelection {
    row: number;
    column: number;
    type: string;
    price: number;
    seat: string;
}

interface BookingData {
    // Personal info (from BookingFormData schema)
    first_name: string;
    last_name: string;
    gender: 'male' | 'female';
    birth_date: Date;
    email: string;
    phone: string;
    country: string;
    accept_terms: boolean;

    // Event info
    event_id?: string;
    event_name?: string;
    event_location?: string;
    event_date?: Date;
    event_time?: string;

    // Seat selection (aligned with booking schema)
    selected_seats: Array<{
        seat: string;
        type: string;
        row: number;
        column: number;
        price: number;
    }>;
    total_price: number;

    // Payment info
    promo_code?: string;
    payment_method?: string;
    booking_id?: string;
}

interface BookingStore {
    bookingData: BookingData;
    setBookingData: (data: Partial<BookingData>) => void;
    addSeat: (seat: Omit<SeatSelection, 'seat'>) => void;
    removeSeat: (seatId: string) => void;
    clearBookingData: () => void;
    calculateTotal: () => number;
}

const useBookingStore = create<BookingStore>((set, get) => ({
    bookingData: {
        first_name: '',
        last_name: '',
        gender: 'male',
        birth_date: new Date(),
        email: '',
        phone: '',
        country: '',
        accept_terms: false,
        selected_seats: [],
        total_price: 0,
    },

    setBookingData: data =>
        set(state => ({
            bookingData: { ...state.bookingData, ...data },
        })),

    addSeat: (seat: Omit<SeatSelection, 'seat'>) =>
        set(state => {
            // Apply 20% price increase for VIP seats
            const adjustedPrice = seat.type.toLowerCase() === 'vip' 
                ? seat.price * 1.2 
                : seat.price;
                
            const seatWithId = {
                seat: `${String.fromCharCode(65 + seat.row)}${seat.column + 1}`,
                type: seat.type,
                row: seat.row,
                column: seat.column,
                price: adjustedPrice,
            };
            const updatedSeats = [...state.bookingData.selected_seats, seatWithId];
            const total_price = updatedSeats.reduce((sum, s) => sum + s.price, 0);
            return {
                bookingData: { ...state.bookingData, selected_seats: updatedSeats, total_price },
            };
        }),

    // store/bookingStore.ts
    removeSeat: (
        seatId: string, // seatId is like "0-1" (row-column)
    ) =>
        set(state => {
            const [row, column] = seatId.split('-').map(Number);
            const updatedSeats = state.bookingData.selected_seats.filter(s => !(s.row === row && s.column === column));
            const total_price = updatedSeats.reduce((sum, s) => sum + s.price, 0);
            return {
                bookingData: { ...state.bookingData, selected_seats: updatedSeats, total_price },
            };
        }),

    clearBookingData: () =>
        set({
            bookingData: {
                first_name: '',
                last_name: '',
                gender: 'male',
                birth_date: new Date(),
                email: '',
                phone: '',
                country: '',
                accept_terms: false,
                selected_seats: [],
                total_price: 0,
            },
        }),

    calculateTotal: () => get().bookingData.selected_seats.reduce((sum, seat) => sum + seat.price, 0),
}));

export default useBookingStore;
