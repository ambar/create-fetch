module.exports = {
  extends: [require.resolve('recommended/config/eslint')],
  overrides: [
    {
      files: '**/*.spec.ts',
      rules: {
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/require-await': 'off',
      },
    },
  ],
}
