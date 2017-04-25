import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Fragment } from '@regardsoss/model'
import { DataManagementClient } from '../../src/main'
import FragmentListDump from './Fragment.dump'

const backendServerResultList = FragmentListDump
const options = {
}

const FragmentActions = DataManagementClient.FragmentActions('test/action')
const FragmentReducers = DataManagementClient.FragmentReducers('test/action')
const FragmentSelectors = DataManagementClient.FragmentSelectors(['test', 'modules'])
const entityTester = new ReduxEntityTester(FragmentActions, FragmentReducers, FragmentSelectors, React.PropTypes.objectOf(Fragment).isRequired, backendServerResultList, options)

/**
 * Tests for Modules entities
 * @author Léo Mieulet
 */
describe('[ADMIN UI CLIENT MANAGEMENT] Testing client Fragment', () => {
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

