import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents, fetchMeetups } from '@/utils/supabaseService';
import useEventStore from '@/store/eventStore';
import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';
import { UnifiedItem } from '@/types/UnifiedItem';

export default function useItemsQuery() {
    const { setItems, setEvents, setMeetups } = useEventStore();

    // const [eventsData, setEventsData] = useState<Event[]>([]);
    // const [eventsError, setEventsError] = useState<Error | null>(null);
    // const [eventsLoading, setEventsLoading] = useState<boolean>(false);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             setEventsLoading(true);
    //             const events = await fetchEvents();

    //             setEventsData(events);
    //         } catch (error) {
    //             console.error('Error fetching events:', error);
    //             setEventsError(error as Error);
    //         } finally {
    //             setEventsLoading(false);
    //         }
    //     }

    //     fetchData();
    // }, [meetupId]);

    const { data: eventsData, error: eventsError } = useQuery<Event[], Error>({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    const { data: meetupsData, error: meetupsError } = useQuery<Meetup[], Error>({
        queryKey: ['meetups',],
        queryFn: fetchMeetups,
    });

    const items = useMemo((): UnifiedItem[] => {
        if (!eventsData && !meetupsData) return [];

        return [
            ...(eventsData?.map(event => ({
                ...event,
                type: 'event' as const,
                title: event.title || '',
                category: event.category || 'Other',
            })) || []),
            ...(meetupsData?.map(meetup => ({
                ...meetup,
                type: 'meetup' as const,
                title: meetup.meetup_name || '',
                category: meetup.category || 'Meetup',
            })) || []),
        ];
    }, [eventsData, meetupsData]);

    useEffect(() => {
        if (eventsData) setEvents(eventsData);
        if (meetupsData) setMeetups(meetupsData);
        setItems(items);
    }, [eventsData, meetupsData, items, setEvents, setMeetups, setItems]);

    return { eventsError, meetupsError, items };
}
