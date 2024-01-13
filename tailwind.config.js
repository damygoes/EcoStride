/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/stories/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.stories.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "rgba(var(--primary))", // sky blue
      secondary: "rgba(var(--secondary))", // forest green
      accent: "rgba(var(--accent))", // sunset orange
      background: "rgba(var(--background))", // light gray
      white: "rgba(var(--white))", // white
      "text-color": "rgba(var(--text-color))", // black
      transparent: "transparent",
    },
    fontFamily: {
      sans: ["Source Sans Pro", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"],
  },
  plugins: ["prettier-plugin-tailwindcss", "@tailwindcss/forms"],
};
