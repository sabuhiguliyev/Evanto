import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        // Header fonts (Already added)
        fontFamily: 'Plus Jakarta Sans', // Default font for headers

        // Header typography overrides
        h1: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '30px',
            fontWeight: 'bold',
        },
        h2: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '25px',
            fontWeight: '600', // SamiBold
        },
        h3: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '20px',
            fontWeight: '600', // SamiBold
        },
        h4: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '17px',
            fontWeight: '600', // SamiBold
        },
        h5: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '15px',
            fontWeight: '600', // SamiBold
        },
        h6: {
            fontFamily: 'Plus Jakarta Sans',
            fontSize: '13px',
            fontWeight: 'bold',
        },

        // Body fonts (added below)
        body1: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: '500', // Medium
        },
        body2: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px',
            fontWeight: '500', // Medium
        },
    },
    components: {
        MuiContainer: {
            defaultProps: {
                sx: {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    gap: '15px',
                    width: '375px',
                    height: '812px',
                    paddingX: '20px',
                    paddingY: '35px',
                    marginX: 0,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '30px',
                    backgroundColor: '#5D9BFC',
                    textTransform: 'none',
                },
                contained: {
                    width: '100%',
                    fontSize: '14px',
                    fontWeight: '600',
                    height: '50px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
            },
        },

        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '30px',
                    fontWeight: '700', // Explicit '700' for bold weight
                    color: '#1C2039',
                    lineHeight: '120%', // This ensures line height is set to 120%
                },

                h2: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '25px',
                    fontWeight: '600', // SamiBold
                },
                h3: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '20px',
                    fontWeight: '600', // SamiBold
                },
                h4: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '17px',
                    fontWeight: '600', // SamiBold
                },
                h5: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '15px',
                    fontWeight: '600', // SamiBold
                },
                h6: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                },

                // Body typography overrides
                body1: {
                    // `body1` is commonly used for paragraph text
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '500', // Normal weight
                    color: '#AAA', // Optional: Add color for the text, default black
                },
                body2: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontWeight: '400', // Medium
                    color: '#AAA', // Optional: Add color for the text, default black
                },
            },
        },
    },
});

export default theme;
