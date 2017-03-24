/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import { Table, Column } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'
import FixedTableCell from './FixedTableCell'
import FixedTableCheckBoxCell from './FixedTableCheckBoxCell'
import FixedTableHeaderCell from './FixedTableHeaderCell'
import ColumnConfiguration from './model/ColumnConfiguration'
import './fixed-data-table-mui.css'


/**
 * Static table configuration: all table properties that are
 */
export const tableConfiguration = {
  displayColumnsHeader: React.PropTypes.bool,
  lineHeight: React.PropTypes.number.isRequired,
  cellsStyle: React.PropTypes.objectOf(React.PropTypes.string),
  displayCheckbox: React.PropTypes.bool,
  onSortByColumn: React.PropTypes.func,
}

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
   */
  static propTypes = {
    // dynamic properties
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
    pageSize: React.PropTypes.number.isRequired,
    onRowSelection: React.PropTypes.func,
    onScrollEnd: React.PropTypes.func.isRequired,
    columns: React.PropTypes.arrayOf(ColumnConfiguration).isRequired,
    width: React.PropTypes.number.isRequired,
    // table configuration properties
    ...tableConfiguration,
  }

  static contextTypes = {
    ...themeContextType,
  }

  static defaultProps = {
    displayCheckbox: false,
  }

  /**
   * Computes graphics measures
   */
  static computeGraphicsMeasures = ({ pageSize, lineHeight, width, columns = [] }) => {
    // 1 - compute height
    const nbEntitiesByPage = pageSize * 3
    const height = lineHeight * (pageSize + 1) // +1 for header row

    // 2 - compute resulting column width
    // constant column width
    const columnWidth = Math.round(width / columns.length)
    // consume remaining space or delete last pixels
    const lastColumnWidth = width - (columnWidth * (columns.length - 1))
    // Init labelled columns width
    const columnWidths = columns.reduce((acc, { label }, index) => ({
      [label]: index === columns.length - 1 ? lastColumnWidth : columnWidth,
      ...acc,
    }), {})

    return { nbEntitiesByPage, height, width, columnWidths }
  }

  constructor(props) {
    super(props)
    this.state = {
      columnsFilterPanelOpened: false,
      ...FixedTable.computeGraphicsMeasures(props),
    }
  }

  componentWillReceiveProps(nextProps) {
    // silently update measures
    this.setState({ ...FixedTable.computeGraphicsMeasures(nextProps) })
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
  getCellValue = (rowIndex, column) => {
    const { entities, lineHeight } = this.props
    const entity = entities[rowIndex]
    const rendererComponent = column.customCell
    if (entity && entity.content) {
      let i = 0
      // If a custom renderer is provided use it
      if (rendererComponent) {
        const attributes = {}
        for (i = 0; i < column.attributes.length; i += 1) {
          attributes[column.attributes[i]] = reduce(
            split(column.attributes[i], '.'),
            (result, value, key) => {
              if (result) {
                return result[value]
              }
              return null
            }, entity.content)
        }
        return React.createElement(rendererComponent.component, {
          attributes,
          entity,
          lineHeight,
          ...rendererComponent.props,
        })
      }
      // No custom component, render attribute as a string.
      let resultValue = ''
      for (i = 0; i < column.attributes.length; i += 1) {
        const attrValue = reduce(split(column.attributes[i], '.'), (result, value, key) => {
          if (result) {
            return result[value]
          }
          return ''
        }, entity.content)
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

  render() {
    if (!this.props.entities) {
      return null
    }
    const { cellsStyle, columns, width, lineHeight, displayColumnsHeader, onScrollEnd, onSortByColumn } = this.props
    const { columnWidths, height } = this.state
    const totalNumberOfEntities = this.props.entities.length
    return (
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
                  isLastColumn={index === columns.length - 1}
                />}
              cell={<FixedTableCell
                getCellValue={this.getCellValue}
                overridenCellsStyle={cellsStyle}
                col={column}
                isLastColumn={index === columns.length - 1}
              />}
              width={columnWidth}
              flexGrow={1}
              isResizable={column.fixed === undefined}
            />)
          }
          return null
        })}
      </Table>
    )
  }
}

export default FixedTable
