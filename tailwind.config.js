/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        "gold-light": "#E8C94A",
        "gold-dim": "#B8962E",
        navy: "#1E3A8A",
        "navy-light": "#2548A8",
        "navy-deep": "#152C6B",
        "bg-deep": "#0A0A0A",
        "bg-surface": "#0F0F0F",
        "bg-card": "#141414",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 60px rgba(212,175,55,0.08)",
        "gold-lg": "0 0 100px rgba(212,175,55,0.15)",
        card: "0 8px 32px rgba(0,0,0,0.4)",
        phone: "0 25px 60px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #E8C94A, #D4AF37, #B8962E)",
        "navy-gradient": "linear-gradient(135deg, #1E3A8A, #152C6B)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s infinite",
        "glow-pulse": "glow-pulse 3s infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
