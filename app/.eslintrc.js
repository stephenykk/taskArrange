// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    'P': true,
    'window': true,
    'axios': true
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': 0,
    'comma-dangle': ['error', 'never'],
    'no-tabs': 0,
    'func-names': ['error', 'never'],
    'global-require': 0,
    'object-curly-spacing': 0,
    'no-shadow': 0,
    'no-plusplus': 0,
    'no-param-reassign': 0,
    'eol-last': 0,
    'no-console': 0,
    'arrow-parens': 0,
    'no-unused-expressions': 0,
    'prefer-default-export': 0,
    'padded-blocks': 0,
    'no-trailing-spaces': 0,
    'one-var-declaration-per-line': 0,
    'one-var': 0,
    'no-restricted-syntax': 0,
    'no-prototype-builtins': 0,
    'no-cond-assign': 0,
    'camelcase': 0,
    'indent': 0,
    'prefer-const': 0
  }
}