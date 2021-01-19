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
import OrderListComponent from '../../src/components/OrderListComponent'
import { OrderListContainer } from '../../src/containers/OrderListContainer'
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
  it('should render correctly and provide the right callback URL', () => {
    const props = {
      params: {
        project: 'test1',
      },
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(OrderListComponent)
    assert.equal(enzymeWrapper.instance().getBackURL(), '/admin/test1/commands/board', 'The back URL should be correctly defined')
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      backUrl: enzymeWrapper.instance().getBackURL(),
      onUserFilterSelected: enzymeWrapper.instance().onUserFilterSelected,
    }, 'Component should define the expected properties')
  })
  it('should render handle correctly selected filters updates', () => {
    const props = {
      params: {
        project: 'test2',
      },
    }
    const enzymeWrapper = shallow(<OrderListContainer {...props} />, { context })
    assert.isUndefined(enzymeWrapper.state().ordersRequestParameters.user, 'There should be no initial filter')
    let componentWrapper = enzymeWrapper.find(OrderListComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.deepEqual(componentWrapper.props().ordersRequestParameters, {}, 'Request parameters should be empty initially')

    // set up a filter
    enzymeWrapper.instance().onUserFilterSelected('hello@goodbye.com')
    enzymeWrapper.update()
    assert.deepEqual(enzymeWrapper.state().ordersRequestParameters, { user: 'hello@goodbye.com' }, 'User filter should be reported in state')
    componentWrapper = enzymeWrapper.find(OrderListComponent)
    assert.deepEqual(componentWrapper.props().ordersRequestParameters, { user: 'hello@goodbye.com' }, 'User filter should be reported to request parameters')

    // clear filter
    enzymeWrapper.instance().onUserFilterSelected('')
    enzymeWrapper.update()
    assert.isUndefined(enzymeWrapper.state().ordersRequestParameters.user, 'There should be no more filter after clear')
    componentWrapper = enzymeWrapper.find(OrderListComponent)
    assert.deepEqual(componentWrapper.props().ordersRequestParameters, {}, 'Request parameters should be empty after clear')
  })
})
