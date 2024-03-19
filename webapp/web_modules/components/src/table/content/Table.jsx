/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import { Table as FixedDataTable, Column } from 'fixed-data-table-2'
import { themeContextType } from '@regardsoss/theme'
import ColumnHeaderWrapper from './columns/ColumnHeaderWrapper'
import CellWrapper from './cells/CellWrapper'
import { TableColumnConfiguration } from './columns/model/TableColumnConfiguration'
import { layout } from './TableLayoutHelper'
import { GrowingColumnSize } from './columns/size/GrowingColumnSize'

/** Protects from undesired vertical scrollbar (due to the component CSS borders) */
const RESERVED_BORDERS_HEIGHT = 2
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
    stripeRows: PropTypes.bool,

    // dynamic properties
    // eslint-disable-next-line react/forbid-prop-types
    entities: PropTypes.arrayOf(PropTypes.any), // Current fetched entities
    // eslint-disable-next-line react/no-unused-prop-types
    entitiesCount: PropTypes.number, // Total number of entities (even the unfetched ones)
    onScrollEnd: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    columns: PropTypes.arrayOf(TableColumnConfiguration).isRequired, // used in state update

    // required runtime width for columns size adjustements
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,

    // style for cell element
    // eslint-disable-next-line react/forbid-prop-types
    cellWrapperStyle: PropTypes.objectOf(PropTypes.any),
  }

  static defaultProps = {
    displayColumnsHeader: true,
    entitiesCount: 0,
    stripeRows: true,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * Are compared cells the same
   * @param {*} cellDefinition1 first cell definition
   * @param {*} cellDefinition2 second cell definition
   * @return {boolean} true if cells definitions are the same
   */
  static isSameRowCell(cellDefinition1, cellDefinition2) {
    return get(cellDefinition1, 'Constructor') === get(cellDefinition2, 'Constructor')
      && isEqual(cellDefinition1, cellDefinition2)
  }

  /**
   * Lifecycle method component will mount. Used here to initialize runtime graphic data in state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesChanged({}, this.props)
  }

  /**
   * Lifecycle method component will receive props. Used here to (re-)initialize runtime data in state
   * @param nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesChanged(this.props, nextProps)
  }

  /**
   * On properties changed
   * @param oldProps old properties
   * @param newProps new properties
   */
  onPropertiesChanged = (oldProps, newProps) => {
    const oldState = this.state || {}
    const newState = { ...oldState }

    // Re layout columns when available width changed, to avoid changing user set columns width. Width changed when:
    // A - Table width changed
    // B - scroll bar will be shown or hidden (due to scroll bar width)
    // C - columns changed (layout probably needs an update)
    const wasShowingScroll = get(oldProps, 'entities.length', 0) > Math.floor(oldProps.height / oldProps.lineHeight)
    const willShowScroll = get(newProps, 'entities.length', 0) > Math.floor(newProps.height / newProps.lineHeight)

    // update columns when: scroll state changed, width changed or columns list changed
    if (wasShowingScroll !== willShowScroll || oldProps.width !== newProps.width
      || !isEqual(oldProps.columns, newProps.columns)) {
      newState.runtimeColumns = this.computeColumnsModelsWithWidth(newProps)
    }

    if (!isEqual(newState.runtimeColumns, oldState.runtimeColumns)) {
      this.setState(newState)
    }
  }

  /**
   * Resize column
   * @param newColumnWidth new column width
   * @param columnKey column key
   */
  onColumnResizeEndCallback = (newColumnWidth, columnKey) => {
    const { runtimeColumns } = this.state
    // in state, replace the width of column that was resized
    this.setState({
      runtimeColumns: runtimeColumns.map((column) => ({
        ...column,
        runtimeWidth: columnKey === column.key ? newColumnWidth : column.runtimeWidth,
      })),
    })
  }

  /**
   * Retrieve entity for the given rowIndex from the array containing all entities or null if it is outside bounds
   * @param rowIndex
   * @return entity or null
   */
  getEntity = (rowIndex) => rowIndex < 0 || rowIndex >= this.props.entities.length ? null : this.props.entities[rowIndex]

  /**
   * Returns header height for current xconfiguration
   * @param {boolean} displayColumnsHeader  component properties
   * @return current header height
   */
  getHeaderHeight = (displayColumnsHeader) => displayColumnsHeader ? this.context.muiTheme.components.infiniteTable.minHeaderRowHeight : 0

  /**
   * Computes graphics measures and provides a usable component state
   * @return {nbEntitiesByPage:{number}, height:{number}, runtimeColumns:{RuntimeColumn}} usable state for component, with
   * runtime columns (default table columns enriched with required runtime data and filtered on visible state)
   */
  computeColumnsModelsWithWidth = ({
    entities, lineHeight, height, width, columns = [], displayColumnsHeader,
  }) => {
    const { fixedColumnsWidth, minColumnsWidth } = this.context.muiTheme.components.infiniteTable
    // check if the vertical scrollbar should be shown
    const effectiveHeight = height - this.getHeaderHeight()
    const entitiesHeight = entities.length * lineHeight
    const showVerticalScrollBar = entitiesHeight > effectiveHeight
    // let table layout provide columns with runtime width
    return layout(columns, width, showVerticalScrollBar, fixedColumnsWidth, minColumnsWidth)
  }

  render() {
    if (!this.props.entities) {
      return null
    }
    const {
      entities, width, height, lineHeight, cellWrapperStyle,
      stripeRows, displayColumnsHeader, onScrollEnd,
    } = this.props
    const { runtimeColumns } = this.state
    return (
      <FixedDataTable
        rowHeight={lineHeight}
        headerHeight={this.getHeaderHeight(displayColumnsHeader)}
        rowsCount={entities.length}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        isColumnResizing={false}
        onScrollEnd={onScrollEnd}
        width={width}
        height={height - RESERVED_BORDERS_HEIGHT}
      >
        { // map runtime columns from state (they are enriched with width information)
          map(runtimeColumns, (column, index) => (
            <Column
              key={column.key}
              columnKey={column.key}
              fixedRight={column.fixedColumn}
              header={
                <ColumnHeaderWrapper
                  columnKey={column.key}
                  label={column.label}
                  headerCellDefinition={column.headerCellDefinition}
                  isLastColumn={index === runtimeColumns.length - 1}
                />
              }
              cell={
                <CellWrapper
                  stripeRows={stripeRows}
                  lineHeight={lineHeight}
                  isLastColumn={index === runtimeColumns.length - 1}
                  getEntity={this.getEntity}
                  rowCellDefinition={column.rowCellDefinition}
                  cellWrapperStyle={cellWrapperStyle}
                />
              }
              width={column.runtimeWidth}
              isResizable={column.sizing.type === GrowingColumnSize.TYPE} // Allow growing columns to be resized
            />))
        }
      </FixedDataTable>
    )
  }
}

export default Table
