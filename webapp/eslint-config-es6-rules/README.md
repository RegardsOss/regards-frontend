# eslint-config-es6-rules

This package provides regards's .eslintrc as an extensible shared config.

## Usage

We export here under ESLint configurations for your usage.

| rules package        | import mode   | comment                                         |
| -------------------- | ------------- | ----------------------------------------------- |
| eslint               | `recommended` | Standard Javascript rules provided by eslint    | 
| eslint-config-airbnb |      `all`    | Additional standard and ES6 Javascript rules    |
| plugin:react         | `recommended` | Specific rules for react library                |
| plugin:react-perf    | `recommended` | Specific good practices rules for react library |
| plugin:lodash        | `recommended` | Specific rules for lodash library               |
| plugin:promise       | `recommended` | Enforce best practices for JavaScript promises  |
 
To use our configuration package add te code here under to your .eslintrc configuration file

```json
{
   "extends": [
       "@regardsoss/eslint-config-es6-rules"
    ]
}
```

You need to add dependencies to your package.json : 
```json
{
    "eslint": "~8.57.1", // We cannot upgrade to 9+ since node 18+ is needed
    "eslint-config-airbnb": "~19.0.4",
    "eslint-plugin-import": "~2.29.1",
    "eslint-plugin-jsx-a11y": "~6.8.0",
    "eslint-plugin-lodash": "~7.4.0",
    "eslint-plugin-mocha": "~10.3.0",
    "eslint-plugin-promise": "~6.1.1",
    "eslint-plugin-react": "~7.34.0",
    "eslint-plugin-react-perf": "~3.3.2"
}
```

### Imported rules

In the next sections you can find for each rules package the custom configuration made for REGARDS project.
By default, all rules are imported without modification from each package the references rules here are disabled or modified.

#### eslint rules

 To see all javascript rules set by eslint : https://eslint.org/docs/v8.x/rules
 
 Special configuration for eslint rules :
 
 | rule                                  | Configuration | comment                                                                                                           |
 | ------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------- |
 | func-names                            | `Disabled`    | Allow annonymous functions                                                                                        |
 | global-require                        | `Disabled`    | Require require() calls to be placed at top-level module scope                                                    |
 | camelCase                             | `Disabled`    | Enforce camelcase naming convention                                                                               |
 | max-len                               | `Disabled`    | Enforce a maximum line length                                                                                     |
 | no-console                            | `Disabled`    | Disallow the use of console                                                                                       |
 | spaced-comment                        | `Disabled`    | Enforce consistent spacing after the `//` or `/*` in a comment                                                    |
 | no-unused-vars                        | `Activated`   | Do not check arguments. Ignore unused variable on functions arguments                                             |
 | no-confusing-arrow                    | `Disabled`    | Disallow arrow functions where they could be confused with comparisons                                            |
 | no-warning-comments                   | `Activated`   | Raise a warning if a TODO or FIXME is find in comments                                                            |
 | no-mixed-operators                    | `Activated`   | Disallow mixed binary operators                                                                                   |
 | prefer-destructuring                  | `Activated`   | Require destructuring from arrays and/or objects                                                                  |
 | function-paren-newline                | `Disabled`    | Enforce consistent line breaks inside function parenthesess                                                       |
 | jsx-a11y/control-has-associated-label | `Disabled`    | Enforce consistent line breaks inside function parenthesess                                                       |
 | function-call-argument-newline        | `Disabled`    | Enforce line breaks between arguments of a function call                                                          |
 | operator-linebreak                    | `Disabled`    | Enforce consistent linebreak style for operators                                                                  |
 | default-param-last                    | `Disabled`    | Enforce default parameters to be last                                                                             |
 | no-promise-executor-return            | `Disabled`    | Disallow returning values from Promise executor functions                                                         |
 | prefer-regex-literals                 | `Disabled`    | Disallow use of the RegExp constructor in favor of regular expression literals                                    |
 | no-use-before-define                  | `Disabled`    | Disallow the use of variables before they are defined                                                             |
 | semi                                  | `Activated`   | Disallows semicolons as the end of statements (except to disambiguate statements beginning with [, (, /, +, or -) |
 
#### plugin:import
 
To see all javascript rules set by plugin:import : https://github.com/import-js/eslint-plugin-import/tree/main/docs/rules
 
Special configuration for eslint-config-airbnb rules :
  
  | rule                              | Configuration | comment                                                                                                              |
  | --------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
  | import/no-extraneous-dependencies | `Disabled`    | Forbid the import of external modules that are not declared in the package.json's dependencies, devDependencies, optionalDependencies, peerDependencies, or bundledDependencies |
  | import/no-named-as-default        | `Disabled`    | Reports use of an exported name as the locally imported name of a default export                                     |
  | import/no-named-as-default-member | `Disabled`    | Reports use of an exported name as a property on the default export                                                  |
  | import/prefer-default-export      | `Disabled`    | In exporting files, this rule checks if there is default export or not                                               |
  | import/named                      | `Disabled`    | Verifies that all named imports are part of the set of named exports in the referenced module                        |
  | import/no-commonjs                | `Activated`   | Reports require([string]) function calls. Will not report if >1 argument, or single argument is not a literal string |
  | import/no-self-import             | `Activated`   | Forbid a module from importing itself. This can sometimes happen during refactoring                                  |
  | import/no-cycle                   | `Activated`   | Ensures that there is no resolvable path back to this module via its dependencies                                    |

#### plugin:react

To see all javascript rules set by plugin:react : https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules

Special configuration for plugin:react rules :

  | rule                                    | Configuration | comment                                                                                               |
  | --------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
  | react/jsx-uses-react                    | `Activated`   | Disallow React to be incorrectly marked as unused                                                     |
  | react/jsx-uses-vars                     | `Activated`   | Disallow variables used in JSX to be incorrectly marked as unused                                     |
  | react/react-in-jsx-scope                | `Activated`   | Disallow missing React when using JSX                                                                 |
  | react/prefer-es6-class                  | `Disabled`    | Enforce ES5 or ES6 class for React Components                                                         |
  | react/require-extension                 | `Disabled`    | ?                                                                                                     |
  | react/require-default-props             | `Disabled`    | Enforce a defaultProps definition for every prop that is not a required prop                          |
  | react/prefer-stateless-function         | `Disabled`    | Enforce stateless components to be written as a pure function                                         |
  | react/display-name                      | `Disabled`    | Disallow missing displayName in a React component definition                                          |
  | react/jsx-no-undef                      | `Activated`   | Disallow undeclared variables in JSX                                                                  |
  | react/destructuring-assignment          | `Disabled`    | Enforce consistent usage of destructuring assignment of props, state, and context. Too large refactor |
  | react/jsx-wrap-multilines               | `Disabled`    | Disallow missing parentheses around multiline JSX                                                     |
  | react/no-access-state-in-setstate       | `Disabled`    | Disallow when this.state is accessed within setState                                                  |
  | react/jsx-closing-tag-location          | `Disabled`    | Enforce closing tag location for multiline JSX. Conflit with other rules                              |
  | react/state-in-constructor              | `Activated`   | Enforce class component state initialization style                                                    |
  | react/static-property-placement         | `Activated`   | Enforces where React component static properties should be positioned                                 |
  | react/jsx-props-no-spreading            | `Disabled`    | Disallow JSX prop spreading                                                                           |
  | react/jsx-indent                        | `Disabled`    | Enforce JSX indentation                                                                               |
  | react/jsx-no-target-blank               | `Disabled`    | Disallow target="_blank" attribute without rel="noreferrer"                                           |
  | react/no-unused-class-component-methods | `Activated`   | Disallow declaring unused methods of component class                                                  |
  | react/no-unstable-nested-components     | `Disabled`    | Disallow creating unstable components inside components                                               |
  | react/function-component-definition     | `Disabled`    | Enforce a specific function type for function components                                              |

#### plugin:react-perf

To see all javascript rules set by plugin:react-perf : https://github.com/cvazac/eslint-plugin-react-perf/tree/master/docs/rules

Special configuration for plugin:react-perf rules :

  | rule                                   | Configuration | comment                                                           |
  | -------------------------------------- | ------------- | ----------------------------------------------------------------- |
  | react-perf/jsx-no-new-function-as-prop | `Disabled`    | Prevent function as JSX prop values (jsx-no-new-function-as-prop) |
  | react-perf/jsx-no-new-object-as-prop   | `Disabled`    | Prevent {...} as JSX prop values                                  |
  | react-perf/jsx-no-new-array-as-prop    | `Disabled`    | Prevent [...] as JSX prop values                                  |

#### plugin:lodash

To see all javascript rules set by plugin:lodash : https://github.com/wix-incubator/eslint-plugin-lodash/tree/master/docs/rules

Special configuration for plugin:lodash rules : 

  | rule                          | Configuration | comment                                                             |
  | ----------------------------- | ------------- | ------------------------------------------------------------------- |
  | lodash/import-scope           | `Activated`   | For single method imports                                           |
  | lodash/prefer-noop            | `Disabled`    | Disable useless rule (_.noop instead of empty annonnymous function) |
  | lodash/prefer-lodash-method   | `Disabled`    | This rule is not satisfying                                         |
  | lodash/prefer-constant        | `Disabled`    | We do not use lodash constants factory                              |
  | lodash/prop-shorthand         | `Disabled`    | Not so readable                                                     |
  | lodash/matches-prop-shorthand | `Disabled`    | We prefer the explicit declaration                                  |

#### plugin:mocha

To see all javascript rules set by plugin:mocha : https://github.com/lo1tuma/eslint-plugin-mocha/tree/master/docs/rules

Special configuration for plugin:promise rules : 

  | rule                           | Configuration | comment                                                            |
  | ------------------------------ | ------------- | ------------------------------------------------------------------ |
  | mocha/no-exclusive-tests       | `Activated`   | Disallow exclusive tests                                           |
  | mocha/max-top-level-suites     | `Activated`   | Enforce the number of top-level suites in a single file            |
  | mocha/handle-done-callback     | `Activated`   | Enforces handling of callbacks for async tests                     |
  | mocha/no-top-level-hooks       | `Activated`   | Disallow top-level hooks                                           |
  | mocha/no-return-and-callback   | `Activated`   | Disallow returning in a test or hook function that uses a callback |
  | mocha/no-sibling-hooks         | `Activated`   | Disallow duplicate uses of a hook at the same level inside a suite |
  | mocha/no-global-tests          | `Activated`   | Disallow global tests                                              |
  | mocha/no-hooks-for-single-case | `Disabled`    | Disallow hooks for a single test or test suite                     |
  | mocha/no-mocha-arrows          | `Disabled`    | Disallow arrow functions as arguments to mocha functions           |
  | mocha/no-nested-tests          | `Activated`   | Disallow tests to be nested within other tests                     |
  | mocha/no-skipped-tests         | `Activated`   | ?                                                                  |
  | mocha/no-identical-title       | `Activated`   | Disallow identical titles                                          |
  | mocha/no-synchronous-tests     | `Disabled`    | Disallow synchronous tests                                         |

#### plugin:promise

To see all javascript rules set by plugin:promise : https://github.com/eslint-community/eslint-plugin-promise/tree/main/docs/rules

Special configuration for plugin:promise rules : 

  | rule                           | Configuration | comment                                                                                          |
  | ------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
  | promise/no-callback-in-promise | `Disabled`    | Disallow calling cb() inside of a then(). We call done from Mocha inside async tests             |
  | promise/no-nesting             | `Disabled`    | Disallow nested then() or catch() statements. Rule is not adequate without async / await         |
  | promise/avoid-new              | `Disabled`    | Disallow creating new promises outside of utility libs. This is handy to create custom promises! |
  | promise/catch-or-return        | `Disabled`    | Enforce the use of catch() on un-returned promises                                               |
  | promise/always-return          | `Disabled`    | Require returning inside each then() to create readable and reusable Promise chains              |

#### plugin:jsx-a11y

To see all javascript rules set by plugin:jsx-ally : https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/docs/rules

Special configuration for plugin:promise rules : 

  | rule                                            | Configuration | comment                                                                                          |
  | ----------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------ |
  | jsx-a11y/anchor-is-valid                        | `Disabled`    | Disabling inaccurate jsx ally rules for REGARDS                                                  |
  | jsx-a11y/no-noninteractive-element-interactions | `Disabled`    | Non-interactive HTML elements and non-interactive ARIA roles indicate content and containers in the user interface |
  | jsx-a11y/mouse-events-have-key-events           | `Disabled`    | Enforce onmouseover/onmouseout are accompanied by onfocus/onblur                                 |
  | jsx-a11y/click-events-have-key-events           | `Disabled`    | Enforce onClick is accompanied by at least one of the following: onKeyUp, onKeyDown, onKeyPress  |
  | jsx-a11y/no-static-element-interactions         | `Disabled`    | Static HTML elements do not have semantic meaning                                                |
  | jsx-a11y/label-has-for                          | `Disabled`    | Enforce label tags have associated control                                                       |