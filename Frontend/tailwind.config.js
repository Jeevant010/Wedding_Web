/** @type {import('tailwindcss').Config} */
// import lineClamp from '@tailwindcss/line-clamp';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff4757',
        'primary-hover': '#ff3742',
        'primary-dark': '#e63946',
      },
      fontFamily: {
        // 'serif': ['Georgia', 'serif'],
        'sans': ['Arial', 'sans-serif'],
        'serif': ['Playfair Display', 'serif'],
        'cursive': ['Pacifico', 'cursive'],
        'dancing': ['Dancing Script', 'cursive'],
        'playfair': ['Playfair Display', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'lora': ['Lora', 'serif'],
      },
      spacing: {
        '15': '3.75rem',
        '30': '7.5rem',
        '50': '12.5rem',
      },
      width: {
        '15': '3.75rem',
        '30': '7.5rem',
        '50': '12.5rem',
      },
      height: {
        '15': '3.75rem',
        '30': '7.5rem',
      },
      inset: {
        '50': '12.5rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundImage: {
        'gradient-to-br': 'linear-gradient(to bottom right, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      boxShadow: {
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [
    // lineClamp,
  ],
}
