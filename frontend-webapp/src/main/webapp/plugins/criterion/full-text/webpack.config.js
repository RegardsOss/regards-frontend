/**
 * LICENSE_PLACEHOLDER
 **/
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
    modules: [
      // Root directories from wich requires are made
      path.join(__dirname),
      'node_modules'
    ],
  },
  module: {
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
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/../../../dist/prod/core-manifest.json`),
      context: __dirname,
    }),
    // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
    new webpack.optimize.AggressiveMergingPlugin(),
    // Minimize all JavaScript output of chunks
    new webpack.optimize.UglifyJsPlugin(),
    // Makes a module available as a variable in every module
    new webpack.ProvidePlugin({ React: 'react' }),
    new webpack.BannerPlugin('Copyright CNES'),
    // Define environment variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52:8000'),
    }),
  ],
}
