const webpack = require('webpack')
const { merge } = require('webpack-merge')
const addTestConfig = require('../utils/addTestConfig')
const getCommonConfig = require('./webpack.common.config')
// load the static configuration variables
require('../conf/staticConfiguration')

module.exports = function (projectContextPath) {
  const config = addTestConfig(getCommonConfig(projectContextPath, 'test'), 'test')

  // Strange workaround with mochapack
  delete config.output

  return merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
    plugins: [
      new webpack.DefinePlugin({
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
        API_URL: JSON.stringify('/api/v1/'),
        STATIC_CONF: JSON.stringify(STATIC_CONF),
      }),
      // Define the fetch as a global var
      new webpack.ProvidePlugin({
        fetch: 'isomorphic-fetch',
      }),
    ],
  })
}
