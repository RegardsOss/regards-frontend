/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ProjectUser } from '@regardsoss/model'
import WaitingAccessUsersEntitiesActions from '../../src/model/WaitingAccessUsersEntitiesActions'
import { getWaitingAccessProjectEntitiesReducer } from '../../src/model/WaitingAccessUsersEntitiesReducers'

import WaitingAccessUsersEntitiesSelectors from '../../src/model/WaitingAccessUsersEntitiesSelectors'
import WaitingAccessUsersFetchNetworkDump from './dump/WaitingAccessUsersEntitiesNetworkDump'

const backendServerResultList = WaitingAccessUsersFetchNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(WaitingAccessUsersEntitiesActions, getWaitingAccessProjectEntitiesReducer, WaitingAccessUsersEntitiesSelectors, React.PropTypes.objectOf(ProjectUser).isRequired, backendServerResultList, options)

describe('[ADMIN PROJECT USER MANAGEMENT] Testing model WaitingAccessUsersEntities', () => {
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

