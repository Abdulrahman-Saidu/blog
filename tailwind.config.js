/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Adjust paths as needed
    theme: {
      extend: {
        colors: {
          darkblue: "#0C2A3D",
          lightblue: "#289EDA",
          green: "#16CA9F",
          red: "#ED5B52",
        },
      },
    },
    plugins: [require('tailwind-scrollbar-hide')],
  };
  