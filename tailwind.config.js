/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      backgroundImage: () => ({
        "radial-gradient-dark-to-dark":"radial-gradient(circle, rgba(92,92,92,1) 0%, rgba(34,34,34,1) 100%)",
        'gradient-radial-circle-from-tl':
          'radial-gradient(circle at 0% 0%, #67e8f9,#dc2626)',
        'gradient-radial-circle-from-cc-primary':
          'radial-gradient(circle at 50% 50%, #dc2626,#991b1b)',
        'gradient-radial-circle-from-cc-accent':
          'radial-gradient(circle at 50% 50%, #67e8f9,#22d3ee)',
        'gradient-radial-circle-from-cc-admin':
          'radial-gradient(circle at 50% 50%, rgb(74,222,128),rgb(22,163,74))',
        'gradient-radial-circle-from-cc-dedicated':
          'radial-gradient(circle at 50% 50%, #22d3ee 30%,#991b1b 90%)',
        'drop-water': 'url(./images/barrier/bg_11.webp)',
      }),
      gridTemplateColumns: {
        '1-200': '1fr 200px',
        '1-300': '1fr 300px',
        '1-320': '1fr 320px',
        '1-360': '1fr 360px',
        '3-300': 'repeat(3,minmax(0,300px))',
        '5-300': 'repeat(5,minmax(0,300px))',
        '6-300': 'repeat(6,minmax(0,300px))',
        '2-300': 'repeat(2,minmax(0,300px))',
      },
      animation: {
        'slide-left':
          'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-right':
          'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'slide-top':
          'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        indicator:
          'indicator 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        producent:
          'producent 0.8s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        przemyslowych:
          'przemyslowych 1.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        pralniczych:
          'pralniczych 1.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'laundry-from-right':
          'laundry-from-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'laundry-from-left':
          'laundry-from-left 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'sparepart-from-right':
          'sparepart-from-right 1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
      },
      keyframes: {
        'sparepart-from-right': {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'laundry-from-right': {
          '0%': {
            transform: 'translateX(400%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'laundry-from-left': {
          '0%': {
            transform: 'translateX(-400%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        producent: {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
        przemyslowych: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        pralniczych: {
          '0%': {
            transform: 'translateX(-200%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-right': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
        'slide-left': {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
        'slide-top': {
          '0%': {
            transform: 'translateY(100%)',
          },
          '100%': {
            transform: 'translateY(0px)',
          },
        },
        indicator: {
          '0%': { width: '0px' },
          '100%': { width: '100%' },
        },
      },
      colors: {
        primary: {
          DEFAULT: '#dc2626',
          light: '#ef4444',
          dark: '#991b1b',
        },
        accent: {
          DEFAULT: '#67e8f9',
          light: '#a5f3fc',
          dark: '#22d3ee',
        },
        black: {
          light: '#475569',
          dark: '#111827',
        },
        admin: {
          DEFAULT: 'rgb(74,222,128)',
          light: 'rgb(187,227,208)',
          dark: 'rgb(22,163,74)',
        },
      },
    },

    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
