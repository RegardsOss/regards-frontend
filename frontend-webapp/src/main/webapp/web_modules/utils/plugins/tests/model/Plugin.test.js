/**
 * LICENSE_PLACEHOLDER
 **/

import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginDefinition } from '@regardsoss/model'
import PluginActions from '../../src/model/PluginActions'
import PluginReducer from '../../src/model/PluginReducer'
import PluginSelector from '../../src/model/PluginSelector'
import MockResponse from './mockPluginResponse'

const backendServerResultList = MockResponse
const options = {
}

const entityTester = new ReduxEntityTester(PluginActions, PluginReducer, PluginSelector, React.PropTypes.objectOf(PluginDefinition).isRequired, backendServerResultList, options)

/**
 * Tests for PluginDefinition model
 * @author Sébastien Binda
 */
describe('[PLUGINS] Testing model PluginDefinition', () => {
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
