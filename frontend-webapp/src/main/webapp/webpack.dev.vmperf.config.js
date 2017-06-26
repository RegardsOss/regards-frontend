/**
 * Webpack configuration file
 * Override the default dev configuration in order to run the app with the Regards continuous integration backend on VM perf.
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
        GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52:9030'),
      }),
    ],
  })
  .get()

module.exports = conf