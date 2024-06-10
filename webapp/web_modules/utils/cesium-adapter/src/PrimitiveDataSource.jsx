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
import get from 'lodash/get'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
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
    // eslint-disable-next-line react/no-unused-prop-types
    strokeWidth: PropTypes.number.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    name: PropTypes.string.isRequired, // data source name. used to set keys on primitives
  }

  static defaultProps = {
    features: {},
  }

  state = {
    primitives: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
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
      features, stroke, strokeWidth, name,
    } = newProps
    // when available values change, rebuild the hints datasource (avoids consuming time and memory at render)
    if (!isEqual(oldProps.features, features)) {
      this.setState({
        primitives: features && !isEmpty(features) ? PrimitiveDataSource.buildPrimitives(features, stroke, strokeWidth, name) : null,
      })
    }
  }

  /**
   * Builds Resium's Primitives components from features.
   * @param {Array<GeoJsonFeature>} features
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @returns a primitive component for each features
   */
  buildPrimitives = (features, outlineColor, outlineWidth = 1, dataSourceName = 'default') => {
    const polygonAndLineFeatures = this.getFeatures(features, [PrimitiveHelpers.GEOJSON_TYPES.POLYGON, PrimitiveHelpers.GEOJSON_TYPES.MULTI_POLYGON, PrimitiveHelpers.GEOJSON_TYPES.LINE_STRING])
    let pointFeatures = []
    const primitives = []
    if (polygonAndLineFeatures.length < features.length) {
      pointFeatures = this.getFeatures(features, [PrimitiveHelpers.GEOJSON_TYPES.POINT])
    }
    if (!isEmpty(polygonAndLineFeatures)) {
      const polygonPolylinePrimitive = PrimitiveHelpers.buildPolylinePrimitive(polygonAndLineFeatures, outlineColor, outlineWidth, dataSourceName)
      primitives.push(polygonPolylinePrimitive)
    }
    if (!isEmpty(pointFeatures)) {
      const pointPrimitive = PrimitiveHelpers.buildPointPrimitive(pointFeatures, outlineColor, outlineWidth, dataSourceName)
      primitives.push(pointPrimitive)
    }
    return primitives
  }

  /**
   * Retrieve list of features depending on their type
   * @param {Array<GeoJsonFeature>} features
   * @param {Array<PrimitiveDataSource.GEOJSON_TYPES>} featureTypes
   * @returns
   */
  getFeatures = (features, featureTypes) => filter(features, (feature) => includes(featureTypes, get(feature, 'geometry.type')))

  render() {
    const { primitives } = this.state
    return primitives
  }
}
export default PrimitiveDataSource
