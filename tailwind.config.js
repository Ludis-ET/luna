/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    { pattern: /^(text|bg|border|ring|from|via|to|hover:text|hover:bg|hover:border)-(plum|gold|creamCard)(\/\d+)?$/ },
    'text-body-lg',
  ],
  theme: {
    extend: {
      colors: {
        brand:    '#7B2D9E',
        plum:     '#2E1447',
        gold:     '#C5A880',
        cream:    '#FAF6EE',
        creamCard:'#FAF7F2',
        lavender: '#C8A8E9',
        charcoal: '#2D2D2D',
        glow:     '#FFB84D',
        magenta:  '#D10056',
      },
      fontSize: {
        body: ['1rem', { lineHeight: '1.65' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.65' }],
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        outfit: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
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
