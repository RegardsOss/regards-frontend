const webpack = require('webpack')
const { merge } = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const getCommonConfig = require('./webpack.common.config')
// load the static configuration variables
require('../conf/staticConfiguration')

module.exports = function (projectContextPath) {
  // Ensure babel environment variable is correctly setup to coverage
  process.env.NODE_ENV = 'coverage'

  let config = getCommonConfig(projectContextPath, 'test')

  config = merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals({
      allowlist: [
        // this WILL include `*regardsoss*` in the bundle
        /regardsoss/,
        // this fix the test build dkw
        /redux-api-middleware/,
      ],
    })], // in order to ignore all modules in node_modules folder
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
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
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('coverage'),
        },
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
        API_URL: JSON.stringify('api/v1'),
        STATIC_CONF: JSON.stringify(STATIC_CONF),
      }),
      // Define the fetch as a global var
      new webpack.ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
    ],
    // enable sourcemaps support
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
    mode: 'development',
  })
  return config
}
