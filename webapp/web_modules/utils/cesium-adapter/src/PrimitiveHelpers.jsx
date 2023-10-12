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
import flattenDeep from 'lodash/flattenDeep'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'
import { Primitive, PointPrimitive, PointPrimitiveCollection } from 'resium'
import {
  Cartesian3, GeometryInstance, PolylineGeometry,
  ArcType, PolylineMaterialAppearance, Material,
} from 'cesium'

/**
 * Set of functions to help to build Resium's primitive components
 * @author Théo Lasserre
 */
class PrimitiveHelpers {
  /**
   * Builds a Resium's Polyline Primitive component from a feature.
   * @param {GeoJsonFeature} features
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @param {number} index used for primitive unique key
   * @returns a polyline primitive component or null if feature's coordinates are unprocessable
   */
  static buildPolylinePrimitive(features, outlineColor, outlineWidth = 1, dataSourceName = 'default') {
    const polylineGeometryInstances = []
    forEach(features, (feature) => {
      const geometryType = get(feature, 'geometry.type')
      const coordinates = get(feature, 'geometry.coordinates')
      // feature must have a geometry type and coordinates
      if (geometryType && coordinates) {
        forEach(coordinates, (coord) => {
          const positions = flattenDeep(coord)
          const polylineGeometryInstance = new GeometryInstance({
            id: feature.id,
            geometry: new PolylineGeometry({
              positions: Cartesian3.fromDegreesArray(positions),
              arcType: ArcType.GEODESIC,
              width: outlineWidth,
            }),
          })
          polylineGeometryInstances.push(polylineGeometryInstance)
        })
      }
    })
    if (!isEmpty(polylineGeometryInstances)) {
      const polylineAppearance = new PolylineMaterialAppearance({
        material: Material.fromType('Color', {
          color: outlineColor,
        }),
      })
      return (<Primitive key={`polyline-${dataSourceName}`} id={dataSourceName} geometryInstances={polylineGeometryInstances} appearance={polylineAppearance} />)
    }
    return null
  }

  /**
   * Builds a Resium's Point Primitive component from a feature.
   * @param {GeoJsonFeature} features
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @param {number} index used for primitive unique key
   * @returns a point primitive component or null if feature's coordinates are unprocessable
   */
  static buildPointPrimitive(features, outlineColor, outlineWidth = 1, dataSourceName = 'default') {
    const pointPrimitives = []
    forEach(features, (feature) => {
      const coordinates = get(feature, 'geometry.coordinates')
      if (coordinates) {
        // we use Cartesian3.fromDegreesArray instead of Cartesian3.fromArray because Cartesian3.fromArray doesn't compile z value.
        const positions = Cartesian3.fromDegreesArray(coordinates)
        if (positions.length > 0) {
          pointPrimitives.push(
            <PointPrimitive
              id={feature.id}
              key={feature.id}
              color={outlineColor}
              outlineColor={outlineColor}
              outlineWidth={outlineWidth}
              position={positions[0]}
            />,
          )
        }
      }
    })
    if (!isEmpty(pointPrimitives)) {
      return (
        <PointPrimitiveCollection key={`point-${dataSourceName}`}>
          {pointPrimitives}
        </PointPrimitiveCollection>
      )
    }
    return null
  }
}
export default PrimitiveHelpers
