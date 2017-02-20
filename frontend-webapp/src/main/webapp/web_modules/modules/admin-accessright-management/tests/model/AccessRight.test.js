/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AccessRight } from '@regardsoss/model'
import AccessRightActions from '../../src/model/AccessRightActions'
import AccessRightReducers from '../../src/model/AccessRightReducers'
import AccessRightSelectors from '../../src/model/AccessRightSelectors'
import AccessRightNetworkDump from './dump/AccessRightNetworkDump'

const backendServerResultList = AccessRightNetworkDump
const options = {
}


const entityTester = new ReduxEntityTester(AccessRightActions, AccessRightReducers, AccessRightSelectors, React.PropTypes.objectOf(AccessRight).isRequired, backendServerResultList, options)

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing model AccessRight', () => {
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

