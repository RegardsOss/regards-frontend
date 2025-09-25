/**
 * Copyright 2017-2025 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import { UIShapes } from '@regardsoss/shape'
import { UIDomain } from '@regardsoss/domain'
import isEqual from 'lodash/isEqual'
import {
  ImageryLayer,
} from 'resium'
import { Rectangle } from 'cesium'
import { getImageryProvider, buildDateLineRectangle } from './CesiumHelper'
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
    backgroundVisibleProviders: [],
  }

  static getBackgroundVisibleProvider = (layers, viewMode, rectangle) => {
    const backgroundLayerInfo = UIDomain.getLayersInfo(layers, UIDomain.MAP_LAYER_TYPES_ENUM.BACKGROUND, viewMode, UIDomain.MAP_ENGINE_ENUM.CESIUM)
    return getImageryProvider(backgroundLayerInfo, rectangle)
  }

  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
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
      viewMode, layers, rectangle,
    } = newProps
    const oldState = this.state || {}
    const newState = { ...oldState }

    if (!isEqual(oldProps.rectangle, rectangle)) {
      const backgroundVisibleProviders = []
      const backgroundVisibleProvider = BackgroundLayerComponent.getBackgroundVisibleProvider(layers, viewMode, rectangle)
      backgroundVisibleProviders.push(backgroundVisibleProvider)

      // If Cesium provider's rectangle is different than local builded rectangle
      // It means that we have a rectangle that cross date line (Cesium don't do that)
      // We need to build missing rectangle layer to complete current one
      const layerRectangle = backgroundVisibleProvider.rectangle
      const isImageryRectangleFull = Rectangle.equals(rectangle, layerRectangle)
      if (rectangle && !isImageryRectangleFull) {
        const missingRectangle = buildDateLineRectangle(rectangle, layerRectangle)
        const backgroundMissingVisibleProvider = BackgroundLayerComponent.getBackgroundVisibleProvider(layers, viewMode, missingRectangle)
        backgroundVisibleProviders.push(backgroundMissingVisibleProvider)
      }

      newState.backgroundVisibleProviders = backgroundVisibleProviders
    }
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
    }
  }

  render() {
    const {
      backgroundVisibleProviders,
    } = this.state

    return (
      map(backgroundVisibleProviders, (backgroundVisibleProvider) => (
        <ImageryLayer
          imageryProvider={backgroundVisibleProvider}
        />
      ))

    )
  }
}
export default withCesiumBackgroundLayerHOC(BackgroundLayerComponent)
