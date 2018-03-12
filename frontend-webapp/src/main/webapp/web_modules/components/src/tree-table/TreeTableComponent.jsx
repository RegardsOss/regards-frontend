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
import compose from 'lodash/fp/compose'
import flatMap from 'lodash/flatMap'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import omit from 'lodash/omit'
import { Table, TableBody, TableHeader, TableRow, TableRowColumn, TableHeaderColumn } from 'material-ui/Table'
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
    // ... other Material UI table properties
  }

  /** List of property keys that should not be reported to sub component */
  static NON_REPORTED_PROPS = [
    'model',
    'buildTreeTableRows',
    'buildCellComponent',
    'columns',
  ]

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static ROOT_ROW_KEY = 'inner.model.root.row'

  /** Lyfecycle method: component will mount. Used here to rebuild rows and local model from model */
  componentWillMount = () => this.onPropertiesChanged({}, this.props)

  /**
   * Lyfecycle method: component receive props. Used here to rebuild rows and local model from model
   * @param nextProps next properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesChanged(this.props, nextProps)

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
  renderRow = (row, indexInLevel, parentIndexChain = [], leftIndentation = this.context.moduleTheme.firstCell.leftMarginForLevel) => {
    const {
      moduleTheme: {
        oddLevelRowStyle, evenLevelRowStyle, expandCell, firstCell,
      },
    } = this.context
    const depthLevel = parentIndexChain.length
    const uniqueKeyChain = [...parentIndexChain, indexInLevel]

    // 2 - Render the parent row
    const rootRow = (
      // sadly here we have to use an inline lambda, because MUI table accept only MUI table rows
      <TableRow
        key={row.key}
        onDoubleClick={() => this.onToggleExpanded(row)}
        style={depthLevel % 2 === 0 ? evenLevelRowStyle : oddLevelRowStyle}
      >
        { // render all cell values
          row.rowCells.map((rowCell, columnIndex) =>
            this.renderCell(rowCell, columnIndex, depthLevel, leftIndentation))
        }
        {/* add last column cell for expand collapse */}
        <TableRowColumn key={`${row.key}.cell.expand`} style={expandCell.style}>
          {
            // render: nothing when row has no sub row, or expanded / collapsed icon
            row.subRows.length ?
              <ExpandCollapseComponent rowModel={row} onToggleExpanded={this.onToggleExpanded} /> : null
          }
        </TableRowColumn>
      </TableRow >)
    // 3 - Render sub level rows
    const subRows = row.expanded && row.subRows.length ?
      flatMap(row.subRows, (subRow, indexInSubLevel) =>
        this.renderRow(subRow, indexInSubLevel, uniqueKeyChain, leftIndentation + firstCell.leftMarginForLevel)) : []
    return [rootRow, ...subRows]
  }

  render() {
    const { columns } = this.props
    const { moduleTheme: { expandCell } } = this.context
    // report to table any property that is not specific to this component
    const tableProperties = omit(this.props, TreeTableComponent.NON_REPORTED_PROPS)
    const { tableRootRow } = this.state

    return (
      <Table selectable={false} {...tableProperties}>
        {/* Table header with user columns */}
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
        </TableHeader>
        {/* Table body, hacked into a recursive rendered tree */}
        <TableBody
          displayRowCheckbox={false}
          showRowHover
        >
          {
            flatMap(tableRootRow.subRows, (row, indexInLevel) => this.renderRow(row, indexInLevel))
          }
        </TableBody>
      </Table >
    )
  }
}

// Export, by default, this componenent with i18n and styles (use class export to customize)
export default compose(withI18n(messages, true), withModuleStyle({ styles }, true))(TreeTableComponent)
