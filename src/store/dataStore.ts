import { create } from 'zustand';
import { Event } from '@/utils/schemas';
import { Meetup } from '@/utils/schemas';
import { UnifiedItem } from '@/types/UnifiedItem';

// Simple data state - no UI concerns, no filtering logic
interface DataState {
  // Core data arrays
  events: Event[];
  meetups: Meetup[];
  items: UnifiedItem[];
  
  // Loading states
  isLoadingEvents: boolean;
  isLoadingMeetups: boolean;
  isLoadingItems: boolean;
  
  // Error states
  eventsError: string | null;
  meetupsError: string | null;
  itemsError: string | null;
  
  // Meetup creation state
  meetupCreation: {
    name: string;
    date: string;
    description: string;
    link: string;
    step: number;
  };
  
  // Simple actions
  setEvents: (events: Event[]) => void;
  setMeetups: (meetups: Meetup[]) => void;
  setItems: (items: UnifiedItem[]) => void;
  
  // Loading actions
  setLoadingEvents: (loading: boolean) => void;
  setLoadingMeetups: (loading: boolean) => void;
  setLoadingItems: (loading: boolean) => void;
  
  // Meetup creation actions
  setMeetupCreationName: (name: string) => void;
  setMeetupCreationDate: (date: string) => void;
  setMeetupCreationDescription: (description: string) => void;
  setMeetupCreationLink: (link: string) => void;
  setMeetupCreationStep: (step: number) => void;
  resetMeetupCreation: () => void;
  
  // Legacy methods for backward compatibility
  setEventId: (id: string) => void;
  setMeetupName: (name: string) => void;
  setMeetupDate: (date: Date) => void;
  setMeetupDescription: (description: string) => void;
  setMeetupLink: (link: string) => void;
  setMeetupStep: (step: number) => void;
  
  // Error actions
  setEventsError: (error: string | null) => void;
  setMeetupsError: (error: string | null) => void;
  setItemsError: (error: string | null) => void;
  
  // CRUD operations
  addEvent: (event: Event) => void;
  updateEvent: (id: string, updates: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  
  addMeetup: (meetup: Meetup) => void;
  updateMeetup: (id: string, updates: Partial<Meetup>) => void;
  deleteMeetup: (id: string) => void;
  
  // Computed values
  getEventById: (id: string) => Event | undefined;
  getMeetupById: (id: string) => Meetup | undefined;
  getItemById: (id: string) => UnifiedItem | undefined;
  getItemsByType: (type: 'event' | 'meetup') => UnifiedItem[];
  
  // Clear all data
  clearAllData: () => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  // Initial state
  events: [],
  meetups: [],
  items: [],
  
  isLoadingEvents: false,
  isLoadingMeetups: false,
  isLoadingItems: false,
  
  eventsError: null,
  meetupsError: null,
  itemsError: null,
  
  meetupCreation: {
    name: '',
    date: '',
    description: '',
    link: '',
    step: 1,
  },
  
  // Set data actions
  setEvents: (events) => set({ events }),
  setMeetups: (meetups) => set({ meetups }),
  setItems: (items) => set({ items }),
  
  // Loading actions
  setLoadingEvents: (loading) => set({ isLoadingEvents: loading }),
  setLoadingMeetups: (loading) => set({ isLoadingMeetups: loading }),
  setLoadingItems: (loading) => set({ isLoadingItems: loading }),
  
  // Meetup creation actions
  setMeetupCreationName: (name) => set(state => ({
    meetupCreation: { ...state.meetupCreation, name }
  })),
  setMeetupCreationDate: (date) => set(state => ({
    meetupCreation: { ...state.meetupCreation, date }
  })),
  setMeetupCreationDescription: (description) => set(state => ({
    meetupCreation: { ...state.meetupCreation, description }
  })),
  setMeetupCreationLink: (link) => set(state => ({
    meetupCreation: { ...state.meetupCreation, link }
  })),
  setMeetupCreationStep: (step) => set(state => ({
    meetupCreation: { ...state.meetupCreation, step }
  })),
  resetMeetupCreation: () => set({
    meetupCreation: {
      name: '',
      date: '',
      description: '',
      link: '',
      step: 1,
    }
  }),
  
  // Error actions
  setEventsError: (error) => set({ eventsError: error }),
  setMeetupsError: (error) => set({ meetupsError: error }),
  setItemsError: (error) => set({ itemsError: error }),
  
  // Legacy methods for backward compatibility (no-op implementations)
  setEventId: (id) => {
    // This should be handled by bookingStore, but keeping for compatibility
    console.warn('setEventId is deprecated, use bookingStore instead');
  },
  setMeetupName: (name) => {
    // This should be handled by a meetup creation flow, but keeping for compatibility
    console.warn('setMeetupName is deprecated, implement proper meetup creation flow');
  },
  setMeetupDate: (date) => {
    // This should be handled by a meetup creation flow, but keeping for compatibility
    console.warn('setMeetupDate is deprecated, implement proper meetup creation flow');
  },
  setMeetupDescription: (description) => {
    // This should be handled by a meetup creation flow, but keeping for compatibility
    console.warn('setMeetupDescription is deprecated, implement proper meetup creation flow');
  },
  setMeetupLink: (link) => {
    // This should be handled by a meetup creation flow, but keeping for compatibility
    console.warn('setMeetupLink is deprecated, implement proper meetup creation flow');
  },
  setMeetupStep: (step) => {
    // This should be handled by a meetup creation flow, but keeping for compatibility
    console.warn('setMeetupStep is deprecated, implement proper meetup creation flow');
  },
  
  // Event CRUD operations
  addEvent: (event) => set(state => ({
    events: [...state.events, event],
    items: [...state.items, { ...event, type: 'event' as const }]
  })),
  
  updateEvent: (id, updates) => set(state => ({
    events: state.events.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ),
    items: state.items.map(item => 
      item.id === id && item.type === 'event' 
        ? { ...item, ...updates } : item
    )
  })),
  
  deleteEvent: (id) => set(state => ({
    events: state.events.filter(event => event.id !== id),
    items: state.items.filter(item => item.id !== id)
  })),
  
  // Meetup CRUD operations
  addMeetup: (meetup) => set(state => ({
    meetups: [...state.meetups, meetup],
    items: [...state.items, { ...meetup, type: 'meetup' as const }]
  })),
  
  updateMeetup: (id, updates) => set(state => ({
    meetups: state.meetups.map(meetup => 
      meetup.id === id ? { ...meetup, ...updates } : meetup
    ),
    items: state.items.map(item => 
      item.id === id && item.type === 'meetup' 
        ? { ...item, ...updates } : item
    )
  })),
  
  deleteMeetup: (id) => set(state => ({
    meetups: state.meetups.filter(meetup => meetup.id !== id),
    items: state.items.filter(item => item.id !== id)
  })),
  
  // Computed values
  getEventById: (id) => get().events.find(event => event.id === id),
  getMeetupById: (id) => get().meetups.find(meetup => meetup.id === id),
  getItemById: (id) => get().items.find(item => item.id === id),
  getItemsByType: (type) => get().items.filter(item => item.type === type),
  
  // Clear all data
  clearAllData: () => set({
    events: [],
    meetups: [],
    items: [],
    eventsError: null,
    meetupsError: null,
    itemsError: null,
  }),
}));
