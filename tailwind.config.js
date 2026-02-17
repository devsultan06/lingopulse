/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "blue-violet": "#6E61FF",
        "tangelo-orange": "#FF611E",
        "dark-space": "#29314D",
        "lagoon-blue": "#60AEFE",
        "soft-orange": "#FFA352",
        "azure-green": "#DAC3FF",
        "daisy-white": "#F1F6F1",
        "hickory-brown": "#632214",
        "paled-blue": "#ADDEFE",
        "mellow-yellow": "#FFDFA8",
        "seafoam-green": "#99D9B3",
        "blue-rose": "#312A73",
      },
      fontFamily: {
        "space-grotesk": ['"Space Grotesk"', "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
      },
      boxShadow: {
        neubrutalism: "4px 4px 0px 0px #000",
      },
      animation: {
        "spin-slow": "spin 10s linear infinite",
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
