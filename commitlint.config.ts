export default {
  extends: ['@commitlint/config-conventional'],
  plugins: ['commitlint-plugin-function-rules'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'test',
        'chore',
        'build',
        'ci',
        'merge',
      ],
    ],
    'header-max-length': [2, 'always', 100],
  },
}
