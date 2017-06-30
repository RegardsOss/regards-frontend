const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'pkg_build',
    projectContextPath: __dirname
  })
  .addProductionPlugins()
  .get()

module.exports = conf