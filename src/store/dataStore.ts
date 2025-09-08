import { create } from 'zustand';

// Simplified data state - only UI state, no remote data
interface DataState {
  // Meetup creation state
  meetupCreation: {
    name: string;
    date: string;
    description: string;
    link: string;
    step: number;
  };
  
  // Meetup creation actions
  setMeetupCreationName: (name: string) => void;
  setMeetupCreationDate: (date: string) => void;
  setMeetupCreationDescription: (description: string) => void;
  setMeetupCreationLink: (link: string) => void;
  setMeetupCreationStep: (step: number) => void;
  resetMeetupCreation: () => void;
}

export const useDataStore = create<DataState>((set, get) => ({
  // Initial state - only UI state
  meetupCreation: {
    name: '',
    date: '',
    description: '',
    link: '',
    step: 1,
  },
  
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
}));