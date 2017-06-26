const getWebpackCommonConf =require('./conf/webpack.common.config')
const getWebpackCoverageConf =require('./conf/webpack.coverage.config')
const getWebpackDevConf =require('./conf/webpack.dev.config')
const getWebpackProdConf =require('./conf/webpack.prod.config')
const getWebpackTestConf = require('./conf/webpack.test.config')
const webpackDllConf =require('./conf/webpack.dll.config')

const merge = require('./utils/merge')

const MODE = {
  COMMON: 'common',
  COVERAGE: 'coverage',
  DEV: 'dev',
  DLL: 'dll',
  PROD: 'prod',
  TEST: 'test',
}

const DEFAULT_UNKNOW_DIR = '/specify/your/working/directory/path'

const slugMessage = "@regardsoss/webpack-config-front | "

class WebpackConfig {
  constructor () {
    this.conf = {}
  }

  generateConfig({mode = MODE.COMMON, projectContextPath = DEFAULT_UNKNOW_DIR}) {
    console.info(slugMessage, "Generate config with mode=", mode)
    console.info(slugMessage, "Working directory=", projectContextPath)
    switch (mode) {
      case MODE.COMMON:
        this.conf =getWebpackCommonConf(projectContextPath)
        break
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
      default:
        throw new Error("Unknown mode, allowed values are ${MODE}")
    }
    return this
  }
  merge(newConf) {
    this.conf = merge(this.conf, newConf)
    return this
  }
  get () {
    return this.conf
  }
}
const webpackConfigInstance = new WebpackConfig()

module.exports = webpackConfigInstance