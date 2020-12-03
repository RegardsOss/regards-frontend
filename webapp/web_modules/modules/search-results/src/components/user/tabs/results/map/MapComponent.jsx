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
import last from 'lodash/last'
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { MizarAdapter, GeoJsonFeaturesCollection, GeoJsonFeature } from '@regardsoss/mizar-adapter'
import { CesiumProvider } from '@regardsoss/cesium-adapter'
import MapToolsComponent from './MapToolsComponent'
import { LayerConfiguration } from '../../../../../shapes/ModuleConfiguration'

/**
 * Shows map in map view
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
class MapComponent extends React.Component {
  static propTypes = {
    // Current results and criteria visible on map
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    displayedAreas: PropTypes.arrayOf(GeoJsonFeature).isRequired, // holds currently drawing area or currently applying area

    // Selection mode  & view mode management
    selectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired,
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired,
    onToggleMode: PropTypes.func.isRequired, // (groupMode, mode) => ()

    // drawing selection management
    onDrawingSelectionUpdated: PropTypes.func.isRequired,
    onDrawingSelectionDone: PropTypes.func.isRequired,
    // Direct features selection management
    onFeaturesPicked: PropTypes.func.isRequired, // ([entities] => ())

    // Map layers
    layers: PropTypes.arrayOf(LayerConfiguration).isRequired,

    // Engine name
    mapEngine: PropTypes.oneOf(UIDomain.MAP_ENGINE).isRequired,

    // product selection management
    selectedProducts: PropTypes.arrayOf(PropTypes.object),
    onProductSelected: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  state = {
    staticLayerOpacity: 1,
  }

  handleChangeOpacity = (staticLayerOpacity) => {
    this.setState({
      staticLayerOpacity,
    })
  }

  render() {
    const {
      featuresCollection, displayedAreas, mapEngine,
      selectionMode, onDrawingSelectionUpdated, onDrawingSelectionDone,
      viewMode, onToggleMode,
      onFeaturesPicked, layers,
      selectedProducts, onProductSelected,
    } = this.props
    const { staticLayerOpacity } = this.state

    const {
      featureColor, drawColor, selectedFeatureColor, selectedColorOutlineWidth,
    } = this.context.muiTheme.module.searchResults.map.mizar
    const engineProps = {
      layers,
      featuresCollection,
      drawnAreas: displayedAreas,
      onDrawingSelectionUpdated,
      onDrawingSelectionDone,
      drawingSelection: selectionMode === UIDomain.MAP_SELECTION_MODES_ENUM.DRAW_RECTANGLE,
      onFeaturesSelected: onFeaturesPicked,
      featuresColor: featureColor,
      drawColor,
      staticLayerOpacity,
      selectedColorOutlineWidth,
      selectedFeatureColor,
      onProductSelected,
      selectedProducts,
      viewMode,
    }
    return (
      <>
        <MapToolsComponent
          layers={layers}
          selectionMode={selectionMode}
          viewMode={viewMode}
          onToggleMode={onToggleMode}
          handleChangeOpacity={this.handleChangeOpacity}
          opacity={staticLayerOpacity}
          selectedProducts={selectedProducts}
          onProductSelected={onProductSelected}
        />
        {mapEngine === UIDomain.MAP_ENGINE_ENUM.CESIUM && <CesiumProvider {...engineProps} />}
        {mapEngine === UIDomain.MAP_ENGINE_ENUM.MIZAR && <MizarAdapter {...engineProps} />}
      </>
    )
  }
}
export default MapComponent
