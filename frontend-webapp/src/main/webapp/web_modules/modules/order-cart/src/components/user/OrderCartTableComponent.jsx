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
import reduce from 'lodash/reduce'
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'
import { TreeTableComponent, TreeTableRow } from '@regardsoss/components'
import DeleteDatasetSelectionContainer from '../../containers/user/options/DeleteDatasetSelectionContainer'
import DeleteDatedItemSelectionContainer from '../../containers/user/options/DeleteDatedItemSelectionContainer'
import ShowDatedItemSelectionDetailContainer from '../../containers/user/options/ShowDatedItemSelectionDetailContainer'
import styles from '../../styles'

/**
* Shows order cart content as a tree table
* @author Raphaël Mechali
*/
export class OrderCartTableComponent extends React.Component {

  static propTypes = {
    basket: OrderShapes.Basket,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Column keys */
  static ColumnKeys = {
    ID: 'id',
    OBJECTS_COUNT: 'objects.count',
    FILES_COUNT: 'files.count',
    FILES_SIZE: 'files.size',
    OPTIONS_DETAIL: 'options.detail',
    OPTIONS_DELETE: 'options.delete',
  }

  /**
   * Converts an octet storage value into a storage capacity
   * @param {number} size size in bytes
   * @return {storage.StorageCapacity} converted capacity
   */
  static getStorageCapacity(size) {
    if (size) {
      const capacityInOctet = new storage.StorageCapacity(size, storage.StorageUnits.BYTE)
      // let algorithm decide the best unity for that capacity
      return capacityInOctet.scaleAndConvert(storage.StorageUnitScale.bytesScale)
    }
    return null
  }

  /** Columns models */
  static COLUMNS_DEFINITION = [
    { key: OrderCartTableComponent.ColumnKeys.ID, labelKey: 'order-cart.module.basket.table.column.identifier' },
    { key: OrderCartTableComponent.ColumnKeys.OBJECTS_COUNT, labelKey: 'order-cart.module.basket.table.column.objects.count' },
    { key: OrderCartTableComponent.ColumnKeys.FILES_COUNT, labelKey: 'order-cart.module.basket.table.column.files.count' },
    { key: OrderCartTableComponent.ColumnKeys.FILES_SIZE, labelKey: 'order-cart.module.basket.table.column.files.size' },
    { key: OrderCartTableComponent.ColumnKeys.OPTIONS_DETAIL, labelKey: null },
    { key: OrderCartTableComponent.ColumnKeys.OPTIONS_DELETE, labelKey: null }]

  /** Columns index as cache (render time optimization) */
  static COLUMN_KEY_BY_INDEX = reduce(OrderCartTableComponent.ColumnKeys, (acc, columnKey) => ({
    ...acc,
    [OrderCartTableComponent.COLUMNS_DEFINITION.findIndex(({ key }) => key === columnKey)]: columnKey,
  }), {})

  /** Selection level in tree table */
  static DATASET_SELECTION_LEVEL = 0

  /** Dated selection insertion level in tree table */
  static DATED_SELECTION_ADD_LEVEL = 1

  /** Formatting options for selection date */
  static SELECTION_DATE_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  /** When there is less dataset selections than this count, initially expand all rows */
  static AUTO_EXPANDED_DS_SELECTIONS_COUNT = 5

  /**
 * Builds table rows for basket as parameter (model to tree model converter)
 * @param {*} basket current basket model (optional) as described in Basket shape
 * @return [TreeTableRow] root tree table rows
 */
  buildTableRows = (basket = { datasetSelections: [] }) => basket.datasetSelections.map(selection =>
    this.buildDatasetSelectionRow(selection, basket.datasetSelections.length <= OrderCartTableComponent.AUTO_EXPANDED_DS_SELECTIONS_COUNT))

  /**
   * Builds a dataset selection row
   * @param {*} datasetSelection dataset selection, as described by BasketDatasetSelection
   * @return TreeTableRow for the dataset selection as parameter
   */
  buildDatasetSelectionRow = ({ id, datasetLabel, objectsCount, filesCount, filesSize, itemsSelections = [] }, rowExpanded) =>
    new TreeTableRow(`dataset.selection.${id}`, [datasetLabel, objectsCount, filesCount,
      OrderCartTableComponent.getStorageCapacity(filesSize), // scale the size to the level its the more readable
      null, // no detail option
      { datasetSelectionId: id }, // keep dataset selection id
    ], itemsSelections.map(datedSelectionItem => this.buildDatedSelectionRow(id, datasetLabel, datedSelectionItem)), // sub rows
      rowExpanded)

  /**
   * Builds a dated selection item row
   * @param {*} datasetSelection dataset selection, as described by BasketDatedItemsSelection
   * @return TreeTableRow for the dated selection item
   */
  buildDatedSelectionRow = (datasetSelectionId, datasetLabel, { date, objectsCount, filesCount, filesSize, openSearchRequest }) =>
    // row cell values (no sub row)
    new TreeTableRow(`dated.item.selection.${datasetSelectionId}-${date}`, [date, objectsCount, filesCount,
      OrderCartTableComponent.getStorageCapacity(filesSize), // scale the size to the level its the more readable
      { datasetLabel, date, openSearchRequest }, // keep date and request for detail option
      { datasetSelectionId, itemsSelectionDate: date }, // keep parent id and date for delete option
    ])

  /**
   * Builds table cell for cell value as parameter (see methods above to build row cell values)
   * @param cellValue value set when row was built
   * @param level level of the cell parent row
   * @param columnIndex column index of the cell
   * @return TableRowColumn component for cell
   */
  buildTableCell = (cellValue, level, columnIndex) => {
    const columnID = OrderCartTableComponent.COLUMN_KEY_BY_INDEX[columnIndex]
    const { moduleTheme: { user: { content: { table } } } } = this.context
    return (
      <TableRowColumn
        key={`cell-${columnIndex}`}
        style={
          columnID === OrderCartTableComponent.ColumnKeys.OPTIONS_DETAIL || // specify options columns styles
            columnID === OrderCartTableComponent.ColumnKeys.OPTIONS_DELETE ? table.optionColumn.style : undefined
        }
      >
        {
          this.buildTableCellContent(cellValue, level, columnID)
        }
      </TableRowColumn>)
  }

  /**
   * Builds table cell content: converts cell model content into a react component when required (leaves it  unchanged otherwise)
   */
  buildTableCellContent = (cellValue, level, columnID) => {
    const { intl: { formatDate } } = this.context
    // transform content into element, according with column and level (dataset or selection)
    switch (columnID) {
      // ID column
      case OrderCartTableComponent.ColumnKeys.ID:
        return OrderCartTableComponent.DATASET_SELECTION_LEVEL === level ?
          // dataset: no change (use label)
          cellValue :
          // selection: format date
          `${formatDate(new Date(Date.parse(cellValue)), OrderCartTableComponent.SELECTION_DATE_OPTIONS)}`
      // files size: cell value is a storage capacity (or undefined), render it internationalized
      case OrderCartTableComponent.ColumnKeys.FILES_SIZE:
        return <storage.FormattedStorageCapacity capacity={cellValue} />
      // detail option
      case OrderCartTableComponent.ColumnKeys.OPTIONS_DETAIL:
        return OrderCartTableComponent.DATASET_SELECTION_LEVEL === level ?
          // dataset: no detail
          null :
          // selection: detail option, cell value is open search request
          <ShowDatedItemSelectionDetailContainer
            datasetLabel={cellValue.datasetLabel}
            date={cellValue.date}
            openSearchRequest={cellValue.openSearchRequest}
          />
      // delete option
      case OrderCartTableComponent.ColumnKeys.OPTIONS_DELETE:
        {
          // extract option parameters from cell value
          const { datasetSelectionId, itemsSelectionDate } = cellValue
          return OrderCartTableComponent.DATASET_SELECTION_LEVEL === level ?
            // dataset: delete dataset
            <DeleteDatasetSelectionContainer
              datasetSelectionId={datasetSelectionId}
            /> :
            <DeleteDatedItemSelectionContainer
              datasetSelectionId={datasetSelectionId}
              itemsSelectionDate={itemsSelectionDate}
            /> // selection: delete selection
        }
      // Other columns: unchanged
      default:
        return cellValue
    }
  }

  render() {
    const { basket } = this.props
    const { intl: { formatMessage }, moduleTheme: { user: { content: { table } } } } = this.context
    return (
      <TreeTableComponent
        model={basket}
        buildTreeTableRows={this.buildTableRows}
        buildCellComponent={this.buildTableCell}
        columns={OrderCartTableComponent.COLUMNS_DEFINITION.map(({ key, labelKey }) =>
          (<TableHeaderColumn
            key={key}
            style={!labelKey ? table.optionColumn.style : undefined} // set up custom option columns style
          >{labelKey ? formatMessage({ id: labelKey }) : null}</TableHeaderColumn>))}
      />
    )
  }
}
export default withModuleStyle(styles)(OrderCartTableComponent)
