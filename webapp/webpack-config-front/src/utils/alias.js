const path = require('path')

// alias here are VERY UGLY FIX to avoid DLL to be corrupted by UMD dependencies that can't be runned by plugins
// If you import a dependency that is available for several platforms
// define here the hardpath to the commonjs package
module.exports = function (webappPath, mode) {

  const prodAlias = mode === 'prod' ? {
    cesium$: 'cesium/Cesium',
    cesium: 'cesium/Source'
  }: {}
  return {
    'redux-api-middleware': path.resolve(webappPath, 'node_modules/redux-api-middleware/lib/index.cjs'),
    ...prodAlias,
  }
}
