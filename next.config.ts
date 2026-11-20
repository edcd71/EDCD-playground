import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  outputFileTracingIncludes: {
    "/*": ["./app/prototypes/*/metadata.json", "./app/prototypes/*/page.tsx"],
  },
};

export default nextConfig;
