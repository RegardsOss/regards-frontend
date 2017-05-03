import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ModelAttribute } from '@regardsoss/model'
import ModelAttributesActions from '../../src/rs-dam/modelAttributes/ModelAttributesActions'
import ModelAttributesReducer from '../../src/rs-dam/modelAttributes/ModelAttributesReducer'
import ModelAttributesSelectors from '../../src/rs-dam/modelAttributes/ModelAttributesSelectors'
import ModelAttributesDump from './ModelAttribute.dump'

const backendServerResultList = ModelAttributesDump

const options = {
  urlParams: { pModelId: '1' },
}

const modelAttributesActions = new ModelAttributesActions('test/action')
const modelAttributesReducer = ModelAttributesReducer('test/action')
const modelAttributesSelectors = ModelAttributesSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(modelAttributesActions, modelAttributesReducer, modelAttributesSelectors, React.PropTypes.objectOf(ModelAttribute).isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing client ModelAttributes', () => {
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

