/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ModelAttribute } from '@regardsoss/model'
import ModelAttributeActions from '../../src/model/ModelAttributeActions'
import ModelAttributeReducers from '../../src/model/ModelAttributeReducers'
import ModelAttributeSelectors from '../../src/model/ModelAttributeSelectors'
import ModelAttributeNetworkDump from './dump/ModelAttributeNetworkDump'

const backendServerResultList = ModelAttributeNetworkDump

const options = {
  urlParams: { id: '1' },
}


const entityTester = new ReduxEntityTester(ModelAttributeActions, ModelAttributeReducers, ModelAttributeSelectors, React.PropTypes.objectOf(ModelAttribute).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing model ModelAttributes', () => {
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

