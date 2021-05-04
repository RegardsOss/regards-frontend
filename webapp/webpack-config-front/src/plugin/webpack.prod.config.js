const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
// const StatsPlugin = require('stats-webpack-plugin')
const getCommonConfig = require('./webpack.common.config')


module.exports = function (projectContextPath, frontendWebappPath) {
  const config = getCommonConfig(projectContextPath, 'prod')

  // Ensure babel environment variable is correctly setup to production
  process.env.NODE_ENV = 'production'

  return merge(config, {
    plugins: [
      // Use the DLL every times your plugin depends of something that is already in the DLL
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require('../../dist/core-manifest.json'),
        context: projectContextPath,
      }),
      // Use the DLL for all RegardsOss dependencies
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        // RegardsOSS node_modules
        // eslint-disable-next-line import/no-dynamic-require
        manifest: require('../../dist/core-manifest.json'),
        context: path.join(projectContextPath, '/../../../'),
      }),
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        manifest: require('../../dist/coreoss-manifest.json'),
        context: path.join(projectContextPath, frontendWebappPath),
      }),
      // new StatsPlugin(`../prod-plugins-${Date.now()}-profile.json`, {
      //   chunkModules: true,
      // }),
    ],
  })
}
