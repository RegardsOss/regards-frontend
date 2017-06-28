const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'prod',
    projectContextPath: __dirname
  })
  .addProductionPlugins()
  .get()

module.exports = conf