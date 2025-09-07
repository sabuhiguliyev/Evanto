/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      // Minimal customizations - use Tailwind defaults first
      colors: {
        // Industry standard - 5 colors only
        primary: '#5D9BFC', // Primary brand color
        secondary: '#1C2039', // Dark gray/blue
        neutral: {
          light: '#F3F4F6', // Light gray background
          dark: '#666666', // Medium gray text
        },
        text: {
          primary: '#000000', // Black for headlines
          secondary: '#888888', // Gray for paragraphs
          muted: '#AAAAAA', // Light gray for hints
          label: '#666666', // Dark gray for labels
        },
        // Dark mode colors
        dark: {
          bg: '#1C2039', // Dark background (from design)
          paper: '#1C2039', // Same as background (no separate card backgrounds)
          text: {
            primary: '#FFFFFF', // White text
            secondary: '#B0B0B0', // Light gray text
            muted: '#808080', // Muted text
          },
          border: '#333333', // Dark borders
        },
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'candal': ['Candal', 'Poppins', 'sans-serif'],
        'jakarta': ['Plus Jakarta Sans', 'Poppins', 'sans-serif'],
      },
      fontSize: {
        'h1': ['36px', '44px'],
        'h2': ['28px', '36px'],
        'h3': ['22px', '28px'],
        'h4': ['18px', '24px'],
        'h5': ['16px', '22px'],
        'h6': ['14px', '20px'],
        'body': ['16px', '24px'],
        'body-sm': ['14px', '20px'],
        'caption': ['12px', '16px'],
      },
      // Component-specific utilities based on Figma design
      borderRadius: {
        'card': '8px',
        'button': '8px',
        'input': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'button': 'none',
      },
      borderWidth: {
        'card': '1px',
        'button': '1px',
      },
      // Button sizes from Figma specs
      width: {
        'button-primary': '335px',
        'button-icon': '44px',
        'button-social': '80px',
      },
      height: {
        'button-primary': '50px',
        'button-icon': '44px',
        'button-social': '35px',
        'nav-bar': '90px',
        'nav-center': '62px',
      },
      borderRadius: {
        'button-primary': '30px',
        'button-secondary': '50px',
        'button-icon': '50px',
      },
    },
  },
  plugins: [
    // Add custom component classes
    function({ addComponents }) {
      addComponents({
        // Header navigation patterns - using built-in Tailwind utilities
        '.header-nav-2-icons': {
          '@apply mb-8 flex w-full items-center justify-between': {},
        },
        '.header-nav-1-icon': {
          '@apply mb-6 flex w-full items-center gap-4': {},
        },
        // Form patterns - using built-in spacing
        '.auth-form': {
          '@apply flex flex-col space-y-4': {},
        },
        '.auth-container': {
          '@apply flex flex-col space-y-6': {},
        },
        // Button patterns - using built-in sizes closest to Figma specs
        '.btn-icon-nav': {
          '@apply text-text-muted border border-gray-200': {},
        },
      })
    }
  ],
};