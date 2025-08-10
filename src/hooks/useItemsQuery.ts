import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents, fetchMeetups } from '@/utils/supabase';
import useEventStore from '@/store/eventStore';

export default function useItemsQuery() {
    const { setEvents, setMeetups } = useEventStore.getState();

    const { data: eventsData, error: eventsError } = useQuery({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    const { data: meetupsData, error: meetupsError } = useQuery({
        queryKey: ['meetups'],
        queryFn: fetchMeetups,
    });

    useEffect(() => {
        if (eventsData && meetupsData) {
            setEvents(eventsData);
            setMeetups(meetupsData);
        }
    }, [eventsData, meetupsData, setEvents, setMeetups]);

    return { eventsError, meetupsError };
}
