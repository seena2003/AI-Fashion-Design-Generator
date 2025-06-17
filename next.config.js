/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'firebasestorage.googleapis.com', 's3.amazonaws.com'],
  },
  experimental: {
    serverActions: {}, // Fixed: now it's a valid object
  },
}

module.exports = nextConfig
