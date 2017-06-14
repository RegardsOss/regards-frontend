import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { DataManagementShapes } from '@regardsoss/shape'
import FragmentActions from '../../src/rs-dam/fragment/FragmentActions'
import FragmentReducer from '../../src/rs-dam/fragment/FragmentReducer'
import FragmentSelectors from '../../src/rs-dam/fragment/FragmentSelectors'
import FragmentListDump from './Fragment.dump'

const backendServerResultList = FragmentListDump
const options = {
}

const fragmentActions = new FragmentActions('test/action')
const fragmentReducer = FragmentReducer('test/action')
const fragmentSelectors = FragmentSelectors(['test', 'modules'])
const entityTester = new ReduxEntityTester(fragmentActions, fragmentReducer, fragmentSelectors, DataManagementShapes.FragmentList.isRequired, backendServerResultList, options)

/**
 * Tests for Modules entities
 * @author Léo Mieulet
 */
describe('[ADMIN CLIENT] Testing client Fragment', () => {
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

