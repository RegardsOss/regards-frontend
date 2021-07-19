const webpack = require('webpack')
const merge = require('./merge')

// Common config when running with test runner
module.exports = function (oldConf, mode) {
  return merge(oldConf, {
    // Enable default tools available during development
    mode: 'development',
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
    // enable sourcemaps support
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
    // reset the node env value to mode (test or coverage)
    optimization: {
      nodeEnv: mode,
    },
  })
}
