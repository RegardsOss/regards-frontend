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
import DeleteDatedItemSelectionComponent, { IconButtonWithConfirmDialog } from '../../../../src/components/user/options/DeleteDatedItemSelectionComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DeleteDatedItemSelectionComponent
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing DeleteDatedItemSelectionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteDatedItemSelectionComponent)
  })
  it('should render correctly not disabled', () => {
    const props = {
      onDelete: () => { },
      disabled: false,
    }
    const enzymeWrapper = shallow(<DeleteDatedItemSelectionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButtonWithConfirmDialog)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button with confirm dialog')
    assert.equal(buttonWrapper.props().onClick, props.onDelete, 'Callback should be correctly reported')
    assert.isFalse(buttonWrapper.props().disabled, 'Option should be enabled')

    // also check the dialog button props are provided
    assert.isDefined(buttonWrapper.props().dialogTitle, 'There should be a dialog title')
    assert.isDefined(buttonWrapper.props().dialogMessage, 'There should be a dialog message')
    assert.isDefined(buttonWrapper.props().title, 'There should be a title')
  })
  it('should render correctly disabled', () => {
    const props = {
      onDelete: () => { },
      disabled: true,
    }
    const enzymeWrapper = shallow(<DeleteDatedItemSelectionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButtonWithConfirmDialog)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button with confirm dialog')
    assert.equal(buttonWrapper.props().onClick, props.onDelete, 'Callback should be correctly reported')
    assert.isTrue(buttonWrapper.props().disabled, 'Option should be disabled')
  })
})
