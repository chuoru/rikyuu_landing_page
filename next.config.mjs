/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
  },
  webpack(config) {
    // Prevent webpack from trying to resolve Node.js built-ins referenced in
    // the Emscripten-generated mujoco.js (guarded at runtime, never executed in browser)
    config.resolve.fallback = { ...config.resolve.fallback, fs: false, path: false };
    return config;
  },
};

export default nextConfig;
