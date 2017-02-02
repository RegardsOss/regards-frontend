import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Model } from '@regardsoss/model'
import ModelActions from '../../src/model/ModelActions'
import ModelReducers from '../../src/model/ModelReducers'
import ModelSelectors from '../../src/model/ModelSelectors'

const backendServerResultList = [{
  content: {
    id: 1,
  },
  links: [],
}]
const options = {
  urlParams: { type: 'COLLECTION' },
}

const entityTester = new ReduxEntityTester(ModelActions, ModelReducers, ModelSelectors, React.PropTypes.objectOf(Model).isRequired, backendServerResultList, options)

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing model Modele', () => {
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

