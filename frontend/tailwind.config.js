// export default {
//   darkMode: 'class', // ← Essential for manual theme toggling
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }


// tailwind.config.js (ESM format)
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}