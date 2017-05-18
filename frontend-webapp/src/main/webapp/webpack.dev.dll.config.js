const CommonDllConfig = require('./webpack.dll.config')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

CommonDllConfig.output.path = `${__dirname}/dist/dev/`

CommonDllConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  })
)
CommonDllConfig.plugins.push(
  new webpack.DllPlugin({
    // The path to the manifest file which maps between
    // modules included in a bundle and the internal IDs
    // within that bundle
    path: `${__dirname}/dist/dev/[name]-manifest.json`,
    // The name of the global variable which the library's
    // require function has been assigned to. This must match the
    // output.library option above
    name: '[name]',
  })
)
CommonDllConfig.plugins.push(
  // Remove the build folder before building
  new CleanWebpackPlugin(['dist/dev'], {
    root: __dirname,
    verbose: false,
    dry: false,
  })
)

CommonDllConfig.entry.core = [
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
  'fixed-data-table-2',
]
CommonDllConfig.devtool = 'source-map'

module.exports = CommonDllConfig
