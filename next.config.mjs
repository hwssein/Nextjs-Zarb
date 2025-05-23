/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
