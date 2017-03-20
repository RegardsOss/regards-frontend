/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Model } from '@regardsoss/model'
import ModelActions from '../../src/model/ModelActions'
import ModelReducers from '../../src/model/ModelReducers'
import ModelSelectors from '../../src/model/ModelSelectors'
import ModelNetworkDump from './dump/ModelNetworkDump'

const backendServerResultList = ModelNetworkDump

const options = {
  urlParams: { type: 'DATASOURCE' },
}

const entityTester = new ReduxEntityTester(ModelActions, ModelReducers, ModelSelectors, React.PropTypes.objectOf(Model).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASET MANAGEMENT] Testing model Modele', () => {
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

