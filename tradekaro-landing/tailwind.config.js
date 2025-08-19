/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        // Modern & Vibrant Color Palette
        'primary': '#6366F1', // Indigo
        'primary-light': '#818CF8',
        'primary-dark': '#4F46E5',
        'secondary': '#EC4899', // Pink
        'secondary-light': '#F9A8D4',
        'accent': '#10B981', // Emerald
        'accent-light': '#6EE7B7',
        'warning': '#F59E0B', // Amber
        'warning-light': '#FBBF24',
        
        // Modern Grays
        'dark': '#0F172A', // Slate 900
        'dark-light': '#1E293B', // Slate 800
        'gray-custom': '#475569', // Slate 600
        'gray-light': '#F1F5F9', // Slate 100
        
        // Trading Colors
        'success': '#22C55E', // Green 500
        'danger': '#EF4444', // Red 500
        'neutral': '#64748B', // Slate 500
      },
      backgroundImage: {
        'primary-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'secondary-gradient': 'linear-gradient(135deg, #EC4899 0%, #D946EF 100%)',
        'accent-gradient': 'linear-gradient(135deg, #10B981 0%, #2DD4BF 100%)',
        'warning-gradient': 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'hero-gradient': 'linear-gradient(135deg, #4F46E5 0%, #EC4899 50%, #F59E0B 100%)',
      },
      animation: {
        'slideInRight': 'slideInRight 0.6s ease-out',
        'scaleIn': 'scaleIn 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
        'bounce-soft': 'bounce-soft 2s infinite',
        'rotate-slow': 'rotate-slow 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateX(5px) rotate(1deg)' },
        },
        'pulse-soft': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'rotate-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'premium': '0 20px 25px -5px rgba(37, 99, 235, 0.1), 0 10px 10px -5px rgba(37, 99, 235, 0.04)',
        'premium-lg': '0 25px 50px -12px rgba(37, 99, 235, 0.25)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.3)',
        'glow-lg': '0 0 40px rgba(37, 99, 235, 0.4)',
        'success': '0 10px 25px rgba(5, 150, 105, 0.2)',
        'warning': '0 10px 25px rgba(217, 119, 6, 0.2)',
      },
    },
  },
  plugins: [],
}
