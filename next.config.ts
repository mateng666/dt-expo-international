import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const proxyTarget = (
  process.env.API_PROXY_TARGET || "http://127.0.0.1:7033"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    // 会议封面多为 CDN/对象存储；开发期不限制域名
    unoptimized: process.env.NODE_ENV === "development",
    remotePatterns: [
      { protocol: "https", hostname: "*.aliyuncs.com" },
      { protocol: "https", hostname: "*.cloudflare.com" },
      { protocol: "http", hostname: "127.0.0.1" },
      { protocol: "http", hostname: "localhost" },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/intl/:path*",
        destination: `${proxyTarget}/api/intl/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
