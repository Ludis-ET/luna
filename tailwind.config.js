/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand:    '#7B2D9E',
        cream:    '#FAF6EE',
        lavender: '#C8A8E9',
        charcoal: '#2D2D2D',
        glow:     '#FFB84D',
        magenta:  '#D10056',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(255, 184, 77, 0.35)',
        brand: '0 0 24px rgba(123, 45, 158, 0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 16px rgba(123, 45, 158, 0.3)' },
          '50%': { boxShadow: '0 0 32px rgba(123, 45, 158, 0.55)' },
        },
      },
    },
  },
  plugins: [],
}
