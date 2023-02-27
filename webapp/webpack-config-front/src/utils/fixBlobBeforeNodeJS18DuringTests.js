const Buffer = require("buffer")

const slugMessage = '@regardsoss/webpack-config-front | '

/**
 * Add a fallback on node < 18 to be able to retrieve Blob during tests
 * When running with node > 18, this function has no effect
 */
module.exports = function () {
  const nodeVersion = process.versions.node.split('.')[0]
  if (nodeVersion < 18) {
    console.info(slugMessage, 'Current node version is', nodeVersion)
    console.info(slugMessage, '[node < 18]', 'Alterates Node.js to set Blob = Buffer.Blob')
    global.Blob = Buffer.Blob
  }
}

