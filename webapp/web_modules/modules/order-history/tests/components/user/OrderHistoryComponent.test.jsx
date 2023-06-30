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
import { DynamicModulePane } from '@regardsoss/components'
import { OrderDisplayContainer } from '@regardsoss/order-common'
import { orderListActions, orderListSelectors } from '../../../src/client/OrderListClient'
import { orderFilesActions, orderFilesSelectors } from '../../../src/client/OrderFilesClient'
import { ordersNavigationActions, ordersNavigationSelectors } from '../../../src/client/OrdersNavigationClient'
import { processingActions, processingSelectors } from '../../../src/client/ProcessingClient'
import OrderHistoryComponent from '../../../src/components/user/OrderHistoryComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderHistoryComponent
* @author Raphaël Mechali
*/
describe('[Order History] Testing OrderHistoryComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderHistoryComponent)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      ordersActions: orderListActions,
      ordersSelectors: orderListSelectors,
      orderFilesActions,
      orderFilesSelectors,
      navigationActions: ordersNavigationActions,
      navigationSelectors: ordersNavigationSelectors,
      defaultIconURL: 'any',
      processingSelectors,
      processingActions,
      isProcessingDependenciesExist: true,
    }
    const enzymeWrapper = shallow(<OrderHistoryComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(DynamicModulePane), 1, 'Module should be rendered in a dynamic module component')
    assert.lengthOf(enzymeWrapper.find(OrderDisplayContainer), 1, 'There should be an order list display component')
    // cannot test navigation presence here (it is in title props, rendering it creates an issue with store presence)
  })
})
