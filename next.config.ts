import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/ssok",
  reactCompiler: true,

  async redirects() {
    return [
      {
        source: "/",
        destination: "/ssok",
        basePath: false,
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
