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
import { RoleFormContainer } from '../../src/containers/RoleFormContainer'
import RoleFormComponent from '../../src/components/RoleFormComponent'

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing RoleFormContainer container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RoleFormContainer)
    assert.isDefined(RoleFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        // eslint-disable-next-line camelcase
        project_name: 'project name', // eslint wont fix: matches server format
      },
      // from mapStateToProps
      role: {
        content: {
          id: 1,
          name: 'project name',
          // eslint-disable-next-line camelcase
          parent_role_id: 'project desc', // eslint wont fix: matches server format
          // eslint-disable-next-line camelcase
          is_default: true, // eslint wont fix: matches server format
          // eslint-disable-next-line camelcase
          is_native: true, // eslint wont fix: matches server format
        },
      },
      isFetching: false,
      // from mapDispatchToProps
      createRole: () => { },
      updateRole: () => { },
      fetchRoleList: () => { },
    }

    const enzymeWrapper = shallow(<RoleFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(RoleFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
