module.exports = {
    plugins: [
        'react',
        'react-hooks',
        'simple-import-sort',
        '@typescript-eslint',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 8,
        ecmaFeatures: {
            jsx: true,
            experimentalObjectRestSpread: true
        }
    },
    env: {
        browser: true,
        node: true,
        es6: true
    },
    globals: {
        JSX: true,
    },
    rules: {
        '@typescript-eslint/no-unused-vars': [
            2,
            {
                vars: 'all',
                args: 'after-used'
            }
        ],
        '@typescript-eslint/no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
        'no-multiple-empty-lines': [2, { max: 1, maxEOF: 1 }],
        'import/order': 'off',
        'simple-import-sort/sort': 2,
        'react-hooks/rules-of-hooks': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/jsx-no-undef': 2,
        'brace-style': [
            2,
            'stroustrup',
            {
                allowSingleLine: true
            }
        ],
        'comma-style': [
            2,
            'last'
        ],
        curly: ['error', 'multi-line'],
        'eol-last': 2,
        eqeqeq: 2,
        'handle-callback-err': [
            2,
            'error'
        ],
        'jsx-quotes': [
            2,
            'prefer-double'
        ],
        'keyword-spacing': [
            2,
            {
                before: true,
                after: true
            }
        ],
        'no-labels': 2,
        'no-undef-init': 2,
        'no-unreachable': 2,
        'no-unused-expressions': 'off',
        'no-unused-vars': 'off',
        'no-trailing-spaces': 2,
        'no-void': 2,
        'no-with': 2,
        'one-var': [
            2,
            {
                uninitialized: 'always',
                initialized: 'never'
            }
        ],
        'operator-assignment': [
            2,
            'always'
        ],
        radix: 2,
        'semi-spacing': [
            2,
            {
                before: false,
                after: true
            }
        ],
        semi: [
            2,
            'always'
        ],
        'space-before-blocks': [
            2,
            'always'
        ],
        'space-before-function-paren': [
            2,
            {
                anonymous: 'always',
                named: 'always'
            }
        ],
        'space-infix-ops': [
            2,
            {
                int32Hint: false
            }
        ],
        'space-unary-ops': [
            2,
            {
                words: true,
                nonwords: false
            }
        ],
        'use-isnan': 2,
        'valid-typeof': 2,
        'wrap-iife': 2,
        yoda: [
            2,
            'never',
            {
                exceptRange: true
            }
        ],
        indent: [
            2,
            4,
            {
                SwitchCase: 1
            }
        ],
        'key-spacing': [
            2,
            {
                beforeColon: false,
                afterColon: true
            }
        ],
        'new-parens': 2,
        'no-alert': 2,
        'no-array-constructor': 2,
        'no-caller': 2,
        'no-catch-shadow': 2,
        'no-cond-assign': 2,
        'no-console': [
            2,
            {
                allow: [
                    'warn',
                    'error',
                    'info',
                    'group',
                    'groupEnd'
                ]
            }
        ],
        'no-constant-condition': 2,
        'no-delete-var': 2,
        'no-div-regex': 2,
        'no-dupe-args': 2,
        'no-dupe-keys': 2,
        'no-duplicate-case': 2,
        'no-empty-character-class': 2,
        'no-empty': 2,
        'no-eval': 2,
        'no-ex-assign': 2,
        'no-extend-native': 2,
        'no-extra-bind': 2,
        'no-extra-boolean-cast': 2,
        'no-extra-semi': 2,
        'no-fallthrough': 2,
        'no-floating-decimal': 2,
        'no-func-assign': 2,
        'no-implied-eval': 2,
        'no-inner-declarations': [
            2,
            'functions'
        ],
        'no-invalid-regexp': 2,
        'no-irregular-whitespace': 2,
        'no-iterator': 2,
        'no-label-var': 2,
        'no-lonely-if': 2,
        'no-mixed-requires': [
            2,
            true
        ],
        'no-mixed-spaces-and-tabs': 2,
        'no-multi-spaces': 2,
        'no-multi-str': 2,
        'no-negated-in-lhs': 2,
        'no-new-object': 2,
        'no-new-require': 2,
        'no-new-wrappers': 2,
        'no-new': 2,
        'no-obj-calls': 2,
        'no-octal-escape': 2,
        'no-octal': 2,
        'no-param-reassign': 2,
        'no-path-concat': 2,
        'no-proto': 2,
        'no-redeclare': 2,
        'no-regex-spaces': 2,
        'no-return-assign': 2,
        'no-script-url': 2,
        'no-sequences': 2,
        'no-shadow-restricted-names': 2,
        'no-shadow': 2,
        'no-spaced-func': 2,
        'no-sparse-arrays': 2,
        'no-sync': 2,
        'no-throw-literal': 2,
        'no-undef': 2,
        'object-curly-spacing': [
            2,
            'always',
            {
                objectsInObjects: true,
                arraysInObjects: true
            }
        ],
        'quote-props': [
            2,
            'as-needed'
        ],
        quotes: [
            2,
            'single',
            'avoid-escape'
        ],
        'arrow-parens': [
            'error',
            'as-needed', { requireForBlockBody: true }
        ]
    }
};
