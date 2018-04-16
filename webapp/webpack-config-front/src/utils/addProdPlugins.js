const webpack = require('webpack')
const merge = require('./merge')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

// Remove the a folder before building
module.exports = function (oldConf) {
  return merge(oldConf, {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
      // Minimize all JavaScript output of chunks
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false, // remove comments
          },
          compress: {
            unused: true,
            dead_code: true, // big one--strip code that will never execute
            warnings: false, // good for prod apps so users can't peek behind curtain
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            drop_console: true, // strips console statements
            sequences: true,
            booleans: true,
          },
          // Do not generate source map files (this is usefull during developpment)
          sourceMap: false,
        },
      }),
      new webpack.BannerPlugin('Copyright CNES'),
    ],
  })
}
