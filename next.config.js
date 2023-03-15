/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'providers', 'admin'],
  },
};

module.exports = nextConfig;
