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
  Container,
  BottomNavigation,
  BottomNavigationAction,
  Stack,
  ButtonGroup,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  Link,
  Modal,
  ListItemButton
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
  LightMode,
  Help,
  ListOutlined,
  GridViewOutlined
} from '@mui/icons-material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import EventCard from '@/components/cards/EventCard';
import { BottomAppBar } from '@/components/navigation/BottomAppBar';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { PageHeader } from '@/components/layout/PageHeader';
import { FilterModal } from '@/components/layout/FilterModal';
import TicketCard from '@/components/cards/TicketCard';
import { LocationPicker } from '@/components/forms/LocationPicker';
import { DateTimePicker } from '@/components/forms/DateTimePicker';
import { SeatPicker } from '@/components/forms/SeatPicker';
import { getCategoryIcon } from '@/components/icons/CategoryIcon';

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
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Variants</Typography>
            <Box className="flex gap-4 flex-wrap">
              <Button variant="contained">Contained</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">Sizes</Typography>
            <Box className="flex gap-4 flex-wrap items-center">
              <Button variant="contained" size="small">Small</Button>
              <Button variant="contained" size="medium">Medium (Default)</Button>
              <Button variant="contained" size="large">Large</Button>
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">Colors</Typography>
            <Box className="flex gap-4 flex-wrap">
              <Button variant="contained" color="primary">Primary</Button>
              <Button variant="contained" color="secondary">Secondary</Button>
              <Button variant="contained" color="success">Success</Button>
              <Button variant="contained" color="error">Error</Button>
              <Button variant="contained" color="warning">Warning</Button>
              <Button variant="contained" color="info">Info</Button>
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">States</Typography>
            <Box className="flex gap-4 flex-wrap">
              <Button variant="contained" disabled>Disabled</Button>
              <Button variant="outlined" disabled>Disabled Outlined</Button>
              <Button variant="text" disabled>Disabled Text</Button>
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">With Icons</Typography>
            <Box className="flex gap-4 flex-wrap">
              <Button variant="contained" startIcon={<Add />}>Add Item</Button>
              <Button variant="outlined" endIcon={<Edit />}>Edit</Button>
              <Button variant="text" startIcon={<Delete />}>Delete</Button>
            </Box>
          </Box>
        </Box>

        {/* Icon Buttons */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Icon Buttons</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Sizes</Typography>
            <Box className="flex gap-4 flex-wrap items-center">
              <IconButton size="small">
                <Add />
              </IconButton>
              <IconButton size="medium">
                <Edit />
              </IconButton>
              <IconButton size="large">
                <Delete />
              </IconButton>
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">Colors</Typography>
            <Box className="flex gap-4 flex-wrap">
              <IconButton color="primary">
                <Add />
              </IconButton>
              <IconButton color="secondary">
                <Edit />
              </IconButton>
              <IconButton color="error">
                <Delete />
              </IconButton>
              <IconButton color="success">
                <Star />
              </IconButton>
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">States</Typography>
            <Box className="flex gap-4 flex-wrap">
              <IconButton disabled>
                <Add />
              </IconButton>
              <IconButton color="primary" disabled>
                <Edit />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Text Fields */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Text Fields</Typography>
          <Box className="flex flex-col gap-4 max-w-md">
            <Typography variant="h6" className="text-heading">Variants</Typography>
            <TextField label="Default (Outlined)" placeholder="Default MUI styling" />
            <TextField label="Outlined" variant="outlined" placeholder="Outlined variant" />
            <TextField label="Filled" variant="filled" placeholder="Filled variant" />
            <TextField label="Standard" variant="standard" placeholder="Standard variant" />
            
            <Typography variant="h6" className="text-heading mt-4">Sizes</Typography>
            <TextField label="Small" size="small" placeholder="Small size" />
            <TextField label="Medium (Default)" size="medium" placeholder="Medium size" />
            
            <Typography variant="h6" className="text-heading mt-4">States</Typography>
            <TextField label="Error" error helperText="This is an error message" placeholder="Error state" />
            <TextField label="Disabled" disabled placeholder="Disabled state" />
            <TextField label="Required" required placeholder="Required field" />
            
            <Typography variant="h6" className="text-heading mt-4">With Icons</Typography>
            <TextField
              label="With Start Icon"
              placeholder="Search input"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="With End Icon"
              placeholder="Password input"
              type="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <Visibility />
                    </IconButton>
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
            <Typography variant="h6" className="text-heading">Select Dropdown</Typography>
            <FormControl fullWidth>
              <InputLabel>Select Option</InputLabel>
              <Select label="Select Option" value="">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="h6" className="text-heading mt-4">Switches</Typography>
            <Box className="flex items-center gap-4">
              <Switch />
              <Switch defaultChecked />
              <Switch disabled />
              <Switch disabled defaultChecked />
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">Radio Buttons</Typography>
            <Box className="flex items-center gap-4">
              <Radio />
              <Radio checked />
              <Radio disabled />
              <Radio disabled checked />
            </Box>
            
            <Typography variant="h6" className="text-heading mt-4">Checkboxes</Typography>
            <Box className="flex items-center gap-4">
              <Checkbox />
              <Checkbox checked />
              <Checkbox indeterminate />
              <Checkbox disabled />
              <Checkbox disabled checked />
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

        {/* Typography */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Typography</Typography>
          <Box className="flex flex-col gap-3">
            <Box>
              <Typography variant="h2" className="mb-1">Heading 2 (30px, semibold)</Typography>
              <Typography variant="body2" className="text-gray-500">Main page titles</Typography>
            </Box>
            <Box>
              <Typography variant="h4" className="mb-1">Heading 4 (20px, semibold)</Typography>
              <Typography variant="body2" className="text-gray-500">Section headings</Typography>
            </Box>
            <Box>
              <Typography variant="h6" className="mb-1">Heading 6 (16px, semibold)</Typography>
              <Typography variant="body2" className="text-gray-500">Subsection headings</Typography>
            </Box>
            <Box>
              <Typography variant="body1" className="mb-1">Body 1 (16px, normal)</Typography>
              <Typography variant="body2" className="text-gray-500">Primary body text</Typography>
            </Box>
            <Box>
              <Typography variant="body2" className="mb-1">Body 2 (14px, normal)</Typography>
              <Typography variant="body2" className="text-gray-500">Secondary body text - most common</Typography>
            </Box>
            <Box>
              <Typography variant="caption" className="mb-1">Caption (12px, normal)</Typography>
              <Typography variant="body2" className="text-gray-500">Small text, navigation labels</Typography>
            </Box>
          </Box>
        </Box>

        {/* Bottom Navigation */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Bottom Navigation</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Basic Bottom Navigation</Typography>
            <BottomNavigation showLabels value={0}>
              <BottomNavigationAction label="Home" icon={<Home />} />
              <BottomNavigationAction label="Favorites" icon={<Favorite />} />
              <BottomNavigationAction label="Tickets" icon={<ConfirmationNumber />} />
              <BottomNavigationAction label="Profile" icon={<Person />} />
            </BottomNavigation>
            
            <Typography variant="h6" className="text-heading mt-4">Without Labels</Typography>
            <BottomNavigation value={0}>
              <BottomNavigationAction icon={<Home />} />
              <BottomNavigationAction icon={<Favorite />} />
              <BottomNavigationAction icon={<ConfirmationNumber />} />
              <BottomNavigationAction icon={<Person />} />
            </BottomNavigation>
          </Box>
        </Box>

        {/* Stack */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Stack</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Direction</Typography>
            <Stack direction="row" spacing={2}>
              <Button>Item 1</Button>
              <Button>Item 2</Button>
              <Button>Item 3</Button>
            </Stack>
            <Stack direction="column" spacing={2}>
              <Button>Item 1</Button>
              <Button>Item 2</Button>
              <Button>Item 3</Button>
            </Stack>
          </Box>
        </Box>

        {/* Button Group */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Button Group</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Variants</Typography>
            <ButtonGroup variant="contained">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="outlined">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
            <ButtonGroup variant="text">
              <Button>One</Button>
              <Button>Two</Button>
              <Button>Three</Button>
            </ButtonGroup>
          </Box>
        </Box>

        {/* Toggle Buttons */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Toggle Buttons</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Single Selection</Typography>
            <ToggleButtonGroup exclusive>
              <ToggleButton value="list">
                <ListOutlined />
              </ToggleButton>
              <ToggleButton value="grid">
                <GridViewOutlined />
              </ToggleButton>
            </ToggleButtonGroup>
            
            <Typography variant="h6" className="text-heading mt-4">Multiple Selection</Typography>
            <ToggleButtonGroup multiple>
              <ToggleButton value="bold">Bold</ToggleButton>
              <ToggleButton value="italic">Italic</ToggleButton>
              <ToggleButton value="underline">Underline</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Dialogs */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Dialogs</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Dialog Components</Typography>
            <Box className="flex gap-4">
              <Button variant="outlined" onClick={() => {}}>
                Open Dialog
              </Button>
            </Box>
            <Typography variant="body2" className="text-muted">
              Note: Dialog requires state management to show/hide
            </Typography>
          </Box>
        </Box>

        {/* Lists */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Lists</Typography>
          <Box className="flex flex-col gap-4">
            <Typography variant="h6" className="text-heading">Basic List</Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" secondary="Main page" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Settings" secondary="App settings" />
              </ListItem>
            </List>
            
            <Typography variant="h6" className="text-heading mt-4">List with Buttons</Typography>
            <List>
              <ListItemButton>
                <ListItemIcon>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon>
                  <Favorite />
                </ListItemIcon>
                <ListItemText primary="Favorites" />
              </ListItemButton>
            </List>
          </Box>
        </Box>

        {/* Badges & Tooltips */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Badges & Tooltips</Typography>
          <Box className="flex gap-4 items-center">
            <Typography variant="h6" className="text-heading">Badges</Typography>
            <Badge badgeContent={4} color="primary">
              <Home />
            </Badge>
            <Badge badgeContent={99} color="secondary">
              <Settings />
            </Badge>
            <Badge badgeContent={1000} color="error">
              <Favorite />
            </Badge>
            <Badge variant="dot" color="primary">
              <Person />
            </Badge>
          </Box>
          <Box className="flex gap-4 items-center mt-4">
            <Typography variant="h6" className="text-heading">Tooltips</Typography>
            <Tooltip title="This is a tooltip">
              <IconButton>
                <Settings />
              </IconButton>
            </Tooltip>
            <Tooltip title="Longer tooltip text that explains more details">
              <IconButton>
                <Help />
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
        
        {/* Main Container Simulation (375px) */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Components in Container (375px max-width)</Typography>
          <Box className="mx-auto max-w-[375px] border-2 border-dashed border-gray-300 p-4">
            <Typography variant="body2" className="text-center text-gray-500 mb-4">
              Simulates actual Container used in pages
            </Typography>
            
            {/* Typography & Text Styles */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Typography</Typography>
              <Box className="space-y-3">
                <Box>
                  <Typography variant="h2" className="text-heading">Main Page Title</Typography>
                  <Typography variant="body2" className="text-gray-500">h2 - 30px, semibold</Typography>
                </Box>
                <Box>
                  <Typography variant="h4" className="text-heading">Section Heading</Typography>
                  <Typography variant="body2" className="text-gray-500">h4 - 20px, semibold</Typography>
                </Box>
                <Box>
                  <Typography variant="h6" className="text-heading">Subsection Heading</Typography>
                  <Typography variant="body2" className="text-gray-500">h6 - 16px, semibold</Typography>
                </Box>
                <Box>
                  <Typography variant="body1" className="text-body">Primary body text content</Typography>
                  <Typography variant="body2" className="text-gray-500">body1 - 16px, normal</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" className="text-body">Secondary body text content</Typography>
                  <Typography variant="body2" className="text-gray-500">body2 - 14px, normal (most common)</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" className="text-caption">Small caption text</Typography>
                  <Typography variant="body2" className="text-gray-500">caption - 12px, normal</Typography>
                </Box>
              </Box>
            </Box>

            {/* Buttons */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Buttons</Typography>
              <Box className="flex flex-col gap-3">
                <button className="btn-primary w-full">Primary Button (full width)</button>
                <button className="btn-primary-small">Small Primary (h-6)</button>
                <button className="btn-icon">
                  <Add />
                </button>
              </Box>
            </Box>

            {/* Cards */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Cards</Typography>
              <Box className="space-y-4">
                <div className="card-base">
                  <Typography variant="h6" className="text-heading">Basic Card</Typography>
                  <Typography variant="body2" className="text-body">Card content with project styling</Typography>
                </div>
                
                {/* Event Cards - All 4 variants */}
                <Typography variant="body2" className="text-heading">Vertical Cards (1 column)</Typography>
                <EventCard
                  item={sampleEvent}
                  variant="vertical"
                />
                
                <Typography variant="body2" className="text-heading">Vertical Compact Cards (2 columns)</Typography>
                <Box className="grid grid-cols-2 gap-3">
                  <EventCard
                    item={sampleEvent}
                    variant="vertical-compact"
                  />
                  <EventCard
                    item={sampleEvent}
                    variant="vertical-compact"
                  />
                </Box>
                
                <Typography variant="body2" className="text-heading">Horizontal Cards</Typography>
                <EventCard
                  item={sampleEvent}
                  variant="horizontal"
                />
                
                <Typography variant="body2" className="text-heading">Horizontal Compact Cards</Typography>
                <EventCard
                  item={sampleEvent}
                  variant="horizontal-compact"
                />
                
                <TicketCard 
                  imageUrl="/illustrations/eventcard.png"
                  eventName="Sample Event"
                  eventLocation="San Francisco, CA"
                  eventDate="March 15, 2024"
                  eventTime="7:00 PM - 9:00 PM"
                  seatNumber="A-12"
                />
              </Box>
            </Box>

            {/* Forms */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Form Components</Typography>
              <Box className="space-y-4">
                <input className="input-base w-full" placeholder="Standard input" />
                <input className="input-search w-full" placeholder="Search input" />
                <LocationPicker 
                  value=""
                  onChange={() => {}}
                  placeholder="Select location"
                />
                <DateTimePicker 
                  value={new Date()}
                  onChange={() => {}}
                  label="Select date and time"
                />
              </Box>
            </Box>

            {/* Layout Utilities */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Layout Utilities</Typography>
              <Box className="space-y-3">
                <div className="flex-center bg-gray-100 p-4 rounded">
                  <Typography variant="body2">Flex Center</Typography>
                </div>
                <div className="flex-between bg-gray-100 p-4 rounded w-full">
                  <Typography variant="body2">Left</Typography>
                  <Typography variant="body2">Right</Typography>
                </div>
                <div className="icon-text">
                  <CalendarToday />
                  <Typography variant="body2">March 15, 2024</Typography>
                </div>
              </Box>
            </Box>

            {/* Navigation */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Navigation</Typography>
              <Box className="space-y-4">
                <PageHeader 
                  title="Sample Page"
                  showBackButton={true}
                  showMenuButton={true}
                />
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
            </Box>

            {/* Icons */}
            <Box className="mb-6">
              <Typography variant="h6" className={`text-heading mb-3`}>Category Icons</Typography>
              <Box className="flex gap-2 flex-wrap">
                {getCategoryIcon('apps')}
                {getCategoryIcon('music_note')}
                {getCategoryIcon('sports_soccer')}
                {getCategoryIcon('brush')}
                {getCategoryIcon('computer')}
                {getCategoryIcon('restaurant')}
                {getCategoryIcon('school')}
                {getCategoryIcon('business')}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Bottom App Bar - Inside Container */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Bottom App Bar (Inside Container)</Typography>
          <Box className="mx-auto max-w-[375px] border-2 border-dashed border-gray-300 p-4">
            <Typography variant="body2" className="text-center text-gray-500 mb-4">
              BottomAppBar is always inside Container in actual usage
            </Typography>
            
            <Box className="relative h-32 bg-gray-100 rounded overflow-hidden">
              <BottomAppBar />
            </Box>
          </Box>
        </Box>

        {/* Modals & Overlays */}
        <Box className="mb-8">
          <Typography variant="h5" className={`text-heading mb-4`}>Modals & Overlays</Typography>
          <Box className="mx-auto max-w-[375px] border-2 border-dashed border-gray-300 p-4">
            <Typography variant="body2" className="text-center text-gray-500 mb-4">
              Interactive components requiring state management
            </Typography>
            
            <Button variant="outlined" onClick={() => {}}>
              Open Filter Modal
            </Button>
            <Typography variant="body2" className="text-gray-500 mt-2">
              Note: Modal requires state management to show/hide
            </Typography>
          </Box>
        </Box>
        </Box>
      </TabPanel>
    </Box>
  );
}

export default DesignSystem;
