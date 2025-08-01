export type Event = {
    id: string;
    title: string;
    location: string;
    category: string;
    start_date: Date;
    end_date: Date;
    event_image: string;
    organizer?: string;
    member_avatars: string[];
    member_count: number;
    ticket_price?: string;
    featured: boolean;
};
