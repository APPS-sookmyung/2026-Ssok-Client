import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/ssok",
  reactCompiler: true,

  // 1. Next.js 16+ Turbopack 환경용 SVGR 설정
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  // 2. Webpack 빌드 환경용 SVGR 설정
  webpack(config) {
    // 기존 SVG 룰 찾기
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // *.svg?url 은 기존 Next.js 정적 에셋(URL) 방식으로 로드
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 일반 *.svg import는 React 컴포넌트로 변환
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule?.issuer,
        resourceQuery: {
          not: [...(fileLoaderRule?.resourceQuery?.not || []), /url/],
        },
        use: ["@svgr/webpack"],
      },
    );

    // 기존 Next.js 기본 로더에서 일반 .svg 처리 제외
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },

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
