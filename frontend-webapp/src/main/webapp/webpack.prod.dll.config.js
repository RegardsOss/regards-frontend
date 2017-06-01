const CommonDllConfig = require('./webpack.dll.config')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

CommonDllConfig.output.path = `${__dirname}/dist/prod/`

CommonDllConfig.plugins.push(
  new webpack.DllPlugin({
    // The path to the manifest file which maps between
    // modules included in a bundle and the internal IDs
    // within that bundle
    path: `${__dirname}/dist/prod/[name]-manifest.json`,
    // The name of the global variable which the library's
    // require function has been assigned to. This must match the
    // output.library option above
    name: '[name]',
  })
)

CommonDllConfig.plugins.push(
  // Remove the build folder before building
  new CleanWebpackPlugin(['dist/prod'], {
    root: __dirname,
    verbose: false,
    dry: false,
  })
)
CommonDllConfig.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production')
    }
  })
)
CommonDllConfig.plugins.push(
  // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
  new webpack.optimize.AggressiveMergingPlugin()
)
CommonDllConfig.plugins.push(
  new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 })
)
CommonDllConfig.plugins.push(
  // Minimize all JavaScript output of chunks
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true, // React doesn't support IE8
      warnings: false,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
    // Do not generate source map files (this is usefull during developpment)
    sourceMap: false,
  }))
CommonDllConfig.plugins.push(
  new webpack.BannerPlugin('Copyright CNES')
)

CommonDllConfig.entry.core = [
  'flux-standard-action',
  'immutable',
  'isomorphic-fetch',
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

module.exports = CommonDllConfig
