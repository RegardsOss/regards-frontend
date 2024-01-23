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
import CollectionActions from '../../src/rs-dam/collection/CollectionActions'
import CollectionReducer from '../../src/rs-dam/collection/CollectionReducer'
import CollectionSelectors from '../../src/rs-dam/collection/CollectionSelectors'
import CollectionDump from './Collection.dump'

const backendServerResultList = CollectionDump

const options = {
}

const collectionActions = new CollectionActions('test/action')
const collectionReducer = CollectionReducer('test/action')
const collectionSelectors = CollectionSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(collectionActions, collectionReducer, collectionSelectors, DataManagementShapes.CollectionList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing client Collection', () => {
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
