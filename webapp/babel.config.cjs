module.exports = function (api) {
  // Cache the returned value forever and don't call this function again.
  api.cache(false)
  return {
    presets: [
      '@babel/preset-react',
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      'add-module-exports',
      '@babel/plugin-syntax-dynamic-import',
    ],
    env: {
      coverage: { // coverage environment transforms
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
        ],
        plugins: [
          'istanbul',
        ],
      },
      development: {
        plugins: [
          // Remove code splitting
          'remove-webpack',
        ],
        // development environment transforms
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
                browsers: 'last 1 chrome version',
              },
            },
          ],
        ],
      },
      production: { // production environment transforms
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: [
                  'chrome >= 50',
                  'firefox >= 45',
                ],
              },
            },
          ],
        ],
      },
      test: { // test environment transforms
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
        ],
      },
    },
  }
}
