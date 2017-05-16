import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginConfiguration } from '@regardsoss/model'
import PluginConfigurationActions from '../../src/rs-common/pluginConfiguration/PluginConfigurationActions'
import PluginConfigurationSelectors from '../../src/rs-common/pluginConfiguration/PluginConfigurationSelectors'
import PluginConfigurationReducer from '../../src/rs-common/pluginConfiguration/PluginConfigurationReducer'
import PluginConfigurationNetworkDump from './PluginConfiguration.dump'

const backendServerResultList = PluginConfigurationNetworkDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}


const pluginConfigurationActions = new PluginConfigurationActions('test/action')
const pluginConfigurationReducer = PluginConfigurationReducer('test/action')
const pluginConfigurationSelectors = PluginConfigurationSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(pluginConfigurationActions, pluginConfigurationReducer, pluginConfigurationSelectors, PropTypes.objectOf(PluginConfiguration).isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model PluginConfiguration', () => {
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

