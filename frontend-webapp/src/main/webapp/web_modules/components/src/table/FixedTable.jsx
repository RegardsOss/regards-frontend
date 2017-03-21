/**
 * LICENSE_PLACEHOLDER
 **/
import root from 'window-or-global'
import { map, forEach, reduce, split, remove, concat } from 'lodash'
import { Table, Column } from 'fixed-data-table'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import FilterList from 'material-ui/svg-icons/content/filter-list'
import IconButton from 'material-ui/IconButton'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import './fixed-data-table-mui.css'
import FixedTableCell from './FixedTableCell'
import FixedTableCheckBoxCell from './FixedTableCheckBoxCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'
import Styles from './FixedTableStyles'
import ColumnConfiguration from './model/ColumnConfiguration'
import TableColumnFilterComponent from './TableColumnFilterComponent'

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
class FixedTable extends React.Component {

  /**
   * PageActions : BasicPageableActions of the entities to manage
   * PageSelector : BasicPageableSelectors of the entities to manage
   * pageSize : Optional, number of visible entity into the table. Default 20.
   * lineHeight: Optional, default 40px
   * @type {{PageActions: *, PageSelector: *, pageSize: *, requestParams: *, entities: *, pageMetadata: *, fetchEntities: *, entitiesFetching: *}}
   */
  static propTypes = {
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
    entitiesFetching: React.PropTypes.bool,
    lineHeight: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    onScrollEnd: React.PropTypes.func.isRequired,
    columns: React.PropTypes.arrayOf(ColumnConfiguration),
    cellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
    displayCheckbox: React.PropTypes.bool,
    displayHeader: React.PropTypes.bool,
    onRowSelection: React.PropTypes.func,
    onSortByColumn: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    const nbEntitiesByPage = this.props.pageSize * 3
    // +1 for header row
    const height = this.props.lineHeight * (this.props.pageSize + 1)
    const width = window.innerWidth - 30
    const totalColumnsWidth = width - 40

    // Init columns width
    const columnWidths = {}
    forEach(this.props.columns, (column) => {
      columnWidths[column.label] = totalColumnsWidth / this.props.columns.length
    })

    this.state = {
      nbEntitiesByPage,
      height,
      width,
      columnWidths,
      columnsFilterPanelOpened: false,
      hiddenColumns: [],
    }
  }

  componentDidMount() {
    root.window.addEventListener('resize', this.updateColumnSize)
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
   * Return a cell content value with the rox index and the column name.
   * @param rowIndex
   * @param column
   * @param rendererComponent type {customCell, props}
   * @returns {string}
   */
  getCellValue = (rowIndex, column, rendererComponent) => {
    const entity = this.props.entities[rowIndex]
    if (entity && entity.content) {
      let i = 0
      // If a custom renderer is provided use it
      if (rendererComponent) {
        const attributes = {}
        for (i = 0; i < column.attributes.length; i += 1) {
          attributes[column.attributes[i]] = reduce(
            split(column.attributes[i], '.'),
            (result, value, key) => result[value],
            entity.content)
        }
        return React.createElement(rendererComponent.component, {
          attributes,
          entity,
          lineHeight: this.props.lineHeight,
          ...rendererComponent.props,
        })
      }
      // No custom component, render attribute as a string.
      let resultValue = ''
      for (i = 0; i < column.attributes.length; i += 1) {
        console.log("PLOP")
        const attrValue = reduce(split(column.attributes[i], '.'), (result, value, key) => result[value], entity.content)
        if (entity.content[column.attributes[i]]) {
          resultValue += ` ${attrValue}`
        } else {
          resultValue += ` ${attrValue}`
        }
      }
      return resultValue
    }
    return null
  }

  /**
   * Callback to update columns size after window resize event
   */
  updateColumnSize = () => {
    const width = window.innerWidth - 30
    const totalColumnsWidth = width - 40
    // Init columns width
    const columnWidths = {}
    forEach(this.props.columns, (column) => {
      columnWidths[column.label] = totalColumnsWidth / this.props.columns.length
    })
    this.setState({
      width,
      columnWidths,
    })
  }

  /**
   * Open the column visibility panel
   */
  openColumnsFilterPanel = () => {
    this.setState({
      columnsFilterPanelOpened: true,
    })
  }

  /**
   * Close the column visibility panel
   */
  closeColumnsFilterPanel = () => {
    this.setState({
      columnsFilterPanelOpened: false,
    })
  }

  /**
   * Update column visibility
   * @param column
   */
  changeColumnVisibility = (column) => {
    const hc = concat([], this.state.hiddenColumns)
    if (hc.includes(column)) {
      remove(hc, col => column === col)
    } else {
      hc.push(column)
    }
    this.setState({
      hiddenColumns: hc,
    })
  }

  /**
   * Render the first column with a checkbox inside to allow line selection
   * @returns {*}
   */
  renderCheckBoxColumn = () => {
    if (this.props.displayCheckbox) {
      return (
        <Column
          key={'checkbox'}
          columnKey={'checkbox'}
          header={<FixedTableHeaderCell lineHeight={this.props.lineHeight} fixed />}
          cell={<FixedTableCheckBoxCell
            selectRow={this.props.onRowSelection}
            isSelected={idx => this.props.entities[idx].selected}
          />}
          fixed
          width={40}
        />
      )
    }
    return null
  }

  /**
   * Render the loading to inform user thaht entities are fetching
   * @param height
   * @returns {*}
   */
  renderLoadingFilter = () => {
    if (this.props.entitiesFetching) {
      const styles = Styles(this.context.muiTheme).loadingFilter
      return (
        <div style={styles}>
          <LoadingComponent />
        </div>
      )
    }
    return null
  }

  /**
   * Render the toolbar over the table
   */
  renderToolbar = () => {
    if (this.props.displayHeader) {
      return (
        <Toolbar style={{ minWidth: this.state.width }}>
          <ToolbarTitle
            text={`${this.props.entities.length} results`}
            style={{ color: this.context.muiTheme.palette.textColor }}
          />
          <ToolbarGroup>
            <IconButton tooltip="Filter columns" onTouchTap={this.openColumnsFilterPanel}>
              <FilterList />
            </IconButton>
          </ToolbarGroup>
        </Toolbar>
      )
    }
    return null
  }

  /**
   * Display the cloumn filter panel
   * @returns {*}
   */
  renderColumnsFilterPanel = () => {
    if (this.state.columnsFilterPanelOpened) {
      return (
        <TableColumnFilterComponent
          columns={this.props.columns}
          hiddenColumns={this.state.hiddenColumns}
          changeColumnVisibility={this.changeColumnVisibility}
          closePanel={this.closeColumnsFilterPanel}
        />
      )
    }
    return null
  }

  render() {
    const { columnWidths, width, height } = this.state
    if (!this.props.entities) {
      return null
    }


    const totalNumberOfEntities = this.props.entities.length
    return (
      <div>
        {this.renderToolbar()}
        {this.renderLoadingFilter()}
        <Table
          rowHeight={this.props.lineHeight}
          headerHeight={this.props.displayHeader ? this.props.lineHeight : 0}
          rowsCount={totalNumberOfEntities}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          isColumnResizing={false}
          onScrollEnd={this.props.onScrollEnd}
          width={width}
          height={height}
        >
          {this.renderCheckBoxColumn()}
          {map(this.props.columns, (column) => {
            if (this.state.hiddenColumns.includes(column.label)) {
              return null
            }
            const columnWidth = column.fixed ? column.fixed : columnWidths[column.label]
            if (columnWidth) {
              return (<Column
                key={column.label}
                columnKey={column.label}
                header={<FixedTableHeaderCell
                  label={column.hideLabel ? '' : column.label}
                  lineHeight={this.props.lineHeight}
                  sortable={column.sortable}
                  sortAction={type => this.props.onSortByColumn(column, type)}
                />}
                cell={<FixedTableCell
                  getCellValue={(rowIndex, col) => this.getCellValue(rowIndex, col, column.customCell)}
                  col={column}
                  cellsStyle={this.props.cellsStyle}
                />}
                width={columnWidth}
                flexGrow={1}
                isResizable={column.fixed === undefined}
              />)
            }
            return null
          })}
        </Table>
        {this.renderColumnsFilterPanel()}
      </div>
    )
  }
}

export default FixedTable
