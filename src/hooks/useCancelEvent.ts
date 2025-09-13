import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { updateEvent, updateMeetup } from '@/services/dataService';
import toast from 'react-hot-toast';
import type { UnifiedItem } from '@/utils/schemas';

export const useCancelEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    const cancelEvent = async (item: UnifiedItem) => {
        if (!item.id) {
            toast.error('Event ID not found');
            return;
        }

        setIsLoading(true);
        try {
            if (item.type === 'event') {
                await updateEvent(item.id, { status: 'cancelled' });
                toast.success('Event cancelled successfully');
            } else if (item.type === 'meetup') {
                await updateMeetup(item.id, { status: 'cancelled' });
                toast.success('Meetup cancelled successfully');
            }

            // Invalidate and refetch relevant queries
            await queryClient.invalidateQueries({ queryKey: ['events'] });
            await queryClient.invalidateQueries({ queryKey: ['meetups'] });
            await queryClient.invalidateQueries({ queryKey: ['unifiedItems'] });
            
        } catch (error) {
            console.error('Error cancelling event:', error);
            toast.error('Failed to cancel event. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        cancelEvent,
        isLoading,
    };
};
