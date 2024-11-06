import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "https://frontend-test-be.stage.thinkeasy.cz/api-json",
    output: "./services/generatedApi.ts",
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
});
