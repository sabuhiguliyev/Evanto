-- Database trigger function to update event member_avatars and member_count when a booking is created
-- This should be run in your Supabase SQL editor

-- Function to update event members when a booking is created
CREATE OR REPLACE FUNCTION update_event_members()
RETURNS TRIGGER AS $$
DECLARE
    user_avatar_url TEXT;
    current_member_avatars TEXT[];
    current_member_count INTEGER;
BEGIN
    -- Get the user's avatar URL
    SELECT avatar_url INTO user_avatar_url
    FROM public.users
    WHERE id = NEW.user_id;
    
    -- Get current member_avatars and member_count from the event
    SELECT 
        COALESCE(member_avatars, '{}'::TEXT[]),
        COALESCE(member_count, 0)
    INTO 
        current_member_avatars,
        current_member_count
    FROM public.events
    WHERE id = NEW.event_id;
    
    -- Only update if the user's avatar is not already in the list
    IF user_avatar_url IS NOT NULL AND NOT (user_avatar_url = ANY(current_member_avatars)) THEN
        -- Add the user's avatar to the member_avatars array
        current_member_avatars := array_append(current_member_avatars, user_avatar_url);
        
        -- Increment the member count
        current_member_count := current_member_count + 1;
        
        -- Update the event with new member data
        UPDATE public.events
        SET 
            member_avatars = current_member_avatars,
            member_count = current_member_count,
            updated_at = NOW()
        WHERE id = NEW.event_id;
    END IF;
    
    RETURN NEW;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to update event members: %', SQLERRM;
        RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function when a booking is inserted
DROP TRIGGER IF EXISTS on_booking_created ON public.bookings;
CREATE TRIGGER on_booking_created
    AFTER INSERT ON public.bookings
    FOR EACH ROW
    WHEN (NEW.event_id IS NOT NULL)
    EXECUTE FUNCTION update_event_members();

-- Also create a trigger for when a booking is deleted to remove the member
CREATE OR REPLACE FUNCTION remove_event_member()
RETURNS TRIGGER AS $$
DECLARE
    user_avatar_url TEXT;
    current_member_avatars TEXT[];
    current_member_count INTEGER;
    updated_member_avatars TEXT[];
BEGIN
    -- Get the user's avatar URL
    SELECT avatar_url INTO user_avatar_url
    FROM public.users
    WHERE id = OLD.user_id;
    
    -- Get current member_avatars and member_count from the event
    SELECT 
        COALESCE(member_avatars, '{}'::TEXT[]),
        COALESCE(member_count, 0)
    INTO 
        current_member_avatars,
        current_member_count
    FROM public.events
    WHERE id = OLD.event_id;
    
    -- Only update if the user's avatar was in the list
    IF user_avatar_url IS NOT NULL AND user_avatar_url = ANY(current_member_avatars) THEN
        -- Remove the user's avatar from the member_avatars array
        updated_member_avatars := array_remove(current_member_avatars, user_avatar_url);
        
        -- Decrement the member count (but don't go below 0)
        current_member_count := GREATEST(current_member_count - 1, 0);
        
        -- Update the event with new member data
        UPDATE public.events
        SET 
            member_avatars = updated_member_avatars,
            member_count = current_member_count,
            updated_at = NOW()
        WHERE id = OLD.event_id;
    END IF;
    
    RETURN OLD;
EXCEPTION
    WHEN OTHERS THEN
        RAISE WARNING 'Failed to remove event member: %', SQLERRM;
        RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to call the function when a booking is deleted
DROP TRIGGER IF EXISTS on_booking_deleted ON public.bookings;
CREATE TRIGGER on_booking_deleted
    AFTER DELETE ON public.bookings
    FOR EACH ROW
    WHEN (OLD.event_id IS NOT NULL)
    EXECUTE FUNCTION remove_event_member();
