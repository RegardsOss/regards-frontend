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
import { UIDomain } from '@regardsoss/domain'
import { createRef } from 'react'
import has from 'lodash/has'
import get from 'lodash/get'
import {
  Viewer, GeoJsonDataSource, SkyBox, SkyAtmosphere, Sun, Moon, ImageryLayer,
} from 'resium'
import {
  ScreenSpaceEventType, Color, OpenStreetMapImageryProvider, WebMapServiceImageryProvider, WebMapTileServiceImageryProvider, BingMapsImageryProvider,
} from 'cesium'
import CesiumEventAndPolygonDrawerComponent from './CesiumEventAndPolygonDrawerComponent'

/**
 * Cesium Adapter
 * Nota: it provides pick selection and draw selection gestures but caller should handle related updates and feedback
 */
export default class CesiumAdapter extends React.Component {
  static propTypes = {
    backgroundLayerUrl: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    backgroundLayerConf: PropTypes.object,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    featuresColor: PropTypes.string,
    staticLayerOpacity: PropTypes.number,
    // selection management: when drawing selection is true, user draws a rectangle
    drawingSelection: PropTypes.bool.isRequired,
    onDrawingSelectionDone: PropTypes.func, // (initPoint, finalPoint) => ()
    drawColor: PropTypes.string,
    // Currently shownig areas (may be used for selection feedback, currently applying areas, ...)
    drawnAreas: PropTypes.arrayOf(GeoJsonFeature),
    // should notify parent on pick selection
    onFeaturesSelected: PropTypes.func,
  }


  state = {
    imageryProvider: null, // background layer
    additionnalLayerProvider: null, // additionnal background layer
    cesiumFeaturesColor: null, // Cesium.Color objet for features
    cesiumDrawColor: null, // Cesium.Color objet for draw zone
    nearlyTransparentColor: null, // Transparent is unclickable, so we use our version of a transparent color
  }

  /**
   * Allows us to hide the Cesium logo
   * but also hide credits from Map providers
   */
  virtualCredit = document.createElement('div');

  /**
   * Ref to the Cesium instance
   */
  ref = createRef()

  componentWillMount() {
    // Get the background layer
    const { backgroundLayerType, backgroundLayerUrl, backgroundLayerConf } = this.props
    const backgroundLayerInfo = {
      type: backgroundLayerType,
      baseUrl: backgroundLayerUrl,
      conf: backgroundLayerConf,
    }
    const imageryProvider = this.getImageryProvider(backgroundLayerInfo)
    const staticLayer = get(STATIC_CONF, 'MAP.STATIC_LAYER', null)
    let additionnalLayerProvider
    if (staticLayer) {
      additionnalLayerProvider = this.getImageryProvider(staticLayer)
    }
    const cesiumFeaturesColor = Color.fromCssColorString(this.props.featuresColor)
    const cesiumDrawColor = Color.fromCssColorString(this.props.drawColor)
    const nearlyTransparentColor = new Color(0, 0, 0, 0.01)

    // store libs in state
    this.setState({
      imageryProvider, additionnalLayerProvider, cesiumFeaturesColor, cesiumDrawColor, nearlyTransparentColor,
    })
  }

  componentDidMount() {
    if (has(this.ref, 'current.cesiumElement')) {
      // Remove the default event handler that zoom and track feature on double click
      this.ref.current.cesiumElement.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
  }

  getImageryProvider = ({ type, baseUrl, conf }) => {
    switch (type) {
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.OSM:
        return new OpenStreetMapImageryProvider({
          ...conf,
          maximumLevel: 19,
          url: baseUrl,
        })
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.WMS:
        return new WebMapServiceImageryProvider({
          ...conf,
          url: baseUrl,
        })
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.WMTS:
        return new WebMapTileServiceImageryProvider({
          ...conf,
          url: baseUrl,
        })
      case UIDomain.MIZAR_LAYER_TYPES_ENUM.Bing:
        return new BingMapsImageryProvider({
          ...conf,
          url: baseUrl,
        })
      default:
        console.error('Unsupported background image, fallback to OSM')
    }
    return new OpenStreetMapImageryProvider()
  }

  render() {
    const {
      featuresCollection, drawingSelection, drawnAreas, onDrawingSelectionDone, onFeaturesSelected, staticLayerOpacity,
    } = this.props
    const {
      imageryProvider, additionnalLayerProvider, cesiumFeaturesColor, cesiumDrawColor, nearlyTransparentColor,
    } = this.state
    return (
      <Viewer
        full
        ref={this.ref}
        timeline={false}
        sceneModePicker={false} // allow user to switch between 2D and 3D
        homeButton={false}
        baseLayerPicker={false}// No background layer picker
        infoBox={false}// no feature info
        fullscreenButton={false}
        navigationHelpButton={false}// tuto for Cesium usage
        imageryProvider={imageryProvider}
        animation={false}// Hide Cesium clock
        geocoder={false}// Hide widget for finding addresses and landmarks
        selectionIndicator={false} // Hide green target when entity selected
        creditContainer={this.virtualCredit}
        automaticallyTrackDataSourceClocks={false}
      >
        {/* Configurate the initial Scene */}
        {/* <Scene mode={SceneMode.SCENE3D} morphDuration={10} /> */}
        {/* Show stars */}
        <SkyBox show />
        {/* Show atmosphere  */}
        <SkyAtmosphere show />
        {/* Hide sun */}
        <Sun show={false} />
        {/* Hide moon */}
        <Moon show={false} />
        {/* Display additionnal layer */}
        {additionnalLayerProvider && <ImageryLayer
          imageryProvider={additionnalLayerProvider}
          alpha={staticLayerOpacity}
        />}
        {/* Display props features */}
        <GeoJsonDataSource
          name="catalog-features"
          data={featuresCollection}
          fill={nearlyTransparentColor}
          stroke={cesiumFeaturesColor}
          strokeWidth={1}
        />
        <CesiumEventAndPolygonDrawerComponent
          cesiumContext={this.ref}
          cesiumDrawColor={cesiumDrawColor}
          drawingSelection={drawingSelection}
          drawnAreas={drawnAreas}
          onDrawingSelectionDone={onDrawingSelectionDone}
          onFeaturesSelected={onFeaturesSelected}
        />
      </Viewer>
    )
  }
}
