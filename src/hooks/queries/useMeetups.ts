import { useEntity } from './useEntity';
import { getMeetups, createMeetup, updateMeetup, deleteMeetup } from '@/services';
import type { Meetup } from '@/utils/schemas';

// Create the entity hooks for meetups
const meetupHooks = useEntity<Meetup>({
  entityType: 'meetups',
  getItems: getMeetups,
  getItem: (id: string) => getMeetups().then(meetups => meetups.find(m => m.id === id)),
  createItem: createMeetup,
  updateItem: updateMeetup,
  deleteItem: deleteMeetup,
});

// Export the hooks with meetup-specific names
export const useMeetups = meetupHooks.useItems;
export const useMeetup = meetupHooks.useItem;
export const useCreateMeetup = meetupHooks.useCreateItem;
export const useUpdateMeetup = meetupHooks.useUpdateItem;
export const useDeleteMeetup = meetupHooks.useDeleteItem;
