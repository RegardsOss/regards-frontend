// Webpack configuration file
const CommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

let config = CommonConfig
config.plugins = [];
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
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // Do not generate source map files (this are usefull during developpment)
      sourceMap: false,
      compress: {
        // Remove warnings generated during compilation
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52:8000'),
    }),
  ],
})

module.exports = config
