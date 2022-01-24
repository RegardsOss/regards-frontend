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
import has from 'lodash/has'
import throttle from 'lodash/throttle'
import {
  ScreenSpaceEvent, ScreenSpaceEventHandler,
} from 'resium'
import {
  ScreenSpaceEventType, Cartesian3, Math as CesiumMath,
} from 'cesium'

/**
 * Cesium Cursor Position
 */
export default class CesiumCursorPosition extends React.Component {
  static propTypes = {
    cesiumContext: PropTypes.shape({
      current: PropTypes.shape({
        // see Cesium.Viewer
        // eslint-disable-next-line react/forbid-prop-types
        cesiumElement: PropTypes.object,
      }),
    }),
  }

  static elevationWrapperStyle = {
    position: 'absolute',
    right: '20px',
    bottom: '0px',
    backgroundColor: 'white',
    fontFamily: 'Roboto, sans-serif',
    color: 'rgba(0, 0, 0, 0.40)',
    padding: '0 10px',
    lineHeight: '1.5em',
  }

  state = {
    coordText: null, // Cursor coordinates text
  }

  handleSaveCoordinates = throttle(({ endPosition }) => {
    const { cesiumContext } = this.props
    if (has(cesiumContext, 'current.cesiumElement')) {
      const { scene, camera } = cesiumContext.current.cesiumElement
      const { ellipsoid } = scene.globe
      // Mouse over the globe to see the cartographic position
      const cartesian = camera.pickEllipsoid(new Cartesian3(endPosition.x, endPosition.y), ellipsoid)
      if (cartesian) {
        const cartographic = ellipsoid.cartesianToCartographic(cartesian)
        const lon = this.roundNumber(CesiumMath.toDegrees(cartographic.longitude), 3)
        const lat = this.roundNumber(CesiumMath.toDegrees(cartographic.latitude), 3)
        const latPos = lat >= 0 ? lat : -1.0 * lat
        const latOrient = lat >= 0 ? 'N' : 'S'
        const lonPos = lon >= 0 ? lon : -1.0 * lon
        const lonOrient = lon >= 0 ? 'E' : 'W'
        this.setState({
          coordText: `Lat = ${latPos} ${latOrient} x Long = ${lonPos} ${lonOrient}`,
        })
      } else {
        this.setState({
          coordText: null,
        })
      }
    }
  }, 50, { leading: true, trailing: true })

  roundNumber = (num, dec) => (
    Math.round(num * (10 ** dec)) / (10 ** dec)
  )

  render() {
    const { coordText } = this.state

    return (
      <>
        <ScreenSpaceEventHandler>
          <ScreenSpaceEvent
            action={this.handleSaveCoordinates}
            type={ScreenSpaceEventType.MOUSE_MOVE}
          />
        </ScreenSpaceEventHandler>
        {coordText && (<div
          style={CesiumCursorPosition.elevationWrapperStyle}
        >
          {coordText}
        </div>)}
      </>
    )
  }
}
