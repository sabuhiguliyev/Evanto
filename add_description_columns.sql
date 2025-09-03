-- Add description column to events table if it doesn't exist
ALTER TABLE events 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Add description column to meetups table if it doesn't exist  
ALTER TABLE meetups 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update the schemas to reflect the correct structure
-- Events table should have: id, user_id, title, description, location, category, start_date, end_date, ticket_price, featured, max_participants, image, created_at, updated_at
-- Meetups table should have: id, user_id, meetup_name, description, location, category, meetup_date, meetup_link, featured, online, meetup_image, created_at, updated_at
