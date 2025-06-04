import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
                contained: {
                    width: '100%',
                    height: '50px',
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: 'white',
                    backgroundColor: '#5D9BFC',

                    borderRadius: '30px',

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
                    borderRadius: '30px',

                    borderColor: '#E8E8E8',
                    '&:hover': {
                        borderColor: '#CFCFCF',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#5D9BFC',
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
                    fontWeight: '700',
                },
                h5: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '15px',
                    fontWeight: '700',
                },
                h6: {
                    fontFamily: 'Plus Jakarta Sans',
                    fontSize: '13px',
                    fontWeight: '700',
                    lineHeight: '1.5',
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
