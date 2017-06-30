const getWebpackCommonConf = require('./app/webpack.common.config')
const getWebpackCoverageConf = require('./app/webpack.coverage.config')
const getWebpackDevConf = require('./app/webpack.dev.config')
const getWebpackProdConf = require('./app/webpack.prod.config')
const getWebpackTestConf = require('./app/webpack.test.config')
const webpackDllConf = require('./app/webpack.dll.config')

const getWebpackTestPackageConf = require('./plugin/webpack.test.config')
const getWebpackCommonPackageConf = require('./plugin/webpack.common.config')

const merge = require('./utils/merge')
const cleanFolder = require('./utils/cleanFolder')
const addProdPlugins = require('./utils/addProdPlugins')

const MODE = {
  COVERAGE: 'coverage',
  DEV: 'dev',
  DLL: 'dll',
  PROD: 'prod',
  TEST: 'test',
  PKG_BUILD: 'pkg_build',
  PKG_TEST: 'pkg_test',

}

const DEFAULT_UNKNOW_DIR = '/specify/your/working/directory/path'
const DEFAULT_UNKNOW_PATH_TO_DELETE = '/specify/the/directory/to/delete'

const slugMessage = "@regardsoss/webpack-config-front | "

class WebpackConfig {
  constructor() {
    this.conf = {}
  }

  generateConfig({ mode = MODE.DEV, projectContextPath = DEFAULT_UNKNOW_DIR }) {
    console.info(slugMessage, "Generate config with mode=", mode)
    console.info(slugMessage, "Working directory=", projectContextPath)
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
      case MODE.DLL:
        this.conf = webpackDllConf
        break
      case MODE.PKG_TEST:
        this.conf = getWebpackTestPackageConf(projectContextPath)
        break
      case MODE.PKG_BUILD:
        this.conf = getWebpackCommonPackageConf(projectContextPath)
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

  cleanFolder({ projectContextPath = DEFAULT_UNKNOW_DIR, pathToDelete = DEFAULT_UNKNOW_PATH_TO_DELETE }) {
    this.conf = cleanFolder(this.conf, projectContextPath, pathToDelete)
    return this
  }

  addProductionPlugins() {
    this.conf = addProdPlugins(this.conf)
    return this
  }

  get() {
    return this.conf
  }
}
const webpackConfigInstance = new WebpackConfig()

module.exports = webpackConfigInstance