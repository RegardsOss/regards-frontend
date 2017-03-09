const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
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
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.jsx with our configuration
    extensions: ['.js', '.jsx'],
    modules: [
      // Root directories from wich requires are made
      path.join(__dirname),
      'web_modules',
      'node_modules'
    ],
  },
  module: {
    /*
    preLoaders: [{
      test: /\.jsx?$/,
      loader: 'eslint-loader',
      exclude: [/node_modules/, /json/, /\/\..*!/],
    }],*/
    rules: [
      // Transpile ES6 Javascript into ES5 with babel loader
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /json/],
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
      },
      {
        test: /\.jpg$/,
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
        loader: 'file-loader?name=[name].[ext]',
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        query: { mimetype: 'image/png' },
      },
    ],
  },
  plugins: [
    // Allow to define React as a global variable for JSX.
    new webpack.ProvidePlugin({ React: 'react' }),
    // Create a single css file for the whole application instead of setting css inline in the javascript
    new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),
    new webpack.DefinePlugin({
      API_URL: JSON.stringify('api/v1'),
    }),
  ],
}
