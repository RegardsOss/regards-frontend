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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { AdminDomain, UIDomain } from '@regardsoss/domain'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectUserListContainer } from '../../src/containers/ProjectUserListContainer'
import ProjectUserListComponent from '../../src/components/list/ProjectUserListComponent'

const reactRouter = require('react-router')

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
 * @param {[{*}]} userDefinitions (fields to be replaced)
 */
function createUsers(userDefinitions) {
  const userContentModel = DumpProvider.getFirstEntityContent('AccessProjectClient', 'ProjectUser')
  return userDefinitions.reduce((acc, userCustomFields, index) => ({
    ...acc,
    [index]: {
      content: {
        ...userContentModel,
        id: index,
        ...userCustomFields,
      },
    },
  }), {})
}

// Test a component rendering
describe('[ADMIN PROJECTUSER MANAGEMENT] Testing ProjectUserListContainer', () => {
  let spiedLocation = null
  before(() => {
    testSuiteHelpers.before()
    // mock browser history to get data
    reactRouter.browserHistory = {
      getCurrentLocation: () => ({ pathname: 'test://www.test.tst' }),
      replace: (location) => {
        spiedLocation = location
      },
    }
  })
  after(() => {
    testSuiteHelpers.after()
    // clear router mock
    delete reactRouter.browserHistory
  })

  it('should exists', () => {
    assert.isDefined(ProjectUserListContainer)
  })
  it('should render self and subcomponents with quota displayed, hiding quota without dependency', () => {
    const props = {
      params: { project: 'any' },
      location: {},
      // from mapStateToProps
      users: DumpProvider.get('AccessProjectClient', 'ProjectUser'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetchingViewData: true,
      isFetchingActions: true,
      uiSettings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      availableDependencies: ['titi', 'tata'],

      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      fetchUISettings: () => {},
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
      dispatchSetMaxQuota: () => {},
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const instance = enzymeWrapper.instance()
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: values(props.users), // unfiltered
      waitingUsersCount: 0, // none in dump
      selectedGroup: null, // by location parameters
      groups: props.groups,
      uiSettings: props.uiSettings,
      isLoading: true,
      showOnlyWaitingUsers: false, // by location parameters
      showOnlyLowQuotaUsers: false, // by location parameters
      showQuota: false, // missing dependencies

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
      onToggleOnlyLowQuotaUsers: instance.onToggleOnlyLowQuotaUsers,
      onSelectGroup: instance.onSelectGroup,
      onSetMaxQuota: instance.onSetMaxQuota,
    })
  })
  it('should render self and subcomponents with quota displayed, showing quota with dependencies', () => {
    const props = {
      params: { project: 'any' },
      location: {},
      // from mapStateToProps
      users: DumpProvider.get('AccessProjectClient', 'ProjectUser'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetchingViewData: true,
      isFetchingActions: true,
      uiSettings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      availableDependencies: ['titi', 'tata', ...ProjectUserListContainer.QUOTA_DEPENDENCIES],

      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      fetchUISettings: () => {},
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
      dispatchSetMaxQuota: () => {},
    }

    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      showQuota: true,
    })
  })
  it('should update visibles users list on URL parameters changes or on fetch data change', () => {
    const users = createUsers([
      {
        email: 'u1@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_GRANTED, currentQuota: 1000, maxQuota: 1000,
      },
      {
        email: 'u2@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_DENIED, currentQuota: 0, maxQuota: 0,
      },
      {
        email: 'u3@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS, currentQuota: 0, maxQuota: -1,
      },
      {
        email: 'u4@u.com', status: AdminDomain.PROJECT_USER_STATUS_ENUM.WAITING_ACCESS, currentQuota: 0, maxQuota: 50,
      }])
    const groups = createGroups([
      { name: 'g1', isPublic: false, users: ['u1@u.com', 'u2@u.com', 'u3@u.com'] },
      { name: 'g2', isPublic: false, users: ['u2@u.com'] },
      { name: 'g3', isPublic: true, users: ['u2@u.com'] }])

    // Loading time: parameters are set but data is not
    const props = {
      params: { project: 'any' },
      location: { query: { onlyLowQuota: 'true', onlyWaiting: 'true', group: 'g1' } },
      // from mapStateToProps
      users: {},
      groups: {},
      isFetchingViewData: true,
      isFetchingActions: true,
      uiSettings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      availableDependencies: ProjectUserListContainer.QUOTA_DEPENDENCIES,
      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      fetchUISettings: () => {},
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
      dispatchSetMaxQuota: () => {},
    }
    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const state1 = enzymeWrapper.state()
    // [1] No group or user was retrieved yet
    assert.isNull(state1.selectedGroup, '[1] While groups are not available, selected group should be null')
    assert.isTrue(state1.showOnlyWaitingUsers, '[1] Show only waiting users should be true')
    assert.isTrue(state1.showOnlyLowQuotaUsers, '[1] Show only low quota users should be true')
    assert.deepEqual(state1.users, [], '[1] No loaded user yet')
    assert.equal(state1.waitingUsersCount, 0, '[1] No waiting user in filtered list')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state1.users,
      waitingUsersCount: state1.waitingUsersCount,
    }, '[1] Corresponding state should be correctly reported to component')

    // [2] fetch user done, the current list should now be filtered on onlyWaitingUsers and onlyLowQuota users
    const props2 = {
      ...props,
      users,
    }
    enzymeWrapper.setProps(props2)
    const state2 = enzymeWrapper.state()
    assert.isNull(state2.selectedGroup, '[2] While groups are not available, selected group should be null')
    assert.isTrue(state2.showOnlyWaitingUsers, '[2] Show only waiting users should be true')
    assert.isTrue(state2.showOnlyLowQuotaUsers, '[2] Show only low quota users should be true')
    assert.deepEqual(state2.users, [users[3]], '[2] The waiting AND low quota users should be filtered')
    assert.equal(state2.waitingUsersCount, 1, '[2] One waiting user in filtered list')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state2.users,
      waitingUsersCount: state2.waitingUsersCount,
    }, '[2] Corresponding state should be correctly reported to component')

    // [3] fetch groups done, the list should now be filtered on group (no data)
    const props3 = {
      ...props2,
      groups,
    }
    enzymeWrapper.setProps(props3)
    const state3 = enzymeWrapper.state()
    assert.isOk(state3.selectedGroup, '[3] Selected group should now be resolved')
    assert.equal(state3.selectedGroup.content.name, 'g1', '[3] Selected group should be g1')
    assert.isTrue(state3.showOnlyWaitingUsers, '[3] Show only waiting users should be true')
    assert.isTrue(state3.showOnlyLowQuotaUsers, '[3] Show only low quota users should be true')
    assert.deepEqual(state3.users, [], '[3] The waiting users in group g1 and low quota should be selected (none)')
    assert.equal(state3.waitingUsersCount, 0, '[3] No waiting user in filtered list')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state3.users,
      waitingUsersCount: state3.waitingUsersCount,
    }, '[3] Corresponding state should be correctly reported to component')

    // [4] remove low quota filter and check u3 is now selected (u1/u2 are not waiting)
    const props4 = {
      ...props3,
      location: { query: { onlyLowQuota: 'false', onlyWaiting: 'true', group: 'g1' } },
    }
    enzymeWrapper.setProps(props4)
    const state4 = enzymeWrapper.state()
    assert.isOk(state4.selectedGroup, '[4] Selected group should now be resolved')
    assert.equal(state4.selectedGroup.content.name, 'g1', '[4] Selected group should be g1')
    assert.isTrue(state4.showOnlyWaitingUsers, '[4] Show only waiting users should be true')
    assert.isFalse(state4.showOnlyLowQuotaUsers, '[4] Show only low quota users should be false')
    assert.deepEqual(state4.users, [users[2]], '[4] The waiting users in group g1 should be selected (one)')
    assert.equal(state4.waitingUsersCount, 1, '[4] One waiting user in filtered list')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state4.users,
      waitingUsersCount: state4.waitingUsersCount,
    }, '[4] Corresponding state should be correctly reported to component')

    // [5] switch to g2, only waiting (no data)
    const props5 = {
      ...props4,
      location: { query: { onlyLowQuota: 'false', onlyWaiting: 'true', group: 'g2' } },
    }
    enzymeWrapper.setProps(props5)
    const state5 = enzymeWrapper.state()
    assert.isOk(state5.selectedGroup, '[5] Selected group should be resolved')
    assert.equal(state5.selectedGroup.content.name, 'g2', '[5] Selected group should be g2')
    assert.isTrue(state5.showOnlyWaitingUsers, '[5] Show only waiting users should be true')
    assert.isFalse(state5.showOnlyLowQuotaUsers, '[5] Show only low quota users should be false')
    assert.deepEqual(state5.users, [], '[5]  The waiting users in group g1 should be selected (none)')
    assert.equal(state5.waitingUsersCount, 0, '[5] No waiting user in filtered list')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state5.users,
      waitingUsersCount: state5.waitingUsersCount,
    }, '[5] Corresponding state should be correctly reported to component')

    // [6] remain in g2, but show all users
    const props6 = {
      ...props5,
      location: { query: { onlyLowQuota: 'false', onlyWaiting: 'false', group: 'g2' } },
    }
    enzymeWrapper.setProps(props6)
    const state6 = enzymeWrapper.state()
    assert.isOk(state6.selectedGroup, '[6] Selected group should be resolved')
    assert.equal(state6.selectedGroup.content.name, 'g2', '[6] Selected group should be g2')
    assert.isFalse(state6.showOnlyWaitingUsers, '[6] Show only waiting users should be false')
    assert.isFalse(state6.showOnlyLowQuotaUsers, '[6] Show only low quota users should be false')
    assert.deepEqual(state6.users, [users[1]], '[6] All users in group g2 should be selected')
    assert.equal(state6.waitingUsersCount, 0, '[6] No waiting user in filtered list')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state6.users,
      waitingUsersCount: state6.waitingUsersCount,
    }, '[6] Corresponding state should be correctly reported to component')

    // [7] Test with public group g3
    const props7 = {
      ...props6,
      location: { query: { onlyLowQuota: 'false', onlyWaiting: 'false', group: 'g3' } },
    }
    enzymeWrapper.setProps(props7)
    const state7 = enzymeWrapper.state()
    assert.isOk(state7.selectedGroup, '[7] Selected group should be resolved')
    assert.equal(state7.selectedGroup.content.name, 'g3', '[7] Selected group should be g3')
    assert.isFalse(state7.showOnlyWaitingUsers, '[7] Show only waiting users should be false')
    assert.isFalse(state7.showOnlyLowQuotaUsers, '[7] Show only low quota users should be false')
    assert.deepEqual(state7.users, [users[0], users[1], users[2], users[3]], '[7] g3 group being public, all users should be selected')
    assert.equal(state7.waitingUsersCount, 2, '[7] All waiting users should be counted')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state7.users,
      waitingUsersCount: state7.waitingUsersCount,
    }, '[7] Corresponding state should be correctly reported to component')

    // [8] Test with invalid query
    const props8 = {
      ...props7,
      location: { query: { onlyWaiting: 'XXXXXX', group: 'idontexist' } },
    }
    enzymeWrapper.setProps(props8)
    const state8 = enzymeWrapper.state()
    assert.isNull(state8.selectedGroup, '[8] Selected group should not be resolved (invalid query)')
    assert.isFalse(state8.showOnlyWaitingUsers, '[8] Show only waiting users should be false (invalid query)')
    assert.isFalse(state8.showOnlyLowQuotaUsers, '[8] Show only low quota users be false (invalid query)')
    assert.deepEqual(state8.users, [users[0], users[1], users[2], users[3]], '[8] Without filter, all users should be returned')
    assert.equal(state8.waitingUsersCount, 2, '[8] All waiting users should be counted')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state8.users,
      waitingUsersCount: state8.waitingUsersCount,
    }, '[8] Corresponding state should be correctly reported to component')

    // [9] Test without query
    const props9 = {
      ...props8,
      location: {},
    }
    enzymeWrapper.setProps(props9)
    const state9 = enzymeWrapper.state()
    assert.isNull(state9.selectedGroup, '[9] Selected group should not be resolved (no query)')
    assert.isFalse(state9.showOnlyWaitingUsers, '[9] Show only waiting users should be false (no query)')
    assert.isFalse(state9.showOnlyLowQuotaUsers, '[9] Show only low quota users should be false (no query)')
    assert.deepEqual(state9.users, [users[0], users[1], users[2], users[3]], '[9] Without filter, all users should be returned')
    assert.equal(state9.waitingUsersCount, 2, '[9] all waiting users should be counted')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state9.users,
      waitingUsersCount: state9.waitingUsersCount,
    }, '[9] Corresponding state should be correctly reported to component')

    // [10] Test with onToggleOnlyLowQuotaUsers
    const props10 = {
      ...props9,
      location: { query: { onlyLowQuota: 'true' } },
    }
    enzymeWrapper.setProps(props10)
    const state10 = enzymeWrapper.state()
    assert.isNull(state10.selectedGroup, '[10] Selected group should not be resolved (no query)')
    assert.isFalse(state10.showOnlyWaitingUsers, '[10] Show only waiting users should be false (no query)')
    assert.isTrue(state10.showOnlyLowQuotaUsers, '[10] Show only low quota users should be true')
    assert.deepEqual(state10.users, [users[0], users[1], users[3]], '[10] only low quota users should be selected')
    assert.equal(state10.waitingUsersCount, 1, '[10] One waiting user with low quota')
    testSuiteHelpers.assertCompWithProps(enzymeWrapper, ProjectUserListComponent, {
      users: state10.users,
      waitingUsersCount: state10.waitingUsersCount,
    }, '[10] Corresponding state should be correctly reported to component')
  })
  it('should dispatch URL changes for filter updates', () => {
    const props = {
      params: { project: 'any' },
      // from mapStateToProps
      users: DumpProvider.get('AccessProjectClient', 'ProjectUser'),
      groups: DumpProvider.get('DataManagementClient', 'AccessGroup'),
      isFetchingViewData: true,
      isFetchingActions: true,
      location: { query: { onlyLowQuota: 'true', onlyWaiting: 'true', group: 'g1' } },
      uiSettings: UIDomain.UISettingsConstants.DEFAULT_SETTINGS,
      availableDependencies: ProjectUserListContainer.QUOTA_DEPENDENCIES,

      // from mapDispatchToProps
      fetchGroups: () => { },
      fetchUsers: () => { },
      fetchUISettings: () => {},
      denyProjectUser: () => { },
      validateProjectUser: () => { },
      deleteAccount: () => { },
      active: () => { },
      inactive: () => { },
      dispatchSetMaxQuota: () => {},
    }
    const enzymeWrapper = shallow(<ProjectUserListContainer {...props} />)
    const instance = enzymeWrapper.instance()

    // 1 - check selecting a group
    assert.isNull(spiedLocation)
    instance.onSelectGroup(createGroups([{ name: 'g1', isPublic: false, users: [] }])[0])
    assert.include(spiedLocation.pathname, 'test://www.test.tst', '[1] Path should be included')
    assert.deepEqual(spiedLocation.query, {
      group: 'g1',
      onlyWaiting: 'true',
      onlyLowQuota: 'true',
    }, '[1] query should be correctly set')
    // 2 - check deselecting group
    instance.onSelectGroup(null)
    assert.include(spiedLocation.pathname, 'test://www.test.tst', '[2] Path should be included')
    assert.deepEqual(spiedLocation.query, {
      group: 'all',
      onlyWaiting: 'true',
      onlyLowQuota: 'true',
    }, '[2] query should be correctly set')
    // 3 - check toggling only waiting users (initially true)
    instance.onToggleOnlyWaitingUsers()
    assert.include(spiedLocation.pathname, 'test://www.test.tst', '[3] Path should be included')
    assert.deepEqual(spiedLocation.query, {
      group: 'all',
      onlyWaiting: 'false',
      onlyLowQuota: 'true',
    }, '[3] query should be correctly set')
    // 4 - check toggling only low quota
    instance.onToggleOnlyLowQuotaUsers()
    assert.include(spiedLocation.pathname, 'test://www.test.tst', '[4] Path should be included')
    assert.deepEqual(spiedLocation.query, {
      group: 'all',
      onlyWaiting: 'true', // ignored as component did not update props
      onlyLowQuota: 'false',
    }, '[4] query should be correctly set')
  })
})
