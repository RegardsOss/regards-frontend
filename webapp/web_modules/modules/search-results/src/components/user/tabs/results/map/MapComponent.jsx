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
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { MizarAdapter, GeoJsonFeaturesCollection, GeoJsonFeature } from '@regardsoss/mizar-adapter'
import MapToolsComponent from './MapToolsComponent'

/**
 * Shows map in map view
 * @author Raphaël Mechali
 */
class MapComponent extends React.Component {
  static propTypes = {
    // Current results and criteria visible on map
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    displayedAreas: PropTypes.arrayOf(GeoJsonFeature).isRequired, // holds currently drawing area or currently applying area
    // Selection mode management
    selectionMode: PropTypes.oneOf(UIDomain.MAP_SELECTION_MODES).isRequired,
    onSetSelectionMode: PropTypes.func.isRequired, // (mode) => ()
    // drawing selection management
    onDrawingSelectionUpdated: PropTypes.func.isRequired,
    onDrawingSelectionDone: PropTypes.func.isRequired,
    // Direct features selection management
    onFeaturesPicked: PropTypes.func.isRequired, // ([entities] => ())
    // Map background
    backgroundLayerURL: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.oneOf(UIDomain.MIZAR_LAYER_TYPES).isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    backgroundLayerConf: PropTypes.object,
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
      featuresCollection, displayedAreas,
      selectionMode, onSetSelectionMode, onDrawingSelectionUpdated, onDrawingSelectionDone,
      onFeaturesPicked, backgroundLayerURL, backgroundLayerType, backgroundLayerConf,
    } = this.props
    const { staticLayerOpacity } = this.state

    const { featureColor, drawColor } = this.context.muiTheme.module.searchResults.map.mizar
    return (
      <React.Fragment>
        <MapToolsComponent
          selectionMode={selectionMode}
          onSetSelectionMode={onSetSelectionMode}
          handleChangeOpacity={this.handleChangeOpacity}
          opacity={staticLayerOpacity}
        />
        <MizarAdapter
          key="mizarAdapter"
          backgroundLayerUrl={backgroundLayerURL}
          backgroundLayerType={backgroundLayerType}
          backgroundLayerConf={backgroundLayerConf}
          featuresCollection={featuresCollection}
          drawnAreas={displayedAreas}
          onDrawingSelectionUpdated={onDrawingSelectionUpdated}
          onDrawingSelectionDone={onDrawingSelectionDone}
          drawingSelection={selectionMode === UIDomain.MAP_SELECTION_MODES_ENUM.DRAW_RECTANGLE}
          onFeaturesSelected={onFeaturesPicked}
          featuresColor={featureColor}
          drawColor={drawColor}
          staticLayerOpacity={staticLayerOpacity}
        />
      </React.Fragment>
    )
  }
}
export default MapComponent
