/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import PluginMetaDataActions from '../../../src/model/plugin/PluginMetaDataActions'
import PluginMetaDataReducers from '../../../src/model/plugin/PluginMetaDataReducers'
import PluginMetaDataSelectors from '../../../src/model/plugin/PluginMetaDataSelectors'
import PluginMetaDataNetworkDump from './dump/PluginMetaDataNetworkDump'

const backendServerResultList = PluginMetaDataNetworkDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}

const entityTester = new ReduxEntityTester(PluginMetaDataActions, PluginMetaDataReducers, PluginMetaDataSelectors, PropTypes.objectOf(PropTypes.object).isRequired, backendServerResultList, options)

describe('[ADMIN MICROSERVICE MANAGEMENT] Testing model PluginMetaData', () => {
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

