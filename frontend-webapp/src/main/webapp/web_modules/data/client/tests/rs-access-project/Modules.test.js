import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Module } from '@regardsoss/model'
import { AccessProjectClient } from '../../src/main'
import ModulesListDump from './ModulesList.dump'

const backendServerResultList = ModulesListDump
const options = {
  urlParams: { applicationId: 'user' },
}

const ModulesActions = AccessProjectClient.ModuleActions('test/action')
const ModulesReducer = AccessProjectClient.ModuleReducers('test/action')
const ModulesSelector = AccessProjectClient.ModuleSelectors(['test', 'modules'])
const entityTester = new ReduxEntityTester(ModulesActions, ModulesReducer, ModulesSelector, React.PropTypes.objectOf(Module).isRequired, backendServerResultList, options)

/**
 * Tests for Modules entities
 * @author Sébastien binda
 */
describe('[ADMIN CLIENT] Testing client Module', () => {
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

