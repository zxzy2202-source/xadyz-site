/** 基础 ESLint 配置，包含 TypeScript + 命名规范 */

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    /** 统一命名规范 */
    '@typescript-eslint/naming-convention': [
      'error',
      // 类型、接口等：PascalCase（包括 Props、Page、Record 等）
      {
        selector: ['typeLike'],
        format: ['PascalCase'],
      },
      // 变量/参数：camelCase，允许 UPPER_CASE 常量
      {
        selector: 'variableLike',
        format: ['camelCase', 'UPPER_CASE'],
      },
      // 函数名：camelCase
      {
        selector: 'function',
        format: ['camelCase'],
      },
      // 导出的 React 组件：PascalCase
      {
        selector: 'variable',
        modifiers: ['exported'],
        types: ['function'],
        format: ['PascalCase'],
      },
      // 自定义 Hook：必须以 use 开头
      {
        selector: 'function',
        filter: '^use[A-Z].*',
        format: ['camelCase'],
        leadingUnderscore: 'forbid',
      },
    ],
  },
};

