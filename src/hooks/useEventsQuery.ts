import { useEffect } from 'react';
import { fetchEvents } from '@/utils/supabase';
import useEventStore from '@/store/eventStore';
import type { Event } from '@/types/Event';

export const useEventsQuery = () => {
    const setEvents = useEventStore(state => state.setEvents);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const events: Event[] = await fetchEvents();
                setEvents(events);
            } catch (err) {
                console.error('Failed to load events:', err);
            }
        };

        void loadEvents();
    }, [setEvents]);
};
