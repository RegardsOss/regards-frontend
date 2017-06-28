const path = require('path')
const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'dll',
    projectContextPath: __dirname
  })
  .cleanFolder({
    projectContextPath: __dirname,
    pathToDelete: 'dist/prod'
  })
  .addProductionPlugins()
  .merge({
    output: {
      path:  `${__dirname}/dist/prod/`
    },
    entry: {
      core: [
        'flux-standard-action',
        'immutable',
        'isomorphic-fetch',
        'material-ui',
        'normalizr',
        'react',
        'react-dnd',
        'react-dnd-html5-backend',
        'react-dom',
        'react-intl',
        'react-redux',
        'react-resizable',
        'react-router',
        'react-tap-event-plugin',
        'redux',
        'redux-api-middleware',
        'redux-form',
        'redux-logger',
        'redux-thunk',
        'window-or-global',
      ]
    },
    plugins: [
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