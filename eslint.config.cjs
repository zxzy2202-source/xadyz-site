/** @type {import('eslint').Linter.FlatConfig[]} */

const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const reactHooksPlugin = require('eslint-plugin-react-hooks');

module.exports = [
  // 忽略目录
  {
    ignores: ['dist/**', 'apps/blog/.next/**', 'node_modules/**'],
  },

  // 对个别文件关闭命名规则（避免类型信息报错）
  {
    files: ['src/admin/lib/actualPlaceholdersData.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // 主项目 TS/TSX 规则
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      // 命名规范（先关闭，避免类型信息报错）
      '@typescript-eslint/naming-convention': 'off',

      // React Hooks 基本规则
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
];

