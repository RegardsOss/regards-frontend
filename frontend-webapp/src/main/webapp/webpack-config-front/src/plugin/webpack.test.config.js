const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const getCommonConfig = require('./webpack.common.config')

module.exports = function (projectContextPath) {

  let config = getCommonConfig(projectContextPath)

  return merge(config, {
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'inline-source-map',
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
    module: {
      noParse: [
        /sinon/,
        /iconv-loader/,
        /enzyme/,
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('test'),
        },
        GATEWAY_HOSTNAME: JSON.stringify('http://localhost:8000'),
      }),
    ], // enable sourcemaps support
    output: {
      devtoolModuleFilenameTemplate: '[absolute-resource-path]',
      devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]',
    },
  })
}
