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
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import { createRef } from 'react'
import isEqual from 'lodash/isEqual'
import {
  ImageryLayer,
} from 'resium'
import { getImageryProvider } from './CesiumHelper'
import withCesiumBackgroundLayerHOC from './CesiumBackgroundLayerHOC'

/**
 * Background Layer
 */
export class BackgroundLayerComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    rectangle: PropTypes.shape({
      east: PropTypes.number,
      north: PropTypes.number,
      south: PropTypes.number,
      west: PropTypes.number,
    }), // HOC Prop - when defined, the rectangle that restrict the zone to display

    // eslint-disable-next-line react/no-unused-prop-types
    layers: PropTypes.arrayOf(UIShapes.LayerDefinition).isRequired, // Cesium Adapter props
    // eslint-disable-next-line react/no-unused-prop-types
    viewMode: PropTypes.oneOf(UIDomain.MAP_VIEW_MODES).isRequired, // view management
  }

  state = {
    backgroundVisibleProvider: null,
  }

  backgroundVisibleImageryRef = createRef()

  static getBackgroundVisibleProvider = (layers, viewMode, rectangle) => {
    const backgroundLayerInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    return getImageryProvider(backgroundLayerInfo, rectangle)
  }

  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

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
      viewMode, layers, rectangle,
    } = newProps
    const oldState = this.state || {}
    const newState = { ...oldState }

    if (!isEqual(oldProps.rectangle, rectangle)) {
      newState.backgroundVisibleProvider = BackgroundLayerComponent.getBackgroundVisibleProvider(layers, viewMode, rectangle)
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  render() {
    const {
      backgroundVisibleProvider,
    } = this.state

    return (
      <ImageryLayer
        ref={this.backgroundVisibleImageryRef}
        imageryProvider={backgroundVisibleProvider}
      />
    )
  }
}
export default withCesiumBackgroundLayerHOC(BackgroundLayerComponent)
