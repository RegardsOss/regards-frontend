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
import values from 'lodash/values'

/**
 * Possible parameter types
 */
export const PluginParameterTypes = {
  STRING: 'STRING',
  BYTE: 'BYTE',
  SHORT: 'SHORT',
  INTEGER: 'INTEGER',
  LONG: 'LONG',
  FLOAT: 'FLOAT',
  DOUBLE: 'DOUBLE',
  BOOLEAN: 'BOOLEAN',
  MAP: 'MAP',
  COLLECTION: 'COLLECTION',
  POJO: 'POJO',
  PLUGIN: 'PLUGIN',
  MODEL: 'REGARDS_ENTITY_MODEL',
}

export const PluginParamType = values(PluginParameterTypes)
