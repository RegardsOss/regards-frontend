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
import { TableHeaderLoadingComponent, TableHeaderCheckbox, InfiniteTableContainer } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ProjectUserListComponent from '../../../src/components/list/ProjectUserListComponent'
import AccessGroupFilterComponent from '../../../src/components/list/AccessGroupFilterComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

const initialProps = {
  users: [],
  waitingUsersCount: 0,
  groups: {},
  selectedGroup: null,
  isLoading: false,
  showOnlyWaitingUsers: false,

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
}

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing project user list component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectUserListComponent)
  })
  it('should render self loading view data (no data)', () => {
    const props = {
      ...initialProps,
      isLoading: true,
    }
    const enzymeWrapper = shallow(<ProjectUserListComponent {...props} />, { context })
    const loaderWrapper = enzymeWrapper.find(TableHeaderLoadingComponent)
    assert.lengthOf(loaderWrapper, 1, 'There should be the loader displayer')
    assert.isTrue(loaderWrapper.props().loading, 'It should be marked loading')

    // Check we can find other options in header and check there props
    const checkbox = enzymeWrapper.find(TableHeaderCheckbox)
    assert.lengthOf(checkbox, 1, 'There should be show only waiting users check box')
    testSuiteHelpers.assertWrapperProperties(checkbox, {
      checked: props.showOnlyWaitingUsers,
      label: 'projectUser.list.only.waiting.users',
      disabled: props.isLoading,
      onCheck: props.onToggleOnlyWaitingUsers,
    }, 'Checkbox properties should be correctly computed')

    const groupFilter = enzymeWrapper.find(AccessGroupFilterComponent)
    assert.lengthOf(groupFilter, 1, 'There should be group filter')
    testSuiteHelpers.assertWrapperProperties(groupFilter, {
      groups: props.groups,
      selectedGroup: props.selectedGroup,
      isLoading: props.isLoading,
      onSelectGroup: props.onSelectGroup,
    }, 'Group filter properties should be correctly computed')

    // Finally there should be the table
    const table = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be users table')
    const tableProps = table.props()
    assert.isNotEmpty(tableProps.columns, 'There should be columns')
    assert.equal(tableProps.entities, props.users, 'Table entities should be driven by parent through this props')
    assert.isOk(tableProps.emptyComponent, 'There should be the empty component')
  })
  it('should render self after loading (with data)', () => {
    // other elements: tested in previous tests
    const props = {
      ...initialProps,
      isLoading: false,
      users: values(DumpProvider.get('AccessProjectClient', 'ProjectUser')),
      selectedGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
    }

    const enzymeWrapper = shallow(<ProjectUserListComponent {...props} />, { context })
    const loaderWrapper = enzymeWrapper.find(TableHeaderLoadingComponent)
    assert.lengthOf(loaderWrapper, 1, 'There should be the loader displayer')
    assert.isFalse(loaderWrapper.props().loading, 'It should not be marked loading')

    // Check we can find other options in header and check there props
    const checkbox = enzymeWrapper.find(TableHeaderCheckbox)
    assert.lengthOf(checkbox, 1, 'There should be show only waiting users check box')
    testSuiteHelpers.assertWrapperProperties(checkbox, {
      checked: props.showOnlyWaitingUsers,
      label: 'projectUser.list.only.waiting.users',
      disabled: props.isLoading,
      onCheck: props.onToggleOnlyWaitingUsers,
    }, 'Checkbox properties should be correctly computed')

    const groupFilter = enzymeWrapper.find(AccessGroupFilterComponent)
    assert.lengthOf(groupFilter, 1, 'There should be group filter')
    testSuiteHelpers.assertWrapperProperties(groupFilter, {
      groups: props.groups,
      selectedGroup: props.selectedGroup,
      isLoading: props.isLoading,
      onSelectGroup: props.onSelectGroup,
    }, 'Group filter properties should be correctly computed')

    // Finally there should be the table
    const table = enzymeWrapper.find(InfiniteTableContainer)
    assert.lengthOf(table, 1, 'There should be users table')
    const tableProps = table.props()
    assert.isNotEmpty(tableProps.columns, 'There should be columns')
    assert.equal(tableProps.entities, props.users, 'Table entities should be driven by parent through this props')
    assert.isOk(tableProps.emptyComponent, 'There should be the empty component')
  })
})
