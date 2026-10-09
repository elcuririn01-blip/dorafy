/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sage: {
          50: '#f4f7f4',
          100: '#e5ece5',
          200: '#cedece',
          300: '#adc6af',
          400: '#84a886',
          500: '#5f8763',
          600: '#4c6e50',
          700: '#3e5842',
          800: '#344737',
          900: '#2c3c2f',
          950: '#152117',
        },
        sand: {
          50: '#fcfbfa',
          100: '#f7f4f0',
          200: '#efe8df',
          300: '#e2d5c4',
          400: '#ceb89f',
          500: '#ba9b7a',
          600: '#a78564',
          700: '#8b6c50',
          800: '#715843',
          900: '#5e4939',
        },
        dorafy: {
          lightBg: '#FAF9F6',
          lightCard: '#FFFFFF',
          lightBorder: '#ECEAE4',
          lightMuted: '#71717A',
          darkBg: '#121413',
          darkCard: '#1A1D1B',
          darkBorder: '#272C29',
          darkElevated: '#222724',
          darkMuted: '#9BA39D'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 12px -2px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        'soft-lg': '0 10px 25px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -2px rgba(0, 0, 0, 0.04)',
        'dark-soft': '0 4px 20px -2px rgba(0, 0, 0, 0.45)',
      }
    },
  },
  plugins: [],
}
