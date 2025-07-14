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
    start_date: z.date({ required_error: 'Event date required' }),
    end_date: z.date({ required_error: 'Event date required' }),
    ticket_price: z.string().optional(),
    description: z.string().optional(),
    event_image: z
        .any()
        .refine(val => !val || (Array.isArray(val) && val[0] instanceof File), {
            message: 'Invalid file',
        })
        .optional(),
});
