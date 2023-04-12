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
import { CommonDomain } from '@regardsoss/domain'
import { PageableInfiniteTableContainer, TableLayout, AutoRefreshPageableTableHOC } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import HeaderActionsBarComponent from '../../../src/components/acquisitionChain/HeaderActionsBarComponent'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../../src/clients/AcquisitionProcessingChainClient'
import AcquisitionProcessingChainTableComponent from '../../../src/components/acquisitionChain/AcquisitionProcessingChainTableComponent'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AcquisitionProcessingChainTableComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DATA-PROVIDER MANAGEMENT] Testing AcquisitionProcessingChainTableComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionProcessingChainTableComponent)
  })
  it('should render correctly', () => {
    const props = {
      project: 'test',
      hasAccess: true,
      onListSessions: () => { },
      isOneCheckboxToggled: false,
      entitiesLoading: false,
      resultsCount: 100,
      getColumnSortingData: () => [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null],
    }
    const enzymeWrapper = shallow(<AcquisitionProcessingChainTableComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    const headerComponent = enzymeWrapper.find(HeaderActionsBarComponent)
    assert.lengthOf(headerComponent, 1, 'Table layout should be set')
    testSuiteHelpers.assertWrapperProperties(headerComponent, {
      onMultiToggleSelection: props.onMultiToggleSelection,
      isOneCheckboxToggled: props.isOneCheckboxToggled,
      onToggleAutoRefresh: enzymeWrapper.instance().onToggleAutoRefresh,
      isAutoRefreshEnabled: enzymeWrapper.instance().state.isAutoRefreshEnabled,
    }, 'Component should define the expected properties and callbacks')
    const autoRefreshComponent = enzymeWrapper.find(AutoRefreshPageableTableHOC)
    assert.lengthOf(autoRefreshComponent, 1, 'Table layout should be set')
    testSuiteHelpers.assertWrapperProperties(autoRefreshComponent, {
      pageSize: props.pageSize,
      requestParams: props.requestParameters,
      enableAutoRefresh: enzymeWrapper.instance().state.isAutoRefreshEnabled,
      pageableTableActions: AcquisitionProcessingChainActions,
      pageableTableSelectors: AcquisitionProcessingChainSelectors,
    }, 'Component should define the expected properties and callbacks')
    const infiniteTableComponent = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(infiniteTableComponent, 1, 'There should be 1 PageableInfiniteTableContainer')
    testSuiteHelpers.assertWrapperProperties(infiniteTableComponent, {
      pageActions: AcquisitionProcessingChainActions,
      pageSelectors: AcquisitionProcessingChainSelectors,
      requestParams: props.requestParameters,
    }, 'Component should define the expected properties and callbacks')
  })
})
