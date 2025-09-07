import { useEntity } from './useEntity';
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/services';
import type { Event } from '@/utils/schemas';

// Create the entity hooks for events
const eventHooks = useEntity<Event>({
  entityType: 'events',
  getItems: getEvents,
  getItem: (id: string) => getEvents().then(events => events.find(e => e.id === id)),
  createItem: createEvent,
  updateItem: updateEvent,
  deleteItem: deleteEvent,
});

// Export the hooks with event-specific names
export const useEvents = eventHooks.useItems;
export const useEvent = eventHooks.useItem;
export const useCreateEvent = eventHooks.useCreateItem;
export const useUpdateEvent = eventHooks.useUpdateItem;
export const useDeleteEvent = eventHooks.useDeleteItem;
