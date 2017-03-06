const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const CommonConfig = require('./webpack.common.config')

let config = CommonConfig

config = merge(config, {
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals({
    // this WILL include `*regardsoss*` in the bundle
    whitelist: [/regardsoss/, /react-material-color-picker/],
  })], // in order to ignore all modules in node_modules folder
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  verbose: true,
  displayErrorDetails: true,
  stats: {
    colors: true,
    reasons: true,
  },
  module: {
    noParse: [
      /sinon/,
      /iconv-loader/,
      /enzyme/,
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /json/, /test/, /vendors/],
        loaders: ['istanbul-instrumenter', 'babel'],
      },
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /json/],
        loaders: ['babel'],
      },
    ],
  },
  plugins: [
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/build/core-manifest.json`),
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('coverage'),
      },
      GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
      API_URL: JSON.stringify('/api/v1/'),
    }),
  ],
  // enable sourcemaps support
  output: {
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
  },
})

module.exports = config
