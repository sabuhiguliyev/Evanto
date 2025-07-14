import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
    { ignores: ['dist'] },
    {
        files: ['**/*.{js,jsx,ts,tsx}', '!tailwind.config.js'], // Exclude eslint.config.js from linting
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parser: typescriptParser, // Use TypeScript parser
            parserOptions: {
                ecmaVersion: 'latest',
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
                // project: './tsconfig.json', // Ensure ESLint uses your TypeScript config
            },
        },
        settings: { react: { version: '18.3' } },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': typescriptPlugin, // Add TypeScript plugin
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...react.configs['jsx-runtime'].rules,
            ...reactHooks.configs.recommended.rules,
            ...typescriptPlugin.configs.recommended.rules, // Include recommended TypeScript rules
            'react/jsx-no-target-blank': 'off',
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    },
];
