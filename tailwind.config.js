/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'disaster-red': '#ff1a1a',
        'disaster-dark': '#0d0d0d',
        'disaster-gray': '#1a1a1a',
        'disaster-light-gray': '#2a2a2a',
      },
      fontFamily: {
        'futuristic': ['Orbitron', 'Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-red': 'pulse-red 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-red': {
          '0%, 100%': {
            opacity: 1,
            boxShadow: '0 0 20px #ff1a1a',
          },
          '50%': {
            opacity: 0.5,
            boxShadow: '0 0 40px #ff1a1a',
          },
        },
        'glow': {
          'from': {
            textShadow: '0 0 8px #ff1a1a, 0 0 12px #ff1a1a',
          },
          'to': {
            textShadow: '0 0 4px #ff1a1a, 0 0 8px #ff1a1a',
          },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
