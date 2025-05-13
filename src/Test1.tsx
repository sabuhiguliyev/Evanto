import EventCard1 from '@/components/cards/EventCard1';

function Test1() {
    return (
        <EventCard1
            imageUrl='https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop'
            title='Tech Conference'
            dateRange='15-17 May 2024'
            location='San Francisco'
            memberCount={120}
            memberAvatars={[
                'https://randomuser.me/api/portraits/women/44.jpg',
                'https://randomuser.me/api/portraits/men/32.jpg',
            ]}
            className='h-full w-full' // Original dimensions from EventCard1
            onJoin={() => console.log('Join Event')}
        />
    );
}

export default Test1;
