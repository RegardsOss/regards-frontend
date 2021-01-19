/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { DataManagementShapes } from '@regardsoss/shape'
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

const entityTester = new ReduxEntityTester(connectionActions, connectionReducer, connectionSelectors, DataManagementShapes.ConnectionList.isRequired, backendServerResultList, options)

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
