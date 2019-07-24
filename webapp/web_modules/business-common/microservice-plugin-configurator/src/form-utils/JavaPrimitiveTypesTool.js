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
import { RenderTextField, RenderCheckbox, ValidationHelpers } from '@regardsoss/form-utils'

/**
 * Java primitive tools to handle forms
 * @author Sébastien Binda
 */

/** Supported Java Primitive types */
export const PRIMITIVE_JAVA_TYPES = {
  Boolean: 'java.lang.Boolean',
  boolean: 'boolean',
  Byte: 'java.lang.Byte',
  byte: 'byte',
  Double: 'java.lang.Double',
  double: 'double',
  Float: 'java.lang.Float',
  float: 'float',
  Integer: 'java.lang.Integer',
  int: 'int',
  Long: 'java.lang.Long',
  long: 'long',
  Short: 'java.lang.Short',
  short: 'short',
  String: 'java.lang.String',
}

/**
 * Map a Java primitive type to an object { component: ReduxFormFieldComponent, type: fieldTypeParameter }
 * @param {string} type
 * @return {{component: React.Component, type: string}} component class and type for primitive or null
 */
export const getPrimitiveJavaTypeRenderParameters = (type) => {
  switch (type) {
    case PRIMITIVE_JAVA_TYPES.String:
      return {
        component: RenderTextField,
        type: 'text',
      }
    case PRIMITIVE_JAVA_TYPES.Byte:
    case PRIMITIVE_JAVA_TYPES.byte:
    case PRIMITIVE_JAVA_TYPES.Integer:
    case PRIMITIVE_JAVA_TYPES.int:
    case PRIMITIVE_JAVA_TYPES.Long:
    case PRIMITIVE_JAVA_TYPES.long:
    case PRIMITIVE_JAVA_TYPES.Float:
    case PRIMITIVE_JAVA_TYPES.float:
    case PRIMITIVE_JAVA_TYPES.Double:
    case PRIMITIVE_JAVA_TYPES.double:
    case PRIMITIVE_JAVA_TYPES.Short:
    case PRIMITIVE_JAVA_TYPES.short:
      return {
        component: RenderTextField,
        type: 'number',
      }
    case PRIMITIVE_JAVA_TYPES.Boolean:
    case PRIMITIVE_JAVA_TYPES.boolean:
      return {
        component: RenderCheckbox,
        type: 'boolean',
      }
    default:
      return null
  }
}

/**
 * Map a Java primitive type to an optional field validator (might be empty)
 * @param {*} type
 * @return {Function} validator function or none
 */
export const getPrimitiveJavaTypeValidators = (type) => {
  switch (type) {
    case PRIMITIVE_JAVA_TYPES.Byte:
    case PRIMITIVE_JAVA_TYPES.byte:
      return ValidationHelpers.javaByteValidator
    case PRIMITIVE_JAVA_TYPES.Integer:
    case PRIMITIVE_JAVA_TYPES.int:
      return ValidationHelpers.javaIntegerValidator
    case PRIMITIVE_JAVA_TYPES.Long:
    case PRIMITIVE_JAVA_TYPES.long:
      return ValidationHelpers.javaLongValidator
    case PRIMITIVE_JAVA_TYPES.Float:
    case PRIMITIVE_JAVA_TYPES.float:
      return ValidationHelpers.javaFloatValidator
    case PRIMITIVE_JAVA_TYPES.Double:
    case PRIMITIVE_JAVA_TYPES.double:
      return ValidationHelpers.javaDoubleValidator
    case PRIMITIVE_JAVA_TYPES.Short:
    case PRIMITIVE_JAVA_TYPES.short:
      return ValidationHelpers.javaShortValidator
    default:
      return null
  }
}
