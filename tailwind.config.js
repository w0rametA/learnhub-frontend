/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        16: 'repeat(auto-fill,minmax(280px,1fr))',
      },
    },
  },
  plugins: [],
}
