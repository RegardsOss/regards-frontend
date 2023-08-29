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
import map from 'lodash/map'
import { Primitive, PointPrimitive, PointPrimitiveCollection } from 'resium'
import {
  Cartesian3, GeometryInstance, PolylineGeometry, PolygonHierarchy,
  ArcType, PolylineMaterialAppearance, Material, PolygonGeometry, MaterialAppearance,
} from 'cesium'

/**
 * Set of functions to help to build Resium's primitive components
 * @author Théo Lasserre
 */
class PrimitiveHelpers {
  /**
   * Builds Resium's polygon & polyline primitive components from a feature.
   * It is necessary to build polygon & outline separated since primitives are lowest level entities.
   * @param {GeoJsonFeature} feature
   * @param {Color} fill
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @param {number} index used for primitive unique key
   * @returns a polygon & polyline primitive components or null if feature's coordinates are unprocessable
   */
  static buildPolygonPrimitives(feature, fill, outlineColor, outlineWidth = 1, dataSourceName = 'default', index = 0) {
    const coordinates = get(feature, 'geometry.coordinates')
    if (coordinates) {
      const polylineAppearance = new PolylineMaterialAppearance({
        material: Material.fromType('Color', {
          color: outlineColor,
        }),
      })
      const polygonAppearance = new MaterialAppearance({
        material: Material.fromType('Color', {
          color: fill,
        }),
      })
      return map(coordinates, (coord, coordIndex) => {
        const positions = flattenDeep(coord)
        const polylineGeometryInstance = new GeometryInstance({
          id: feature.id,
          geometry: new PolylineGeometry({
            positions: Cartesian3.fromDegreesArray(positions),
            arcType: ArcType.GEODESIC,
            width: outlineWidth,
          }),
        })
        const polygonGeometryInstance = new GeometryInstance({
          id: feature.id,
          geometry: new PolygonGeometry({
            polygonHierarchy: new PolygonHierarchy(Cartesian3.fromDegreesArray(positions)),
          }),
        })
        return ([<Primitive key={`polygon-outline-${dataSourceName}-${index}-${coordIndex}-${feature.id}`} id={feature.id} geometryInstances={polylineGeometryInstance} appearance={polylineAppearance} />,
          <Primitive key={`polygon-${dataSourceName}-${index}-${coordIndex}-${feature.id}`} id={feature.id} geometryInstances={polygonGeometryInstance} appearance={polygonAppearance} />])
      })
    }
    return null
  }

  /**
   * Builds a Resium's Polyline Primitive component from a feature.
   * @param {GeoJsonFeature} feature
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @param {number} index used for primitive unique key
   * @returns a polyline primitive component or null if feature's coordinates are unprocessable
   */
  static buildPolylinePrimitive(feature, outlineColor, outlineWidth = 1, dataSourceName = 'default', index = 0) {
    const coordinates = get(feature, 'geometry.coordinates')
    if (coordinates) {
      const polylineAppearance = new PolylineMaterialAppearance({
        material: Material.fromType('Color', {
          color: outlineColor,
        }),
      })
      const flatCoords = flattenDeep(coordinates)
      const polylineGeometryInstance = new GeometryInstance({
        id: feature.id,
        geometry: new PolylineGeometry({
          positions: Cartesian3.fromDegreesArray(flatCoords),
          width: outlineWidth,
        }),
      })
      return (<Primitive key={`polyline-${dataSourceName}-${index}-${feature.id}`} id={feature.id} geometryInstances={polylineGeometryInstance} appearance={polylineAppearance} />)
    }
    return null
  }

  /**
   * Builds a Resium's Point Primitive component from a feature.
   * @param {GeoJsonFeature} feature
   * @param {Color} outlineColor
   * @param {number} outlineWidth
   * @param {string} dataSourceName used for primitive unique key
   * @param {number} index used for primitive unique key
   * @returns a point primitive component or null if feature's coordinates are unprocessable
   */
  static buildPointPrimitive(feature, outlineColor, outlineWidth = 1, dataSourceName = 'default', index = 0) {
    const coordinates = get(feature, 'geometry.coordinates')
    if (coordinates) {
      // we use Cartesian3.fromDegreesArray instead of Cartesian3.fromArray because Cartesian3.fromArray doesn't compile z value.
      const positions = Cartesian3.fromDegreesArray(coordinates)
      return (positions.length > 0
        ? <PointPrimitiveCollection key={`point-${dataSourceName}-${index}-${feature.id}`}>
          <PointPrimitive
            id={feature.id}
            color={outlineColor}
            outlineColor={outlineColor}
            outlineWidth={outlineWidth}
            position={positions[0]}
          />
        </PointPrimitiveCollection>
        : null)
    }
    return null
  }
}
export default PrimitiveHelpers
