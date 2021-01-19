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
import { DumpProvider, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { getMetadataArray } from '@regardsoss/user-metadata-common'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { AdminDomain } from '@regardsoss/domain'
import { ProjectUserFormContainer } from '../../src/containers/ProjectUserFormContainer'
import ProjectUserFormComponent from '../../src/components/ProjectUserFormComponent'

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing ProjectUserFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserFormContainer)
  })

  it('should render correctly in edition', () => {
    const props = {
      params: {
        project: 'test-project',
        user_id: '1',
      },
      roleList: DumpProvider.get('AdminClient', 'Role'),
      groupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      user: DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser'),
      passwordRules: 'Open bar password',
      settings: {
        content: {
          id: 0,
          mode: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
          maxQuota: 500,
          rateLimit: 50,
        },
      },
      // from mapDispatchToProps
      createProjectUser: () => { },
      updateProjectUser: () => { },
      fetchUser: () => {},
      fetchSettings: () => {},
      fetchRoleList: () => {},
      fetchGroupList: () => {},
      fetchPasswordRules: () => {},
      fetchPasswordValidity: () => {},
      assignGroup: () => {},
      unassignGroup: () => {},
    }

    const enzymeWrapper = shallow(<ProjectUserFormContainer {...props} />)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, LoadableContentDisplayDecorator, {
      isLoading: true,
    })
    // simulate initial loading end
    enzymeWrapper.setState({ isLoading: false })
    const loadableWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, LoadableContentDisplayDecorator, {
      isLoading: false,
    })
    // check data provided to form
    testSuiteHelpers.assertCompWithProps(loadableWrapper, ProjectUserFormComponent, {
      passwordRules: props.passwordRules,
      userMetadata: getMetadataArray(DumpProvider.getFirstEntity('AccessProjectClient', 'ProjectUser')),
      currentUser: props.user,
      settings: props.settings,
      fetchPasswordValidity: props.fetchPasswordValidity,
      onSubmit: enzymeWrapper.instance().onSubmit,
      backUrl: enzymeWrapper.instance().getBackUrl(),
      roleList: props.roleList,
      groupList: props.groupList,
    })
  })
  it('should render correctly in creation', () => {
    const props = {
      params: {
        project: 'test-project',
      },
      roleList: DumpProvider.get('AdminClient', 'Role'),
      groupList: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      user: null,
      passwordRules: 'Open bar password',
      settings: {
        content: {
          id: 0,
          mode: AdminDomain.PROJECT_USER_SETTINGS_MODE_ENUM.AUTO,
          maxQuota: 500,
          rateLimit: 50,
        },
      },
      // from mapDispatchToProps
      createProjectUser: () => { },
      updateProjectUser: () => { },
      fetchUser: () => {},
      fetchSettings: () => {},
      fetchRoleList: () => {},
      fetchGroupList: () => {},
      fetchPasswordRules: () => {},
      fetchPasswordValidity: () => {},
      assignGroup: () => {},
      unassignGroup: () => {},
    }

    const enzymeWrapper = shallow(<ProjectUserFormContainer {...props} />)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, LoadableContentDisplayDecorator, {
      isLoading: true,
    })
    // simulate initial loading end
    enzymeWrapper.setState({ isLoading: false })
    const loadableWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, LoadableContentDisplayDecorator, {
      isLoading: false,
    })
    // check data provided to form
    testSuiteHelpers.assertCompWithProps(loadableWrapper, ProjectUserFormComponent, {
      passwordRules: props.passwordRules,
      userMetadata: getMetadataArray(),
      currentUser: null,
      settings: props.settings,
      fetchPasswordValidity: props.fetchPasswordValidity,
      onSubmit: enzymeWrapper.instance().onSubmit,
      backUrl: enzymeWrapper.instance().getBackUrl(),
      roleList: props.roleList,
      groupList: props.groupList,
    })
  })
})
