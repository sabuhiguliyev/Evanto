import EventCard from '@/components/cards/EventCard';
import Container from '@/components/layout/Container';

function Test() {
    return (
        <Container>
            <EventCard
                variant='horizontal-mini'
                imageUrl='https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=300&h=200&fit=crop'
                title='International Conference Artificial Intelligence'
                dateRange='15-17 May 2024'
                location='San Francisco'
                memberCount={12}
                memberAvatars={[
                    'https://randomuser.me/api/portraits/women/44.jpg',
                    'https://randomuser.me/api/portraits/men/32.jpg',
                ]}
                actionType='complete'
                onAction={() => console.log('Join clicked')}
                className=''
                price={100}
            />
        </Container>
    );
}

export default Test;
