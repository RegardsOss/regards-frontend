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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AddElementToCartComponent from '../../../../../../../src/components/user/tabs/results/common/options/AddElementToCartComponent'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AddElementToCartComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing AddElementToCartComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AddElementToCartComponent)
  })
  it('should render correctly disabled', () => {
    const props = {
      canAddToCart: false,
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartComponent {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'There should be a button')
    assert.equal(iconButtonWrapper.props().onClick, props.onAddElementToCart, 'The callback should be correctly reported')
    assert.isTrue(iconButtonWrapper.props().disabled, 'The action button should be disabled')
  })
  it('should render correctly enabled', () => {
    const props = {
      canAddToCart: true,
      onAddElementToCart: () => { },
    }
    const enzymeWrapper = shallow(<AddElementToCartComponent {...props} />, { context })
    const iconButtonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButtonWrapper, 1, 'There should be a button')
    assert.equal(iconButtonWrapper.props().onClick, props.onAddElementToCart, 'The callback should be correctly reported')
    assert.isFalse(iconButtonWrapper.props().disabled, 'The action button should be enabled')
  })
})
