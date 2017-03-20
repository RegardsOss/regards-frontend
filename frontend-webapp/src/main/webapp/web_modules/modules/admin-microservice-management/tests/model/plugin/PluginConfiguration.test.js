/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginConfiguration } from '@regardsoss/model'
import PluginConfigurationActions from '../../../src/model/plugin/PluginConfigurationActions'
import PluginConfigurationReducers from '../../../src/model/plugin/PluginConfigurationReducers'
import PluginConfigurationSelectors from '../../../src/model/plugin/PluginConfigurationSelectors'
import PluginConfigurationNetworkDump from './dump/PluginConfigurationNetworkDump'

const backendServerResultList = PluginConfigurationNetworkDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}

const entityTester = new ReduxEntityTester(PluginConfigurationActions, PluginConfigurationReducers, PluginConfigurationSelectors, React.PropTypes.objectOf(PluginConfiguration).isRequired, backendServerResultList, options)

describe('[ADMIN MICROSERVICE MANAGEMENT] Testing model PluginConfiguration', () => {
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

