/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                header: ['"Plus Jakarta Sans"', 'sans-serif'],
                body: ['Poppins', 'sans-serif'],
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
                    1: '#666666',
                    2: '#888888',
                    3: '#AAAAAA',
                    4: '#BBBBBB',
                    5: '#EEEEEE',
                },
            },
        },
    },
    plugins: [],
    corePlugins: {},
};
