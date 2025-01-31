import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
        scaleUp: 'scaleUp 0.5s ease-in-out',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(0)', opacity: 0 },
          '60%': { transform: 'scale(1.1)', opacity: 0.7 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },        
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui:{
    themes:["light", "dark", "bumblebee", "synthwave", "acid", "valentine", "halloween", "winter"],
  }
}