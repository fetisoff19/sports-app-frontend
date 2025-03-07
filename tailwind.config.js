/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import config from 'tailwindcss/defaultTheme'

export default {
  darkMode: 'class',
  content: ['./src/**/*.{tsx,ts,jsx,js}'],
  theme: {
    extend: {
      dropShadow: {
        'xl': '0 0 0.5px rgba(255, 255, 255, 1)',
      },
      fontFamily: {
        logo: ['Russo One', ...config.fontFamily.sans]
      }
    },
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: [
      'dark',
      {
        dark: {
          ...import('daisyui/src/theming/themes')['dark'],
          'success': '#4ADE80FF',
          'neutral': '#35363A',
          'base-100': '#1c1c1e',
          secondary: '#29292c',
          'error': '#D93036',
          '.btn:hover': {
            'background-color': '#29292c',
          },
          '.btn-success:hover': {
            'background-color': '#71ff96',
          },
          '.btn-error:hover': {
            'background-color': '#F25358',
          },
        },
      },
    ],
  },
}

