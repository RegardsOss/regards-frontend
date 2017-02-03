/**
 * LICENSE_PLACEHOLDER
 */
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Model } from '@regardsoss/model'
import DatasetModelActions from '../../../src/models/datasets/DatasetModelActions'
import DatasetModelReducer from '../../../src/models/datasets/DatasetModelReducer'
import DatasetModelSelector from '../../../src/models/datasets/DatasetModelSelector'
import MockResponse from './mockDatasetModelResponse'

const backendServerResultList = MockResponse
const options = {
}

const entityTester = new ReduxEntityTester(DatasetModelActions, DatasetModelReducer, DatasetModelSelector, React.PropTypes.objectOf(Model).isRequired, backendServerResultList, options)

/**
 * Tests for DatasetModels
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing model DatasetModel', () => {
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
