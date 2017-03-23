/**
 * LICENSE_PLACEHOLDER
 **/
import concat from 'lodash/concat'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import remove from 'lodash/remove'
import { FormattedMessage } from 'react-intl'
import Measure from 'react-measure'
import { Table, Column } from 'fixed-data-table'
import FlatButton from 'material-ui/FlatButton'
import ColumnsAction from 'material-ui/svg-icons/action/settings'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import ShowableAtRender from '../cards/ShowableAtRender'
import FixedTableCell from './FixedTableCell'
import FixedTableCheckBoxCell from './FixedTableCheckBoxCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'
import ColumnConfiguration from './model/ColumnConfiguration'
import TableColumnFilterComponent from './TableColumnFilterComponent'
import FixedTableHeader from './FixedTableHeader'
import Styles from './FixedTableStyles'
import './fixed-data-table-mui.css'

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
    // adds tabs buttons to results table
    resultsTabsButtons: React.PropTypes.arrayOf(React.PropTypes.node),
    // adds custom table options, nearside parmaeters
    customTableOptions: React.PropTypes.arrayOf(React.PropTypes.node),
    // shows a custom table header area instand of results count, just above columns
    customTableHeaderArea: React.PropTypes.node,
    // should show parameters button?
    showParameters: React.PropTypes.bool.isRequired,
    // Display table header toolbar ?
    displayTableHeader: React.PropTypes.bool,
    // Display columns header?
    displayColumnsHeader: React.PropTypes.bool,
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
    entitiesFetching: React.PropTypes.bool,
    lineHeight: React.PropTypes.number.isRequired,
    pageSize: React.PropTypes.number.isRequired,
    onScrollEnd: React.PropTypes.func.isRequired,
    columns: React.PropTypes.arrayOf(ColumnConfiguration),
    cellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
    displayCheckbox: React.PropTypes.bool,
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
    const width = 0
    const columnWidths = {}
    forEach(this.props.columns, (column) => {
      columnWidths[column.label] = 0
    })

    this.state = {
      nbEntitiesByPage,
      height,
      width, // will be initialized on measure
      columnWidths,
      columnsFilterPanelOpened: false,
      hiddenColumns: [],
    }
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
   * Called when component is resized, to force the inner table implementation at same width
   */
  onComponentResized = ({ width }) => {
    // avoid handling event if same width...
    if (this.state.width !== width) {
      const { columns } = this.props
      // constant column width
      const columnWidth = Math.round(width / columns.length)
      // consume remaining space or delete last pixels
      const lastColumnWidth = width - (columnWidth * (columns.length - 1))
      // Init columns width
      const columnWidths = columns.reduce((acc, { label }, index) => ({
        [label]: index === columns.length - 1 ? lastColumnWidth : columnWidth,
        ...acc,
      }), {})
      this.setState({
        width,
        columnWidths,
      })
    }
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
          header={<FixedTableHeaderCell lineHeight={this.props.lineHeight} isLastColumn={false} fixed />}
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
  renderHeaderBar = () => {
    const { showParameters, resultsTabsButtons, customTableOptions, customTableHeaderArea, displayTableHeader, entities } = this.props
    const { columnsFilterPanelOpened } = this.state

    let options = customTableOptions
    if (showParameters) {
      // add parameters options at end
      options = options.concat([
        <FlatButton
          key="inner.parameters.table.option"
          onTouchTap={this.openColumnsFilterPanel}
          label={<FormattedMessage id="table.filter.columns" />}
          icon={<ColumnsAction />}
          secondary={columnsFilterPanelOpened}
        />,
      ])
    }

    return (
      <ShowableAtRender show={!!displayTableHeader}>
        <FixedTableHeader
          resultsTabsButtons={resultsTabsButtons}
          customTableOptions={options}
          customTableHeaderArea={customTableHeaderArea}
          resultsCount={entities.length}
        />
      </ShowableAtRender>
    )
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
    if (!this.props.entities) {
      return null
    }
    const { cellsStyle, columns, lineHeight, displayColumnsHeader, onScrollEnd, onSortByColumn } = this.props
    const { hiddenColumns, columnWidths, width, height } = this.state
    const totalNumberOfEntities = this.props.entities.length
    // compute visible columns list
    const visibleColumns = columns.filter(({ label }) => !hiddenColumns.includes(label))

    return (
      <Measure onMeasure={this.onComponentResized}>
        <div style={{ width: '100%' }}>
          {this.renderHeaderBar()}
          {this.renderLoadingFilter()}
          <Table
            rowHeight={lineHeight}
            headerHeight={displayColumnsHeader ? lineHeight : 0}
            rowsCount={totalNumberOfEntities}
            onColumnResizeEndCallback={this.onColumnResizeEndCallback}
            isColumnResizing={false}
            onScrollEnd={onScrollEnd}
            width={width}
            height={height}
          >
            {this.renderCheckBoxColumn()}
            {map(visibleColumns, (column, index) => {
              const columnWidth = column.fixed ? column.fixed : columnWidths[column.label]
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
                      isLastColumn={index === visibleColumns.length - 1}
                    />}
                  cell={<FixedTableCell
                    getCellValue={(rowIndex, col) => this.getCellValue(rowIndex, col, column.customCell)}
                    overridenCellsStyle={cellsStyle}
                    col={column}
                    isLastColumn={index === visibleColumns.length - 1}
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
        </div >
      </Measure >
    )
  }
}

export default FixedTable
