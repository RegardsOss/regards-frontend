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
import { StorageShapes } from '@regardsoss/shape'

import EntityActions from '../../src/rs-storage/location/StorageLocationActions'
import getEntityReducer from '../../src/rs-storage/location/StorageLocationReducers'
import getEntitySelectors from '../../src/rs-storage/location/StorageLocationSelectors'
import dump from './StorageLocation.dump'

const options = {
}

const actions = new EntityActions('test/action')
const reducer = getEntityReducer('test/action')
const selectors = getEntitySelectors(['test', 'files'])

const entityTester = new ReduxEntityTester(actions, reducer, selectors, StorageShapes.StorageLocationList.isRequired, dump, options)

describe('[ADMIN CLIENT] Testing client StorageLocation', () => {
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
