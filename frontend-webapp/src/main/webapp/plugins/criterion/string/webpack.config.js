/**
 * LICENSE_PLACEHOLDER
 **/
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var path = require('path')

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
  output: {
    path: __dirname + '/target/build',
    filename: "plugin.js"
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
  module: {
    loaders: [
      // Transpile ES6 Javascript into ES5 with babel loader
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /json/],
        loader: 'babel',
      },
    ],
  },
  eslint: {
    failOnWarning: false,
    failOnError: false,
    emitWarning: true,
    fix: true,
  },
};
