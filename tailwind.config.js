/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pucp: {
          dark: '#031944',
          navy: '#002B66',
          blue: '#0F4C81',
          accent: '#FFC82C', // Yellow accent from Figma login button
          yellow: '#F5BE15',
          lightBg: '#F3F4F6',
          cardBg: '#FFFFFF',
          textDark: '#1E293B',
          textMuted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
