/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AccessGroup } from '@regardsoss/model'
import AccessGroupActions from '../../src/model/AccessGroupActions'
import { getAccessGroupReducer } from '../../src/model/AccessGroupReducers'
import AccessGroupSelectors from '../../src/model/AccessGroupSelectors'
import AccessGroupNetworkDump from './dump/AccessGroupNetworkDump'

import { assert } from 'chai'

const backendServerResultList = AccessGroupNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(AccessGroupActions, getAccessGroupReducer, AccessGroupSelectors, React.PropTypes.objectOf(AccessGroup).isRequired, backendServerResultList, options)

describe('[ADMIN AccessGroup MANAGEMENT] Testing model AccessGroup', () => {
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

