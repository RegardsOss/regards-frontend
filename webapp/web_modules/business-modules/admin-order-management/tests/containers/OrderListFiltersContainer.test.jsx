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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OrderListFiltersContainer, OrderListFiltersComponentWithRights } from '../../src/containers/OrderListFiltersContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderListFiltersContainer
* @author Raphaël Mechali
*/
describe('[Admin Order Management] Testing OrderListFiltersContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListFiltersContainer)
  })
  it('should render correctly fetching and without filter, and set up the rights callbacks', () => {
    const props = {
      onUserFilterSelected: () => { },
      isFetching: true,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const containerState = enzymeWrapper.state()
    const containerInstance = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      usersFilterText: containerState.usersFilterText,
      matchingUsers: props.users,
      isInError: containerState.isInError,
      isFetching: true,
      onUpdateUsersFilter: containerInstance.onUpdateUsersFilter,
      onUserFilterSelected: containerInstance.onUserFilterSelected,
      onUserFilterCleared: containerInstance.onUserFilterCleared,
    }, 'Component should define the expected properties')
  })
  it('should render correctly not fetching', () => {
    const props = {
      onUserFilterSelected: () => { },
      isFetching: false,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isFetching: false,
    }, 'Component should define the expected properties')
  })
  it('should update state and fetch new user list on filter update', () => {
    let spiedDispatechedFilter = null
    const props = {
      onUserFilterSelected: () => { },
      isFetching: false,
      users: {},
      dispatchGetUsers: (newFilter) => { spiedDispatechedFilter = newFilter },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    enzymeWrapper.instance().onUpdateUsersFilter('testValue1')
    enzymeWrapper.update()
    // The state should now be updated with the new text
    assert.equal(enzymeWrapper.state().usersFilterText, 'testValue1', 'The filter text should be update with value "testValue1"')
    assert.equal(spiedDispatechedFilter, 'testValue1', 'The container should have dispatched an update on right filter value"')
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      usersFilterText: 'testValue1',
    }, 'Component should define the expected properties')
  })
  it('should update selected filter and mark error state on invalid user selection', () => {
    let spySelectedUser = null
    const props = {
      onUserFilterSelected: (userEmail) => { spySelectedUser = userEmail },
      isFetching: false,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    enzymeWrapper.instance().onUserFilterSelected('testValue2', false)
    enzymeWrapper.update()
    // The state should now be updated with the new text
    assert.equal(enzymeWrapper.state().usersFilterText, 'testValue2', 'The filter text should be update with value "testValue2"')
    assert.isTrue(enzymeWrapper.state().isInError, 'The state should be marked in error as user selected a non listed email')
    assert.equal(spySelectedUser, 'testValue2', 'The container should have dispatched a user selection on right value"')

    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      usersFilterText: 'testValue2',
      isInError: true,
    }, 'Component should define the expected properties')
  })
  it('should update selected filter and mark valid state on valid user selection', () => {
    let spySelectedUser = null
    const props = {
      onUserFilterSelected: (userEmail) => { spySelectedUser = userEmail },
      isFetching: false,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    enzymeWrapper.instance().onUserFilterSelected('testValue3', true)
    enzymeWrapper.update()
    // The state should now be updated with the new text
    assert.equal(enzymeWrapper.state().usersFilterText, 'testValue3', 'The filter text should be update with value "testValue3"')
    assert.isFalse(enzymeWrapper.state().isInError, 'The state should be marked valid as user selected a valid email')
    assert.equal(spySelectedUser, 'testValue3', 'The container should have dispatched a user selection on right value"')

    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      usersFilterText: 'testValue3',
      isInError: false,
    }, 'Component should define the expected properties')
  })
  it('should update selected filter and mark valid state on user filter cleared', () => {
    let spySelectedUser = null
    const props = {
      onUserFilterSelected: (userEmail) => { spySelectedUser = userEmail },
      isFetching: false,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    enzymeWrapper.instance().onUserFilterCleared()
    enzymeWrapper.update()
    // The state should now be updated with the new text
    assert.equal(enzymeWrapper.state().usersFilterText, '', 'The filter text should be cleared')
    assert.isFalse(enzymeWrapper.state().isInError, 'The state should be marked valid')
    assert.equal(spySelectedUser, '', 'The container should have dispatched a user selection on empty value (no more selection)"')

    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      usersFilterText: '',
      isInError: false,
    }, 'Component should define the expected properties')
  })
})
