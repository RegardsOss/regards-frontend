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
import isString from 'lodash/isString'

/**
 * Holds specific methods to work with an URL attribute
 * @author Raphaël Mechali
 */
export class URLAttributeHelper {
  /** Specific format for URL attributes holding both URL and file name */
  static URL_WITH_NAME_REGEXP = /\[(.*)\]\((.*)\)/

  /**
   * Is an URL with name value?
   * @param {string} value value to test
   * @return true if value hold URL and name, false otherwise
   */
  static isURLWithName(value) {
    return isString(value) && URLAttributeHelper.URL_WITH_NAME_REGEXP.test(value)
  }

  /**
   * Parses URL parts in URL attribute value
   * @param {string} value value
   * @return {{name: string, uri: string}} found part or null
   */
  static parseURIValue(value) {
    if (isString(value)) {
      const foundParts = value.match(URLAttributeHelper.URL_WITH_NAME_REGEXP)
      // is URL with name?
      if (foundParts && foundParts.length === 3) {
        return {
          name: foundParts[1],
          uri: foundParts[2],
        }
      }
      // no: fallback on full value
      return {
        name: value,
        uri: value,
      }
    }
    return null
  }
}
