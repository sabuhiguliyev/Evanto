import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  InputAdornment, 
  IconButton, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel,
  Button,
  Card,
  CardContent,
  Chip,
  Avatar,
  AvatarGroup,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  Radio,
  Checkbox,
  Slider,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
  Tooltip,
  CircularProgress,
  Tabs,
  Tab,
  Container
} from '@mui/material';
import { 
  Search, 
  Person, 
  Email, 
  LocationOn, 
  Tune, 
  Visibility, 
  VisibilityOff, 
  Phone, 
  CreditCard, 
  CalendarToday,
  Favorite,
  Share,
  MoreVert,
  Add,
  Edit,
  Delete,
  Star,
  Home,
  ConfirmationNumber,
  Settings,
  DarkMode,
  LightMode
} from '@mui/icons-material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import EventCard from '@/components/cards/EventCard';
import BottomAppBar from '@/components/navigation/BottomAppBar';
import ThemeToggle from '@/components/ui/ThemeToggle';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`design-tabpanel-${index}`}
      aria-labelledby={`design-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function DesignSystem() {
  const { isDarkMode } = useDarkMode();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Sample data for project components
  const sampleEvent = {
    id: 1,
    title: 'React Conference 2024',
    start_date: '2024-03-15T09:00:00Z',
    end_date: '2024-03-15T17:00:00Z',
    location: 'San Francisco, CA',
    price: 299,
    image_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    organizer_name: 'Tech Events Inc',
    attendees: ['user1', 'user2', 'user3'],
    category: 'Technology',
    type: 'event' as const,
    description: 'Learn about the latest in React development',
    max_attendees: 100,
    current_attendees: 45
  };

  return (
    <Box className="w-full">
      <Box className="flex-center mb-8">
        <ThemeToggle />
      </Box>

      <Typography variant="h3" className={`text-heading mb-6`}>
        Design System
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="design system tabs">
          <Tab label="MUI Components" />
          <Tab label="Project Components" />
        </Tabs>
      </Box>

      {/* MUI Components Tab */}
      <TabPanel value={tabValue} index={0}>
        <Box className="w-full">
          <Typography variant="h4" className={`text-heading mb-6`}>
            MUI Component Library
          </Typography>
        
        {/* Buttons */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Buttons</Typography>
          <Box className="flex gap-4 flex-wrap">
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>
            <Button variant="text">Text</Button>
            <Button variant="contained" disabled>Disabled</Button>
            <Button variant="contained" size="small">Small</Button>
            <Button variant="contained" size="large">Large</Button>
          </Box>
        </Box>

        {/* Icon Buttons */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Icon Buttons</Typography>
          <Box className="flex gap-4 flex-wrap">
            <IconButton size='small' sx={{ backgroundColor: '#5D9BFC', color: '#FFFFFF', borderRadius: '50%' }}>
              <Add />
            </IconButton>
            <IconButton size='medium' sx={{ backgroundColor: '#5D9BFC', color: '#FFFFFF', borderRadius: '50%' }}>
              <Edit />
            </IconButton>
            <IconButton size='large' sx={{ backgroundColor: '#5D9BFC', color: '#FFFFFF', borderRadius: '50%' }}>
              <Delete />
            </IconButton>
          </Box>
        </Box>

        {/* Text Fields */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Text Fields</Typography>
          <Box className="flex flex-col gap-4 max-w-md">
            <TextField label="Standard" variant="outlined" />
            <TextField label="Filled" variant="filled" />
            <TextField label="Standard" variant="standard" />
            <TextField
              label="With Icon"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        {/* Cards */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Cards</Typography>
          <Box className="flex gap-4 flex-wrap">
            <Card sx={{ width: 200 }}>
              <CardContent>
                <Typography variant="h6">Card Title</Typography>
                <Typography variant="body2">Card content goes here</Typography>
              </CardContent>
            </Card>
            <Card sx={{ width: 200, backgroundColor: '#f5f5f5' }}>
              <CardContent>
                <Typography variant="h6">Card with Background</Typography>
                <Typography variant="body2">Different background color</Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Chips */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Chips</Typography>
          <Box className="flex gap-2 flex-wrap">
            <Chip label="Default" />
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Success" color="success" />
            <Chip label="Error" color="error" />
            <Chip label="Deletable" onDelete={() => {}} />
          </Box>
        </Box>

        {/* Avatars */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Avatars</Typography>
          <Box className="flex gap-4 items-center">
            <Avatar sx={{ width: 24, height: 24 }}>S</Avatar>
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
            <Avatar sx={{ width: 40, height: 40 }}>L</Avatar>
            <AvatarGroup max={3}>
              <Avatar>A</Avatar>
              <Avatar>B</Avatar>
              <Avatar>C</Avatar>
              <Avatar>D</Avatar>
            </AvatarGroup>
          </Box>
        </Box>

        {/* Form Controls */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Form Controls</Typography>
          <Box className="flex flex-col gap-4 max-w-md">
            <FormControl fullWidth>
              <InputLabel>Select Option</InputLabel>
              <Select label="Select Option" value="">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
            <Box className="flex items-center gap-4">
              <Switch />
              <Radio />
              <Checkbox />
            </Box>
          </Box>
        </Box>

        {/* Progress & Loading */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Progress & Loading</Typography>
          <Box className="flex gap-4 items-center">
            <CircularProgress size={24} />
            <CircularProgress size={32} />
            <CircularProgress size={40} />
          </Box>
        </Box>

        {/* Badges & Tooltips */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Badges & Tooltips</Typography>
          <Box className="flex gap-4 items-center">
            <Badge badgeContent={4} color="primary">
              <Home />
            </Badge>
            <Tooltip title="This is a tooltip">
              <IconButton>
                <Settings />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
        </Box>
      </TabPanel>

      {/* Project Components Tab */}
      <TabPanel value={tabValue} index={1}>
        <Box className="w-full">
          <Typography variant="h4" className={`text-heading mb-6`}>
            Project Components
          </Typography>
        
        {/* Buttons */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Project Buttons</Typography>
          <Box className="flex gap-4 flex-wrap">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-primary-small">Small Primary</button>
            <button className="btn-icon">
              <Add />
            </button>
          </Box>
        </Box>

        {/* Cards */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Project Cards</Typography>
          <Box className="flex gap-4 flex-wrap">
            <div className="card-base">
              <Typography variant="h6" className="text-heading">Card Title</Typography>
              <Typography variant="body2" className="text-body">Card content with project styling</Typography>
            </div>
          </Box>
        </Box>

        {/* Typography */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Typography</Typography>
          <Box className="flex flex-col gap-2">
            <Typography variant="h4" className="text-heading">Heading Text</Typography>
            <Typography variant="body1" className="text-body">Body text with project styling</Typography>
            <Typography variant="caption" className="text-caption">Caption text</Typography>
            <Typography variant="body2" className="text-primary">Primary colored text</Typography>
          </Box>
        </Box>

        {/* Event Cards */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Event Cards</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Vertical Card</Typography>
            <EventCard
              item={sampleEvent}
              variant="vertical"
              className="w-64"
            />
            
            <Typography variant="h6" className="text-heading">Vertical Compact Card</Typography>
            <EventCard
              item={sampleEvent}
              variant="vertical-compact"
              className="w-40"
            />
            
            <Typography variant="h6" className="text-heading">Horizontal Card</Typography>
            <EventCard
              item={sampleEvent}
              variant="horizontal"
              className="w-full"
            />
            
            <Typography variant="h6" className="text-heading">Horizontal Compact Card</Typography>
            <EventCard
              item={sampleEvent}
              variant="horizontal-compact"
              className="w-full"
            />
          </Box>
        </Box>

        {/* Navigation */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Navigation</Typography>
          <Box className="flex gap-4">
            <div className="nav-item">
              <Home />
              <Typography variant="caption">Home</Typography>
            </div>
            <div className="nav-item-active">
              <ConfirmationNumber />
              <Typography variant="caption">Tickets</Typography>
            </div>
          </Box>
        </Box>

        {/* Forms */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Form Elements</Typography>
          <Box className="flex flex-col gap-4 max-w-md">
            <input className="input-base" placeholder="Standard input" />
            <input className="input-search" placeholder="Search input" />
          </Box>
        </Box>

        {/* Layout Utilities */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Layout Utilities</Typography>
          <Box className="flex gap-4">
            <div className="flex-center bg-gray-100 p-4 rounded">
              <Typography variant="body2">Flex Center</Typography>
            </div>
            <div className="flex-between bg-gray-100 p-4 rounded w-48">
              <Typography variant="body2">Left</Typography>
              <Typography variant="body2">Right</Typography>
            </div>
          </Box>
        </Box>

        {/* Icon + Text */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Icon + Text</Typography>
          <Box className="flex flex-col gap-2">
            <div className="icon-text">
              <CalendarToday />
              <Typography variant="body2">March 15, 2024</Typography>
            </div>
            <div className="icon-text">
              <LocationOn />
              <Typography variant="body2">San Francisco, CA</Typography>
            </div>
          </Box>
        </Box>

        {/* Bottom App Bar */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Bottom App Bar</Typography>
          <Box className="relative h-32 bg-gray-100 rounded">
            <BottomAppBar />
          </Box>
        </Box>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default DesignSystem;