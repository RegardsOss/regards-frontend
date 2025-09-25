/**
 * Copyright 2017-2025 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * */

/*
  "off" or 0 - turn the rule off
  "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
  "error" or 2 - turn the rule on as an error (exit code will be 1)
*/

const allRules = {
  /**
   * Eslint rules configuration
   * See https://eslint.org/docs/v8.x/rules
   */
  // Allow annonymous functions
  'func-names': 0,
  // Require require() calls to be placed at top-level module scope
  'global-require': 0,
  // configure camelcase rule: warn all but...
  camelcase: [0, {
    ignoreImports: true, // external format, should not be checked locally
    ignoreDestructuring: true, // especially for external JSON payloads
    allow: [
      // react migration path elements
      'UNSAFE_componentWillMount',
      'UNSAFE_componentWillReceiveProps',
      'UNSAFE_componentWillUpdate',
      // oauth syntax (not controlled by frontend!)
      'access_token',
      'token_type',
      'expires_in',
    ],
  }],
  // Enforce a maximum line length
  'max-len': 0,
  // Disallow the use of console
  'no-console': 0,
  // Do not check comments otherwise every files needs (License more exactly) would be linted
  'spaced-comment': 0,
  // ignore unused variable on functions arguments
  'no-unused-vars': [2, { args: 'none' }],
  // Disallow arrow functions where they could be confused with comparisons
  'no-confusing-arrow': 0,
  // Raise a warning if a TODO or FIXME is find in comments
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
  // allow that a control (an unteractive element) has no text label
  'jsx-a11y/control-has-associated-label': 0,
  // allow to line break whenever we want
  'function-call-argument-newline': 0,
  // allow to place operator (like ternary operator) wherever we want
  'operator-linebreak': 0,
  // allow to set default param at any place we want in method parameter list. TODO: FIX
  'default-param-last': 0,
  // allow returning values from promise executor functions
  'no-promise-executor-return': 0,
  // allow the use of RegExp constructor
  'prefer-regex-literals': 0,
  // allow usage of static attributes inside the class
  'no-use-before-define': 0,
  // Disallows semicolons as the end of statements (except to disambiguate statements beginning with [, (, /, +, or -) |
  semi: [
    'error',
    'never',
  ],

  /**
   * Import rules configuration
   * See https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules
   */
  // Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies, optionalDependencies, peerDependencies, or bundledDependencies
  'import/no-extraneous-dependencies': 0,
  // Reports use of an exported name as the locally imported name of a default export
  'import/no-named-as-default': 0,
  // Reports use of an exported name as a property on the default export
  'import/no-named-as-default-member': 0,
  // In exporting files, this rule checks if there is default export or not
  'import/prefer-default-export': 0,
  // To remove when module.exports will disappear
  'import/named': 0,
  // Reports require([string]) function calls. Will not report if >1 argument, or single argument is not a literal string
  'import/no-commonjs': [2, { allowRequire: true }],
  // Custom: forbid self import and cycling import in modules
  'import/no-self-import': 2,
  // Ensures that there is no resolvable path back to this module via its dependencies
  'import/no-cycle': [1, { ignoreExternal: true, maxDepth: 1 }],

  /**
   * React rules configuration
   * See https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules
   */
  // Disallow React to be incorrectly marked as unused
  'react/jsx-uses-react': 2,
  // Disallow variables used in JSX to be incorrectly marked as unused
  'react/jsx-uses-vars': 2,
  // Disallow missing React when using JSX
  'react/react-in-jsx-scope': 2,
  // Enforce ES5 or ES6 class for React Components
  'react/prefer-es6-class': 0,
  // ?
  'react/require-extension': 0,
  // Enforce a defaultProps definition for every prop that is not a required prop
  'react/require-default-props': 0,
  // Enforce stateless components to be written as a pure function
  'react/prefer-stateless-function': 0,
  // Disallow missing displayName in a React component definition
  'react/display-name': 0,
  // Disallow undeclared variables in JSX
  'react/jsx-no-undef': [2, { allowGlobals: true }],
  // Enforce consistent usage of destructuring assignment of props, state, and context. Too large refactor
  'react/destructuring-assignment': 0,
  // Disallow missing parentheses around multiline JSX
  'react/jsx-wrap-multilines': 0,
  // Disallow when this.state is accessed within setState
  'react/no-access-state-in-setstate': 0,
  // Enforce closing tag location for multiline JSX. Conflit with other rules
  'react/jsx-closing-tag-location': 0,
  // Enforce class component state initialization style
  'react/state-in-constructor': [2, 'never'],
  // Enforces where React component static properties should be positioned
  'react/static-property-placement': [2, 'static public field'],
  // Disallow JSX prop spreading
  'react/jsx-props-no-spreading': 0,
  // Enforce JSX indentation
  'react/jsx-indent': 0,
  // This is not a security issue in REGARDS, as objects URL are stored database. Therefore, rendered files should be checked
  // as storage level (client network)
  // Disallow target="_blank" attribute without rel="noreferrer"
  'react/jsx-no-target-blank': 0,
  // Disallow declaring unused methods of component class
  'react/no-unused-class-component-methods': 1,
  // allow to create components during render. TODO: FIX
  'react/no-unstable-nested-components': 0,
  // don't enforce consistent function types for function components
  'react/function-component-definition': 0,

  /**
   * React perf rules configuration
   * See https://github.com/cvazac/eslint-plugin-react-perf/tree/master/docs/rules
   */
  // Prevent function as JSX prop values (jsx-no-new-function-as-prop)
  'react-perf/jsx-no-new-function-as-prop': 0,
  // Prevent {...} as JSX prop values
  'react-perf/jsx-no-new-object-as-prop': 0,
  // Prevent [...] as JSX prop values
  'react-perf/jsx-no-new-array-as-prop': 0,

  /**
   * Lodash rules configuration
   * See https://github.com/wix-incubator/eslint-plugin-lodash/tree/master/docs/rules
   */
  // For single method imports
  'lodash/import-scope': [2, 'method'],
  // Disable useless rule (_.noop instead of empty annonnymous function)
  'lodash/prefer-noop': 0,
  // This rule is not satisfying
  'lodash/prefer-lodash-method': 0,
  // We do not use lodash constants factory
  'lodash/prefer-constant': 0,
  // Not so readable
  'lodash/prop-shorthand': 0,
  // We prefer the explicit declaration
  'lodash/matches-prop-shorthand': 0,

  /**
   * Mocha rules configuration
   * See https://github.com/lo1tuma/eslint-plugin-mocha/tree/master/docs/rules
   */
  // Disallow exclusive tests
  'mocha/no-exclusive-tests': 2,
  // Enforce the number of top-level suites in a single file
  'mocha/max-top-level-suites': 2,
  // Enforces handling of callbacks for async tests
  'mocha/handle-done-callback': 2,
  // Disallow top-level hooks
  'mocha/no-top-level-hooks': 2,
  // Disallow returning in a test or hook function that uses a callback
  'mocha/no-return-and-callback': 2,
  // Disallow duplicate uses of a hook at the same level inside a suite
  'mocha/no-sibling-hooks': 2,
  // Disallow global tests
  'mocha/no-global-tests': 2,
  // Disallow hooks for a single test or test suite. All React tests contains before and after whether having 1 or more tests
  'mocha/no-hooks-for-single-case': 0,
  // Disallow arrow functions as arguments to mocha functions
  'mocha/no-mocha-arrows': 0,
  // Disallow tests to be nested within other tests. We do not use mocha context so we can use lambdas
  'mocha/no-nested-tests': 2,
  // ?
  'mocha/no-skipped-tests': 2,
  // Disallow identical titles
  'mocha/no-identical-title': 2,
  // Disallow synchronous tests. We wrote sync tests
  'mocha/no-synchronous-tests': 0,

  /**
   * Promise rules configuration
   * See https://github.com/eslint-community/eslint-plugin-promise/tree/main/docs/rules
   */
  // We call done from Mocha inside async tests
  'promise/no-callback-in-promise': 0,
  // Rule is not adequate without async / await
  'promise/no-nesting': 0,
  // This is handy to create custom promises!
  'promise/avoid-new': 0,
  // We do not always return a promise on react component since most of the time nobody consumes them
  'promise/catch-or-return': 0,
  'promise/always-return': 0,

  /**
   * Jsx ally rules configuration
   * See https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/docs/rules
   */
  // Disabling inaccurate jsx ally rules for REGARDS
  'jsx-a11y/anchor-is-valid': 0,
  // Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user interface
  'jsx-a11y/no-noninteractive-element-interactions': 0,
  // Enforce onmouseover/onmouseout are accompanied by onfocus/onblur
  'jsx-a11y/mouse-events-have-key-events': 0,
  // Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress
  'jsx-a11y/click-events-have-key-events': 0,
  // Static HTML elements do not have semantic meaning
  'jsx-a11y/no-static-element-interactions': 0,
  // Enforce label tags have associated control
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
    'import',
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
