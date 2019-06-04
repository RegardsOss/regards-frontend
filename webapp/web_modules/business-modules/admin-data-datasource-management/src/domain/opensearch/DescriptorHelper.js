/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { MIME_TYPES } from '@regardsoss/mime-types'

/**
 * Helper to access descriptor data (URL, parameters detail, ...)
 * @author Raphaël Mechali
 */
export class DescriptorHelper {
  /** Expected resource MIME type */
  static EXPECTED_URL_MIME_TYPE = MIME_TYPES.JSON_MIME_TYPE

  /**
   * @param {*} descriptor descriptor, matching DataManagementShapes.OpenSearchQueryDescription shape (optional)
   * @return {*} found resource URL for JSON Mime type or null (matches DataManagementShapes.OpenSearchURLDescription)
   */
  static getResourceURL(descriptor) {
    const availableResourcesURLs = get(descriptor, 'url', [])
    return availableResourcesURLs.find(e => e.type === DescriptorHelper.EXPECTED_URL_MIME_TYPE) || null
  }

  /**
   * @param {*} descriptor descriptor, matching DataManagementShapes.OpenSearchQueryDescription shape (optional)
   * @return {boolean} true when the descriptor has a JSON resource URL
   */
  static hasResourceURL(descriptor) {
    return !!DescriptorHelper.getResourceURL(descriptor)
  }

  /**
   * Returns options for a parameter
   * @param {*} parameter matching DataManagementShapes.OpenSearchURLParameterDescription
   * @return {[*]} parameter options (never null, possibly empty)
   */
  static getParameterOptions(parameter) {
    // Note: options might be in option (regular) or options (Theia) fields
    return get(parameter, 'options', get(parameter, 'option', []))
  }

  /**
   * Returns options for a parameter
   * @param {*} parameter matching DataManagementShapes.OpenSearchURLParameterDescription
   * @return {boolean} true if parameter has options, false otherwise
   */
  static hasParameterOptions(parameter) {
    return DescriptorHelper.getParameterOptions(parameter).length > 0
  }
}
