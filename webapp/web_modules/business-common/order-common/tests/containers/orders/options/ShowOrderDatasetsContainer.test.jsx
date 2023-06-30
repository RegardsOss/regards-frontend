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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OrdersNavigationActions } from '../../../../src/model/OrdersNavigationActions'
import ShowOrderDatasetsComponent from '../../../../src/components/orders/options/ShowOrderDatasetsComponent'
import { ShowOrderDatasetsContainer } from '../../../../src/containers/orders/options/ShowOrderDatasetsContainer'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ShowOrderDatasetsContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing ShowOrderDatasetsContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowOrderDatasetsContainer)
  })
  it('should render correctly', () => {
    const props = {
      entity: SOME_ORDERS.content[0],
      navigationActions: new OrdersNavigationActions('any'),
      dispatchOrderSelected: () => { },
    }
    const enzymeWrapper = shallow(<ShowOrderDatasetsContainer {...props} />, { context })
    const component = enzymeWrapper.find(ShowOrderDatasetsComponent)
    assert.lengthOf(component, 1, 'There should be the component')
    assert.equal(component.props().onSelectOrder, props.dispatchOrderSelected, 'Callback should be correctly set')
  })
})
