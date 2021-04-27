const { merge } = require('webpack-merge')

module.exports = function (oldConf, newConf) {
  return merge(oldConf, newConf)
}
