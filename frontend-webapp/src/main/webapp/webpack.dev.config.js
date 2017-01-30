// Webpack configuration file
const CommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HappyPack = require('happypack');

let config = CommonConfig

// Replace the default loaders to use happypack
config.module.loaders[0] = {
  test: /\.jsx?$/,
  exclude: [/node_modules/, /json/, /\.tmp/],
  loader: 'happypack/loader'
}

config = merge(config, {
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'cheap-module-eval-source-map',
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
      children: false,
      colors: true,
    },
    // Web directory serve by the webpack dev server
    contentBase: './build',
    // ??? Without this there is no hot replacement during developpment
    inline: true,
    // inline: true,
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
      context: __dirname
    }),
    // Allow to define React as a global variable for JSX.
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // HappyPack makes webpack builds faster by allowing you to transform multiple files in parallel.
    new HappyPack({
      loaders: ['babel'],
      threads: 4,
      tempDir: '.tmp/.happypack/',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
})

module.exports = config
