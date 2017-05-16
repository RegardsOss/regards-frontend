/**
 * LICENSE_PLACEHOLDER
 */
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { StoragePlugin } from '@regardsoss/model'
import StoragePluginActions from '../../src/model/StoragePluginActions'
import StoragePluginReducers from '../../src/model/StoragePluginReducers'
import StoragePluginSelectors from '../../src/model/StoragePluginSelectors'

const backendServerResultList = [{
  content: {
    id: 1,
    label: 'ServerHDD',
    description: 'Main server hard drives',
    totalSize: '25To',
    usedSize: '0.9To',
  },
  links: [],
}]

// URL options and parameters
const options = {}

const entityTester = new ReduxEntityTester(StoragePluginActions, StoragePluginReducers, StoragePluginSelectors, PropTypes.objectOf(StoragePlugin).isRequired, backendServerResultList, options)

describe('[STORAGE PLUGINS MONITORING] Testing model StoragePlugin', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it within the store.', (done) => {
    entityTester.runTests(done)
  })
})
