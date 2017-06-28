const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Hide stats information from children during webpack compilation
  stats: { children: false },
  // Webpack working directory
  context: __dirname,
  // Javascript main entry
  entry: './src/main.js',
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  output: {
    path: __dirname + '/target/build',
    filename: 'plugin.js',
  },
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.jsx with our configuration
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // Transpile ES6 Javascript into ES5 with babel loader
      {
        test: /\.jsx?$/,
        // Exclude the DLL folder build from the transpilation
        exclude: [/node_modules/, /dist/],
        // used to cache the results of the loader.
        // Next builds will attempt to read from the cache
        // the cache is different depending of the value of NODE_ENV
        loader: 'babel-loader?cacheDirectory',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.(jpg|gif|png)$/,
        loader: 'file-loader?name=[name].[ext]&outputPath=./img/',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?name=/img/[name].[ext]&limit=10000&minetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=/img/[name].[ext]',
      },
      {
        test: /\.html/,
        loader: 'file-loader?name=/html/[name].[ext]'
      },
    ],
  },
  plugins: [
    // Allow to define React as a global variable for JSX.
    new webpack.ProvidePlugin({
      React: 'react',
      PropTypes: 'prop-types',
    }),
    // Create a single css file for the whole application instead of setting css inline in the javascript
    new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
      minChunkSize: 10000000
    })
  ],
}