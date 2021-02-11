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
import get from 'lodash/get'
import { GrowingColumnSize } from './size/GrowingColumnSize'
import { OptionsColumnSize } from './size/OptionColumnSize'
import { FixedColumnSize } from './size/FixedColumnSize'
import StringValueRender from '../../../values/StringValueRender'
import SortableColumnHeaderCell from './SortableColumnHeaderCell'
import SimpleTitleColumnHeaderCell from './SimpleTitleColumnHeaderCell'
import CheckboxColumnHeaderCell from './CheckboxColumnHeaderCell'
import ValuesRenderCell from '../cells/ValuesRenderCell'
import OptionsCell from '../cells/OptionsCell'
import TableSelectionCell from '../cells/TableSelectionCell'
import ProgressRenderCell from '../cells/ProgressRenderCell'
import PercentProgressRenderCell from '../cells/PercentProgressRenderCell'

/**
 * Provides tools to build table columns
 * @author Raphaël Mechali
 */

/**
 * Table column builder: lets user build columns by setting builder properties
 * @author Raphaël Mechali
 */
export default class TableColumnBuilder {
  /** Key for selection column */
  static selectionColumnKey = 'column.table.selection'

  /** Key for options column */
  static optionsColumnKey = 'column.table.options'

  /** Local property closures cache map */
  static propertyClosuresCacheMap = {}

  /**
   * Closure constructor / cache manager for get property at path on entity. Cache is used here to avoid generating new
   * method references, that would otherwise force the table relayouting always (equal does not work on code for
   * the functions and lambdas)
   * @param {*} path path
   * @return {function} closure like entity => value
   */
  static getCachedPropertyClosure(path) {
    let cachedClosure = TableColumnBuilder.propertyClosuresCacheMap[path]
    if (!cachedClosure) { // initialize cache
      cachedClosure = (entity) => get(entity, path)
      TableColumnBuilder.propertyClosuresCacheMap[path] = cachedClosure
    }
    return cachedClosure
  }

  /**
   * Builder constructor, set up default values
   * @param {string} key column key
   */
  constructor(key) {
    this.keyImpl = key
    this.labelImpl = ''
    this.sizingImpl = new GrowingColumnSize()
    this.visibleImpl = true
    this.fixedColumnImpl = false
    this.headerCellDefinitionImpl = null
  }

  /**
   * @param {string} key column key
   * @return {TableColumnBuilder} builder instance
   */
  key(key) {
    this.keyImpl = key
    return this
  }

  /**
   * @param {string} label column label
   * @return {TableColumnBuilder} builder instance
   */
  label(label) {
    this.labelImpl = label
    return this
  }

  /**
   * @param {Constructor: {func}, props: {*}} headerCellDefinition column header cell definition
   * @return {TableColumnBuilder} builder instance
   */
  headerCellDefinition(headerCellDefinition) {
    this.headerCellDefinitionImpl = headerCellDefinition
    return this
  }

  /**
   * @param {Constructor: {func}, props: {*}} rowCellDefinition column row cell definition
   * @return {TableColumnBuilder} builder instance
   */
  rowCellDefinition(rowCellDefinition) {
    this.rowCellDefinitionImpl = rowCellDefinition
    return this
  }

  /**
   * @param {boolean} visible column visible state
   * @return {TableColumnBuilder} builder instance
   */
  visible(visible) {
    this.visibleImpl = visible
    return this
  }

  /**
   * @param {ColumnSize} sizing column sizing
   * @return {TableColumnBuilder} builder instance
   */
  sizing(sizing) {
    this.sizingImpl = sizing
    return this
  }

  /**
   *
   * @param {boolean} fixedColumn is fixed column?
   * @return {TableColumnBuilder} builder instance
   */
  fixedColumn(fixedColumn) {
    this.fixedColumnImpl = fixedColumn
    return this
  }

  /**
 * @return built column model
 */
  build() {
    if (!this.keyImpl) {
      throw new Error('Column built has no key')
    }
    if (!this.rowCellDefinitionImpl) {
      throw new Error('Column built has no cell definition')
    }
    if (!this.sizingImpl) {
      throw new Error('Column built has no sizing system set')
    }
    return {
      key: this.keyImpl,
      label: this.labelImpl,
      headerCellDefinition: this.headerCellDefinitionImpl,
      rowCellDefinition: this.rowCellDefinitionImpl,
      sizing: this.sizingImpl,
      fixedColumn: this.fixedColumnImpl,
      visible: this.visibleImpl,
    }
  }

  /** Builder shortcuts to common components and constants */

  /**
   * @param {number} optionsCount count of options that the column should show
   * @return {TableColumnBuilder} builder configured to build a column sizing for options count as pararmeter
   */
  optionsSizing(optionsCount) {
    return this.sizing(new OptionsColumnSize(optionsCount))
  }

  fixedSizing(size) {
    return this.sizing(new FixedColumnSize(size))
  }

  /**
   * @param {[{getValue: {function}, RenderConstructor: {function}, props: {*}}]} values list of values extractators and (optional) matching render + props
   * @return {TableColumnBuilder} builder configured to let column render cells using values definitions as parameters
   */
  valuesRenderCell(values) {
    return this.rowCellDefinition({
      Constructor: ValuesRenderCell, // cell for attribute paths
      props: {
        // ensure default renderer
        values: values.map(({ getValue, RenderConstructor = StringValueRender, props }) => ({ getValue, RenderConstructor, props })),
      },
    })
  }

  /**
   * @param {string} path property path (can be used within lodash get method to retrieve value from row entity)
   * @param {func} RenderConstructor the render constructor (optional)
   * @param {*} props properties to pass to render (optional)
   * @return {TableColumnBuilder} builder configured to let column render a single property in cells
   */
  propertyRenderCell(path, RenderConstructor, props) {
    return this.propertiesRenderCell([{ path, RenderConstructor, props }])
  }

  /**
   * @param {[{path: {function}, RenderConstructor: {function}, props: {*}}]} values list of property path and (optional) matching render + props
   * @return {TableColumnBuilder} builder configured to let column render cells using properties definitions as parameters
   */
  propertiesRenderCell(properties) {
    return this.valuesRenderCell(properties.map(({ path, RenderConstructor, props }) => ({
      getValue: TableColumnBuilder.getCachedPropertyClosure(path),
      RenderConstructor,
      props,
    })))
  }

  /**
   * @param {func} getProgressPercent (entity) => number. provides progress percent on entity.
   * @param {func} getProgressLabel (entity) => string. provides progress percent on entity.
   * @return {TableColumnBuilder} builder configured to let column render cells using progress render
   */
  progressRenderCell(getProgressPercent, getProgressLabel) {
    return this.rowCellDefinition({
      Constructor: ProgressRenderCell,
      props: { getProgressPercent, getProgressLabel },
    })
  }

  /**
   * @param {func} getProgressPercent (entity) => number. provides progress percent on entity.
   * @param {boolean} showLabel Shuld show progress label
   * @return {TableColumnBuilder} builder configured to let column render cells using progress percent render
   */
  progressPercentRenderCell(getProgressPercent, showLabel = true) {
    return this.rowCellDefinition({
      Constructor: PercentProgressRenderCell,
      props: { getProgressPercent, showLabel },
    })
  }

  /**
   * @return {TableColumnBuilder} builder configured for simple title header cell
   * @param {String} tooltip  Optional tooltip text
   */
  titleHeaderCell(tooltip) {
    return this.headerCellDefinition({
      Constructor: SimpleTitleColumnHeaderCell,
      props: {
        tooltip,
      },
    })
  }

  /**
   * @param {String} sortingOrder current sort order, from SortOrdersEnum
   * @param {number} sortIndex index in current sort order (if relevant)
   * @param {function} onSort on sort callback like (columnKey: string, newOrder: string from SortOrdersEnum) => ()
   * @param {boolean} hideLabel Should hide column label
   * @param {boolean} sortable  Should allow sorting?
   * @param {String} tooltip  Optional tooltip text
   * @return {TableColumnBuilder} builder configured for sortable header cell
   */
  sortableHeaderCell(sortingOrder, sortIndex, onSort, hideLabel = false, sortable = true, tooltip) {
    return this.headerCellDefinition({
      Constructor: SortableColumnHeaderCell,
      props: {
        hideLabel,
        sortable,
        sortingOrder,
        sortIndex,
        onSort,
        tooltip,
      },
    })
  }

  /**
   * @return {TableColumnBuilder} builder configured for sortable column
   */
  selectionColumn(displaySelectAll, pageSelectors, tableActions, tableSelectors) {
    return this.key(TableColumnBuilder.selectionColumnKey).optionsSizing(1)
      .headerCellDefinition({
        Constructor: CheckboxColumnHeaderCell,
        props: {
          displaySelectAll,
          pageSelectors,
          tableActions,
          tableSelectors,
        },
      })
      .rowCellDefinition({
        Constructor: TableSelectionCell,
        props: { tableActions, tableSelectors },
      })
  }

  /**
   * @param {[{OptionConstructor: {func}, optionProps: {*}}]} optionCellsDefinition list of constructor and default properties to build
   * the cells. Note that null is allowed (it will be filtered automatically)
   * @return {TableColumnBuilder} builder configured for options column
   */
  optionsColumn(optionsDefinitions) {
    const retainedOptions = optionsDefinitions.filter((option) => !!option)
    return this.key(TableColumnBuilder.optionsColumnKey)
      .optionsSizing(retainedOptions.length)
      .fixedColumn(true)
      .rowCellDefinition({
        Constructor: OptionsCell,
        props: { optionsDefinitions: retainedOptions },
      })
  }
}
