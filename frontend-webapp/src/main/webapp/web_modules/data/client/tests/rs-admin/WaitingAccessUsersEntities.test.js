/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AdminShapes } from '@regardsoss/shape'
import WaitingAccessUsersEntitiesActions from '../../src/rs-admin/user/WaitingAccessUsersEntitiesActions'
import getWaitingAccessUsersEntitiesReducer from '../../src/rs-admin/user/WaitingAccessUsersEntitiesReducer'
import getWaitingAccessUsersEntitiesSelectors from '../../src/rs-admin/user/WaitingAccessUsersEntitiesSelectors'
import WaitingAccessUsersEntitiesDump from './WaitingAccessUsersEntities.dump'


const options = {
}

const waitingAccessUsersEntitiesActions = new WaitingAccessUsersEntitiesActions('test/action')
const waitingAccessUsersEntitiesReducer = getWaitingAccessUsersEntitiesReducer('test/action')
const waitingAccessUsersEntitiesSelectors = getWaitingAccessUsersEntitiesSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(waitingAccessUsersEntitiesActions, waitingAccessUsersEntitiesReducer, waitingAccessUsersEntitiesSelectors, AdminShapes.ProjectUserList.isRequired, WaitingAccessUsersEntitiesDump, options)

describe('[ADMIN CLIENT] Testing client waitingAccessUsersEntities', () => {
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

