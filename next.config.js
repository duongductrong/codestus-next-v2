/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    APP_API: process.env.APP_API,
    APP_URL: process.env.APP_URL
  },
};

module.exports = nextConfig;
