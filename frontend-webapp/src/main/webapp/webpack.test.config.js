const path = require('path')
const webpackConfigurator = require('@regardsoss/webpack-config-front')

const conf = webpackConfigurator
  .generateConfig({
    mode: 'test',
    projectContextPath: __dirname
  })
  .get()

module.exports = conf