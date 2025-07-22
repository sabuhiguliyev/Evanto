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
    title: z.string().min(1, 'Title is required'),
    location: z.string().min(1, 'Location is required'),
    start_date: z.coerce.date(),
    end_date: z.coerce.date(),
    ticket_price: z.number().min(0, { message: 'Ticket price can not be negative' }).optional(),
    description: z.string().min(1, 'Description is required').optional(),
    event_image: z
        .any()
        .refine(val => !val || (Array.isArray(val) && val[0] instanceof File), {
            message: 'Invalid file',
        })
        .optional(),
});
