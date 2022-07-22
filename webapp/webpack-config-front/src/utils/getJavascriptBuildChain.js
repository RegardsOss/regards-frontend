const getBabelEnvName = require('./getBabelEnvName')


/**
 * Build the chain that process javascript file
 * When coverage active, we need a loader to insert coverage stuff inside sourcecode
 */
module.exports = function (mode, cpus) {
  const result = [{
    loader: 'thread-loader',
    options: {
      workers: cpus,
    },
  }]
  if (mode === 'coverage') {
    result.push({
      loader: "@jsdevtools/coverage-istanbul-loader",
      options: {
        compact: true
      }
    })
  }
  result.push({
    loader: 'babel-loader',
    options: {
      // used to cache the results of the loader.
      // Next builds will attempt to read from the cache
      // the cache is different depending of the value of NODE_ENV
      cacheDirectory: true,
      envName: getBabelEnvName(mode),
    }
  })
  return result
}

