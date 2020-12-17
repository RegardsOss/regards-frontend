/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Provides tools to extract MIME type and other parameters from a Content-Type request header
 * @author Raphaël Mechali
 */
import { mimeTypesDefinitions } from './MimeTypesEnum'

/** Content type parmeter separator */
const CONTENT_TYPE_PARAMETER_SEPARATOR = ';'
/** MIME type parameter index when available */
const MIME_TYPE_PARAMETER_INDEX = 0

/**
 * Parses all parameters from content type
 * @param {string} contentTypeValue
 * @return [string] ordered parameters, MIME type is at position 0 if it was found (other parameters are returned
 * in their request order). Please note that content type is not lower cased to avoid transforming the boundary parameters
 * if any
 */
function parseParameters(contentTypeValue = '') {
  return contentTypeValue.split(CONTENT_TYPE_PARAMETER_SEPARATOR).map((p) => p.trim())
}

/**
 * Parses MIME type from content type parameter then retrieves corresponding MIME type in MimeTypesEnum.
 * @param {*} contentTypeValue content type parameter value
 * @return {MimeType} MIME type from enumeration if found in parameter and present in MimeTypesEnum, null otherwise
 */
function getMIMEType(contentTypeValue = '') {
  const parameters = parseParameters(contentTypeValue)
  const parsedMIMEType = (parameters.length > MIME_TYPE_PARAMETER_INDEX ? parameters[MIME_TYPE_PARAMETER_INDEX] : '').toLowerCase()
  return mimeTypesDefinitions.find(({ mime }) => mime === parsedMIMEType) || null
}

export const contentTypeParser = {
  getMIMEType,
  parseParameters,
}
