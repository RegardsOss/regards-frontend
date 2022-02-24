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
import { OrderDomain } from '@regardsoss/domain'
import { TableSelectionModes } from '@regardsoss/components'
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
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      clearFilters: () => { },
      isFetching: true,
      users: {},
      dispatchGetUsers: () => { },
      filters: {},
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const containerState = enzymeWrapper.state()
    const containerInstance = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      matchingUsers: props.users,
      isInError: containerState.isInError,
      isFetching: true,
      onUpdateUsersFilter: containerInstance.onUpdateUsersFilter,
      onUserFilterSelected: containerInstance.onUserFilterSelected,
      onUserFilterCleared: containerInstance.onUserFilterCleared,
      updateValuesFilter: props.updateValuesFilter,
      updateDatesFilter: props.updateDatesFilter,
      clearFilters: props.clearFilters,
      filters: props.filters,
    }, 'Component should define the expected properties')
  })
  it('should render correctly with filters', () => {
    const props = {
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      clearFilters: () => { },
      isFetching: true,
      users: {},
      dispatchGetUsers: () => { },
      filters: {
        creationDate: {
          after: Date.now(),
          before: new Date().setMinutes(new Date().getMinutes() + 18),
        },
        owner: 'user1@test.fr',
        statuses: {
          mode: TableSelectionModes.INCLUDE,
          values: [OrderDomain.ORDER_STATUS_ENUM.DONE],
        },
      },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    const containerState = enzymeWrapper.state()
    const containerInstance = enzymeWrapper.instance()
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      matchingUsers: props.users,
      isInError: containerState.isInError,
      isFetching: true,
      onUpdateUsersFilter: containerInstance.onUpdateUsersFilter,
      onUserFilterSelected: containerInstance.onUserFilterSelected,
      onUserFilterCleared: containerInstance.onUserFilterCleared,
      updateValuesFilter: props.updateValuesFilter,
      updateDatesFilter: props.updateDatesFilter,
      clearFilters: props.clearFilters,
      filters: props.filters,
    }, 'Component should define the expected properties')
  })
  it('should render correctly not fetching', () => {
    const props = {
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      clearFilters: () => { },
      isFetching: false,
      users: {},
      dispatchGetUsers: () => { },
      filters: {
        creationDate: {
          after: Date.now(),
          before: new Date().setMinutes(new Date().getMinutes() + 18),
        },
        owner: 'user1@test.fr',
        statuses: {
          mode: TableSelectionModes.INCLUDE,
          values: [OrderDomain.ORDER_STATUS_ENUM.DONE],
        },
      },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      isFetching: false,
    }, 'Component should define the expected properties')
  })
})
