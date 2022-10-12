import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://remarkable-dango-daa572.netlify.app/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
