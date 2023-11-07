/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{tsx,ts,js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#ec4899',
                secondary: '#eab308',
                'gray-light': '#e7ecf3',
                'gray-dark': '#232d32'
            },
            backgroundImage: {}
        }
        // spacing: {
        //     header: '80px'
        // }
    },
    plugins: []
}
