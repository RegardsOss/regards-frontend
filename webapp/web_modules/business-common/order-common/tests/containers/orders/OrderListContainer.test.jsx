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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ORDER_DISPLAY_MODES } from '../../../src/model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../../src/model/OrdersNavigationActions'
import OrderListComponent from '../../../src/components/orders/OrderListComponent'
import AsynchronousRequestInformationComponent from '../../../src/components/orders/dialog/AsynchronousRequestInformationComponent'
import DeleteOrderConfirmationComponent from '../../../src/components/orders/dialog/DeleteOrderConfirmationComponent'
import RequestFailedInformationComponent from '../../../src/components/orders/dialog/RequestFailedInformationComponent'
import { OrderListContainer } from '../../../src/containers/orders/OrderListContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderListContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListContainer)
  })

  const orderStateActions = new OrderClient.OrderStateActions('any')

  const commonProperties = {
    project: 'default',
    ordersActions: new OrderClient.OrderListActions('any'),
    ordersSelectors: OrderClient.getOrderListSelectors(['idk']),
    navigationActions: new OrdersNavigationActions('any'),
    totalOrderCount: 25,
    availableEndpoints: [
      orderStateActions.getDeleteSuperficiallyDependency(), orderStateActions.getPauseDependency(),
      orderStateActions.getResumeDependency(), orderStateActions.getDeleteCompletelyDependency(),
    ],
  }
  values(ORDER_DISPLAY_MODES).forEach((displayMode) => it(`should render correcty in display mode "${displayMode}"`, () => {
    const props = {
      ...commonProperties,
      displayMode,
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    const instance = enzymeWrapper.instance()
    const state = enzymeWrapper.state()
    // check dialogs are instantiated and correctly set up
    // 1 - Asynchrnous request dialog
    const asyncDialog = enzymeWrapper.find(AsynchronousRequestInformationComponent)
    assert.lengthOf(asyncDialog, 1, 'There should be the instantitated dialog "asynchronous request"')
    assert.isFalse(asyncDialog.props().visible, '"Asynchronous request" dialog should not be shown')
    assert.equal(asyncDialog.props().onClose, instance.onHideAsynchronousRequestInformation, '"Asynchronous request" dialog close callback should be correctly set up')
    // 2 - delete confirmation dialog
    const deleteConfirmDialog = enzymeWrapper.find(DeleteOrderConfirmationComponent)
    assert.lengthOf(deleteConfirmDialog, 1, 'There should be the instantitated dialog "delete confirm"')
    assert.isFalse(!!deleteConfirmDialog.props().deleteConfirmation, '"Delete confirm" dialog should not be shown')
    assert.equal(deleteConfirmDialog.props().onClose, instance.onHideDeleteConfirmation, '"Delete confirm" dialog close callback should be correctly set up')
    // 3 - Request failed dialog
    const requestFailedDialog = enzymeWrapper.find(RequestFailedInformationComponent)
    assert.lengthOf(requestFailedDialog, 1, 'There should be the instantitated dialog "request failed"')
    assert.isFalse(requestFailedDialog.props().visible, '"Request failed" dialog should not be shown')
    assert.equal(requestFailedDialog.props().onClose, instance.onHideRequestFailedInformation, '"Request failed" dialog close callback should be correctly set up')

    // 4 - check properties, callbacks and actions / selectors are correctly reported
    const component = enzymeWrapper.find(OrderListComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    const compProps = component.props()
    assert.equal(compProps.displayMode, props.displayMode, 'Display should be correctly set up')
    assert.isNotOk(compProps.isFetching, 'Component should not be marked fetching')
    assert.equal(compProps.totalOrderCount, props.totalOrderCount, 'Total order count should be correctly set up')
    assert.equal(compProps.columnsVisibility, state.columnsVisibility, 'Columns visibility should be correctly set up')
    assert.equal(compProps.hasDeleteCompletely, state.hasDeleteCompletely, 'hasDeleteCompletely should be correctly set up')
    assert.equal(compProps.hasDeleteSuperficially, state.hasDeleteSuperficially, 'hasDeleteSuperficially should be correctly set up')
    assert.equal(compProps.hasPauseResume, state.hasPauseResume, 'hasPauseResume should be correctly set up')
    assert.equal(compProps.ordersActions, props.ordersActions, 'ordersActions should be correctly set up')
    assert.equal(compProps.ordersSelectors, props.ordersSelectors, 'ordersSelectors should be correctly set up')
    assert.equal(compProps.navigationActions, props.navigationActions, 'navigationActions should be correctly set up')
    assert.equal(compProps.onChangeColumnsVisibility, instance.onChangeColumnsVisibility, 'onChangeColumnsVisibility callback should be correctly set up')
    assert.equal(compProps.onShowRequestFailedInformation, instance.onShowRequestFailedInformation, 'onShowRequestFailedInformation callback should be correctly set up')
    assert.equal(compProps.onShowAsynchronousRequestInformation, instance.onShowAsynchronousRequestInformation, 'onShowAsynchronousRequestInformation callback should be correctly set up')
    assert.equal(compProps.onShowDeleteConfirmation, instance.onShowDeleteConfirmation, 'onShowDeleteConfirmation callback should be correctly set up')
  }))

  it('should correctly show and hide "asynchronous request" dialog', () => {
    const props = {
      ...commonProperties,
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    // 1 - Show dialog
    enzymeWrapper.instance().onShowAsynchronousRequestInformation()
    enzymeWrapper.update()
    let dialog = enzymeWrapper.find(AsynchronousRequestInformationComponent)
    assert.isTrue(dialog.props().visible, 'The dialog should be visible')
    // 2 - Hide dialog
    enzymeWrapper.instance().onHideAsynchronousRequestInformation()
    enzymeWrapper.update()
    dialog = enzymeWrapper.find(AsynchronousRequestInformationComponent)
    assert.isFalse(dialog.props().visible, 'The dialog should be hidden')
  })
  it('should correctly show and hide "delete confirm" dialog', () => {
    const props = {
      ...commonProperties,
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    // 1 - Show dialog
    enzymeWrapper.instance().onShowDeleteConfirmation('testLabel', true, () => { })
    enzymeWrapper.update()
    let dialog = enzymeWrapper.find(DeleteOrderConfirmationComponent)
    assert.isTrue(!!dialog.props().deleteConfirmation, 'The dialog should be visible')
    // 2 - Hide dialog
    enzymeWrapper.instance().onHideDeleteConfirmation()
    enzymeWrapper.update()
    dialog = enzymeWrapper.find(DeleteOrderConfirmationComponent)
    assert.isFalse(!!dialog.props().deleteConfirmation, 'The dialog should be hidden')
  })

  it('should correctly show and hide "request failed" dialog', () => {
    const props = {
      ...commonProperties,
      displayMode: ORDER_DISPLAY_MODES.USER,
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    // 1 - Show dialog
    enzymeWrapper.instance().onShowRequestFailedInformation({ payload: { potatoes: 'with ketchup' } })
    enzymeWrapper.update()
    let dialog = enzymeWrapper.find(RequestFailedInformationComponent)
    assert.isTrue(dialog.props().visible, 'The dialog should be visible')
    // 2 - Hide dialog
    enzymeWrapper.instance().onHideRequestFailedInformation()
    enzymeWrapper.update()
    dialog = enzymeWrapper.find(RequestFailedInformationComponent)
    assert.isFalse(dialog.props().visible, 'The dialog should be hidden')
  })

  it('should resolve correctly options dependencies (pause / resume, superficial / complete delete)', () => {
    // 1 - delete completely
    const props = {
      ...commonProperties,
      displayMode: ORDER_DISPLAY_MODES.USER,
      availableEndpoints: [orderStateActions.getDeleteCompletelyDependency()],
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    assert.isTrue(enzymeWrapper.state().hasDeleteCompletely, 'Delete completely should be available')
    assert.isFalse(enzymeWrapper.state().hasDeleteSuperficially, 'Delete superficially should not be available')
    assert.isFalse(enzymeWrapper.state().hasPauseResume, 'Pause resume should be not available')

    // 2 - delete partially
    enzymeWrapper.setProps({
      ...props,
      availableEndpoints: [orderStateActions.getDeleteSuperficiallyDependency()],
    })
    assert.isFalse(enzymeWrapper.state().hasDeleteCompletely, 'Delete completely should not be available')
    assert.isTrue(enzymeWrapper.state().hasDeleteSuperficially, 'Delete superficially should be available')
    assert.isFalse(enzymeWrapper.state().hasPauseResume, 'Pause resume should be not available')

    // 3 - pause resume
    // 3.1 - resolved when user has both pause / resume
    enzymeWrapper.setProps({
      ...props,
      availableEndpoints: [orderStateActions.getPauseDependency(), orderStateActions.getResumeDependency()],
    })
    assert.isFalse(enzymeWrapper.state().hasDeleteCompletely, 'Delete completely should not be available')
    assert.isFalse(enzymeWrapper.state().hasDeleteSuperficially, 'Delete superficially should not be available')
    assert.isTrue(enzymeWrapper.state().hasPauseResume, 'Pause resume should be available')

    // 3.2 - not resolved when user has just one of the two dependencies
    enzymeWrapper.setProps({
      ...props,
      availableEndpoints: [orderStateActions.getResumeDependency()],
    })
    assert.isFalse(enzymeWrapper.state().hasPauseResume, 'Pause resume should not be available when both dependencies are not there')

    // 4 - none available
    enzymeWrapper.setProps({
      ...props,
      availableEndpoints: [],
    })
    assert.isFalse(enzymeWrapper.state().hasDeleteCompletely, 'None available: Delete completely should not be available')
    assert.isFalse(enzymeWrapper.state().hasDeleteSuperficially, 'None available: Delete superficially should not be available')
    assert.isFalse(enzymeWrapper.state().hasPauseResume, 'None available: Pause resume should not be available')

    // 5 - all available
    enzymeWrapper.setProps({
      ...props,
      availableEndpoints: [
        orderStateActions.getDeleteSuperficiallyDependency(), orderStateActions.getPauseDependency(),
        orderStateActions.getResumeDependency(), orderStateActions.getDeleteCompletelyDependency(),
      ],
    })
    assert.isTrue(enzymeWrapper.state().hasDeleteCompletely, 'All available: Delete completely should be available')
    assert.isTrue(enzymeWrapper.state().hasDeleteSuperficially, 'All available: Delete superficially should be available')
    assert.isTrue(enzymeWrapper.state().hasPauseResume, 'All available: Pause resume should be available')
  })
})
