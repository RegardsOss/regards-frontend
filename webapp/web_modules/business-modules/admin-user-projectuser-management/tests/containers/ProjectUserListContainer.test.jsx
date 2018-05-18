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
import pickBy from 'lodash/pickBy'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProjectUserListContainer } from '../../src/containers/ProjectUserListContainer'
import ProjectUserListComponent from '../../src/components/ProjectUserListComponent'

const users = {
  1: {
    content: {
      id: 1,
      email: 'admin@cnes.fr',
      lastUpdate: '2017-02-20T11:55:05.012',
      lastConnection: '2023-04-30T18:20:02.012',
      role: { id: 2, name: 'REGISTERED_USER' },
      status: 'ACCESS_GRANTED',
      permissions: [],
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      email: 'testUWaitingAccess@cnes.fr',
      lastUpdate: '2017-02-20T11:55:05.015',
      lastConnection: '2023-04-30T18:20:02.012',
      role: {
        id: 2,
        name: 'REGISTERED_USER',
      },
      status: 'WAITING_ACCESS',
      permissions: [],
    },
    links: [],
  },
  3: {
    content: {
      id: 3,
      email: 'testUWaitingAccess2@cnes.fr',
      lastUpdate: '2017-02-20T11:55:05.012',
      lastConnection: '2023-04-30T18:20:02.012',
      role: {
        id: 2,
        name: 'REGISTERED_USER',
      },
      status: 'WAITING_ACCESS',
      permissions: [],
    },
    links: [],
  },
}

const waitingUsers = pickBy(users, user => user.content.status === 'WAITING_ACCESS')

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListContainer)
  })
  it('should render self and subcomponents', () => {
    const props = {
      params: { project: 'any' },
      // from mapStateToProps
      users,
      waitingAccessUsers: waitingUsers,
      isFetchingContent: false,
      // from mapDispatchToProps
      fetchUsers: () => { },
      fetchWaitingAccessUsers: () => { },
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectUserListComponent)
    expect(subComponent).to.have.length(1)
  })
})
