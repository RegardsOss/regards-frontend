import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AccessShapes } from '@regardsoss/shape'
import LayoutActions from '../../src/model/LayoutActions'
import LayoutReducer from '../../src/model/LayoutReducer'
import LayoutSelector from '../../src/model/LayoutSelector'
import LayoutDumpNetwork from './dump/LayoutDumpNetwork'

const backendServerResultList = LayoutDumpNetwork
const options = {}

const entityTester = new ReduxEntityTester(LayoutActions, LayoutReducer, LayoutSelector, AccessShapes.LayoutList.isRequired, backendServerResultList, options)

/**
 * Tests for Layout entities
 * @author Sébastien binda
 */
describe('[ADMIN UI LAYOUT MANAGEMENT] Testing model Layout', () => {
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
