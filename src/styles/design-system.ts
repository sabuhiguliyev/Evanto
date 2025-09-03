// Design System - Centralized styling constants and utilities

// Color Palette
export const colors = {
  // Primary Colors
  primary: {
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#5D9BFC', // Main primary color
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#1E3A8A',
  },
  
  // Neutral Colors
  neutral: {
    50: '#F8F8F8',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Background Colors
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F8',
    tertiary: '#F3F4F6',
  },
  
  // Border Colors
  border: {
    light: '#E8E8E8',
    medium: '#D1D5DB',
    dark: '#9CA3AF',
  },
} as const;

// Spacing Scale (8px base unit)
export const spacing = {
  0: '0px',
  1: '4px',   // 0.25rem
  2: '8px',   // 0.5rem
  3: '12px',  // 0.75rem
  4: '16px',  // 1rem
  5: '20px',  // 1.25rem
  6: '24px',  // 1.5rem
  8: '32px',  // 2rem
  10: '40px', // 2.5rem
  12: '48px', // 3rem
  16: '64px', // 4rem
  20: '80px', // 5rem
  24: '96px', // 6rem
} as const;

// Typography Scale
export const typography = {
  fontFamily: {
    primary: 'Plus Jakarta Sans, sans-serif',
    secondary: 'Poppins, sans-serif',
  },
  
  fontSize: {
    xs: '12px',   // 0.75rem
    sm: '14px',   // 0.875rem
    base: '16px', // 1rem
    lg: '18px',   // 1.125rem
    xl: '20px',   // 1.25rem
    '2xl': '24px', // 1.5rem
    '3xl': '30px', // 1.875rem
    '4xl': '36px', // 2.25rem
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Border Radius
export const borderRadius = {
  none: '0px',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

// Shadows
export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

// Component Sizes
export const componentSizes = {
  // Button Heights
  button: {
    sm: '32px',
    md: '40px',
    lg: '50px',
    xl: '56px',
  },
  
  // Input Heights
  input: {
    sm: '36px',
    md: '44px',
    lg: '50px',
  },
  
  // Card Dimensions
  card: {
    sm: '200px',
    md: '250px',
    lg: '300px',
  },
  
  // Container Widths
  container: {
    mobile: '375px',
    tablet: '768px',
    desktop: '1024px',
  },
} as const;

// Z-Index Scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Breakpoints
export const breakpoints = {
  xs: '0px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Standardized Component Classes
export const componentClasses = {
  // Button variants
  button: {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg px-4 py-2 transition-colors',
    secondary: 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium rounded-lg px-4 py-2 transition-colors',
    outline: 'border border-neutral-300 hover:border-neutral-400 text-neutral-700 font-medium rounded-lg px-4 py-2 transition-colors',
    ghost: 'text-neutral-700 hover:bg-neutral-100 font-medium rounded-lg px-4 py-2 transition-colors',
  },
  
  // Input variants
  input: {
    default: 'w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
    error: 'w-full px-3 py-2 border border-error-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-error-500 focus:border-transparent',
  },
  
  // Card variants
  card: {
    default: 'bg-white rounded-2xl shadow-sm border border-neutral-200',
    elevated: 'bg-white rounded-2xl shadow-md border border-neutral-200',
    flat: 'bg-neutral-50 rounded-2xl border border-neutral-200',
  },
  
  // Container variants
  container: {
    page: 'min-h-screen bg-background-primary',
    section: 'bg-white rounded-2xl p-6 shadow-sm border border-neutral-200',
    card: 'bg-neutral-50 rounded-2xl p-4 border border-neutral-200',
  },
  
  // Icon button variants
  iconButton: {
    default: 'p-2 rounded-lg hover:bg-neutral-100 transition-colors',
    primary: 'p-2 rounded-lg bg-primary-500 text-white hover:bg-primary-600 transition-colors',
    outline: 'p-2 rounded-lg border border-neutral-300 hover:bg-neutral-50 transition-colors',
  },
  
  // Status indicators
  status: {
    success: 'bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium',
    warning: 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium',
    error: 'bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium',
    info: 'bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium',
  },
} as const;

// Common inline style replacements
export const commonStyles = {
  // Border styles
  borderLight: { border: '1px solid #E8E8E8' },
  borderMedium: { border: '1px solid #D1D5DB' },
  
  // Background styles
  backgroundSecondary: { backgroundColor: '#F8F8F8' },
  backgroundTertiary: { backgroundColor: '#F3F4F6' },
  
  // Primary color styles
  primaryBackground: { backgroundColor: '#5D9BFC' },
  primaryBackgroundLight: { backgroundColor: '#5D9BFC26' },
  
  // Common flex layouts
  flexCenter: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  flexBetween: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  flexStart: { display: 'flex', alignItems: 'center', justifyContent: 'flex-start' },
  
  // Common spacing
  paddingStandard: { padding: '16px' },
  marginStandard: { margin: '16px' },
} as const;

// Utility Functions
export const getSpacing = (size: keyof typeof spacing) => spacing[size];
export const getColor = (color: string) => {
  const keys = color.split('.');
  let value: any = colors;
  for (const key of keys) {
    value = value[key];
  }
  return value;
};
export const getTypography = (variant: keyof typeof typography.fontSize) => typography.fontSize[variant];
