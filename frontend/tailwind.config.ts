import type { Config } from "tailwindcss";

interface UtilitiesFunction {
  (utilities: any): void; // Adjust the type according to what it actually accepts
}

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#f6f2f2',
      },
      fontFamily: {
        'cheese': ['Cheese Matcha', 'sans-serif'] // Use a fallback font
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  variants:{
    extend:{
      scrollbarWidth: ['responsive', 'hover'],
      scrollbarColor: ['responsive', 'hover'],
    }
  },
  plugins: [
    function addUtilities({addUtilities }:{addUtilities:UtilitiesFunction}) {
      const newUtilities = {
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgb(31, 29, 29) white',
        },
        '.scrollbar-webkit': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'white',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'rgb(31, 29, 29)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: 'rgb(20, 20, 20)',
          }
        }
      };
    
      addUtilities(newUtilities); // Assuming the function accepts a second parameter for variants
    }
  ],
};
export default config;
