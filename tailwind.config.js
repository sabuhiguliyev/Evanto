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
                h1: '3rem', // 30px = 3rem
                h2: '2.5rem', // 25px = 2.5rem
                h3: '2rem', // 20px = 2rem
                h4: '1.7rem', // 17px = 1.7rem
                h5: '1.5rem', // 15px = 1.5rem
                h6: '1.3rem', // 13px = 1.3rem
                body: '1.4rem', // 14px = 1.4rem (default body text size)
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
            width: {
                375: '37.5rem', // Define custom width
            },
            margin: {
                '2rem': '2rem', // Create a custom margin value for 2rem
            },
            borderRadius: {
                xl: '1.2rem', // 12px = 1.2rem
            },
        },
    },
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
