import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    // The carousel must publish the initial state of its external API on mount.
    files: ["components/ui/carousel.tsx"],
    rules: { "react-hooks/set-state-in-effect": "off" },
  },
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "public/thumbnails/**",
  ]),
]);
