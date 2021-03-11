/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
/**
 * Define available values for Attribute Type
 */
export const MODEL_ATTR_TYPES = {
  STRING: 'STRING',
  INTEGER: 'INTEGER',
  DOUBLE: 'DOUBLE',
  DATE_ISO8601: 'DATE_ISO8601',
  URL: 'URL',
  BOOLEAN: 'BOOLEAN',
  STRING_ARRAY: 'STRING_ARRAY',
  INTEGER_ARRAY: 'INTEGER_ARRAY',
  DOUBLE_ARRAY: 'DOUBLE_ARRAY',
  DATE_ARRAY: 'DATE_ARRAY',
  INTEGER_INTERVAL: 'INTEGER_INTERVAL',
  DOUBLE_INTERVAL: 'DOUBLE_INTERVAL',
  DATE_INTERVAL: 'DATE_INTERVAL',
  LONG: 'LONG',
  LONG_INTERVAL: 'LONG_INTERVAL',
  LONG_ARRAY: 'LONG_ARRAY',
  JSON: 'JSON',
}

export const THUMBNAIL_PSEUDO_TYPE = 'THUMBNAIL_PSEUDO_TYPE'

export const PSEUDO_ATTR_TYPES = {
  ...MODEL_ATTR_TYPES,
  THUMBNAIL_PSEUDO_TYPE,
}
