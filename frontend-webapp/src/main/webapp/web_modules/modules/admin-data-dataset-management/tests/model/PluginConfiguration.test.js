import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginConfiguration } from '@regardsoss/model'
import { PluginConfigurationConvertersActions } from '../../src/model/PluginConfigurationActions'
import { pluginConfigurationConverters } from '../../src/model/PluginConfigurationReducers'
import { PluginConfigurationConvertersSelectors } from '../../src/model/PluginConfigurationSelectors'
import PluginConfigurationNetworkDump from './dump/PluginConfigurationNetworkDump'

const backendServerResultList = PluginConfigurationNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(PluginConfigurationConvertersActions, pluginConfigurationConverters, PluginConfigurationConvertersSelectors, React.PropTypes.objectOf(PluginConfiguration).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASET MANAGEMENT] Testing model PluginConfiguration', () => {
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

