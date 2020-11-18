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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AdminDomain } from '@regardsoss/domain'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectUserListContainer } from '../../src/containers/ProjectUserListContainer'
import ProjectUserListComponent from '../../src/components/list/ProjectUserListComponent'

/**
 * Creates groups as returned by server
 * @param {[{name: string, isPublic: boolean, users: [string]}]} groupDefinitions
 */
function createGroups(groupDefinitions) {
  const groupContentModel = DumpProvider.getFirstEntityContent('DataManagementClient', 'AccessGroup')
  return groupDefinitions.reduce((acc, { name, isPublic, users }, index) => ({
    ...acc,
    [index]: {
      content: {
        ...groupContentModel,
        id: index,
        name,
        isPublic,
        users: users.map((email) => ({ email })),
      },
    },
  }), {})
}
/**
 * Creates users as returned by server
 * @param {[{email: string, status: string}]} userDefinitions
 */
function createUsers(userDefinitions) {
  const userContentModel = DumpProvider.getFirstEntityContent('AccessProjectClient', 'ProjectUser')
  return userDefinitions.reduce((acc, { email, status }, index) => ({
    ...acc,
    [index]: {
      content: {
        ...userContentModel,
        id: index,
        email,
        status,
      },
    },
  }), {})
}

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
      users: DumpProvider.get('AccessProjectClient', 'ProjectUser'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetchingViewData: true,
      isFetchingActions: true,
      location: {},
      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectUserListComponent)
    assert.lengthOf(subComponent, 1)
    const state = enzymeWrapper.state()
    const instance = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      users: state.users,
      waitingUsersCount: state.waitingUsersCount,
      selectedGroup: state.selectedGroup,
      groups: props.groups,
      isLoading: true,
      showOnlyWaitingUsers: state.showOnlyWaitingUsers,
      createUrl: instance.getCreateUrl(),
      backUrl: instance.getBackUrl(),
      onEdit: instance.onEdit,
      onDelete: instance.onDelete,
      onValidate: instance.onValidate,
      onValidateAll: instance.onValidateAll,
      onDeny: instance.onDeny,
      onEnable: instance.onEnable,
      onDisable: instance.onDisable,
      onToggleOnlyWaitingUsers: instance.onToggleOnlyWaitingUsers,
      onSelectGroup: instance.onSelectGroup,
    })
  })
  it('should update visibles users list on URL parameters changes or on fetch data change', () => {
    const users = createUsers([
      { email: 'u1@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_GRANTED },
      { email: 'u2@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_DENIED },
      { email: 'u3@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS },
      { email: 'u4@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS }])
    const groups = createGroups([
      { name: 'g1', isPublic: false, users: ['u1@u.com', 'u2@u.com', 'u3@u.com'] },
      { name: 'g2', isPublic: false, users: ['u2@u.com'] },
      { name: 'g3', isPublic: true, users: ['u2@u.com'] }])

    // Loading time: parameters are set but data is not
    const props = {
      params: { project: 'any' },
      // from mapStateToProps
      users: {},
      groups: {},
      isFetchingViewData: true,
      isFetchingActions: true,
      location: { query: { onlyWaiting: 'true', group: 'g1' } },
      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const state1 = enzymeWrapper.state()
    // [1] No group or user was retrieved yet
    assert.isNull(state1.selectedGroup, '[1] While groups are not available, selected group should be null')
    assert.isTrue(state1.showOnlyWaitingUsers, '[1] Show only waiting users should be true')
    assert.lengthOf(state1.users, 0, '[1] No loaded user yet')
    assert.equal(state1.waitingUsersCount, 0, '[1] No waiting user yet')

    // [2] fetch user done, the current list should now be filtered on onlyWaitingUsers
    const props2 = {
      ...props,
      users,
    }
    enzymeWrapper.setProps(props2)
    const state2 = enzymeWrapper.state()
    assert.isNull(state2.selectedGroup, '[2] While groups are not available, selected group should be null')
    assert.isTrue(state2.showOnlyWaitingUsers, '[2] Show only waiting users should be true')
    assert.lengthOf(state2.users, 2, '[2] The waiting users should be selected')
    assert.isTrue(state2.users.some((u) => u.content.email === 'u3@u.com'), '[2] The user 3 should be visible (waiting)')
    assert.isTrue(state2.users.some((u) => u.content.email === 'u4@u.com'), '[2] The user 4 should be visible (waiting)')
    assert.equal(state2.waitingUsersCount, 2, '[2] Only waiting users shown')

    // [3] fetch groups done, the list should now be filter
    const props3 = {
      ...props2,
      groups,
    }
    enzymeWrapper.setProps(props3)
    const state3 = enzymeWrapper.state()
    assert.isOk(state3.selectedGroup, '[3] Selected group should now be resolved')
    assert.equal(state3.selectedGroup.content.name, 'g1', '[3] Selected group should be g1')
    assert.isTrue(state3.showOnlyWaitingUsers, '[3] Show only waiting users should be true')
    assert.lengthOf(state3.users, 1, '[3] The waiting users in group g1 should be selected')
    assert.isTrue(state3.users.some((u) => u.content.email === 'u3@u.com'), '[3] The user 3 should be visible (waiting and group 1)')
    assert.equal(state3.waitingUsersCount, 1, '[3] Only waiting users shown')

    // [4] switch to g2, only waiting (no data)
    const props4 = {
      ...props3,
      location: { query: { onlyWaiting: 'true', group: 'g2' } },
    }
    enzymeWrapper.setProps(props4)
    const state4 = enzymeWrapper.state()
    assert.isOk(state4.selectedGroup, '[4] Selected group should be resolved')
    assert.equal(state4.selectedGroup.content.name, 'g2', '[4] Selected group should be g2')
    assert.isTrue(state4.showOnlyWaitingUsers, '[4] Show only waiting users should be true')
    assert.lengthOf(state4.users, 0, '[4] There should be no user (there is no waiting user in g2)')
    assert.equal(state4.waitingUsersCount, 0, '[4] Only waiting users shown')

    // [5] remain in g2, but show all users
    const props5 = {
      ...props4,
      location: { query: { onlyWaiting: 'false', group: 'g2' } },
    }
    enzymeWrapper.setProps(props5)
    const state5 = enzymeWrapper.state()
    assert.isOk(state5.selectedGroup, '[5] Selected group should be resolved')
    assert.equal(state5.selectedGroup.content.name, 'g2', '[5] Selected group should be g2')
    assert.isFalse(state5.showOnlyWaitingUsers, '[5] Show only waiting users should be false')
    assert.lengthOf(state5.users, 1, '[5] All users in group g2 should be selected')
    assert.isTrue(state5.users.some((u) => u.content.email === 'u2@u.com'), '[5] The user 2 should be visible (group 2)')
    assert.equal(state5.waitingUsersCount, 0, '[5] no waiting user in g2')

    // [6] Test with public group g3
    const props6 = {
      ...props5,
      location: { query: { onlyWaiting: 'false', group: 'g3' } },
    }
    enzymeWrapper.setProps(props6)
    const state6 = enzymeWrapper.state()
    assert.isOk(state6.selectedGroup, '[6] Selected group should be resolved')
    assert.equal(state6.selectedGroup.content.name, 'g3', '[6] Selected group should be g3')
    assert.isFalse(state6.showOnlyWaitingUsers, '[6] Show only waiting users should be false')
    assert.lengthOf(state6.users, 4, '[6] g3 group being public, all users should be selected')
    assert.equal(state6.waitingUsersCount, 2, '[6] all waiting users should be counted')

    // [7] Test with invalid query
    const props7 = {
      ...props6,
      location: { query: { onlyWaiting: 'XXXXXX', group: 'idontexist' } },
    }
    enzymeWrapper.setProps(props7)
    const state7 = enzymeWrapper.state()
    assert.isNull(state7.selectedGroup, '[7] Selected group should not be resolved (invalid query)')
    assert.isFalse(state7.showOnlyWaitingUsers, '[7] Show only waiting users should be false (invalid query)')
    assert.lengthOf(state7.users, 4, '[7] Without filter, all users should be returned')
    assert.equal(state7.waitingUsersCount, 2, '[7] all waiting users should be counted')

    // [8] Test without query
    const props8 = {
      ...props7,
      location: {},
    }
    enzymeWrapper.setProps(props8)
    const state8 = enzymeWrapper.state()
    assert.isNull(state8.selectedGroup, '[8] Selected group should not be resolved (no query)')
    assert.isFalse(state8.showOnlyWaitingUsers, '[8] Show only waiting users should be false (no query)')
    assert.lengthOf(state8.users, 4, '[8] Without filter, all users should be returned')
    assert.equal(state8.waitingUsersCount, 2, '[8] all waiting users should be counted')
  })
  it('should dispatch URL changes for filter updates', () => {
    // mock browser history to get data
    const reactRouter = require('react-router')
    let spiedReplaceURL = null
    reactRouter.browserHistory = {
      getCurrentLocation: () => ({ pathname: 'test://www.test.tst' }),
      replace: (url) => { spiedReplaceURL = url },
    }

    const props = {
      params: { project: 'any' },
      // from mapStateToProps
      users: {},
      groups: {},
      isFetchingViewData: true,
      isFetchingActions: true,
      location: { query: { onlyWaiting: 'true', group: 'g1' } },
      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
    }
    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const instance = enzymeWrapper.instance()

    // 1 - check selecting a group
    assert.isNull(spiedReplaceURL)
    instance.onSelectGroup(createGroups([{ name: 'g1', isPublic: false, users: [] }])[0])
    assert.include(spiedReplaceURL, 'test://www.test.tst', 'Path should be included')
    assert.include(spiedReplaceURL, 'group=g1', 'Group parameter should be included')
    assert.include(spiedReplaceURL, 'onlyWaiting=true', 'Only waiting filter should be included')
    // 2 - check deselecting group
    instance.onSelectGroup(null)
    assert.include(spiedReplaceURL, 'test://www.test.tst', 'Path should be included')
    assert.include(spiedReplaceURL, 'group=all', 'All groups filter should be included')
    assert.include(spiedReplaceURL, 'onlyWaiting=true', 'Only waiting filter should be included')
    // 3 - check toggling only waiting users (initially true)
    instance.onToggleOnlyWaitingUsers()
    assert.include(spiedReplaceURL, 'test://www.test.tst', 'Path should be included')
    assert.include(spiedReplaceURL, 'onlyWaiting=false', 'Only waiting filter should be included')

    delete reactRouter.browserHistory
  })
})
