/**
 * LICENSE_PLACEHOLDER
 **/
var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var path = require('path')

module.exports = {
  // Hide stats information from children during webpack compilation
  stats: {children: false},
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
    filename: "plugin.js"
  },
  resolve: {
    // Automaticaly get extensions files from javascript code with import or require.
    // exemple require('main') look for main, main.js or main.sass with our configuration
    // extensions: ['', '.js', '.scss'],
    extensions: ['', '.js', '.jsx'],
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
        exclude: [/node_modules/],
        loader: 'babel',
      }, {
        test: /\.json$/,
        exclude: [/node_modules/],
        loader: "json-loader",
      }

    ],
  },
  eslint: {
    failOnWarning: false,
    failOnError: false,
    emitWarning: true,
    fix: true,
  },
  plugins: [
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/../../../build/core-manifest.json`),
      context: __dirname
    }),
    // Search for equal or similar files and deduplicate them in the output. This comes with some overhead for the entry chunk, but can reduce file size effectively.
    new webpack.optimize.DedupePlugin(),
    // A plugin for a more aggressive chunk merging strategy. Even similar chunks are merged if the total size is reduced enough.
    new webpack.optimize.AggressiveMergingPlugin(),
    // Minimize all JavaScript output of chunks
    new webpack.optimize.UglifyJsPlugin({
      // Do not generate source map files (this are usefull during developpment)
      sourceMap: false,
      compress: {
        // Remove warnings generated during compilation
        warnings: false,
      },
    }),
    // Makes a module available as a variable in every module
    new webpack.ProvidePlugin({
      "React": "react",
    }),
    new webpack.BannerPlugin("Copyright CNES"),
    // Define environment variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      GATEWAY_HOSTNAME: JSON.stringify('http://172.26.47.52:8000'),
    }),
  ],
};
