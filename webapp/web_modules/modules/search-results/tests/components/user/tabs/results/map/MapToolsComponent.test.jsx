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
import { FlatButton } from 'material-ui'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapToolsComponent from '../../../../../../src/components/user/tabs/results/map/MapToolsComponent'
import styles from '../../../../../../src/styles'
import MapSelectionModeOption from '../../../../../../src/components/user/tabs/results/map/options/MapSelectionModeOption'
import MapViewModeOption from '../../../../../../src/components/user/tabs/results/map/options/MapViewModeOption'

const context = buildTestContext(styles)

/**
 * Test MapToolsComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing MapToolsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapToolsComponent)
  })

  UIDomain.MAP_SELECTION_MODES.forEach((selectionMode) => it(`should render correctly when selected mode is ${selectionMode}`, () => {
    const props = {
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: true,
        enabled: true,
        layerName: 'Hello',
      }],
      selectionMode,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleMode: () => {},
      opacity: 1,
      handleChangeOpacity: () => {},
      selectedProducts: [],
      onProductSelected: () => {},
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapSelectionModeOption)
    assert.lengthOf(selectors, UIDomain.MAP_SELECTION_MODES.length, 'There should be an option selector for each selection mode')

    UIDomain.MAP_SELECTION_MODES.forEach((localSelectionMode) => {
      const modeSelector = selectors.findWhere((n) => n.props().selectionMode === localSelectionMode)
      assert.lengthOf(modeSelector, 1, `There should be a selector for mode ${localSelectionMode}`)
      assert.equal(modeSelector.props().onToggleMode, props.onToggleMode, 'Selector callback should be correctly set')
      if (localSelectionMode === selectionMode) {
        assert.isTrue(modeSelector.props().selected, `${localSelectionMode} selector should be selected`)
      } else {
        assert.isFalse(modeSelector.props().selected, `${localSelectionMode} selector should not be selected`)
      }
    })

    const removeSelected = enzymeWrapper.find(FlatButton)
    assert.equal(removeSelected.length, 0, 'There should not be a remove selected product button')
  }))

  UIDomain.MAP_VIEW_MODES.forEach((viewMode) => it(`should render correctly when view mode is ${viewMode}`, () => {
    const props = {
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: true,
        enabled: true,
        layerName: 'Hello',
      }, {
        url: 'HELLO2.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_2D,
        background: true,
        enabled: true,
        layerName: 'Hello2',
      }],
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode,
      onToggleMode: () => {},
      opacity: 1,
      handleChangeOpacity: () => {},
      selectedProducts: [{
        id: 'TestID',
        label: 'TestLabel',
      }],
      onProductSelected: () => {},
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapViewModeOption)
    assert.lengthOf(selectors, UIDomain.MAP_VIEW_MODES.length, 'There should be an option selector for each view mode')

    UIDomain.MAP_VIEW_MODES.forEach((localViewMode) => {
      const modeSelector = selectors.findWhere((n) => n.props().viewMode === localViewMode)
      assert.lengthOf(modeSelector, 1, `There should be a selector for mode ${localViewMode}`)
      assert.equal(modeSelector.props().onToggleMode, props.onToggleMode, 'Selector callback should be correctly set')
      if (localViewMode === viewMode) {
        assert.isTrue(modeSelector.props().selected, `${localViewMode} selector should be selected`)
      } else {
        assert.isFalse(modeSelector.props().selected, `${localViewMode} selector should not be selected`)
      }
    })

    const removeSelected = enzymeWrapper.find(FlatButton)
    assert.equal(removeSelected.length, 1, 'There should be a remove selected product button')
  }))

  it('should render correctly with features', () => {
    const props = {
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: true,
        enabled: true,
        layerName: 'Hello',
      }],
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleMode: () => {},
      opacity: 1,
      handleChangeOpacity: () => {},
      selectedProducts: [{
        id: 'TestID',
        label: 'TestLabel',
      }],
      onProductSelected: () => {},
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapViewModeOption)
    assert.lengthOf(selectors, 1, 'There should be only one option')
  })
})
