

/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/


const allRules = {
  // eslint rules configuration
  // Allow annonymous functions
  'func-names': 0,
  'global-require': 0,
  'max-len': 0,
  'no-console': 0,
  // Do not check comments otherwise every files needs (License more exactly) would be linted
  'spaced-comment': 0,
  // ignore unused variable on functions arguments
  'no-unused-vars': [2, { args: 'none' }],
  'no-confusing-arrow': 0,
  'no-warning-comments': [1, { terms: ['todo', 'fixme'], location: 'anywhere' }],
  // eslint reconfiguration for operators + and -
  'no-mixed-operators': ['error', { allowSamePrecedence: true }],
  // Do not force array destructuration
  'prefer-destructuring': ['error', {
    VariableDeclarator: {
      array: false,
      object: true,
    },
    AssignmentExpression: {
      array: false,
      object: false,
    },
  }],
  // let newlines allowed after parenthesis (better for react elements alignment)
  'function-paren-newline': 0,

  semi: [
    'error',
    'never',
  ],

  // Airbnb rules configuration
  'import/no-extraneous-dependencies': 0,
  'import/no-named-as-default': 0,
  'import/no-named-as-default-member': 0,
  'import/prefer-default-export': 0,

  // React rules configuration
  'react/jsx-uses-react': 2,
  'react/jsx-uses-vars': 2,
  'react/react-in-jsx-scope': 2,
  'react/prefer-es6-class': 0,
  'react/require-extension': 0,
  'react/require-default-props': 0,
  'react/prefer-stateless-function': 0,
  'react/display-name': 0,
  'react/jsx-no-undef': [2, { allowGlobals: true }],

  // Lodash rules configuration
  'lodash/import-scope': [2, 'method'],
  // Disable useless rule (_.noop instead of empty annonnymous function)
  'lodash/prefer-noop': 0,
  // This rule is not satisfying
  'lodash/prefer-lodash-method': 0,
  // We do not use lodash constants factory
  'lodash/prefer-constant': 0,
  // Not so lisible
  'lodash/prop-shorthand': 0,
  // We prefer the explicit declaration
  'lodash/matches-prop-shorthand': 0,

  // Mocha rules configuration
  // See https://github.com/lo1tuma/eslint-plugin-mocha/tree/master/docs/rules
  'mocha/no-exclusive-tests': 2,
  'mocha/max-top-level-suites': 2,
  'mocha/handle-done-callback': 2,
  'mocha/no-top-level-hooks': 2,
  'mocha/no-return-and-callback': 2,
  'mocha/no-sibling-hooks': 2,
  'mocha/no-global-tests': 2,
  // All React tests contains before and after whether having 1 or more tests
  'mocha/no-hooks-for-single-case': 0,
  'mocha/no-mocha-arrows': 0,
  // We do not use mocha context so we can use lambdas
  'mocha/no-nested-tests': 2,
  'mocha/no-skipped-tests': 2,
  'mocha/no-identical-title': 2,
  // We wrote sync tests
  'mocha/no-synchronous-tests': 0,

  // Promise rules configuration
  // We call done from Mocha inside async tests
  'promise/no-callback-in-promise': 0,
  // Rule is not adequate without async / await
  'promise/no-nesting': 0,
  // This is handy to create custom promises!
  'promise/avoid-new': 0,
  // We do not always return a promise on react component since most of the time nobody consumes them
  'promise/catch-or-return': 0,
  'promise/always-return': 0,

  // Disabling inaccurate jsx ally rules for REGARDS
  'jsx-a11y/anchor-is-valid': 0,
  'jsx-a11y/no-noninteractive-element-interactions': 0,
  'jsx-a11y/mouse-events-have-key-events': 0,
  'jsx-a11y/click-events-have-key-events': 0,
  'jsx-a11y/no-static-element-interactions': 0,
  'jsx-a11y/label-has-for': 0, // bugged
}

module.exports = {
  extends: [
    'eslint:recommended',
    'airbnb',
    'plugin:react/recommended',
    'plugin:react-perf/recommended',
    'plugin:lodash/recommended',
    'plugin:promise/recommended',
  ],
  plugins: [
    'react',
    'lodash',
    'mocha',
    'promise',
    'react-perf',
  ],
  env: {
    browser: true,
    mocha: true,
    node: true,
    es6: true,
    commonjs: true,
  },
  globals: {
    React: true,
    PropTypes: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  rules: allRules,
}
