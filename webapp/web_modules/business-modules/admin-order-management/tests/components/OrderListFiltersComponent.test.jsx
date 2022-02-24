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
import IconButton from 'material-ui/IconButton'
import { TableHeaderAutoCompleteFilter, TableSelectionModes } from '@regardsoss/components'
import { AdminDomain, OrderDomain } from '@regardsoss/domain'
import OrderListFiltersComponent from '../../src/components/OrderListFiltersComponent'
import { REQUEST_FILTERS } from '../../src/domain/requestFilters'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test OrderListFiltersComponent
 * @author Raphaël Mechali
 */
describe('[Admin Order Managament] Testing OrderListFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListFiltersComponent)
  })
  it('should render correctly and update dynamically the current users list provided as hints', () => {
    const props = {
      isInError: false,
      isFetching: false,
      onUpdateUsersFilter: () => { },
      onUserFilterSelected: () => { },
      onUpdateWaitingForUserFilter: () => { },
      matchingUsers: {
        0: {
          content: {
            email: 'test1@test.te',
            status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_GRANTED,
          },
        },
        1: {
          content: {
            email: 'test2@test.te',
            status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_GRANTED,
          },
        },
      },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      clearFilters: () => { },
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
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    const autocompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilter)
    assert.lengthOf(autocompleteWrapper, 1, 'There should be a table header autocomplete filter')
    testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
      hintText: 'order.list.filter.by.email.hint',
      currentHints: props.matchingUsers,
      isFetching: false,
      onUpdateInput: props.onUpdateUsersFilter,
      onFilterSelected: props.onUserFilterSelected,
      text: props.filters[REQUEST_FILTERS.OWNER],
    }, 'Table header autocomplete filter should be correctly configured')
    const clearButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(clearButtonWrapper, 1, 'There should be a clear button')
    testSuiteHelpers.assertWrapperProperties(clearButtonWrapper, {
      onClick: props.clearFilters,
    })
  })
  it('should render correctly when fetching', () => {
    const props = {
      isInError: false,
      isFetching: true,
      onUpdateUsersFilter: () => { },
      onUserFilterSelected: () => { },
      matchingUsers: {},
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      clearFilters: () => { },
      onUpdateWaitingForUserFilter: () => { },
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
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    const autocompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilter)
    assert.lengthOf(autocompleteWrapper, 1, 'There should be a table header autocomplete filter')
    testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
      isFetching: true,
    }, 'Fetching state should be correctly reported to Table autocomplete filter')
  })
  it('should render correctly in error', () => {
    const props = {
      isInError: true,
      isFetching: false,
      onUpdateUsersFilter: () => { },
      onUpdateWaitingForUserFilter: () => { },
      onUserFilterSelected: () => { },
      matchingUsers: {},
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      clearFilters: () => { },
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
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    const autocompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilter)
    assert.lengthOf(autocompleteWrapper, 1, 'There should be a table header autocomplete filter')
    testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
      noData: true,
    }, 'Error state should be correctly reported to Table autocomplete filter')
  })
})
