/**
 * Webpack configuration file
 * Override the default dev configuration in order to run the app with the Regards continuous integration backend on VM perf.
 */
const DefaultDevConfig = require('./webpack.dev.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge(DefaultDevConfig, {
  plugins: [
    new webpack.DefinePlugin({
      GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52:9030'),
    }),
  ],
})
