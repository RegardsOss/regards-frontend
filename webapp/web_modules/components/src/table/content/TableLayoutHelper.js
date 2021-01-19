import { GrowingColumnSize } from './columns/size/GrowingColumnSize'
import { OptionsColumnSize } from './columns/size/OptionColumnSize'
import { FixedColumnSize } from './columns/size/FixedColumnSize'

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

/**
 * Table layout helper, responsible to clone columns with their current layout size
 * @author Raphaël Mechali
 */

/** Size in pixed of the vertical scrollbar */
const RESERVED_VSCROLLBAR_WIDTH = 16

/**
 * Main layout function. It receives columns and returns duplicated columns models with their current layout data
 * @param {[*]} columns columns following TableColumnConfiguration spec.
 * @param {number} tableWidth current table width
 * @param {boolean} showVerticalScrollBar should show vertical scroll bar?
 * @param {number} fixedColumnsWidth fixed columns width, from theme
 * @param {number} minColumnWidth minimum width for columns, from theme
 * @return {[*]} duplicated columns models enriched with layout data
 */
export function layout(columns, tableWidth, showVerticalScrollBar, fixedColumnsWidth, minColumnsWidth) {
  // A  - compute the available width for columns (remove scroll bar reserved width if shown)
  const availableColumnsWidth = showVerticalScrollBar ? tableWidth - RESERVED_VSCROLLBAR_WIDTH : tableWidth

  // B - First pass: remove unvisible columns, provide fixed columns with and tack growing columns plus consumed width
  const { cWL: columnsWithLayout, gc: growingColumns, rFW: reservedFixedColumnsWidth } = columns.reduce(({ cWL, gc, rFW }, column) => {
    if (!column.visible) {
      return { cWL, gc, rFW } // filter that column as it is not visible
    }
    switch (column.sizing.type) {
      case GrowingColumnSize.TYPE: {
        // report column unchanged but keep its reference for second pass
        const columnRef = { ...column, runtimeWidth: 0 }
        return { cWL: [...cWL, columnRef], gc: [...gc, columnRef], rFW }
      }
      case OptionsColumnSize.TYPE: {
        const columnWidth = column.sizing.optionsCount * fixedColumnsWidth
        // split: fixed column, save reserved space
        return { cWL: [...cWL, { ...column, runtimeWidth: columnWidth }], gc, rFW: rFW + columnWidth }
      }
      case FixedColumnSize.TYPE: {
        const columnWidth = column.sizing.size
        return { cWL: [...cWL, { ...column, runtimeWidth: columnWidth }], gc, rFW: rFW + columnWidth }
      }
      default:
        throw new Error(`Unhandled column sizing type ${column.sizing.type}`)
    }
  }, { cWL: [], gc: [], rFW: 0 })

  // C - Second pass: Provide dynamic size to each growing column (by reference)
  if (growingColumns.length) {
    // B.1 - compute medium column width
    const remainingTableWidth = availableColumnsWidth - reservedFixedColumnsWidth
    const growingColumnWidth = Math.max(Math.round(remainingTableWidth / growingColumns.length), minColumnsWidth)
    // B.2 - adapt last column width to consume precisely all pixels
    const lastGrowingColumnWidth = Math.max(remainingTableWidth - (growingColumnWidth * (growingColumns.length - 1)), minColumnsWidth)
    // B.3 - complete column models with runtime width
    growingColumns.forEach((column, index) => {
      // Note: column object pointed out by column reference has been duplicated in first pass, we can modify the object here
      // eslint-disable-next-line no-param-reassign
      column.runtimeWidth = index === growingColumns.length - 1 ? lastGrowingColumnWidth : growingColumnWidth
    })
  }
  return columnsWithLayout
}
