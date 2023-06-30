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
import forEach from 'lodash/forEach'

/**
 * Transforsm points into a box with {min/max}{X/Y} fields and empty information field
 * @param {[number]} point1 first point as coordinates array
 * @param {[number]} point2 second point as coordinates array
 * @return {{empty: boolean, minX: number, maxX: number,minY: number, maxY: number}} transformed box, never null, with all fields provided
 */
export function toBoxCoordinates(point1, point2) {
  if (point1 && point2) {
    const [p1X, p1Y] = point1
    const [p2X, p2Y] = point2
    const minX = Math.min(p1X, p2X)
    const maxX = Math.max(p1X, p2X)
    const minY = Math.min(p1Y, p2Y)
    const maxY = Math.max(p1Y, p2Y)
    return {
      minX,
      maxX,
      minY,
      maxY,
      empty: minX === maxX || minY === maxY,
    }
  }
  return {
    empty: true,
    minX: 0,
    maxX: 0,
    minY: 0,
    maxY: 0,
  }
}

/**
 * Builds a feature from id and points as parameter
 * @param {string} id
 * @param {*} point1 first point as resolved by Mizar (array)
 * @param {*} point2 second point as resolved by Mizar (array)
 * @retun {*} Geo feature (matching GeoJsonFeature)
 */
export function toAreaFeature(featureId, point1, point2) {
  const {
    minX, maxX, minY, maxY, empty,
  } = toBoxCoordinates(point1, point2)
  if (!empty) {
    // area is not empty
    return {
      id: '0',
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        bbox: [minX, minY, maxX, maxY],
        coordinates: [[[minX, minY],
          [maxX, minY],
          [maxX, maxY],
          [minX, maxY],
          [minX, minY],
        ]],
      },
    }
  }
  return null
}

/**
 * Builds a feature from id and geometry as parameter
 * @param {string} id
 * @param {*} geometry
 * @retun {*} Geo feature (matching GeoJsonFeature)
 */
export function geometryToAreaFeature(featureId, geometry) {
  if (geometry) {
    const ptX = []
    const ptY = []
    forEach(geometry.coordinates, (coordinate) => {
      forEach(coordinate, (coord) => {
        if (geometry.type === 'MultiPolygon') {
          forEach(coord, (co) => {
            ptX.push(co[0])
            ptY.push(co[1])
          })
        } else {
          ptX.push(coord[0])
          ptY.push(coord[1])
        }
      })
    })
    const minX = Math.min.apply(null, ptX)
    const maxX = Math.max.apply(null, ptX)
    const minY = Math.min.apply(null, ptY)
    const maxY = Math.max.apply(null, ptY)
    return {
      id: featureId,
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        bbox: [minX, minY, maxX, maxY],
        coordinates: [[[minX, minY],
          [maxX, minY],
          [maxX, maxY],
          [minX, maxY],
          [minX, minY],
        ]],
      },
    }
  }
  return null
}
