import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Module } from '@regardsoss/model'
import ModulesActions from '../../src/model/modules/ModulesActions'
import ModulesReducer from '../../src/model/modules/ModulesReducer'
import ModulesSelector from '../../src/model/modules/ModulesSelector'
import MockResponse from './mockModulesResponse'

const backendServerResultList = MockResponse
const options = {
  urlParams: { applicationId: 'user' },
}

const entityTester = new ReduxEntityTester(ModulesActions, ModulesReducer, ModulesSelector, React.PropTypes.objectOf(Module).isRequired, backendServerResultList, options)

describe('[ADMIN UI CONFIGURATION] Testing model Module', () => {
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

