import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "static",
  integrations: [tailwind(), mdx()],
  // TODO: specify project
  site: "https://www.andrew.cmu.edu/course/16-726-sp24/projects/mconn/proj4/",
  build: {
    assetsPrefix:
      "https://www.andrew.cmu.edu/course/16-726-sp24/projects/mconn/proj4/",
  },
});
