const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    coreoss: [
      '@regardsoss/adapters',
      '@regardsoss/api',
      '@regardsoss/authentication-manager',
      '@regardsoss/client',
      '@regardsoss/components',
      '@regardsoss/display-control',
      '@regardsoss/endpoint',
      '@regardsoss/form-utils',
      '@regardsoss/global-system-error',
      '@regardsoss/i18n',
      '@regardsoss/model',
      '@regardsoss/plugins',
      '@regardsoss/redux',
      '@regardsoss/store',
      '@regardsoss/store-utils',
      '@regardsoss/theme',
      '@regardsoss/user',
      '@regardsoss/vendors',
    ],
  },
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.jsx with our configuration
    extensions: ['.js', '.jsx'],
    modules: [
      'node_modules',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]',
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
    ],
  },
  plugins: [
    // Allow to define React as a global variable for JSX.
    new webpack.ProvidePlugin({ React: 'react' }),
    // Create a single css file for the whole application instead of setting css inline in the javascript
    new ExtractTextPlugin({ filename: 'css/styles.css', disable: false, allChunks: true }),
  ],
}
