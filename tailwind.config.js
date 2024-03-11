/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",],
  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#00b0ff",
        
"secondary": "#ff7a00",
        
"accent": "#72e200",
        
"neutral": "#020511",
        
"base-100": "#292929",
        
"info": "#00a4ff",
        
"success": "#00f795",
        
"warning": "#d40500",
        
"error": "#ff9da8",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}

