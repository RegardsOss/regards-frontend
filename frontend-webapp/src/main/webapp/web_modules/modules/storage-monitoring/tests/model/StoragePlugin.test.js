/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 */
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { StorageShapes } from '@regardsoss/shape'
import { storagePluginsActions, storagePluginsReducer, storagePluginsSelectors } from '../../src/clients/StoragePluginsClient'

const backendServerResultList = [{
  content: {
    id: 1,
    label: 'ServerHDD',
    description: 'Main server hard drives',
    totalSize: '25To',
    usedSize: '0.9To',
  },
  links: [],
}]

// URL options and parameters
const options = {}

const entityTester = new ReduxEntityTester(storagePluginsActions, storagePluginsReducer, storagePluginsSelectors, StorageShapes.StoragePluginList.isRequired, backendServerResultList, options)

describe('[STORAGE PLUGINS MONITORING] Testing model StoragePlugin', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it within the store.', (done) => {
    entityTester.runTests(done)
  })
})
