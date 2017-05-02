import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Model } from '@regardsoss/model'
import ModelActions from '../../src/rs-dam/model/ModelActions'
import ModelReducer from '../../src/rs-dam/model/ModelReducer'
import ModelSelectors from '../../src/rs-dam/model/ModelSelectors'
import ModelDump from './Model.dump'

const modelActions = new ModelActions('test/action')
const modelReducer = ModelReducer('test/action')
const modelSelectors = ModelSelectors(['test', 'modules'])
const backendServerResultList = ModelDump

const options = {
  urlParams: { type: 'COLLECTION' },
}

const entityTester = new ReduxEntityTester(modelActions, modelReducer, modelSelectors, React.PropTypes.objectOf(Model).isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing client Testing model Modele', () => {
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

