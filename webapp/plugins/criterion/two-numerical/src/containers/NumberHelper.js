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
import { NumberRange } from '@regardsoss/plugins-api'

/**
 * Common tools to work with numbers in plugin (avoid code pasting)
 * @author Raphaël Mechali
 */
export class NumberHelper {
  /**
   * Parses a text value. Returns parsed value and parsing error state
   * @param {string}  text
   * @return {{error: boolean, value: number}}
   */
  static parse(text) {
    if (!text) {
      return { error: false, value: null }
    }
    const value = parseFloat(text)
    return NumberRange.isValidNumber(value) ? { error: false, value } : { error: true, value: null }
  }
}
