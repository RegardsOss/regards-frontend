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
import { AccessShapes } from '@regardsoss/shape'
import WaitingAccessUsersEntitiesActions from '../../src/rs-access-project/user/WaitingAccessUsersEntitiesActions'
import getWaitingAccessUsersEntitiesReducer from '../../src/rs-access-project/user/WaitingAccessUsersEntitiesReducer'
import getWaitingAccessUsersEntitiesSelectors from '../../src/rs-access-project/user/WaitingAccessUsersEntitiesSelectors'
import WaitingAccessUsersEntitiesDump from './WaitingAccessUsersEntities.dump'

const options = {
}

const waitingAccessUsersEntitiesActions = new WaitingAccessUsersEntitiesActions('test/action')
const waitingAccessUsersEntitiesReducer = getWaitingAccessUsersEntitiesReducer('test/action')
const waitingAccessUsersEntitiesSelectors = getWaitingAccessUsersEntitiesSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(waitingAccessUsersEntitiesActions, waitingAccessUsersEntitiesReducer, waitingAccessUsersEntitiesSelectors, AccessShapes.ProjectUserList.isRequired, WaitingAccessUsersEntitiesDump, options)

describe('[ADMIN CLIENT] Testing client waitingAccessUsersEntities', () => {
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
