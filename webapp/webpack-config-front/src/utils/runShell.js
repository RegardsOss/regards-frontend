const WebpackShellPlugin = require('webpack-shell-plugin')
const merge = require('./merge')


// Remove the a folder before building
module.exports = function (oldConf, config) {
  return merge(oldConf, {
    plugins: [
      new WebpackShellPlugin(config),
    ],
  })
}
