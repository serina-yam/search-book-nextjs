const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: process.env.STANDALONE === "true" ? "standalone" : "export",
  // reactStrictMode: true,
  trailingSlash: true,
}
