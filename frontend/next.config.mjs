/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  sassOptions: {
    includePaths: ["src/styles"],
  },
};

export default nextConfig;
