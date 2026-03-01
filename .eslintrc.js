module.exports = {
  root: true,
  extends: [
    '@nuxt/eslint-config',
    'plugin:prettier/recommended', // включает eslint-config-prettier и eslint-plugin-prettier
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
