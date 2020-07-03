// Webpack configuration file
const getCommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const StatsPlugin = require('stats-webpack-plugin')
const threadLoader = require('thread-loader')

module.exports = function (projectContextPath) {
  let config = getCommonConfig(projectContextPath, 'dev')
  // Prewarm pool thread
  threadLoader.warmup({}, ['babel-loader'])
  // Ensure babel environment variable is correctly setup to development
  process.env.NODE_ENV = 'development'

  config = merge(config, {
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    output: {
      // Webpack compilation directory
      path: `${projectContextPath}/dist/dev`, // Webpack main bundle file name
      filename: 'bundle.js', // Webpack chunks files namesc
      chunkFilename: '[id]-[chunkhash].chunck.js',
      publicPath: '/',
    },
    module: {
      noParse: [/node_modules\/sinon/, /node_modules\/nock/],
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
      contentBase: path.resolve(projectContextPath, 'dist', 'dev'), // ??? Without this there is no hot replacement during developpment
      inline: true, // Shows a full-screen overlay in the browser when there are compiler errors or warning
      overlay: {
        warnings: true,
        errors: true,
      },
      port: 3333,
      host: '0.0.0.0', // Enable rewrite urls for navigation routes generated by the router.
      // Necessary to fallback to root directory when attempt to load
      // webpack generated javascripts.
      historyApiFallback: {
        // Rewrite to get bundle.js
        rewrites: [{
          from: /\/bundle\.js(\.map)?/,
          to(context) {
            return context.match[0]
          },
        }],
      }, // Allow to expose plugins
      // publicPath: "/plugins/",
      // Opens webpack-dev-server to DNS rebinding attacks https://github.com/webpack/webpack-dev-server/issues/887
      // but allows any computer on your network to reach the frontend
      disableHostCheck: true,
    },
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        // eslint-disable-next-line import/no-dynamic-require
        manifest: require(`${projectContextPath}/dist/dev/core-manifest.json`),
        context: projectContextPath,
      }),
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
        CESIUM_BASE_URL: JSON.stringify("/"),
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
      new StatsPlugin(`../../reports/dev-${Date.now()}-profile.json`, {
        chunkModules: true,
      }),
    ],
  })
  return config
}
