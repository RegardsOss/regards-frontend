/**
 * Webpack configuration file
 * Starts the frontend and configures it to run with the mock Json-Server backend.
 */
const DefaultDevConfig = require('./webpack.dev.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

module.exports = merge(DefaultDevConfig, {
  plugins: [
    new webpack.DefinePlugin({
      GATEWAY_HOSTNAME: JSON.stringify('http://10.11.1.1:3000'),
    }),
  ],
})
