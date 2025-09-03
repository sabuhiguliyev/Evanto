import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent, 
  TextField,
  Chip,
  Avatar,
  Stack,
  IconButton,
  Divider,
  Paper
} from '@mui/material';
import { 
  LocationOn, 
  CalendarToday, 
  Person, 
  Favorite, 
  Share,
  Edit,
  Delete,
  Add,
  Search
} from '@mui/icons-material';

/**
 * Design System Reference Component
 * 
 * This component serves as a comprehensive reference for all design system elements
 * implemented based on Figma specifications. It includes:
 * 
 * - Color palette (5 colors)
 * - Typography scale (6 sizes with Poppins font)
 * - Logo variations (Candal font)
 * - Button system (Plus Jakarta Sans font)
 * - Navigation bar specifications
 * - Component examples
 * 
 * Use this as a reference when implementing new components or updating existing ones.
 */
const DesignSystemReference: React.FC = () => {
  return (
    <Box className="p-6 space-y-8">
      <Typography variant="h4" className="text-center mb-8">
        Design System Reference
      </Typography>
      
      {/* Typography Examples */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Typography Scale</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Based on your Figma design system with Sora and Poppins fonts
        </Typography>
        <Stack spacing={3}>
          <div>
            <Typography variant="h1" className="font-poppins">Main Headers</Typography>
            <Typography className="text-xs text-gray-500 mt-1">H1: 36px, 700 weight, Poppins font (Industry Standard)</Typography>
          </div>
          <div>
            <Typography variant="h2" className="font-poppins">Section Headers</Typography>
            <Typography className="text-xs text-gray-500 mt-1">H2: 28px, 600 weight, Poppins font (Industry Standard)</Typography>
          </div>
          <div>
            <Typography variant="h3" className="font-poppins">Subsection Headers</Typography>
            <Typography className="text-xs text-gray-500 mt-1">H3: 22px, 600 weight, Poppins font (Industry Standard)</Typography>
          </div>
          <div>
            <Typography variant="h4" className="font-poppins">Small Headers</Typography>
            <Typography className="text-xs text-gray-500 mt-1">H4: 18px, 500 weight, Poppins font (Industry Standard)</Typography>
          </div>
          <div>
            <Typography variant="body1" className="font-poppins">Body Text - Regular paragraphs and descriptions</Typography>
            <Typography className="text-xs text-gray-500 mt-1">Body: 16px, 400 weight, Poppins font, #888888 color</Typography>
          </div>
          <div>
            <Typography variant="body2" className="font-poppins">Small Text - Additional disclaimers and tooltips</Typography>
            <Typography className="text-xs text-gray-500 mt-1">Small: 14px, 400 weight, Poppins font, #AAAAAA color</Typography>
          </div>
          <div>
            <Typography variant="caption" className="font-poppins">Caption Text - Labels and metadata</Typography>
            <Typography className="text-xs text-gray-500 mt-1">Caption: 12px, 400 weight, Poppins font, #666666 color</Typography>
          </div>
        </Stack>
      </Paper>

      {/* Color Palette Examples */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Industry Standard Color Palette</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Following industry best practices with 5 colors maximum for maintainability
        </Typography>
        
        <div className="grid grid-cols-5 gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary rounded-lg mx-auto mb-2"></div>
            <Typography className="text-sm font-medium">Primary</Typography>
            <Typography className="text-xs text-gray-500">#5D9BFC</Typography>
            <Typography className="text-xs text-gray-400">Brand color</Typography>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-lg mx-auto mb-2"></div>
            <Typography className="text-sm font-medium">Secondary</Typography>
            <Typography className="text-xs text-gray-500">#1C2039</Typography>
            <Typography className="text-xs text-gray-400">Dark gray/blue</Typography>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-light rounded-lg mx-auto mb-2 border"></div>
            <Typography className="text-sm font-medium">Neutral Light</Typography>
            <Typography className="text-xs text-gray-500">#F3F4F6</Typography>
            <Typography className="text-xs text-gray-400">Background</Typography>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-neutral-dark rounded-lg mx-auto mb-2"></div>
            <Typography className="text-sm font-medium">Neutral Dark</Typography>
            <Typography className="text-xs text-gray-500">#666666</Typography>
            <Typography className="text-xs text-gray-400">Text</Typography>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-text-primary rounded-lg mx-auto mb-2"></div>
            <Typography className="text-sm font-medium">Text Primary</Typography>
            <Typography className="text-xs text-gray-500">#000000</Typography>
            <Typography className="text-xs text-gray-400">Headlines</Typography>
          </div>
        </div>
      </Paper>

      {/* Logo Examples */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Logo Variations</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Based on Figma logo specifications with Candal font
        </Typography>
        
        <div className="space-y-6">
          {/* Logo on Light Background */}
          <div>
            <Typography variant="h6" className="mb-3">Light Background</Typography>
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <Typography className="font-candal text-3xl text-secondary">
                  evanto
                </Typography>
              </div>
            </div>
          </div>

          {/* Logo on Dark Background */}
          <div>
            <Typography variant="h6" className="mb-3">Dark Background</Typography>
            <div className="p-6 bg-secondary rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <Typography className="font-candal text-3xl text-white">
                  evanto
                </Typography>
              </div>
            </div>
          </div>

          {/* Logo Sizes */}
          <div>
            <Typography variant="h6" className="mb-3">Logo Sizes</Typography>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded"></div>
                </div>
                <Typography className="font-candal text-lg text-secondary">
                  evanto
                </Typography>
                <Typography className="text-sm text-gray-500">Small (24px)</Typography>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
                <Typography className="font-candal text-3xl text-secondary">
                  evanto
                </Typography>
                <Typography className="text-sm text-gray-500">Medium (30px)</Typography>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <Typography className="font-candal text-4xl text-secondary">
                  evanto
                </Typography>
                <Typography className="text-sm text-gray-500">Large (36px)</Typography>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* Button Examples */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Button System</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Based on Figma specifications with Plus Jakarta Sans font and exact dimensions
        </Typography>
        
        <div className="space-y-8">
          {/* Primary Buttons - Figma Specs */}
          <div>
            <Typography variant="h6" className="mb-3">Primary Buttons (335px × 50px, 30px radius)</Typography>
            <div className="space-y-4">
              <Button variant="contained" size="large" className="font-jakarta">
                Got it, Next
              </Button>
              <Button variant="contained" size="large" className="font-jakarta">
                Cool, Next
              </Button>
              <Button variant="contained" size="large" className="font-jakarta">
                Get Started
              </Button>
            </div>
          </div>

          {/* Secondary Buttons - Figma Specs */}
          <div>
            <Typography variant="h6" className="mb-3">Secondary Buttons (50px radius)</Typography>
            <div className="space-y-4">
              <Button variant="outlined" className="font-jakarta">
                Sign Up
              </Button>
              <Button variant="outlined" className="font-jakarta">
                Continue With Email
              </Button>
            </div>
          </div>

          {/* Social Buttons - Figma Specs */}
          <div>
            <Typography variant="h6" className="mb-3">Social Buttons (80px × 35px, 15% opacity)</Typography>
            <div className="flex gap-4">
              <Button 
                variant="contained" 
                className="w-button-social h-button-social rounded-button-secondary font-jakarta"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="w-4 h-4 bg-white rounded mr-2"></div>
                Apple
              </Button>
              <Button 
                variant="contained" 
                className="w-button-social h-button-social rounded-button-secondary font-jakarta"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="w-4 h-4 bg-white rounded mr-2"></div>
                Google
              </Button>
              <Button 
                variant="contained" 
                className="w-button-social h-button-social rounded-button-secondary font-jakarta"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
              >
                <div className="w-4 h-4 bg-white rounded mr-2"></div>
                Facebook
              </Button>
            </div>
          </div>

          {/* Icon Buttons - Figma Specs */}
          <div>
            <Typography variant="h6" className="mb-3">Icon Buttons (44px × 44px, circular)</Typography>
            <div className="flex gap-4">
              <IconButton 
                className="w-button-icon h-button-icon border border-gray-200 rounded-button-icon"
              >
                <div className="w-2 h-2 border border-gray-400 transform rotate-45"></div>
              </IconButton>
              <IconButton 
                className="w-button-icon h-button-icon border border-gray-200 rounded-button-icon"
                style={{ transform: 'scaleX(-1)' }}
              >
                <div className="w-2 h-2 border border-gray-400 transform -rotate-90"></div>
              </IconButton>
            </div>
          </div>

          {/* Action Buttons - Figma Specs */}
          <div>
            <Typography variant="h6" className="mb-3">Action Buttons</Typography>
            <div className="space-y-4">
              <Button variant="contained" size="large" className="font-jakarta">
                Send
              </Button>
              <Button variant="contained" size="large" className="font-jakarta">
                Open Your Email
              </Button>
              <Button variant="contained" size="large" className="font-jakarta">
                Verify
              </Button>
              <Button variant="contained" size="large" className="font-jakarta">
                Continue
              </Button>
              <Button variant="contained" size="large" className="font-jakarta">
                Save & Continue
              </Button>
            </div>
          </div>

          {/* Button Pairs - Figma Specs */}
          <div>
            <Typography variant="h6" className="mb-3">Button Pairs (160px × 50px)</Typography>
            <div className="flex gap-4">
              <Button 
                variant="outlined" 
                className="w-40 h-button-primary rounded-button-primary font-jakarta"
                style={{ backgroundColor: 'rgba(93, 155, 252, 0.15)', color: '#5D9BFC' }}
              >
                Reset
              </Button>
              <Button 
                variant="contained" 
                className="w-40 h-button-primary rounded-button-primary font-jakarta"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      </Paper>

      {/* Navigation Bar Examples - Figma Specs */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Navigation Bar (375px × 90px)</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Based on Figma navigation specifications with proper active/inactive states
        </Typography>
        
        <div className="space-y-6">
          {/* Navigation Bar 1 - Home Active */}
          <div>
            <Typography className="text-sm text-gray-500 mb-2">Home Active</Typography>
            <div className="w-96 h-nav-bar bg-white shadow-lg relative">
              <div className="flex items-center justify-between h-full px-8">
                {/* Home - Active */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary rounded"></div>
                  <Typography className="text-xs font-poppins text-primary">Home</Typography>
                </div>
                
                {/* Favorite */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Favorite</Typography>
                </div>
                
                {/* Discovery - Center Button */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-nav-center h-nav-center bg-primary rounded-full shadow-lg flex items-center justify-center -mt-4">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
                
                {/* Ticket */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-3 border-2 border-gray-400 rounded"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Ticket</Typography>
                </div>
                
                {/* Profile */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-4 border-2 border-gray-400 rounded-full"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Profile</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar 2 - Favorite Active */}
          <div>
            <Typography className="text-sm text-gray-500 mb-2">Favorite Active</Typography>
            <div className="w-96 h-nav-bar bg-white shadow-lg relative">
              <div className="flex items-center justify-between h-full px-8">
                {/* Home */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Home</Typography>
                </div>
                
                {/* Favorite - Active */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary rounded-full"></div>
                  <Typography className="text-xs font-poppins text-primary">Favorite</Typography>
                </div>
                
                {/* Discovery - Center Button */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-nav-center h-nav-center bg-primary rounded-full shadow-lg flex items-center justify-center -mt-4">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
                
                {/* Ticket */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-3 border-2 border-gray-400 rounded"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Ticket</Typography>
                </div>
                
                {/* Profile */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-4 border-2 border-gray-400 rounded-full"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Profile</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar 3 - Ticket Active */}
          <div>
            <Typography className="text-sm text-gray-500 mb-2">Ticket Active</Typography>
            <div className="w-96 h-nav-bar bg-white shadow-lg relative">
              <div className="flex items-center justify-between h-full px-8">
                {/* Home */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Home</Typography>
                </div>
                
                {/* Favorite */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Favorite</Typography>
                </div>
                
                {/* Discovery - Center Button */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-nav-center h-nav-center bg-primary rounded-full shadow-lg flex items-center justify-center -mt-4">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
                
                {/* Ticket - Active */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-3 border-2 border-primary rounded"></div>
                  <Typography className="text-xs font-poppins text-primary">Ticket</Typography>
                </div>
                
                {/* Profile */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-4 border-2 border-gray-400 rounded-full"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Profile</Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Bar 4 - Profile Active */}
          <div>
            <Typography className="text-sm text-gray-500 mb-2">Profile Active</Typography>
            <div className="w-96 h-nav-bar bg-white shadow-lg relative">
              <div className="flex items-center justify-between h-full px-8">
                {/* Home */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Home</Typography>
                </div>
                
                {/* Favorite */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-400 rounded-full"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Favorite</Typography>
                </div>
                
                {/* Discovery - Center Button */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-nav-center h-nav-center bg-primary rounded-full shadow-lg flex items-center justify-center -mt-4">
                    <div className="w-6 h-6 bg-white rounded"></div>
                  </div>
                </div>
                
                {/* Ticket */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-4 h-3 border-2 border-gray-400 rounded"></div>
                  <Typography className="text-xs font-poppins text-gray-400">Ticket</Typography>
                </div>
                
                {/* Profile - Active */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-3 h-4 border-2 border-primary rounded-full"></div>
                  <Typography className="text-xs font-poppins text-primary">Profile</Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Paper>

      {/* Component Examples from Figma */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Component Examples</Typography>
        <Typography className="text-sm text-gray-600 mb-4">
          Based on Figma design system components
        </Typography>
        
        <div className="space-y-6">
          {/* Payment Card Example */}
          <div>
            <Typography variant="h6" className="mb-3">Payment Card</Typography>
            <Card className="w-80 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Typography className="text-sm opacity-80">Credit Card</Typography>
                  <div className="w-8 h-6 bg-white rounded opacity-20"></div>
                </div>
                <Typography className="text-lg font-medium mb-4">•••• •••• •••• 1234</Typography>
                <div className="flex justify-between items-end">
                  <div>
                    <Typography className="text-xs opacity-80">Card Holder</Typography>
                    <Typography className="text-sm">John Doe</Typography>
                  </div>
                  <div>
                    <Typography className="text-xs opacity-80">Expires</Typography>
                    <Typography className="text-sm">12/25</Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tags Example */}
          <div>
            <Typography variant="h6" className="mb-3">Filter Tags</Typography>
            <Stack direction="row" spacing={1} className="flex-wrap">
              <Chip 
                label="All Events" 
                color="primary"
                onClick={() => {}}
              />
              <Chip 
                label="Music" 
                variant="outlined"
                onClick={() => {}}
              />
              <Chip 
                label="Sports" 
                variant="outlined"
                onClick={() => {}}
              />
              <Chip 
                label="Technology" 
                variant="outlined"
                onClick={() => {}}
              />
              <Chip 
                label="Education" 
                variant="outlined"
                onClick={() => {}}
              />
            </Stack>
          </div>
        </div>
      </Paper>

      {/* Spacing Examples */}
      <Paper className="p-6">
        <Typography variant="h5" className="mb-4">Spacing Scale</Typography>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <Typography className="text-sm">4px (xs)</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-4 bg-blue-500 rounded"></div>
            <Typography className="text-sm">8px (sm)</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-4 bg-blue-500 rounded"></div>
            <Typography className="text-sm">16px (md)</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-4 bg-blue-500 rounded"></div>
            <Typography className="text-sm">24px (lg)</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-32 h-4 bg-blue-500 rounded"></div>
            <Typography className="text-sm">32px (xl)</Typography>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-48 h-4 bg-blue-500 rounded"></div>
            <Typography className="text-sm">48px (2xl)</Typography>
          </div>
        </div>
      </Paper>
    </Box>
  );
};

export default DesignSystemReference;
