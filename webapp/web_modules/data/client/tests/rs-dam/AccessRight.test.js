/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import AccessRightActions from '../../src/rs-dam/accessRight/AccessRightActions'
import getAccessRightReducer from '../../src/rs-dam/accessRight/AccessRightReducer'
import getAccessRightSelectors from '../../src/rs-dam/accessRight/AccessRightSelectors'
import AccessRightDump from './AccessRight.dump'

const backendServerResultList = AccessRightDump

const options = {
}

const accessRightActions = new AccessRightActions('test/action')
const accessRightReducer = getAccessRightReducer('test/action')
const accessRightSelectors = getAccessRightSelectors(['test', 'modules'])


const entityTester = new ReduxEntityTester(accessRightActions, accessRightReducer, accessRightSelectors, DataManagementShapes.AccessRightList.isRequired, backendServerResultList, options)

describe('[ADMIN ACCESSRIGHT MANAGEMENT] Testing model AccessRight', () => {
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
