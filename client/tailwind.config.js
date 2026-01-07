export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eef2ff', // Softest background
          100: '#e0e7ff', // Lighter background
          200: '#c7d2fe', // Borders / Accents
          300: '#a5b4fc', // Secondary text
          400: '#818cf8', // Icons
          500: '#6366f1', // Brand Base (Trust & Creativity)
          600: '#4f46e5', // Brand Strong (Action)
          700: '#4338ca', // Deep Brand
          800: '#3730a3', // Text / Contrast
          900: '#312e81', // Darkest
          950: '#1e1b4b', // Deepest Navy
        },
        secondary: {
          50: '#ecfdf5', // Mint background (Success/Growth)
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Base Emerald
          600: '#059669', // Text Success
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
        },
        surface: {
          50: '#f8fafc', // Cool Slate background (Reduces eye strain)
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          900: '#0f172a', // Dark mode surface
        },
      },
    },
  },
  plugins: [],
};
