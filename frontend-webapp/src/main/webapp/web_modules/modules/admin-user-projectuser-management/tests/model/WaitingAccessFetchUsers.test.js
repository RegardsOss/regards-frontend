/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ProjectUser } from '@regardsoss/model'
import WaitingAccessUsersFetchActions from '../../src/model/WaitingAccessUsersFetchActions'
import { getWaitingAccessProjectFetchReducer } from '../../src/model/WaitingAccessUsersFetchReducers'

import WaitingAccessUsersFetchSelectors from '../../src/model/WaitingAccessUsersFetchSelectors'
import WaitingAccessUsersFetchNetworkDump from './dump/WaitingAccessUsersFetchNetworkDump'

const backendServerResultList = WaitingAccessUsersFetchNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(WaitingAccessUsersFetchActions, getWaitingAccessProjectFetchReducer, WaitingAccessUsersFetchSelectors, React.PropTypes.objectOf(ProjectUser).isRequired, backendServerResultList, options)

describe('[ADMIN WaitingAccessUsersFetch MANAGEMENT] Testing model WaitingAccessUsersFetch', () => {
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

