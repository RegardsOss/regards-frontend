/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Role } from '@regardsoss/model'

import RoleActions from '../../src/rs-admin/role/RoleActions'
import getRoleReducer from '../../src/rs-admin/role/RoleReducer'
import getRoleSelectors from '../../src/rs-admin/role/RoleSelectors'
import RoleDump from './Role.dump'

const options = {
}

const roleActions = new RoleActions('test/action')
const roleReducer = getRoleReducer('test/action')
const roleSelectors = getRoleSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(roleActions, roleReducer, roleSelectors, React.PropTypes.objectOf(Role).isRequired, RoleDump, options)

describe('[ADMIN CLIENT] Testing client role', () => {
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

