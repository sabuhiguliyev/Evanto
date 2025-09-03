import { z } from 'zod';

export const signUpSchema = z
    .object({
        fullName: z.string().min(1, 'Full name is required'),
        email: z.string().email('Invalid email format'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const signInSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email('Invalid email format'),
});

export const resetPasswordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

export const eventSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    location: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    ticket_price: z.number().min(0, { message: 'Ticket price can not be negative' }).optional(),
    image: z.string().optional(), // Changed from event_image to match database
    featured: z.boolean().default(false),
    max_participants: z.number().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    // Member data will be derived from event_participants table
});

export type Event = z.infer<typeof eventSchema>;

export const meetupSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    meetup_name: z.string().min(1, 'Meetup name is required'),
    meetup_date: z.coerce.date(),
    meetup_link: z.string().optional(),
    description: z.string().optional(), // Changed from meetup_description to match database
    location: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    featured: z.boolean().default(false),
    online: z.boolean().default(false),
    meetup_image: z.string().optional(), // Changed from image_url to match database
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type Meetup = z.infer<typeof meetupSchema>;

// User schema for users table
export const userSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    email: z.string().email('Invalid email format'),
    full_name: z.string().optional(),
    avatar_url: z.string().optional(),
    bio: z.string().optional(),
    location: z.string().optional(),
    notifications_enabled: z.boolean().default(true),
    language: z.string().default('en'),
    dark_mode: z.boolean().default(false),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    last_login: z.string().optional(),
});

export type User = z.infer<typeof userSchema>;

// Payment method schema for payment_methods table
export const paymentMethodSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    type: z.enum(['card', 'paypal', 'apple_pay', 'google_pay']),
    card_type: z.string().optional(), // 'visa', 'mastercard', etc.
    last_four_digits: z.string().optional(),
    expiry_month: z.number().optional(),
    expiry_year: z.number().optional(),
    is_default: z.boolean().default(false),
    created_at: z.string().optional(),
});

export type PaymentMethod = z.infer<typeof paymentMethodSchema>;

// Ticket schema for tickets table
export const ticketSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    event_id: z.string().uuid().optional(),
    ticket_type: z.string().min(1, 'Ticket type is required'),
    name: z.string().min(1, 'Ticket name is required'),
    description: z.string().optional(),
    price: z.number().min(0, 'Price cannot be negative'),
    quantity_available: z.number().min(0, 'Quantity cannot be negative'),
    quantity_sold: z.number().default(0),
    sale_start_date: z.coerce.date().optional(),
    sale_end_date: z.coerce.date().optional(),
    is_active: z.boolean().default(true),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type Ticket = z.infer<typeof ticketSchema>;

// Booking schema for bookings table
export const bookingSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    event_id: z.string().uuid().optional(),
    order_number: z.string().min(1, 'Order number is required'),
    total_amount: z.number().min(0, 'Total amount cannot be negative'),
    status: z.enum(['pending', 'confirmed', 'cancelled', 'refunded']).default('pending'),
    payment_status: z.enum(['pending', 'paid', 'failed', 'refunded']).default('pending'),
    payment_method_id: z.string().uuid().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
    confirmed_at: z.string().optional(),
});

export type Booking = z.infer<typeof bookingSchema>;

// Event participant schema for event_participants table
export const eventParticipantSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    event_id: z.string().uuid().optional(),
    status: z.enum(['joined', 'left', 'pending']).default('joined'),
    seat_numbers: z.array(z.number()).optional(),
    joined_at: z.string().optional(),
});

export type EventParticipant = z.infer<typeof eventParticipantSchema>;

// Meetup participant schema for meetup_participants table
export const meetupParticipantSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    meetup_id: z.string().uuid().optional(),
    status: z.enum(['joined', 'left', 'pending']).default('joined'),
    joined_at: z.string().optional(),
});

export type MeetupParticipant = z.infer<typeof meetupParticipantSchema>;

// Notification schema for notifications table
export const notificationSchema = z.object({
    id: z.string().uuid().optional().nullable(),
    user_id: z.string().uuid().optional(),
    type: z.string().min(1, 'Notification type is required'),
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    data: z.any().optional(), // JSONB field
    read: z.boolean().default(false),
    created_at: z.string().optional(),
});

export type Notification = z.infer<typeof notificationSchema>;

// Booking form schema for user input forms (not database table)
export const bookingFormSchema = z.object({
    first_name: z.string().min(1, 'First name is required'),
    last_name: z.string().min(1, 'Last name is required'),
    gender: z.enum(['male', 'female']),
    birth_date: z.date(),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(1, 'Phone number is required'),
    country: z.string().min(1, 'Country is required'),
    accept_terms: z.boolean().refine(val => val, 'You must accept the terms'),
    event_id: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
