/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { DataManagementShapes } from '@regardsoss/shape'

import AccessGroupActions from '../../src/rs-dam/accessGroup/AccessGroupActions'
import getAccessGroupReducer from '../../src/rs-dam/accessGroup/AccessGroupReducer'
import getAccessGroupSelectors from '../../src/rs-dam/accessGroup/AccessGroupSelectors'
import AccessGroupDump from './AccessGroup.dump'


const options = {
}

const accessGroupActions = new AccessGroupActions('test/action')
const accessGroupReducer = getAccessGroupReducer('test/action')
const accessGroupSelectors = getAccessGroupSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(accessGroupActions, accessGroupReducer, accessGroupSelectors, DataManagementShapes.AccessGroupList.isRequired, AccessGroupDump, options)

describe('[ADMIN CLIENT] Testing client accessGroup', () => {
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

