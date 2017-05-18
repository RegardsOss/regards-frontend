import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AccessGroup } from '@regardsoss/model'
import AccessGroupActions from '../../src/model/AccessGroupActions'
import AccessGroupReducers from '../../src/model/AccessGroupReducers'
import AccessGroupSelectors from '../../src/model/AccessGroupSelectors'
import AccessGroupNetwork from './dump/AccessGroupNetwork'

const backendServerResultList = AccessGroupNetwork

const options = {
}

const entityTester = new ReduxEntityTester(AccessGroupActions, AccessGroupReducers, AccessGroupSelectors, PropTypes.objectOf(AccessGroup).isRequired, backendServerResultList, options)

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing model AccessGroup', () => {
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

