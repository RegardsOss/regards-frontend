const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'pkg_test',
    projectContextPath: __dirname
  })
  .get()

module.exports = conf
