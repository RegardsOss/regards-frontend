/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { DamDomain } from '@regardsoss/domain'
import {
  BooleanValueRender,
  DateArrayValueRender, DateRangeValueRender, DateValueRender,
  NumberArrayValueRender, NumberRangeValueRender, NumberValueRender,
  StringArrayValueRender, StringValueRender,
  URLValueRender,
} from '@regardsoss/components'
import ThumbnailAttributeRender from './ThumbnailAttributeRender'

/**
 * Provides tools to render an attribute directly or in an infinite table (providing a path and an optional type)
 */

const DEFAULT_RENDER = StringValueRender

/**
 * Enum to associate attribute types to sRender renderer component.
 * @author Sébastien Binda
 */
const typeToRenderMap = {
  // Render by type
  [DamDomain.MODEL_ATTR_TYPES.STRING]: StringValueRender,
  [DamDomain.MODEL_ATTR_TYPES.INTEGER]: NumberValueRender,
  [DamDomain.MODEL_ATTR_TYPES.DOUBLE]: NumberValueRender,
  [DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601]: DateValueRender,
  [DamDomain.MODEL_ATTR_TYPES.URL]: URLValueRender,
  [DamDomain.MODEL_ATTR_TYPES.BOOLEAN]: BooleanValueRender,
  [DamDomain.MODEL_ATTR_TYPES.STRING_ARRAY]: StringArrayValueRender,
  [DamDomain.MODEL_ATTR_TYPES.INTEGER_ARRAY]: NumberArrayValueRender,
  [DamDomain.MODEL_ATTR_TYPES.DOUBLE_ARRAY]: NumberArrayValueRender,
  [DamDomain.MODEL_ATTR_TYPES.DATE_ARRAY]: DateArrayValueRender,
  [DamDomain.MODEL_ATTR_TYPES.INTEGER_INTERVAL]: NumberRangeValueRender,
  [DamDomain.MODEL_ATTR_TYPES.DOUBLE_INTERVAL]: NumberRangeValueRender,
  [DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL]: DateRangeValueRender,
  [DamDomain.MODEL_ATTR_TYPES.LONG]: NumberValueRender,
  [DamDomain.MODEL_ATTR_TYPES.LONG_INTERVAL]: NumberRangeValueRender,
  [DamDomain.MODEL_ATTR_TYPES.LONG_ARRAY]: StringArrayValueRender, // units are not rendered now
}

/**
 * Returns render for type as parameter
 * @param {string} type type if known (returns default render otherwise)
 * @return render component for attribute
 */
export function getTypeRender(type) {
  return typeToRenderMap[type] || DEFAULT_RENDER
}

/**
 * Builds a property cell render delegate
 * @param {*} path property path
 * @param {*} type property type, from TYPES_ENUM, optional
 * @param {number} precision precision (for numeric type only, optionnal)
 * @param {string} unit  unit (for numeric type only, optionnal)
 */
export function buildRenderDelegate(path, type, precision, unit) {
  return {
    path,
    RenderConstructor: type ? getTypeRender(type) : undefined,
    props: { precision, unit }, // prece unit to value render when provided with attribute
  }
}

export function buildThumbnailRenderDelegate(path) {
  return {
    path,
    RenderConstructor: ThumbnailAttributeRender,
  }
}
