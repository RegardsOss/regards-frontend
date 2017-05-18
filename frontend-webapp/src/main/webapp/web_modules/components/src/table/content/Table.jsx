/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Table as FixedDataTable, Column } from 'fixed-data-table-2'
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
    entities: PropTypes.arrayOf(PropTypes.object),
    pageSize: PropTypes.number.isRequired,
    onScrollEnd: PropTypes.func.isRequired,
    columns: PropTypes.arrayOf(ColumnConfiguration).isRequired,
    width: PropTypes.number.isRequired,
    selectionMode: PropTypes.string,
    // Callback to change selectionState
    onToggleSelectionMode: PropTypes.func,
    setToggledElements: PropTypes.func,
    // on selection change optional callback
    onSelectionChange: PropTypes.func,
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
    // install selection management
    this.selectionController = new SelectionController(this.props.entities, this.props.selectionMode)
    this.selectionController.setToggledElements = this.props.setToggledElements
    this.setState({
      columnsFilterPanelOpened: false,
      ...this.computeGraphicsMeasures(this.props),
    })
  }

  componentWillReceiveProps(nextProps) {
    // silently update measures
    this.selectionController.entities = nextProps.entities
    this.selectionController.selectionMode = nextProps.selectionMode
    this.selectionController.onSelectionChange = nextProps.onSelectionChange
    this.setState({ ...this.computeGraphicsMeasures(nextProps) })

    // Check table selection state
    if (nextProps.selectionMode !== this.selectionController.currentMode) {
      this.onToggleSelectAll()
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
   * Toggles row selected state
   */
  onToggleSelectRow = (rowIndex) => {
    this.selectionController.toggleRowSelectedState(rowIndex)
    this.props.setToggledElements(this.selectionController.toggledEntities)
    // requires update as selection controller model is not included in this state
    this.forceUpdate()
  }

  /**
   * Toggles select all state
   */
  onToggleSelectAll = () => {
    const previousMode = this.selectionController.currentMode
    this.selectionController.toggleSelectAll()
    if (previousMode === this.selectionController.currentMode) {
      // Toggle mode is not effective, change the mode in store
      this.props.onToggleSelectionMode()
    }
    this.props.setToggledElements(this.selectionController.toggledEntities)
    // requires update as selection controller model is not included in this state
    this.forceUpdate()
  }

  isSelectedRow = rowIndex => this.selectionController.isSelectedRow(rowIndex)

  /**
   * Computes graphics measures
   */
  computeGraphicsMeasures = ({ displayCheckbox, pageSize, lineHeight, width, columns = [] }) => {
    const { selectionColumn } = this.context.moduleTheme
  // 1 - compute height
    const nbEntitiesByPage = pageSize * 3
    const height = lineHeight * (pageSize + 1) // +1 for header row

  // 2 - compute resulting column width
  // constant column width
    const availableWidth = width - (displayCheckbox ? selectionColumn.width : 0)
    const columnWidth = Math.round(availableWidth / columns.length)
  // consume remaining space or delete last pixels
    const lastColumnWidth = availableWidth - (columnWidth * (columns.length - 1))
  // Init labelled columns width
    const columnWidths = columns.reduce((acc, { label }, index) => ({
      [label]: index === columns.length - 1 ? lastColumnWidth : columnWidth,
      ...acc,
    }), {})

    return { nbEntitiesByPage, height, width, columnWidths }
  }

  render() {
    if (!this.props.entities) {
      return null
    }
    const { cellsStyle, columns, width, lineHeight, displayCheckbox, displaySelectAll, displayColumnsHeader, onScrollEnd, onSortByColumn } = this.props
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
                  displaySelectAll={displaySelectAll}
                  areAllSelected={this.selectionController.areAllSelected()}
                  onToggleSelectAll={this.props.onToggleSelectionMode}
                  lineHeight={lineHeight}
                />}
                cell={<CheckBoxCell
                  onToggleSelectRow={this.onToggleSelectRow}
                  isSelected={this.isSelectedRow}
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
                entities={this.props.entities}
                lineHeight={this.props.lineHeight}
                overridenCellsStyle={cellsStyle}
                col={column}
                isLastColumn={index === columns.length - 1}
                onToggleSelectRow={this.onToggleSelectRow}
                isSelected={this.isSelectedRow}
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
