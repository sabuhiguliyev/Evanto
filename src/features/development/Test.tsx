import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  Grid,
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import { 
  createEvent, 
  getEvents, 
  createMeetup, 
  getMeetups, 
  createUser, 
  getUsers,
  Event, 
  Meetup, 
  User 
} from '@/services';

const Test: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [meetups, setMeetups] = useState<Meetup[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [eventsData, meetupsData, usersData] = await Promise.all([
        getEvents(),
        getMeetups(),
        getUsers()
      ]);
      
      setEvents(eventsData);
      setMeetups(meetupsData);
      setUsers(usersData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const createSampleEvent = async () => {
    try {
      const newEvent = await createEvent({
        user_id: users[0]?.id || 'sample-user-id',
        title: 'Sample Event',
        description: 'This is a sample event created through the new data service',
        location: 'Sample Location',
        category: 'Technology',
        featured: false,
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000), // 2 hours later
        ticket_price: 25.00,
        max_participants: 100
      });
      
      setEvents(prev => [...prev, newEvent]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create event');
    }
  };

  const createSampleMeetup = async () => {
    try {
      const newMeetup = await createMeetup({
        user_id: users[0]?.id || 'sample-user-id',
        meetup_name: 'Sample Meetup',
        description: 'This is a sample meetup created through the new data service',
        location: 'Sample Location',
        category: 'Technology',
        featured: false,
        meetup_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        online: false,
        meetup_link: undefined
      });
      
      setMeetups(prev => [...prev, newMeetup]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create meetup');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <Box p={3}>
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box p={3} className="no-scrollbar">
      <Typography variant="h3" gutterBottom>
        Evanto 2.0 - Data Service Test
      </Typography>
      
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Testing the new unified data service architecture
      </Typography>

      {error && (
        <Card sx={{ mb: 3, bgcolor: 'error.light' }}>
          <CardContent>
            <Typography color="error">Error: {error}</Typography>
          </CardContent>
        </Card>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button 
          variant="contained" 
          onClick={loadData}
          disabled={loading}
        >
          Reload Data
        </Button>
        <Button 
          variant="outlined" 
          onClick={createSampleEvent}
          disabled={users.length === 0}
        >
          Create Sample Event
        </Button>
        <Button 
          variant="outlined" 
          onClick={createSampleMeetup}
          disabled={users.length === 0}
        >
          Create Sample Meetup
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {/* Users Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Users ({users.length})
              </Typography>
              {users.map(user => (
                <Box key={user.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={user.avatar_url}>
                      {user.full_name?.[0] || user.email[0]}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle2">
                        {user.full_name || 'No Name'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                    </Box>
                  </Stack>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Events Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Events ({events.length})
              </Typography>
              {events.map(event => (
                <Box key={event.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {event.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {event.description || 'No description'}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={event.category} size="small" />
                    <Chip 
                      label={`$${event.ticket_price}`} 
                      size="small" 
                      color="primary" 
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(event.start_date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Meetups Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Meetups ({meetups.length})
              </Typography>
              {meetups.map(meetup => (
                <Box key={meetup.id} sx={{ mb: 2, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    {meetup.meetup_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {meetup.description || 'No description'}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                    <Chip label={meetup.category} size="small" />
                    <Chip 
                      label={meetup.online ? 'Online' : 'In-Person'} 
                      size="small" 
                      color={meetup.online ? 'success' : 'default'} 
                    />
                  </Stack>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(meetup.meetup_date).toLocaleDateString()}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          What This Test Shows:
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Unified Data Service:</strong> Single service handling all data operations
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Type Safety:</strong> Full TypeScript interfaces for all data structures
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Consistent API:</strong> Same patterns for events, meetups, users
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Error Handling:</strong> Centralized error management
        </Typography>
        <Typography variant="body2" paragraph>
          • <strong>Real-time Updates:</strong> UI updates when data changes
        </Typography>
      </Box>
    </Box>
  );
};

export default Test;
