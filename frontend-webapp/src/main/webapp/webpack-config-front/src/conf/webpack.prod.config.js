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
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${projectContextPath}/dist/prod/core-manifest.json`),
        context: projectContextPath,
      }),
      // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
      // Minimize all JavaScript output of chunks
      /*
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
        // Do not generate source map files (this is usefull during developpment)
        sourceMap: false,
      }),*/
      new webpack.BannerPlugin('Copyright CNES'),
      // Define environment variables
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
    ],
  })
  return config
}