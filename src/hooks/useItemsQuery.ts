import { useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents, fetchMeetups } from '@/utils/supabaseService';
import { useDataStore } from '@/store/dataStore';
import { useAppStore } from '@/store/appStore';
import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';
import { UnifiedItem } from '@/types/UnifiedItem';

export default function useItemsQuery() {
    const { setItems, setEvents, setMeetups } = useDataStore();
    const { setLoading, setError } = useAppStore();

    const { data: eventsData, error: eventsError, isLoading: eventsLoading } = useQuery<Event[], Error>({
        queryKey: ['events'],
        queryFn: fetchEvents,
    });

    const { data: meetupsData, error: meetupsError, isLoading: meetupsLoading } = useQuery<Meetup[], Error>({
        queryKey: ['meetups'],
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

    // Update loading and error states
    useEffect(() => {
        setLoading(eventsLoading || meetupsLoading);
    }, [eventsLoading, meetupsLoading, setLoading]);

    useEffect(() => {
        setError(eventsError?.message || meetupsError?.message || null);
    }, [eventsError, meetupsError, setError]);

    // Update data stores
    useEffect(() => {
        if (eventsData) setEvents(eventsData);
        if (meetupsData) setMeetups(meetupsData);
        setItems(items);
    }, [eventsData, meetupsData, items, setEvents, setMeetups, setItems]);

    return { eventsError, meetupsError, items };
}
