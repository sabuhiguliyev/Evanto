/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                header: ['"Plus Jakarta Sans"', 'sans-serif'],
                body: ['Poppins', 'sans-serif'],
            },
            fontSize: {
                h1: '30px',
                h2: '25px',
                h3: '20px',
                h4: '17px',
                h5: '15px',
                h6: '13px',
                body: '14px',
            },
            colors: {
                primary: {
                    1: '#5D9BFC',
                    2: '#7BADFB',
                    3: '#8BB7FA',
                    4: '#A9C8F8',
                    5: '#B8D1F8',
                    6: '#CFDFF7',
                },
                secondary: {
                    1: '#1C2039',
                    2: '#474B5F',
                    3: '#5E6072',
                    4: '#888A97',
                    5: '#9EA0AA',
                    6: '#BFC0C6',
                },
                text: {
                    black: '#000000',
                    white: '#FFFFFF',
                    gray1: '#666666',
                    gray2: '#888888',
                    gray3: '#AAAAAA',
                },
            },
        },
    },
    plugins: [],
    corePlugins: {},
};
