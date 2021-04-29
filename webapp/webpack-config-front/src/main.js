const getWebpackCoverageConf = require('./app/webpack.coverage.config')
const getWebpackDevConf = require('./app/webpack.dev.config')
const getWebpackProdConf = require('./app/webpack.prod.config')
const getWebpackTestConf = require('./app/webpack.test.config')
const getWebpackDllConf = require('./app/webpack.dll.config')

const getWebpackTestPackageConf = require('./plugin/webpack.test.config')
const getWebpackDevPackageConf = require('./plugin/webpack.dev.config')
const getWebpackProdPackageConf = require('./plugin/webpack.prod.config')

const merge = require('./utils/merge')
const cleanFolder = require('./utils/cleanFolder')
const addProdPlugins = require('./utils/addProdPlugins')
const runShell = require('./utils/runShell')
const saveDevPlugin = require('./utils/saveDevPlugin')
const cpus = require('./utils/cpu')

const MODE = {
  COVERAGE: 'coverage',
  DEV: 'dev',
  DLL_DEV: 'dll_dev',
  DLL_PROD: 'dll_prod',
  PROD: 'prod',
  TEST: 'test',
  PKG_BUILD: 'pkg_build',
  PKG_BUILD_DEV: 'pkg_build_dev',
  PKG_TEST: 'pkg_test',

}

const DEFAULT_UNKNOW_DIR = '/specify/your/working/directory/path'

/**
 * We need to define the relative path between the plugin to the webapp folder to :
 * [DEV] save the plugin for webpack-dev-server each time you edit it
 * [PROD] Use the coreoss DLL
 */
const DEFAULT_PATH_BETWEEN_PLUGIN_AND_WEBAPP = '../../..'
const slugMessage = '@regardsoss/webpack-config-front | '

class WebpackConfig {
  constructor() {
    this.conf = {}
  }

  generateConfig({ mode = MODE.DEV, projectContextPath = DEFAULT_UNKNOW_DIR }) {
    console.info(slugMessage, 'Generate config with mode =', mode)
    console.info(slugMessage, 'Max CPU', cpus)
    console.info(slugMessage, 'Working directory =', projectContextPath)
    switch (mode) {
      case MODE.COVERAGE:
        this.conf = getWebpackCoverageConf(projectContextPath)
        break
      case MODE.DEV:
        this.conf = getWebpackDevConf(projectContextPath)
        break
      case MODE.PROD:
        this.conf = getWebpackProdConf(projectContextPath)
        break
      case MODE.TEST:
        this.conf = getWebpackTestConf(projectContextPath)
        break
      case MODE.DLL_DEV:
        this.conf = getWebpackDllConf(projectContextPath, MODE.DEV)
        break
      case MODE.DLL_PROD:
        this.conf = getWebpackDllConf(projectContextPath, MODE.PROD)
        break
      case MODE.PKG_TEST:
        this.conf = getWebpackTestPackageConf(projectContextPath)
        break
      case MODE.PKG_BUILD_DEV:
        this.conf = getWebpackDevPackageConf(projectContextPath)
        break
      case MODE.PKG_BUILD:
        this.conf = getWebpackProdPackageConf(projectContextPath, DEFAULT_PATH_BETWEEN_PLUGIN_AND_WEBAPP)
        break
      default:
        throw new Error(`Unknown mode, allowed values are ${JSON.stringify(MODE)}`)
    }
    return this
  }

  merge(newConf) {
    this.conf = merge(this.conf, newConf)
    return this
  }

  cleanFolder() {
    this.conf = cleanFolder(this.conf)
    return this
  }

  addProductionPlugins() {
    this.conf = addProdPlugins(this.conf)
    return this
  }

  runShell(config) {
    this.conf = runShell(this.conf, config)
    return this
  }

  saveDevPlugin(pluginType, pluginName) {
    this.conf = saveDevPlugin(this.conf, DEFAULT_PATH_BETWEEN_PLUGIN_AND_WEBAPP, pluginType, pluginName)
    return this
  }

  get() {
    return this.conf
  }
}
const webpackConfigInstance = new WebpackConfig()

module.exports = webpackConfigInstance
