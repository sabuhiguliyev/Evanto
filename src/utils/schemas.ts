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
    location: z.string().min(1, 'Location is required'),
    category: z.string().min(1, 'Category is required'),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    ticket_price: z.number().min(0, { message: 'Ticket price can not be negative' }).optional(),
    description: z.string().min(1, 'Description is required').optional(),
    event_image: z.any().optional(),
    featured: z.boolean(),
    member_avatars: z.array(z.string()),
    member_count: z.number(),
    // Events are always in-person (physical location, seats, tickets)
    // No online field needed
});

export type Event = z.infer<typeof eventSchema>;

export const meetupSchema = z.object({
    id: z.string().uuid(),  // Changed from z.number() to z.string().uuid()
    created_at: z.string().optional(),
    user_id: z.string().optional(),
    meetup_name: z.string().min(1, 'Meetup name is required'),
    meetup_date: z.coerce.date(),
    meetup_link: z.string().url('Invalid URL').optional(),
    image_url: z.string().url('Invalid image URL').optional(),
    meetup_description: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    featured: z.boolean(),
    online: z.boolean(),
});

export type Meetup = z.infer<typeof meetupSchema>;

export const paymentCardSchema = z.object({
    id: z.string().uuid().optional(),
    user_id: z.string().uuid().optional(),
    card_holder: z.string().min(1, 'Card holder name is required'),
    card_number: z
        .string()
        .min(16, 'Card number must be 16 digits')
        .max(19, 'Card number too long')
        .regex(/^[0-9\s]+$/, 'Card number must contain only numbers'),
    expiry_date: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date must be in MM/YY format'),
    cvv: z
        .string()
        .min(3, 'CVV must be 3 digits')
        .max(4, 'CVV must be 3-4 digits')
        .regex(/^[0-9]+$/, 'CVV must contain only numbers'),
    card_type: z.enum(['visa', 'mastercard', 'amex', 'discover', 'other']),
    is_default: z.boolean().default(false),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});

export type PaymentCard = z.infer<typeof paymentCardSchema>;

export const bookingSchema = z.object({
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

export type BookingFormData = z.infer<typeof bookingSchema>;
