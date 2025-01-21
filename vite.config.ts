import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts", // Asegúrate que esta ruta sea correcta
      formats: ["es", "umd"],
      name: "ChatTs",
      fileName: (format) => `chat-ts.${format}.js`,
    },
    rollupOptions: {
      external: ["lit"],
      output: {
        globals: {
          lit: "Lit",
        },
      },
    },
  },
});
