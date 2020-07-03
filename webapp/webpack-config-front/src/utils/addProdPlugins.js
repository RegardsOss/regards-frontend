const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const merge = require('./merge')

// Remove the a folder before building
module.exports = function (oldConf) {
  return merge(oldConf, {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
        CESIUM_BASE_URL: JSON.stringify("/"),
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
      // Minimize all JavaScript output of chunks
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
      new webpack.BannerPlugin('Copyright CNES'),
    ],
  })
}
