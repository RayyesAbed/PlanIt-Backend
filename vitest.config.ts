import { defineConfig } from "vitest/config";

export default defineConfig(({ mode }) => ({
  test: {
    setupFiles: ["./test/setup.ts"],
  },
}));
