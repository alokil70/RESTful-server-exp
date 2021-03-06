module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    parserOptions: {},
    extends: ['prettier', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'no-console': 'off',
        'no-undef': 'off',
        'vue/no-unused-vars': 'off',
        'vue/no-unused-components': 'off',
        'nuxt/no-this-in-fetch-data': 'off',
        'no-unused-vars': 'off',
        'no-debugger': 'off',
    },
}
