/** @type {import('tailwindcss').Config} */
import { colors, spacing, typography, borderRadius, shadows, componentSizes, zIndex, breakpoints } from './src/styles/design-system';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            // Design System Integration
            colors: {
                ...colors,
                // Legacy support
                'primary-1': colors.primary[500],
                'primary-2': colors.primary[400],
                'primary-3': colors.primary[300],
                'primary-4': colors.primary[200],
                'primary-5': colors.primary[100],
                'primary-6': colors.primary[50],
            },
            
            spacing: {
                ...spacing,
            },
            
            fontSize: {
                ...typography.fontSize,
            },
            
            fontWeight: {
                ...typography.fontWeight,
            },
            
            lineHeight: {
                ...typography.lineHeight,
            },
            
            borderRadius: {
                ...borderRadius,
            },
            
            boxShadow: {
                ...shadows,
            },
            
            zIndex: {
                ...zIndex,
            },
            
            screens: {
                ...breakpoints,
            },
            
            // Component-specific sizes
            height: {
                ...componentSizes.button,
                ...componentSizes.input,
            },
            
            width: {
                ...componentSizes.container,
            },
            
            // Font families
            fontFamily: {
                primary: typography.fontFamily.primary,
                secondary: typography.fontFamily.secondary,
                // Legacy support
                header: typography.fontFamily.primary,
                body: typography.fontFamily.secondary,
            },
        },
    },
    plugins: [],
    corePlugins: {},
    exclude: ['node_modules', 'tailwind.config.js'],
};
