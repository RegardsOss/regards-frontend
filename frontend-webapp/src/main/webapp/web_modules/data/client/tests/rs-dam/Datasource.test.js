/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Datasource } from '@regardsoss/model'
import DatasourceActions from '../../src/rs-dam/datasource/DatasourceActions'
import DatasourceReducer from '../../src/rs-dam/datasource/DatasourceReducer'
import DatasourceSelectors from '../../src/rs-dam/datasource/DatasourceSelectors'
import DatasourceNetworkDump from './Datasource.dump'

const backendServerResultList = DatasourceNetworkDump
const datasourceActions = new DatasourceActions('test/action')
const datasourceReducer = DatasourceReducer('test/action')
const datasourceSelectors = DatasourceSelectors(['test', 'modules'])
const options = {
}

const entityTester = new ReduxEntityTester(datasourceActions, datasourceReducer, datasourceSelectors, PropTypes.objectOf(Datasource).isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model Datasource', () => {
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

