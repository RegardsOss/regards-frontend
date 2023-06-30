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
import FlatButton from 'material-ui/FlatButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SwitchSelectAllButton } from '../../src/buttons/SwitchSelectAllButton'
import styles from '../../src/buttons/styles'

const context = buildTestContext(styles)

/**
 * Test SwitchSelectAllButton
 * @author Raphaël Mechali
 */
describe('[Components] Testing SwitchSelectAllButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SwitchSelectAllButton)
  })
  it('should render correctly when marked all selected', () => {
    const props = {
      areAllSelected: true,
      onSelectAll: function onSelectAll() { },
      onUnselectAll: function onUnselectAll() { },
      selectAllTooltip: 'select.all.tooltip',
      selectAllIcon: <div id="Select.all" />,
      unselectAllTooltip: 'unselect.all.tooltip',
      unselectAllIcon: <div id="Unselect.all" />,
    }
    const enzymeWrapper = shallow(<SwitchSelectAllButton {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')

    // check that, when all elements are selected, unselect all operation is shown
    assert.equal(buttonWrapper.props().onClick, props.onUnselectAll, 'Unselect all callback should be set up')
    assert.equal(buttonWrapper.props().label, 'components.buttons.unselect.all', 'Unselect all label should be set up')
    assert.equal(buttonWrapper.props().title, props.unselectAllTooltip, 'Unselect all tooltip should be set up')
    assert.isDefined(buttonWrapper.props().icon, 'Button should have an icon')
    const iconWrapper = shallow(buttonWrapper.props().icon)
    assert.equal(iconWrapper.props().id, 'Unselect.all')
  })
  it('should render correctly when not marked all selected', () => {
    const props = {
      areAllSelected: false,
      onSelectAll: function onSelectAll() { },
      onUnselectAll: function onUnselectAll() { },
      selectAllTooltip: 'select.all.tooltip',
      selectAllIcon: <div id="Select.all" />,
      unselectAllTooltip: 'unselect.all.tooltip',
      unselectAllIcon: <div id="Unselect.all" />,
    }
    const enzymeWrapper = shallow(<SwitchSelectAllButton {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')

    // check that, when all elements are not selected, select all operation is shown
    assert.equal(buttonWrapper.props().onClick, props.onSelectAll, 'Select all callback should be set up')
    assert.equal(buttonWrapper.props().label, 'components.buttons.select.all', 'Select all label should be set up')
    assert.equal(buttonWrapper.props().title, props.selectAllTooltip, 'Select all tooltip should be set up')
    assert.isDefined(buttonWrapper.props().icon, 'Button should have an icon')
    const iconWrapper = shallow(buttonWrapper.props().icon)
    assert.equal(iconWrapper.props().id, 'Select.all')
  })
})
