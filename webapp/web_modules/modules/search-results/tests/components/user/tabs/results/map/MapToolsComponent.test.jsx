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
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import FlatButton from 'material-ui/FlatButton'
import MapToolsComponent from '../../../../../../src/components/user/tabs/results/map/MapToolsComponent'
import styles from '../../../../../../src/styles'
import MapSelectionModeOption from '../../../../../../src/components/user/tabs/results/map/options/MapSelectionModeOption'
import MapViewModeOption from '../../../../../../src/components/user/tabs/results/map/options/MapViewModeOption'
import MapOpacityOption from '../../../../../../src/components/user/tabs/results/map/options/MapOpacityOption'

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

  UIDomain.MAP_SELECTION_MODES.forEach((mapSelectionMode) => it(`should render correctly when selected mode is ${mapSelectionMode}`, () => {
    const props = {
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: true,
        enabled: true,
        layerName: 'Hello',
      }],
      mapSelectionMode,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleSelectionMode: () => { },
      onToggleViewMode: () => { },
      opacity: 1,
      handleChangeOpacity: () => { },
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapSelectionModeOption)
    assert.lengthOf(selectors, UIDomain.MAP_SELECTION_MODES.length, 'There should be an option selector for each selection mode')

    UIDomain.MAP_SELECTION_MODES.forEach((localSelectionMode) => {
      const modeSelector = selectors.findWhere((n) => n.props().mapSelectionMode === localSelectionMode)
      assert.lengthOf(modeSelector, 1, `There should be a selector for mode ${localSelectionMode}`)
      assert.equal(modeSelector.props().onToggleSelectionMode, props.onToggleSelectionMode, 'Selector callback should be correctly set')
      if (localSelectionMode === mapSelectionMode) {
        assert.isTrue(modeSelector.props().selected, `${localSelectionMode} selector should be selected`)
      } else {
        assert.isFalse(modeSelector.props().selected, `${localSelectionMode} selector should not be selected`)
      }
    })
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
      mapSelectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode,
      onToggleViewMode: () => { },
      onToggleSelectionMode: () => { },
      opacity: 1,
      handleChangeOpacity: () => { },
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapViewModeOption)
    assert.lengthOf(selectors, UIDomain.MAP_VIEW_MODES.length, 'There should be an option selector for each view mode')

    UIDomain.MAP_VIEW_MODES.forEach((localViewMode) => {
      const modeSelector = selectors.findWhere((n) => n.props().viewMode === localViewMode)
      assert.lengthOf(modeSelector, 1, `There should be a selector for mode ${localViewMode}`)
      assert.equal(modeSelector.props().onToggleViewMode, props.onToggleViewMode, 'Selector callback should be correctly set')
      if (localViewMode === viewMode) {
        assert.isTrue(modeSelector.props().selected, `${localViewMode} selector should be selected`)
      } else {
        assert.isFalse(modeSelector.props().selected, `${localViewMode} selector should not be selected`)
      }
    })
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
      mapSelectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleViewMode: () => { },
      onToggleSelectionMode: () => { },
      opacity: 1,
      handleChangeOpacity: () => { },
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const selectors = enzymeWrapper.find(MapViewModeOption)
    assert.lengthOf(selectors, 1, 'There should be only one option')
  })
  it('should render correctly with CUSTOM Layer', () => {
    const props = {
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.WMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: false,
        enabled: true,
        layerName: 'Hello',
      }],
      mapSelectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleSelectionMode: () => { },
      onToggleViewMode: () => { },
      opacity: 1,
      handleChangeOpacity: () => { },
    }
    const enzymeWrapper = shallow(<MapToolsComponent {...props} />, { context })
    const opacityOption = enzymeWrapper.find(MapOpacityOption)
    assert.equal(opacityOption.length, 1, 'There should be an opacity option button')
  })
})
