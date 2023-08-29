/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import reduce from 'lodash/reduce'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { GeoJsonFeature } from '@regardsoss/mizar-adapter'
import PrimitiveHelpers from './PrimitiveHelpers'

/**
 * Build Resium's Primitives components from features
 * @author Théo Lasserre
 */
class PrimitiveDataSource extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    features: PropTypes.arrayOf(GeoJsonFeature),
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    stroke: PropTypes.object.isRequired, // Cesium Color
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    fill: PropTypes.object.isRequired, // Cesium Color
    // eslint-disable-next-line react/no-unused-prop-types
    strokeWidth: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    name: PropTypes.string.isRequired, // data source name. used to set keys on primitives
  }

  static defaultProps = {
    features: {},
  }

  static GEOJSON_TYPES = {
    POLYGON: 'Polygon',
    LINE_STRING: 'LineString',
    POINT: 'Point',
    MULTI_POLYGON: 'MultiPolygon',
  }

  state = {
    primitives: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
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
      features, stroke, strokeWidth, fill, name,
    } = newProps
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (!isEqual(oldProps.features, features)) {
      this.setState({
        primitives: features && !isEmpty(features) ? this.buildPrimitives(features, fill, stroke, strokeWidth, name) : null,
      })
    }
  }

  /**
   * Builds Resium's Primitives components from features.
   * @param {Array<GeoJsonFeature>} features
   * @param {Color} fill
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @returns a primitive component for each features
   */
  buildPrimitives = (features, fill, outlineColor, outlineWidth = 1, dataSourceName = 'default') => reduce(features, (acc, feature, index) => {
    const geometryType = get(feature, 'geometry.type')
    const coordinates = get(feature, 'geometry.coordinates')
    // feature must have a geometry type and coordinates
    if (geometryType && coordinates) {
      let newPrimitive = null
      if (geometryType === PrimitiveDataSource.GEOJSON_TYPES.POLYGON || geometryType === PrimitiveDataSource.GEOJSON_TYPES.MULTI_POLYGON) {
        newPrimitive = PrimitiveHelpers.buildPolygonPrimitives(feature, fill, outlineColor, outlineWidth, dataSourceName, index)
      } else if (geometryType === PrimitiveDataSource.GEOJSON_TYPES.LINE_STRING) {
        newPrimitive = PrimitiveHelpers.buildPolylinePrimitive(feature, outlineColor, outlineWidth, dataSourceName, index)
      } else if (geometryType === PrimitiveDataSource.GEOJSON_TYPES.POINT) {
        newPrimitive = PrimitiveHelpers.buildPointPrimitive(feature, outlineColor, outlineWidth, dataSourceName, index)
      }
      if (newPrimitive) {
        acc.push(newPrimitive)
      }
    }
    return acc
  }, [])

  render() {
    const { primitives } = this.state
    console.error('ddd : ', this.props.features, primitives)
    return primitives
  }
}
export default PrimitiveDataSource
