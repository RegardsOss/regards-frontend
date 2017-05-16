/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ProjectUser } from '@regardsoss/model'
import AccountActions from '../../src/model/AccountActions'
import getAccountReducer from '../../src/model/AccountReducers'
import AccountSelectors from '../../src/model/AccountSelectors'
import AccountNetworkDump from './dump/AccountNetworkDump'

const backendServerResultList = AccountNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(AccountActions, getAccountReducer, AccountSelectors, PropTypes.objectOf(ProjectUser).isRequired, backendServerResultList, options)

describe('[ADMIN ACCOUNT MANAGEMENT] Testing model Account', () => {
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

