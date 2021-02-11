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
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { RoleListContainer } from '../../src/containers/RoleListContainer'
import RoleListComponent from '../../src/components/RoleListComponent'

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RoleListContainer)
    assert.isDefined(RoleListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project: 'project1',
      },
      // from mapStateToProps
      projectList: {
        'project name': {
          content: {
            id: '1',
            name: 'project name',
            description: 'project desc',
            icon: 'project icon',
            isPublic: true,
          },
        },
      },
      // from mapDispatchToProps
      fetchRoleList: () => {},
      deleteRole: () => {},
      onLogout: () => {},
    }

    const enzymeWrapper = shallow(<RoleListContainer {...props} />)
    const subComponent = enzymeWrapper.find(RoleListComponent)
    expect(subComponent).to.have.length(1)
  })
})
