/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            figcaption: {
              p: {
                "text-align": "center",
              },
            },
            td: {
              // img: {
              //   "margin-top": "0px",
              //   "margin-bottom": "0px",
              // }
            }
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
