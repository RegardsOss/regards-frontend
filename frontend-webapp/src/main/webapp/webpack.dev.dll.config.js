
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
    pathToDelete: 'dist/dev'
  })
  .merge({
    output: {
      path: `${__dirname}/dist/dev/`
    },
    entry: {
      core: [
        'chart.js',
        'flux-standard-action',
        'gsap',
        'immutable',
        'isomorphic-fetch',
        'lodash',
        'material-ui',
        'moment',
        'normalizr',
        'react',
        'react-chartjs-2',
        'react-dnd',
        'react-dnd-html5-backend',
        'react-dom',
        'react-infinite',
        'react-intl',
        'react-redux',
        'react-responsive',
        'react-resizable',
        'react-router',
        'react-tap-event-plugin',
        'redux',
        'redux-api-middleware',
        'redux-form',
        'redux-form-material-ui',
        'redux-logger',
        'redux-thunk',
        'scriptjs',
        'window-or-global',
        'fixed-data-table-2'
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new webpack.DllPlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        path: `${__dirname}/dist/dev/[name]-manifest.json`,
        // The name of the global variable which the library's
        // require function has been assigned to. This must match the
        // output.library option above
        name: '[name]',
      }),
    ],
  })
  .get()

module.exports = conf