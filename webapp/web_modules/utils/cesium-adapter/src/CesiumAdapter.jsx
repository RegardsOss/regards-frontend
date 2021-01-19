/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { Measure } from '@regardsoss/adapters'
import { console } from 'window-or-global'
import { createRef } from 'react'
import isEqual from 'lodash/isEqual'
import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'
import has from 'lodash/has'
import last from 'lodash/last'
import isEmpty from 'lodash/isEmpty'
import {
  Viewer, GeoJsonDataSource, SkyBox, SkyAtmosphere, Sun, Moon, ImageryLayer, CameraFlyTo, Scene,
} from 'resium'
import {
  ScreenSpaceEventType, Color, OpenStreetMapImageryProvider, WebMapServiceImageryProvider, WebMapTileServiceImageryProvider, BingMapsImageryProvider,
  SceneMode, Rectangle,
} from 'cesium'
import toBBox from 'geojson-bounding-box'
import CesiumEventAndPolygonDrawerComponent from './CesiumEventAndPolygonDrawerComponent'

/**
 * Cesium Adapter
 * Nota: it provides pick selection and draw selection gestures but caller should handle related updates and feedback
 */
export default class CesiumAdapter extends React.Component {
  static propTypes = {
    layers: PropTypes.arrayOf(UIShapes.LayerDefinition).isRequired,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    featuresColor: PropTypes.string,
    customLayersOpacity: PropTypes.number,
    // selection management: when drawing selection is true, user draws a rectangle
    drawingSelection: PropTypes.bool.isRequired,
    onDrawingSelectionDone: PropTypes.func, // (initPoint, finalPoint) => ()
    drawColor: PropTypes.string,
    // Currently shownig areas (may be used for selection feedback, currently applying areas, ...)
    drawnAreas: PropTypes.arrayOf(GeoJsonFeature),
    // should notify parent on pick selection
    onFeaturesSelected: PropTypes.func,
    // view management
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired,
    // product selection management
    // eslint-disable-next-line react/no-unused-prop-types
    selectedProducts: PropTypes.arrayOf(PropTypes.object),
    onProductSelected: PropTypes.func.isRequired,
    selectedFeatureColor: PropTypes.string.isRequired,
    selectedColorOutlineWidth: PropTypes.number,
  }

  state = {
    greyBackgroundProvider: null, // background layer
    customLayerProviders: null, // custom layers
    backgroundVisibleProvider: null,
    selectedProducts: null,
    cameraDestinationTime: null,
    cameraDestination: null,
    cesiumDrawColor: null, // Cesium.Color objet for draw zone
    cesiumFeaturesColor: null, // Cesium.Color objet for features
    selectedFeatureColor: null,
    selectedColorOutlineWidth: null,
    nearlyTransparentColor: null, // Transparent is unclickable, so we use our version of a transparent color
    height: undefined, // leave undefined to use a default value
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

  backgroundVisibleImageryRef = createRef()

  UNSAFE_componentWillMount() {
    // Get the background layer
    const {
      selectedColorOutlineWidth, viewMode, layers,
    } = this.props

    // Background layer with constrast
    const greyBackgroundProvider = this.getGreyBackgroundProvider(layers, viewMode)

    // We add another background layer which take all the globe surface. It will be resized when user draw an area.
    const backgroundVisibleProvider = this.getBackgroundVisibleProvider(layers, viewMode)

    // Load data layers if any exist
    const customLayerProviders = this.getCustomLayerProviders(layers, viewMode)

    const cesiumFeaturesColor = Color.fromCssColorString(this.props.featuresColor)
    const cesiumDrawColor = Color.fromCssColorString(this.props.drawColor)
    const nearlyTransparentColor = new Color(0, 0, 0, 0.01)

    const selectedFeatureColor = Color.fromCssColorString(this.props.selectedFeatureColor)

    // store libs in state
    this.setState({
      greyBackgroundProvider,
      customLayerProviders,
      cesiumFeaturesColor,
      cesiumDrawColor,
      nearlyTransparentColor,
      selectedFeatureColor,
      selectedColorOutlineWidth,
      backgroundVisibleProvider,
    })
  }

  componentDidMount() {
    if (has(this.ref, 'current.cesiumElement')) {
      // Remove the default event handler that zoom and track feature on double click
      this.ref.current.cesiumElement.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
  }

  componentDidUpdate() {
    // Manage to set correct position in layer collection for visibleBackgroungLayer since he moves to the end of the collection after a drawn area update
    if (has(this.ref, 'current.cesiumElement') && has(this.backgroundVisibleImageryRef, 'current.cesiumElement')) {
      this.ref.current.cesiumElement.imageryLayers.lowerToBottom(this.backgroundVisibleImageryRef.current.cesiumElement)
      this.ref.current.cesiumElement.imageryLayers.raise(this.backgroundVisibleImageryRef.current.cesiumElement)
    }
  }

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      featuresCollection, selectedProducts, drawnAreas, drawingSelection, viewMode, layers,
    } = newProps
    const oldState = this.state || {}
    const newState = { ...oldState }

    // Manage selected features
    if (!isEqual(oldProps.featuresCollection, featuresCollection) || !isEqual(oldProps.selectedProducts, selectedProducts)) {
      const selectedFeatures = this.getSelectedFeatures(featuresCollection, selectedProducts)
      newState.selectedProducts = {
        ...featuresCollection,
        features: !isEmpty(selectedFeatures) ? selectedFeatures : [],
      }
    }
    if (!isEqual(oldProps.drawnAreas, drawnAreas)) {
      const rectangle = !isEmpty(drawnAreas) ? CesiumEventAndPolygonDrawerComponent.buildRectangleFromGeometry(drawnAreas[0].geometry) : null
      newState.backgroundVisibleProvider = this.getBackgroundVisibleProvider(layers, viewMode, rectangle)
    }
    // Manage camera destination
    if (!isEqual(oldProps.selectedProducts, selectedProducts) || !isEqual(oldProps.drawnAreas, drawnAreas)) {
      if (!isEqual(oldProps.selectedProducts, selectedProducts)) {
        const selectedFeatures = this.getSelectedFeatures(featuresCollection, selectedProducts)
        if (!isEmpty(selectedFeatures)) {
          const lastFeatureSelected = last(selectedFeatures)
          const { time, destination } = this.getNewCameraDestination(lastFeatureSelected.geometry)
          newState.cameraDestination = destination
          newState.cameraDestinationTime = time
        }
      } else if (!isEmpty(drawnAreas) && oldProps.drawingSelection !== drawingSelection && drawingSelection === false) {
        const { time, destination } = this.getNewCameraDestination(drawnAreas[0].geometry)
        newState.cameraDestination = destination
        newState.cameraDestinationTime = time
      }
    }
    // Manage to load correct background layer when switch mode
    if (!isEqual(oldProps.viewMode, viewMode)) {
      newState.greyBackgroundProvider = this.getGreyBackgroundProvider(layers, viewMode)
      newState.customLayerProviders = this.getCustomLayerProviders(layers, viewMode)
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  getSelectedFeatures = (featuresCollection, selectedProducts) => filter(featuresCollection.features, (feature) => find(selectedProducts, (selectedProduct) => feature.id === selectedProduct.id))

  getGreyBackgroundProvider = (layers, viewMode) => {
    const backgroundLayerInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    const greyBackgroundProvider = this.getImageryProvider(backgroundLayerInfo, null, 1)
    greyBackgroundProvider.defaultContrast = 0.2
    return greyBackgroundProvider
  }

  getBackgroundVisibleProvider = (layers, viewMode, rectangle) => {
    const backgroundLayerInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    return this.getImageryProvider(backgroundLayerInfo, rectangle)
  }

  getCustomLayerProviders = (layers, viewMode) => {
    const layersInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.CUSTOM, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    return map(layersInfo, (layerInfo) => this.getImageryProvider(layerInfo))
  }

  getNewCameraDestination = (geometry) => ({
    time: new Date().getTime(),
    destination: this.getCameraDestination(geometry),
  })

  /**
   * Compute center point for camera destination
   * @param {*} geometry
   */
  getCameraDestination = (geometry) => {
    const bBox = toBBox(geometry)
    return Rectangle.fromDegrees(bBox[0], bBox[1], bBox[2], bBox[3])
  }

  getImageryProvider = (layerInfo, rectangle = null, maximumLevel = 19) => {
    const imageryProviderParameters = {
      ...layerInfo,
      ...layerInfo.conf,
      maximumLevel,
      url: layerInfo.baseUrl,
      rectangle,
    }
    switch (layerInfo.type) {
      case UIDomain.CESIUM_LAYER_TYPES_ENUM.OSM:
        return new OpenStreetMapImageryProvider(imageryProviderParameters)
      case UIDomain.CESIUM_LAYER_TYPES_ENUM.WMS:
        return new WebMapServiceImageryProvider(imageryProviderParameters)
      case UIDomain.CESIUM_LAYER_TYPES_ENUM.WMTS:
        return new WebMapTileServiceImageryProvider(imageryProviderParameters)
      case UIDomain.CESIUM_LAYER_TYPES_ENUM.Bing:
        return new BingMapsImageryProvider(imageryProviderParameters)
      default:
        console.error('Unsupported background image, fallback to OSM')
    }
    return new OpenStreetMapImageryProvider()
  }

  onComponentResized = ({ measureDiv: { height } }) => {
    this.setState({
      height: Math.ceil(height),
    })
  }

  render() {
    const {
      featuresCollection, drawingSelection, drawnAreas, onDrawingSelectionDone, onFeaturesSelected, customLayersOpacity,
      viewMode, onProductSelected,
    } = this.props
    const {
      greyBackgroundProvider, customLayerProviders, cesiumFeaturesColor, cesiumDrawColor, nearlyTransparentColor,
      selectedProducts, selectedFeatureColor, selectedColorOutlineWidth, cameraDestination, cameraDestinationTime, backgroundVisibleProvider,
      height,
    } = this.state

    // Mandatory to resolve bug in 2D mode.
    const viewerRootStyle = {
      position: 'absolute',
      height: '100%',
      width: '100%',
    }

    return (
      <Measure bounds onMeasure={this.onComponentResized}>
        {/* Workaround to resolve bug in 2D mode. Force initial render to re-render */}
        {({ bind }) => (
          <div style={viewerRootStyle} {...bind('measureDiv')}>
            <Viewer
              style={{
                width: '100%',
                height,
              }}
              ref={this.ref}
              timeline={false}
              sceneModePicker={false} // allow user to switch between 2D and 3D
              homeButton={false}
              baseLayerPicker={false}// No background layer picker
              infoBox={false}// no feature info
              fullscreenButton={false}
              navigationHelpButton={false}// tuto for Cesium usage
              imageryProvider={greyBackgroundProvider}
              animation={false}// Hide Cesium clock
              geocoder={false}// Hide widget for finding addresses and landmarks
              selectionIndicator={false} // Hide green target when entity selected
              creditContainer={this.virtualCredit}
              automaticallyTrackDataSourceClocks={false}
            >
              {/* Configurate the initial Scene */}
              <Scene
                mode={viewMode === UIDomain.MAP_VIEW_MODES_ENUM.MODE_3D ? SceneMode.SCENE3D : SceneMode.SCENE2D}
              />
              {/* Show stars */}
              <SkyBox show />
              {/* Show atmosphere  */}
              <SkyAtmosphere show />
              {/* Hide sun */}
              <Sun show={false} />
              {/* Hide moon */}
              <Moon show={false} />
              {/* Display drawn area layer*/}
              <ImageryLayer
                ref={this.backgroundVisibleImageryRef}
                imageryProvider={backgroundVisibleProvider}
              />
              {/* Display additionnal layers */}
              {
                map(customLayerProviders, (layerProvider, key) => (
                  <ImageryLayer
                    key={`${key}${viewMode}`}
                    imageryProvider={layerProvider}
                    alpha={customLayersOpacity}
                  />
                ))
              }
              {/* Display props features */}
              <GeoJsonDataSource
                name="catalog-features"
                data={featuresCollection}
                fill={nearlyTransparentColor}
                stroke={cesiumFeaturesColor}
                strokeWidth={1}
              />
              <GeoJsonDataSource
                name="selected-features"
                data={selectedProducts}
                fill={nearlyTransparentColor}
                stroke={selectedFeatureColor}
                strokeWidth={selectedColorOutlineWidth}
              />
              <CesiumEventAndPolygonDrawerComponent
                cesiumContext={this.ref}
                cesiumDrawColor={cesiumDrawColor}
                drawingSelection={drawingSelection}
                drawnAreas={drawnAreas}
                onDrawingSelectionDone={onDrawingSelectionDone}
                onFeaturesSelected={onFeaturesSelected}
                onProductSelected={onProductSelected}
                featuresCollection={featuresCollection}
              />
              {
                cameraDestination && <CameraFlyTo
                  key={cameraDestinationTime}
                  destination={cameraDestination}
                  once
                />
              }
            </Viewer>
          </div>
        )}
      </Measure>
    )
  }
}
