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
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import DataPreparationComponent from '../../src/components/DataPreparationComponent'
import RequestFiltersComponent from '../../src/components/RequestFiltersComponent'
import DataPreparationTableComponent from '../../src/components/DataPreparationTableComponent'
// import HeaderActionsBarContainer from '../../src/containers/HeaderActionsBarContainer'
import { requestActions, requestSelectors } from '../../src/clients/WorkerRequestClient'

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
      onRefresh: () => { },
    }
    const enzymeWrapper = shallow(<DataPreparationComponent {...props} />, { context })
    const tableVisibilityWrapper = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tableVisibilityWrapper, 1, 'There should be a TableFilterSortingAndVisibilityContainer')
    testSuiteHelpers.assertWrapperProperties(tableVisibilityWrapper, {
      pageActions: requestActions,
      pageSelectors: requestSelectors,
      onDeleteRequest: props.onDeleteRequest,
      onRetryRequest: props.onRetryRequest,
      isPagePostFetching: true,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
    }, 'Component should define the expected properties')
    const tableWrapper = enzymeWrapper.find(DataPreparationTableComponent)
    assert.lengthOf(tableWrapper, 1, 'There should be a DataPreparationTableComponent')
    testSuiteHelpers.assertWrapperProperties(tableWrapper, {
      isLoading: props.isLoading,
      numberOfRequests: props.numberOfRequests,
    }, 'Component should define the expected properties')
    const filterWrapper = enzymeWrapper.find(RequestFiltersComponent)
    assert.lengthOf(filterWrapper, 1, 'There should be a RequestFiltersComponent')
    testSuiteHelpers.assertWrapperProperties(filterWrapper, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'Component should define the expected properties')
  })
})
