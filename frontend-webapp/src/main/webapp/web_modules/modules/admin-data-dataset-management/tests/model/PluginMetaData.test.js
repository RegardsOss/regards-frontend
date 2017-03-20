/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginMetaData } from '@regardsoss/model'
import { PluginMetaDataConvertersActions } from '../../src/model/PluginMetaDataActions'
import { pluginMetaDataConverters } from '../../src/model/PluginMetaDataReducers'
import { PluginMetaDataConvertersSelectors } from '../../src/model/PluginMetaDataSelectors'
import PluginMetaDataNetworkDump from './dump/PluginMetaDataNetworkDump'

const backendServerResultList = PluginMetaDataNetworkDump
const options = {}
const entityTester = new ReduxEntityTester(PluginMetaDataConvertersActions, pluginMetaDataConverters, PluginMetaDataConvertersSelectors, React.PropTypes.objectOf(PluginMetaData).isRequired, backendServerResultList, options)
describe('[ADMIN DATA DATASET MANAGEMENT] Testing model PluginMetaData', () => {
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

