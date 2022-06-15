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
import keys from 'lodash/keys'
import { DamDomain } from '@regardsoss/domain'
import {
  BooleanValueRender,
  DateArrayValueRender, DateRangeValueRender, DateValueRender,
  NumberArrayValueRender, NumberRangeValueRender, NumberValueRender,
  StringArrayValueRender, StringValueRender,
  URLValueRender,
} from '@regardsoss/components'
import ThumbnailAttributeRender from './ThumbnailAttributeRender'
import URLImageAttributeRender from './URLImageAttributeRender'

/**
 * Provides tools to render an attribute directly or in an infinite table (providing a path and an optional type)
 */

const DEFAULT_RENDER = StringValueRender

export const DEFAULT_RENDERER_KEY = 'defaultRenderer'

/**
 * Enum to associate attribute types to sRender renderer component.
 * @author Sébastien Binda
 * @author Raphaël Mechali
 */
const typeToRenderMap = {
  // Render of type / specific renderer key to renderer (constants React components)
  [DamDomain.MODEL_ATTR_TYPES.STRING]: {
    [DEFAULT_RENDERER_KEY]: StringValueRender, // default renderer
    multiline: (props) => <StringValueRender multilineDisplay {...props} />,
  },
  [DamDomain.MODEL_ATTR_TYPES.INTEGER]: {
    [DEFAULT_RENDERER_KEY]: NumberValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.DOUBLE]: {
    [DEFAULT_RENDERER_KEY]: NumberValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.DATE_ISO8601]: {
    [DEFAULT_RENDERER_KEY]: DateValueRender, // dateWithSeconds
    date: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.date} {...props} />,
    dateWithMinutes: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateWithMinutes} {...props} />,
    dateWithMilliseconds: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateWithMilliseconds} {...props} />,
    time: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.time} {...props} />,
    timeWithMilliseconds: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.timeWithMilliseconds} {...props} />,
    dateIso: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateIso} {...props} />,
  },
  [DamDomain.MODEL_ATTR_TYPES.URL]: {
    [DEFAULT_RENDERER_KEY]: URLValueRender,
    renderImage: (props) => <URLImageAttributeRender {...props} />,
  },
  [DamDomain.MODEL_ATTR_TYPES.BOOLEAN]: {
    [DEFAULT_RENDERER_KEY]: BooleanValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.STRING_ARRAY]: {
    [DEFAULT_RENDERER_KEY]: StringArrayValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.INTEGER_ARRAY]: {
    [DEFAULT_RENDERER_KEY]: NumberArrayValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.DOUBLE_ARRAY]: {
    [DEFAULT_RENDERER_KEY]: NumberArrayValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.DATE_ARRAY]: {
    [DEFAULT_RENDERER_KEY]: DateArrayValueRender, // dateWithSeconds
    date: (props) => <DateArrayValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.date} {...props} />,
    dateWithMinutes: (props) => <DateArrayValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateWithMinutes} {...props} />,
    dateWithMilliseconds: (props) => <DateArrayValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateWithMilliseconds} {...props} />,
    time: (props) => <DateArrayValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.time} {...props} />,
    timeWithMilliseconds: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.timeWithMilliseconds} {...props} />,
    dateIso: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateIso} {...props} />,
  },
  [DamDomain.MODEL_ATTR_TYPES.INTEGER_INTERVAL]: {
    [DEFAULT_RENDERER_KEY]: NumberRangeValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.DOUBLE_INTERVAL]: {
    [DEFAULT_RENDERER_KEY]: NumberRangeValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.DATE_INTERVAL]: {
    [DEFAULT_RENDERER_KEY]: DateRangeValueRender, // dateWithSeconds
    date: (props) => <DateRangeValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.date} {...props} />,
    dateWithMinutes: (props) => <DateRangeValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateWithMinutes} {...props} />,
    dateWithMilliseconds: (props) => <DateRangeValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateWithMilliseconds} {...props} />,
    time: (props) => <DateRangeValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.time} {...props} />,
    timeWithMilliseconds: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.timeWithMilliseconds} {...props} />,
    dateIso: (props) => <DateValueRender formatter={DateValueRender.DEFAULT_FORMATTERS.dateIso} {...props} />,
  },
  [DamDomain.MODEL_ATTR_TYPES.LONG]: {
    [DEFAULT_RENDERER_KEY]: NumberValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.LONG_INTERVAL]: {
    [DEFAULT_RENDERER_KEY]: NumberRangeValueRender,
  },
  [DamDomain.MODEL_ATTR_TYPES.LONG_ARRAY]: {
    [DEFAULT_RENDERER_KEY]: StringArrayValueRender,
  },
  [DamDomain.PSEUDO_ATTR_TYPES.THUMBNAIL_PSEUDO_TYPE]: {
    [DEFAULT_RENDERER_KEY]: ThumbnailAttributeRender,
  },
}

/**
 * Returns existing renderers keys for type as parameter
 * @param {string} type from DamDomain.PSEUDO_ATTR_TYPES
 * @return {[string]} renderer keys for type
 */
export function getTypeRendererKeys(type) {
  return keys(typeToRenderMap[type])
}

/**
 * Returns render for type as parameter
 * @param {string} type type if known (returns default render otherwise)
 * @param {string} renderer specific renderer type, when any (optional)
 * @return render component for attribute
 */
export function getTypeRender(type, renderer) {
  if (type) {
    const typeRenders = typeToRenderMap[type]
    if (typeRenders) {
      const specificRender = typeRenders[renderer || DEFAULT_RENDERER_KEY]
      if (specificRender) {
        return specificRender
      }
    }
  }
  return DEFAULT_RENDER
}

/**
 * Builds a property cell render delegate
 * @param {*} path property path
 * @param {*} type property type, from TYPES_ENUM, optional
 * @param {number} precision precision (for numeric type only, optionnal)
 * @param {string} unit  unit (for numeric type only, optionnal)
 * @param {string} renderer specific renderer type, when any (optional)
 */
export function buildRenderDelegate(path, type, precision, unit, renderer) {
  return {
    path,
    RenderConstructor: getTypeRender(type, renderer),
    props: { precision, unit }, // precision unit to value render when provided with attribute
  }
}
