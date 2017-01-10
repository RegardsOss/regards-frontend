/**
 * LICENSE_PLACEHOLDER
 **/
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var path = require('path')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // Hide stats information from children during webpack compilation
  stats: { children: false },
  context: __dirname,
  // Javascript main entry
  entry: './main.js',
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
  },
  postcss: [
    // Plugin to Automaticaly add vendors prefix to css classes
    autoprefixer({
      browsers: ['last 2 versions'],
    }),
  ],
  output: {
    path: __dirname + '/target/build',
    filename: "plugin.js",
    chunkFilename: "[id].hw.chunck.js"
  },
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.sass with our configuration
    // extensions: ['', '.js', '.scss'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx'],
    // Root directories from wich requires are made
    root: [
      path.join(__dirname),
    ],
  },
  module: {/*
   preLoaders: [{
   test: /\.jsx?$/,
   loader: 'eslint-loader',
   exclude: [/node_modules/, /json/, /\/\..*!/],
   }],*/
    loaders: [
      // Transpile ES6 Javascript into ES5 with babel loader
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /json/],
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
      },
      {
        test: /\.json$/,
        exclude: [/node_modules/],
        loader: 'json-loader',
      },
      {
        test: /\.jpg$/,
        exclude: [/node_modules/],
        loader: 'file-loader?name=/img/[name].[ext]',
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
        test: /\.json$/,
        loader: 'file-loader?name=/json/[name].[ext]',
      },
      {
        test: /\.html/,
        loader: 'file?name=[name].[ext]',
      }
    ],
  },
  plugins: [
    // Create a single css file for the whole application instead of setting css inline in the javascript
    new ExtractTextPlugin('/css/styles.css', { allChunks: true })
  ],
  eslint: {
    failOnWarning: false,
    failOnError: false,
    emitWarning: true,
    fix: true,
  },
};
