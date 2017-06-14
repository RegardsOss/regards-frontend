/**
 * Webpack configuration file
 * Override the default dev configuration in order to run the app with the Regards pre-production backend.
 */
const DefaultDevConfig = require('./webpack.dev.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge(DefaultDevConfig, {
  plugins: [
    new webpack.DefinePlugin({
      GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.107:9030'),
      NODE_ENV: JSON.stringify('preproduction'),
    }),
  ],
})
