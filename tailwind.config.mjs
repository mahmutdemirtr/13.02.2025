/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)" /* Directly use the color variable */,
        foreground: "var(--foreground)" /* Directly use the color variable */,
        card: {
          DEFAULT: "var(--card)" /* Directly use the color variable */,
          foreground:
            "var(--card-foreground)" /* Directly use the color variable */,
        },
        popover: {
          DEFAULT: "var(--popover)" /* Directly use the color variable */,
          foreground:
            "var(--popover-foreground)" /* Directly use the color variable */,
        },
        primary: {
          DEFAULT: "var(--primary)" /* Directly use the color variable */,
          foreground:
            "var(--primary-foreground)" /* Directly use the color variable */,
        },
        'primary-light': '#9E7CB5',
        'primary-dark': '#251033',
        secondary: {
          DEFAULT: "var(--secondary)" /* Directly use the color variable */,
          foreground:
            "var(--secondary-foreground)" /* Directly use the color variable */,
        },
        muted: {
          DEFAULT: "var(--muted)" /* Directly use the color variable */,
          foreground:
            "var(--muted-foreground)" /* Directly use the color variable */,
        },
        accent: {
          DEFAULT: "var(--accent)" /* Directly use the color variable */,
          foreground:
            "var(--accent-foreground)" /* Directly use the color variable */,
        },
        destructive: {
          DEFAULT: "var(--destructive)" /* Directly use the color variable */,
          foreground:
            "var(--destructive-foreground)" /* Directly use the color variable */,
        },
        border: "var(--border)" /* Directly use the color variable */,
        input: "var(--input)" /* Directly use the color variable */,
        ring: "var(--ring)" /* Directly use the color variable */,
        chart: {
          1: "var(--chart-1)" /* Directly use the color variable */,
          2: "var(--chart-2)" /* Directly use the color variable */,
          3: "var(--chart-3)" /* Directly use the color variable */,
          4: "var(--chart-4)" /* Directly use the color variable */,
          5: "var(--chart-5)" /* Directly use the color variable */,
        },
        "secondary-light": "#FFC850",
        "theme-gray": "#C4C4C4"
      },
      borderRadius: {
        lg: "var(--radius)" /* Directly use the color variable */,
        md: "calc(var(--radius) - 2px)" /* Directly use the color variable */,
        sm: "calc(var(--radius) - 4px)" /* Directly use the color variable */,
      },
      fontSize: {
        26: "26px",
      },
      boxShadow: {
        "custom-inner": "-1px -4px 16px 8px var(--primary)",
        "custom-inner-2": "5px 5px 10px rgba(170, 170, 204, 0.5)",
        'submit-shadow': '0 4px 10px -2px #000',
        'custom-shadow-3': '0 8px 16px -8px #000',
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
        rubikMonoOne: ['var(--font-rubik-mono-one)', 'monospace'],
        sofadiOne: ['var(--font-sofadi-one)', 'cursive'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};