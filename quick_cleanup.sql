-- Quick Database Cleanup for Evanto
-- Copy and paste this into Supabase SQL Editor

-- Delete all records in correct order
DELETE FROM bookings;
DELETE FROM favorites;
DELETE FROM payment_methods;
DELETE FROM events;
DELETE FROM meetups;
DELETE FROM users;

-- Verify cleanup
SELECT 
  'bookings' as table_name, COUNT(*) as records,
  'favorites' as table_name, COUNT(*) as records,
  'payment_methods' as table_name, COUNT(*) as records,
  'events' as table_name, COUNT(*) as records,
  'meetups' as table_name, COUNT(*) as records,
  'users' as table_name, COUNT(*) as records
FROM bookings, favorites, payment_methods, events, meetups, users;
