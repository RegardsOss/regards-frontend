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
import { CardActionsComponent, TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import { OrderClient, ProcessingClient, CommonClient } from '@regardsoss/client'
import {
  OrdersNavigationActions, ORDER_DISPLAY_MODES, OrderDisplayContainer, OrdersNavigationSelectors,
} from '@regardsoss/order-common'
import { orderListActions, orderListSelectors } from '../../src/clients/OrderListClient'
import OrderListComponent from '../../src/components/OrderListComponent'
import OrderListFiltersContainer from '../../src/containers/OrderListFiltersContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test OrderListComponent
 * @author Raphaël Mechali
 */
describe('[Admin Order Management] Testing OrderListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListComponent)
  })
  it('should render correctly', () => {
    const props = {
      project: 'default',
      backUrl: 'random-url_value#123',
      onRefresh: () => { },
      ordersActions: orderListActions,
      ordersSelectors: orderListSelectors,
      isProcessingDependenciesExist: true,
      processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
      processingActions: new ProcessingClient.ProcessingActions('idk'),
      orderFilesActions: new OrderClient.OrderDatasetFilesActions('idk'),
      orderFilesSelectors: OrderClient.getOrderDatasetFilesSelectors(['idk']),
      ordersNavigationActions: new OrdersNavigationActions('idk'),
      ordersNavigationSelectors: new OrdersNavigationSelectors(['osef']),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(['idk']),
    }
    const enzymeWrapper = shallow(<OrderListComponent {...props} />, { context })
    // 1 - check order list display container configuration
    const oDCWrapper = enzymeWrapper.find(OrderDisplayContainer)
    assert.lengthOf(oDCWrapper, 1, 'There should be the order display container that displays the orders table')
    testSuiteHelpers.assertWrapperProperties(oDCWrapper, {
      ordersActions: props.ordersActions,
      ordersSelectors: props.ordersSelectors,
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      isProcessingDependenciesExist: props.isProcessingDependenciesExist,
      processingSelectors: props.processingSelectors,
      processingActions: props.processingActions,
      orderFilesActions: props.orderFilesActions,
      orderFilesSelectors: props.orderFilesSelectors,
      navigationActions: props.ordersNavigationActions,
      navigationSelectors: props.ordersNavigationSelectors,
      pluginMetaDataSelectors: props.pluginMetaDataSelectors,
    }, 'The order display container should be correctly configured')
    // 2 - check order list display container configuration
    const cACWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cACWrapper, 1, 'There should be a card action component to show back option')
    testSuiteHelpers.assertWrapperProperties(cACWrapper, {
      secondaryButtonUrl: props.backUrl,
    }, 'The card action component should be correctly configured')
    // 3 - check filters container configuration
    const oLFCWrapper = enzymeWrapper.find(OrderListFiltersContainer)
    assert.lengthOf(oLFCWrapper, 1, 'There should be an order list filters container')
    testSuiteHelpers.assertWrapperProperties(oLFCWrapper, {
      isPaneOpened: enzymeWrapper.instance().state.isPaneOpened,
      onCloseFiltersPane: enzymeWrapper.instance().handleFiltersPane,
    }, 'it should be correctly configured')
    // 4 - table filters container configuration
    const tFSAVCWrapper = enzymeWrapper.find(TableFilterSortingAndVisibilityContainer)
    assert.lengthOf(tFSAVCWrapper, 1, 'There should be an order list filters container')
    testSuiteHelpers.assertWrapperProperties(tFSAVCWrapper, {
      pageActions: props.ordersActions,
      pageSelectors: props.ordersSelectors,
      updateRefreshParameters: enzymeWrapper.instance().updateRefreshParameters,
    }, 'it should be correctly configured')
  })
})
