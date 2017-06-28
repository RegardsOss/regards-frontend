// Webpack configuration file
const getCommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

module.exports = function (projectContextPath) {

  let config = getCommonConfig(projectContextPath)

  config = merge(config, {
    output: {
      // Webpack compilation directory
      path: `${projectContextPath}/dist/prod`,
      // Webpack main bundle file name
      filename: 'bundle.js',
      // Webpack chunks files namesc
      chunkFilename: '[id]-[chunkhash].chunck.js',
      publicPath: '/',
    },
    module: {
      noParse: [
        /node_modules\/sinon/,
        /node_modules\/nock/,
      ],
    },
    devtool: 'cheap-module-source-map',
    plugins: [
      // Add a DLL for npm dependencies
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${projectContextPath}/dist/prod/core-manifest.json`),
        context: projectContextPath,
      }),
      // Use our DLL (containing all our cross-usable modules)
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${projectContextPath}/dist/prod/coreoss-manifest.json`),
        context: projectContextPath,
      }),
    ],
  })
  return config
}