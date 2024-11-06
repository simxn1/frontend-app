module.exports = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },

  async redirects() {
    return [
      {
        source: "/",
        destination: "/login",
        permanent: true,
      },
    ];
  },
};
