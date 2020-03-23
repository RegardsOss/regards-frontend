const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('./merge')


// Remove the a folder before building
module.exports = function (oldConf) {
  return merge(oldConf, {
    plugins: [
      // Remove the build folder before building
      // Since V2, it automatically remove files inside output.path webpack config
      new CleanWebpackPlugin({
        verbose: false,
        dry: false,
      }),
    ],
  })
}
