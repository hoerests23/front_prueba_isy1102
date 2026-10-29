import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

// Configuración de pruebas unitarias (EP3 ISY1102). Independiente de vite.config.ts
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      include: ["app/utils/**"],
    },
  },
});
