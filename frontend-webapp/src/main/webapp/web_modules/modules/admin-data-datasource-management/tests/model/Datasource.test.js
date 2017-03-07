/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Datasource } from '@regardsoss/model'
import DatasourceActions from '../../src/model/DatasourceActions'
import DatasourceReducers from '../../src/model/DatasourceReducers'
import DatasourceSelectors from '../../src/model/DatasourceSelectors'
import DatasourceNetworkDump from './dump/DatasourceNetworkDump'

const backendServerResultList = DatasourceNetworkDump

const options = {
}

const entityTester = new ReduxEntityTester(DatasourceActions, DatasourceReducers, DatasourceSelectors, React.PropTypes.objectOf(Datasource).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing model Datasource', () => {
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

