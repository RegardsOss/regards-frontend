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
import { TableHeaderText } from '@regardsoss/components'
import { ORDER_DISPLAY_MODES } from '../../../src/model/OrderDisplayModes'
import OrderCountHeaderMessage from '../../../src/components/orders/OrderCountHeaderMessage'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OrderCountHeaderMessage
* @author Raphaël Mechali
*/
describe('[Order Common] Testing OrderCountHeaderMessage', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OrderCountHeaderMessage)
  })
  it('should render correctly no data in ADMIN mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      totalOrderCount: 0,
    }
    const enzymeWrapper = shallow(<OrderCountHeaderMessage {...props} />, { context })
    const textWrapper = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(textWrapper, 1, 'There should be a table header text ')
    assert.equal(textWrapper.props().text, 'order.list.admin.no.command.header.message', 'Text should be correctly internationalized for current mode')
  })
  it('should render correctly with data in ADMIN mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
      totalOrderCount: 18,
    }
    const enzymeWrapper = shallow(<OrderCountHeaderMessage {...props} />, { context })
    const textWrapper = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(textWrapper, 1, 'There should be a table header text ')
    assert.equal(textWrapper.props().text, 'order.list.admin.commands.header.message', 'Text should be correctly internationalized for current mode')
  })
  it('should render correctly no data in USER mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.USER,
      totalOrderCount: 0,
    }
    const enzymeWrapper = shallow(<OrderCountHeaderMessage {...props} />, { context })
    const textWrapper = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(textWrapper, 1, 'There should be a table header text ')
    assert.equal(textWrapper.props().text, 'order.list.user.no.command.header.message', 'Text should be correctly internationalized for current mode')
  })
  it('should render correctly with data in USER mode', () => {
    const props = {
      displayMode: ORDER_DISPLAY_MODES.USER,
      totalOrderCount: 18,
    }
    const enzymeWrapper = shallow(<OrderCountHeaderMessage {...props} />, { context })
    const textWrapper = enzymeWrapper.find(TableHeaderText)
    assert.lengthOf(textWrapper, 1, 'There should be a table header text ')
    assert.equal(textWrapper.props().text, 'order.list.user.commands.header.message', 'Text should be correctly internationalized for current mode')
  })
})
