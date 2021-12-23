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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CommonDomain } from '@regardsoss/domain'
import {
  PageableInfiniteTableContainer,
} from '@regardsoss/components'
import { requestActions, requestSelectors } from '../../src/clients/WorkerRequestClient'
import DataPreparationComponent from '../../src/components/DataPreparationComponent'
import RequestFiltersComponent from '../../src/components/RequestFiltersComponent'
import HeaderActionsBarContainer from '../../src/containers/HeaderActionsBarContainer'

import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DataPreparationComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing DataPreparationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DataPreparationComponent)
  })
  it('should render correctly', () => {
    const props = {
      onBack: () => {},
      isLoading: false,
      onDeleteRequest: () => {},
      onRetryRequest: () => {},
      numberOfRequests: 1,
      pageSize: 5,

      // table sorting, column visiblity & filters management
      requestParameters: {},
      columnsVisibility: {},
      filters: DataPreparationComponent.DEFAULT_FILTERS_STATE,
      onRefresh: () => {},
      updateFilter: () => {},
      updateValuesFilter: () => {},
      updateDatesFilter: () => {},
      clearFilters: () => {},
      onChangeColumnsVisibility: () => {},
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onSort: () => {},
    }
    const enzymeWrapper = shallow(<DataPreparationComponent {...props} />, { context })
    const filterWrapper = enzymeWrapper.find(RequestFiltersComponent)
    assert.lengthOf(filterWrapper, 1, 'There should be a RequestFiltersComponent')
    testSuiteHelpers.assertWrapperProperties(filterWrapper, {
      filters: props.filters,
      updateFilter: props.updateFilter,
      updateValuesFilter: props.updateValuesFilter,
      updateDatesFilter: props.updateDatesFilter,
      clearFilters: props.clearFilters,
    }, 'Component should define the expected properties')

    const headerActionsBarWrapper = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerActionsBarWrapper, 1, 'There should be a HeaderActionsBar')
    testSuiteHelpers.assertWrapperProperties(headerActionsBarWrapper, {
      onRefresh: props.onRefresh,
      onChangeColumnsVisibility: props.onChangeColumnsVisibility,
      onDelete: enzymeWrapper.instance().onDelete,
      onRetry: enzymeWrapper.instance().onRetry,
    }, 'Component should define the expected properties')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be a PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      pageSize: props.pageSize,
      bodyParams: props.requestParameters,
    }, 'Component should define the expected properties')
  })
})
