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
import { CardActionsComponent } from '@regardsoss/components'
import { ORDER_DISPLAY_MODES, OrderDisplayContainer } from '@regardsoss/order-common'
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
      ordersRequestParameters: { deepDown: 'below' },
      backUrl: 'random-url_value#123',
      ordersActions: orderListActions,
      ordersSelectors: orderListSelectors,
      onUserFilterSelected: () => { },
    }
    const enzymeWrapper = shallow(<OrderListComponent {...props} />, { context })
    // 1 - check order list display container configuration
    const oDCWrapper = enzymeWrapper.find(OrderDisplayContainer)
    assert.lengthOf(oDCWrapper, 1, 'There should be the order display container that displays the orders table')
    testSuiteHelpers.assertWrapperProperties(oDCWrapper, {
      ordersRequestParameters: props.ordersRequestParameters,
      ordersActions: props.ordersActions,
      ordersSelectors: props.ordersSelectors,
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
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
      onUserFilterSelected: props.onUserFilterSelected,
    }, 'it should be correctly configured')
  })
})
