/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { CommonShapes } from '@regardsoss/shape'
import PluginMetaDataActions from '../../src/rs-common/pluginMetaData/PluginMetaDataActions'
import PluginMetaDataReducer from '../../src/rs-common/pluginMetaData/PluginMetaDataReducer'
import PluginMetaDataSelectors from '../../src/rs-common/pluginMetaData/PluginMetaDataSelectors'
import PluginMetaDataDump from './PluginMetaData.dump'

const backendServerResultList = PluginMetaDataDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}


const pluginMetaDataActions = new PluginMetaDataActions('test/action')
const pluginMetaDataReducer = PluginMetaDataReducer('test/action')
const pluginMetaDataSelectors = PluginMetaDataSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(pluginMetaDataActions, pluginMetaDataReducer, pluginMetaDataSelectors, CommonShapes.PluginMetaDataList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model PluginMetaData', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    entityTester.runTests(done)
  })
})

