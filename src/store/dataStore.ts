import { create } from 'zustand';
import type { Meetup } from '@/utils/schemas';

// Simplified data state - only UI state, no remote data
interface DataState {
  // Meetup creation state (aligned with meetup schema)
  meetupCreation: {
    title: string;
    start_date: string;
    category: string;
    description: string;
    meetup_link: string | null;
    location: string | null;
    image: string | null;
    max_participants: number | null;
    step: number;
  };
  
  // Meetup creation actions (aligned with schema fields)
  setMeetupCreationTitle: (title: string) => void;
  setMeetupCreationDate: (start_date: string) => void;
  setMeetupCreationCategory: (category: string) => void;
  setMeetupCreationDescription: (description: string) => void;
  setMeetupCreationLink: (meetup_link: string | null) => void;
  setMeetupCreationLocation: (location: string | null) => void;
  setMeetupCreationImage: (image: string | null) => void;
  setMeetupCreationMaxParticipants: (max_participants: number | null) => void;
  setMeetupCreationStep: (step: number) => void;
  resetMeetupCreation: () => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  // Initial state - only UI state (aligned with schema)
  meetupCreation: {
    title: '',
    start_date: '',
    category: 'Other',
    description: '',
    meetup_link: null,
    location: null,
    image: null,
    max_participants: null,
    step: 1,
  },
  
  // Meetup creation actions (aligned with schema)
  setMeetupCreationTitle: (title) => set(state => ({
    meetupCreation: { ...state.meetupCreation, title }
  })),
  setMeetupCreationDate: (start_date) => set(state => ({
    meetupCreation: { ...state.meetupCreation, start_date }
  })),
  setMeetupCreationCategory: (category) => set(state => ({
    meetupCreation: { ...state.meetupCreation, category }
  })),
  setMeetupCreationDescription: (description) => set(state => ({
    meetupCreation: { ...state.meetupCreation, description }
  })),
  setMeetupCreationLink: (meetup_link) => set(state => ({
    meetupCreation: { ...state.meetupCreation, meetup_link }
  })),
  setMeetupCreationLocation: (location) => set(state => ({
    meetupCreation: { ...state.meetupCreation, location }
  })),
  setMeetupCreationImage: (image) => set(state => ({
    meetupCreation: { ...state.meetupCreation, image }
  })),
  setMeetupCreationMaxParticipants: (max_participants) => set(state => ({
    meetupCreation: { ...state.meetupCreation, max_participants }
  })),
  setMeetupCreationStep: (step) => set(state => ({
    meetupCreation: { ...state.meetupCreation, step }
  })),
  resetMeetupCreation: () => set({
    meetupCreation: {
      title: '',
      start_date: '',
      category: 'Other',
      description: '',
      meetup_link: null,
      location: null,
      image: null,
      max_participants: null,
      step: 1,
    }
  }),
}));