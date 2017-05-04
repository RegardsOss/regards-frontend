import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Dataset } from '@regardsoss/model'
import DatasetActions from '../../src/rs-dam/dataset/DatasetActions'
import DatasetReducer from '../../src/rs-dam/dataset/DatasetReducer'
import DatasetSelectors from '../../src/rs-dam/dataset/DatasetSelectors'
import DatasetNetworkDump from './Dataset.dump'

const backendServerResultList = DatasetNetworkDump
const options = {
}

const datasetActions = new DatasetActions('test/action')
const datasetReducer = DatasetReducer('test/action')
const datasetSelectors = DatasetSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(datasetActions, datasetReducer, datasetSelectors, React.PropTypes.objectOf(Dataset).isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model Collection', () => {
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
