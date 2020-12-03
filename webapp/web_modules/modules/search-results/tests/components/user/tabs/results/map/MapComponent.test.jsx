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
import last from 'lodash/last'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { CesiumProvider } from '@regardsoss/cesium-adapter'
import { MizarAdapter } from '@regardsoss/mizar-adapter'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapComponent from '../../../../../../src/components/user/tabs/results/map/MapComponent'
import MapToolsComponent from '../../../../../../src/components/user/tabs/results/map/MapToolsComponent'
import styles from '../../../../../../src/styles'
import { dataEntity } from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test MapComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[SEARCH RESULTS] Testing MapComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MapComponent)
  })

  it('should render correctly empty', () => {
    const props = {
      featuresCollection: {
        features: [],
        type: 'FeatureCollection',
      },
      mapEngine: UIDomain.MAP_ENGINE_ENUM.CESIUM,
      displayedAreas: [],
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.DRAW_RECTANGLE,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleMode: () => {},
      onDrawingSelectionUpdated: () => {},
      onDrawingSelectionDone: () => {},
      onFeaturesPicked: () => {},
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: true,
        enabled: true,
        visible: true,
        layerName: 'Hello',
      }],
      selectedProducts: [],
      onProductSelected: () => {},
    }
    const enzymeWrapper = shallow(<MapComponent {...props} />, { context })
    const mapTools = enzymeWrapper.find(MapToolsComponent)
    assert.lengthOf(mapTools, 1, 'Map tools should be rendered')
    testSuiteHelpers.assertWrapperProperties(mapTools, {
      selectionMode: props.selectionMode,
      onToggleMode: props.onToggleMode,
      viewMode: props.viewMode,
      selectedProducts: props.selectedProducts,
      onProductSelected: props.onProductSelected,
    }, 'Map tools component properties should be correctly set')
    const map = enzymeWrapper.find(CesiumProvider)
    assert.lengthOf(map, 1, 'There should be the map')
    testSuiteHelpers.assertWrapperProperties(map, {
      layers: props.layers,
      featuresCollection: props.featuresCollection,
      drawnAreas: props.displayedAreas,
      onDrawingSelectionUpdated: props.onDrawingSelectionUpdated,
      onDrawingSelectionDone: props.onDrawingSelectionDone,
      drawingSelection: true,
      onFeaturesSelected: props.onFeaturesPicked,
      viewMode: props.viewMode,
      selectedProducts: props.selectedProducts,
      onProductSelected: props.onProductSelected,
    }, 'Map properties should be correctly set')
  })

  it('should render correctly with features', () => {
    const props = {
      featuresCollection: {
        features: [{
          ...dataEntity.content,
          geometry: {
            type: CatalogDomain.GEOMETRY_TYPES.Point,
            coordinates: [1, 2],
          },
        }],
        type: 'FeatureCollection',
      },
      displayedAreas: [{
        id: '1',
        type: PropTypes.string.isRequired,
        geometry: {
          type: CatalogDomain.GEOMETRY_TYPES.Point,
          coordinates: [3, 4],
        },
      }],
      mapEngine: UIDomain.MAP_ENGINE_ENUM.MIZAR,
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      viewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
      onToggleMode: () => {},
      onDrawingSelectionUpdated: () => {},
      onDrawingSelectionDone: () => {},
      onFeaturesPicked: () => {},
      layers: [{
        url: 'HELLO.touff',
        type: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
        layerViewMode: UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D,
        background: true,
        enabled: true,
        visible: true,
        layerName: 'Hello',
      }],
      selectedProducts: [],
      onProductSelected: () => {},
    }
    const enzymeWrapper = shallow(<MapComponent {...props} />, { context })
    const mapTools = enzymeWrapper.find(MapToolsComponent)
    assert.lengthOf(mapTools, 1, 'Map tools should be rendered')
    testSuiteHelpers.assertWrapperProperties(mapTools, {
      layers: props.layers,
      selectionMode: props.selectionMode,
      onToggleMode: props.onToggleMode,
      viewMode: props.viewMode,
      selectedProducts: props.selectedProducts,
      onProductSelected: props.onProductSelected,
    }, 'Map tools component properties should be correctly set')
    const map = enzymeWrapper.find(MizarAdapter)
    assert.lengthOf(map, 1, 'There should be the map')
    testSuiteHelpers.assertWrapperProperties(map, {
      layers: props.layers,
      featuresCollection: props.featuresCollection,
      drawnAreas: props.displayedAreas,
      onDrawingSelectionUpdated: props.onDrawingSelectionUpdated,
      onDrawingSelectionDone: props.onDrawingSelectionDone,
      drawingSelection: false,
      onFeaturesSelected: props.onFeaturesPicked,
      viewMode: props.viewMode,
      selectedProducts: props.selectedProducts,
      onProductSelected: props.onProductSelected,
    }, 'Map properties should be correctly set')
  })
})
