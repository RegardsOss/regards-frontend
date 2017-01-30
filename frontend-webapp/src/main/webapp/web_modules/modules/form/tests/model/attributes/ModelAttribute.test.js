import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AttributeModel } from '@regardsoss/model'
import AttributeModelActions from '../../../src/models/attributes/AttributeModelActions'
import AttributeModelReducer from '../../../src/models/attributes/AttributeModelReducer'
import AttributeModelSelector from '../../../src/models/attributes/AttributeModelSelector'
import MockResponse from './mockModelAttributeResponse'

const backendServerResultList = MockResponse
const options = {
  urlParams: { queryParam: '' },
}

const entityTester = new ReduxEntityTester(AttributeModelActions, AttributeModelReducer, AttributeModelSelector, React.PropTypes.objectOf(AttributeModel).isRequired, backendServerResultList, options)

describe('[FORM MODULE] Testing model AttributeModel', () => {
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
