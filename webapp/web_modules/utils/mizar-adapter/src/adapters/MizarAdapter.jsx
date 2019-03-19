/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import { GeoJsonFeaturesCollection } from '../shapes/FeaturesCollection'
import './MizarLoader'
import './rconfig'
import './Mizar.css'
/**
 * Mizar Adapter
 */
export default class MizarAdapter extends React.Component {
  static propTypes = {
    crsContext: PropTypes.string,
    backgroundLayerUrl: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.string.isRequired,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    drawMode: PropTypes.bool.isRequired,
    featureDrawn: PropTypes.bool,
    onFeatureDrawn: PropTypes.func,
    onFeaturesSelected: PropTypes.func,
    featuresColor: PropTypes.string,
    drawColor: PropTypes.string,
  }

  static defaultProps = {
    crsContext: 'CRS:84',
    featureDrawn: false,
  }

  static defaultFeature = {
    id: '0',
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
  }

  // XXX : Workaround
  static MIZAR_Y_OFFSET = 180

  state = {
    featuresLayerId: null,
    drawLayer: null,
    mouseClickCoord: null,
  }

  /**
   * Mizar current instance
   */
  // eslint-disable-next-line react/sort-comp
  mizar = null

  /**
   * Initialized draw mode feature
   */
  feature = MizarAdapter.defaultFeature

  componentDidMount = () => {
    window.requirejs(['Mizar'], this.lightLoadMizar)
  }

  componentWillReceiveProps(nextProps) {
    // Add new geo features to display layer
    const { featuresCollection, drawMode } = nextProps
    const { drawLayer } = this.state
    if (!isEqual(this.props.featuresCollection, featuresCollection)) {
      this.addFeatures(featuresCollection)
    }

    // Handle draw mode changes
    if (this.props.drawMode !== drawMode) {
      this.toggleDrawMode(drawMode)
    }

    if (drawLayer && this.props.featureDrawn && !nextProps.featureDrawn) {
      drawLayer.removeAllFeatures()
      this.feature = MizarAdapter.defaultFeature
    }
  }

  componentWillUnmount =() => {
    if (this.mizar) {
      this.mizar.destroy()
    }
  }

  toggleDrawMode = (drawMode) => {
    if (drawMode) {
      this.mizar.getActivatedContext().getNavigation().stop()
    } else {
      this.mizar.getActivatedContext().getNavigation().start()
      this.feature = MizarAdapter.defaultFeature
    }
  }

  setInitialized = (featuresLayerId, callback) => {
    this.setState({ featuresLayerId }, callback)
  }

  handleMouseDown = (event) => {
    // save coordiantes of mouse when mouseDown. Those origine coordinates are compared with the coordinates on mouseUp event
    // to determine the user action :
    // 1. The two coordinates are identicals -> user pick a feature
    // 2. The two coordinates are differents -> user moved the viewport
    this.setState({ mouseClickCoord: event })
  }

  handleMouseUp = (event) => {
    const { mouseClickCoord } = this.state
    if (mouseClickCoord.layerX === event.layerX && mouseClickCoord.layerY === event.layerY) {
      const pickPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.layerX, event.layerY)
      const pickingManager = this.mizar.getServiceByName(this.Mizar.SERVICE.PickingManager)
      pickingManager.clearSelection()
      const newSelection = pickingManager.computePickSelection(pickPoint)
      const select = pickingManager.setSelection(newSelection)
      pickingManager.focusSelection(select)
      if (this.props.onFeaturesSelected) {
        this.props.onFeaturesSelected(select)
      }
    }
  }

  /**
   * Called when the Mizar library is loaded
   * Run mizar and save the instance
   */
  lightLoadMizar = (Mizar) => {
    this.Mizar = Mizar
    const {
      crsContext, backgroundLayerUrl, backgroundLayerType,
      featuresColor, featuresCollection, drawColor, drawMode,
    } = this.props
    const mizarDiv = document.getElementById('MizarCanvas')

    // Create Mizar
    this.mizar = new Mizar({
      // the canvas ID where Mizar is inserted
      canvas: mizarDiv,
      // define a planet context
      planetContext: {
        // the CRS of the Earth
        coordinateSystem: {
          geoideName: crsContext,
        },
      },
    })

    this.mizar.getActivatedContext().getRenderContext().canvas.addEventListener('mouseup', this.handleMouseUp)
    this.mizar.getActivatedContext().getRenderContext().canvas.addEventListener('mousedown', this.handleMouseDown)

    // Add a WMS layer as background
    this.mizar.addLayer({
      name: 'Background layer',
      baseUrl: backgroundLayerUrl,
      type: backgroundLayerType,
      background: true,
    })

    this.mizar.addLayer({
      type: Mizar.LAYER.GeoJSON,
      name: 'datas',
      visible: true,
      background: false,
      color: featuresColor || 'Orange',
    }, (featuresLayerId) => {
      this.setInitialized(featuresLayerId, () => this.addFeatures(featuresCollection))
    })

    const drawLayer = this.mizar.LayerFactory.create({
      type: Mizar.LAYER.Vector,
      visible: true,
      color: drawColor || 'Yellow',
    })

    this.mizar.getActivatedContext().addDraw(drawLayer)

    this.setState({ drawLayer }, () => {
      this.toggleDrawMode(drawMode)
    })
  }

  /**
  * Add given features to the feature layer of current instance of Mizar 
  * @param featuresCollection
   */
  addFeatures = (featuresCollection) => {
    const { featuresLayerId } = this.state
    const layer = this.mizar && featuresLayerId ? this.mizar.getLayerByID(featuresLayerId) : null
    if (layer) {
      layer.removeAllFeatures()
      layer.addFeatureCollection(featuresCollection)
    }
  }

  /**
   * Draw a rectangle with the bounding box describe with the two points pt1 and pt2
   * @param pt1 first point of the rectangle to draw
   * @param pt2 second point of the rectangle to draw
   */
  drawRectangle =(pt1, pt2) => {
    const minX = Math.min(pt1[0], pt2[0])
    const maxX = Math.max(pt1[0], pt2[0])
    const minY = Math.min(pt1[1], pt2[1])
    const maxY = Math.max(pt1[1], pt2[1])

    // If point1 === point2 no rectangle drawn.
    if (minX === maxX && minY === maxY) {
      return
    }

    this.feature.bbox = [minX, minY, maxX, maxY]
    this.feature.geometry.coordinates = [[[minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
      [minX, minY],
    ]]

    this.state.drawLayer.removeFeature(this.feature)
    this.state.drawLayer.addFeature(this.feature)
    if (this.props.onFeatureDrawn) {
      this.props.onFeatureDrawn(this.feature)
    }
  }


  // Called when left mouse button is pressed : start drawing the rectangle
  onMouseDown = (event) => {
    if (this.props.drawMode && event.button === 0) {
      const ptX = event.nativeEvent.offsetX
      const ptY = event.nativeEvent.offsetY
      this.startPoint = this.mizar.getActivatedContext().getLonLatFromPixel(ptX, ptY)
      if (this.startPoint) {
        this.drawRectangle(this.startPoint, this.startPoint)
        this.started = true
      }
    }
  }

  // Called when mouse is moved  : update the rectangle
  onMouseMove = (event) => {
    if (this.started && event.button === 0) {
      const ptX = event.nativeEvent.offsetX
      const ptY = event.nativeEvent.offsetY
      const endPoint = this.mizar.getActivatedContext().getLonLatFromPixel(ptX, ptY)
      this.drawRectangle(this.startPoint, endPoint)
    }
  }

  // Called when left mouse button is release  : end drawing the rectangle
  onMouseUp = (event) => {
    if (this.started && event.button === 0) {
      const ptX = event.nativeEvent.offsetX
      const ptY = event.nativeEvent.offsetY
      const endPoint = this.mizar.getActivatedContext().getLonLatFromPixel(ptX, ptY)
      this.drawRectangle(this.startPoint, endPoint)
      this.started = false
    }
  }

  render() {
    return (
      <canvas
        key="canvas"
        id="MizarCanvas"
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseMove={this.onMouseMove}
      />)
  }
}
