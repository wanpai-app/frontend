export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      keyframes: {
        floatX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(12px)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        floatX: 'floatX 4s ease-in-out infinite',
        fadeIn: 'fadeIn 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}
