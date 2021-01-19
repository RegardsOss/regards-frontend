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
import FlatButton from 'material-ui/FlatButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ToggleTreeVisibleOptionComponent from '../../../../src/components/user/header/ToggleTreeVisibleOptionComponent'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ToggleTreeVisibleOptionComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing ToggleTreeVisibleOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleTreeVisibleOptionComponent)
  })
  it('should render correctly when tree is visible', () => {
    const props = {
      browsingTreeVisible: true,
      onToggleVisible: () => {},
    }
    const enzymeWrapper = shallow(<ToggleTreeVisibleOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      onClick: props.onToggleVisible,
      secondary: true,
      title: 'module.description.header.toggle.tree.visible.tooltip',
    }, 'Button properties should be correctly set')
  })
  it('should render correctly when tree is hidden', () => {
    const props = {
      browsingTreeVisible: false,
      onToggleVisible: () => {},
    }
    const enzymeWrapper = shallow(<ToggleTreeVisibleOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      onClick: props.onToggleVisible,
      secondary: false,
      title: 'module.description.header.toggle.tree.visible.tooltip',
    }, 'Button properties should be correctly set')
  })
})
