/**
 * LICENSE_PLACEHOLDER
 **/

import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import PluginTypeActions from '../../../src/model/plugin/PluginTypeActions'
import PluginTypeReducers from '../../../src/model/plugin/PluginTypeReducers'
import PluginTypeSelectors from '../../../src/model/plugin/PluginTypeSelectors'
import PluginTypeNetworkDump from './dump/PluginTypeNetworkDump'

const backendServerResultList = PluginTypeNetworkDump
const options = {
  urlParams: { microserviceName: 'rs-dam' },
}

const entityTester = new ReduxEntityTester(PluginTypeActions, PluginTypeReducers, PluginTypeSelectors, PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired, backendServerResultList, options)

describe('[ADMIN MICROSERVICE MANAGEMENT] Testing model PluginType', () => {
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
