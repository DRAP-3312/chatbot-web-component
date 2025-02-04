import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es", "umd"],
      name: "ChatTs",
      fileName: (format) => `chat-ts.${format}.js`,
    },
    rollupOptions: {
      external: [/^lit/, "lit-html", "lit-element"],
      output: {
        globals: {
          lit: "Lit",
          "lit-html": "LitHtml",
          "lit-element": "LitElement",
        },
      },
    },
  },
});
