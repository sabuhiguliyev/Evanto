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
                    fontSize: '15px',
                    fontWeight: '700',
                    height: '50px',
                    color: 'white',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: 'none',
                    },
                },
                outlined: {
                    width: '100%',
                    height: '40px',
                    padding: '8px',
                    backgroundColor: 'white',
                    borderColor: '#E8E8E8',
                    '&:hover': {
                        borderColor: '#CFCFCF', // Slightly darker on hover
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#5D9BFC', // Ensures icons remain blue
                    },
                },
            },
        },

        MuiTypography: {
            styleOverrides: {
                h1: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '30px',
                    fontWeight: '700',
                },

                h2: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '25px',
                    fontWeight: '600',
                },
                h3: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '20px',
                    fontWeight: '600',
                },
                h4: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '17px',
                    fontWeight: '600',
                },
                h5: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '15px',
                    fontWeight: '600',
                },
                h6: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '13px',
                    fontWeight: 'bold',
                },

                // Body typography overrides
                body1: {
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: '500',
                },
                body2: {
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '13px',
                    fontWeight: '400',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    fontFamily: 'Plus Jakarta Sans',
                    color: '#5D9BFC',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                    },
                },
            },
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    width: '100%',

                    '& .MuiDivider-wrapper': {
                        color: '#AAAAAA',
                        fontSize: '13px',
                        fontWeight: '400',
                        fontFamily: 'Poppins',
                    },
                },
            },
        },
    },
});

export default theme;
