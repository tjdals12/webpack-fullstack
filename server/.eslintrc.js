module.exports = {
    extends: ['airbnb-base', 'prettier'],
    rules: {
        'no-console': 0,
        'import/prefer-default-export': 0,
        'import/no-unresolved': 0,
        'import/no-extraneous-dependencies': [0, { devDependencies: true }],
        'no-param-reassign': 1,
        'no-underscore-dangle': 0,
    },
    env: {
        node: true,
        es6: true,
        mocha: true,
    },
    ignorePatterns: [
        'dist',
        'config',
        'node_modules',
        'src/api/**/*.spec.yaml',
    ],
};
