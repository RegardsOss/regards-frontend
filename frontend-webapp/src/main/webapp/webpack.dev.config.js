// Webpack configuration file
const CommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

let config = CommonConfig

config = merge(config, {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
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
  devServer: {
    stats: {
      assets: false,
      chunks: false,
      children: false,
      colors: true,
      hash: false,
      modules: false,
      source: false,
    },
    // Web directory serve by the webpack dev server
    contentBase: path.resolve(__dirname, 'build'),
    // ??? Without this there is no hot replacement during developpment
    inline: true,
    //Shows a full-screen overlay in the browser when there are compiler errors or warning
    overlay: {
      warnings: true,
      errors: true
    },
    port: 3333,
    // Enable rewrite urls for navigation routes generated by the router.
    // Necessary to fallback to root directory when attempt to load
    // webpack generated javascripts.
    historyApiFallback: {
      // Rewrite to get bundle.js
      rewrites: [{
        from: /\/bundle\.js(\.map)?/,
        to(context) {
          return context.match[0]
        },
      },
      ],
    },
    // Allow to expose plugins
    //publicPath: "/plugins/",
  },
  plugins: [
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/build/core-manifest.json`),
      context: __dirname,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
})

module.exports = config
