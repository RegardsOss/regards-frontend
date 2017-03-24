/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import split from 'lodash/split'
import { Table as FixedDataTable, Column } from 'fixed-data-table'
import { themeContextType } from '@regardsoss/theme'
import SelectionController from '../selection/SelectionController'
import FixedTableHeaderCell from './columns/ColumnHeader'
import CheckboxColumnHeader from './columns/CheckboxColumnHeader'
import Cell from './cells/Cell'
import CheckBoxCell from './cells/CheckBoxCell'
import ColumnConfiguration from './columns/model/ColumnConfiguration'
import TableConfigurationModel from './model/TableConfigurationModel'


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
    entities: React.PropTypes.arrayOf(React.PropTypes.object),
    pageSize: React.PropTypes.number.isRequired,
    onScrollEnd: React.PropTypes.func.isRequired,
    columns: React.PropTypes.arrayOf(ColumnConfiguration).isRequired,
    width: React.PropTypes.number.isRequired,
    // on selection change optional callback
    onSelectionChange: React.PropTypes.func,
    // table configuration properties
    ...TableConfigurationModel,
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
      ...Table.computeGraphicsMeasures(props),
    }
    // install selection management
    this.selectionController = new SelectionController(props.entities)
  }

  componentWillReceiveProps(nextProps) {
    // silently update measures
    this.selectionController.entities = nextProps.entities
    this.selectionController.onSelectionChange = nextProps.onSelectionChange
    this.setState({ ...Table.computeGraphicsMeasures(nextProps) })
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
   * Toggles row selected state
   */
  onToggleSelectRow = (rowIndex) => {
    this.selectionController.toggleRowSelectedState(rowIndex)
    // requires update as selection controller model is not included in this state
    this.forceUpdate()
  }

  /**
   * Toggles select all state
   */
  onToggleSelectAll = () => {
    this.selectionController.toggleSelectAll()
    // requires update as selection controller model is not included in this state
    this.forceUpdate()
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

  isSelectedCell = rowIndex => this.selectionController.isSelectedRow(rowIndex)

  render() {
    if (!this.props.entities) {
      return null
    }
    const { cellsStyle, columns, width, lineHeight, displayCheckbox, displayColumnsHeader, onScrollEnd, onSortByColumn } = this.props
    const { columnWidths, height } = this.state
    const { selectionColumn } = this.context.moduleTheme
    const totalNumberOfEntities = this.props.entities.length
    return (
      <FixedDataTable
        rowHeight={lineHeight}
        headerHeight={displayColumnsHeader ? lineHeight : 0}
        rowsCount={totalNumberOfEntities}
        onColumnResizeEndCallback={this.onColumnResizeEndCallback}
        isColumnResizing={false}
        onScrollEnd={onScrollEnd}
        width={width}
        height={height}
      >
        { // render selection column
          displayCheckbox ?
            (
              <Column
                key={'selection.column'}
                columnKey={'checkbox'}
                header={<CheckboxColumnHeader
                  areAllSelected={this.selectionController.areAllSelected()}
                  onToggleSelectAll={this.onToggleSelectAll}
                  lineHeight={lineHeight}
                />}
                cell={<CheckBoxCell
                  onToggleSelectRow={this.onToggleSelectRow}
                  isSelected={this.isSelectedCell}
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
                  isLastColumn={index === columns.length - 1}
                />}
              cell={<Cell
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
      </FixedDataTable>
    )
  }
}

export default Table
