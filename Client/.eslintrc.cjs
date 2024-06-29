[
    {
        'extends': [
            'plugin:@typescript-eslint/recommended',
            'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
            'prettier',
            'plugin:prettier/recommended'
        ],
        'settings': {
            'react': {
                'version': 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
            },
        },
        'parserOptions': {
            'ecmaVersion': 2020, // Allows for the parsing of modern ECMAScript features
            'sourceType': 'module', // Allows for the use of imports
            'ecmaFeatures': {
                'jsx': true, // Allows for the parsing of JSX
            },
        },
        'root': true,
        'env': { 'browser': true, 'es2020': true },
        'ignorePatterns': ['dist', '.eslintrc.cjs'],
        'parser': '@typescript-eslint/parser',
        'plugins': ['react-refresh', '@typescript-eslint', 'prettier', 'react'],
        'rules': {
            '@typescript-eslint/explicit-function-return-type': "off",
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
            'prettier/prettier': ["error", {
                'singleQuote': true,
                'jsxSingleQuote': true,
                'endOfLine': "auto",
            }],
            "no-unused-vars": "warn"
        }
    }
]