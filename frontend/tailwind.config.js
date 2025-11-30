/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0f172a',
        accent: '#3b82f6',
        muted: '#e2e8f0'
      }
    }
  },
  plugins: []
};
