/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import {
  BooleanValueRender, DateArrayValueRender, DateRangeValueRender, DateValueRender,
  NumberValueRender, RangeValueRender, StringArrayValueRender, StringValueRender,
  URLValueRender, TableColumnBuilder,
} from '@regardsoss/components'
import RawDataAttributeRender from './RawDataAttributeRender'
import ThumbnailAttributeRender from './ThumbnailAttributeRender'

/**
 * Provides tools to render an attribute directly or in an infinite table (providing a path and an optional type)
 */

/** Standard render types enum */
const TYPES_ENUM = {
  DEFAULT: 'DEFAULT',
  BOOLEAN: 'BOOLEAN',
  DATE_ISO8601: 'DATE_ISO8601',
  DATE_INTERVAL: 'DATE_INTERVAL',
  DATE_ARRAY: 'DATE_ARRAY',
  DOUBLE: 'DOUBLE',
  DOUBLE_INTERVAL: 'DOUBLE_INTERVAL',
  DOWNLOAD_LINK: 'DOWNLOAD_LINK',
  INTEGER: 'INTEGER',
  INTEGER_INTERVAL: 'INTEGER_INTERVAL',
  LONG: 'LONG',
  LONG_INTERVAL: 'LONG_INTERVAL',
  STRING: 'STRING',
  STRING_ARRAY: 'STRING_ARRAY',
  THUMBNAIL: 'THUMBNAIL',
  URL: 'URL',
}

/**
 * Enum to associate attribute types to sRender renderer component.
 * @author Sébastien Binda
 */
const typeToRenderMap = {
  // Default render
  [TYPES_ENUM.DEFAULT]: StringValueRender,
  // Render by type
  [TYPES_ENUM.BOOLEAN]: BooleanValueRender,
  [TYPES_ENUM.DATE_ISO8601]: DateValueRender,
  [TYPES_ENUM.DATE_INTERVAL]: DateRangeValueRender,
  [TYPES_ENUM.DATE_ARRAY]: DateArrayValueRender,
  [TYPES_ENUM.DOUBLE]: NumberValueRender,
  [TYPES_ENUM.DOUBLE_INTERVAL]: RangeValueRender,
  [TYPES_ENUM.DOWNLOAD_LINK]: RawDataAttributeRender,
  [TYPES_ENUM.INTEGER]: NumberValueRender,
  [TYPES_ENUM.INTEGER_INTERVAL]: RangeValueRender,
  [TYPES_ENUM.LONG]: NumberValueRender,
  [TYPES_ENUM.LONG_INTERVAL]: RangeValueRender,
  [TYPES_ENUM.STRING]: StringValueRender,
  [TYPES_ENUM.STRING_ARRAY]: StringArrayValueRender,
  [TYPES_ENUM.THUMBNAIL]: ThumbnailAttributeRender,
  [TYPES_ENUM.URL]: URLValueRender,
}

/**
 * Returns render for type as parameter
 * @param
 * @return render component for attribute
 */
function getTypeRender(type = 'DEFAULT') {
  return typeToRenderMap[type] || typeToRenderMap.DEFAULT
}

/**
 * Builds a property cell render delegate
 * @param {*} path property path
 * @param {*} type property type, from TYPES_ENUM, optional
 */
function buildRenderDelegate(path, type) {
  return {
    path,
    RenderConstructor: type ? getTypeRender(type) : undefined,
  }
}

/**
 * Builds a property cell for properties with types (from TYPES_ENUM, optional) as parameter
 * @param {[{path: string, type: string}]} properties properties list (type is optional)
 */
function buildPropertyCellRender(properties) {
  return TableColumnBuilder.buildPropertiesRenderCell(
    properties.map(({ path, type }) => buildRenderDelegate(path, type)))
}

/**
 * Builds an infinite table cell render (opened for external consumers)
 * @param {*} type type to render
 * @param {path: string}: path render
 * @param {type: string}: type, from TYPES_ENUM, optional
 */
function buildSinglePropertyCellRender(path, type) {
  return buildPropertyCellRender([{ path, type }])
}


module.exports = {
  buildPropertyCellRender,
  buildRenderDelegate,
  buildSinglePropertyCellRender,
  getTypeRender,
}
