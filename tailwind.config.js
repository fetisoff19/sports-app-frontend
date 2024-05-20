/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
    darkMode: 'class',
    content: ['./src/**/*.{tsx,ts,jsx,js}'],
    theme: {
        extend: {
            dropShadow: {
                'xl': '0 0 0.5px rgba(255, 255, 255, 1)',
                '4xl': [
                    '0 35px 35px rgba(0, 0, 0, 0.25)',
                    '0 45px 65px rgba(0, 0, 0, 0.15)'
                ]
            }
        },
    },
    plugins: [
        daisyui
    ],
    daisyui: {
        themes: ["dark"],
    },
}

