module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ["svelte"],
  extends: ["eslint:recommended", "plugin:svelte/recommended"],
  overrides: [
    {
      files: ["**/*.svelte"],
      parser: "svelte-eslint-parser",
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
  },
};
