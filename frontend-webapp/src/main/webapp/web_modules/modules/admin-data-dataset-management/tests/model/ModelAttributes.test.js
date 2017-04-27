/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ModelAttribute } from '@regardsoss/model'
import ModelAttributesActions from '../../src/model/ModelAttributesActions'
import ModelAttributesReducer from '../../src/model/ModelAttributesReducer'
import ModelAttributesSelectors from '../../src/model/ModelAttributesSelectors'
import ModelAttributeNetworkDump from './dump/ModelAttributeNetworkDump'

const backendServerResultList = ModelAttributeNetworkDump

const options = {
  urlParams: { pModelId: '1' },
}

const entityTester = new ReduxEntityTester(ModelAttributesActions, ModelAttributesReducer, ModelAttributesSelectors, React.PropTypes.objectOf(ModelAttribute).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASET MANAGEMENT] Testing model ModelAttributes', () => {
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

