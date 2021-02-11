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
import IconButton from 'material-ui/IconButton'
import Chip from 'material-ui/Chip'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ShowableAtRender } from '@regardsoss/components'
import CartSelectorComponent from '../../../src/components/user/CartSelectorComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test CartSelectorComponent
* @author Raphaël Mechali
*/
describe('[Menu] Testing CartSelectorComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CartSelectorComponent)
  })
  it('should render correctly without basket content', () => {
    const props = {
      objectsCount: 0,
      onCartClicked: () => { },
    }
    const enzymeWrapper = shallow(<CartSelectorComponent {...props} />, { context })
    // check that notification count is hidden
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showing / hide controller for the basket count component')
    assert.isFalse(showableWrapper.props().show, 'It should be hiding the count when zero')
    // check callback is set up
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().onClick, props.onCartClicked, 'Callback should be set')
    // check tool tip is set up
    assert.isDefined(buttonWrapper.props().title, 'There should be a tooltip')
  })
  it('should render correctly with low count basket content', () => {
    const props = {
      objectsCount: CartSelectorComponent.MAX_ELEMENTS_COUNT - 1,
      onCartClicked: () => { },
    }
    const enzymeWrapper = shallow(<CartSelectorComponent {...props} />, { context })
    // check that notification count is hidden
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showing / hide controller for the basket count component')
    assert.isTrue(showableWrapper.props().show, 'It should be showing the count when not zero')
    // check callback is set up
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().onClick, props.onCartClicked, 'Callback should be set')
    // check tool tip is set up and contains objectsCount count
    assert.isDefined(buttonWrapper.props().title, 'There should be a tooltip')
    // check the chip label contains objectsCount count
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1, 'There should be a chip to show objectsCount')
    assert.include(chipWrapper.debug(), `${props.objectsCount}`, 'The chip text should contain objectsCount count')
  })
  it('should render correctly with high count basket content', () => {
    const props = {
      objectsCount: CartSelectorComponent.MAX_ELEMENTS_COUNT + 1,
      onCartClicked: () => { },
    }
    const enzymeWrapper = shallow(<CartSelectorComponent {...props} />, { context })
    // check that notification count is hidden
    const showableWrapper = enzymeWrapper.find(ShowableAtRender)
    assert.lengthOf(showableWrapper, 1, 'There should be a showing / hide controller for the basket count component')
    assert.isTrue(showableWrapper.props().show, 'It should be showing the count when not zero')
    // check callback is set up
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.equal(buttonWrapper.props().onClick, props.onCartClicked, 'Callback should be set')
    // check tool tip is set up and contains objectsCount count
    assert.isDefined(buttonWrapper.props().title, 'There should be a tooltip')
    // check the chip label shows max count info (not objectsCount)
    const chipWrapper = enzymeWrapper.find(Chip)
    assert.lengthOf(chipWrapper, 1, 'There should be a chip to show objectsCount')
    assert.isFalse(chipWrapper.debug().includes(`${props.objectsCount}`), 'The chip text should not contain objectsCount count, but a replacement text')
  })
})
