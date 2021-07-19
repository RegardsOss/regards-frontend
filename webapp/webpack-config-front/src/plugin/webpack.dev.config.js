const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
// const StatsPlugin = require('stats-webpack-plugin')
const getCommonConfig = require('./webpack.common.config')

module.exports = function (projectContextPath) {
  const config = getCommonConfig(projectContextPath, 'dev')

  return merge(config, {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        API_URL: JSON.stringify('api/v1'),
      }),
      // Use the DLL every times your plugin depends of something that is already in the DLL
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        // eslint-disable-next-line import/no-dynamic-require
        manifest: require(`${projectContextPath}/../../../dist/dev/core-manifest.json`),
        context: projectContextPath,
      }),
      // Use the DLL for all RegardsOss dependencies
      new webpack.DllReferencePlugin({
        // The path to the manifest file which maps between
        // modules included in a bundle and the internal IDs
        // within that bundle
        // RegardsOSS node_modules
        // eslint-disable-next-line import/no-dynamic-require
        manifest: require(`${projectContextPath}/../../../dist/dev/core-manifest.json`),
        context: path.join(projectContextPath, '/../../../'),
      }),
      // new StatsPlugin(`../dev-plugins-${Date.now()}-profile.json`, {
      //   chunkModules: true,
      // }),
    ],
  })
}
