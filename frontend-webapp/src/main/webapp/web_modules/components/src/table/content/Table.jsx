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
import map from 'lodash/map'
import values from 'lodash/values'
import { Table as FixedDataTable, Column } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'
import FixedTableHeaderCell from './columns/ColumnHeader'
import CheckboxColumnHeader from './columns/CheckboxColumnHeader'
import Cell from './cells/Cell'
import CheckBoxCell from './cells/CheckBoxCell'
import ColumnConfiguration from './columns/model/ColumnConfiguration'
import TableConfigurationModel from './model/TableConfigurationModel'
import TableSelectionModes from '../model/TableSelectionModes'
import { PAGE_SIZE_MULTIPLICATOR } from '../model/TableConstant'

const MIN_COL_WIDTH = 150
/**
 * Fixed data table from facebook library integrated with material ui theme
 * and infinite scroll functionality.
 *
 * The FixedDataTable from facebook library, use an array with all elements to display.
 * If X is the number of elements visible in the table, so 3*X elements are present in the DOM.
 * There is X elements cached before the first visible element and X elements cached after the last
 * visible element.
 *
 * @author Sébastien Binda
 */
class Table extends React.Component {

  /**
   * PageActions : BasicPageableActions of the entities to manage
   * PageSelector : BasicPageableSelectors of the entities to manage
   * pageSize : Optional, number of visible entity into the table. Default 20.
   * lineHeight: Optional, default 40px
   */
  static propTypes = {
    // dynamic properties
    entities: PropTypes.arrayOf(PropTypes.object),
    pageSize: PropTypes.number.isRequired,
    onScrollEnd: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(ColumnConfiguration).isRequired,
    width: PropTypes.number.isRequired,
    maxRowCounts: PropTypes.number,
    minRowCounts: PropTypes.number,

    // selection related
    allSelected: PropTypes.bool.isRequired, // are all elements selected?
    toggledElements: PropTypes.objectOf(PropTypes.object).isRequired, // inner object is entity type
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    onToggleRowSelection: PropTypes.func.isRequired, // (int) => (void) dispatches row selection
    onToggleSelectAll: PropTypes.func.isRequired, // (void) => (void) dispatches toggle selection mode

    // table configuration properties
    ...TableConfigurationModel,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    displayCheckbox: false,
    displaySelectAll: false,
  }

  componentWillMount = () => {
    this.setState({
      columnsFilterPanelOpened: false,
      ...this.computeGraphicsMeasures(this.props),
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...this.computeGraphicsMeasures(nextProps) })
  }

  /**
   * Resize column
   * @param newColumnWidth
   * @param columnKey
   */
  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    this.setState(({ columnWidths }) => ({
      columnWidths: {
        ...columnWidths,
        [columnKey]: newColumnWidth,
      },
    }))
  }

  /**
   * Retrieve entity for the given rowIndex from the array containing all entities
   * @param rowIndex
   */
  getEntity = rowIndex => this.props.entities[rowIndex]

  /**
   * Computes graphics measures
   */
  computeGraphicsMeasures = ({ displayCheckbox, pageSize, lineHeight, width, columns = [] }) => {
    const { selectionColumn } = this.context.moduleTheme
    // 1 - compute height
    const nbEntitiesByPage = pageSize * PAGE_SIZE_MULTIPLICATOR
    const height = lineHeight * (pageSize + 1) // +1 for header row

    // 2 - compute resulting column width
    // constant column width
    const availableWidth = width - (displayCheckbox ? selectionColumn.width : 0)
    let columnWidth = Math.round(availableWidth / columns.length)
    columnWidth = Math.max(columnWidth, MIN_COL_WIDTH)
    // consume remaining space or delete last pixels
    let lastColumnWidth = availableWidth - (columnWidth * (columns.length - 1))
    lastColumnWidth = Math.max(lastColumnWidth, MIN_COL_WIDTH)
    // Init labelled columns width
    const columnWidths = columns.reduce((acc, { label }, index) => ({
      [label]: index === columns.length - 1 ? lastColumnWidth : columnWidth,
      ...acc,
    }), {})

    return { nbEntitiesByPage, height, columnWidths }
  }

  render() {
    if (!this.props.entities) {
      return null
    }
    const {
      cellsStyle, columns, width, lineHeight, displayCheckbox, displaySelectAll, displayColumnsHeader,
      allSelected, onToggleSelectAll, onToggleRowSelection, onScrollEnd, onSortByColumn,
      toggledElements, selectionMode, pageSize, maxRowCounts,
    } = this.props
    const { columnWidths, height } = this.state
    const { selectionColumn } = this.context.moduleTheme
    const totalNumberOfEntities = this.props.entities.length > this.props.minRowCounts ? this.props.entities.length : this.props.minRowCounts

    // If the total number of results is less than the number of elements by page, adjust height of the table
    // to fit the number of results. Else use the default fixed height.
    const totalHeight = displayColumnsHeader ? (totalNumberOfEntities + 1) * lineHeight : totalNumberOfEntities * lineHeight
    const calculatedHeight = totalNumberOfEntities > pageSize ? height : totalHeight + 5

    const rowsCount = maxRowCounts && totalNumberOfEntities > maxRowCounts ? maxRowCounts : totalNumberOfEntities

    return (
      <FixedDataTable
        rowHeight={lineHeight}
        headerHeight={displayColumnsHeader ? lineHeight : 0}
        rowsCount={rowsCount}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        isColumnResizing={false}
        onScrollEnd={onScrollEnd}
        width={width}
        height={calculatedHeight}
      >
        { // render selection column
          displayCheckbox ?
            (
              <Column
                key={'selection.column'}
                columnKey={'checkbox'}
                header={<CheckboxColumnHeader
                  displaySelectAll={displaySelectAll}
                  areAllSelected={allSelected}
                  onToggleSelectAll={onToggleSelectAll}
                  lineHeight={lineHeight}
                />}
                cell={<CheckBoxCell
                  onToggleRowSelection={onToggleRowSelection}
                  toggledElements={toggledElements}
                  selectionMode={selectionMode}
                />}
                fixed
                width={selectionColumn.width}
              />
            ) : null
        }
        {map(columns, (column, index) => {
          const columnWidth = column.fixed || columnWidths[column.label]
          if (columnWidth) {
            return (<Column
              key={column.label}
              columnKey={column.label}
              header={
                <FixedTableHeaderCell
                  label={column.hideLabel ? '' : column.label}
                  lineHeight={lineHeight}
                  sortable={column.sortable}
                  sortAction={type => onSortByColumn(column, type)}
                  sortingOrder={column.sortingOrder}
                  isLastColumn={index === columns.length - 1}
                />}
              cell={<Cell
                getEntity={rowIndex => this.getEntity(rowIndex)}
                toggledElements={toggledElements}
                selectionMode={selectionMode}
                lineHeight={this.props.lineHeight}
                overridenCellsStyle={cellsStyle}
                col={column}
                isLastColumn={index === columns.length - 1}
                onToggleRowSelection={onToggleRowSelection}
              />}
              width={columnWidth}
              flexGrow={column.fixed ? undefined : 1}
              isResizable={column.fixed === undefined}
            />)
          }
          return null
        })}
      </FixedDataTable>
    )
  }
}

Table.defaultProps = {
  minRowCounts: 0,
}

export default Table
