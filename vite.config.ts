import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts", // Este será nuestro punto de entrada
      formats: ["es"], // Generaremos módulos ES
      fileName: "index", // Nombre del archivo de salida
    },
    rollupOptions: {
      external: /^lit/, // Excluimos lit del bundle final
    },
  },
});
