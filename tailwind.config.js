/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
            },
            flex: {
                1: '1 1 0%',
                2: '2 2 0%',
                3: '3 3 0%',
                4: '4 4 0%',
                8: '8 8 0%'
            },
            color: {
                colors: {
                    primary: '#5542F6',
                    highlight: '#eae8fb',
                    bgGray: '#fbfafd'
                }
            }
        }
    },
    plugins: []
};
