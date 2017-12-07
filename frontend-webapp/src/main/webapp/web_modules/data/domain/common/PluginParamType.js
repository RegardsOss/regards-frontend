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
import values from 'lodash/values'

/**
 * Possible parameter types
 */
const PluginParameterTypes = {
  PRIMITIVE: 'PRIMITIVE',
  PLUGIN: 'PLUGIN',
  OBJECT: 'OBJECT',
  COLLECTION: 'COLLECTION',
  MAP: 'MAP',
}

/**
 * Possible primitive types
 */
const JavaPrimitiveTypes = {
  BOOLEAN: 'java.lang.Boolean',
  BYTE: 'java.lang.Byte',
  CHARACTER: 'java.lang.Character',
  DOUBLE: 'java.lang.Double',
  FLOAT: 'java.lang.Float',
  INTEGER: 'java.lang.Integer',
  LONG: 'java.lang.Long',
  SHORT: 'java.lang.Short',
  STRING: 'java.lang.String',
}

module.exports = {
  PluginParameterTypes,
  JavaPrimitiveTypes,
  PluginParamType: values(PluginParameterTypes),
}
