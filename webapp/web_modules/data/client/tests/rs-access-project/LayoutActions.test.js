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
import { AccessShapes } from '@regardsoss/shape'
import { AccessProjectClient } from '../../src/main'
import LayoutListDump from './LayoutList.dump'

const backendServerResultList = LayoutListDump
const options = {}

const LayoutActions = new AccessProjectClient.LayoutActions('test/action')
const LayoutReducer = AccessProjectClient.getLayoutReducer('test/action')
const LayoutSelector = AccessProjectClient.getLayoutSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(LayoutActions, LayoutReducer, LayoutSelector, AccessShapes.LayoutList.isRequired, backendServerResultList, options)

/**
 * Tests for Layout entities
 * @author Sébastien binda
 */
describe('[ADMIN CLIENT] Testing client Layout', () => {
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
