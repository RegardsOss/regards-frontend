const webpackConfigurator = require('@regardsoss/webpack-config-front')
const webpack = require('webpack')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'prod',
    projectContextPath: __dirname
  })
  .get()

module.exports = conf