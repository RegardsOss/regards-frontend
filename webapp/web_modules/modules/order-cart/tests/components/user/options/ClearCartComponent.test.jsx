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
import ClearCartComponent, { ButtonWithConfirmDialog } from '../../../../src/components/user/options/ClearCartComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ClearCartComponent
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing ClearCartComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ClearCartComponent)
  })
  it('should render correctly when empty', () => {
    const props = {
      onClearCart: () => { },
      empty: true,
      isFetching: false,
    }
    const enzymeWrapper = shallow(<ClearCartComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(ButtonWithConfirmDialog)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button with confirm dialog')
    assert.equal(buttonWrapper.props().onClick, props.onClearCart, 'Callback should be correctly reported')
    assert.isTrue(buttonWrapper.props().disabled, 'The button should be disabled')

    // also check the dialog button props are provided
    assert.isDefined(buttonWrapper.props().dialogTitle, 'There should be a dialog title')
    assert.isDefined(buttonWrapper.props().dialogMessage, 'There should be a dialog message')
    assert.isDefined(buttonWrapper.props().label, 'There should be a label')
    assert.isDefined(buttonWrapper.props().title, 'There should be a title')
  })
  it('should render correctly when fetching', () => {
    const props = {
      onClearCart: () => { },
      empty: false,
      isFetching: true,
    }
    const enzymeWrapper = shallow(<ClearCartComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(ButtonWithConfirmDialog)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button with confirm dialog')
    assert.equal(buttonWrapper.props().onClick, props.onClearCart, 'Callback should be correctly reported')
    assert.isTrue(buttonWrapper.props().disabled, 'The button should be disabled')
  })
  it('should render correctly when not empty', () => {
    const props = {
      onClearCart: () => { },
      empty: false,
      isFetching: false,
    }
    const enzymeWrapper = shallow(<ClearCartComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(ButtonWithConfirmDialog)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button with confirm dialog')
    assert.equal(buttonWrapper.props().onClick, props.onClearCart, 'Callback should be correctly reported')
    assert.isFalse(buttonWrapper.props().disabled, 'The button should be disabled')
  })
})
