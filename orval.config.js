module.exports = {
  api: {
    input: {
      target: process.env.NEXT_PUBLIC_API_URL + "/api-json",
      client: "axios",
    },
    output: {
      target: "./src/services/generatedApi.ts",
      schemas: "./src/services/models",
      client: "axios",
      override: {
        mutator: {
          path: "./src/services/apiClient.ts",
          name: "apiClient",
        },
      },
    },
    hooks: {
      afterAllFilesWrite: "prettier --write",
    },
  },
};
