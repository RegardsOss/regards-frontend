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
import { TableSelectionModes } from '@regardsoss/components'
import { AdminDomain, OrderDomain } from '@regardsoss/domain'
import OrderListFiltersComponent from '../../src/components/OrderListFiltersComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test OrderListFiltersComponent
 * @author Raphaël Mechali
 */
describe('[Admin Order Managament] Testing OrderListFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListFiltersComponent)
  })
  it('should render correctly and update dynamically the current users list provided as hints', () => {
    const props = {
      matchingUsers: {
        0: {
          content: {
            email: 'test1@test.te',
            status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_GRANTED,
          },
        },
        1: {
          content: {
            email: 'test2@test.te',
            status: AdminDomain.PROJECT_USER_STATUS_ENUM.ACCESS_GRANTED,
          },
        },
      },
      isFetching: false,
      dispatchGetUsers: () => { },
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      isPaneOpened: true,
      onCloseFiltersPane: () => { },
      inputValues: {
        creationDate: {
          after: Date.now(),
          before: new Date().setMinutes(new Date().getMinutes() + 18),
        },
        owner: 'user1@test.fr',
        statuses: {
          mode: TableSelectionModes.INCLUDE,
          values: [OrderDomain.ORDER_STATUS_ENUM.DONE],
        },
      },
    }
    shallow(<OrderListFiltersComponent {...props} />, { context })
  })
  it('should render correctly when fetching', () => {
    const props = {
      isFetching: true,
      matchingUsers: {},
      dispatchGetUsers: () => {},
      updateFilter: () => { },
      updateValuesFilter: () => { },
      updateDatesFilter: () => { },
      isPaneOpened: true,
      onCloseFiltersPane: () => { },
      inputValues: {
        creationDate: {
          after: Date.now(),
          before: new Date().setMinutes(new Date().getMinutes() + 18),
        },
        owner: 'user1@test.fr',
        statuses: {
          mode: TableSelectionModes.INCLUDE,
          values: [OrderDomain.ORDER_STATUS_ENUM.DONE],
        },
      },
    }
    shallow(<OrderListFiltersComponent {...props} />, { context })
  })
})
