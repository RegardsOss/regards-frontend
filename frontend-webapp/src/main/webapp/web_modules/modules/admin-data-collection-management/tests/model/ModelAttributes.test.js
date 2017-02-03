import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { ModelAttribute } from '@regardsoss/model'
import ModelAttributeActions from '../../src/model/ModelAttributeActions'
import ModelAttributeReducers from '../../src/model/ModelAttributeReducers'
import ModelAttributeSelectors from '../../src/model/ModelAttributeSelectors'

const backendServerResultList = [{
  content: {
    id: 1,
  },
  links: [],
}]
const options = {
  urlParams: { id: '1' },
}


const entityTester = new ReduxEntityTester(ModelAttributeActions, ModelAttributeReducers, ModelAttributeSelectors, React.PropTypes.objectOf(ModelAttribute).isRequired, backendServerResultList, options)

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing model ModelAttributes', () => {
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

