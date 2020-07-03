/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of SCO - Space Climate Observatory.
 *
 * SCO is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SCO is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with SCO. If not, see <http://www.gnu.org/licenses/>.
 **/
import { GeoJsonFeaturesCollection, GeoJsonFeature } from '@regardsoss/mizar-adapter'
import { console } from 'window-or-global'
import { UIDomain, CatalogDomain } from '@regardsoss/domain'


export const HeadlessPlaceholder = props => (
  <div>
    <h1>Headless cesium placeholder</h1>
    <h2>Properties: </h2>
    <p>{JSON.stringify(props)}</p>
  </div>
)


/**
 * Mizar Adapter
 * Nota: it provides pick selection and draw selection gestures but caller should handle related updates and feedback
 */
export default class CesiumAdapter extends React.Component {
  static propTypes = {
    crsContext: PropTypes.string,
    backgroundLayerUrl: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    backgroundLayerConf: PropTypes.object,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    featuresColor: PropTypes.string,
    staticLayerOpacity: PropTypes.number,
    // selection management: when drawing selection is true, user draws a rectangle
    // during that gestion, onDrawingSelectionUpdated will be called for the component parent to update feedback through drawnAreas
    // at end, onDrawingSelectionDone will be called
    drawingSelection: PropTypes.bool.isRequired,
    onDrawingSelectionUpdated: PropTypes.func, // (initPoint, currentPoint) => ()
    onDrawingSelectionDone: PropTypes.func, // (initPoint, finalPoint) => ()
    drawColor: PropTypes.string,
    // Currently shownig areas (may be used for selection feedback, currently applying areas, ...)
    drawnAreas: PropTypes.arrayOf(GeoJsonFeature),
    // should notify parent on pick selection
    onFeaturesSelected: PropTypes.func,
  }


  state = {
    cesium: null,
    resium: null,
    Viewer: null,
    imageryProvider: null,// background layer
    cesiumFeaturesColor: null,// Cesium.Color objet for features
  }


  virtualCredit = document.createElement("div");


  componentWillMount() {

    if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'coverage') {
      // load required elements
      require.ensure([], (require) => {
        // On dev, we copy all cesium folder, in prod, Webpack detect what we requires and bundle only that in our chunk app
        if (process.env.NODE_ENV === 'production') {
          require("cesium/Widgets/widgets.css");
        }
        
        // load Cesium and React component
        const cesium = require('cesium')
        const resium = require('resium')
        const imageryProvider = this.getImageryProvider(cesium)
        const cesiumFeaturesColor = cesium.Color.fromCssColorString(this.props.featuresColor)

        // store libs in state
        this.setState({ cesium, resium, imageryProvider, cesiumFeaturesColor })
      })
    }
  }

  getImageryProvider = (cesium) => {
    const { backgroundLayerType, backgroundLayerUrl, backgroundLayerConf } = this.props
    console.error(this.props, cesium)
    switch (backgroundLayerType) {
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.OSM:
        return new cesium.OpenStreetMapImageryProvider({
          ...backgroundLayerConf,
          maximumLevel: 19,
          url: backgroundLayerUrl,
        })
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.WMS:
        return new cesium.WebMapServiceImageryProvider({
          ...backgroundLayerConf,
          url: backgroundLayerUrl,
        })
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.WMTS:
        return new cesium.WebMapTileServiceImageryProvider({
          ...backgroundLayerConf,
          url: backgroundLayerUrl,
        })
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.Bing:
        return new cesium.BingMapsImageryProvider({
          ...backgroundLayerConf,
          url: backgroundLayerUrl,
        })
      default:
        console.error("Unsupported background image, fallback to OSM")
    }
    return new cesium.OpenStreetMapImageryProvider()
  }

  handleSelectedEntity = (entity) => {
    console.error("selected", entity)
  }

  render() {
    const { featuresCollection } = this.props
    const { cesium, resium, imageryProvider, cesiumFeaturesColor } = this.state
    if (!cesium) {
      return null // loading
    }
    const { Viewer, GeoJsonDataSource, Scene, SkyBox, SkyAtmosphere, Sun } = resium
    const { Color, SceneMode } = cesium
    // TODO : add interaction polygon
    // https://github.com/leforthomas/cesium-drawhelper/blob/master/DrawHelper.js
    // https://github.com/darwin-education/resium/issues/88
    return (
      <Viewer
        timeline={false}
        onSelectedEntityChange={this.handleSelectedEntity}
        // sceneModePicker={false} allow user to switch between 2D and 3D
        homeButton={false}
        baseLayerPicker={false}// No background layer picker
        infoBox={false}// no feature info
        fullscreenButton={false}
        navigationHelpButton={false}// tuto for Cesium usage
        imageryProvider={imageryProvider}
        animation={false}// Hide Cesium clock
        geocoder={false}// Hide widget for finding addresses and landmarks
        creditContainer={this.virtualCredit}
      >
        {/* Configurate the initial Scene */}
        <Scene mode={SceneMode.SCENE3D} morphDuration={10} />
        {/* Hide stars */}
        <SkyBox show={false} />
        {/* Hide atmosphere  */}
        <SkyAtmosphere show={false} />
        {/* Hide sun */}
        <Sun show={false} />
        {/* Display props features */}
        <GeoJsonDataSource
          data={featuresCollection}
          fill={Color.TRANSPARENT}
          stroke={cesiumFeaturesColor}
          strokeWidth={1}
        />
      </Viewer>
    )
  }
}