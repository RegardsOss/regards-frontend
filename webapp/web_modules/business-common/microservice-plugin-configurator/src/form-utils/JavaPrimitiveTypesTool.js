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
import { RenderTextField, RenderCheckbox, ValidationHelpers } from '@regardsoss/form-utils'
import { PluginParameterTypes } from '@regardsoss/domain/common'

/**
 * Map a PluginParameterType to an object { component: ReduxFormFieldComponent, type: fieldTypeParameter }
 * @param {string} type
 * @return {{component: React.Component, type: string}} component class and type for primitive or null
 */
export const getPrimitiveJavaTypeRenderParameters = (type) => {
  switch (type) {
    case PluginParameterTypes.STRING:
      return {
        component: RenderTextField,
        type: 'text',
      }
    case PluginParameterTypes.INTEGER:
    case PluginParameterTypes.BYTE:
    case PluginParameterTypes.SHORT:
    case PluginParameterTypes.LONG:
    case PluginParameterTypes.FLOAT:
    case PluginParameterTypes.DOUBLE:
      return {
        component: RenderTextField,
        type: 'number',
      }
    case PluginParameterTypes.BOOLEAN:
      return {
        component: RenderCheckbox,
        type: 'boolean',
      }
    default:
      return null
  }
}

/**
 * Map a PluginParameterType to an optional field validator (might be empty)
 * @param {*} type
 * @return {Function} validator function or none
 */
export const getPrimitiveJavaTypeValidators = (type) => {
  switch (type) {
    case PluginParameterTypes.BYTE:
      return ValidationHelpers.javaByteValidator
    case PluginParameterTypes.INTEGER:
      return ValidationHelpers.javaIntegerValidator
    case PluginParameterTypes.LONG:
      return ValidationHelpers.javaLongValidator
    case PluginParameterTypes.FLOAT:
      return ValidationHelpers.javaFloatValidator
    case PluginParameterTypes.DOUBLE:
      return ValidationHelpers.javaDoubleValidator
    case PluginParameterTypes.SHORT:
      return ValidationHelpers.javaShortValidator
    default:
      return null
  }
}
