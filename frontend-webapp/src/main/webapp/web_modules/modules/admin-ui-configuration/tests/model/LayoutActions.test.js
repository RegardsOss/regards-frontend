import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Layout } from '@regardsoss/model'
import LayoutActions from '../../src/model/layout/LayoutActions'
import LayoutReducer from '../../src/model/layout/LayoutReducer'
import LayoutSelector from '../../src/model/layout/LayoutSelector'
import MockResponse from './mockLayoutsResponse'

const backendServerResultList = MockResponse
const options = {
  urlParams: { applicationId: 'user' },
}

const entityTester = new ReduxEntityTester(LayoutActions, LayoutReducer, LayoutSelector, React.PropTypes.objectOf(Layout).isRequired, backendServerResultList, options)

/**
 * Tests for Layout entities
 * @author Sébastien binda
 */
describe('[ADMIN UI CONFIGURATION] Testing model Layout', () => {
  before(() => {
    entityTester.beforeAll()
  })

  after(() => {
    entityTester.afterAll()
  })
  xit('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    entityTester.runTests(done)
  })
})
