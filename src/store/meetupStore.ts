import { create } from 'zustand';

type MeetupStore = {
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

export const useMeetupStore = create<MeetupStore>(set => ({
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
        'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXZlbnR8ZW58MHx8MHx8fDI%3D',
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://images.unsplash.com/photo-1561489396-888724a1543d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://media.istockphoto.com/id/2193248014/photo/happy-businessman-talking-to-his-colleagues-in-hallway-of-a-convention-center.webp?a=1&b=1&s=612x612&w=0&k=20&c=z_tKiGLufPWuuNWMXe2bwuI5U1kU2KGdkRTBtYUPMtU=',
        'https://media.istockphoto.com/id/1805953261/photo/embroidered-red-pins-on-a-calendar-event-planner-calendar-clock-to-set-timetable-organize.webp?a=1&b=1&s=612x612&w=0&k=20&c=0OTpK7A4PmlMA7WvGA5oo4Tm3GlCVhw_y6ueOsZHj9o=',
        'https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://images.unsplash.com/file-1705123271268-c3eaf6a79b21image?w=416&dpr=2&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzV8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzR8fGV2ZW50fGVufDB8fDB8fHwy',
        'https://images.unsplash.com/photo-1692261874907-a50930aa2972?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIyfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
        'https://images.unsplash.com/photo-1507608443039-bfde4fbcd142?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI1fHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
        'https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTIxfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
        'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTI2fHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
        'https://images.unsplash.com/photo-1465060810938-30bbe7c40e76?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQyfHxldmVudHxlbnwwfHwwfHx8Mg%3D%3D',
    ],
    reset: () =>
        set({
            meetupName: '',
            meetupDate: null,
            meetupLink: '',
            meetupDescription: '',
            selectedPhoto: null,
        }),
}));
