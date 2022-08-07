module.exports = {
  'env': {
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  "plugins": [
    "react-redux"
  ],
  'extends': [
    'eslint:recommended',
    "plugin:react-redux/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
        "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
},
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "react-redux/connect-prefer-named-arguments": 2,
    'eqeqeq': 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always'
    ],
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    'no-console': 0
  }
}

