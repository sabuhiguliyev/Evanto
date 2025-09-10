-- Backfill script to update existing events with member_avatars and member_count
-- This should be run in your Supabase SQL editor after creating the triggers

-- First, let's see what events exist and their current member data
SELECT 
    e.id,
    e.title,
    e.member_avatars,
    e.member_count,
    COUNT(b.id) as actual_booking_count
FROM public.events e
LEFT JOIN public.bookings b ON e.id = b.event_id
GROUP BY e.id, e.title, e.member_avatars, e.member_count
ORDER BY e.created_at DESC;

-- Update events with member data from existing bookings
WITH event_members AS (
    SELECT 
        e.id as event_id,
        array_agg(DISTINCT u.avatar_url) FILTER (WHERE u.avatar_url IS NOT NULL) as member_avatars,
        COUNT(DISTINCT b.user_id) as member_count
    FROM public.events e
    LEFT JOIN public.bookings b ON e.id = b.event_id
    LEFT JOIN public.users u ON b.user_id = u.id
    GROUP BY e.id
)
UPDATE public.events
SET 
    member_avatars = em.member_avatars,
    member_count = em.member_count,
    updated_at = NOW()
FROM event_members em
WHERE events.id = em.event_id;

-- Verify the update worked
SELECT 
    e.id,
    e.title,
    e.member_avatars,
    e.member_count,
    COUNT(b.id) as actual_booking_count
FROM public.events e
LEFT JOIN public.bookings b ON e.id = b.event_id
GROUP BY e.id, e.title, e.member_avatars, e.member_count
ORDER BY e.created_at DESC;
