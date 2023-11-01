module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'eslint:recommended',
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime', // try
    'plugin:jsx-a11y/recommended', // try
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking', // from Josh Goldberg video 20230924
    'plugin:prettier/recommended',

    // Extends two more configuration from "import" plugin
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier', // added 20230924 10:57
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'react-refresh',
    '@typescript-eslint',
    'prettier',
    'import',
    'sort-destructure-keys',
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'prettier/prettier': [
      'warn',
      { jsxSingleQuote: false },
      { usePrettierrc: true },
    ],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'warn', // to be able to use type any
    'no-unused-vars': 'off', // necessary for typescript/no-unused-vars
    '@typescript-eslint/no-unused-vars': 'warn', // to allow unused vars
    'import/prefer-default-export': 'off',
    // Sort import rule
    'sort-imports': [
      'error',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don't want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true,
      },
    ],

    // turn on errors for missing imports
    'import/no-unresolved': 'error',
    // 'import/no-named-as-default-member': 'off',
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown', // <- unknown
        ],
        // https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853
        // pathGroups: [
        //   { pattern: 'components', group: 'internal' },
        //   { pattern: 'common', group: 'internal' },
        //   { pattern: 'routes/**', group: 'internal' },
        //   { pattern: 'assets/**', group: 'internal', position: 'after' },
        // ],
        // pathGroupsExcludedImportTypes: ['internal'],
        // end of the part picked up from @diballesteros
        'newlines-between': 'always',
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true,
        },
      },
    ],

    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],

    'sort-destructure-keys/sort-destructure-keys': [
      'error',
      { caseSensitive: false },
    ],

    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always',
        jsx: 'always',
        ts: 'always',
        tsx: 'always',
      },
    ],

    // https://laurieontech.com/posts/eslint/
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/*.spec.ts',
          '**/*.spec.tsx',
          '**/*.test.ts',
          '**/*.test.tsx',
        ],
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],

    // https://stackoverflow.com/questions/54828209/use-array-destructuring-prefer-destructuring-error-on-eslint
    'prefer-destructuring': ['error', { object: true, array: false }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        // always try to resolve types under `<root>@types` directory even if
        // it doesn't contain any source code, like `@types/unist`
        // // alwaysTryTypes: true, // UNCOMMENT MAYBE
        // Choose from one of the "project" configs below
        // or omit to use <root>/tsconfig.json by default
        // use <root>/path/to/folder/tsconfig.json
        // "project": "path/to/folder",
        project: ['./tsconfig.json'],
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        // moduleDirectory: ['.', 'src', 'node_modules'], // or maybe "src/"
        // project: ['./tsconfig.node.json'],
        paths: ['.'],
      },
      // alias: {
      //   map: [
      //     // ['@api', './src/api'],
      //     // ['@assets', './src/assets'],
      //     // ['@components', './src/components'],
      //     // ['@helpers', './src/helpers'],
      //     // ['@migrations', './src/migrations'],
      //     // ['@src', './src'],
      //     // ['@utils', './src/utils'],
      //     // customize as you need
      //   ],
      //   extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
      // },
      // project: {},
    },
    react: {
      version: 'detect',
    },
  },
};

// sort imports from
//   https://medium.com/weekly-webtips/how-to-sort-imports-like-a-pro-in-typescript-4ee8afd7258a
//   and
//   https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853
//
// https://laurieontech.com/posts/eslint/     for    'import/no-extraneous-dependencies'
