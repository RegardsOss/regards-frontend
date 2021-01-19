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
import { OrderClient, ProcessingClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ORDER_DISPLAY_MODES } from '../../src/model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../src/model/OrdersNavigationActions'
import { OrdersNavigationSelectors } from '../../src/model/OrdersNavigationSelectors'
import { OrderDisplayContainer } from '../../src/containers/OrderDisplayContainer'
import OrderListContainer from '../../src/containers/orders/OrderListContainer'
import OrderDatasetsContainer from '../../src/containers/datasets/OrderDatasetsContainer'
import DatasetFilesContainer from '../../src/containers/files/DatasetFilesContainer'
import styles from '../../src/styles/styles'
import { SOME_ORDERS } from '../dumps/Orders.dumb'

const context = buildTestContext(styles)

/**
* Test OrderDisplayContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderDisplayContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderDisplayContainer)
  })
  const commonProps = {
    displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
    ordersActions: new OrderClient.OrderListActions('idk'),
    ordersSelectors: OrderClient.getOrderListSelectors(['idk']),
    orderFilesActions: new OrderClient.OrderDatasetFilesActions('idk'),
    orderFilesSelectors: OrderClient.getOrderDatasetFilesSelectors(['idk']),
    navigationActions: new OrdersNavigationActions('idk'),
    navigationSelectors: new OrdersNavigationSelectors(['osef']),
    processingSelectors: ProcessingClient.getProcessingSelectors(['idk']),
    isProcessingDependenciesExist: true,
  }

  it('should render orders list at root', () => {
    const props = {
      ...commonProps,
      navigationPath: [],
    }
    const enzymeWrapper = shallow(<OrderDisplayContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(OrderListContainer), 1, 'The container should render order list container')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsContainer), 0, 'The container should not render dataset list container')
    assert.lengthOf(enzymeWrapper.find(DatasetFilesContainer), 0, 'The container should not render files list container')
  })
  it('should render dataset list when user selected an order', () => {
    const exampleOrder = SOME_ORDERS.content[0]
    const props = {
      ...commonProps,
      navigationPath: [exampleOrder],
    }
    const enzymeWrapper = shallow(<OrderDisplayContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(OrderListContainer), 0, 'The container should not render order list container')
    const datasetsContainer = enzymeWrapper.find(OrderDatasetsContainer)
    assert.lengthOf(datasetsContainer, 1, 'The container should render dataset list container')
    assert.equal(datasetsContainer.props().order, exampleOrder, 'The selected order should be provided to datasets list container')
    assert.lengthOf(enzymeWrapper.find(DatasetFilesContainer), 0, 'The container should not render files list container')
  })
  it('should render files list when user selected an order and a dataset', () => {
    const exampleOrder = SOME_ORDERS.content[0]
    const exampleDataset = exampleOrder.content.datasetTasks[0]
    const props = {
      ...commonProps,
      navigationPath: [exampleOrder, exampleDataset],
    }
    const enzymeWrapper = shallow(<OrderDisplayContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(OrderListContainer), 0, 'The container should not render order list container')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsContainer), 0, 'The container should not render dataset list container')
    const filesContainer = enzymeWrapper.find(DatasetFilesContainer)
    assert.lengthOf(filesContainer, 1, 'The container should render files list container')
    assert.equal(filesContainer.props().order, exampleOrder, 'The selected order should be provided to files list container')
    assert.equal(filesContainer.props().dataset, exampleDataset, 'The selected dataset should be provided to files list container')
  })
})
