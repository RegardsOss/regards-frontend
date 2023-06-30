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
import { AdminShapes } from '@regardsoss/shape'

import RoleActions from '../../src/rs-admin/role/RoleActions'
import getRoleReducer from '../../src/rs-admin/role/RoleReducer'
import getRoleSelectors from '../../src/rs-admin/role/RoleSelectors'
import RoleDump from './Role.dump'

const options = {
}

const roleActions = new RoleActions('test/action')
const roleReducer = getRoleReducer('test/action')
const roleSelectors = getRoleSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(roleActions, roleReducer, roleSelectors, AdminShapes.RoleList.isRequired, RoleDump, options)

describe('[ADMIN CLIENT] Testing client role', () => {
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
