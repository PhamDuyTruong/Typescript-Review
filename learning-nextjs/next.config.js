/** @type {import('next').NextConfig} */
const withImages = require('next-images')
const nextConfig = {
  reactStrictMode: true,
};

const withImage = withImages({
  webpack(config, options) {
    return config
  }
})

module.exports = {nextConfig, withImage}
