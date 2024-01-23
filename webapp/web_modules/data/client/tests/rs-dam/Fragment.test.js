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
import FragmentActions from '../../src/rs-dam/fragment/FragmentActions'
import FragmentReducer from '../../src/rs-dam/fragment/FragmentReducer'
import FragmentSelectors from '../../src/rs-dam/fragment/FragmentSelectors'
import FragmentListDump from './Fragment.dump'

const backendServerResultList = FragmentListDump
const options = {
}

const fragmentActions = new FragmentActions('test/action')
const fragmentReducer = FragmentReducer('test/action')
const fragmentSelectors = FragmentSelectors(['test', 'modules'])
const entityTester = new ReduxEntityTester(fragmentActions, fragmentReducer, fragmentSelectors, DataManagementShapes.FragmentList.isRequired, backendServerResultList, options)

/**
 * Tests for Modules entities
 * @author Léo Mieulet
 */
describe('[ADMIN CLIENT] Testing client Fragment', () => {
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
