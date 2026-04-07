/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5E5E5E"
      },

      gridTemplateColumns:{
        auto:'repeat(auto-fill,minmax(200px,1fr))'
      },

      // 👇 هذا المهم
      borderColor: {
        DEFAULT: '#d1d5db', // gray-300
      }

    },
  },
  plugins: [],
}