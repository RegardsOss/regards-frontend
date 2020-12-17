/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CatalogDomain } from '@regardsoss/domain'
import AttributesBoundsActions from '../../../src/rs-catalog/search/AttributesBoundsActions'
import AttributesBoundsReducer from '../../../src/rs-catalog/search/AttributesBoundsReducer'
import AttributesBoundsSelectors from '../../../src/rs-catalog/search/AttributesBoundsSelectors'
import AttributesBoundsNetworkDump from './AttributesBounds.dump'

const backendServerResultList = AttributesBoundsNetworkDump
const options = {
  pathParams: {
    engineType: CatalogDomain.LEGACY_SEARCH_ENGINE,
  },
}

const attributesBoundsActions = new AttributesBoundsActions('test/action')
const attributesBoundsReducer = AttributesBoundsReducer('test/action')
const attributesBoundsSelectors = AttributesBoundsSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(attributesBoundsActions, attributesBoundsReducer, attributesBoundsSelectors, CatalogShapes.AttributeBoundsMap, backendServerResultList, options)

describe('[ADMIN CLIENT] Testing model AttributesBounds', () => {
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
