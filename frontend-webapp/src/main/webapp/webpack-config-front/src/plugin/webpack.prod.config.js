const webpack = require('webpack')
const merge = require('webpack-merge')
const getCommonConfig = require('./webpack.common.config')


module.exports = function (projectContextPath) {

  let config = getCommonConfig(projectContextPath, 'prod')

  return merge(config, {
    plugins: [
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${projectContextPath}/../../../dist/prod/coreoss-manifest.json`),
        context: projectContextPath,
      }),
    ],
  })
}
