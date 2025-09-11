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
  CircularProgress
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
  Home,
  Event,
  Group,
  Settings,
  Notifications,
  AccountCircle,
  Add,
  Edit,
  Delete,
  Check,
  Close,
  ArrowForward,
  ArrowBack,
  Star,
  StarBorder,
  ThumbUp,
  ThumbDown,
  Comment,
  Reply,
  Send,
  Download,
  Upload,
  Print,
  Save,
  Refresh,
  FilterList,
  Sort,
  ViewList,
  ViewModule,
  GridView,
  List as ListIcon,
  Menu,
  Close as CloseIcon,
  ChevronRight,
  ChevronLeft,
  ExpandMore,
  ExpandLess,
  Info,
  Warning,
  Error,
  CheckCircle,
  Cancel,
  Help,
  Lock,
  LockOpen,
  Security,
  Verified,
  Public,
  Private,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google,
  Apple,
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  YouTube,
  GitHub,
  Reddit,
  Discord,
  Telegram,
  WhatsApp,
  Skype,
  Zoom,
  Slack,
  Microsoft,
  Amazon,
  Netflix,
  Spotify,
  PayPal,
  Stripe,
  Visa,
  Mastercard,
  AmericanExpress,
  Discover,
  JCB,
  DinersClub,
  UnionPay,
  Maestro,
  Electron,
  Dankort,
  Interac,
  Mir,
  Troy,
  UATP,
  Elo,
  Hipercard,
  Naranja,
  TarjetaNaranja,
  Cencosud,
  Argencard,
  Cabal,
  Magna,
  Diners,
  Mastercard as MastercardIcon,
  Visa as VisaIcon,
  AmericanExpress as AmericanExpressIcon,
  Discover as DiscoverIcon,
  JCB as JCBIcon,
  DinersClub as DinersClubIcon,
  UnionPay as UnionPayIcon,
  Maestro as MaestroIcon,
  Electron as ElectronIcon,
  Dankort as DankortIcon,
  Interac as InteracIcon,
  Mir as MirIcon,
  Troy as TroyIcon,
  UATP as UATPIcon,
  Elo as EloIcon,
  Hipercard as HipercardIcon,
  Naranja as NaranjaIcon,
  TarjetaNaranja as TarjetaNaranjaIcon,
  Cencosud as CencosudIcon,
  Argencard as ArgencardIcon,
  Cabal as CabalIcon,
  Magna as MagnaIcon,
  Diners as DinersIcon
} from '@mui/icons-material';
import { Container } from '@mui/material';
import { useDarkMode } from '@/contexts/DarkModeContext';
import ThemeToggle from '@/components/ui/ThemeToggle';

function DesignSystem() {
  const { isDarkMode } = useDarkMode();
  const [showPassword, setShowPassword] = useState(false);
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [cardType, setCardType] = useState('');
  const [viewMode, setViewMode] = useState('list');
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [sliderValue, setSliderValue] = useState(30);
  const [activeStep, setActiveStep] = useState(0);

  const steps = ['Basic Info', 'Details', 'Payment', 'Confirmation'];

  return (
    <>
      <Box className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </Box>

      <Box className={`min-h-screen p-8 ${isDarkMode ? 'bg-[#1C2039]' : 'bg-white'}`}>
        
        {/* Header */}
        <Box className='mb-8'>
          <Typography variant='h3' className='mb-2 font-jakarta font-bold'>
            Design System Showcase
          </Typography>
          <Typography variant='body1' className='text-gray-600'>
            Complete collection of UI components used in Evanto project
          </Typography>
        </Box>

        {/* 1. TYPOGRAPHY */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            1. Typography
          </Typography>
          
          <Box className='space-y-4'>
            <Typography variant='h1' className='font-jakarta font-bold'>
              Heading 1 - Main Title
            </Typography>
            <Typography variant='h2' className='font-jakarta font-bold'>
              Heading 2 - Section Title
            </Typography>
            <Typography variant='h3' className='font-jakarta font-bold'>
              Heading 3 - Subsection
            </Typography>
            <Typography variant='h4' className='font-jakarta font-bold'>
              Heading 4 - Card Title
            </Typography>
            <Typography variant='h5' className='font-jakarta font-bold'>
              Heading 5 - Small Title
            </Typography>
            <Typography variant='h6' className='font-jakarta font-bold'>
              Heading 6 - Label
            </Typography>
            <Typography variant='body1' className='font-jakarta'>
              Body 1 - Primary text content
            </Typography>
            <Typography variant='body2' className='font-jakarta'>
              Body 2 - Secondary text content
            </Typography>
            <Typography variant='caption' className='font-jakarta'>
              Caption - Small text and labels
            </Typography>
          </Box>
        </Box>

        {/* 2. BUTTONS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            2. Buttons
          </Typography>
          
          <Box className='space-y-6'>
            {/* Primary Buttons */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Primary Buttons
              </Typography>
              <Box className='flex flex-wrap gap-4'>
                <Button variant='contained' size='small'>
                  Small Button
                </Button>
                <Button variant='contained' size='medium'>
                  Medium Button
                </Button>
                <Button variant='contained' size='large'>
                  Large Button
                </Button>
                <Button variant='contained' disabled>
                  Disabled Button
                </Button>
              </Box>
            </Box>

            {/* Secondary Buttons */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Secondary Buttons
              </Typography>
              <Box className='flex flex-wrap gap-4'>
                <Button variant='outlined' size='small'>
                  Small Outlined
                </Button>
                <Button variant='outlined' size='medium'>
                  Medium Outlined
                </Button>
                <Button variant='outlined' size='large'>
                  Large Outlined
                </Button>
                <Button variant='outlined' disabled>
                  Disabled Outlined
                </Button>
              </Box>
            </Box>

            {/* Text Buttons */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Text Buttons
              </Typography>
              <Box className='flex flex-wrap gap-4'>
                <Button variant='text' size='small'>
                  Small Text
                </Button>
                <Button variant='text' size='medium'>
                  Medium Text
                </Button>
                <Button variant='text' size='large'>
                  Large Text
                </Button>
                <Button variant='text' disabled>
                  Disabled Text
                </Button>
              </Box>
            </Box>

            {/* Icon Buttons */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Icon Buttons
              </Typography>
              <Box className='flex flex-wrap gap-4'>
                <IconButton size='small' sx={{ backgroundColor: '#5D9BFC', color: '#FFFFFF' }}>
                  <Add />
                </IconButton>
                <IconButton size='medium' sx={{ backgroundColor: '#5D9BFC', color: '#FFFFFF' }}>
                  <Edit />
                </IconButton>
                <IconButton size='large' sx={{ backgroundColor: '#5D9BFC', color: '#FFFFFF' }}>
                  <Delete />
                </IconButton>
                <IconButton disabled>
                  <Settings />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 3. FORM ELEMENTS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            3. Form Elements
          </Typography>
          
          <Box className='space-y-6'>
            {/* Text Fields */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Text Fields
              </Typography>
              <Box className='space-y-4'>
                <TextField
                  label='Basic Field'
                  placeholder='Enter text'
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
                />
                <TextField
                  label='With Icon'
                  placeholder='Search...'
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position='start'>
                          <Search />
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
                />
                <TextField
                  label='Password with Toggle'
                  type={showPassword ? 'text' : 'password'}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
                />
                <TextField
                  label='Error State'
                  error
                  helperText='This field has an error'
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
                />
                <TextField
                  label='Multiline'
                  multiline
                  rows={3}
                  placeholder='Enter description...'
                />
              </Box>
            </Box>

            {/* Select Fields */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Select Fields
              </Typography>
              <Box className='space-y-4'>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={category}
                    label="Category"
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px' } }}
                  >
                    <MenuItem value="tech">Technology</MenuItem>
                    <MenuItem value="business">Business</MenuItem>
                    <MenuItem value="education">Education</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Toggle Buttons */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Toggle Buttons
              </Typography>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={(e, newValue) => setViewMode(newValue)}
                sx={{ '& .MuiToggleButton-root': { borderRadius: '50px' } }}
              >
                <ToggleButton value="list">
                  <ViewList />
                </ToggleButton>
                <ToggleButton value="grid">
                  <GridView />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>

            {/* Switches */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Switches
              </Typography>
              <Box className='flex items-center gap-4'>
                <Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                <Typography>Enable notifications</Typography>
              </Box>
            </Box>

            {/* Radio Buttons */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Radio Buttons
              </Typography>
              <Box className='space-y-2'>
                <Box className='flex items-center gap-2'>
                  <Radio
                    checked={radioValue === 'option1'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    value="option1"
                  />
                  <Typography>Option 1</Typography>
                </Box>
                <Box className='flex items-center gap-2'>
                  <Radio
                    checked={radioValue === 'option2'}
                    onChange={(e) => setRadioValue(e.target.value)}
                    value="option2"
                  />
                  <Typography>Option 2</Typography>
                </Box>
              </Box>
            </Box>

            {/* Checkboxes */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Checkboxes
              </Typography>
              <Box className='space-y-2'>
                <Box className='flex items-center gap-2'>
                  <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
                  <Typography>Accept terms and conditions</Typography>
                </Box>
              </Box>
            </Box>

            {/* Slider */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Slider
              </Typography>
              <Box className='px-4'>
                <Slider
                  value={sliderValue}
                  onChange={(e, newValue) => setSliderValue(newValue as number)}
                  valueLabelDisplay="auto"
                  min={0}
                  max={100}
                />
                <Typography className='text-center mt-2'>Value: {sliderValue}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 4. CARDS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            4. Cards
          </Typography>
          
          <Box className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {/* Basic Card */}
            <Card>
              <CardContent>
                <Typography variant='h6' className='font-jakarta font-semibold mb-2'>
                  Basic Card
                </Typography>
                <Typography variant='body2' className='text-gray-600'>
                  This is a basic card with some content.
                </Typography>
              </CardContent>
            </Card>

            {/* Event Card */}
            <Card>
              <CardContent>
                <Box className='flex items-start justify-between mb-3'>
                  <Chip label="Technology" size="small" className='bg-[#5D9BFC] text-white' />
                  <IconButton size='small'>
                    <Favorite />
                  </IconButton>
                </Box>
                <Typography variant='h6' className='font-jakarta font-semibold mb-2'>
                  React Conference 2024
                </Typography>
                <Typography variant='body2' className='text-gray-600 mb-3'>
                  Learn about the latest React features and best practices.
                </Typography>
                <Box className='flex items-center justify-between'>
                  <Typography variant='caption' className='text-gray-500'>
                    Dec 15, 2024
                  </Typography>
                  <Typography variant='h6' className='font-jakarta font-bold text-[#5D9BFC]'>
                    $99
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            {/* Profile Card */}
            <Card>
              <CardContent>
                <Box className='flex items-center gap-3 mb-3'>
                  <Avatar sx={{ bgcolor: '#5D9BFC' }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant='h6' className='font-jakarta font-semibold'>
                      John Doe
                    </Typography>
                    <Typography variant='caption' className='text-gray-500'>
                      Event Organizer
                    </Typography>
                  </Box>
                </Box>
                <Typography variant='body2' className='text-gray-600'>
                  Creating amazing events for the community.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* 5. CHIPS & TAGS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            5. Chips & Tags
          </Typography>
          
          <Box className='space-y-4'>
            <Box className='flex flex-wrap gap-2'>
              <Chip label="Technology" color="primary" />
              <Chip label="Business" variant="outlined" />
              <Chip label="Education" />
              <Chip label="Entertainment" />
              <Chip label="Deletable" onDelete={() => {}} />
            </Box>
          </Box>
        </Box>

        {/* 6. AVATARS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            6. Avatars
          </Typography>
          
          <Box className='space-y-6'>
            {/* Individual Avatars */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Individual Avatars
              </Typography>
              <Box className='flex items-center gap-4'>
                <Avatar sx={{ bgcolor: '#5D9BFC' }}>A</Avatar>
                <Avatar sx={{ bgcolor: '#10B981' }}>B</Avatar>
                <Avatar sx={{ bgcolor: '#F59E0B' }}>C</Avatar>
                <Avatar sx={{ bgcolor: '#EF4444' }}>D</Avatar>
                <Avatar sx={{ bgcolor: '#8B5CF6' }}>E</Avatar>
                <Avatar sx={{ bgcolor: '#F97316' }}>F</Avatar>
              </Box>
            </Box>
            
            {/* Avatar Sizes */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Avatar Sizes
              </Typography>
              <Box className='flex items-center gap-4'>
                <Avatar sx={{ bgcolor: '#5D9BFC', width: 24, height: 24 }}>S</Avatar>
                <Avatar sx={{ bgcolor: '#5D9BFC', width: 32, height: 32 }}>M</Avatar>
                <Avatar sx={{ bgcolor: '#5D9BFC', width: 40, height: 40 }}>L</Avatar>
                <Avatar sx={{ bgcolor: '#5D9BFC', width: 56, height: 56 }}>XL</Avatar>
                <Avatar sx={{ bgcolor: '#5D9BFC', width: 80, height: 80 }}>XXL</Avatar>
              </Box>
            </Box>
            
            {/* Avatar Groups */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Avatar Groups
              </Typography>
              <Box className='flex items-center gap-6'>
                <AvatarGroup max={3}>
                  <Avatar sx={{ bgcolor: '#5D9BFC' }}>A</Avatar>
                  <Avatar sx={{ bgcolor: '#10B981' }}>B</Avatar>
                  <Avatar sx={{ bgcolor: '#F59E0B' }}>C</Avatar>
                </AvatarGroup>
                
                <AvatarGroup max={4}>
                  <Avatar sx={{ bgcolor: '#5D9BFC' }}>A</Avatar>
                  <Avatar sx={{ bgcolor: '#10B981' }}>B</Avatar>
                  <Avatar sx={{ bgcolor: '#F59E0B' }}>C</Avatar>
                  <Avatar sx={{ bgcolor: '#EF4444' }}>D</Avatar>
                  <Avatar sx={{ bgcolor: '#8B5CF6' }}>E</Avatar>
                </AvatarGroup>
                
                <AvatarGroup max={5}>
                  <Avatar sx={{ bgcolor: '#5D9BFC' }}>A</Avatar>
                  <Avatar sx={{ bgcolor: '#10B981' }}>B</Avatar>
                  <Avatar sx={{ bgcolor: '#F59E0B' }}>C</Avatar>
                  <Avatar sx={{ bgcolor: '#EF4444' }}>D</Avatar>
                  <Avatar sx={{ bgcolor: '#8B5CF6' }}>E</Avatar>
                  <Avatar sx={{ bgcolor: '#F97316' }}>F</Avatar>
                </AvatarGroup>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 7. BADGES */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            7. Badges
          </Typography>
          
          <Box className='flex items-center gap-4'>
            <Badge badgeContent={4} color="primary">
              <Notifications />
            </Badge>
            <Badge badgeContent={99} color="error">
              <Email />
            </Badge>
            <Badge badgeContent={1000} color="primary" max={999}>
              <Favorite />
            </Badge>
          </Box>
        </Box>

        {/* 8. PROGRESS & LOADING */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            8. Progress & Loading
          </Typography>
          
          <Box className='space-y-4'>
            <Box className='flex items-center gap-4'>
              <CircularProgress size={24} />
              <CircularProgress size={32} />
              <CircularProgress size={40} />
            </Box>
            
            <Box>
              <Typography variant='body2' className='mb-2'>Loading...</Typography>
              <Box className='w-full bg-gray-200 rounded-full h-2'>
                <Box className='bg-[#5D9BFC] h-2 rounded-full' style={{ width: '60%' }}></Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* 9. STEPPER */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            9. Stepper
          </Typography>
          
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* 10. LISTS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            10. Lists
          </Typography>
          
          <Paper>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" secondary="Go to home page" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText primary="Events" secondary="View all events" />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemIcon>
                  <Group />
                </ListItemIcon>
                <ListItemText primary="Meetups" secondary="Join meetups" />
              </ListItem>
            </List>
          </Paper>
        </Box>

        {/* 11. TOOLTIPS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            11. Tooltips
          </Typography>
          
          <Box className='flex items-center gap-4'>
            <Tooltip title="This is a tooltip">
              <Button>Hover me</Button>
            </Tooltip>
            <Tooltip title="Another tooltip">
              <IconButton>
                <Info />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* 12. DIALOGS & MODALS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            12. Dialogs & Modals
          </Typography>
          
          <Box className='space-y-4'>
            <Typography variant='body1' className='text-gray-600'>
              Modal and Dialog components (interactive examples would require state management)
            </Typography>
          </Box>
        </Box>

        {/* 13. TABLES */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            13. Tables
          </Typography>
          
          <Paper>
            <Box className='p-4'>
              <Typography variant='h6' className='mb-4 font-jakarta font-semibold'>
                Sample Table
              </Typography>
              <Box className='overflow-x-auto'>
                <table className='w-full border-collapse'>
                  <thead>
                    <tr className='border-b'>
                      <th className='text-left p-2 font-jakarta font-semibold'>Name</th>
                      <th className='text-left p-2 font-jakarta font-semibold'>Email</th>
                      <th className='text-left p-2 font-jakarta font-semibold'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='border-b'>
                      <td className='p-2'>John Doe</td>
                      <td className='p-2'>john@example.com</td>
                      <td className='p-2'>
                        <Chip label="Active" size="small" color="success" />
                      </td>
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2'>Jane Smith</td>
                      <td className='p-2'>jane@example.com</td>
                      <td className='p-2'>
                        <Chip label="Pending" size="small" color="warning" />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* 14. DIVIDERS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            14. Dividers
          </Typography>
          
          <Box className='space-y-4'>
            <Typography variant='body1'>Content above divider</Typography>
            <Divider />
            <Typography variant='body1'>Content below divider</Typography>
            <Divider variant="middle" />
            <Typography variant='body1'>Content with middle variant</Typography>
          </Box>
        </Box>

        {/* 15. ALERTS & NOTIFICATIONS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            15. Alerts & Notifications
          </Typography>
          
          <Box className='space-y-4'>
            <Box className='p-4 bg-green-100 border border-green-300 rounded-lg'>
              <Typography variant='body2' className='text-green-800 font-jakarta'>
                ✅ Success: Operation completed successfully
              </Typography>
            </Box>
            <Box className='p-4 bg-yellow-100 border border-yellow-300 rounded-lg'>
              <Typography variant='body2' className='text-yellow-800 font-jakarta'>
                ⚠️ Warning: Please review your input
              </Typography>
            </Box>
            <Box className='p-4 bg-red-100 border border-red-300 rounded-lg'>
              <Typography variant='body2' className='text-red-800 font-jakarta'>
                ❌ Error: Something went wrong
              </Typography>
            </Box>
            <Box className='p-4 bg-blue-100 border border-blue-300 rounded-lg'>
              <Typography variant='body2' className='text-blue-800 font-jakarta'>
                ℹ️ Info: Here's some helpful information
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* 16. BREADCRUMBS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            16. Breadcrumbs
          </Typography>
          
          <Box className='flex items-center gap-2 text-sm'>
            <Typography variant='body2' className='text-gray-500'>Home</Typography>
            <ChevronRight sx={{ fontSize: 16, color: '#666' }} />
            <Typography variant='body2' className='text-gray-500'>Events</Typography>
            <ChevronRight sx={{ fontSize: 16, color: '#666' }} />
            <Typography variant='body2' className='text-gray-900 font-semibold'>Create Event</Typography>
          </Box>
        </Box>

        {/* 17. PAGINATION */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            17. Pagination
          </Typography>
          
          <Box className='flex items-center gap-2'>
            <Button variant='outlined' size='small' disabled>
              <ArrowBack sx={{ fontSize: 16 }} />
            </Button>
            <Button variant='contained' size='small'>1</Button>
            <Button variant='outlined' size='small'>2</Button>
            <Button variant='outlined' size='small'>3</Button>
            <Button variant='outlined' size='small'>
              <ArrowForward sx={{ fontSize: 16 }} />
            </Button>
          </Box>
        </Box>

        {/* 18. LOADING STATES */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            18. Loading States
          </Typography>
          
          <Box className='space-y-4'>
            <Box className='flex items-center gap-4'>
              <CircularProgress size={20} />
              <Typography variant='body2'>Loading...</Typography>
            </Box>
            <Box className='flex items-center gap-4'>
              <CircularProgress size={24} color="secondary" />
              <Typography variant='body2'>Processing...</Typography>
            </Box>
            <Box className='flex items-center gap-4'>
              <CircularProgress size={28} />
              <Typography variant='body2'>Saving changes...</Typography>
            </Box>
          </Box>
        </Box>

        {/* 19. EMPTY STATES */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            19. Empty States
          </Typography>
          
          <Box className='text-center p-8 border-2 border-dashed border-gray-300 rounded-lg'>
            <Event sx={{ fontSize: 48, color: '#9CA3AF', mb: 2 }} />
            <Typography variant='h6' className='mb-2 font-jakarta font-semibold'>
              No events found
            </Typography>
            <Typography variant='body2' className='text-gray-600 mb-4'>
              Create your first event to get started
            </Typography>
            <Button variant='contained' startIcon={<Add />}>
              Create Event
            </Button>
          </Box>
        </Box>

        {/* 20. NAVIGATION ELEMENTS */}
        <Box className='mb-12'>
          <Typography variant='h4' className='mb-6 font-jakarta font-bold'>
            20. Navigation Elements
          </Typography>
          
          <Box className='space-y-4'>
            {/* Tabs */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Tabs
              </Typography>
              <Box className='flex border-b'>
                <Box className='px-4 py-2 border-b-2 border-[#5D9BFC]'>
                  <Typography variant='body2' className='text-[#5D9BFC] font-semibold'>Active Tab</Typography>
                </Box>
                <Box className='px-4 py-2'>
                  <Typography variant='body2' className='text-gray-500'>Inactive Tab</Typography>
                </Box>
                <Box className='px-4 py-2'>
                  <Typography variant='body2' className='text-gray-500'>Another Tab</Typography>
                </Box>
              </Box>
            </Box>
            
            {/* Menu Items */}
            <Box>
              <Typography variant='h6' className='mb-3 font-jakarta font-semibold'>
                Menu Items
              </Typography>
              <Paper className='w-64'>
                <List>
                  <ListItem>
                    <ListItemIcon><Home /></ListItemIcon>
                    <ListItemText primary="Home" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Event /></ListItemIcon>
                    <ListItemText primary="Events" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon><Group /></ListItemIcon>
                    <ListItemText primary="Meetups" />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <ListItemIcon><Settings /></ListItemIcon>
                    <ListItemText primary="Settings" />
                  </ListItem>
                </List>
              </Paper>
            </Box>
          </Box>
        </Box>

      </Box>
    </>
  );
}

export default DesignSystem;
