/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "media", // or "class" if you manually toggle
  theme: {
    extend: {
      colors: {
        primary: { light: "#1B2A41", dark: "#0B1120" },
        background: {
          light: "#FFFFFF",
          dark: "#0F172A",
        },
        card: {
          light: "#F8FAFC",
          dark: "#1E2638",
        },
        border: {
          light: "#E2E8F0",
          dark: "#2D3748",
        },
        textPrimary: {
          light: "#0F172A",
          dark: "#F1F5F9",
        },
        textSecondary: {
          light: "#475569",
          dark: "#94A3B8",
        },
        theme: {
          light: "#2563EB",
          dark: "#3B82F6",
        },
      }
    },
  },
  plugins: [],
}