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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SOME_ORDERS } from '../../../dumps/Orders.dumb'
import { SOME_ORDER_PROCESSINGS } from '../../../dumps/OrderProcessings.dump'
import ShowOrderProcessingsComponent from '../../../../src/components/orders/options/ShowOrderProcessingsComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test ShowOrderProcessingsComponent
 * @author Théo Lasserre
 */
describe('[Order Common] Testing ShowOrderProcessingsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowOrderProcessingsComponent)
  })
  it('should render correctly an enabled button', () => {
    const props = {
      orderProcessings: SOME_ORDER_PROCESSINGS,
      onShowProcessings: () => { },
    }
    const enzymeWrapper = shallow(<ShowOrderProcessingsComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().disabled, false, 'Button should be enabled')
  })
  it('should render correctly a disabled button', () => {
    const props = {
      orderProcessings: {
        orderLabel: SOME_ORDERS.content[0].content.label,
        orderProcessingList: [],
      },
      onShowProcessings: () => { },
    }
    const enzymeWrapper = shallow(<ShowOrderProcessingsComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().disabled, true, 'Button should be disabled')
  })
})
