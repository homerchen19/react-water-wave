module.exports = {
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/react'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
  rules: {
    'import/no-default-export': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
  },
};
