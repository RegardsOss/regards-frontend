const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const StatsPlugin = require('stats-webpack-plugin')
const path = require('path')
const alias = require('../utils/alias')

module.exports = function (projectContextPath, mode) {
  // Ensure babel environment variable is correctly setup to development - will be rewrite if production is called
  process.env.NODE_ENV = 'development'

  return {
    resolve: {
      // Automaticaly get extensions files from javascript code with import or require.
      // exemple require('main') look for main, main.js or main.jsx with our configuration
      extensions: ['.js', '.jsx'],
      modules: [
        'node_modules',
      ],
      alias: alias(projectContextPath, 'dev'),
    },
    devtool: mode === 'dev' ? 'source-map' : 'cheap-source-map',
    output: {
      filename: '[name].bundle.js',
      // The name of the global variable which the library's
      // require() function will be assigned to
      library: '[name]',
      // Webpack main bundle file name
      publicPath: '/',
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
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
          ],
        },
        {
          test: /\.(jpg|gif|png)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'img/',
          },
        },
        {
          test: /\.html/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'html/',
          },
        },
        {
          test: /\.woff$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          },
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
      // That's during the coresoss compilation that our app export a single CSS file
      new MiniCssExtractPlugin({ filename: 'css/coreoss.styles.css' }),
      // new StatsPlugin(`../../reports/dll-${Date.now()}-profile.json`, {
      //   chunkModules: true,
      // }),
    ],
  }
}
