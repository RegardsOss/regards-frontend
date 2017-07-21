const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const getCommonConfig = require('./webpack.common.config')


module.exports = function (projectContextPath, frontendWebappPath) {

  let config = getCommonConfig(projectContextPath, 'prod')
  return merge(config, {
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`../../dist/core-manifest.json`),
        context: projectContextPath,
      }),
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`../../dist/coreoss-manifest.json`),
        context: path.join(projectContextPath, frontendWebappPath),
      }),
    ],
  })
}
