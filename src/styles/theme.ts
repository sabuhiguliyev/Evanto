import { createTheme } from '@mui/material/styles';
import colors from './colors';

const theme = createTheme({
    palette: {
        primary: { main: colors.primaryMain, light: colors.primaryLight, dark: colors.primaryDark },
        secondary: { main: colors.secondaryMain, light: colors.secondaryLight },
        background: { default: colors.backgroundDefault, paper: colors.backgroundPaper },
        text: { primary: colors.textPrimary, secondary: colors.textSecondary },
    },
    typography: {
        fontFamily: '"Plus Jakarta Sans", "Poppins", sans-serif',
        h1: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700, // Bold
            fontSize: '30px', // H1 size
        },
        h2: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 600, // SemiBold
            fontSize: '25px', // H2 size
        },
        h3: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
            fontSize: '20px',
        },
        h4: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
            fontSize: '17px',
        },
        h5: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 600,
            fontSize: '15px',
        },
        h6: {
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 700, // Bold
            fontSize: '13px',
        },
        body1: {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500, // Medium
            fontSize: '14px', // Body text size
        },
        body2: {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: '13px',
        },
        caption: {
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 500,
            fontSize: '12px', // Small text size
        },
    },
});

export default theme;
