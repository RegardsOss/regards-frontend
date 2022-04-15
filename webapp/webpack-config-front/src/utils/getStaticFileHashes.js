const path = require('path')
const getFileHash = require('./getFileHash')

const DIST_FOLDER_PATH = '/dist/'
const DLL_CORE_FILENAME = 'core.bundle.js'
const DLL_CORE_OSS_FILENAME = 'coreoss.bundle.js'

/**
 * Compute valid hashes for DLL files (Core and CoreOSS) and staticConfiguration
 * In order to invalide the browser cache every time this file may have changed
 */
module.exports = function (projectContextPath, mode) {
  // Browser should invalidate the static configuration file everytime the app is compiled, as we do not control the file lifecycle
  const staticConfigurationHash = new Date().getTime()
  let coreHash;
  let coreossHash;
  if (mode === 'prod') {
    coreHash = getFileHash(path.join(projectContextPath, DIST_FOLDER_PATH, mode, DLL_CORE_FILENAME))
    coreossHash = getFileHash(path.join(projectContextPath, DIST_FOLDER_PATH, mode, DLL_CORE_OSS_FILENAME))
  } else {
    coreHash = new Date().getTime()
    coreossHash = new Date().getTime()
  }
  return {
    coreHash,
    coreossHash,
    staticConfigurationHash,
  }
}

