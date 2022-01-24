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
import HandySport from 'mdi-material-ui/Human'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { Breadcrumb } from '@regardsoss/components'
import OrdersNavigationComponent from '../../../src/components/navigation/OrdersNavigationComponent'
import styles from '../../../src/styles/styles'
import { SOME_ORDERS } from '../../dumps/Orders.dumb'

const context = buildTestContext(styles)

/**
* Test OrdersNavigationComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrdersNavigationComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrdersNavigationComponent)
  })
  it('should render correctly an empty path (root only)', () => {
    const props = {
      title: 'temp',
      rootIcon: <HandySport />,
      navigationPath: [OrdersNavigationComponent.ROOT_MARKER],
      onResetTolevel: () => { },
    }
    const enzymeWrapper = shallow(<OrdersNavigationComponent {...props} />, { context })
    const breadcrumb = enzymeWrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumb, 1, 'There should be one breadcrumb')
    assert.lengthOf(breadcrumb.props().elements, 1, 'There should be only the root element')
  })
  it('should render correctly an order selected path', () => {
    const order = SOME_ORDERS.content[0]
    const props = {
      title: 'temp',
      rootIcon: <HandySport />,
      navigationPath: [OrdersNavigationComponent.ROOT_MARKER, order],
      onResetTolevel: () => { },
    }
    const enzymeWrapper = shallow(<OrdersNavigationComponent {...props} />, { context })
    const breadcrumb = enzymeWrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumb, 1, 'There should be one breadcrumb')
    assert.lengthOf(breadcrumb.props().elements, 2, 'There should be root and order elements')
  })
  it('should render correctly an empty path', () => {
    const order = SOME_ORDERS.content[0]
    const dataset = order.content.datasetTasks[0]
    const props = {
      title: 'temp',
      rootIcon: <HandySport />,
      navigationPath: [OrdersNavigationComponent.ROOT_MARKER, order, dataset],
      onResetTolevel: () => { },
    }
    const enzymeWrapper = shallow(<OrdersNavigationComponent {...props} />, { context })
    const breadcrumb = enzymeWrapper.find(Breadcrumb)
    assert.lengthOf(breadcrumb, 1, 'There should be one breadcrumb')
    assert.lengthOf(breadcrumb.props().elements, 3, 'There should be root, order and dataset task elements')
  })
})
