/**
 * LICENSE_PLACEHOLDER
 */
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Entity } from '@regardsoss/model'
import DatasetActions from '../../../src/models/datasets/DatasetActions'
import DatasetReducer from '../../../src/models/datasets/DatasetReducer'
import DatasetSelector from '../../../src/models/datasets/DatasetSelector'
import MockResponse from './mockDatasetResponse'

const backendServerResultList = MockResponse
const options = {
}

const entityTester = new ReduxEntityTester(DatasetActions, DatasetReducer, DatasetSelector, PropTypes.objectOf(Entity).isRequired, backendServerResultList, options)

/**
 * Tests for Datasets
 * @author Sébastien binda
 */
describe('[FORM MODULE] Testing model Entity (dataset)', () => {
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
