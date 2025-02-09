import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: { globals: globals.browser },
    rules: {
      "vue/require-name-property": "off",
      "unused-imports/no-unused-imports": "warn", // Peringatan jika ada import yang tidak digunakan
      "unused-imports/no-unused-vars": [
        "warn",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
      ]
    }
  },
  pluginJs.configs.recommended,
  ...pluginVue.configs["flat/essential"],
];
