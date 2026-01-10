import json from "@eslint/json";
import ts from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
    { ignores: ["build/files/*.ts", "*.mjs"] },
    { plugins: { prettier, json, "@typescript-eslint": ts } },
    {
        files: ["**/*.ts"],
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: 2023,
            sourceType: "module",
            parser: tseslint.parser,
            parserOptions: { project: "./tsconfig.json" },
        },
        rules: {
            ...ts.configs["recommended"].rules,
            eqeqeq: "error",
            "prettier/prettier": "error",
            "no-console": "off",
            "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
            "no-unused-expressions": ["error", { allowShortCircuit: true }],
            "no-var": "error",
            "spaced-comment": ["error", "always", { markers: ["/"] }],
            "@typescript-eslint/array-type": ["error", { default: "array" }],
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/ban-ts-comment": "error",
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/explicit-module-boundary-types": ["error", { allowHigherOrderFunctions: true }],
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            "@typescript-eslint/no-explicit-any": "error",
            "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unsafe-declaration-merging": "off",
            "@typescript-eslint/prefer-namespace-keyword": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_[A-Z]", // Use only with type parameters
                },
            ],
        },
    },
    {
        files: ["tests/**/*"],
        rules: { "global-require": "off" },
    },
    {
        files: ["**/*.json"],
        ignores: ["package-lock.json"],
        language: "json/json",
        rules: json.configs.recommended.rules,
    },
);
