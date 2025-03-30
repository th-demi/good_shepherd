/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supercool-ram.transforms.svdcdn.com',
      },
    ],
  },
};

export default nextConfig;