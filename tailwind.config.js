/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
  daisyui: {
    // themes: ["autumn"],
    themes: [
      {
        mytheme: {
          "primary": "#B8D8D8",
          "secondary": "#91A6FF", 
          "accent": "#EF9A9A", 
          "neutral": "#F3E9D2", 
          "base-100": "#5E574D", 
          "info": "#7EC8E3", 
          "success": "#76B041", 
          "warning": "#EBC85E", 
          "error": "#D56161",
        },
      }
    ],
  },
  plugins: [require("daisyui")],
}

