const { secondary } = require("daisyui/src/colors");

module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FD2D01",
        secondary: "#FFD7D7",
        tertiary: "#4E5166",
      }
    },
    container: {
      center: true
    }
  },
  plugins: [require("daisyui")],
}

// Primaire : #FD2D01
// ● Secondaire : #FFD7D7
// ● Tertiaire : #4E5166