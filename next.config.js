/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  env: {
    APP_API: process.env.APP_API,
  },
};

module.exports = nextConfig;
