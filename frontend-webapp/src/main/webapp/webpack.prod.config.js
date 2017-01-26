// Webpack configuration file
const CommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


let config = CommonConfig

config = merge(config, {
  output: {
    // Webpack compilation directory
    path: `${__dirname}/build`,
    // Webpack main bundle file name
    filename: 'bundle.js',
    // Webpack chunks files namesc
    chunkFilename: '[id].chunck.js',
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
      manifest: require(`${__dirname}/build/core-manifest.json`),
      context: __dirname
    }),
    // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
    new webpack.optimize.DedupePlugin(),
    // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
    new webpack.optimize.AggressiveMergingPlugin(),
    // Minimize all JavaScript output of chunks
    new webpack.optimize.UglifyJsPlugin({
      // Do not generate source map files (this are usefull during developpment)
      sourceMap: false,
      compress: {
        // Remove warnings generated during compilation
        warnings: false,
      },
    }),
    // Makes a module available as a variable in every module
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new webpack.BannerPlugin("Copyright CNES"),
    // Define environment variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52:8000'),
    }),
  ],
})

module.exports = config
