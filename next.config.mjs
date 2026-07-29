/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.higgs.ai' },
      // Placeholder photography — see lib/images.js. Drop this entry once the
      // images are replaced with files served from /public.
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
}

export default nextConfig
