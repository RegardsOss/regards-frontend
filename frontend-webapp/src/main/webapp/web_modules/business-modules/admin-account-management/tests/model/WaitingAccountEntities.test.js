/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ProjectUser } from '@regardsoss/model'
import WaitingAccountEntitiesActions from '../../src/model/WaitingAccountEntitiesActions'
import getWaitingAccountEntitiesReducer from '../../src/model/WaitingAccountEntitiesReducers'

import WaitingAccountEntitiesSelectors from '../../src/model/WaitingAccountEntitiesSelectors'
import WaitingAccountEntitiesNetworkDump from './dump/WaitingAccountEntitiesNetworkDump'

const backendServerResultList = WaitingAccountEntitiesNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(WaitingAccountEntitiesActions, getWaitingAccountEntitiesReducer, WaitingAccountEntitiesSelectors, PropTypes.objectOf(ProjectUser).isRequired, backendServerResultList, options)

describe('[ADMIN ACCOUNT MANAGEMENT] Testing model WaitingAccountEntities', () => {
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

