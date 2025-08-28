/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'custom': ['HankenGrotesk', 'sans'], // 'custom' is the name you'll use in your utility classes
      },
      textColor: {
        'subtitle': '#4080BF',
        'bigtitle': '#202E3C',
        'background': '#F9FAFA',
        'link': '4080BF'
        // Add as many custom colors as you need
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(2rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        scaleIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)'
          }
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-1rem)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      }
    },

    screens: {
      xxs: "320px",
      xs: "360px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
}