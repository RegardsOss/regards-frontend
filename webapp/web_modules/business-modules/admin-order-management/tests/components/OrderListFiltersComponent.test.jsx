/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { TableHeaderAutoCompleteFilter } from '@regardsoss/components'
import OrderListFiltersComponent from '../../src/components/OrderListFiltersComponent'
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
      usersFilterText: 'someRandomText#@24_',
      isInError: false,
      isFetching: false,
      onUpdateUsersFilter: () => { },
      onUserFilterSelected: () => { },
      onUserFilterCleared: () => { },
      matchingUsers: {
        0: {
          content: {
            email: 'test1@test.te',
          },
        },
        1: {
          content: {
            email: 'test2@test.te',
          },
        },
      },
    }
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    let { usersAsHints } = enzymeWrapper.state()
    assert.lengthOf(usersAsHints, 2, 'There should be one item menu for each user')
    let autocompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilter)
    assert.lengthOf(autocompleteWrapper, 1, 'There should be a table header autocomplete filter')
    testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
      hintText: 'order.list.filter.by.email.hint',
      currentHintText: props.usersFilterText,
      currentHints: usersAsHints,
      isFetching: false,
      isInError: false,
      onUpdateInput: props.onUpdateUsersFilter,
      onFilterSelected: props.onUserFilterSelected,
    }, 'Table header autocomplete filter should be correctly configured')
    const clearButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(clearButtonWrapper, 1, 'There should be a clear button')
    testSuiteHelpers.assertWrapperProperties(clearButtonWrapper, {
      onClick: props.onUserFilterCleared,
    })

    // change list to empty
    enzymeWrapper.setProps({
      ...props,
      usersFilterText: 'anotherFilterText',
      matchingUsers: {},
    })
    usersAsHints = enzymeWrapper.state().usersAsHints
    assert.lengthOf(usersAsHints, 0, 'There should be no item menu as users list is empty')
    autocompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilter)
    assert.lengthOf(autocompleteWrapper, 1, 'There should be a table header autocomplete filter')
    testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
      currentHintText: 'anotherFilterText',
      currentHints: usersAsHints,
    }, 'Table header autocomplete filter configuration should be correctly updated')
  })
  it('should render correctly when fetching', () => {
    const props = {
      usersFilterText: '',
      isInError: false,
      isFetching: true,
      onUpdateUsersFilter: () => { },
      onUserFilterSelected: () => { },
      onUserFilterCleared: () => { },
      matchingUsers: {},
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
      usersFilterText: '',
      isInError: true,
      isFetching: false,
      onUpdateUsersFilter: () => { },
      onUserFilterSelected: () => { },
      onUserFilterCleared: () => { },
      matchingUsers: {},
    }
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    const autocompleteWrapper = enzymeWrapper.find(TableHeaderAutoCompleteFilter)
    assert.lengthOf(autocompleteWrapper, 1, 'There should be a table header autocomplete filter')
    testSuiteHelpers.assertWrapperProperties(autocompleteWrapper, {
      isInError: true,
    }, 'Error state should be correctly reported to Table autocomplete filter')
  })
})
