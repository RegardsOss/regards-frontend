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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { OrderClient } from '@regardsoss/client'
import {
  PageableInfiniteTableContainer, AutoRefreshPageableTableHOC, TableLayout, TableColumnsVisibilityOption,
} from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ORDER_DISPLAY_MODES } from '../../../src/model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../../src/model/OrdersNavigationActions'
import DownloadOrdersCSVSummaryContainer from '../../../src/containers/orders/options/DownloadOrdersCSVSummaryContainer'
import OrderListComponent from '../../../src/components/orders/OrderListComponent'
import OrderCountHeaderMessage from '../../../src/components/orders/OrderCountHeaderMessage'
import { SOME_ORDERS } from '../../dumps/Orders.dumb'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderListComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListComponent)
  })
  it('should render correctly in ADMIN mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      pageSize: 20,
      isFetching: false,
      totalOrderCount: 125,
      hasDeleteCompletely: true,
      hasDeleteSuperficially: true,
      hasPauseResume: true,
      columnsVisibility: OrderListComponent.DEFAULT_ADMIN_COLUMNS_VISIBILITY,
      onChangeColumnsVisibility: () => { },
      ordersActions: new OrderClient.OrderListActions('any', true),
      ordersSelectors: OrderClient.getOrderListSelectors(['idk']),
      orderStateActions: new OrderClient.OrderStateActions('any'),
      navigationActions: new OrdersNavigationActions('any'),
      onShowRequestFailedInformation: () => { },
      onShowAsynchronousRequestInformation: () => { },
      onShowDeleteConfirmation: () => { },
      onShowRetryMode: () => {},
    }
    const enzymeWrapper = shallow(<OrderListComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(AutoRefreshPageableTableHOC), 1, 'There should be the auto refresh data HOC')
    assert.lengthOf(enzymeWrapper.find(DownloadOrdersCSVSummaryContainer), 1, 'There should be download CSV action')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().pageActions, props.ordersActions, 'actions should be correctly reported')
    assert.deepEqual(tableWrapper.props().pageSelectors, props.ordersSelectors, 'selectors should be correctly reported')

    const tableColumns = tableWrapper.props().columns
    assert.lengthOf(tableColumns, values(OrderListComponent.DEFAULT_ADMIN_COLUMNS_VISIBILITY).length, 'All columns should be defined in default columns visibility for mode')
  })
  it('should render correctly in USER mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.USER,
      pageSize: 20,
      isFetching: false,
      totalOrderCount: 125,
      hasDeleteCompletely: false,
      hasDeleteSuperficially: false,
      hasPauseResume: false,
      columnsVisibility: OrderListComponent.DEFAULT_USER_COLUMNS_VISIBILITY,
      onChangeColumnsVisibility: () => { },
      ordersActions: new OrderClient.OrderListActions('any', false),
      ordersSelectors: OrderClient.getOrderListSelectors(['idk']),
      orderStateActions: new OrderClient.OrderStateActions('any'),
      navigationActions: new OrdersNavigationActions('any'),
      onShowRequestFailedInformation: () => { },
      onShowAsynchronousRequestInformation: () => { },
      onShowDeleteConfirmation: () => { },
      onShowRetryMode: () => { },
    }
    const enzymeWrapper = shallow(<OrderListComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(AutoRefreshPageableTableHOC), 1, 'There should be the auto refresh data HOC')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')
    assert.lengthOf(enzymeWrapper.find(DownloadOrdersCSVSummaryContainer), 0, 'There should not be download CSV action')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().pageActions, props.ordersActions, 'actions should be correctly reported')
    assert.deepEqual(tableWrapper.props().pageSelectors, props.ordersSelectors, 'selectors should be correctly reported')

    const tableColumns = tableWrapper.props().columns
    assert.lengthOf(tableColumns, values(OrderListComponent.DEFAULT_USER_COLUMNS_VISIBILITY).length, 'All columns should be defined in default columns visibility for mode')
  })
  it('should retrieve correctly data from entities', () => {
    values(SOME_ORDERS.content).forEach((order) => {
      assert.isDefined(OrderListComponent.getFilesSize(order), `File size should be retrieved in ${order.content.id}`)
      assert.isDefined(OrderListComponent.getObjectsCount(order), `Objects count should be retrieved in ${order.content.id}`)
      assert.isDefined(OrderListComponent.getProgress(order), `Progress should be retrieved in ${order.content.id}`)
    })
  })
})
