/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  TableSelectionModes, FiltersPaneMainComponent, FilterPaneDatePickerField, FilterPaneSelectFieldLegacy, FilterPaneSelectField, FilterPaneAutoCompleteFieldLegacy,
} from '@regardsoss/components'
import { AdminDomain, OrderDomain } from '@regardsoss/domain'
import { OrderListFiltersComponent } from '../../src/components/OrderListFiltersComponent'
import { FILTERS_I18N } from '../../src/domain/filters'
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
      isFetching: false,
      dispatchGetUsers: () => { },
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      isPaneOpened: true,
      onCloseFiltersPane: () => { },
      inputValues: {
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
      filtersI18n: FILTERS_I18N,
    }
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    const mainComponent = enzymeWrapper.find(FiltersPaneMainComponent)
    assert.lengthOf(mainComponent, 1, 'FiltersPaneMainComponent should be set')
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      updateFilter: props.updateFilter,
      updateDatesFilter: props.updateDatesFilter,
      updateValuesFilter: props.updateValuesFilter,
      inputValues: props.inputValues,
      filtersI18n: props.filtersI18n,
    }, 'Component should define the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneDatePickerField), 1, 'There should be 1 FilterPaneDatePickerField')
    const autoCompleteField = enzymeWrapper.find(FilterPaneAutoCompleteFieldLegacy)
    assert.lengthOf(autoCompleteField, 1, 'FilterPaneAutoCompleteFieldLegacy should be set')
    testSuiteHelpers.assertWrapperProperties(autoCompleteField, {
      currentHints: props.matchingUsers,
      isFetching: props.isFetching,
      noData: enzymeWrapper.instance().state.isInError,
      onUpdateInput: enzymeWrapper.instance().onUpdateUsersFilter,
      onFilterSelected: enzymeWrapper.instance().onUserFilterSelected,
      prepareHints: OrderListFiltersComponent.prepareHints,
    }, 'Component should defined the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectField), 1, 'There should be 1 FilterPaneSelectField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneDatePickerField), 1, 'There should be 1 FilterPaneDatePickerField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectFieldLegacy), 1, 'There should be 1 FilterPaneSelectFieldLegacy')
  })
  it('should render correctly when fetching', () => {
    const props = {
      isFetching: true,
      matchingUsers: {},
      dispatchGetUsers: () => {},
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      isPaneOpened: true,
      onCloseFiltersPane: () => { },
      inputValues: {
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
      filtersI18n: FILTERS_I18N,
    }
    const enzymeWrapper = shallow(<OrderListFiltersComponent {...props} />, { context })
    const mainComponent = enzymeWrapper.find(FiltersPaneMainComponent)
    assert.lengthOf(mainComponent, 1, 'FiltersPaneMainComponent should be set')
    testSuiteHelpers.assertWrapperProperties(mainComponent, {
      updateFilter: props.updateFilter,
      updateDatesFilter: props.updateDatesFilter,
      updateValuesFilter: props.updateValuesFilter,
      inputValues: props.inputValues,
      filtersI18n: props.filtersI18n,
    }, 'Component should define the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneDatePickerField), 1, 'There should be 1 FilterPaneDatePickerField')
    const autoCompleteField = enzymeWrapper.find(FilterPaneAutoCompleteFieldLegacy)
    assert.lengthOf(autoCompleteField, 1, 'FilterPaneAutoCompleteFieldLegacy should be set')
    testSuiteHelpers.assertWrapperProperties(autoCompleteField, {
      currentHints: props.matchingUsers,
      isFetching: props.isFetching,
      noData: enzymeWrapper.instance().state.isInError,
      onUpdateInput: enzymeWrapper.instance().onUpdateUsersFilter,
      onFilterSelected: enzymeWrapper.instance().onUserFilterSelected,
      prepareHints: OrderListFiltersComponent.prepareHints,
    }, 'Component should defined the expected properties and callbacks')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectField), 1, 'There should be 1 FilterPaneSelectField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneDatePickerField), 1, 'There should be 1 FilterPaneDatePickerField')
    assert.lengthOf(enzymeWrapper.find(FilterPaneSelectFieldLegacy), 1, 'There should be 1 FilterPaneSelectFieldLegacy')
  })
})
