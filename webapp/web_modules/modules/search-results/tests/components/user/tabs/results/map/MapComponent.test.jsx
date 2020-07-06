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
import { UIDomain, CatalogDomain } from '@regardsoss/domain'
import { CesiumAdapter } from '@regardsoss/cesium-adapter'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MapComponent from '../../../../../../src/components/user/tabs/results/map/MapComponent'
import MapToolsComponent from '../../../../../../src/components/user/tabs/results/map/MapToolsComponent'
import styles from '../../../../../../src/styles'
import { dataEntity } from '../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
 * Test MapComponent
 * @author Raphaël Mechali
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
      displayedAreas: [],
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.DRAW_RECTANGLE,
      onSetSelectionMode: () => {},
      onDrawingSelectionUpdated: () => {},
      onDrawingSelectionDone: () => {},
      onFeaturesPicked: () => {},
      backgroundLayerURL: 'HELLO.touff',
      backgroundLayerType: UIDomain.MIZAR_LAYER_TYPES_ENUM.AsynchroneWMS,
    }
    const enzymeWrapper = shallow(<MapComponent {...props} />, { context })
    const mapTools = enzymeWrapper.find(MapToolsComponent)
    assert.lengthOf(mapTools, 1, 'Map tools should be rendered')
    testSuiteHelpers.assertWrapperProperties(mapTools, {
      selectionMode: props.selectionMode,
      onSetSelectionMode: props.onSetSelectionMode,
    }, 'Map tools component properties should be correctly set')
    const map = enzymeWrapper.find(CesiumAdapter)
    assert.lengthOf(map, 1, 'There should be the map')
    testSuiteHelpers.assertWrapperProperties(map, {
      backgroundLayerUrl: props.backgroundLayerURL,
      backgroundLayerType: props.backgroundLayerType,
      featuresCollection: props.featuresCollection,
      drawnAreas: props.displayedAreas,
      onDrawingSelectionUpdated: props.onDrawingSelectionUpdated,
      onDrawingSelectionDone: props.onDrawingSelectionDone,
      drawingSelection: true,
      onFeaturesSelected: props.onFeaturesPicked,
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
        type: PropTypes.string.isRequired,
        geometry: {
          type: CatalogDomain.GEOMETRY_TYPES.Point,
          coordinates: [3, 4],
        },
      }],
      selectionMode: UIDomain.MAP_SELECTION_MODES_ENUM.PICK_ON_CLICK,
      onSetSelectionMode: () => {},
      onDrawingSelectionUpdated: () => {},
      onDrawingSelectionDone: () => {},
      onFeaturesPicked: () => {},
      backgroundLayerURL: 'HELLO.touff',
      backgroundLayerType: UIDomain.MIZAR_LAYER_TYPES_ENUM.Bing,
    }
    const enzymeWrapper = shallow(<MapComponent {...props} />, { context })
    const mapTools = enzymeWrapper.find(MapToolsComponent)
    assert.lengthOf(mapTools, 1, 'Map tools should be rendered')
    testSuiteHelpers.assertWrapperProperties(mapTools, {
      selectionMode: props.selectionMode,
      onSetSelectionMode: props.onSetSelectionMode,
    }, 'Map tools component properties should be correctly set')
    const map = enzymeWrapper.find(CesiumAdapter)
    assert.lengthOf(map, 1, 'There should be the map')
    testSuiteHelpers.assertWrapperProperties(map, {
      backgroundLayerUrl: props.backgroundLayerURL,
      backgroundLayerType: props.backgroundLayerType,
      featuresCollection: props.featuresCollection,
      drawnAreas: props.displayedAreas,
      onDrawingSelectionUpdated: props.onDrawingSelectionUpdated,
      onDrawingSelectionDone: props.onDrawingSelectionDone,
      drawingSelection: false,
      onFeaturesSelected: props.onFeaturesPicked,
    }, 'Map properties should be correctly set')
  })
})
