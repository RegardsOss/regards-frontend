var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  context: __dirname + '/src/main/webapp',
  entry: './main.js',
  output: {
    path: __dirname + '/target/build',
    filename: "hw.js",
    chunkFilename: "[id].hw.chunck.js"
  },
  devServer: {
    contentBase: __dirname + '/target/build',
    inline: true,
    port: 3333,
    historyApiFallback: {
      rewrites: [{
        from: /\/(\d\.)?bundle\.js(\.map)?/,
        to: context => context.match[0]
      },{
        from: /\/(\d\.)?chunck\.js(\.map)?/,
        to: context => context.match[0]
      }]
    }
  },
  resolve: {
    root: [
      path.join(__dirname,"src/main/webapp"),
    ]
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: [/node_modules/,/json/],
        loader: 'babel', query: { presets: ['es2015', 'react']}
      },
      {test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'},
      {test: /\.json(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'}
    ]
  }
};
