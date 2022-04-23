/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    APP_API: process.env.APP_API,
    APP_URL: process.env.APP_URL,
  },

  images: {
    domains: ["res.cloudinary.com", "localhost", "codestus.com"],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
