import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*"],
      exclude: ["src/**/*.js", "src/ui/**/*", "node_modules/**", "dist/**"],
    },
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
});
