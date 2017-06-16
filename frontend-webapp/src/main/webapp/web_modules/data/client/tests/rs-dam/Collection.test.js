import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { DataManagementShapes } from '@regardsoss/shape'
import CollectionActions from '../../src/rs-dam/collection/CollectionActions'
import CollectionReducer from '../../src/rs-dam/collection/CollectionReducer'
import CollectionSelectors from '../../src/rs-dam/collection/CollectionSelectors'
import CollectionDump from './Collection.dump'

const backendServerResultList = CollectionDump

const options = {
}


const collectionActions = new CollectionActions('test/action')
const collectionReducer = CollectionReducer('test/action')
const collectionSelectors = CollectionSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(collectionActions, collectionReducer, collectionSelectors, DataManagementShapes.CollectionList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing client Collection', () => {
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

