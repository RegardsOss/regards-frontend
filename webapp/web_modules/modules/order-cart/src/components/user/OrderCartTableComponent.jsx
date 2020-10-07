/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import reduce from 'lodash/reduce'
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'
import { Measure, ScrollArea } from '@regardsoss/adapters'
import { BasicListSelectors, BasicSignalActions } from '@regardsoss/store-utils'
import { ManageDatasetProcessingContainer } from '@regardsoss/entities-common'
import { TreeTableComponent, TreeTableRow, TableLayout } from '@regardsoss/components'
import DeleteDatasetSelectionContainer from '../../containers/user/options/DeleteDatasetSelectionContainer'
import DeleteDatedItemSelectionContainer from '../../containers/user/options/DeleteDatedItemSelectionContainer'
import ShowDatedItemSelectionDetailContainer from '../../containers/user/options/ShowDatedItemSelectionDetailContainer'
import OrderCartContentSummaryComponent from './OrderCartContentSummaryComponent'
import ObjectsCountCellRenderComponent from './ObjectsCountCellRenderComponent'
import styles from '../../styles'

/**
* Shows order cart content as a tree table
* @author Raphaël Mechali
*/
export class OrderCartTableComponent extends React.Component {
  static propTypes = {
    showDatasets: PropTypes.bool.isRequired,
    basket: OrderShapes.Basket,
    isFetching: PropTypes.bool.isRequired,
    onShowDuplicatedMessage: PropTypes.func.isRequired,
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    linkProcessingDatasetActions: PropTypes.instanceOf(BasicSignalActions).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Column keys */
  static ColumnKeys = {
    ID: 'id',
    OBJECTS_COUNT: 'objects.count',
    FILES_SIZE: 'files.size',
    PROCESSING: 'processing',
    OPTIONS_DETAIL: 'options.detail',
    OPTIONS_DELETE: 'options.delete',
  }

  /** Columns models */
  static COLUMNS_DEFINITION = [
    { key: OrderCartTableComponent.ColumnKeys.ID },
    { key: OrderCartTableComponent.ColumnKeys.OBJECTS_COUNT, labelKey: 'order-cart.module.basket.table.column.objects.count' },
    { key: OrderCartTableComponent.ColumnKeys.FILES_SIZE, labelKey: 'order-cart.module.basket.table.column.files.size' },
    { key: OrderCartTableComponent.ColumnKeys.PROCESSING, labelKey: null, isOption: false },
    { key: OrderCartTableComponent.ColumnKeys.OPTIONS_DETAIL, labelKey: null, isOption: true },
    { key: OrderCartTableComponent.ColumnKeys.OPTIONS_DELETE, labelKey: null, isOption: true }]

  /** Columns index as cache (render time optimization) */
  static COLUMN_KEY_BY_INDEX = reduce(OrderCartTableComponent.ColumnKeys, (acc, columnKey) => ({
    ...acc,
    [OrderCartTableComponent.COLUMNS_DEFINITION.findIndex(({ key }) => key === columnKey)]: columnKey,
  }), {})

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
   * Computes total objects count for a list of items selections
   * @param itemsSelections items selections
   * @return {number} total objects count over all items selections
   */
  static getTotalSelectionsObjectsCount(itemsSelections) {
    return itemsSelections.reduce((acc, { objectsCount }) => acc + objectsCount, 0)
  }

  /**
   * Converts an octet storage value into a storage capacity
   * @param {number} size size in bytes
   * @return {storage.StorageCapacity} converted capacity
   */
  static getStorageCapacity(size) {
    if (size) {
      const capacityInOctet = new storage.StorageCapacity(size, storage.units.BYTE)
      // let algorithm decide the best unity for that capacity
      return capacityInOctet.scaleAndConvert(storage.StorageUnitScale.bytesScale)
    }
    return null
  }

  /**
   * Initial state
   */
  state = {
    scrollAreaStyle: {
      height: 0,
    },
  }

  /**
   * Component resized event
   */
  onComponentResized = ({ measureDiv: { height } }) => {
    const previousHeight = this.state.scrollAreaStyle.height
    this.setState({
      // XXX-WORKAROUND see InfiniteTableContainer for more explanation (in this case, the component will simply not resize when
      // size is lower)
      scrollAreaStyle: {
        height: height <= previousHeight ? height - 100 : height,
      },
    })
  }

  /**
   * Builds table rows for basket as parameter (model to tree model converter)
   * @param {*} basket current basket model (optional) as described in Basket shape
   * @return [TreeTableRow] root tree table rows
   */
  buildTableRows = (basket = { datasetSelections: [] }) => {
    // When showing datasets, map datasets to rows, otherwise, map directly selection items into root rows
    const { showDatasets } = this.props
    if (showDatasets) {
      // datasets as root rows
      return basket.datasetSelections.map((selection) => this.buildDatasetSelectionRow(selection, basket.datasetSelections.length <= OrderCartTableComponent.AUTO_EXPANDED_DS_SELECTIONS_COUNT))
    }
    // selections as root rows, datasets hidden
    return flatMap(basket.datasetSelections, ({ id, datasetLabel, itemsSelections }) => itemsSelections.map((itemSelection) => this.buildDatedSelectionRow(id, datasetLabel, itemSelection)))
  }

  /**
   * Builds a dataset selection row
   * @param {*} datasetSelection dataset selection, as described by BasketDatasetSelection
   * @return TreeTableRow for the dataset selection as parameter
   */
  buildDatasetSelectionRow = ({
    id, datasetIpid, datasetLabel, objectsCount, filesSize, itemsSelections = [], process,
  }, rowExpanded) => new TreeTableRow(
    `dataset.selection.${id}`, [datasetLabel, {
      effectiveObjectsCount: objectsCount,
      totalObjectsCount: OrderCartTableComponent.getTotalSelectionsObjectsCount(itemsSelections),
    }, OrderCartTableComponent.getStorageCapacity(filesSize), {
      datasetSelectionIpId: datasetIpid,
      process,
    },
    null, { // keep dataset selection id
      datasetSelectionId: id,
    }], itemsSelections.map((datedSelectionItem) => this.buildDatedSelectionRow(id, datasetLabel, datedSelectionItem)), // sub rows
    rowExpanded,
  )

  /**
   * Builds a dated selection item row
   * @param {*} datasetSelection dataset selection, as described by BasketDatedItemsSelection
   * @return TreeTableRow for the dated selection item
   */
  buildDatedSelectionRow = (datasetSelectionId, datasetLabel, {
    date, objectsCount, filesSize, selectionRequest,
  }) => new TreeTableRow(`dated.item.selection.${datasetSelectionId}-${date}`, [date, {
    // cannot know the effective objects count here, but total is OK as we do not want to show the warning one those cells
    effectiveObjectsCount: objectsCount,
    totalObjectsCount: objectsCount,
  }, OrderCartTableComponent.getStorageCapacity(filesSize), null, { // scale the size to the level its the more readable
    datasetLabel, date, selectionRequest,
  }, { // keep label, date and request for detail option
    datasetSelectionId, itemsSelectionDate: date,
  }, // keep parent id and date for delete option
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

    // specify options columns styles
    let style
    switch (columnID) {
      case OrderCartTableComponent.ColumnKeys.OPTIONS_DETAIL:
      case OrderCartTableComponent.ColumnKeys.OPTIONS_DELETE:
        style = table.optionColumn.style
        break
      case OrderCartTableComponent.ColumnKeys.PROCESSING:
        style = table.optionColumn.processingStyle
        break
      default:
        style = undefined
    }

    return (
      <TableRowColumn
        key={`cell-${columnIndex}`}
        style={style}
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
    const {
      showDatasets, isFetching, onShowDuplicatedMessage, isProcessingDependenciesExist, processingSelectors,
      pluginMetaDataSelectors, linkProcessingDatasetActions,
    } = this.props

    // is it a dataset cell or a dated item selection cell?

    const isDatasetCell = level === 0 && showDatasets

    // transform content into element, according with column and level (dataset or selection)
    switch (columnID) {
      // ID column
      case OrderCartTableComponent.ColumnKeys.ID:
        return isDatasetCell
          // dataset: no change (use label)
          ? cellValue
          // selection: format date
          : `${formatDate(new Date(Date.parse(cellValue)), OrderCartTableComponent.SELECTION_DATE_OPTIONS)}`
      // files size: cell value is a storage capacity (or undefined), render it internationalized
      case OrderCartTableComponent.ColumnKeys.OBJECTS_COUNT:
        return (
          <ObjectsCountCellRenderComponent
            onShowDuplicatedMessage={onShowDuplicatedMessage}
            {...cellValue}
          />)
      case OrderCartTableComponent.ColumnKeys.FILES_SIZE:
        return <storage.FormattedStorageCapacity capacity={cellValue} />
      // processing option
      case OrderCartTableComponent.ColumnKeys.PROCESSING: {
        // extract option parameters from cell value
        return isDatasetCell && isProcessingDependenciesExist
          // Only show processing button option for datasets
          ? <ManageDatasetProcessingContainer
            datasetIpid={cellValue.datasetSelectionIpId}
            process={cellValue.process}
            processingSelectors={processingSelectors}
            pluginMetaDataSelectors={pluginMetaDataSelectors}
            linkProcessingDatasetActions={linkProcessingDatasetActions}
            disabled={isFetching}
          />
          : null
      }
      // detail option
      case OrderCartTableComponent.ColumnKeys.OPTIONS_DETAIL:
        return isDatasetCell
          // dataset: no detail
          ? null
          // selection: detail option, cell value is open search request
          : <ShowDatedItemSelectionDetailContainer
            datasetLabel={cellValue.datasetLabel}
            date={cellValue.date}
            selectionRequest={cellValue.selectionRequest}
            disabled={isFetching}
          />
      // delete option
      case OrderCartTableComponent.ColumnKeys.OPTIONS_DELETE: {
        // extract option parameters from cell value
        const { datasetSelectionId, itemsSelectionDate } = cellValue
        return isDatasetCell
          // dataset: delete dataset
          ? <DeleteDatasetSelectionContainer
            datasetSelectionId={datasetSelectionId}
            disabled={isFetching}
          />
          : <DeleteDatedItemSelectionContainer
            datasetSelectionId={datasetSelectionId}
            itemsSelectionDate={itemsSelectionDate}
            disabled={isFetching}
          /> // selection: delete selection
      }
      // Other columns: unchanged
      default:
        return cellValue
    }
  }

  render() {
    const { basket, onShowDuplicatedMessage, isFetching } = this.props
    const { scrollAreaStyle } = this.state
    const { intl: { formatMessage }, moduleTheme: { user: { content: { table, scrollContentArea, spaceConsumer } } } } = this.context

    return (
      <TableLayout>
        { /* 1 - Show basket content summary */}
        <OrderCartContentSummaryComponent
          isFetching={isFetching}
          basket={basket}
          onShowDuplicatedMessage={onShowDuplicatedMessage}
        />
        <Measure bounds onMeasure={this.onComponentResized}>
          { /* 2 - Show basket added objects sets (stretch to avoid height) */
            (({ bind }) => (
              <div style={spaceConsumer} {...bind('measureDiv')}>
                <ScrollArea
                  style={scrollAreaStyle}
                  contentStyle={scrollContentArea}
                  vertical
                >
                  <TreeTableComponent
                    model={basket}
                    buildTreeTableRows={this.buildTableRows}
                    buildCellComponent={this.buildTableCell}
                    columns={OrderCartTableComponent.COLUMNS_DEFINITION.map(({ key, labelKey, isOption }) => (
                      <TableHeaderColumn
                        key={key}
                        style={isOption ? table.optionColumn.style : undefined}
                      >
                        {labelKey ? formatMessage({ id: labelKey }) : null}
                      </TableHeaderColumn>))}
                  />
                </ScrollArea>
              </div>
            ))
}
        </Measure>
      </TableLayout>
    )
  }
}
export default withModuleStyle(styles)(OrderCartTableComponent)
