const path = require('path')
const webpackConfigurator = require('@regardsoss/webpack-config-front')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'coverage',
    projectContextPath: __dirname
  })
  .get()

module.exports = conf