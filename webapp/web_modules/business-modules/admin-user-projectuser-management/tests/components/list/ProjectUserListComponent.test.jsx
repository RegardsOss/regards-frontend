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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import {
  TableHeaderLoadingComponent, TableHeaderCheckbox, InfiniteTableContainer, TableHeaderText,
} from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ProjectUserListComponent from '../../../src/components/list/ProjectUserListComponent'
import AccessGroupFilterComponent from '../../../src/components/list/AccessGroupFilterComponent'
import EditQuotaComponent from '../../../src/components/list/options/EditQuotaComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

const initialProps = {
  users: [],
  waitingUsersCount: 0,
  groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
  isLoading: false,
  uiSettings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
  createUrl: 'url/create',
  backUrl: 'url/back',
  onEdit: () => { },
  onDelete: () => { },
  onValidate: () => { },
  onValidateAll: () => { },
  onAccept: () => { },
  onDeny: () => { },
  onEnable: () => { },
  onDisable: () => { },
  onSelectGroup: () => { },
  onToggleOnlyWaitingUsers: () => { },
  onToggleOnlyLowQuotaUsers: () => {},
  onSetMaxQuota: () => {},
}

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListComponent)
  })
  it('should render self loading / unfiltered users / hiding quota', () => {
    const props = {
      ...initialProps,
      isLoading: true,
      showQuota: false,
      showOnlyWaitingUsers: false,
      showOnlyLowQuotaUsers: false,
      selectedGroup: null,
    }
    const enzymeWrapper = shallow(<ProjectUserListComponent {...props} />, { context })
    // check table header
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderText, {
      text: 'projectUser.list.users.count',
    }, 'Waiting users count should be displayed')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderLoadingComponent, {
      loading: true,
    }, 'Loading header should be displayed in loading state')
    testSuiteHelpers.assertNotComp(enzymeWrapper, TableHeaderCheckbox, 'Only low quota user should be hidden (quota not available)', {
      label: 'projectUser.list.only.low.quota',
    })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderCheckbox, {
      label: 'projectUser.list.only.waiting.users',
      checked: false,
      disabled: true,
      onCheck: props.onToggleOnlyWaitingUsers,
    }, 'Only waiting user should be displayed unchecked')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, AccessGroupFilterComponent, {
      groups: props.groups,
      selectedGroup: null,
      isLoading: true,
      onSelectGroup: props.onSelectGroup,
    }, 'Group filter selector should be displayed with right properties')
    const tableWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, InfiniteTableContainer, {
      entities: props.users,
    }, 'There should be table with right users list')
    // check columns does contain quota related column and option
    const { columns } = tableWrapper.props()
    assert.isNotOk(columns.find((c) => c.key === 'quota'), 'There should not be quota column')
    assert.isNotOk(columns[columns.length - 1].rowCellDefinition.props.optionsDefinitions.find((opt) => opt.OptionConstructor === EditQuotaComponent), 'There should not be quota option')
  })
  it('should render self loaded / filtering users / showing quota', () => {
    // other elements: tested in previous tests
    const props = {
      ...initialProps,
      users: values(DumpProvider.get('AccessProjectClient', 'ProjectUser')),
      selectedGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      isLoading: false,
      showQuota: true,
      showOnlyWaitingUsers: true,
      showOnlyLowQuotaUsers: true,
    }

    const enzymeWrapper = shallow(<ProjectUserListComponent {...props} />, { context })
    // check table header
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderText, {
      text: 'projectUser.list.users.count',
    }, 'Waiting users count should be displayed')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderLoadingComponent, {
      loading: false,
    }, 'Loading header should be displayed in idle state')
    testSuiteHelpers.assertNotComp(enzymeWrapper, TableHeaderCheckbox, 'Only low quota user should be hidden (quota not available)', {
      label: 'projectUser.list.only.low.quota',
      checked: true,
      disabled: false,
      onCheck: props.onToggleOnlyLowQuotaUsers,
    })
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, TableHeaderCheckbox, {
      label: 'projectUser.list.only.waiting.users',
      checked: true,
      disabled: false,
      onCheck: props.onToggleOnlyWaitingUsers,
    }, 'Only waiting user should be displayed unchecked')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, AccessGroupFilterComponent, {
      groups: props.groups,
      selectedGroup: props.selectedGroup,
      isLoading: false,
      onSelectGroup: props.onSelectGroup,
    }, 'Group filter selector should be displayed with right properties')
    const tableWrapper = testSuiteHelpers.assertCompWithProps(enzymeWrapper, InfiniteTableContainer, {
      entities: props.users,
    }, 'There should be table with right users list')
    // check columns does contain quota related column and option
    const { columns } = tableWrapper.props()
    assert.isOk(columns.find((c) => c.key === 'quota'), 'There should be quota column')
    assert.isOk(columns[columns.length - 1].rowCellDefinition.props.optionsDefinitions.find((opt) => opt.OptionConstructor === EditQuotaComponent), 'There should be quota option')
  })
})
