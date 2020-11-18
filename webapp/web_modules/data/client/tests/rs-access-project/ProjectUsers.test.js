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

import { Error } from 'window-or-global'
import ProjectUserActions from '../../src/rs-access-project/user/ProjectUserActions'
import getProjectUserReducer from '../../src/rs-access-project/user/ProjectUserReducer'
import getProjectUserSelectors from '../../src/rs-access-project/user/ProjectUserSelectors'
import ProjectUserDump from './ProjectUser.dump'

const options = {
}

const projectUserActions = new ProjectUserActions('test/action')
const projectUserReducer = getProjectUserReducer('test/action')
const projectUserSelectors = getProjectUserSelectors(['test', 'modules'])

const entityTester = new ReduxEntityTester(projectUserActions, projectUserReducer, projectUserSelectors, AccessShapes.ProjectUserList.isRequired, ProjectUserDump, options)

describe('[ADMIN CLIENT] Testing client projectUser', () => {
  before(() => {
    entityTester.beforeAll()
  })
  after(() => {
    entityTester.afterAll()
  })
  it('should retrieve the list of items, reduce it, and store it on the store.', (done) => {
    throw new Error('change dump then re-run')
    entityTester.runTests(done)
  })
})
