import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { PluginDefinition } from '@regardsoss/model'
import CriterionActions from '../../../src/models/criterion/CriterionActions'
import CriterionReducer from '../../../src/models/criterion/CriterionReducer'
import CriterionSelector from '../../../src/models/criterion/CriterionSelector'
import MockResponse from './mockCriterionResponse'

const backendServerResultList = MockResponse
const options = {
  urlParams: { applicationId: 'user' },
}

const entityTester = new ReduxEntityTester(CriterionActions, CriterionReducer, CriterionSelector, React.PropTypes.objectOf(PluginDefinition).isRequired, backendServerResultList, options)

describe('[FORM MODULE] Testing model Criterion', () => {
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
