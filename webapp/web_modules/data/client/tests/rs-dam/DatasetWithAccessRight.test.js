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

import DatasetWithAccessRightActions from '../../src/rs-dam/accessRight/DatasetWithAccessRightActions'
import getDatasetWithAccessRightReducer from '../../src/rs-dam/accessRight/DatasetWithAccessRightReducer'
import getDatasetWithAccessRightSelectors from '../../src/rs-dam/accessRight/DatasetWithAccessRightSelectors'
import DatasetWithAccessRightDump from './DatasetWithAccessRight.dump'

const backendServerResultList = DatasetWithAccessRightDump

const options = {
  pathParams: {
    accessGroupName: 'group2georges',
  },
}

const datasetWithAccessRightActions = new DatasetWithAccessRightActions('test/action')
const datasetWithAccessRightReducer = getDatasetWithAccessRightReducer('test/action')
const datasetWithAccessRightSelectors = getDatasetWithAccessRightSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(datasetWithAccessRightActions, datasetWithAccessRightReducer, datasetWithAccessRightSelectors, DataManagementShapes.DatasetWithAccessRightList.isRequired, backendServerResultList, options)

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing model DatasetWithAccessRight', () => {
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
