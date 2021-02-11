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
import { CheckBoxCell } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ToggleElementSelectionComponent from '../../../../../src/components/admin/content/restrictions/ToggleElementSelectionComponent'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ToggleElementSelectionComponent
 * @author Raphaël Mechali
 */
describe('[ Module name] Testing ToggleElementSelectionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ToggleElementSelectionComponent)
  })
  it('should render correctly unselected and invoke parent callback on statetoggle', () => {
    const spyToggleSelection = {
      rowIndex: null,
    }
    const props = {
      entity: {
        id: 'myId',
        label: 'myLabel',
      },
      rowIndex: 18,
      selectedElements: ['a', 'myId3600'],
      onToggleSelection: (rowIndex) => {
        spyToggleSelection.rowIndex = rowIndex
      },
    }
    const enzymeWrapper = shallow(<ToggleElementSelectionComponent {...props} />, { context })
    const checkboxCell = enzymeWrapper.find(CheckBoxCell)
    assert.lengthOf(checkboxCell, 1, 'There should be the check box cell')
    testSuiteHelpers.assertWrapperProperties(checkboxCell, {
      selected: false,
      onToggleSelection: enzymeWrapper.instance().onToggleSelection,
    }, 'Checkbox cell properties should be correctly set')
    // Test callback
    assert.isNull(spyToggleSelection.rowIndex, 'Callback should not have been invoked yet')
    checkboxCell.props().onToggleSelection()
    assert.equal(spyToggleSelection.rowIndex, props.rowIndex, 'Callback should have invoked with right parameters')
  })
  it('should render correctly selected', () => {
    const spyToggleSelection = {
      rowIndex: null,
    }
    const props = {
      entity: {
        id: 'myId25',
        label: 'myLabel25',
      },
      rowIndex: 18,
      selectedElements: ['a', 'myId25', 'myId3600'],
      onToggleSelection: (rowIndex) => {
        spyToggleSelection.rowIndex = rowIndex
      },
    }
    const enzymeWrapper = shallow(<ToggleElementSelectionComponent {...props} />, { context })
    const checkboxCell = enzymeWrapper.find(CheckBoxCell)
    assert.lengthOf(checkboxCell, 1, 'There should be the check box cell')
    testSuiteHelpers.assertWrapperProperties(checkboxCell, {
      selected: true,
      onToggleSelection: enzymeWrapper.instance().onToggleSelection,
    }, 'Checkbox cell properties should be correctly set')
  })
})
