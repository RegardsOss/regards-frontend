const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const getCommonConfig = require('./webpack.common.config')
// load the static configuration variables
require('../conf/staticConfiguration')

module.exports = function (projectContextPath) {
  const config = getCommonConfig(projectContextPath, 'test')

  // Ensure babel environment variable is correctly setup to test
  process.env.NODE_ENV = 'test'

  return merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({
      // this WILL include `*regardsoss*` in the bundle
      whitelist: [/regardsoss/, /react-material-color-picker/],
    })], // in order to ignore all modules in node_modules folder
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'nosources-source-map',
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
    module: {
      noParse: [
        /sinon/,
        /iconv-loader/,
        /enzyme/,
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('test'),
        },
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
        API_URL: JSON.stringify('/api/v1/'),
        STATIC_CONF: JSON.stringify(STATIC_CONF),
      }),
    ],
    // enable sourcemaps support
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },

  })
}
