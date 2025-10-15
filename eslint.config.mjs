import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js + TypeScript ESLint rules
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom configuration
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      // ✅ Allow `any` type globally
      "@typescript-eslint/no-explicit-any": "off",

      // ✅ Ignore unused imports/variables (just warn in console, not error)
      "@typescript-eslint/no-unused-vars": "off",

      // ✅ Allow usage of <img> tags without forcing next/image
      "@next/next/no-img-element": "off",

      // ✅ Allow normal quotes and apostrophes in JSX
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
