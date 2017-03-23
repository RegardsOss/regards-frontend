const CommonDllConfig = require('./webpack.dll.config')
const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

CommonDllConfig.output.path= 'dist/prod/'

CommonDllConfig.entry = {
  'core': ["flux-standard-action", "immutable", "isomorphic-fetch", "normalizr", "react", "react-dnd", "react-dnd-html5-backend", "react-dom", "react-intl", "react-redux", "react-resizable", "react-router", "react-tap-event-plugin", "redux", "redux-api-middleware", "redux-form", "redux-logger", "redux-thunk", "window-or-global"],
}

CommonDllConfig.plugins = [
  new webpack.DllPlugin({
    // The path to the manifest file which maps between
    // modules included in a bundle and the internal IDs
    // within that bundle
    path: 'dist/prod/[name]-manifest.json',
    // The name of the global variable which the library's
    // require function has been assigned to. This must match the
    // output.library option above
    name: '[name]',
  }),
  // Remove the build folder before building
  new CleanWebpackPlugin(['dist/prod'], {
    root: __dirname,
    verbose: false,
    dry: false,
  }),
]

module.exports = CommonDllConfig
