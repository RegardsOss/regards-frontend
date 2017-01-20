const autoprefixer = require('autoprefixer')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  // Hide stats information from children during webpack compilation
  stats: { children: false },
  // Webpack working directory
  context: __dirname,
  // Javascript main entry
  entry: './src/main.jsx',
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
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.sass with our configuration
    // extensions: ['', '.js', '.scss'],
    extensions: ['', '.js', '.jsx'],
    // Root directories from wich requires are made
    root: [
      path.join(__dirname),
    ],
    modulesDirectories: ['web_modules', 'node_modules'],
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
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
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
        exclude: [/node_modules/],
        loader: 'json-loader',
      },
      /*
      {
        test: /\.json$/,
        loader: 'file-loader?name=/json/[name].[ext]',
      },
      */
      {
        test: /\.html/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' },
      },
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
}
