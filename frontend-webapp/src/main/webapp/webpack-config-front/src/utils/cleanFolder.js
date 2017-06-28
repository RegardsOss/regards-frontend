const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('./merge')


// Remove the a folder before building
module.exports = function (oldConf, projectContextPath, pathToDelete) {
  return merge(oldConf, {
    plugins: [
      // Remove the build folder before building
      new CleanWebpackPlugin([pathToDelete], {
        root: projectContextPath,
        verbose: false,
        dry: false,
      })
    ],
  })
}
