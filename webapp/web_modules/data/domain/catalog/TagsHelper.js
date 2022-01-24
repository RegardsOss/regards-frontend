/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * Holds common tools to work with tags
 * @author Raphaël Mechali
 */
export class TagsHelper {
  /** URN tag pattern */
  static URN_PATTERN = /^URN:/

  /** Is an URN tag?
   * @param {*} tag tag to test
   * @return true if tag is an URN, false otherwise
   */
  static isURNTag(tag) {
    return TagsHelper.URN_PATTERN.test(tag)
  }

  /** Computes raw URN, vithout version
   * @param {string} urn with version
   * @return {string} urn without version
   */
  static getURNWithoutVersion(urn) {
    return urn.substring(0, urn.lastIndexOf(':'))
  }

  /** Coupling tag pattern */
  static COUPLING_PATTERN = /^coupling:(.*):(.*)$/

  /**
   * Is a coupling tag?
   * @param {*} tag tag to test
   * @return true if tag is an URN, false otherwise
   */
  static isCouplingTag(tag) {
    return isString(tag) && TagsHelper.COUPLING_PATTERN.test(tag)
  }

  /**
 * Parses a coupling tag
 * @param {string} tag tag
 * @return {string} found part or null
 */
  static parseCouplingTag(tag) {
    if (isString(tag)) {
      const foundParts = tag.match(TagsHelper.COUPLING_PATTERN)
      // is valid coupling tag?
      if (foundParts && foundParts.length === 3) {
        return {
          id: foundParts[1],
          label: foundParts[2],
        }
      }
    }
    return null
  }
}
