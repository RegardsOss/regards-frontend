/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AdminShapes } from '@regardsoss/shape'

import ProjectUserActions from '../../src/rs-admin/user/ProjectUserActions'
import getProjectUserReducer from '../../src/rs-admin/user/ProjectUserReducer'
import getProjectUserSelectors from '../../src/rs-admin/user/ProjectUserSelectors'
import ProjectUserDump from './ProjectUser.dump'


const options = {
}

const projectUserActions = new ProjectUserActions('test/action')
const projectUserReducer = getProjectUserReducer('test/action')
const projectUserSelectors = getProjectUserSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(projectUserActions, projectUserReducer, projectUserSelectors, AdminShapes.ProjectUserList.isRequired, ProjectUserDump, options)

describe('[ADMIN CLIENT] Testing client projectUser', () => {
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

