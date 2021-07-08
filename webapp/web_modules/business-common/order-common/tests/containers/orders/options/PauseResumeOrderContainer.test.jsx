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
import { OrderDomain } from '@regardsoss/domain'
import { OrderClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PauseResumeOrderComponent from '../../../../src/components/orders/options/PauseResumeOrderComponent'
import { PauseResumeOrderContainer } from '../../../../src/containers/orders/options/PauseResumeOrderContainer'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test PauseResumeOrderContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing PauseResumeOrderContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PauseResumeOrderContainer)
  })

  // list of statuses and expected bahavior
  const statusAndExpected = [
    { status: OrderDomain.ORDER_STATUS_ENUM.PENDING, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.EXPIRED, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.FAILED, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.DONE, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.DELETED, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.REMOVED, canUpdate: false, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.RUNNING, canUpdate: true, isPaused: false },
    { status: OrderDomain.ORDER_STATUS_ENUM.PAUSED, canUpdate: true, isPaused: true },
  ]

  statusAndExpected.forEach(({ status, canUpdate, isPaused }) => it(`Should render correctly in status ${status}`, () => {
    // mock entity with state
    const entity = {
      content: { ...SOME_ORDERS.content[0].content, status },
      links: [
        ...SOME_ORDERS.content[0].links,
        OrderDomain.ORDER_STATUS_ENUM.RUNNING === status ? {
          rel: 'pause', href: 'test',
        } : null,
        OrderDomain.ORDER_STATUS_ENUM.PAUSED === status ? {
          rel: 'resume', href: 'test',
        } : null,
      ].filter((a) => (a)),
    }
    const props = {
      entity,
      pageSize: 20,
      orderStateActions: new OrderClient.OrderStateActions('any'), // used in mapDispatchToProps
      ordersActions: new OrderClient.OrderListActions('any'),
      ordersSelectors: OrderClient.getOrderListSelectors(['any']),
      onShowRequestFailedInformation: () => { },
      onShowAsynchronousRequestInformation: () => { },
      sendPause: () => new Promise((resolve) => resolve(true)),
      sendResume: () => new Promise((resolve) => resolve(true)),
      fetchOrders: () => { },
    }
    const enzymeWrapper = shallow(<PauseResumeOrderContainer {...props} />, { context })
    const component = enzymeWrapper.find(PauseResumeOrderComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.equal(component.props().onPause, enzymeWrapper.instance().onPause, 'Pause callback should be correctly ')
    assert.equal(component.props().onResume, enzymeWrapper.instance().onResume, 'Resume callback should be correctly set')
    if (canUpdate) {
      assert.isTrue(component.props().canUpdate, 'The update operation should be enabled')
    } else {
      assert.isFalse(component.props().canUpdate, 'The update operation should be disabled')
    }
    if (isPaused) {
      assert.isTrue(component.props().isPaused, 'The component should be marked paused')
    } else {
      assert.isFalse(component.props().isPaused, 'The component should not be marked paused')
    }
  }))
})
