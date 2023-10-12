/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import {
  Math, OpenStreetMapImageryProvider, WebMapServiceImageryProvider, WebMapTileServiceImageryProvider, BingMapsImageryProvider, Cartographic, Rectangle, Ellipsoid,
} from 'cesium'
import { UIDomain } from '@regardsoss/domain'

// When drawing, limit latitude render cause it cause crash.
const POSITIV_LIMIT_DRAW_AUTHORIZED_LATITUDE = 85
const NEGATIV_LIMIT_DRAW_AUTHORIZED_LATITUDE = -85

export function getImageryProvider(layerInfo, rectangle = null, maximumLevel = 19) {
  const imageryProviderParameters = {
    ...layerInfo,
    ...layerInfo.conf,
    maximumLevel,
    url: layerInfo.baseUrl,
    rectangle,
  }
  switch (layerInfo.type) {
    case UIDomain.CESIUM_LAYER_TYPES_ENUM.OSM:
      return new OpenStreetMapImageryProvider(imageryProviderParameters)
    case UIDomain.CESIUM_LAYER_TYPES_ENUM.WMS:
      return new WebMapServiceImageryProvider(imageryProviderParameters)
    case UIDomain.CESIUM_LAYER_TYPES_ENUM.WMTS:
      return new WebMapTileServiceImageryProvider(imageryProviderParameters)
    case UIDomain.CESIUM_LAYER_TYPES_ENUM.Bing:
      return new BingMapsImageryProvider(imageryProviderParameters)
    default:
      console.error('Unsupported background image, fallback to OSM')
  }
  return new OpenStreetMapImageryProvider()
}

function computeLatitude(latValue) {
  let computedLatitude = latValue
  if (computedLatitude > POSITIV_LIMIT_DRAW_AUTHORIZED_LATITUDE) {
    computedLatitude = POSITIV_LIMIT_DRAW_AUTHORIZED_LATITUDE
  } else if (computedLatitude < NEGATIV_LIMIT_DRAW_AUTHORIZED_LATITUDE) {
    computedLatitude = NEGATIV_LIMIT_DRAW_AUTHORIZED_LATITUDE
  }
  return computedLatitude
}

export function buildRectangleFromGeometry(geometry) {
  const lat1 = computeLatitude(geometry.coordinates[0][0][1])
  const lat2 = computeLatitude(geometry.coordinates[0][2][1])
  return Rectangle.fromCartographicArray([
    Cartographic.fromDegrees(
      geometry.coordinates[0][0][0],
      lat1),
    Cartographic.fromDegrees(
      geometry.coordinates[0][2][0],
      lat2,
    )])
}

export function buildRectangleFromPoints(firstPoint, secondPoint) {
  return Rectangle.fromCartographicArray([
    Cartographic.fromDegrees(
      firstPoint[0],
      firstPoint[1]),
    Cartographic.fromDegrees(
      secondPoint[0],
      secondPoint[1],
    )])
}

export function getLatLongFromCartesian3(cartesian3Point) {
  const carto = Ellipsoid.WGS84.cartesianToCartographic(cartesian3Point)
  return [
    Math.toDegrees(carto.longitude),
    Math.toDegrees(carto.latitude),
  ]
}
