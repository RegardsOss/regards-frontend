const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const getCommonConfig = require('./webpack.common.config')
const addTestConfig = require('../utils/addTestConfig')

// load the static configuration variables
require('../conf/staticConfiguration')

module.exports = function (projectContextPath) {

  let config = addTestConfig(getCommonConfig(projectContextPath, 'coverage'), 'coverage')

  config = merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    // Ignore all modules in node_modules folder
    externals: [nodeExternals({
      allowlist: [
        // this WILL include `*regardsoss*` in the bundle
        /regardsoss/,
        // this fix the test build dkw
        /redux-api-middleware/,
        // see resolve.alias
        /react-router/,
      ],
    })],
    resolve: {
      alias: {
        'react-router': path.resolve(projectContextPath, 'web_modules/utils/tests-helpers/src/ReactRouter.mock.jsx'),
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
        API_URL: JSON.stringify('api/v1'),
        STATIC_CONF: JSON.stringify(STATIC_CONF),
      }),
      // Define the fetch as a global var
      new webpack.ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
    ],
  })
  return config
}
