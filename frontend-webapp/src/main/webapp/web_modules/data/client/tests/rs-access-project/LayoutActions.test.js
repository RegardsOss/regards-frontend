import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Layout } from '@regardsoss/model'
import { AccessProjectClient } from '../../src/main'
import LayoutListDump from './LayoutList.dump'

const backendServerResultList = LayoutListDump
const options = {}

const LayoutActions = AccessProjectClient.LayoutActions('test/action')
const LayoutReducer = AccessProjectClient.LayoutReducers('test/action')
const LayoutSelector = AccessProjectClient.LayoutSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(LayoutActions, LayoutReducer, LayoutSelector, React.PropTypes.objectOf(Layout).isRequired, backendServerResultList, options)

/**
 * Tests for Layout entities
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing model Layout', () => {
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
