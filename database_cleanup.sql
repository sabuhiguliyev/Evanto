-- Database Cleanup Script for Evanto
-- This script will delete all records from all tables to start fresh
-- Run this in your Supabase SQL editor

-- Disable RLS temporarily for cleanup (optional)
-- ALTER TABLE bookings DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE favorites DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE payment_methods DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE events DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE meetups DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Delete in order to respect foreign key constraints
-- 1. Delete bookings first (references events and payment_methods)
DELETE FROM bookings;

-- 2. Delete favorites (references events/meetups)
DELETE FROM favorites;

-- 3. Delete payment methods (referenced by bookings)
DELETE FROM payment_methods;

-- 4. Delete events (referenced by bookings and favorites)
DELETE FROM events;

-- 5. Delete meetups (referenced by favorites)
DELETE FROM meetups;

-- 6. Delete users (referenced by all other tables)
DELETE FROM users;

-- Re-enable RLS after cleanup (if you disabled it)
-- ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE meetups ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Verify all tables are empty
SELECT 'bookings' as table_name, COUNT(*) as record_count FROM bookings
UNION ALL
SELECT 'favorites' as table_name, COUNT(*) as record_count FROM favorites
UNION ALL
SELECT 'payment_methods' as table_name, COUNT(*) as record_count FROM payment_methods
UNION ALL
SELECT 'events' as table_name, COUNT(*) as record_count FROM events
UNION ALL
SELECT 'meetups' as table_name, COUNT(*) as record_count FROM meetups
UNION ALL
SELECT 'users' as table_name, COUNT(*) as record_count FROM users;

-- Reset auto-increment sequences (if any)
-- Note: UUIDs don't need sequence reset, but if you have any auto-increment fields:
-- ALTER SEQUENCE IF EXISTS events_id_seq RESTART WITH 1;
-- ALTER SEQUENCE IF EXISTS meetups_id_seq RESTART WITH 1;
-- etc.

-- Optional: Reset timestamps to current time
-- This is not needed for UUIDs, but if you want to reset created_at timestamps:
-- UPDATE events SET created_at = now() WHERE created_at IS NOT NULL;
-- UPDATE meetups SET created_at = now() WHERE created_at IS NOT NULL;
-- etc.

-- Success message
SELECT 'Database cleanup completed successfully!' as status;
