/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { RenderTextField, RenderCheckbox } from '@regardsoss/form-utils'

/**
 * Map a Java primitive type to an object { component: ReduxFormFieldComponent, type: fieldTypeParameter }
 * @author Sébastien Binda
 * @param {*} type
 */
const getPrimitiveJavaTypeRenderParameters = (type) => {
  switch (type) {
    case 'java.lang.String':
      return {
        component: RenderTextField,
        type: 'text',
      }
    case 'java.lang.Byte':
    case 'byte':
    case 'java.lang.Integer':
    case 'int':
    case 'java.lang.Long':
    case 'long':
    case 'java.lang.Float':
    case 'float':
    case 'java.lang.Double':
    case 'double':
    case 'java.lang.Short':
    case 'short':
      return {
        component: RenderTextField,
        type: 'number',
      }
    case 'java.lang.Boolean':
    case 'boolean':
      return {
        component: RenderCheckbox,
        type: 'boolean',
      }
    default:
      return null
  }
}

module.exports = {
  getPrimitiveJavaTypeRenderParameters,
}
