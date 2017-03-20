import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Collection } from '@regardsoss/model'
import CollectionActions from '../../src/model/CollectionActions'
import CollectionReducers from '../../src/model/CollectionReducers'
import CollectionSelectors from '../../src/model/CollectionSelectors'
import CollectionNetworkDump from './dump/CollectionNetworkDump'

const backendServerResultList = CollectionNetworkDump
const options = {
}
const entityTester = new ReduxEntityTester(CollectionActions, CollectionReducers, CollectionSelectors, React.PropTypes.objectOf(Collection).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASET MANAGEMENT] Testing model Collection', () => {
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

