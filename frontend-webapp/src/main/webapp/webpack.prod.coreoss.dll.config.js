const path = require('path')
const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'dll',
    projectContextPath: __dirname
  })
  .addProductionPlugins()
  .merge({
    output: {
      path:  `${__dirname}/dist/prod/`
    },
    entry: {
      coreoss: [
        '@regardsoss/adapters',
        '@regardsoss/api',
        '@regardsoss/authentication-manager',
        '@regardsoss/client',
        '@regardsoss/components',
        '@regardsoss/display-control',
        '@regardsoss/endpoints-common',
        '@regardsoss/form-utils',
        '@regardsoss/global-system-error',
        '@regardsoss/i18n',
        '@regardsoss/model',
        '@regardsoss/plugins',
        '@regardsoss/redux',
        '@regardsoss/store',
        '@regardsoss/store-utils',
        '@regardsoss/theme',
        '@regardsoss/user',
        '@regardsoss/vendors',
      ],
    },
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${__dirname}/dist/prod/core-manifest.json`),
        context: __dirname,
      }),
      new webpack.DllPlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        path: `${__dirname}/dist/prod/[name]-manifest.json`,
        // The name of the global variable which the library's
        // require function has been assigned to. This must match the
        // output.library option above
        name: '[name]',
      }),
    ],
  })
  .get()

module.exports = conf