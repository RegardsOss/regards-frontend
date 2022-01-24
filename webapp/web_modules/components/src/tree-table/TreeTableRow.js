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

/**
 * A tree table row for TreeTableComponent
 * @author Raphaël Mechali
 */
class TreeTableRow {
  /**
   * Constructor
   * @param {string} key table row key
   * @param {[*]} rowCells rows cell values: array of any (depends on what should be converted, at render, into a cell component)
   * @param {[TreeTableRow]} subRows sub rows of this row
   * @param {boolean} expanded is row expanded
   */
  constructor(key, rowCells = [], subRows = [], expanded = false) {
    this.key = key
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
   * Is same row than other on
   * @param {TreeTableRow} otherRow other row
   * @return {boolean} true if this row is the same row
   */
  isSameRow(otherRow) {
    return this.key === otherRow.key
  }

  /**
   * Restores expanded state from another row.
   * @param {TreeTableRow} otherRow other row, must match this one
   */
  restoreExpandedStatefrom(otherRow) {
    // current level restoration
    this.expanded = otherRow.expanded

    // depth restoration
    this.subRows.forEach((thisSubRow, index) => {
      const matchingOtherSubRow = otherRow.subRows.find((otherSubRow) => thisSubRow.isSameRow(otherSubRow))
      if (matchingOtherSubRow) {
        // recursive sub levels restoration
        thisSubRow.restoreExpandedStatefrom(matchingOtherSubRow)
      }
    })
  }
}

export default TreeTableRow
