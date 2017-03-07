/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Connection } from '@regardsoss/model'
import ConnectionActions from '../../src/model/ConnectionActions'
import ConnectionReducers from '../../src/model/ConnectionReducers'
import ConnectionSelectors from '../../src/model/ConnectionSelectors'
import ConnectionNetworkDump from './dump/ConnectionNetworkDump'

const backendServerResultList = ConnectionNetworkDump

const options = {
}

const entityTester = new ReduxEntityTester(ConnectionActions, ConnectionReducers, ConnectionSelectors, React.PropTypes.objectOf(Connection).isRequired, backendServerResultList, options)

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing model Connection', () => {
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

