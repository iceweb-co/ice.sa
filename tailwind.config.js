/** @type {import('tailwindcss').Config} */

const { assignWith } = require("lodash");

const colors = require("tailwindcss/colors");
const { theme } = require("tailwindcss/defaultConfig");

module.exports = {
  content: ["./components/**/*.{js,ts}", "./pages/**/*.{js,ts}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    extend: {
      // https://tailwindcss.com/docs/customizing-colors
      colors: {
        gray: colors.neutral,
        brand: "hsl(196, 46%, 35%)",
        "brand-dark": "hsl(196, 46%, 25%)",
      },
      fontFamily: {
        sans: [...theme.fontFamily.sans],
      },
    },

    // https://tailwindcss.com/docs/breakpoints
    screens: {
      sm: theme.screens.sm,
      md: theme.screens.md,
      lg: theme.screens.lg,
    },

    // https://tailwindcss.com/docs/customizing-spacing
    spacing: assignWith({}, theme.spacing, (_, value) => {
      if (value.endsWith("px")) return value;
      return `${parseFloat(value) * 16}px`;
    }),
  },

  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("tailwindcss-logical"),
  ],
};
