/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ProjectUser } from '@regardsoss/model'
import ProjectUserActions from '../../src/model/ProjectUserActions'
import { getProjectUserReducer } from '../../src/model/ProjectUserReducers'
import ProjectUserSelectors from '../../src/model/ProjectUserSelectors'
import ProjectUserNetworkDump from './dump/ProjectUserNetworkDump'

const backendServerResultList = ProjectUserNetworkDump
const options = {
}

const entityTester = new ReduxEntityTester(ProjectUserActions, getProjectUserReducer, ProjectUserSelectors, React.PropTypes.objectOf(ProjectUser).isRequired, backendServerResultList, options)

describe('[ADMIN PROJECTUSER MANAGEMENT] Testing model ProjectUser', () => {
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

