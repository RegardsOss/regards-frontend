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
import isNumber from 'lodash/isNumber'
import map from 'lodash/map'
import { Table as FixedDataTable, Column } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'
import ColumnHeaderWrapper from './columns/ColumnHeaderWrapper'
import CellWrapper from './cells/CellWrapper'
import TableColumnConfiguration from './columns/model/TableColumnConfiguration'
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
    // table configuration properties
    displayColumnsHeader: PropTypes.bool,
    lineHeight: PropTypes.number.isRequired,
    minRowCount: PropTypes.number,
    maxRowCounts: PropTypes.number, // TODO v2: delete!

    // dynamic properties
    entities: PropTypes.arrayOf(PropTypes.object),
    pageSize: PropTypes.number.isRequired,
    onScrollEnd: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(TableColumnConfiguration).isRequired,

    // required runtime width for columns size adjustements
    width: PropTypes.number.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    displayCheckbox: false,
    displaySelectAll: false,
  }

  /**
   * Lifecycle method component will mount. Used here to initialize runtime graphic data in state
   */
  componentWillMount = () => this.setState(this.computeGraphicsMeasures(this.props))
  // initialize graphics and columns


  /**
   * Lifecycle method component will receive props. Used here to (re-)initialize runtime data in state
   * @param nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.setState(this.computeGraphicsMeasures(nextProps))

  /**
   * Resize column
   * @param newColumnWidth new column width
   * @param columnKey column key
   */
  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    const { runtimeColumns } = this.state
    // in state, replace the width of column that was resized
    this.setState({
      runtimeColumns: runtimeColumns.map(column => ({
        ...column,
        runtimeWidth: columnKey === column.key ? newColumnWidth : column.runtimeWidth,
      })),
    })
  }

  /**
   * Returns default line height from theme
   */
  getDefaultLineHeight = () => this.context.muiTheme['components:infinite-table'].lineHeight

  /**
   * Retrieve entity for the given rowIndex from the array containing all entities or null if it is outside bounds
   * @param rowIndex
   * @return entity or null
   */
  getEntity = rowIndex => rowIndex < 0 || rowIndex >= this.props.entities.lenght ? null : this.props.entities[rowIndex]

  /**
   * Is there an entity on specified row index?
   * Note: it happens that a row have no entity, because of the min row count being sometimes greater than the entities count
   * @param {number} rowIndex row index
   * @return {boolean} true if row has an entity
   */
  hasEntity = rowIndex => rowIndex >= 0 && this.props.entities.length > rowIndex

  /**
   * Computes graphics measures and provides a usable component state
   * @return {nbEntitiesByPage:{number}, height:{number}, runtimeColumns:{RuntimeColumn}} usable state for component, with
   * runtime columns (default table columns enriched with required runtime data and filtered on visible state)
   */
  computeGraphicsMeasures = ({ displayCheckbox, pageSize, lineHeight = this.getDefaultLineHeight(), width, columns = [] }) => {
    // 1 - compute height
    const nbEntitiesByPage = pageSize * PAGE_SIZE_MULTIPLICATOR
    const height = lineHeight * (pageSize + 1) // +1 for header row

    // 2 - Update columns width related data
    // 2.a - prepare columns (filter unvisible and sort on order)
    const renderColumns = columns.filter(c => c.visible).sort((c1, c2) => c1.order - c2.order)

    // 2.b - compute if there are floating columns (otherwise, next layout is useless)
    const floatingColumnsCount = renderColumns.reduce((acc, c) => !isNumber(c.fixedWidth) ? acc + 1 : acc, 0)
    let floatingColumnWidth = 0
    let lastFloatingColumnWidth = 0
    if (floatingColumnsCount > 0) {
      // 2.c - There are floarting columns, compute how many space they have (refuse column width less than MIN_COL_WIDTH)
      const availableWidth = width - (floatingColumnsCount - 1) // protects againts intempestive horizontal scrolling
      const fixedColumnsWidth = renderColumns.reduce((acc, column) =>
        isNumber(column.fixedWidth) ? acc + column.fixedWidth : acc, 0)
      const floatingWidth = availableWidth - fixedColumnsWidth
      floatingColumnWidth = Math.max(Math.ceil(floatingWidth / floatingColumnsCount), MIN_COL_WIDTH)
      // 2.d - consume remaining pixels (avoid int imprecision there)
      lastFloatingColumnWidth = Math.max(Math.ceil(floatingWidth - (floatingColumnWidth * (floatingColumnsCount - 1))), MIN_COL_WIDTH)
    }

    // 3 - duplicate locally the column models to hold their width
    // Algo: we need here to count the floating rows to know when we are handling the last one
    const { columnsAcc: runtimeColumns } = renderColumns.reduce(
      ({ floatingCountAcc, columnsAcc }, column, index) => {
        let nextFloatingCount
        let runtimeWidth
        if (isNumber(column.fixedWidth)) {
          nextFloatingCount = floatingCountAcc
          runtimeWidth = column.fixedWidth
        } else {
          nextFloatingCount = floatingCountAcc + 1
          runtimeWidth = floatingCountAcc === floatingColumnsCount ? lastFloatingColumnWidth : floatingColumnWidth
        }
        return { floatingCount: nextFloatingCount, columnsAcc: [...columnsAcc, { ...column, runtimeWidth }] }
      }, { floatingCountAcc: 0, columnsAcc: [] })
    return { nbEntitiesByPage, height, runtimeColumns }
  }

  render() {
    if (!this.props.entities) {
      return null
    }
    const {
      columns, width, lineHeight = this.getDefaultLineHeight(), displayColumnsHeader,
      onScrollEnd, pageSize, minRowCount, maxRowCounts } = this.props
    const { runtimeColumns, height } = this.state

    // compute visible lines (use min row count from theme if not defined)
    const totalNumberOfEntities = this.props.entities.length > minRowCount ? this.props.entities.length : minRowCount

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
        { // map runtime columns from state (they are enriched with width information)
          map(runtimeColumns, (column, index) => (
            <Column
              key={column.key}
              columnKey={column.key}
              header={
                <ColumnHeaderWrapper lineHeight={lineHeight} isLastColumn={index === columns.length - 1}>
                  { // provide header cell as child
                    column.headerCell
                  }
                </ColumnHeaderWrapper>
              }
              cell={
                <CellWrapper
                  lineHeight={this.props.lineHeight}
                  isLastColumn={index === columns.length - 1}
                  getEntity={rowIndex => this.getEntity(rowIndex)}
                  CellContentBuilder={column.rowCellDefinition.Constructor}
                  cellContentBuilderProps={column.rowCellDefinition.props}
                />
              }
              width={column.runtimeWidth}
              isResizable={!column.fixedWidth}
            />))
        }
      </FixedDataTable>
    )
  }
}

export default Table
