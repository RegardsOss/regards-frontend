const webpack = require('webpack')
const path = require('path')

module.exports = {
  resolve: {
    modules: [
      'node_modules'
    ],
  },
  output: {
    filename: '[name].bundle.js',
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]',
  }
}
