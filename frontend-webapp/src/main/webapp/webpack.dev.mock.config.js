/**
 * Webpack configuration file
 * Starts the frontend and configures it to run with the mock Json-Server backend.
 */
const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'dev',
    projectContextPath: __dirname
  })
  .merge({
    plugins: [
      new webpack.DefinePlugin({
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:3000'),
      }),
    ],
  })
  .get()

module.exports = conf
