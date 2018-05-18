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
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'

/**
 * Holds columns helper tools
 * @author Raphaël Mechali
 */

/** Properties to ignore in comparison between columns (headerCell causes infinite recursive comparison) **/
const IGNORED_PROPERTIES = ['headerCell']

/**
 * Are column1 and column2 different
 * @param {*} column1 -
 * @param {*} column2 -
 * @return true when column 1 and column 2 are not equal
 */
export function areDifferentColumns(column1, column2) {
  return !isEqual(omit(column1, IGNORED_PROPERTIES), omit(column2, IGNORED_PROPERTIES))
}

/**
 * Computes if the two columns list will behave differently in layout
 * @param {*} oldColumns old Columns
 * @param {*} newColumns new Columns
 */
export function areDifferentColumnsArrays(oldColumns = [], newColumns = []) {
  if (oldColumns.length !== newColumns.length) {
    return true // not the same columns count
  }
  // same content for each column? (check layout related data: key, order, fixedWidth and visible)
  for (let index = 0; index < oldColumns.length; index += 1) {
    if (areDifferentColumns(oldColumns[index], newColumns[index])) {
      // found one different column
      return true
    }
  }
  // both columns array are matchting
  return false
}
