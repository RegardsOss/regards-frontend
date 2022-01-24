/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import { UIDomain } from '@regardsoss/domain'
import './Mizar.css'
import Mizar from 'regards-mizar'
import polygonCenter from 'geojson-polygon-center'
import { UIShapes, CatalogShapes } from '@regardsoss/shape'
import { GeoJsonFeaturesCollection, GeoJsonFeature } from '../shapes/FeaturesCollection'

/**
  * Mizar Adapter
  * Nota: it provides pick selection and draw selection gestures but caller should handle related updates and feedback
  */
export default class MizarAdapter extends React.Component {
  static propTypes = {
    canvasId: PropTypes.string, // TO be used when showing multiple Mizar instances (otherwise, both will point out the same canvas). IMMUTABLE
    crsContext: PropTypes.string,
    layers: PropTypes.arrayOf(UIShapes.LayerDefinition).isRequired,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    featuresColor: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    customLayersOpacity: PropTypes.number,
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
    // eslint-disable-next-line react/no-unused-prop-types
    onProductsZoomTo: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    zoomToFeature: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
    // view management
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired,
    // product selection management
    // eslint-disable-next-line react/no-unused-prop-types
    selectedProducts: PropTypes.objectOf(CatalogShapes.Entity).isRequired, // inner object is entity type
    // eslint-disable-next-line react/no-unused-prop-types
    onProductSelected: PropTypes.func.isRequired,
    selectedFeatureColor: PropTypes.string.isRequired,
    selectedColorOutlineWidth: PropTypes.number,
    // toponym selection management
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    selectedToponyms: PropTypes.object,
  }

  static defaultProps = {
    canvasId: 'MizarCanvas', // default value, when showing only one instance
    crsContext: 'CRS:84',
    drawnAreas: [],
    featuresColor: 'Orange',
    drawColor: 'Yellow',
  }

  static elevationWrapperStyle = {
    position: 'absolute',
    right: '20px',
    bottom: '0px',
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif',
    color: 'rgba(0, 0, 0, 0.40)',
    lineHeight: '1.5em',
  }

  static elevationStyle = {
    margin: '0 10px',
  }

  // XXX : Workaround
  static MIZAR_Y_OFFSET = 150

  /** Transient instance information: keeps mizar layers and data in this as their lifecycle is correlated */
  mizar = {
    instance: null, // mizar instance
    featuresLayer: null, // features collection layer
    drawLayer: null, // areas draw layer
    customLayers: [], // custom layers
    selectedFeaturesLayer: null,
    selectedFeaturesImageLayer: null,
    drawnLayer: null,
    selectedToponymsLayer: null,
  }

  /** Currently drawn selection initial point (lat / lon) */
  currentDrawingInitPoint = null

  /**
   * Lifecycle method: component did mount. Used here to load and initialize the mizar component
   */
  componentDidMount = () => {
    this.initMizarInstance()
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
      featuresCollection, drawingSelection, drawnAreas, customLayersOpacity, viewMode,
      selectedProducts, selectedToponyms, zoomToFeature,
    } = newProps
    if (!isEqual(oldProps.featuresCollection, featuresCollection) || !isEqual(oldProps.selectedProducts, selectedProducts)) {
      // Handle not selected features
      this.onNotSelectedFeaturesUpdated(featuresCollection, selectedProducts)
      // Handle selected feature
      this.onSelectedFeaturesUpdated(featuresCollection, selectedProducts)
    }
    // remove old areas and add new ones
    if (!isEqual(oldProps.drawnAreas, drawnAreas)) {
      this.onAreasUpdated(oldProps.drawnAreas, drawnAreas)
    }
    // Handle draw mode changes
    if (oldProps.drawingSelection !== drawingSelection) {
      this.onToggleDrawSelectionMode(drawingSelection)
    }
    // remove old areas and add new ones
    if (!isEqual(oldProps.customLayersOpacity, customLayersOpacity)) {
      this.onUpdateOpacity(customLayersOpacity)
    }
    // Handle toponyms changes
    if (!isEqual(oldProps.selectedToponyms, selectedToponyms)) {
      this.onUpdateToponyms(selectedToponyms)
    }
    // Handle change view mode
    if (!isEqual(oldProps.viewMode, viewMode)) {
      this.onToggleViewMode()
    }
    // Manage camera destination
    if (!isEqual(oldProps.zoomToFeature, zoomToFeature) || !isEqual(oldProps.drawnAreas, drawnAreas)) {
      // Handle zoom on selected product
      if (!isEqual(oldProps.zoomToFeature, zoomToFeature) && zoomToFeature) {
        const lastFeatureSelected = find(featuresCollection.features, (feature) => feature.id === zoomToFeature.id)
        this.zoomOnGeometry(lastFeatureSelected.geometry)
      } else if (!isEmpty(drawnAreas)) {
        // When user stop drawing area or toponym change
        if (drawingSelection === false) {
          this.zoomOnGeometry(drawnAreas[0].geometry)
        }
      }
    }
    // XXX- take in account, in later versions, color properties change ==> requires unmounting then remounting layers
    // useless in current version as the parent split pane blocks redrawing anyways
  }

  /**
   * Lifecycle method: component will unmount. Used here to free loaded mizar component.
   */
  componentWillUnmount = () => {
    this.unmounted = true
    if (this.mizar.instance) {
      this.mizar.instance.destroy()
    }
  }

  /**
   * Configures and saves mizar instance
   */
  initMizarInstance = () => {
    if (this.unmounted) {
      return
    }
    // 1 - Create Mizar
    const {
      crsContext, featuresColor, drawColor, drawingSelection, viewMode, selectedFeatureColor,
      selectedColorOutlineWidth, layers,
    } = this.props
    const mizarDiv = document.getElementById(this.props.canvasId)

    let mizarOptions = {
      // the canvas ID where Mizar is inserted
      canvas: mizarDiv,
      // define a planet context
      planetContext: {
        // the CRS of the Earth
        coordinateSystem: {
          geoideName: crsContext,
        },
      },
    }
    if (viewMode === UIDomain.MAP_VIEW_MODES_ENUM.MODE_2D) {
      mizarOptions = {
        ...mizarOptions,
        projectionName: Mizar.PROJECTION.Plate,
      }
    }

    this.mizar.instance = new Mizar(mizarOptions)

    // 2 - Register layer relative mouse listeners
    this.mizar.instance.getActivatedContext().getRenderContext().canvas.addEventListener('mouseup', this.onLayerRelativeMouseUp)
    this.mizar.instance.getActivatedContext().getRenderContext().canvas.addEventListener('mousedown', this.onLayerRelativeMouseDown)

    // 3 - Set up background layer
    const baseLayer = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND, viewMode, UIDomain.MAP_ENGINE_ENUM.MIZAR)
    this.mizar.instance.addLayer(baseLayer)

    // 4 - Store custom layers
    const layersInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.CUSTOM, viewMode, UIDomain.MAP_ENGINE_ENUM.MIZAR)
    forEach(layersInfo, (layerInfo) => {
      this.mizar.instance.addLayer(layerInfo, (customLayerId) => {
        this.mizar.customLayers.push(this.mizar.instance.getLayerByID(customLayerId))
      })
    })

    // 5 - Set up features collection layer and store its reference
    this.mizar.instance.addLayer({
      type: Mizar.LAYER.GeoJSON,
      name: 'datas',
      visible: true,
      background: false,
      color: featuresColor,
      strokeWidth: 1,
    }, (featuresLayerId) => {
      // store features layer
      this.mizar.featuresLayer = this.mizar.instance.getLayerByID(featuresLayerId)
      // make sure showing current features (using latest props value)
      this.onNotSelectedFeaturesUpdated(this.props.featuresCollection)
    })

    // 6 - Set up selected features layer and store its reference
    const featureStyle = this.mizar.instance.UtilityFactory.create(Mizar.UTILITY.FeatureStyle)
    this.mizar.instance.addLayer({
      type: Mizar.LAYER.GeoJSON,
      name: 'selectedFeatureIds',
      visible: true,
      background: false,
      style: {
        strokeColor: featureStyle.fromStringToColor(selectedFeatureColor),
        strokeWidth: selectedColorOutlineWidth,
      },
    }, (selectedFeatureIds) => {
      // store selected features layer
      this.mizar.selectedFeaturesLayer = this.mizar.instance.getLayerByID(selectedFeatureIds)
    })

    // 7 - Set up areas draw layer
    this.mizar.drawLayer = this.mizar.instance.LayerFactory.create({
      type: Mizar.LAYER.Vector,
      visible: true,
      background: false,
      color: drawColor,
    })
    this.mizar.instance.getActivatedContext().addDraw(this.mizar.drawLayer)

    // 8 - Set up toponyms layer
    this.mizar.instance.addLayer({
      type: Mizar.LAYER.GeoJSON,
      name: 'selectedToponyms',
      visible: true,
      background: false,
      color: featuresColor,
      strokeWidth: 1,
    }, (selectedToponymsId) => {
      // store toponyms layer
      this.mizar.selectedToponymsLayer = this.mizar.instance.getLayerByID(selectedToponymsId)
    })

    // Initialize layer
    this.onAreasUpdated([], this.props.drawnAreas)

    //  7- Initialize draw selection from property
    this.onToggleDrawSelectionMode(drawingSelection)
  }

  /**
   * Display some feature on the provided layer
   * @param {*} layer mizar layer
   * @param {*} featuresCollection (dont know why it's used)
   * @param {*} includedFeatures the list of features to display on that layer
   */
  addFeatureToLayer = (layer, featuresCollection, includedFeatures) => {
    // delete if any old value
    layer.removeAllFeatures()
    // add if any new value
    if (featuresCollection && featuresCollection.features) {
      const updatedFeaturesCollection = {
        ...featuresCollection,
        features: includedFeatures,
      }
      if (!isEmpty(updatedFeaturesCollection.features)) {
        layer.addFeatureCollection(updatedFeaturesCollection)
      }
    }
  }

  /**
   * Build a list of features that we keep from featuresCollection
   * @param {*} featuresCollection, matching GeoJsonFeaturesCollection shape
   * @param {*} selectedProducts a list of features selected by user
   * @param {*} isIntersection true -> return selectedProducts
   *                           false -> return features from featuresCollection that are not inside selectedProducts
   */
  getIncludedFeatures = (featuresCollection, selectedProducts, isIntersection) => {
    const isIncluded = (feature) => find(selectedProducts, (selectedProduct) => (selectedProduct.content.id === feature.id))
    if (isIntersection) {
      return filter(featuresCollection.features, (feature) => (
        isIncluded(feature)
      ))
    }
    return filter(featuresCollection.features, (feature) => (
      !isIncluded(feature)
    ))
  }

  /**
   * Features collection was updated (= not selected features)
   * @param {*} featuresCollection, matching GeoJsonFeaturesCollection shape
   * @param {*} selectedProducts
   */
  onNotSelectedFeaturesUpdated = (featuresCollection, selectedProducts) => {
    if (!this.unmounted) {
      const includedFeatures = this.getIncludedFeatures(featuresCollection, selectedProducts, false)
      this.addFeatureToLayer(this.mizar.featuresLayer, featuresCollection, includedFeatures)
    }
  }

  /**
   * Selected features collection was updated
   * @param {*} featuresCollection
   * @param {*} selectedProducts
   */
  onSelectedFeaturesUpdated = (featuresCollection, selectedProducts) => {
    if (!this.unmounted) {
      const includedFeatures = this.getIncludedFeatures(featuresCollection, selectedProducts, true)
      this.addFeatureToLayer(this.mizar.selectedFeaturesLayer, featuresCollection, includedFeatures)
    }
  }

  onUpdateToponyms = (selectedToponyms) => {
    if (!this.unmounted) {
      this.mizar.selectedToponymsLayer.removeAllFeatures()
      this.mizar.selectedToponymsLayer.addFeatureCollection(selectedToponyms)
    }
  }

  /**
   * Areas where updated, propagate change to mizar
   * @param {[*]} oldDrawnAreas old list of areas (array of GeoJsonFeature)
   * @param {[*]} drawnAreas new list of areas (array of GeoJsonFeature)
   */
  onAreasUpdated = (oldDrawnAreas = [], drawnAreas = []) => {
    if (this.mizar.drawLayer && !this.unmounted) {
      this.mizar.drawLayer.removeAllFeatures()
      drawnAreas.forEach((f) => this.mizar.drawLayer.addFeature(f))
    }
  }

  /**
   * Drawing selection mode was toggled on/off
   * @param {bool} drawingSelection true when drawing selection, false otherwise
   */
  onToggleDrawSelectionMode = (drawingSelection) => {
    if (this.mizar.drawLayer && !this.unmounted) {
      // reinitialize gesture transient state
      this.currentDrawingSelectionInitPoint = null
      if (drawingSelection) {
        // started drawing selection: stop navigation to avoid map rotation / drag
        this.mizar.instance.getActivatedContext().getNavigation().stop()
      } else {
        // stop drawing selection: restart navigation
        this.mizar.instance.getActivatedContext().getNavigation().start()
      }
    }
  }

  /**
   * DISABLED. DOESN'T WORK.
   * Update the level of opacity of the static layer
   */
  onUpdateOpacity = (opacity) => {
    forEach(this.mizar.customLayers, (customLayer) => {
      customLayer.setOpacity(opacity)
    })
  }

  zoomOnGeometry = (geometry) => {
    if (this.mizar.instance) {
      const centerPoint = polygonCenter(geometry)
      const centerX = centerPoint.coordinates[0]
      const centerY = centerPoint.coordinates[1]
      this.mizar.instance.getActivatedContext().getNavigation().zoomToFeature([centerX, centerY], { distance: 200000, duration: 5000 })
    }
  }

  /**
   * On canvas mouse down: handle feature pickup in relative canvas coordinates (event is provided related to layer)
   * @param {*} event layer relative event
   */
  onLayerRelativeMouseDown = (event) => {
    // save init point to check later that user is not dragging
    this.mouseDownEvent = event
  }

  /**
   * On layer relative mouse up: handle feature pickup (event is provided related to layer)
   * @param {*} event layer relative event
   */
  onLayerRelativeMouseUp = (event) => {
    // check user is not dragging
    if (this.mouseDownEvent.layerX === event.layerX && this.mouseDownEvent.layerY === event.layerY) {
      const pickPoint = this.mizar.instance.getActivatedContext().getLonLatFromPixel(event.layerX, event.layerY)
      // compute selection
      const pickingManager = this.mizar.instance.getServiceByName(Mizar.SERVICE.PickingManager)
      const newSelection = pickingManager.computePickSelection(pickPoint)
      const selectedFeatures = filter(this.props.featuresCollection.features, (feature) => find(newSelection, (selection) => selection.feature.id === feature.id))
      UIDomain.clickOnEntitiesHandler(selectedFeatures, this.props.onProductSelected, this.props.onProductsZoomTo)
    }
  }

  /**
   * Switch 2D to 3D or 3D to 2D
   * - Doesn't work -
   */
  onToggleViewMode = () => {
    this.mizar.instance.toggleDimension()
  }

  /**
   * On canvas mouse down: handle start drawing a rectangle selection if enabled
   * @param {*} event mouse event
   */
  onMouseDown = (event) => {
    const { drawingSelection } = this.props

    if (this.mizar.instance !== null) {
      if (drawingSelection && event.button === 0) {
        const { nativeEvent: { offsetX, offsetY } } = event
        this.currentDrawingInitPoint = this.mizar.instance.getActivatedContext().getLonLatFromPixel(offsetX, offsetY)
      }
    }
  }

  /**
   * On canvas mouse move: handle update drawing selection if started
   * @param {*} event mouse event
   */
  onMouseMove = (event) => {
    const { onDrawingSelectionUpdated } = this.props
    if (this.mizar.instance !== null && this.currentDrawingInitPoint) {
      // update selection rectangle and show it
      const { nativeEvent: { offsetX, offsetY } } = event
      const endPoint = this.mizar.instance.getActivatedContext().getLonLatFromPixel(offsetX, offsetY)
      if (onDrawingSelectionUpdated) {
        onDrawingSelectionUpdated(this.currentDrawingInitPoint, endPoint)
      }
    }
  }

  /**
   * On canvas mouse up: handle complete drawing selection if started
   * @param {*} event mouse event
   */
  onMouseUp = (event) => {
    const { onDrawingSelectionDone } = this.props

    if (this.mizar.instance !== null && this.currentDrawingInitPoint) {
      // update selection rectangle, hide it and notify parent
      const { nativeEvent: { offsetX, offsetY } } = event
      const endPoint = this.mizar.instance.getActivatedContext().getLonLatFromPixel(offsetX, offsetY)
      if (onDrawingSelectionDone) {
        onDrawingSelectionDone(this.currentDrawingInitPoint, endPoint)
      }
      // clear finished gesture
      this.currentDrawingInitPoint = null
    }
  }

  render() {
    return (
      <>
        <div
          className="hidden-xs"
          style={MizarAdapter.elevationWrapperStyle}
        >
          <div
            id="posTracker"
            style={MizarAdapter.elevationStyle}
          />
        </div>
        <canvas
          key="canvas"
          id={this.props.canvasId}
          onMouseUp={this.onMouseUp}
          onMouseDown={this.onMouseDown}
          onMouseMove={this.onMouseMove}
        />
      </>)
  }
}
