'use strict'
/**
 * LICENSE_PLACEHOLDER
 **/


var allRules = {
  // eslint rules configuration
  // Allow annonymous functions
  "func-names": 0,
  "global-require": 0,
  "max-len": 0,
  "no-console": 0,
  // ignore unused variable on functions arguments
  "no-unused-vars": [ 2, { "args": "none" } ],
  "no-confusing-arrow": 0,
  "semi": [
    "error",
    "never"
  ],

  // Airbnb rules configuration
  "import/no-extraneous-dependencies": 0,
  "import/no-named-as-default": 0,
  "import/no-named-as-default-member": 0,

  // React rules configuration
  "react/jsx-uses-react": 2,
  "react/jsx-uses-vars": 2,
  "react/react-in-jsx-scope": 2,
  "react/prefer-es6-class": 0,
  "react/require-extension": 0,
  "react/require-default-props": 0,
  "react/prefer-stateless-function": 0,

  // Lodash rules configuration
  "lodash/import-scope": [ 2, "method" ],
  // Disable useless rule (_.noop instead of empty annonnymous function)
  "lodash/prefer-noop": 0,
  // This rule is not satisfying
  "lodash/prefer-lodash-method": 0,
  // We do not use lodash constants factory
  "lodash/prefer-constant": 0,
  // Not so lisible
  "lodash/prop-shorthand": 0,
  // We prefer the explicit declaration
  "lodash/matches-prop-shorthand": 0,

  // Mocha rules configuration
  // See https://github.com/lo1tuma/eslint-plugin-mocha/tree/master/docs/rules
  "mocha/no-exclusive-tests": 2,
  "mocha/max-top-level-suites": 2,
  "mocha/handle-done-callback": 2,
  "mocha/no-top-level-hooks": 2,
  "mocha/no-return-and-callback": 2,
  "mocha/no-sibling-hooks": 2,
  "mocha/no-global-tests": 2,
  // All React tests contains before and after whether having 1 or more tests
  "mocha/no-hooks-for-single-case": 0,
  "mocha/no-mocha-arrows": 0,
  // We do not use mocha context so we can use lambdas
  "mocha/no-nested-tests": 2,
  "mocha/no-skipped-tests": 2,
  "mocha/no-identical-title": 2,
  // We wrote sync tests
  "mocha/no-synchronous-tests": 0,

  // Promise rules configuration
  // We call done from Mocha inside async tests
  "promise/no-callback-in-promise": 0,
  // Rule is not adequate without async / await
  "promise/no-nesting": 0,
  // This is handy to create custom promises!
  "promise/avoid-new": 0,
  // We do not always return a promise on react component since most of the time nobody consumes them
  "promise/catch-or-return": 0,
  "promise/always-return": 0
}

module.exports = {
  extends: [
    "eslint:recommended",
    "airbnb",
    "plugin:react/recommended",
    "plugin:react-perf/all",
    "plugin:lodash/recommended",
    "plugin:promise/recommended"
  ],
  plugins: [
    "react",
    "lodash",
    "mocha",
    "promise",
    "react-perf"
  ],
  env: {
    "browser": true,
    "mocha": true,
    "node": true,
    "es6": true,
    "commonjs": true
  },
  globals: {
    "React": true,
    "PropTypes": true,
  },
  parserOptions: {
    "ecmaVersion": 6,
    "sourceType": "module"
  },
  rules: allRules
}