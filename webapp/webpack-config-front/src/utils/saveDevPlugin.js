const runShell = require('./runShell')


// Save the plugin into the webpack dev server public folder
module.exports = function (oldConf, frontendWebappPath, pluginType, pluginName) {
  return runShell(oldConf, {
    onBuildEnd: [
      'echo "Copying dev plugin into front dev"',
      `mkdir -p ${frontendWebappPath}/dist/dev/plugins/${pluginType}/${pluginName}`,
      `cp -p ./target/dev/plugin.js ./target/dev/plugin.js.map ${frontendWebappPath}/dist/dev/plugins/${pluginType}/${pluginName}/`,
    ],
  })
}
