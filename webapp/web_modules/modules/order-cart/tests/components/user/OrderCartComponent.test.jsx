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
import Dialog from 'material-ui/Dialog'
import CartIcon from 'mdi-material-ui/Cart'
import NotLoggedIcon from 'mdi-material-ui/Lock'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { NoContentMessageInfo } from '@regardsoss/components'
import { ProcessingClient, CommonClient } from '@regardsoss/client'
import SelectionItemDetailContainer from '../../../src/containers/user/detail/SelectionItemDetailContainer'
import OrderCartComponent from '../../../src/components/user/OrderCartComponent'
import OrderCartTableComponent from '../../../src/components/user/OrderCartTableComponent'
import styles from '../../../src/styles/styles'

import { mockBasket1 } from '../../BasketMocks'

const context = buildTestContext(styles)

/**
* Test OrderCartComponent
* @author Raphaël Mechali
* @author Théo Lasserre
*/
describe('[OrderCart] Testing OrderCartComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCartComponent)
  })
  it('should render correctly when user is not authenticated', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      showDatasets: false,
      isAuthenticated: false,
      basket: undefined,
      refreshBasket: () => { },
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      expanded: true,
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isTrue(noContentWrapper.props().noContent, 'No data component should be marked as no content')
    // Check specific messages for authentication
    assert.equal(noContentWrapper.props().titleKey, 'order-cart.module.not.logged.title', 'When not authenticated, title key should be correctly set up')
    assert.equal(noContentWrapper.props().messageKey, 'order-cart.module.not.logged.message', 'When not authenticated, message key should be correctly set up')
    assert.equal(noContentWrapper.props().Icon, NotLoggedIcon, 'When not authenticated, icon should be a NotLoggedIcon')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.equal(orderCartTableWrapper.props().basket, props.basket, 'Table should have the right basket value')
    assert.isFalse(orderCartTableWrapper.props().isFetching, 'Table should not be marked loading')
    assert.isFalse(orderCartTableWrapper.props().isProcessingDependenciesExist, 'Processing dependencies should not be resolved')
    // check detail container
    assert.lengthOf(enzymeWrapper.find(SelectionItemDetailContainer), 1, 'This component should also add detail functionnality, using a detail container')
  })
  it('should render correctly when user is authenticated and basket empty', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      showDatasets: false,
      isAuthenticated: true,
      basket: undefined,
      refreshBasket: () => { },
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      expanded: true,
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isTrue(noContentWrapper.props().noContent, 'No data component should be marked as no content')
    // Check specific messages for empty basket
    assert.equal(noContentWrapper.props().titleKey, 'order-cart.module.empty.basket.title', 'When basket is empty, title key should be correctly set up')
    assert.equal(noContentWrapper.props().messageKey, 'order-cart.module.empty.basket.message', 'When basket is empty, message key should be correctly set up')
    assert.equal(noContentWrapper.props().Icon, CartIcon, 'When basket is empty, icon should be a NotLoggedIcon')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.equal(orderCartTableWrapper.props().basket, props.basket, 'Table should have the right basket value')
    assert.isFalse(orderCartTableWrapper.props().isFetching, 'Table should not be marked loading')
    assert.isFalse(orderCartTableWrapper.props().isProcessingDependenciesExist, 'Processing dependencies should not be resolved')
    // check detail container
    assert.lengthOf(enzymeWrapper.find(SelectionItemDetailContainer), 1, 'This component should also add detail functionnality, using a detail container')
  })
  it('should render correctly when fetching (fetch state SHOULD NEVER show no data)', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      showDatasets: true,
      isAuthenticated: true,
      basket: undefined,
      refreshBasket: () => { },
      isFetching: true,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      expanded: true,
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state is hidden
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isFalse(noContentWrapper.props().noContent, 'No data component should be hidden')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.isTrue(orderCartTableWrapper.props().isFetching, 'Table should be marked loading')
    assert.isFalse(orderCartTableWrapper.props().isProcessingDependenciesExist, 'Processing dependencies should not be resolved')
    // check detail container
    assert.lengthOf(enzymeWrapper.find(SelectionItemDetailContainer), 1, 'This component should also add detail functionnality, using a detail container')
  })
  it('should render correctly with a basket', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      showDatasets: false,
      isAuthenticated: true,
      basket: mockBasket1,
      refreshBasket: () => { },
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      expanded: true,
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    // Check no data state is hidden
    const noContentWrapper = enzymeWrapper.find(NoContentMessageInfo)
    assert.lengthOf(noContentWrapper, 1, 'There should be a no data component')
    assert.isFalse(noContentWrapper.props().noContent, 'No data component should be marked as no content')
    // Check table
    const orderCartTableWrapper = enzymeWrapper.find(OrderCartTableComponent)
    assert.lengthOf(orderCartTableWrapper, 1, 'There should be a table component')
    assert.equal(orderCartTableWrapper.props().basket, props.basket, 'Table should have the right basket value')
    assert.isFalse(orderCartTableWrapper.props().isFetching, 'Table should not be marked loading')
    assert.equal(orderCartTableWrapper.props().onShowDuplicatedMessage, enzymeWrapper.instance().onShowDuplicatedMessage, 'Table should have show message callback')
    assert.isFalse(orderCartTableWrapper.props().isProcessingDependenciesExist, 'Processing dependencies should not be resolved')
    // check detail container
    assert.lengthOf(enzymeWrapper.find(SelectionItemDetailContainer), 1, 'This component should also add detail functionnality, using a detail container')
  })
  it('should manage correctly duplicate data dialog', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      showDatasets: false,
      isAuthenticated: true,
      basket: mockBasket1,
      refreshBasket: () => { },
      isFetching: false,
      isProcessingDependenciesExist: false,
      processingSelectors: ProcessingClient.getProcessingSelectors(),
      pluginMetaDataSelectors: CommonClient.getPluginMetaDataSelectors(),
      linkProcessingDatasetActions: new ProcessingClient.LinkProcessingDatasetActions(),
      expanded: true,
      onClearCart: () => { },
      onOrder: () => { },
    }
    const enzymeWrapper = shallow(<OrderCartComponent {...props} />, { context })
    let dialog = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialog, 1, 'There should be the dialog')
    testSuiteHelpers.assertWrapperProperties(dialog, {
      open: false,
      onRequestClose: enzymeWrapper.instance().onHideDuplicatedMessage,
      title: 'order-cart.module.duplicate.objects.message.title',
    })
    // simuate user shows the dialog
    enzymeWrapper.instance().onShowDuplicatedMessage(25, 22)
    enzymeWrapper.update()
    dialog = enzymeWrapper.find(Dialog)
    testSuiteHelpers.assertWrapperProperties(dialog, {
      open: true,
      onRequestClose: enzymeWrapper.instance().onHideDuplicatedMessage,
      title: 'order-cart.module.duplicate.objects.message.title',
    })
    // we should able to find message in dialog children
    assert.include(enzymeWrapper.debug(), 'order-cart.module.duplicate.objects.message', 'There should be the message')
    // simulate user hides the dialog
    dialog.props().onRequestClose()
    enzymeWrapper.update()
    dialog = enzymeWrapper.find(Dialog)
    testSuiteHelpers.assertWrapperProperties(dialog, {
      open: false,
      onRequestClose: enzymeWrapper.instance().onHideDuplicatedMessage,
      title: 'order-cart.module.duplicate.objects.message.title',
    })
  })
})
