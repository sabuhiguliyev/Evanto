export type Event = {
    id: string;
    title: string;
    start_date: Date;
    end_date: Date;
    start_time?: Date;
    end_time?: Date;
    location: string;
    event_image: string;
    category: string;
    member_avatars: string[];
    member_count: number;
    ticket_price?: string;
    organizer?: string;
    featured: boolean;
};
