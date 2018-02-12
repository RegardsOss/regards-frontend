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
 **/
import { ReduxEntityTester } from '@regardsoss/tests-helpers'
import { AccessShapes } from '@regardsoss/shape'
import { AccessProjectClient } from '../../src/main'
import ModulesListDump from './ModulesList.dump'

const backendServerResultList = ModulesListDump
const options = {
  urlParams: { applicationId: 'user' },
}

const ModulesActions = new AccessProjectClient.ModuleActions('test/action')
const ModulesReducer = AccessProjectClient.ModuleReducers('test/action')
const ModulesSelector = AccessProjectClient.ModuleSelectors(['test', 'modules'])
const entityTester = new ReduxEntityTester(ModulesActions, ModulesReducer, ModulesSelector, AccessShapes.ModuleList.isRequired, backendServerResultList, options)

/**
 * Tests for Modules entities
 * @author Sébastien binda
 */
describe('[ADMIN CLIENT] Testing client Module', () => {
  before(() => {
    entityTester.beforeAll()
  })

  after(() => {
    entityTester.afterAll()
  })
  xit('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    entityTester.runTests(done)
  })
})

