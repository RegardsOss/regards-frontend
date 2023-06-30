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
import { CatalogShapes } from '@regardsoss/shape'
import LinkPluginDatasetActions from '../../src/rs-catalog/linkPluginDataset/LinkPluginDatasetActions'
import LinkPluginDatasetReducer from '../../src/rs-catalog/linkPluginDataset/LinkPluginDatasetReducer'
import LinkPluginDatasetSelectors from '../../src/rs-catalog/linkPluginDataset/LinkPluginDatasetSelectors'
import LinkPluginDatasetNetworkDump from './LinkPluginDataset.dump'

const backendServerResultList = LinkPluginDatasetNetworkDump
const options = {
}

const linkPluginDatasetActions = new LinkPluginDatasetActions('test/action')
const linkPluginDatasetReducer = LinkPluginDatasetReducer('test/action')
const linkPluginDatasetSelectors = LinkPluginDatasetSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(linkPluginDatasetActions, linkPluginDatasetReducer, linkPluginDatasetSelectors, CatalogShapes.LinkPluginDatasetList.isRequired, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model LinkPluginDataset', () => {
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
