module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:jest/recommended',
    'plugin:vue/recommended',
    'prettier',
    'prettier/standard',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-var': 1,
    'prefer-const': 1,
    'no-console': process.env.NODE_ENV !== 'development' ? 1 : 0,
    'no-debugger': process.env.NODE_ENV !== 'development' ? 1 : 0,
    'vue/require-v-for-key': 0,
    'vue/valid-v-on': 0,

    // TODO: Remove rules above this
    eqeqeq: 0,
    'vue/max-attributes-per-line': 0,
    'vue/require-default-prop': 0,
    'vue/require-prop-types': 0,
  },
}
