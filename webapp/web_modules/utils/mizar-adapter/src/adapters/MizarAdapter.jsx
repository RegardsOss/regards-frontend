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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import forEach from 'lodash/forEach'
import find from 'lodash/find'
import filter from 'lodash/filter'
import last from 'lodash/last'
import { UIDomain } from '@regardsoss/domain'
import './MizarLoader'
import './rconfig'
import './Mizar.css'
import polygonCenter from 'geojson-polygon-center'
import { UIShapes } from '@regardsoss/shape'
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
    onFeaturesSelected: PropTypes.func,
    // view management
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired,
    // product selection management
    selectedProducts: PropTypes.arrayOf(PropTypes.object),
    // eslint-disable-next-line react/no-unused-prop-types
    onProductSelected: PropTypes.func.isRequired,
    selectedFeatureColor: PropTypes.string.isRequired,
    selectedColorOutlineWidth: PropTypes.number,
  }

  static defaultProps = {
    canvasId: 'MizarCanvas', // default value, when showing only one instance
    crsContext: 'CRS:84',
    drawnAreas: [],
    featuresColor: 'Orange',
    drawColor: 'Yellow',
  }

  /** Mizar library */
  static MIZAR_LIBRARY = null

  // XXX : Workaround
  static MIZAR_Y_OFFSET = 150

  /**
   * Transforsm points into a box with {min/max}{X/Y} fields and empty information field
   * @param {[number]} point1 first point as coordinates array
   * @param {[number]} point2 second point as coordinates array
   * @return {{empty: boolean, minX: number, maxX: number,minY: number, maxY: number}} transformed box, never null, with all fields provided
   */
  static toBoxCoordinates(point1, point2) {
    if (point1 && point2) {
      const [p1X, p1Y] = point1
      const [p2X, p2Y] = point2
      const minX = Math.min(p1X, p2X)
      const maxX = Math.max(p1X, p2X)
      const minY = Math.min(p1Y, p2Y)
      const maxY = Math.max(p1Y, p2Y)
      return {
        minX,
        maxX,
        minY,
        maxY,
        empty: minX === maxX || minY === maxY,
      }
    }
    return {
      empty: true,
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0,
    }
  }

  /**
   * Builds a feature from id and points as parameter
   * @param {string} id
   * @param {*} point1 first point as resolved by Mizar (array)
   * @param {*} point2 second point as resolved by Mizar (array)
   * @retun {*} Geo feature (matching GeoJsonFeature)
   */
  static toAreaFeature(featureId, point1, point2) {
    const {
      minX, maxX, minY, maxY, empty,
    } = MizarAdapter.toBoxCoordinates(point1, point2)
    if (!empty) {
      // area is not empty
      return {
        id: '0',
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          bbox: [minX, minY, maxX, maxY],
          coordinates: [[[minX, minY],
            [maxX, minY],
            [maxX, maxY],
            [minX, maxY],
            [minX, minY],
          ]],
        },
      }
    }
    return null
  }

  /** Transient instance information: keeps mizar layers and data in this as their lifecycle is correlated */
  mizar = {
    instance: null, // mizar instance
    featuresLayer: null, // features collection layer
    drawLayer: null, // areas draw layer
    customLayers: [], // custom layers
    selectedFeaturesLayer: null,
    selectedFeaturesImageLayer: null,
    drawnLayer: null,
  }

  /** Currently drawn selection initial point (lat / lon) */
  currentDrawingInitPoint = null

  /** Click count & timer in order to manage simple & double click */
  clickCount = 0

  singleClickTimer = null

  /**
   * Lifecycle method: component did mount. Used here to load and initialize the mizar component
   */
  componentDidMount = () => {
    if (MizarAdapter.MIZAR_LIBRARY) {
      // invoke on loaded directly as library was already loaded
      this.onMizarLibraryLoaded(MizarAdapter.MIZAR_LIBRARY)
    } else {
      // load library then invoke on loaded
      window.requirejs(['Mizar'], this.onMizarLibraryLoaded)
    }
  }

  /**
   * Lifecycle method: component will receive props. Used here to report changes onto the mizar component (main wrapper job)
   * @param {*} nextProps next properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // Add new geo features to display layer
    const {
      featuresCollection, drawingSelection, drawnAreas, customLayersOpacity, viewMode,
      selectedProducts,
    } = nextProps
    if (!isEqual(this.props.featuresCollection, featuresCollection) || !isEqual(this.props.selectedProducts, selectedProducts)) {
      // Handle not selected features
      this.onNotSelectedFeaturesUpdated(featuresCollection, selectedProducts)
      // Handle selected feature
      this.onSelectedFeaturesUpdated(featuresCollection, selectedProducts)
    }
    // remove old areas and add new ones
    if (!isEqual(this.props.drawnAreas, drawnAreas)) {
      this.onAreasUpdated(this.props.drawnAreas, drawnAreas)
    }
    // Handle draw mode changes
    if (this.props.drawingSelection !== drawingSelection) {
      this.onToggleDrawSelectionMode(drawingSelection)
    }
    // Handle zoom on drawArea
    if (!isEqual(this.props.drawnAreas, drawnAreas) && this.props.drawingSelection !== drawingSelection && drawingSelection === false) {
      this.zoomOnGeometry(drawnAreas[0].geometry)
    }
    // remove old areas and add new ones
    if (!isEqual(this.props.customLayersOpacity, customLayersOpacity)) {
      this.onUpdateOpacity(customLayersOpacity)
    }
    // Handle change view mode
    if (!isEqual(this.props.viewMode, viewMode)) {
      this.onToggleViewMode()
    }
    // Handle zoom on selected product
    if (!isEqual(this.props.selectedProducts, selectedProducts) && !isEmpty(selectedProducts)) {
      const lastFeatureSelected = find(this.mizar.selectedFeaturesLayer.features, (feature) => feature.id === last(selectedProducts).id)
      this.zoomOnGeometry(lastFeatureSelected.geometry)
    }
    // XXX- take in account, in later versions, color properties change ==> requires unmounting then remounting layers
    // useless in current version as the parent split pane blocks redrawing anyways
  }

  /**
   * Lifecycle method: component will unmount. Used here to free loaded mizar component.
   */
  componentWillUnmount =() => {
    this.unmounted = true
    if (this.mizar.instance) {
      this.mizar.instance.destroy()
    }
  }

  /**
   * Called when the Mizar library is loaded
   * Configures and saves mizar instance
   * @param {*} Mizar loaded library (expected Mizar class)
   */
  onMizarLibraryLoaded = (Mizar) => {
    // A - keep static reference to access library faster next times
    MizarAdapter.MIZAR_LIBRARY = Mizar
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
    const featureStyle = this.mizar.instance.UtilityFactory.create(MizarAdapter.MIZAR_LIBRARY.UTILITY.FeatureStyle)
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

    // Initialize layer
    this.onAreasUpdated([], this.props.drawnAreas)

    //  7- Initialize draw selection from property
    this.onToggleDrawSelectionMode(drawingSelection)
  }

  /**
   * Features collection was updated (= not selected features)
   * @param {*} newFeaturesCollection, matching GeoJsonFeaturesCollection shape
   * @param {*} selectedProducts
   */
  onNotSelectedFeaturesUpdated = (newFeaturesCollection, selectedProducts) => {
    if (!this.unmounted) {
      if (this.mizar.featuresLayer) {
        // delete if any old value
        this.mizar.featuresLayer.removeAllFeatures()
        // add if any new value
        if (newFeaturesCollection && !isEmpty(newFeaturesCollection.features)) {
          const newFeaturesNotSelectedCollection = {
            ...newFeaturesCollection,
            features: filter(newFeaturesCollection.features, (feature) => (
              !find(selectedProducts, (selectedProduct) => (selectedProduct.id === feature.id))
            )),
          }
          this.mizar.featuresLayer.addFeatureCollection(newFeaturesNotSelectedCollection)
        }
      } else {
        // push that operation later
        this.delayedAddFeatures = newFeaturesCollection
      }
    }
  }

  /**
   * Selected features collection was updated
   * @param {*} newFeaturesCollection
   * @param {*} selectedProducts
   */
  onSelectedFeaturesUpdated = (newFeaturesCollection, selectedProducts) => {
    if (!this.unmounted) {
      if (this.mizar.selectedFeaturesLayer) {
        // delete if any old value
        this.mizar.selectedFeaturesLayer.removeAllFeatures()

        // add if any new value
        if (selectedProducts && !isEmpty(selectedProducts)) {
          const newFeaturesSelectedCollection = {
            ...newFeaturesCollection,
            features: filter(newFeaturesCollection.features, (feature) => (
              find(selectedProducts, (featureSelected) => feature.id === featureSelected.id)
            )),
          }
          this.mizar.selectedFeaturesLayer.addFeatureCollection(newFeaturesSelectedCollection)
        }
      }
    }
  }

  /**
   * Areas where updated, propagate change to mizar
   * @param {[*]} oldDrawnAreas old list of areas (array of GeoJsonFeature)
   * @param {[*]} drawnAreas new list of areas (array of GeoJsonFeature)
   */
  onAreasUpdated = (oldDrawnAreas = [], drawnAreas = []) => {
    if (this.mizar.drawLayer && !this.unmounted) {
      oldDrawnAreas.forEach((f) => this.mizar.drawLayer.removeFeature(f))
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
    const centerPoint = polygonCenter(geometry)
    const centerX = centerPoint.coordinates[0]
    const centerY = centerPoint.coordinates[1]
    this.mizar.instance.getActivatedContext().getNavigation().zoomTo([centerX, centerY], { distance: 200000, duration: 5000 })
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
      const pickingManager = this.mizar.instance.getServiceByName(MizarAdapter.MIZAR_LIBRARY.SERVICE.PickingManager)
      const newSelection = pickingManager.computePickSelection(pickPoint)
      UIDomain.clickOnEntitiesHandler(newSelection, this.props.onProductSelected, this.props.onFeaturesSelected)
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
    if (drawingSelection && event.button === 0) {
      const { nativeEvent: { offsetX, offsetY } } = event
      this.currentDrawingInitPoint = this.mizar.instance.getActivatedContext().getLonLatFromPixel(offsetX, offsetY)
    }
  }

  /**
   * On canvas mouse move: handle update drawing selection if started
   * @param {*} event mouse event
   */
  onMouseMove = (event) => {
    const { onDrawingSelectionUpdated } = this.props
    if (this.currentDrawingInitPoint) {
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
    if (this.currentDrawingInitPoint) {
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
      <canvas
        key="canvas"
        id={this.props.canvasId}
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
      />)
  }
}
