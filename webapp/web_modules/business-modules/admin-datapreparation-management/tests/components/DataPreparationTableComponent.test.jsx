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
import { CommonDomain } from '@regardsoss/domain'
import {
  PageableInfiniteTableContainer, TableHeaderContentBox, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import DataPreparationTableComponent from '../../src/components/DataPreparationTableComponent'
import HeaderActionsBarContainer from '../../src/containers/HeaderActionsBarContainer'
import { requestActions, requestSelectors } from '../../src/clients/WorkerRequestClient'

import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DataPreparationTableComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing DataPreparationTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DataPreparationTableComponent)
  })
  it('should render correctly', () => {
    const props = {
      isLoading: false,
      onDeleteRequest: () => { },
      onRetryRequest: () => { },
      numberOfRequests: 1,
      pageSize: 5,

      // table sorting, column visiblity & filters management
      requestParameters: {},
      bodyParameters: {},
      columnsVisibility: {},
      onChangeColumnsVisibility: () => {},
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
      onSort: () => {},
    }
    const enzymeWrapper = shallow(<DataPreparationTableComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableHeaderContentBox), 1, 'TableHeaderContentBox should be set')
    assert.lengthOf(enzymeWrapper.find(TableHeaderLoadingComponent), 1, 'TableHeaderLoadingComponent should be set')
    const headerActionsBarWrapper = enzymeWrapper.find(HeaderActionsBarContainer)
    assert.lengthOf(headerActionsBarWrapper, 1, 'There should be a HeaderActionsBar')
    testSuiteHelpers.assertWrapperProperties(headerActionsBarWrapper, {
      onChangeColumnsVisibility: props.onChangeColumnsVisibility,
      onDelete: enzymeWrapper.instance().onDeleteSelection,
      onRetry: enzymeWrapper.instance().onRetrySelection,
    }, 'Component should define the expected properties')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be a PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      pageSize: props.pageSize,
      requestParams: props.requestParameters,
      bodyParams: props.bodyParameters,
      fetchUsingPostMethod: true,
    }, 'Component should define the expected properties')
  })
})
