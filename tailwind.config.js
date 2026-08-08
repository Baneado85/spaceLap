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
          // Celeste vidrio (glass) accents layered on top of the existing navy brand
          skyLight: '#CFF3FF',
          sky: '#6FD3FF',
          skyDeep: '#1E8FCE',
        }
      },
      backgroundImage: {
        'glass-sky': 'linear-gradient(135deg, rgba(111,211,255,0.32) 0%, rgba(30,143,206,0.18) 45%, rgba(2,25,68,0.28) 100%)',
        'glass-sky-soft': 'linear-gradient(135deg, rgba(207,243,255,0.55) 0%, rgba(111,211,255,0.22) 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Outfit', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
