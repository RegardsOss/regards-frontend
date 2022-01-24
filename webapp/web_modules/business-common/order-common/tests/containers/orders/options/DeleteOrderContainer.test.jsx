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
import { OrderDomain } from '@regardsoss/domain'
import { OrderClient } from '@regardsoss/client'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteSuperficiallyOrderComponent from '../../../../src/components/orders/options/DeleteSuperficiallyOrderComponent'
import { DeleteOrderContainer } from '../../../../src/containers/orders/options/DeleteOrderContainer'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DeleteOrderContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DeleteOrderContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteOrderContainer)
  })

  // all test cases, with the fact they can be deleted or not and should superficially or completely deleted
  const testCases = [{
    status: OrderDomain.ORDER_STATUS_ENUM.PENDING,
    canDelete: false,
    isSuperficial: true,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.RUNNING,
    canDelete: false,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.PAUSED,
    canDelete: true,
    isSuperficial: true,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.EXPIRED,
    canDelete: true,
    isSuperficial: false,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.FAILED,
    canDelete: true,
    isSuperficial: false,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.DONE_WITH_WARNING,
    canDelete: true,
    isSuperficial: false,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.DONE,
    canDelete: true,
    isSuperficial: false,
  }, {
    status: OrderDomain.ORDER_STATUS_ENUM.DELETED,
    canDelete: true,
    isSuperficial: false,
  },
  ]

  testCases.forEach(({ status, canDelete, isSuperficial }) => {
    let caseLabel = 'forbid delete'
    if (canDelete) {
      caseLabel = isSuperficial ? 'allow superficial delete' : 'allow complete delete'
    }
    it(`should ${caseLabel} in order state ${status}`, () => {
      // mock entity with state
      const entity = {
        content: { ...SOME_ORDERS.content[0].content, status },
        links: SOME_ORDERS.content[0].links,
      }
      // spy callbacks count
      let countDeleteConfirmationRequests = 0
      let deleteSuperficallyRequests = 0
      let deleteCompletelyRequests = 0
      const props = {
        entity,
        pageSize: 20,
        hasDeleteSuperficially: true,
        hasDeleteCompletely: true,
        orderStateActions: new OrderClient.OrderStateActions('any'),
        ordersActions: new OrderClient.OrderListActions('any'),
        ordersSelectors: OrderClient.getOrderListSelectors(['idk']),
        onShowRequestFailedInformation: () => { },
        onShowDeleteConfirmation: () => { countDeleteConfirmationRequests += 1 },
        sendDeleteSuperficially: () => {
          deleteSuperficallyRequests += 1
          return new Promise((resolve) => resolve(true))
        },
        sendDeleteCompletely: () => {
          deleteCompletelyRequests += 1
          return new Promise((resolve) => resolve(true))
        },
        fetchOrders: () => { },
      }
      const enzymeWrapper = shallow(<DeleteOrderContainer {...props} />, { context })
      const component = enzymeWrapper.find(DeleteSuperficiallyOrderComponent)
      assert.lengthOf(component, 1, 'There should be the component')
      const deleteCallback = enzymeWrapper.instance().onDeleteRequest
      assert.equal(component.props().onDelete, deleteCallback, 'Callback should be set')
      if (canDelete) {
        // specific tests for deletable entities
        // 1 - check the user confirmation is request
        deleteCallback()
        assert.equal(countDeleteConfirmationRequests, 1, 'Delete confirmation should have been called')
        // 2 - check the container calls the right delete method according with delete type
        enzymeWrapper.instance().onDeleteConfirmed()
        if (!isSuperficial) {
          assert.equal(deleteCompletelyRequests, 1, 'Delete completely should have been called')
          assert.equal(deleteSuperficallyRequests, 0, 'Delete superficially should not have been called')
        }
      }
    })
  })
})
