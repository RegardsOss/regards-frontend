const webpack = require('webpack')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  resolve: {
    modules: [
      'node_modules'
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: 'build/',
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'build/[name]-manifest.json',
      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]',
    }),
    // Remove the build folder before building
    new CleanWebpackPlugin(['build'], {
      root: __dirname,
      verbose: false,
      dry: false,
    }),
  ],
}
