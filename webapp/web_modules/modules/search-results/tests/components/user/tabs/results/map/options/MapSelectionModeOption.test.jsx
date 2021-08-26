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
import FlatButton from 'material-ui/FlatButton'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapSelectionModeOption from '../../../../../../../src/components/user/tabs/results/map/options/MapSelectionModeOption'
import styles from '../../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test MapSelectionModeOption
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing MapSelectionModeOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapSelectionModeOption)
  })

  UIDomain.MAP_SELECTION_MODES.forEach((mapSelectionMode) => {
    [true, false].forEach((selected) => it(`Should render correctly for mode ${mapSelectionMode} when ${selected ? 'selected' : 'unselected'}`, () => {
      const props = {
        selected,
        mapSelectionMode,
        onToggleSelectionMode: () => { },
        index: 0,
      }
      const enzymeWrapper = shallow(<MapSelectionModeOption {...props} />, { context })
      const button = enzymeWrapper.find(FlatButton)

      testSuiteHelpers.assertWrapperProperties(button, {
        onClick: enzymeWrapper.instance().onClicked,
        title: `results.map.tools.tooltip.for.${mapSelectionMode}`,
        secondary: selected,
      }, 'Button properties should be correctly set')
      assert.isOk(button.props().icon, 'There should be an icon')
    }))
  })
})
