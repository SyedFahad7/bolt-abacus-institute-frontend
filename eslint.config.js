import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  // Ignore build and dependency folders
  globalIgnores(['dist', 'node_modules', 'build']),

  {
    files: ['**/*.{ts,tsx}'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
    env: {
      browser: true,
      es2022: true,
      node: true,
    },
    extends: [
      js.configs.recommended, // JS recommended rules
      tsPlugin.configs['recommended'], // TypeScript recommended rules
      tsPlugin.configs['recommended-requiring-type-checking'], // Optional: more strict TS rules
      react.configs['recommended'], // React best practices
      reactHooks.configs['recommended'], // React hooks rules
      'plugin:prettier/recommended', // prettier formatting
    ],
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import'],
    rules: {
      // ✅ TypeScript strictness
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',

      // ✅ React best practices
      'react/react-in-jsx-scope': 'off', // React 17+ JSX transform
      'react/prop-types': 'off', // TS handles types
      'react/jsx-uses-react': 'off',

      // ✅ Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // ✅ Code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],

       'prettier/prettier': 'error',

      // ✅ Import rules
      'import/order': [
        'error',
        {
          groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
        },
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]);
