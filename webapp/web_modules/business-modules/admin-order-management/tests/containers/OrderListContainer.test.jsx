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
import { ProcessingClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { OrderListContainer } from '../../src/containers/OrderListContainer'
import { processingActions, processingSelectors } from '../../src/clients/ProcessingClient'
import { ordersNavigationActions, ordersNavigationSelectors } from '../../src/clients/OrdersNavigationClient'
import { orderFilesActions, orderFilesSelectors } from '../../src/clients/OrderFilesClient'
import { orderListActions, orderListSelectors } from '../../src/clients/OrderListClient'
import { pluginMetaDataSelectors } from '../../src/clients/PluginMetaDataClient'
import OrderListComponent from '../../src/components/OrderListComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test OrderListContainer
 * @author Raphaël Mechali
 */
describe('[Admin Order Management] Testing OrderListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListContainer)
  })
  it('should render correctly with processing dependencies', () => {
    const props = {
      params: {
        project: 'test1',
      },
      availableDependencies: [new ProcessingClient.ProcessingActions('idk').getDependency(RequestVerbEnum.GET)],
      dispatchResetToLevel: () => { },
      fetchPluginMetaDataList: () => { },
      fetchOrderList: () => { },
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      project: props.params.project,
      backUrl: enzymeWrapper.instance().getBackURL(),
      onRefresh: enzymeWrapper.instance().onRefresh,
      ordersActions: orderListActions,
      ordersSelectors: orderListSelectors,
      ordersNavigationActions,
      ordersNavigationSelectors,
      orderFilesActions,
      orderFilesSelectors,
      isProcessingDependenciesExist: enzymeWrapper.instance().state.isProcessingDependenciesExist,
      processingActions,
      processingSelectors,
      pluginMetaDataSelectors,
    }, 'Component should define the expected properties')
  })
  it('should render correctly without processing dependencies', () => {
    const props = {
      params: {
        project: 'test1',
      },
      availableDependencies: [],
      dispatchResetToLevel: () => { },
      fetchPluginMetaDataList: () => { },
      fetchOrderList: () => { },
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      project: props.params.project,
      backUrl: enzymeWrapper.instance().getBackURL(),
      onRefresh: enzymeWrapper.instance().onRefresh,
      ordersActions: orderListActions,
      ordersSelectors: orderListSelectors,
      ordersNavigationActions,
      ordersNavigationSelectors,
      orderFilesActions,
      orderFilesSelectors,
      isProcessingDependenciesExist: enzymeWrapper.instance().state.isProcessingDependenciesExist,
      processingActions,
      processingSelectors,
      pluginMetaDataSelectors,
    }, 'Component should define the expected properties')
  })
})
