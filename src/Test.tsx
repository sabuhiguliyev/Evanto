import EventCard from '@/components/cards/EventCard';
import Container from '@/components/layout/Container';

function Test() {
    return (
        <Container>
            <EventCard
                variant='vertical'
                imageUrl='https://i.pravatar.cc/150?img=3'
                title='Test'
                location='Baku, Azerbaijan'
                start_date={new Date()}
                end_date={new Date()}
                memberAvatars={[
                    'https://i.pravatar.cc/150?img=1',
                    'https://i.pravatar.cc/150?img=2',
                    'https://i.pravatar.cc/150?img=3',
                    'https://i.pravatar.cc/150?img=4',
                    'https://i.pravatar.cc/150?img=5',
                ]}
                memberCount={10}
                onAction={() => console.log('Join Event')}
            />
            <EventCard
                variant='vertical-compact'
                actionType='favorite'
                imageUrl='https://i.pravatar.cc/150?img=3'
                title='Test'
                location='Baku, Azerbaijan'
                start_date={new Date()}
                end_date={new Date()}
                memberAvatars={[
                    'https://i.pravatar.cc/150?img=1',
                    'https://i.pravatar.cc/150?img=2',
                    'https://i.pravatar.cc/150?img=3',
                    'https://i.pravatar.cc/150?img=4',
                    'https://i.pravatar.cc/150?img=5',
                ]}
                memberCount={2}
                onAction={() => console.log('Join Event')}
            />
            <EventCard
                variant='horizontal'
                actionType='complete'
                imageUrl='https://i.pravatar.cc/150?img=3'
                title='Test'
                location='Baku, Azerbaijan'
                start_date={new Date()}
                end_date={new Date()}
                onAction={() => console.log('Join Event')}
                memberAvatars={[
                    'https://i.pravatar.cc/150?img=1',
                    'https://i.pravatar.cc/150?img=2',
                    'https://i.pravatar.cc/150?img=3',
                    'https://i.pravatar.cc/150?img=4',
                    'https://i.pravatar.cc/150?img=5',
                ]}
            />
            <EventCard
                variant='horizontal-compact'
                imageUrl='https://i.pravatar.cc/150?img=3'
                title='Test'
                location='Baku, Azerbaijan'
                start_date={new Date()}
                end_date={new Date()}
                onAction={() => console.log('Join Event')}
                price={10}
            />
        </Container>
    );
}
export default Test;
