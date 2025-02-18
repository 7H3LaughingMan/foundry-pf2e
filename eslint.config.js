import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default tseslint.config(
    {
        ignores: ["build/files/*.ts", "types/pf2e/**/*.ts", "eslint.config.js"],
    },
    {
        plugins: { prettier },
    },
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
            },
            ecmaVersion: 2023,
            sourceType: "module",
            parser: tseslint.parser,
            parserOptions: { project: "tsconfig.json" },
        },
        rules: {
            eqeqeq: "error",
            "no-console": "off",
            "no-plusplus": ["error", { allowForLoopAfterthoughts: true }],
            "no-unused-expressions": "off",
            "no-unused-private-class-members": "off",
            "prettier/prettier": "error",
            "spaced-comment": ["error", "always", { markers: ["/"] }],
            "@typescript-eslint/array-type": ["error", { default: "array" }],
            "@typescript-eslint/await-thenable": "error",
            "@typescript-eslint/ban-ts-comment": "error",
            "@typescript-eslint/ban-types": "off",
            "@typescript-eslint/explicit-module-boundary-types": ["error", { allowHigherOrderFunctions: true }],
            "@typescript-eslint/no-empty-function": "off",
            "@typescript-eslint/no-empty-object-type": ["error", { allowInterfaces: "with-single-extends" }],
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": ["error", { allowDeclarations: true }],
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unsafe-declaration-merging": "off",
            "@typescript-eslint/no-unsafe-function-type": "off",
            "@typescript-eslint/no-unused-expressions": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    varsIgnorePattern: "^_[A-Z]", // Use only with type parameters
                },
            ],
            "@typescript-eslint/prefer-namespace-keyword": "off",
        },
    },
);
