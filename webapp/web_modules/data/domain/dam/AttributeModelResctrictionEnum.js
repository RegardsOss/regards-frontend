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

import values from 'lodash/values'

/**
 * List of possible types for entities
 */
export const ATTRIBUTE_MODEL_RESTRICTIONS_ENUM = {
  NO_RESTRICTION: 'NO_RESTRICTION',
  PATTERN: 'PATTERN',
  ENUMERATION: 'ENUMERATION',
  DATE_ISO8601: 'DATE_ISO8601',
  INTEGER_RANGE: 'INTEGER_RANGE',
  LONG_RANGE: 'LONG_RANGE',
  DOUBLE_RANGE: 'DOUBLE_RANGE',
  URL: 'URL',
  GEOMETRY: 'GEOMETRY',
}

/**
 * Return an array of Entity types
 */
export const ATTRIBUTE_MODEL_RESTRICTIONS_TYPES = values(ATTRIBUTE_MODEL_RESTRICTIONS_ENUM)
