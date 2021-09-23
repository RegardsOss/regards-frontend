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
import IconButton from 'material-ui/IconButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import DeleteSuperficiallyOrderComponent from '../../../../src/components/orders/options/DeleteSuperficiallyOrderComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DeleteSuperficiallyOrderComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DeleteSuperficiallyOrderComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteSuperficiallyOrderComponent)
  })
  it('should render correctly disabled', () => {
    const props = {
      isCompleteDelete: false,
      canDelete: false,
      onDelete: () => { },
    }
    const enzymeWrapper = shallow(<DeleteSuperficiallyOrderComponent {...props} />, { context })
    const iconWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconWrapper, 1, 'There should be a button')
    assert.isTrue(iconWrapper.props().disabled, 'it should be disabled')
  })
  it('should render correctly for superficial delete', () => {
    const props = {
      isCompleteDelete: false,
      canDelete: true,
      onDelete: () => { },
    }
    const enzymeWrapper = shallow(<DeleteSuperficiallyOrderComponent {...props} />, { context })
    const iconWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconWrapper, 1, 'There should be a button')
    assert.isFalse(iconWrapper.props().disabled, 'it should be enabled')
    assert.equal(iconWrapper.props().title, 'order.list.option.cell.delete.superficially.order.tooltip', 'superficial delete tooltip should be shown')
    assert.equal(iconWrapper.props().onClick, props.onDelete, 'callback should be correctly provided')
  })
  it('should render correctly for complete delete', () => {
    const props = {
      isCompleteDelete: true,
      canDelete: true,
      onDelete: () => { },
    }
    const enzymeWrapper = shallow(<DeleteSuperficiallyOrderComponent {...props} />, { context })
    const iconWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconWrapper, 1, 'There should be a button')
    assert.isFalse(iconWrapper.props().disabled, 'it should be enabled')
    assert.equal(iconWrapper.props().title, 'order.list.option.cell.delete.completely.order.tooltip', 'superficial delete tooltip should be shown')
    assert.equal(iconWrapper.props().onClick, props.onDelete, 'callback should be correctly provided')
  })
})
