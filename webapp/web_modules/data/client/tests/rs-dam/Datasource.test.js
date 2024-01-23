/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const entityTester = new ReduxEntityTester(datasourceActions, datasourceReducer, datasourceSelectors, DataManagementShapes.DatasourceList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model Datasource', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    ReduxEntityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    entityTester.runTests(done)
  })
})
