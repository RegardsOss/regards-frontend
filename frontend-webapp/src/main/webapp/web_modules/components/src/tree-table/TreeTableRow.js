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
import isEqual from 'lodash/isEqual'

class TreeTableRow {

  /**
   * Constructor
   * @param {[*]} rowCells rows cell values: array of any (depends on what should be converted, at render, into a cell component)
   * @param {[TreeTableRow]} subRows sub rows of this row
   * @param {boolean} expanded is row expanded
   */
  constructor(rowCells = [], subRows = [], expanded = false) {
    this.rowCells = rowCells
    this.subRows = subRows
    this.expanded = expanded
  }

  /**
   * Toggles expanded state
   */
  toggleExpanded() {
    this.expanded = !this.expanded
  }

  /**
   * Is this row matching another one? (value comparison, two matching rows are very likely to be extracted from the same model element)
   * @param {TreeTableRow} otherRow
   * @return {boolean} true if this row matches the other row
   */
  matches(otherRow) {
    return isEqual(this.rowCells, otherRow.rowCells) && // A - This row values must be identical
      this.subRows.length === otherRow.subRows.length && // B - Other row as the same count of sub rows
      !this.subRows.find((row, index) => !row.matches(otherRow.subRows[index]))// C - All sub rows also matches each other (A non matching row cannot be found - optimization)
  }

  /**
   * Restores expanded state from another row.
   * Pre: the other row matches STRICTLY this one
   * @param {TreeTableRow} otherRow
   */
  restoreExpandedStatefrom(otherRow) {
    // current level restoration
    this.expanded = otherRow.expanded
    // depth restoration
    this.subRows.forEach((subRow, index) => subRow.restoreExpandedStatefrom(otherRow.subRows[index]))
  }

}

export default TreeTableRow
