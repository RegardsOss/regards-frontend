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
import { OrderListFiltersContainer, OrderListFiltersComponentWithRights } from '../../src/containers/OrderListFiltersContainer'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderListFiltersContainer
* @author Raphaël Mechali
*/
describe('[Admin Order Management] Testing OrderListFiltersContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderListFiltersContainer)
  })
  it('should render correctly', () => {
    const props = {
      isPaneOpened: false,
      onCloseFiltersPane: () => { },
      updateRequestParameters: () => { },

      isFetching: true,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      matchingUsers: props.users,
      isFetching: true,
      dispatchGetUsers: props.dispatchGetUsers,
      isPaneOpened: props.isPaneOpened,
      onCloseFiltersPane: props.onCloseFiltersPane,
      updateRequestParameters: props.updateRequestParameters,
    }, 'Component should define the expected properties')
  })
  it('should render correctly not fetching', () => {
    const props = {
      isPaneOpened: false,
      onCloseFiltersPane: () => { },
      updateRequestParameters: () => { },

      isFetching: false,
      users: {},
      dispatchGetUsers: () => { },
    }
    const enzymeWrapper = shallow(<OrderListFiltersContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListFiltersComponentWithRights)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      matchingUsers: props.users,
      isFetching: false,
      dispatchGetUsers: props.dispatchGetUsers,
      isPaneOpened: props.isPaneOpened,
      onCloseFiltersPane: props.onCloseFiltersPane,
      updateRequestParameters: props.updateRequestParameters,
    }, 'Component should define the expected properties')
  })
})
