const webpack = require('webpack')
const merge = require('./merge')


// Remove the a folder before building
module.exports = function (oldConf) {
  return merge(oldConf, {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
      // Minimize all JavaScript output of chunks
      /*
      DESACTIVATED FOR REGARDS V1
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
      new webpack.BannerPlugin('Copyright CNES')
    ],
  })
}



