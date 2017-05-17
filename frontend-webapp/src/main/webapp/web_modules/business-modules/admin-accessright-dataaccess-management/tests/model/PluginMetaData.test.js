/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginMetaData } from '@regardsoss/model'
import PluginMetaDataActions from '../../src/model/PluginMetaDataActions'
import PluginMetaDataReducers from '../../src/model/PluginMetaDataReducers'
import PluginMetaDataSelectors from '../../src/model/PluginMetaDataSelectors'
import PluginMetaDataNetworkDump from './dump/PluginMetaDataNetworkDump'

const backendServerResultList = PluginMetaDataNetworkDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}

const entityTester = new ReduxEntityTester(PluginMetaDataActions, PluginMetaDataReducers, PluginMetaDataSelectors, PropTypes.objectOf(PluginMetaData).isRequired, backendServerResultList, options)

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing model PluginMetaData', () => {
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

