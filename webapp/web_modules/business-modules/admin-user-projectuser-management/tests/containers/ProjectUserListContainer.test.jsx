/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
      groups: {},
      origins: {},
      isFetchingViewData: false,
      isFetchingActions: false,
      roleList: {},
      uiSettings: {
        showVersion: false,
        documentModels: [],
        primaryQuicklookGroup: 'pipou',
        quotaWarningCount: 150,
        rateWarningCount: 5,
      },
      authentication: {}, // used only in onPropertiesUpdated
      // from mapDispatchToProps
      fetchUsers: () => { },
      onDeleteAccount: () => { },
      onValidateProjectUser: () => { },
      onDenyProjectUser: () => { },
      onSendEmailConfirmation: () => { },
      onDisableProjectUser: () => { },
      onEnableProjectUser: () => { },
      fetchOrigins: () => { },
      throwError: () => { },
      fetchRoleList: () => { },
      onUpdateAccount: () => { },
      fetchUISettings: () => { },
      fetchGroups: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const instance = enzymeWrapper.instance()
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      project: props.params.project,
      csvLink: '',
      onRefresh: instance.onRefresh,
      onCreate: instance.onCreate,
      onBack: instance.onBack,
      visualisationMode: props.params.visualisationMode,
      onDeleteAccount: instance.onDeleteAccount,
      onEnable: instance.onEnableProjectUser,
      onValidate: instance.onValidateProjectUser,
      onDeny: instance.onDenyProjectUser,
      onDisable: instance.onDisableProjectUser,
      onSendEmailConfirmation: instance.onSendEmailConfirmation,
      onSetMaxQuota: instance.onSetMaxQuota,
      uiSettings: props.uiSettings,
      totalElements: props.pageMeta.totalElements,
      origins: props.origins,
      isLoading: false,
      onEdit: instance.onEdit,
      roleList: props.roleList,
      groups: props.groups,
    })
  })
})
