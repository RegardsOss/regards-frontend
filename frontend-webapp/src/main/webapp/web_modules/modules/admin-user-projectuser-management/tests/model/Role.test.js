/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Role } from '@regardsoss/model'
import RoleActions from '../../src/model/RoleActions'
import { getRoleReducer } from '../../src/model/RoleReducers'
import RoleSelectors from '../../src/model/RoleSelectors'
import RoleNetworkDump from './dump/RoleNetworkDump'

const backendServerResultList = RoleNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(RoleActions, getRoleReducer, RoleSelectors, React.PropTypes.objectOf(Role).isRequired, backendServerResultList, options)

describe('[ADMIN PROJECT USER MANAGEMENT] Testing model Role', () => {
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

