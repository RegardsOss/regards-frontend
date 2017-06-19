/**
 * LICENSE_PLACEHOLDER
 **/
const CommonConfig = require('./webpack.common.config')
const webpack = require('webpack')
const merge = require('webpack-merge')

let config = CommonConfig

config = merge(config, {
  plugins: [
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/../../../dist/prod/core-manifest.json`),
      context: __dirname,
    }),
    new webpack.DllReferencePlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      manifest: require(`${__dirname}/../../../dist/prod/coreoss-manifest.json`),
      context: __dirname,
    }),
  ],
})

module.exports = config
