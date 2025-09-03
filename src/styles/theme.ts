import { createTheme } from '@mui/material/styles';
import { colors, spacing, typography, borderRadius, componentSizes } from './design-system';

const theme = createTheme({
    palette: {
        primary: {
            main: colors.primary[500],
            light: colors.primary[300],
            dark: colors.primary[700],
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: colors.neutral[600],
            light: colors.neutral[400],
            dark: colors.neutral[800],
            contrastText: '#FFFFFF',
        },
        background: {
            default: colors.background.primary,
            paper: colors.background.secondary,
        },
        text: {
            primary: colors.neutral[800],
            secondary: colors.neutral[600],
        },
        error: {
            main: colors.error,
        },
        warning: {
            main: colors.warning,
        },
        info: {
            main: colors.info,
        },
        success: {
            main: colors.success,
        },
    },
    
    typography: {
        fontFamily: typography.fontFamily.primary,
        h1: {
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['3xl'],
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.tight,
        },
        h2: {
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.semibold,
            lineHeight: typography.lineHeight.tight,
        },
        h3: {
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.semibold,
            lineHeight: typography.lineHeight.normal,
        },
        h4: {
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.normal,
        },
        h5: {
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.normal,
        },
        h6: {
            fontFamily: typography.fontFamily.primary,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.bold,
            lineHeight: typography.lineHeight.normal,
        },
        body1: {
            fontFamily: typography.fontFamily.secondary,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
            lineHeight: typography.lineHeight.normal,
        },
        body2: {
            fontFamily: typography.fontFamily.secondary,
            fontSize: typography.fontSize.xs,
            fontWeight: typography.fontWeight.normal,
            lineHeight: typography.lineHeight.normal,
        },
    },
    
    spacing: 8, // 8px base unit
    
    shape: {
        borderRadius: parseInt(borderRadius.md),
    },
    
    components: {
        MuiContainer: {
            defaultProps: {
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.background.primary,
                    gap: spacing[3], // 12px
                    width: componentSizes.container.mobile,
                    height: '100vh',
                    paddingX: spacing[5], // 20px
                    paddingY: spacing[8], // 32px
                    marginX: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                contained: {
                    width: '100%',
                    height: componentSizes.button.lg,
                    fontFamily: typography.fontFamily.primary,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.background.primary,
                    backgroundColor: colors.primary[500],
                    borderRadius: borderRadius.full,
                    boxShadow: 'none',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: colors.primary[600],
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    width: '100%',
                    height: componentSizes.button.lg,
                    padding: spacing[2],
                    backgroundColor: colors.background.primary,
                    borderRadius: borderRadius.full,
                    borderColor: colors.border.light,
                    textTransform: 'none',
                    '&:hover': {
                        borderColor: colors.border.medium,
                        backgroundColor: colors.background.secondary,
                    },
                    '& .MuiSvgIcon-root': {
                        color: colors.primary[500],
                    },
                },
            },
        },

        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: typography.fontFamily.primary,
                    color: colors.primary[500],
                    textDecoration: 'none',
                    '&:hover': {
                        color: colors.primary[600],
                        textDecoration: 'underline',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    width: '100%',
                    borderColor: colors.border.light,
                    '& .MuiDivider-wrapper': {
                        color: colors.neutral[400],
                        fontSize: typography.fontSize.xs,
                        fontWeight: typography.fontWeight.normal,
                        fontFamily: typography.fontFamily.secondary,
                    },
                },
            },
        },
    },
});

export default theme;
