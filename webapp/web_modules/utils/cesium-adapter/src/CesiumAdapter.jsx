/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { UIShapes, CatalogShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { Measure } from '@regardsoss/adapters'
import { createRef } from 'react'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import get from 'lodash/get'
import filter from 'lodash/filter'
import map from 'lodash/map'
import includes from 'lodash/includes'
import size from 'lodash/size'
import has from 'lodash/has'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import {
  Viewer, SkyBox, SkyAtmosphere, Sun, Moon, ImageryLayer, CameraFlyTo, Scene,
} from 'resium'
import {
  ScreenSpaceEventType, Color, SceneMode, Rectangle, Cartesian3,
} from 'cesium'
import toBBox from 'geojson-bounding-box'
import CesiumEventAndPolygonDrawerComponent from './CesiumEventAndPolygonDrawerComponent'
import CesiumCursorPosition from './CesiumCursorPosition'
import { getImageryProvider } from './CesiumHelper'
import BackgroundLayerComponent from './BackgroundLayerComponent'
import PrimitiveDataSource from './PrimitiveDataSource'
import { withPagedFeaturesHOC } from './withPagedFeaturesHOC'

export const PagedPrimitiveDataSource = withPagedFeaturesHOC(PrimitiveDataSource)

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
    // Currently shownig areas (may be used for user drawn area feedback or currently applyed toponym)
    drawnAreas: PropTypes.arrayOf(GeoJsonFeature),
    // view management
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired,
    // product selection management
    // eslint-disable-next-line react/no-unused-prop-types
    selectedProducts: PropTypes.objectOf(CatalogShapes.Entity).isRequired, // inner object is entity type
    onProductSelected: PropTypes.func.isRequired,
    selectedFeatureColor: PropTypes.string.isRequired,
    selectedColorOutlineWidth: PropTypes.number,
    // eslint-disable-next-line react/no-unused-prop-types
    zoomToFeature: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    // should notify parent on pick selection
    // toponym selection management
    onProductsZoomTo: PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    selectedToponyms: PropTypes.object,

    featureShapefile: GeoJsonFeaturesCollection,
  }

  // Mandatory to resolve bug in 2D mode.
  static VIEWER_ROOT_STYLE = {
    position: 'absolute',
    height: '100%',
    width: '100%',
  }

  static DEFAULT_POINT_ZOOM_LEVEL = 100000

  static getSelectedFeature(featuresCollection, selectedProductId) {
    return find(featuresCollection.features, (feature) => feature.id === selectedProductId)
  }

  static getZoomToFeature(featuresCollection, zoomToFeature) {
    return find(featuresCollection.features, (feature) => feature.id === zoomToFeature.id)
  }

  static getGreyBackgroundProvider(layers, viewMode) {
    const backgroundLayerInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    const greyBackgroundProvider = getImageryProvider(backgroundLayerInfo, null, 1)
    greyBackgroundProvider.defaultContrast = 0.2
    return greyBackgroundProvider
  }

  static getCustomLayerProviders(layers, viewMode) {
    const layersInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.CUSTOM, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    return map(layersInfo, (layerInfo) => getImageryProvider(layerInfo))
  }

  /**
   * Compute center point for camera destination
   * @param {*} geometry
   */
  static getCameraDestination(geometry) {
    switch (geometry.type) {
      case 'Point': {
        const zoom = STATIC_CONF.MAP.POINT_ZOOM_LEVEL || CesiumAdapter.DEFAULT_POINT_ZOOM_LEVEL
        return Cartesian3.fromDegrees(geometry.coordinates[0], geometry.coordinates[1], zoom)
      }
      default: {
        const bBox = toBBox(geometry)
        return Rectangle.fromDegrees(bBox[0], bBox[1], bBox[2], bBox[3])
      }
    }
  }

  static getNewCameraDestination(geometry) {
    return {
      time: new Date().getTime(),
      destination: CesiumAdapter.getCameraDestination(geometry),
    }
  }

  state = {
    greyBackgroundProvider: null, // background layer
    customLayerProviders: null, // custom layers
    selectedProductsCollection: {
      type: 'FeatureCollection',
      features: [],
    },
    cameraDestinationTime: null,
    cameraDestination: null,
    cesiumDrawColor: null, // Cesium.Color objet for draw zone
    cesiumFeaturesColor: null, // Cesium.Color objet for features
    selectedFeatureColor: null,
    selectedColorOutlineWidth: null,
    height: undefined, // leave undefined to use a default value
  }

  /**
   * Allows us to hide the Cesium logo
   * but also hide credits from Map providers
   */
  virtualCredit = document.createElement('div')

  /**
   * Ref to the Cesium instance
   */
  ref = createRef()

  UNSAFE_componentWillMount() {
    // Get the background layer
    const {
      selectedColorOutlineWidth, viewMode, layers, drawnAreas,
    } = this.props

    // Background layer with constrast
    const greyBackgroundProvider = CesiumAdapter.getGreyBackgroundProvider(layers, viewMode)

    // We add another background layer which take all the globe surface. It is resized when a drawn an area exist.
    let cameraDestination = null
    let cameraDestinationTime = null
    if (!isEmpty(drawnAreas)) {
      const { time, destination } = CesiumAdapter.getNewCameraDestination(drawnAreas[0].geometry)
      cameraDestination = destination
      cameraDestinationTime = time
    }

    // Load data layers if any exist
    const customLayerProviders = CesiumAdapter.getCustomLayerProviders(layers, viewMode)

    const cesiumFeaturesColor = Color.fromCssColorString(this.props.featuresColor)
    const cesiumDrawColor = Color.fromCssColorString(this.props.drawColor)

    const selectedFeatureColor = Color.fromCssColorString(this.props.selectedFeatureColor)

    // store libs in state
    this.setState({
      greyBackgroundProvider,
      customLayerProviders,
      cesiumFeaturesColor,
      cesiumDrawColor,
      selectedFeatureColor,
      selectedColorOutlineWidth,
      cameraDestination,
      cameraDestinationTime,
    })
  }

  componentDidMount() {
    if (has(this.ref, 'current.cesiumElement.screenSpaceEventHandler')) {
      // Remove the default event handler that zoom and track feature on double click
      this.ref.current.cesiumElement.screenSpaceEventHandler.removeInputAction(ScreenSpaceEventType.LEFT_DOUBLE_CLICK)
    }
  }

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      featuresCollection, selectedProducts, drawnAreas, drawingSelection, zoomToFeature,
    } = newProps
    const oldState = this.state || {}
    const newState = { ...oldState }

    // Manage selected features
    if (!isEqual(oldProps.featuresCollection, featuresCollection) || !isEqual(oldProps.selectedProducts, selectedProducts)) {
      let storedSelectedProducts = get(oldState, 'selectedProductsCollection.features', [])
      const storedSelectedProductsIds = !isEmpty(storedSelectedProducts) ? map(storedSelectedProducts, (currentSelectedFeature) => currentSelectedFeature.id) : []
      // add new selected features
      if (size(selectedProducts) > storedSelectedProducts.length) {
        // force new selected products to be added in feature collection one at a time (needed by withPagedFeaturesHOC)
        forEach(selectedProducts, (selectedProduct) => {
          const selectedProductId = get(selectedProduct, 'content.id')
          if (selectedProductId && !includes(storedSelectedProductsIds, selectedProductId)) {
            const selectedFeature = CesiumAdapter.getSelectedFeature(featuresCollection, selectedProductId)
            if (selectedFeature) {
              storedSelectedProducts.push(selectedFeature)
            }
          }
        })
      } else if (size(selectedProducts) < storedSelectedProducts.length) {
        // remove selected features
        const selectedProductsIds = map(selectedProducts, (selectedProduct) => selectedProduct.content.id)
        storedSelectedProducts = filter(storedSelectedProducts, (currentSelectedFeature) => includes(selectedProductsIds, currentSelectedFeature.id))
      }
      newState.selectedProductsCollection = {
        type: 'FeatureCollection',
        features: storedSelectedProducts,
      }
    }
    // Manage camera destination
    if (!isEqual(oldProps.zoomToFeature, zoomToFeature) || !isEqual(oldProps.drawnAreas, drawnAreas)) {
      if (!isEqual(oldProps.zoomToFeature, zoomToFeature)) {
        const zoomToFeatureFeature = CesiumAdapter.getZoomToFeature(featuresCollection, zoomToFeature)
        if (zoomToFeatureFeature) {
          const { time, destination } = CesiumAdapter.getNewCameraDestination(zoomToFeatureFeature.geometry)
          newState.cameraDestination = destination
          newState.cameraDestinationTime = time
        }
      } else if (!isEmpty(drawnAreas)) {
        // When user stop drawing area or toponym change
        if (drawingSelection === false) {
          const { time, destination } = CesiumAdapter.getNewCameraDestination(drawnAreas[0].geometry)
          newState.cameraDestination = destination
          newState.cameraDestinationTime = time
        }
      }
    }

    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  onComponentResized = ({ measureDiv: { height } }) => {
    this.setState({
      height: Math.ceil(height),
    })
  }

  render() {
    const {
      featuresCollection, drawingSelection, drawnAreas, onDrawingSelectionDone, onProductsZoomTo, customLayersOpacity,
      viewMode, onProductSelected, selectedToponyms, featureShapefile, layers,
    } = this.props
    const {
      greyBackgroundProvider, customLayerProviders, cesiumFeaturesColor, cesiumDrawColor,
      cameraDestination, cameraDestinationTime, height, selectedProductsCollection, selectedFeatureColor, selectedColorOutlineWidth,
    } = this.state
    return (
      <Measure bounds onMeasure={this.onComponentResized}>
        {/* Workaround to resolve bug in 2D mode. Force initial render to re-render */}
        {({ bind }) => (
          <div style={CesiumAdapter.VIEWER_ROOT_STYLE} {...bind('measureDiv')}>
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
              <BackgroundLayerComponent
                layers={layers}
                viewMode={viewMode}
                drawnAreas={drawnAreas}
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
              <PagedPrimitiveDataSource
                name="catalog-features"
                data={featuresCollection}
                stroke={cesiumFeaturesColor}
                strokeWidth={1}
                pageSize={STATIC_CONF.MAP.PAGE_SIZE_MAP}
              />
              <PagedPrimitiveDataSource
                name="shapefile-features"
                data={featureShapefile}
                stroke={cesiumFeaturesColor}
                strokeWidth={1}
              />
              <PagedPrimitiveDataSource
                name="selected-features"
                data={selectedProductsCollection}
                stroke={selectedFeatureColor}
                strokeWidth={selectedColorOutlineWidth}
              />
              <PagedPrimitiveDataSource
                name="selected-toponyms"
                data={selectedToponyms}
                stroke={selectedFeatureColor}
                strokeWidth={selectedColorOutlineWidth}
              />
              <CesiumCursorPosition cesiumContext={this.ref} />
              <CesiumEventAndPolygonDrawerComponent
                cesiumContext={this.ref}
                cesiumDrawColor={cesiumDrawColor}
                drawingSelection={drawingSelection}
                drawnAreas={drawnAreas}
                onDrawingSelectionDone={onDrawingSelectionDone}
                onProductsZoomTo={onProductsZoomTo}
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
