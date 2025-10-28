/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        gcGreen: "#0f9d58",
        gcBlue: "#4285F4",
        gcYellow: "#F4B400",
        gcRed: "#EA4335",
        glassBg: "rgba(0,0,0,0.55)"
      },
      fontFamily: {
        pop: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.6)"
      }
    }
  },
  plugins: []
};
