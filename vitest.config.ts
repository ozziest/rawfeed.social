import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.js"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
    },
  },
});
