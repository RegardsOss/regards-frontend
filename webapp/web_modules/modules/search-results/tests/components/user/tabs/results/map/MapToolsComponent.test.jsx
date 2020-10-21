/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapToolsComponent from '../../../../../../src/components/user/tabs/results/map/MapToolsComponent'
import styles from '../../../../../../src/styles'
import MapSelectionModeOption from '../../../../../../src/components/user/tabs/results/map/options/MapSelectionModeOption'

const context = buildTestContext(styles)

/**
 * Test MapToolsComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MapToolsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapToolsComponent)
  })

  UIDomain.MAP_SELECTION_MODES.forEach(selectionMode => it(`should render correctly when selected mode is ${selectionMode}`, () => {
    const props = {
      selectionMode,
      onSetSelectionMode: () => {},
      opacity: 1,
      handleChangeOpacity: () => {},
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapSelectionModeOption)
    assert.lengthOf(selectors, UIDomain.MAP_SELECTION_MODES.length, 'There should be an option selector for each selection mode')

    UIDomain.MAP_SELECTION_MODES.forEach((localSelectionMode) => {
      const modeSelector = selectors.findWhere(n => n.props().selectionMode === localSelectionMode)
      assert.lengthOf(modeSelector, 1, `There should be a selector for mode ${localSelectionMode}`)
      assert.equal(modeSelector.props().onSetSelectionMode, props.onSetSelectionMode, 'Selector callback should be correctly set')
      if (localSelectionMode === selectionMode) {
        assert.isTrue(modeSelector.props().selected, `${localSelectionMode} selector should be selected`)
      } else {
        assert.isFalse(modeSelector.props().selected, `${localSelectionMode} selector should not be selected`)
      }
    })
  }))
})
