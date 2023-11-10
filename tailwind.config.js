/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,ts,js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#ec4899',
                secondary: '#eab308',
                tertiary: 'rgb(236,72,153,0.5)',
                dark: '#000',
                light: '#fff',
                'gray-500': '#97989f',
                'gray-light': '#e7ecf3',
                'gray-dark': '#232d32'
            },
            backgroundImage: {}
        }
    },
    plugins: [require('@tailwindcss/line-clamp')]
}
