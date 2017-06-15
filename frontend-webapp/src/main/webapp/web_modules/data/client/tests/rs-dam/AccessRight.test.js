/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { DataManagementShapes } from '@regardsoss/shape'

import AccessRightActions from '../../src/rs-dam/accessRight/AccessRightActions'
import getAccessRightReducer from '../../src/rs-dam/accessRight/AccessRightReducer'
import getAccessRightSelectors from '../../src/rs-dam/accessRight/AccessRightSelectors'
import AccessRightDump from './AccessRight.dump'

const backendServerResultList = AccessRightDump

const options = {
}

const accessRightActions = new AccessRightActions('test/action')
const accessRightReducer = getAccessRightReducer('test/action')
const accessRightSelectors = getAccessRightSelectors(['test', 'modules'])


const entityTester = new ReduxEntityTester(accessRightActions, accessRightReducer, accessRightSelectors, DataManagementShapes.AccessRightList.isRequired, backendServerResultList, options)

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

