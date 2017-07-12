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
/**
 * Define available values for Attribute Type
 */
const JavaTypes = {
  STRING: {
    i18n: 'datamanagement.attribute.type.integer',
    value: 'string',
  },
  INTEGER: {
    i18n: 'datamanagement.attribute.type.integer',
    value: 'integer',
  },
  FLOAT: {
    i18n: 'datamanagement.attribute.type.float',
    value: 'float',
  },
  DATE: {
    i18n: 'datamanagement.attribute.type.date',
    value: 'date',
  },
  URL: {
    i18n: 'datamanagement.attribute.type.url',
    value: 'url',
  },
  BOOLEAN: {
    i18n: 'datamanagement.attribute.type.boolean',
    value: 'boolean',
  },
  GEOMETRY: {
    i18n: 'datamanagement.attribute.type.geometry',
    value: 'geometry',
  },
  FLOAT_ARRAY: {
    i18n: 'datamanagement.attribute.type.float_array',
    value: 'float_array',
  },
  STRING_ARRAY: {
    i18n: 'datamanagement.attribute.type.string_array',
    value: 'string_array',
  },
  DATE_ARRAY: {
    i18n: 'datamanagement.attribute.type.date_array',
    value: 'date_array',
  },
  OBJECT: {
    i18n: 'datamanagement.attribute.type.object',
    value: 'object',
  },
}


export default JavaTypes
