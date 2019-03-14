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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { Measure } from '@regardsoss/adapters'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import { GeoJsonFeaturesCollection } from '../shapes/FeaturesCollection'
import './MizarLoader'
import './rconfig'
import './Mizar.css'
import styles from '../styles'
/**
 * Mizar Adapter
 */
export class MizarAdapter extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    backgroundLayerUrl: PropTypes.string.isRequired,
    backgroundLayerType: PropTypes.string.isRequired,
    featuresCollection: GeoJsonFeaturesCollection.isRequired,
    drawMode: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

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
      if (drawMode) {
        this.mizar.getActivatedContext().getNavigation().start()
      } else {
        this.mizar.getActivatedContext().getNavigation().stop()
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
    }, (layerId) => {
      this.setInitialized(layerId, () => this.addFeatures(this.props.featuresCollection))
    })

    const vectorLayer = this.mizar.LayerFactory.create({
      type: Mizar.LAYER.Vector,
      visible: true,
    })

    this.mizar.getActivatedContext().addDraw(vectorLayer)

    this.setState({ vectorLayer })
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
  }


  // Called when left mouse button is pressed : start drawing the rectangle
  onMouseDown = (event) => {
    if (this.props.drawMode && event.button === 0) {
      this.startPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.clientX, event.clientY)
      this.drawRectangle(this.startPoint, this.startPoint)
      this.started = true
    }
  }

  // Called when mouse is moved  : update the rectangle
  onMouseMove = (event) => {
    if (this.started && event.button === 0) {
      const endPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.clientX, event.clientY)
      this.drawRectangle(this.startPoint, endPoint)
    }
  }

  // Called when left mouse button is release  : end drawing the rectangle
  onMouseUp = (event) => {
    if (this.started && event.button === 0) {
      const endPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.clientX, event.clientY)
      this.drawRectangle(this.startPoint, endPoint)
      this.started = false
    }
  }

  onSizeChanged = ({ measureDiv: { width, height } }) => {
    let availableWidth = Math.round(width)
    const availableHeight = Math.round(height)
    if (availableWidth > (availableHeight * 1.7)) {
      availableWidth = availableHeight * 1.7
    }
    console.error('width=', width)
    console.error('height=', height)

    console.error('availableWidth=', availableWidth)
    console.error('availableHeight=', availableHeight)
    this.updateDisplayAreaStyle(availableWidth, availableHeight)
  }

  /**
   *
   *
   * <canvas
                  key="canvas"
                  id="MizarCanvas"
                  style={plop}
                  onMouseUp={this.onMouseUp}
                  onMouseDown={this.onMouseDown}
                  pnMouseMode={this.onMouseMove}
                />
   */

  /**
   * Updates display area style
   */
  updateDisplayAreaStyle = (width, height) => {
    if (width !== get(this.state, 'displayAreaStyle.width')
      || height !== get(this.state, 'displayAreaStyle.height')) {
      this.setState({ displayAreaStyle: { width, height } })
    }
  }

  render() {
    const { moduleTheme } = this.context
    const { displayAreaStyle } = this.state
    const plop = {
      ...displayAreaStyle,
      ...moduleTheme.mizarCanvas,
    }
    return (
      <Measure bounds onMeasure={this.onSizeChanged}>
        {
        ({ bind }) => (
          <div id="measuredDiv" style={moduleTheme.mizarDiv} {...bind('measureDiv')}>
            { // content producing method
              (() => <canvas
                key="canvas"
                id="MizarCanvas"
                style={plop}
                onMouseUp={this.onMouseUp}
                onMouseDown={this.onMouseDown}
                pnMouseMode={this.onMouseMove}
              />)()
          }
          </div>)
    }
      </Measure>)
  }
}

export default withModuleStyle(styles)(MizarAdapter)
