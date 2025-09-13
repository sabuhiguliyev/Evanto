/**
 * Design Tokens - Comprehensive Design System Foundation
 * 
 * This file contains all design tokens used throughout the application.
 * Uses MUI/Tailwind equivalents where possible to reduce redundancy.
 * 
 * Usage:
 * - Import tokens in MUI theme for component defaults
 * - Use Tailwind classes for utility styling
 * - Reference custom values for project-specific needs
 */

export const designTokens = {
  // Color System - Using MUI semantic colors + Tailwind neutral scale
  colors: {
    // Brand colors
    primary: '#5D9BFC',        // Main brand color
    primaryHover: '#4A8BFC',   // Hover state
    primaryLight: '#93C5FD',   // Light variant
    primaryDark: '#2563EB',    // Dark variant
    
    // Semantic colors (MUI standard)
    success: '#10B981',        // Success actions
    warning: '#F59E0B',        // Warning states
    error: '#EF4444',          // Error states
    info: '#3B82F6',           // Information
    
    // Neutral scale (Tailwind gray scale)
    neutral: {
      50: '#F9FAFB',   // Lightest background
      100: '#F3F4F6',  // Light background
      200: '#E5E7EB',  // Border light
      300: '#D1D5DB',  // Border medium
      400: '#9CA3AF',  // Text muted
      500: '#6B7280',  // Text secondary
      600: '#4B5563',  // Text primary
      700: '#374151',  // Text dark
      800: '#1F2937',  // Background dark
      900: '#111827',  // Background darkest
    }
  },

  // Typography System
  typography: {
    // Font families
    fontFamily: {
      primary: '"Plus Jakarta Sans", sans-serif',    // Main font
      secondary: '"Poppins", sans-serif',            // Secondary font
      logo: '"Candal", sans-serif',                  // Logo font
      mono: '"JetBrains Mono", monospace',           // Code/monospace
    },
    
    // Font sizes (Tailwind classes)
    fontSize: {
      xs: 'text-xs',      // 12px - Small text
      sm: 'text-sm',      // 14px - Body small
      base: 'text-base',  // 16px - Body text
      lg: 'text-lg',      // 18px - Large text
      xl: 'text-xl',      // 20px - Heading small
      '2xl': 'text-2xl',  // 24px - Heading medium
      '3xl': 'text-3xl',  // 30px - Heading large (max size)
    },
    
    // Font weights (Tailwind classes)
    fontWeight: {
      light: 'font-light',       // 300
      normal: 'font-normal',     // 400
      medium: 'font-medium',     // 500
      semibold: 'font-semibold', // 600
      bold: 'font-bold',         // 700
      extrabold: 'font-extrabold', // 800
    },
    
    // Line heights
    lineHeight: {
      tight: 1.2,    // Tight spacing
      normal: 1.5,   // Normal spacing
      relaxed: 1.75, // Relaxed spacing
    },
    
    // Typography variants (based on actual project usage)
    variants: {
      h1: {
        fontSize: '3xl',      // 30px (max size)
        fontWeight: 'bold',   // 700
        lineHeight: 'tight',  // 1.2
      },
      h2: {
        fontSize: '2xl',      // 24px
        fontWeight: 'semibold', // 600
        lineHeight: 'tight',  // 1.2
      },
      h3: {
        fontSize: 'xl',       // 20px
        fontWeight: 'semibold', // 600
        lineHeight: 'tight',  // 1.2
      },
      h4: {
        fontSize: 'lg',       // 18px
        fontWeight: 'semibold', // 600
        lineHeight: 'tight',  // 1.2
      },
      h5: {
        fontSize: 'base',     // 16px
        fontWeight: 'semibold', // 600
        lineHeight: 'normal', // 1.4
      },
      h6: {
        fontSize: 'sm',       // 14px
        fontWeight: 'semibold', // 600
        lineHeight: 'normal', // 1.4
      },
      body1: {
        fontSize: 'base',     // 16px
        fontWeight: 'normal', // 400
        lineHeight: 'normal', // 1.5
      },
      body2: {
        fontSize: 'sm',       // 14px
        fontWeight: 'normal', // 400
        lineHeight: 'normal', // 1.5
      },
      caption: {
        fontSize: 'xs',       // 12px
        fontWeight: 'normal', // 400
        lineHeight: 'normal', // 1.4
      },
      button: {
        fontSize: 'sm',       // 14px
        fontWeight: 'medium', // 500
        lineHeight: 'normal', // 1.4
      },
    }
  },

  // Spacing System (Tailwind 4px base unit)
  spacing: {
    0: '0',      // 0px
    1: '1',      // 4px
    2: '2',      // 8px
    3: '3',      // 12px
    4: '4',      // 16px
    5: '5',      // 20px
    6: '6',      // 24px
    8: '8',      // 32px
    10: '10',    // 40px
    12: '12',    // 48px
    16: '16',    // 64px
    20: '20',    // 80px
    24: '24',    // 96px
    32: '32',    // 128px
  },

  // Border Radius System (Tailwind classes)
  borderRadius: {
    none: 'rounded-none',    // 0px
    sm: 'rounded-sm',        // 4px
    base: 'rounded-lg',      // 8px
    md: 'rounded-xl',        // 12px
    lg: 'rounded-2xl',       // 16px
    xl: 'rounded-3xl',       // 20px
    full: 'rounded-full',    // 9999px
  },

  // Shadow System
  shadows: {
    sm: 'shadow-sm',     // Small shadow
    base: 'shadow',      // Base shadow
    md: 'shadow-md',     // Medium shadow
    lg: 'shadow-lg',     // Large shadow
    xl: 'shadow-xl',     // Extra large shadow
    '2xl': 'shadow-2xl', // 2x large shadow
  },

  // Breakpoints (Tailwind breakpoints)
  breakpoints: {
    sm: '640px',   // Small screens
    md: '768px',   // Medium screens
    lg: '1024px',  // Large screens
    xl: '1280px',  // Extra large screens
    '2xl': '1536px', // 2x large screens
  },

  // Z-Index Scale
  zIndex: {
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
  },

  // Project-specific values
  custom: {
    // Container width for mobile-first design
    containerWidth: '375px',
    
    // Button heights to match MUI TextField
    buttonHeight: {
      small: '32px',   // h-8
      medium: '40px',  // h-10  
      large: '56px',   // Matches MUI TextField default height
    },
    
    // Animation durations
    animation: {
      fast: '150ms',
      normal: '300ms',
      slow: '500ms',
    },
    
    // Transitions
    transition: {
      fast: 'all 150ms ease-in-out',
      normal: 'all 300ms ease-in-out',
      slow: 'all 500ms ease-in-out',
    }
  }
};

// Dark Mode Color Overrides
export const darkModeColors = {
  background: {
    primary: 'slate-900',    // #0F172A - Main dark background
    secondary: 'slate-800',  // #1E293B - Secondary dark background
    tertiary: 'slate-700',   // #334155 - Tertiary dark background
    card: 'slate-800/50',    // Semi-transparent card background
  },
  text: {
    primary: 'slate-50',     // #F8FAFC - Primary text
    secondary: 'slate-300',  // #CBD5E1 - Secondary text
    tertiary: 'slate-400',   // #94A3B8 - Tertiary text
    muted: 'slate-500',      // #64748B - Muted text
  },
  border: {
    primary: 'slate-700',    // #334155 - Primary border
    secondary: 'slate-600',  // #475569 - Secondary border
    accent: 'slate-500',     // #64748B - Accent border
  }
};

// Export type for TypeScript support
export type DesignTokens = typeof designTokens;
export type DarkModeColors = typeof darkModeColors;
