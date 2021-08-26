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
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ProjectUserListContainer } from '../../src/containers/ProjectUserListContainer'
import ProjectUserListComponent from '../../src/components/list/ProjectUserListComponent'
// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing ProjectUserListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListContainer)
  })
  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project: 'any',
        visualisationMode: 'account',
      },
      // from mapStateToProps
      pageMeta: {
        number: 1,
        size: 20,
        totalElements: 20,
      },
      authentication: {},

      // from mapDispatchToProps
      fetchUsers: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const instance = enzymeWrapper.instance()
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      project: props.params.project,
      csvLink: 'http://localhost:8000/api/v1/rs-admin/users/export',
      onRefresh: instance.onRefresh,
      onCreate: instance.onCreate,
      onBack: instance.onBack,
      visualisationMode: props.params.visualisationMode,
    })
  })
})
