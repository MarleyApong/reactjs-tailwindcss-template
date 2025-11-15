module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7c3aed",
        muted: "#f3f4f6",
        "card-bg": "#ffffffcc",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.06)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.6)",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      backgroundImage: {
        noise: "radial-gradient(rgba(0,0,0,0.02) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}
