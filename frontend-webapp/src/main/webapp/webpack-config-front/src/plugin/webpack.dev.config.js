const webpack = require('webpack')
const merge = require('webpack-merge')
const getCommonConfig = require('./webpack.common.config')


module.exports = function (projectContextPath) {

  let config = getCommonConfig(projectContextPath, 'dev')

  return merge(config, {
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
        'process.env': {
          NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require(`${projectContextPath}/../../../dist/dev/core-manifest.json`),
        context: projectContextPath,
      })
    ],
  })
}