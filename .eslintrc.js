module.exports = {
    env: {
      node: true
    },
    extends: [
      'airbnb',
      'prettier',
      'plugin:node/recommended',
      'plugin:prettier/recommended'
    ],
    plugins: ['prettier'],
    parserOptions: {
      ecmaVersion: 2018
    },
    env: { es6: true },
    rules: {
      'prettier/prettier': 'error',
      quotes: ['error', 'single'],
      semi: 'error',
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: true,
            object: true
          },
          AssignmentExpression: {
            array: true,
            object: false
          }
        }
      ],
      'no-use-before-define': ['error', { functions: true, classes: true }],
      'no-console': 'error',
      'prefer-arrow-callback': 'error',
      'consistent-return': 'off',
      'prefer-const': [
        'error',
        {
          destructuring: 'any',
          ignoreReadBeforeAssign: false
        }
      ],
      'comma-dangle': 'off',
      'operator-linebreak': [
        2,
        'after',
        { overrides: { '?': 'ignore', ':': 'ignore' } }
      ],
      'arrow-parens': ['error', 'always'],
      'object-curly-newline': [
        'warn',
        {
          ObjectExpression: { multiline: true, minProperties: 1 },
          ObjectPattern: { multiline: true },
          ImportDeclaration: 'never',
          ExportDeclaration: { multiline: true, minProperties: 3 }
        }
      ],
      camelcase: ['error', { properties: 'never', ignoreDestructuring: true }],
      'require-await': 'error',
      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false
        }
      ],
      'prefer-destructuring': [
        'error',
        {
          VariableDeclarator: {
            array: false,
            object: true
          },
          AssignmentExpression: {
            array: true,
            object: false
          }
        },
        {
          enforceForRenamedProperties: false
        }
      ],
      'object-shorthand': 'error',
      'func-name': 'off',
      'array-callback-return': 'off',
      'func-names': ['error', 'never'],
      'no-underscore-dangle': 'off',
      'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
      'object-property-newline': [
        'error',
        { allowAllPropertiesOnSameLine: true }
      ],
      'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }]
    }
  };
  