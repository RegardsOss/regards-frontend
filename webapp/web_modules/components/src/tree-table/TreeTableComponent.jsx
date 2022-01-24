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
import compose from 'lodash/fp/compose'
import flatMap from 'lodash/flatMap'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import {
  Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn,
} from 'material-ui/Table'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import TreeTableRow from './TreeTableRow'
import ExpandCollapseComponent from './ExpandCollapseComponent'
import messages from './i18n'
import styles from './styles/styles'

/**
* Tree table based on material UI table
* @author Raphaël Mechali
*/
export class TreeTableComponent extends React.Component {
  static propTypes = {
    /** Dynamic model (user typed) */
    // eslint-disable-next-line react/forbid-prop-types
    model: PropTypes.any, // table model, from which rows will be extracted
    /** Model to tree rows converter: (*) => [TreeTableRow] */
    buildTreeTableRows: PropTypes.func.isRequired,
    /**
     * Converts cell value into cell component (mostly for non string or internationalized / formatted cells):
     * (value:*, level(row depth):number, column:number) => TableRowColumn
     * Note: first table row column styles will be merged with a paddingLeft property (user property has higher priority).
     */
    buildCellComponent: PropTypes.func.isRequired,
    /** table columns array (use TableHeaderColumn elements) */
    columns: PropTypes.arrayOf(PropTypes.element),
    // Allows hiding header for specific table configurations (like simple trees)
    hideHeader: PropTypes.bool,
    // Stripe tree level colors (like stripe row in regular table but applied to levels)
    stripeLevelColors: PropTypes.bool,
    // Should show table row borders?
    displayTableRowBorder: PropTypes.bool,
    // Callback: on cell click. Part of material UI table API but locally wrapped to provide the corresponding row
    // (row:TreeTableRow, cellData: *) => ()
    onCellClick: PropTypes.func,
    // ... other Material UI table properties
  }

  static defaultProps = {
    hideHeader: false,
    stripeLevelColors: true,
    displayTableRowBorder: true,
  }

  /** List of property keys that should not be reported to sub component */
  static NON_REPORTED_PROPS = [
    'model',
    'buildTreeTableRows',
    'buildCellComponent',
    'columns',
    'showHeader',
    'onCellClick',
    'stripeLevelColors',
    'displayTableRowBorder',
  ]

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Root row unique ID */
  static ROOT_ROW_KEY = 'inner.model.root.row'

  /**
   * Searches row by its index in rows list
   * @param {*} rowIndex -
   * @return {{found: TreeTableRow, nextIndex: number}}  found row (null if not found), next index for recursive loops
   */
  static getRowByIndex(rowIndex, rowsList) {
    // A - flatten the tree rows, depth first, as it is displayed
    function flattenRows(rows) {
      return rows.reduce((acc, row) => [
        ...acc,
        row,
        // consider children only when row is expanded
        ...(row.expanded ? flattenRows(row.subRows) : []),
      ], [])
    }
    const flattenTreeRows = flattenRows(rowsList)
    // B - return matching element in flatten rows array
    return flattenTreeRows[rowIndex]
  }

  /** Lyfecycle method: component will mount. Used here to rebuild rows and local model from model */
  UNSAFE_componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lyfecycle method: component receive props. Used here to rebuild rows and local model from model
   * @param nextProps next properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesChanged(this.props, nextProps)

  /**
   * On properties changed detected: update local rows model
   * @param {*} oldProps old properties
   * @param {*} newProps new properties
   */
  onPropertiesChanged = ({ model: previousModel, buildTreeTableRows: previousBuilder }, { model: newModel, buildTreeTableRows: newBuilder }) => {
    const previousState = this.state

    // check if model needs to be rebuilt
    if (!isEqual(previousModel, newModel) || !isEqual(previousBuilder, newBuilder)) {
      // wrap all rows in a root tree row (allows using the rows functions when handling rows)
      const newRootRow = new TreeTableRow(TreeTableComponent.ROOT_ROW_KEY, [], newBuilder(newModel) || [])
      const previousRootRow = get(previousState, 'tableRootRow', null)
      if (previousRootRow) {
        // restore as much as possible from previous state
        newRootRow.restoreExpandedStatefrom(previousRootRow)
      }
      // update state
      this.setState({ tableRootRow: newRootRow })
    }
  }

  /**
   * Call back: on switch expanded / collapsed row
   */
  onToggleExpanded = (rowModel) => {
    rowModel.toggleExpanded()
    this.forceUpdate()
  }

  /**
   * On cell click callback local wrapper: it provides corresponding cell data and ignores last column clicks when the row is collapsible
   * @param {number} rowIndex clicked row index
   * @param {number} cellIndex clicked cell index
   */
  onCellClick = (rowIndex, cellIndex) => {
    const { onCellClick, columns } = this.props
    const { tableRootRow } = this.state
    // find in table the corresponding row (recursive)
    const clickedRow = TreeTableComponent.getRowByIndex(rowIndex, tableRootRow.subRows)
    // 2 - if the cell index is after last column:
    // 2.A- ignore event on collapsible rows
    // 2.B- provide cell index - 1 for others
    let consideredCellIndex = cellIndex
    if (cellIndex === columns.length) {
      if (clickedRow.subRows.length) {
        return // 2.A
      }
      // 2.B
      consideredCellIndex = cellIndex - 1
    }
    onCellClick(clickedRow, clickedRow.rowCells[consideredCellIndex])
  }

  /**
   * Renders a row cell
   * @param {*} rowCell row cell value
   * @param {number} columnIndex column index
   * @param {number} depth depth in tree
   * @param {number} leftIndentation left indentation in pixels
   */
  renderCell = (rowCell, columnIndex, depth, leftIndentation) => {
    const { buildCellComponent } = this.props

    // render cell content with styles
    let userCell = buildCellComponent(rowCell, depth, columnIndex)
    if (columnIndex === 0) {
      userCell = React.cloneElement(userCell, {
        ...userCell.props,
        style: {
          paddingLeft: leftIndentation, // by default indent
          ...(userCell.props.style || {}), // higher priority on user styles
        },
      })
    }
    return userCell
  }

  /**
   * Renders a tree table row
   * @param {TreeTableRow} row model
   * @param {number} indexInLevel row index in level (optional)
   * @param {[number]} parentIndexChain parent index chain (allowing to build unique keys for each row). Note that it also
   * hold the level depth info (since the parent chain contains one parent for each level)
   * @param {number} leftIndentation left indentation of current level (in pixels)
   * @return {*} Rendered React element
   */
  renderRow = (row, indexInLevel, parentIndexChain = [], leftIndentation = this.context.muiTheme.components.treeTable.firstLevelIndentation) => {
    const {
      moduleTheme: {
        oddLevelRowStyle, evenLevelRowStyle, expandCell,
      },
    } = this.context
    const { stripeLevelColors, displayTableRowBorder } = this.props
    const depthLevel = parentIndexChain.length
    const uniqueKeyChain = [...parentIndexChain, indexInLevel]

    // 2 - Render the parent row
    const rootRow = (
      // sadly here we have to use an inline lambda, because MUI table accept only MUI table rows
      <TableRow
        key={row.key}
        // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
        onDoubleClick={() => this.onToggleExpanded(row)} // eslint wont fix: during mapping (requires a subclass, which doesn't work with MUI 0x table API)
        style={stripeLevelColors && depthLevel % 2 === 1 ? oddLevelRowStyle : evenLevelRowStyle}
        displayBorder={displayTableRowBorder}
      >
        { // render all cell values
          row.rowCells.map((rowCell, columnIndex) => this.renderCell(rowCell, columnIndex, depthLevel, leftIndentation))
        }
        {/* add last column cell for expand collapse */}
        <TableRowColumn key={`${row.key}.cell.expand`} style={expandCell.style}>
          {
            // render: nothing when row has no sub row, or expanded / collapsed icon
            row.subRows.length
              ? <ExpandCollapseComponent rowModel={row} onToggleExpanded={this.onToggleExpanded} /> : null
          }
        </TableRowColumn>
      </TableRow>)
    // 3 - Render sub level rows
    const sublevelIndentation = leftIndentation + this.context.muiTheme.components.treeTable.nextLevelsIndentation
    const subRows = row.expanded && row.subRows.length
      ? flatMap(row.subRows, (subRow, indexInSubLevel) => this.renderRow(subRow, indexInSubLevel, uniqueKeyChain, sublevelIndentation)) : []
    return [rootRow, ...subRows]
  }

  render() {
    const { onCellClick, columns, hideHeader } = this.props
    const { moduleTheme: { expandCell } } = this.context
    // report to table any property that is not specific to this component
    const tableProperties = omit(this.props, TreeTableComponent.NON_REPORTED_PROPS)
    const { tableRootRow } = this.state

    return (
      <Table
        selectable={false}
        onCellClick={onCellClick ? this.onCellClick : null} // do not provide when parent did not require it
        {...tableProperties}
      >
        {/* Table header with user columns, when not hidden */
          hideHeader
            ? null
            : (
              <TableHeader
                displaySelectAll={false}
                adjustForCheckbox={false}
                enableSelectAll={false}
              >
                <TableRow>
                  {columns}
                  {/* Insert last column for collapse / expand option */}
                  <TableHeaderColumn key="inner.table.options" style={expandCell.style} />
                </TableRow>
              </TableHeader>)
        }
        {/* Table body, hacked into a recursive rendered tree */}
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            flatMap(tableRootRow.subRows, (row, indexInLevel) => this.renderRow(row, indexInLevel))
          }
        </TableBody>
      </Table>
    )
  }
}

// Export, by default, this componenent with i18n and styles (use class export to customize)
export default compose(withI18n(messages, true), withModuleStyle({ styles }, true))(TreeTableComponent)
