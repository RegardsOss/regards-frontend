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

/**
 * Helper to manage json
 * @author Théo Lasserre
 */
class JsonHelper {
  /*
   * Check if input string has a json structure
   * @param pStr string to check
   * @return [boolean] String has a json structure ?
   */
  static hasJsonStructure(pStr) {
    // eslint-disable-next-line lodash/prefer-lodash-typecheck
    if (typeof pStr !== 'string') return false
    try {
      const result = JSON.parse(pStr)
      const type = Object.prototype.toString.call(result)
      return type === '[object Object]'
        || type === '[object Array]'
    } catch (err) {
      return false
    }
  }
}

export default JsonHelper
