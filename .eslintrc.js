module.exports = {
  env: {
    'jest/globals': true,
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:flowtype/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  settings: {
    'import/parser': 'babel-eslint',
    'import/ignore': [/\.(scss|less|css)$/],
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './'],
      },
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'flowtype', 'import', 'jest'],
  rules: {
    'flowtype/space-before-generic-bracket': 'off',
    'flowtype/generic-spacing': 'off',
    'flowtype/space-before-type-colon': 'off',
    'flowtype/space-after-type-colon': 'off',
    'no-unused-vars': [
      'error',
      {vars: 'all', args: 'after-used', ignoreRestSiblings: true},
    ],
    'import/first': [ 'error', 'absolute-first' ],
    'import/no-duplicates': "error",

  },
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DEVTOOLS__: true,
    __HOST__: true,
    __BUILD__: true,
  },
};
