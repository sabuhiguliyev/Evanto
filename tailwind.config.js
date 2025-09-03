/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
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
  plugins: [],
};