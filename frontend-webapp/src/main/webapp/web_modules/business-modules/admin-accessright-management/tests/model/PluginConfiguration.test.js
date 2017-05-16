import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginConfiguration } from '@regardsoss/model'
import PluginConfigurationActions from '../../src/model/PluginConfigurationActions'
import PluginConfigurationReducers from '../../src/model/PluginConfigurationReducers'
import PluginConfigurationSelectors from '../../src/model/PluginConfigurationSelectors'
import PluginConfigurationNetworkDump from './dump/PluginConfigurationNetworkDump'

const backendServerResultList = PluginConfigurationNetworkDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}

const entityTester = new ReduxEntityTester(PluginConfigurationActions, PluginConfigurationReducers, PluginConfigurationSelectors, PropTypes.objectOf(PluginConfiguration).isRequired, backendServerResultList, options)

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing model PluginConfiguration', () => {
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

