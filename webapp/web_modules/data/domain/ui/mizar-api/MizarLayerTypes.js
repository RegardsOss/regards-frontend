/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'

/**
 * Mizar layer types, from mizar:Utils/Constants.js
 * @author Raphaël Mechali
 */

export const MIZAR_LAYER_TYPES_ENUM = {
  AsynchroneWMS: 'AsynchroneWMS',
  WMS: 'WMS',
  WMTS: 'WMTS',
  WMSElevation: 'WMSElevation',
  WCSElevation: 'WCSElevation',
  GeoJSON: 'GeoJSON',
  Vector: 'Vector',
  Atmosphere: 'Atmosphere',
  Bing: 'Bing',
  GroundOverlay: 'GroundOverlay',
  OSM: 'OSM',
  TileWireframe: 'TileWireframe',
  HipsGrid: 'HipsGrid',
  CoordinateGrid: 'CoordinateGrid',
  HipsFits: 'HipsFits',
  Hips: 'Hips',
  HipsCat: 'HipsCat',
  Moc: 'Moc',
  OpenSearch: 'OpenSearch',
}

export const MIZAR_LAYER_TYPES = values(MIZAR_LAYER_TYPES_ENUM)
