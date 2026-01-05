/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "#F9F9F8", // Notion-like warm gray background
        surface: "#FFFFFF",    // White surface
        foreground: "#37352F", // Notion-like dark gray text
        muted: "#9B9A97",      // Muted text
        border: "#E0E0E0",     // Subtle border
        primary: {
          DEFAULT: "#2C2C2C",  // Deep charcoal for primary actions
          hover: "#454545",
          light: "#F0F0EF",    // For backgrounds/hover states
        },
        accent: "#E16259",     // A subtle accent (like Notion red) or stick to the orange if preferred, but let's go neutral+accent
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['"Noto Serif SC"', 'ui-serif', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        zixin: ['ZiXinFangMingKeBen', 'serif'],
        zixinGuJi: ['ZiXinFangMingKeBenGuJiBan', 'serif'],
        oradano: ['OradanoMingChaoTi', 'serif'],
      },
      boxShadow: {
        'card': '0 8px 30px rgba(0, 0, 0, 0.08)', // Soft, diffused shadow
        'card-hover': '0 20px 40px rgba(0, 0, 0, 0.12)',
        'panel': '0 0 0 1px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.05)',
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
      }
    },
  },
  plugins: [],
};
