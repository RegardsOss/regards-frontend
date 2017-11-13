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
import SortableColumnHeaderCell from './SortableColumnHeaderCell'
import SimpleTitleColumnHeaderCell from './SimpleTitleColumnHeaderCell'
import CheckboxColumnHeaderCell from './CheckboxColumnHeaderCell'
import OptionsCell from '../cells/OptionsCell'
import CheckBoxCell from '../cells/CheckBoxCell'

/**
 * Provides tools to build table columns
 * @author Raphaël Mechali
 */

const unorderedColumnIndex = 1000

const lastColumnIndex = Number.MAX_SAFE_INTEGER

const selectionColumnKey = 'column.table.selection'

const optionsColumnKey = 'column.table.options'

/**
 * Builds a table column, as expected by the table
 * @param {string} key column key
 * @param {React.Element} headerCell The instantiated header cell
 * @param {CellContentBuilder: {func}, cellContentBuilderProps: {*}} rowCellDefinition row cell definition, with React
 * constructor and static properties (others will be dynamic added).
 * Note: wrapperStyle property can be used to override the cell wrapper styles
 * @param {boolean} visible is column visible
 * @param {number} order (optional) column order within columns array (column without order go at index 1000)
 * @param {number} fixedWidth (optional) fixed width when column should not grow / shrink with width, undefined otherwise
 * @return packed column model
 */
function buildColumn(key, label, headerCell, rowCellDefinition, visible, order = unorderedColumnIndex, fixedWidth) {
  return {
    key,
    label,
    order,
    headerCell,
    rowCellDefinition,
    fixedWidth,
    visible,
  }
}

/**
 * Builds a selection column, ie a column with standard column header renderer
 * @param {string} label label
 * @param {boolean} displaySelectAll should display select all button?
 * @param {boolean} areAllSelected are all elements selected?
 * @param {function} onToggleSelectAll callback on Toggle select all () => ()
 * @param {function} onToggleRowSelection callback on Toggle row selection (row:number) => ()
 * @param {boolean} visible is column visible
 * @param {number} order (optional) column order (column without order go at index 1000)
 * @param {number} fixedWidth (required) fixed width when column should not grow / shrink with width, undefined otherwise
 * @return packed column model
 */
function buildSelectionColumn(label, displaySelectAll, pageSelectors, tableActions, tableSelectors, visible, fixedWidth) {
  // use standard header
  const headerCell = (
    <CheckboxColumnHeaderCell
      key={selectionColumnKey}
      displaySelectAll={displaySelectAll}
      pageSelectors={pageSelectors}
      tableActions={tableActions}
      tableSelectors={tableSelectors}
    />)
  const rowCellDefinition = {
    Constructor: CheckBoxCell,
    props: { tableActions, tableSelectors },
  }
  return buildColumn(selectionColumnKey, label, headerCell, rowCellDefinition, visible, Number.MIN_SAFE_INTEGER, fixedWidth)
}

/**
 * Builds a sortable column header
 * @param {*} key both the header component key and the sortId (key that will be send on sort)
 * @param {*} label column label
 * @param {*} hideLabel should hide label?
 * @param {*} sortable is sortable?
 * @param {*} sortingOrder current sorting order (external control)
 * @param {*} onSort on sort callback like (sortId, sortOrder) => ()
 */
function buildSortableColumnHeader(key, label, hideLabel, sortable, sortingOrder, onSort) {
  return (
    <SortableColumnHeaderCell
      key={key}
      sortId={key}
      label={label}
      hideLabel={hideLabel}
      sortable={sortable}
      sortingOrder={sortingOrder}
      onSort={onSort}
    />)
}

function buildTitleColumnHeader(key, label) {
  return (
    <SimpleTitleColumnHeaderCell
      key={key}
      label={label}
    />)
}

/**
 * Builds an options table column. Note: column width is fixed using options count
 * @param {string} label label
 * @param {[{OptionConstructor: {func}, optionProps: {*}}]} optionCellsDefinition list of constructor and default properties to build the cells.
 * Note: the cells will automatically receive entity and rowIndex as properties
 * @param {boolean} visible is column visible
 * @param {number} fixedWidth (REQUIRED) fixed width when column should not grow / shrink with width, undefined otherwise
 * @param {string} key (option) column key - or default options key
 * @param {number} order (optional) column order within columns array - or max column order
 * @param {React.Element} headerCell The instantiated header cell (or null header by default)
 * @return packed column model
 */
function buildOptionsColumn(label, optionsDefinitions, visible, fixedWidth, key = optionsColumnKey, order = lastColumnIndex, headerCell = null) {
  const rowCellDefinition = {
    Constructor: OptionsCell,
    props: { optionsDefinitions },
  }
  return this.buildColumn(key, label, headerCell, rowCellDefinition, visible, order, fixedWidth * optionsDefinitions.length)
}

export default {
  optionsColumnKey,
  selectionColumnKey,
  buildColumn,
  buildOptionsColumn,
  buildSelectionColumn,
  buildSortableColumnHeader,
  buildTitleColumnHeader,
}

