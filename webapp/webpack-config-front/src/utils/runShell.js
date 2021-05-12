const WebpackShellPluginNext = require('webpack-shell-plugin-next');
const merge = require('./merge')

// Remove the a folder before building
module.exports = function (oldConf, config) {
  return merge(oldConf, {
    plugins: [
      new WebpackShellPluginNext(config),
    ],
  })
}
