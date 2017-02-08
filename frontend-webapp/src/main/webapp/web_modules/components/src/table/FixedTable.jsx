/**
 * LICENSE_PLACEHOLDER
 **/
import { map } from 'lodash'
import { Table, Column } from 'fixed-data-table'
import { LoadingComponent } from '@regardsoss/display-control'
import { themeContextType } from '@regardsoss/theme'
import './fixed-data-table-mui.css'
import FixedTableCell from './FixedTableCell'
import FixedTableCheckBoxCell from './FixedTableCheckBoxCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'
import Styles from './FixedTableStyles'

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
    columns: React.PropTypes.arrayOf(React.PropTypes.object),
    displayCheckbox: React.PropTypes.bool,
    onRowSelection: React.PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    const nbEntitiesByPage = this.props.pageSize * 3
    // +1 for header row
    const height = this.props.lineHeight * (this.props.pageSize + 1)
    const width = window.innerWidth
    const columnsWidth = width - 40
    this.state = {
      nbEntitiesByPage,
      height,
      width,
      columnWidths: {
        label: columnsWidth / 3,
        format: columnsWidth / 3,
        language: columnsWidth / 3,
      },
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
   * Return a cell content value with the rox index and the column name.
   * @param rowIndex
   * @param column
   * @returns {string}
   */
  getCellValue = (rowIndex, column) => {
    let value = ''
    const entity = this.props.entities[rowIndex].content
    if (entity) {
      let i = 0
      for (i = 0; i < column.attributes.length; i += 1) {
        if (entity[column.attributes[i]]) {
          value += ` ${entity[column.attributes[i]]}`
        } else {
          value += ` ${entity.attributes[column.attributes[i]]}`
        }
      }
    }
    return value
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
      console.log('LOADING FILTER')
      const styles = Styles(this.context.muiTheme).loadingFilter
      return (
        <div style={styles}>
          <LoadingComponent />
        </div>
      )
    }
    return null
  }

  render() {
    const { columnWidths, width, height } = this.state
    const styles = Styles(this.context.muiTheme)
    const totalNumberOfEntities = this.props.entities.length
    return (
      <div
        style={styles.table}
      >
        {this.renderLoadingFilter()}
        <Table
          rowHeight={this.props.lineHeight}
          headerHeight={this.props.lineHeight}
          rowsCount={totalNumberOfEntities}
          onColumnResizeEndCallback={this.onColumnResizeEndCallback}
          isColumnResizing={false}
          onScrollEnd={this.props.onScrollEnd}
          width={width}
          height={height}
        >
          {this.renderCheckBoxColumn()}
          {map(this.props.columns, column => (
            <Column
              key={column.label}
              columnKey={column.label}
              header={<FixedTableHeaderCell label={column.label} lineHeight={this.props.lineHeight} />}
              cell={<FixedTableCell getCellValue={(rowIndex, col) => this.getCellValue(rowIndex, col)} col={column} />}
              fixed
              width={columnWidths.label}
              flexgrow={1}
              isResizable
            />))}
        </Table>
      </div>
    )
  }
}

export default FixedTable
