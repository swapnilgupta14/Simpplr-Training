/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        "weatherImage": "url('./public/background.jpg')",
      },
    },
  },
  plugins: [],
};
