/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'code': "url('/src/assets/logo/logo.png')",
        'light-code': "url('/src/assets/logo/logo-2.png')",
       })
    },
  },
  plugins: [require("daisyui")],
}

