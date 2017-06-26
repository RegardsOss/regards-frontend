/**
 * Webpack configuration file
 * Override the default dev configuration in order to run the app with the Regards pre-production backend.
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
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:9030'),
      }),
    ],
  })
  .get()

module.exports = conf