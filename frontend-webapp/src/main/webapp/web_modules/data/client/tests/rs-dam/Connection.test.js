/**
 * LICENSE_PLACEHOLDER
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { Connection } from '@regardsoss/model'
import ConnectionActions from '../../src/rs-dam/connection/ConnectionActions'
import ConnectionReducer from '../../src/rs-dam/connection/ConnectionReducer'
import ConnectionSelectors from '../../src/rs-dam/connection/ConnectionSelectors'
import ConnectionNetworkDump from './Connection.dump'

const backendServerResultList = ConnectionNetworkDump
const options = {
}
const connectionActions = new ConnectionActions('test/action')
const connectionReducer = ConnectionReducer('test/action')
const connectionSelectors = ConnectionSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(connectionActions, connectionReducer, connectionSelectors, PropTypes.objectOf(Connection).isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model Connection', () => {
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

