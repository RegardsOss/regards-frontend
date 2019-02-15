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

import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'material-ui/Checkbox'
import isEqual from 'lodash/isEqual'
import { Measure } from '@regardsoss/adapters'
import './MizarLoader'
import './rconfig'
import './Mizar.css'
/**
 * Mizar Adapter
 */
export default class MizarAdapter extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    entities: PropTypes.any,
    applyGeoParameter: PropTypes.func.isRequired,
  }

  state = {
    layerId: null,
    drawMode: false,
    vectorLayer: null,
    measuredHeight: 1,
    measuredWidth: 1,
  }

  /**
   * Mizar current instance
   */
  // eslint-disable-next-line react/sort-comp
  mizar = null

  feature = {
    id: '0',
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
  }

  componentWillMount() {
  }

  componentDidMount = () => {
    window.requirejs(['Mizar'], this.lightLoadMizar)
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.entities, nextProps.entities)) {
      console.error('new entities')
      this.addFeatures(nextProps)
    }
  }

  setInitialized = (layerId, callback) => {
    console.error(`Layer ${layerId} iniatilized`)
    this.setState({ layerId }, callback)
  }

  switchDrawMode = () => {
    if (this.state.drawMode) {
      this.mizar.getActivatedContext().getNavigation().start()
      this.setState({ drawMode: !this.state.drawMode })
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
      this.setState({ drawMode: !this.state.drawMode })
    }
  }

  handleMouseUp = (event) => {
    console.error('MousuUP !', event.layerX, event.layerY)
    const pickPoint = this.mizar.getActivatedContext().getLonLatFromPixel(event.layerX, event.layerY)
    const pickingManager = this.mizar.getServiceByName(this.Mizar.SERVICE.PickingManager)
    pickingManager.clearSelection()
    const newSelection = pickingManager.computePickSelection(pickPoint)
    const select = pickingManager.setSelection(newSelection)
    pickingManager.focusSelection(select)
    console.log(select)
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

    this.mizar.getActivatedContext().subscribe(this.Mizar.EVENT_MSG.LAYER_ADDED, () => {
      console.error('Loadded ok')
    })

    this.mizar.getActivatedContext().getRenderContext().canvas.addEventListener('mouseup', this.handleMouseUp)

    // Add a WMS layer as background
    this.mizar.addLayer({
      type: Mizar.LAYER.WMS,
      // type : Mizar.LAYER.OMS
      name: 'Blue Marble',
      baseUrl: 'http://80.158.6.138/mapserv?map=WMS_BLUEMARBLE',
      // Esri world map
      // baseUrl: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/',
      // Open street map
      // baseUrl: 'https://c.tile.openstreetmap.org/',
      background: true,
    })

    this.mizar.addLayer({
      type: Mizar.LAYER.GeoJSON,
      name: 'datas',
      visible: true,
      background: false,
    }, (layerId) => {
      this.setInitialized(layerId, () => this.addFeatures())
    })

    const vectorLayer = this.mizar.LayerFactory.create({
      type: Mizar.LAYER.Vector,
      visible: true,
    })

    this.mizar.getActivatedContext().addDraw(vectorLayer)

    this.setState({ vectorLayer })
  }

  addFeatures = (props) => {
    const lprops = props || this.props
    const layer = this.mizar && this.state.layerId ? this.mizar.getLayerByID(this.state.layerId) : null
    if (layer) {
      layer.removeAllFeatures()
      console.error('Adding ', lprops.entities)
      layer.addFeatureCollection(lprops.entities)
    }
  }

  /**
   * Called when component is resized, to force the inner table implementation at same width
   */
  onComponentResized = ({ measureDiv: { height, width } }) => {
    console.error('Measure height', height)
    this.setState({
      measuredHeight: height,
      measuredWidth: width,
    })
  }

  applyFilter = () => {
    const coord = this.feature.geometry.coordinates
    console.error(coord, coord[0])
    const wkt = `POLYGON((${coord[0][0][0]} ${coord[0][0][1]},${coord[0][1][0]} ${coord[0][1][1]},${coord[0][2][0]} ${coord[0][2][1]},${coord[0][0][0]} ${coord[0][0][1]}))`
    this.props.applyGeoParameter(wkt)
  }

  drawRectangle =(pt1, pt2) => {
    const minX = Math.min(pt1[0], pt2[0])
    const maxX = Math.max(pt1[0], pt2[0])
    const minY = Math.min(pt1[1], pt2[1])
    const maxY = Math.max(pt1[1], pt2[1])

    this.feature.bbox = [minX, minY, maxX, maxY],
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
    if (this.state.drawMode && event.button === 0) {
      console.error(event.clientX, event.clientY)
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

  renderButton =() => (
    <div>
      <Checkbox
        label="Draw mode"
        checked={this.state.drawMode}
        onCheck={this.switchDrawMode}
      />
      <RaisedButton
        label="Apply filter"
        onClick={this.applyFilter}
      />
    </div>
  )

  render() {
    const canvaStyle = {
      border: 'none',
      width: '100%',
      height: '100%',
      minWidth: 0,
      minHeight: 0,
      margin: 0,
      padding: 0,
    }

    return (

      <div
        style={{
          display: 'flex', flexGrow: 1, flexShrink: 1, flexDirection: 'row', alignItems: 'stretch',
        }}
      >
        <div style={{
          flexGrow: 3,
          flexShrink: 3,
          flexBasis: 0,
          minHeight: 0,
          minWidth: 0,
          margin: 'auto',
        }}
        >

          <canvas
            key="canvas"
            id="MizarCanvas"
            style={canvaStyle}
            onMouseUp={this.onMouseUp}
            onMouseDown={this.onMouseDown}
            onMouseMove={this.onMouseMove}
          />

        </div>
        <div style={{
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: 0,
          minHeight: 0,
          minWidth: 0,
        }}
        >
          <table>
            <td>
              <tr>Plop</tr>
              <tr>Plop</tr>
            </td>
          </table>
        </div>
      </div>

    )
  }
}
