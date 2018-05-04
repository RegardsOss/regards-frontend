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
import { AdminShapes } from '@regardsoss/shape'
import AccountActions from '../../src/rs-admin-instance/account/AccountActions'
import getAccountReducer from '../../src/rs-admin-instance/account/AccountReducer'
import getAccountSelectors from '../../src/rs-admin-instance/account/AccountSelectors'
import AccountNetworkDump from './Account.dump'

const backendServerResultList = AccountNetworkDump
const options = {
}


const actions = new AccountActions('test/action')
const reducer = getAccountReducer('test/action')
const selectors = getAccountSelectors(['test', 'modules'])
const entityTester = new ReduxEntityTester(actions, reducer, selectors, AdminShapes.ProjectUserList.isRequired, backendServerResultList, options)

describe('[ADMIN ACCOUNT MANAGEMENT] Testing model Account', () => {
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

