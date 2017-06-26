const path = require('path')
const webpackConfigurator = require('@regardsoss/webpack-config-front')

// Setup babel coverage environment
process.env.NODE_ENV = 'coverage'

const conf = webpackConfigurator
  .generateConfig({
    mode: 'test',
    projectContextPath: __dirname
  })
  .get()

module.exports = conf