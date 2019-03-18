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
    backgroundLayerUrl: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.string.isRequired,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    drawMode: PropTypes.bool.isRequired,
    onFeatureDrawn: PropTypes.func,
    featuresColor: PropTypes.string,
  }

  // XXX : Workaround
  clientYOffset = 120

  state = {
    layerId: null,
    vectorLayer: null,
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
  feature = {
    id: '0',
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
  }

  componentDidMount = () => {
    window.requirejs(['Mizar'], this.lightLoadMizar)
  }

  componentWillReceiveProps(nextProps) {
    // Add new geo features to display layer
    const { featuresCollection, drawMode } = nextProps
    if (!isEqual(this.props.featuresCollection, featuresCollection)) {
      this.addFeatures(featuresCollection)
    }

    // Handle draw mode changes
    if (this.props.drawMode !== drawMode) {
      this.toggleDrawMode(drawMode)
    }
  }

  componentWillUnmount =() => {
    if (this.mizar) {
      const pickingManager = this.mizar.getServiceByName(this.Mizar.SERVICE.PickingManager)
      pickingManager.clearSelection()

      this.mizar = null
      this.Mizar = null
    }
  }

  toggleDrawMode = (drawMode) => {
    if (drawMode) {
      this.mizar.getActivatedContext().getNavigation().stop()
    } else {
      this.mizar.getActivatedContext().getNavigation().start()
      this.feature = {
        id: '0',
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [],
        },
      }
    }
  }

  setInitialized = (layerId, callback) => {
    this.setState({ layerId }, callback)
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
    }
  }

  /**
   * Called when the Mizar library is loaded
   * Run mizar and save the instance
   */
  lightLoadMizar = (Mizar) => {
    this.Mizar = Mizar
    const mizarDiv = document.getElementById('MizarCanvas')

    // Create Mizar
    this.mizar = new Mizar({
      // the canvas ID where Mizar is inserted
      canvas: mizarDiv,
      // define a planet context
      planetContext: {
        // the CRS of the Earth
        coordinateSystem: {
          geoideName: Mizar.CRS.WGS84,
        },
      },
    })

    this.mizar.getActivatedContext().getRenderContext().canvas.addEventListener('mouseup', this.handleMouseUp)
    this.mizar.getActivatedContext().getRenderContext().canvas.addEventListener('mousedown', this.handleMouseDown)

    // Add a WMS layer as background
    this.mizar.addLayer({
      name: 'Background layer',
      baseUrl: this.props.backgroundLayerUrl,
      type: this.props.backgroundLayerType,
      background: true,
    })

    this.mizar.addLayer({
      type: Mizar.LAYER.GeoJSON,
      name: 'datas',
      visible: true,
      background: false,
      color: this.props.featuresColor || 'Orange',
    }, (layerId) => {
      this.setInitialized(layerId, () => this.addFeatures(this.props.featuresCollection))
    })

    console.error('Colors', this.props.selectedColor, this.props.featuresColor)

    const vectorLayer = this.mizar.LayerFactory.create({
      type: Mizar.LAYER.Vector,
      visible: true,
    })

    this.mizar.getActivatedContext().addDraw(vectorLayer)

    this.setState({ vectorLayer }, () => {
      this.toggleDrawMode(this.props.drawMode)
    })
  }

  addFeatures = (featuresCollection) => {
    const layer = this.mizar && this.state.layerId ? this.mizar.getLayerByID(this.state.layerId) : null
    if (layer) {
      // TODO make sure it works correctly for workflow
      layer.removeAllFeatures()
      layer.addFeatureCollection(featuresCollection)
    }
  }

  drawRectangle =(pt1, pt2) => {
    const minX = Math.min(pt1[0], pt2[0])
    const maxX = Math.max(pt1[0], pt2[0])
    const minY = Math.min(pt1[1], pt2[1])
    const maxY = Math.max(pt1[1], pt2[1])

    this.feature.bbox = [minX, minY, maxX, maxY]
    this.feature.geometry.coordinates = [[[minX, minY],
      [maxX, minY],
      [maxX, maxY],
      [minX, maxY],
      [minX, minY],
    ]]

    this.state.vectorLayer.removeFeature(this.feature)
    this.state.vectorLayer.addFeature(this.feature)
    if (this.props.onFeatureDrawn) {
      this.props.onFeatureDrawn(this.feature)
    }
  }


  // Called when left mouse button is pressed : start drawing the rectangle
  onMouseDown = (event) => {
    if (this.props.drawMode && event.button === 0) {
      this.startPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.clientX, event.clientY - this.clientYOffset)
      if (this.startPoint) {
        this.drawRectangle(this.startPoint, this.startPoint)
        this.started = true
      }
    }
  }

  // Called when mouse is moved  : update the rectangle
  onMouseMove = (event) => {
    if (this.started && event.button === 0) {
      const endPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.clientX, event.clientY - this.clientYOffset)
      this.drawRectangle(this.startPoint, endPoint)
    }
  }

  // Called when left mouse button is release  : end drawing the rectangle
  onMouseUp = (event) => {
    if (this.started && event.button === 0) {
      const endPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.clientX, event.clientY - this.clientYOffset)
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
