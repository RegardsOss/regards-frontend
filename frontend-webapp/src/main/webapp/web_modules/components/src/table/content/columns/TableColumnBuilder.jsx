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
import get from 'lodash/get'
import StringValueRender from '../../../values/StringValueRender'
import SortableColumnHeaderCell from './SortableColumnHeaderCell'
import SimpleTitleColumnHeaderCell from './SimpleTitleColumnHeaderCell'
import CheckboxColumnHeaderCell from './CheckboxColumnHeaderCell'
import ValuesRenderCell from '../cells/ValuesRenderCell'
import OptionsCell from '../cells/OptionsCell'
import CheckBoxCell from '../cells/CheckBoxCell'
import ProgressRenderCell from '../cells/ProgressRenderCell'
import PercentProgressRenderCell from '../cells/PercentProgressRenderCell'

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
 * @param {Constructor: {func}, props: {*}} rowCellDefinition row cell definition, with React
 * constructor and static properties (others will be dynamic added).
 * Note: wrapperStyle property can be used to override the cell wrapper styles
 * @param {boolean} visible (optional) is column visible
 * @param {number} order (optional) column order within columns array (column without order go at index 1000)
 * @param {number} fixedWidth (optional) fixed width when column should not grow / shrink with width, undefined otherwise
 * @return packed column model
 */
function buildColumn(key, label, headerCell, rowCellDefinition, visible = true, order = unorderedColumnIndex, fixedWidth) {
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

/**
 * Builds a simple titled column header
 * @param {*} key column key
 * @param {*} label column label
 * @return titled column header cell
 */
function buildTitleColumnHeader(key, label) {
  return (
    <SimpleTitleColumnHeaderCell
      key={key}
      label={label}
    />)
}

/**
 * Closure constructor for get property at path on entity
 * @param {*} path path
 * @return {function} closure like entity => value
 */
function extractPropertyClosure(path) {
  return entity => get(entity, path)
}

/**
 * Builds a values render cell
 * @param {[getValue, RenderConstructor]} values list of values extractators and (optional) matching render
 * @return cell definition for values render cell
 */
function buildValuesRenderCell(values) {
  return {
    Constructor: ValuesRenderCell, // cell for attribute paths
    props: {
      // ensure default renderer
      values: values.map(({ getValue, RenderConstructor = StringValueRender }) => ({ getValue, RenderConstructor })),
    },
  }
}

/**
 * Build properties render (a specifc case of values render)
 * @param [{path: {string}, RenderConstructor: {function}}] propertyDefinitions: list of properties path and corresponding render (optional,
 * default to simple string property when not provided)
 */
function buildPropertiesRenderCell(properties) {
  return buildValuesRenderCell(properties.map(({ path, RenderConstructor }) => ({
    getValue: extractPropertyClosure(path),
    RenderConstructor,
  })))
}

/**
 * Build a progress render cell
 * @param {function} getProgressPercent returns progress percent from entity
 * @param {function} getProgressLabel returns progress label (option)
 * @return cell definition
 */
function buildProgressRenderCell(getProgressPercent, getProgressLabel) {
  return {
    Constructor: ProgressRenderCell,
    props: { getProgressPercent, getProgressLabel },
  }
}

/**
 * Build a progress render cell based on percent
 * @param {function} getProgressPercent returns progress percent from entity
 * @param {function} showLabel should show label? true by default
 * @return cell definition
 */
function buildProgressPercentRenderCell(getProgressPercent, showLabel = true) {
  return {
    Constructor: PercentProgressRenderCell,
    props: { getProgressPercent, showLabel },
  }
}

/**
 * Builds an options table column. Note: column width is fixed using options count
 * @param {string} label label
 * @param {[{OptionConstructor: {func}, optionProps: {*}}]} optionCellsDefinition list of constructor and default properties to build the cells.
 * Note: the cells will automatically receive entity and rowIndex as properties
 * @param {boolean} visible is column visible
 * @param {number} fixedWidth (REQUIRED) fixed width when column should not grow / shrink with width
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

/**
 * Shortcut for the very common use case: simple title column with custom cell
 * @param {string} key key
 * @param {string} label label
 * @param {Constructor: {func}, props: {*}} rowCellDefinition row cell definition, with React
 * constructor and static properties (others will be dynamic added).
 * Note: wrapperStyle property can be used to override the cell wrapper styles
 * @param {number} order (optional) column order (column without order go at index 1000)
 * @param {boolean} visible (optional) is column visible
 * @param {number} fixedWidth (required) fixed width when column should not grow / shrink with width, undefined otherwise
 * @return packed column model
 */
function buildSimpleColumnWithCell(key, label, rowCellDefinition, order, visible, fixedWidth) {
  return buildColumn(key, label, buildTitleColumnHeader(key, label), rowCellDefinition, visible, order, fixedWidth)
}

/**
 * Shortcut for the very common use case: simple sortable column with title and single property in cells (every
 * parameter after propertyPath is optional)
 * @param {string} key key
 * @param {string} label label
 * @param {string} propertyPath property path in row entity
 * @param {number} order (optional) column order (column without order go at index 1000)
 * @param {boolean} visible (optional) is column visible
 * @param {class} RenderConstructor render construtor (optional, defaults to string render)
 * @param {number} fixedWidth (required) fixed width when column should not grow / shrink with width, undefined otherwise
 * @return packed column model
 */
function buildSimplePropertyColumn(key, label, propertyPath, order, visible, RenderConstructor, fixedWidth) {
  return buildSimpleColumnWithCell(
    key, label, buildPropertiesRenderCell([{ path: propertyPath, RenderConstructor }]),
    order, visible, fixedWidth,
  )
}

module.exports = {
  optionsColumnKey,
  selectionColumnKey,
  buildColumn,
  buildOptionsColumn,
  buildProgressPercentRenderCell,
  buildProgressRenderCell,
  buildPropertiesRenderCell,
  buildSelectionColumn,
  buildSimpleColumnWithCell,
  buildSimplePropertyColumn,
  buildSortableColumnHeader,
  buildTitleColumnHeader,
  buildValuesRenderCell,
}

