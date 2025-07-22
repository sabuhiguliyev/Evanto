import { create } from 'zustand';

type MeetupState = {
    meetupName: string;
    setMeetupName: (name: string) => void;
    meetupDate: Date | null;
    setMeetupDate: (date: Date) => void;
    meetupLink: string;
    setMeetupLink: (link: string) => void;
    meetupDescription: string;
    setMeetupDescription: (description: string) => void;
    selectedPhoto: string | null;
    setSelectedPhoto: (url: string) => void;
    photos: string[];
    reset: () => void;
};

export const useMeetupStore = create<MeetupState>(set => ({
    meetupName: '',
    meetupDate: null,
    meetupLink: '',
    meetupDescription: '',
    selectedPhoto: null,
    setMeetupName: name => set({ meetupName: name }),
    setMeetupDate: date => set({ meetupDate: date }),
    setMeetupLink: link => set({ meetupLink: link }),
    setMeetupDescription: description => set({ meetupDescription: description }),
    setSelectedPhoto: url =>
        set(state => ({
            selectedPhoto: state.selectedPhoto === url ? null : url,
        })),
    photos: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4',
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6',
        'https://i.pravatar.cc/150?img=7',
        'https://i.pravatar.cc/150?img=8',
        'https://i.pravatar.cc/150?img=9',
        'https://i.pravatar.cc/150?img=10',
        'https://i.pravatar.cc/150?img=11',
        'https://i.pravatar.cc/150?img=12',
        'https://i.pravatar.cc/150?img=13',
        'https://i.pravatar.cc/150?img=14',
        'https://i.pravatar.cc/150?img=15',
        'https://i.pravatar.cc/150?img=16',
    ],
    reset: () => set({ selectedPhoto: null }),
}));
