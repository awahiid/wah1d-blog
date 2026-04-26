/** @type {import('tailwindcss').Config} */
import {
  COLOR_NEUTRAL,
  COLOR_NEUTRAL_50,
  COLOR_PRIMARY,
  COLOR_SURFACE_LIGHT,
} from "./src/styles/stylesConstants";
import plugin from "tailwindcss/plugin"; // ✅ importa desde tailwindcss/plugin

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-bg-patterns"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
          {
            'pattern-grid': (value) => ({
              '--pattern-color': value,
              backgroundImage: `
              repeating-linear-gradient(var(--pattern-color) 0 var(--pattern-thickness, 1px), transparent var(--pattern-thickness, 1px) 100%),
              repeating-linear-gradient(90deg, var(--pattern-color) 0 var(--pattern-thickness, 1px), transparent var(--pattern-thickness, 1px) 100%)
            `,
              backgroundSize: 'var(--pattern-size, 30px) var(--pattern-size, 30px)',
            }),
          },
          { values: theme('colors'), type: 'color' }
      )

      matchUtilities(
          {
            'pattern-size': (value) => ({ '--pattern-size': value }),
          },
          { values: theme('spacing') }
      )

      matchUtilities(
          {
            'pattern-thickness': (value) => ({ '--pattern-thickness': value }),
          },
          { values: theme('borderWidth') }
      )

      matchUtilities(
          {
            'pattern-offset': (value) => ({ backgroundPosition: `${value} ${value}` }),
          },
          { values: theme('spacing') }
      )

    }),
  ],
  theme: {
    extend: {
      colors: {
        primary: COLOR_PRIMARY,
        neutral: COLOR_NEUTRAL,
        neutral50: COLOR_NEUTRAL_50,
        surface: COLOR_SURFACE_LIGHT,
      },
      fontFamily: {},
    },
    patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
    },
  }
};