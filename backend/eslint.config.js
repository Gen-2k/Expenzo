import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  eslintConfigPrettier, // Disables ESLint rules that might conflict with Prettier
  {
    rules: {
      // Custom overrides to be professional but not overly restrictive
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
        },
      ], // Warns instead of errors, ignores vars starting with _
      'no-console': 'warn', // Warns on console.log so you remember to remove them, but doesn't break build
    },
  },
];
