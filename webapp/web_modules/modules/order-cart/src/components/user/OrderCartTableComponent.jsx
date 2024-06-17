/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import flatMap from 'lodash/flatMap'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import { OrderShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { storage } from '@regardsoss/units'
import { Measure, ScrollArea } from '@regardsoss/adapters'
import { BasicListSelectors, BasicSignalActions } from '@regardsoss/store-utils'
import {
  ManageDatasetProcessingContainer, QUOTA_INFO_STATE_ENUM, QuotaInfo, withQuotaInfo,
} from '@regardsoss/entities-common'
import { TreeTableComponent, TreeTableRow, TableLayout } from '@regardsoss/components'
import { UIDomain } from '@regardsoss/domain'
import { fileFiltersActions } from '../../client/FileFiltersClient'
import DeleteDatasetSelectionContainer from '../../containers/user/options/DeleteDatasetSelectionContainer'
import DeleteDatedItemSelectionContainer from '../../containers/user/options/DeleteDatedItemSelectionContainer'
import ShowDatedItemSelectionDetailContainer from '../../containers/user/options/ShowDatedItemSelectionDetailContainer'
import ManageDatasetFileFiltersContainer from '../../containers/user/ManageDatasetFileFiltersContainer'
import ObjectsCountCellRenderComponent from './ObjectsCountCellRenderComponent'
import TotalQuotaRenderComponent from './TotalQuotaRenderComponent'

/**
* Shows order cart content as a tree table
* @author Raphaël Mechali
* @author Théo Lasserre
*/
export class OrderCartTableComponent extends React.Component {
  static propTypes = {
    showDatasets: PropTypes.bool.isRequired,
    showProcessings: PropTypes.bool.isRequired,
    showFilters: PropTypes.bool.isRequired,
    basket: OrderShapes.Basket,
    refreshBasket: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    onShowDuplicatedMessage: PropTypes.func.isRequired,
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    linkProcessingDatasetActions: PropTypes.instanceOf(BasicSignalActions).isRequired,
    isFileFilterDependenciesExist: PropTypes.bool.isRequired,
    // from withQuotaInfo
    quotaInfo: QuotaInfo,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Possible row types */
  static ROW_TYPE_ENUM = {
    DATASET_ROW: 'DATASET_ROW',
    DATED_SELECTION_ROW: 'DATED_SELECTION_ROW',
    TOTAL_ROW: 'TOTAL_ROW',
  }

  /** Column keys */
  static COLUMN_KEYS = {
    ID: 'id',
    OBJECTS_COUNT: 'objects.count',
    FILES_SIZE: 'files.size',
    QUOTA_SUMMARY: 'quota.summary',
    PROCESSING: 'processing',
    FILE_FILTERS: 'fileFilter',
    OPTIONS_DETAIL: 'options.detail',
    OPTIONS_DELETE: 'options.delete',
  }

  /** Columns models */
  static COLUMNS_DEFINITION = [
    { key: OrderCartTableComponent.COLUMN_KEYS.ID, labelKey: 'order-cart.module.basket.table.column.selection' },
    { key: OrderCartTableComponent.COLUMN_KEYS.OBJECTS_COUNT, labelKey: 'order-cart.module.basket.table.column.objects.count' },
    { key: OrderCartTableComponent.COLUMN_KEYS.FILES_SIZE, labelKey: 'order-cart.module.basket.table.column.files.size' },
    { key: OrderCartTableComponent.COLUMN_KEYS.QUOTA_SUMMARY, labelKey: 'order-cart.module.basket.table.column.quota.summary' },
    { key: OrderCartTableComponent.COLUMN_KEYS.PROCESSING, labelKey: 'order-cart.module.basket.table.column.processing.summary' },
    { key: OrderCartTableComponent.COLUMN_KEYS.FILE_FILTERS, labelKey: 'order-cart.module.basket.table.column.filters.summary' },
    { key: OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DETAIL, labelKey: null },
    { key: OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DELETE, labelKey: null },
  ]

  /** Formatting options for selection date */
  static SELECTION_DATE_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'utc',
  }

  /** When there is less dataset selections than this count, initially expand all rows */
  static AUTO_EXPANDED_DS_SELECTIONS_COUNT = 5

  /**
   * Computes total objects count for a list of items selections
   * @param itemsSelections items selections
   * @return {number} total objects count over all items selections
   */
  static getTotalSelectionsObjectsCount(itemsSelections) {
    return itemsSelections.reduce((sum, { objectsCount }) => sum + objectsCount, 0)
  }

  /**
   * Computes total row data (at once to avoid multiple useless loops)
   * @param {OrderShapes.Basket} basket basket
   * @return {totalObjectsCount: number, effectiveObjectsCount: number, totalSize: number} total objects count, effective objects count and
   * totalSize as numbers. Total size unit is the one used by backend (bytes)
   */
  static computeTotalRowData(basket) {
    const datasetSelections = get(basket, 'datasetSelections', [])
    return datasetSelections.reduce((
      {
        totalObjectsCount, effectiveObjectsCount, totalSize, totalQuota,
      },
      {
        objectsCount: dsEffectiveObjectsCount, filesSize: dsTotalSize, quota, itemsSelections,
      }) => ({ // sum up all dataset values
      totalObjectsCount: totalObjectsCount + OrderCartTableComponent.getTotalSelectionsObjectsCount(itemsSelections),
      effectiveObjectsCount: effectiveObjectsCount + dsEffectiveObjectsCount,
      totalSize: totalSize + dsTotalSize,
      totalQuota: totalQuota + quota,
    }), {
      totalObjectsCount: 0, effectiveObjectsCount: 0, totalSize: 0, totalQuota: 0,
    })
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
   * Builds a dated selection item row
   * @param {*} datasetSelection dataset selection, as described by BasketDatedItemsSelection
   * @param {string} datasetLabel dataset label
   * @param {boolean} showQuotaColumn should show quota column?
   * @param {boolean} showProcessings should show processing column?
   * @param {boolean} showFilters should show filters column?
   * @return {TreeTableRow} for the dated selection item
   */
  static buildDatedSelectionRow(datasetSelectionId, datasetLabel, showQuotaColumn, showProcessings, showFilters, {
    date, objectsCount, filesSize, selectionRequest, quota,
  }) {
    return new TreeTableRow(`dated.item.selection.${datasetSelectionId}-${date}`, [
      { // 1. label cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
        date,
      }, { // 2. objects count cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
        effectiveObjectsCount: objectsCount, // no duplicate within a dated selection
        totalObjectsCount: objectsCount,
      }, { // 3. size cell (scaled for readability)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
        capacity: OrderCartTableComponent.getStorageCapacity(filesSize),
      },
      ...(showQuotaColumn ? [{ // 4. quota cell, when quota is visible
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
        quota,
      }] : []),
      ...(showProcessings ? [{ // 5. Processing cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
      }] : []),
      ...(showFilters ? [{ // 6. File filters cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
      }] : []),
      { // 7. Detail cell (enabled for dated selection)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
        datasetLabel,
        date,
        selectionRequest,
      }, { // 8. delete option cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW,
        datasetSelectionId,
        itemsSelectionDate: date,
      },
    ])
  }

  /**
   * Builds total row
   * @param {*} basket basket matching OrderShapes.Basket
   * @param {boolean} showQuotaColumn should show quota column?
   * @param {boolean} showProcessings should show processing column?
   * @param {boolean} showFilters should show filters column?
   * @param {number} currentQuota current user quota
   * @param {number} maxQuota current max quota
   * @param {number} quotaWarningCount low quota warning count
   * @return {TreeTableRow} for total, null when that row should not be displayed
   */
  static buildTotalRow(basket, showQuotaColumn, showProcessings, showFilters, currentQuota, maxQuota, quotaWarningCount) {
    if (basket.datasetSelections.length === 0) {
      return null
    }
    // compute total data (single loop)
    const {
      totalObjectsCount, effectiveObjectsCount, totalSize, totalQuota,
    } = OrderCartTableComponent.computeTotalRowData(basket)
    return new TreeTableRow('total.row', [
      { // 1. label cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
      }, { // 2. objects count cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
        effectiveObjectsCount,
        totalObjectsCount,
      }, { // 3. size cell (scaled for readability)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
        capacity: OrderCartTableComponent.getStorageCapacity(totalSize),
      },
      ...(showQuotaColumn ? [{ // 4. quota cell, when quota is visible
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
        totalQuota,
        currentQuota,
        maxQuota,
        quotaWarningCount,
      }] : []),
      ...(showProcessings ? [{ // 5. Processing cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
      }] : []),
      ...(showFilters ? [{ // 6. File filters cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
      }] : []),
      { // 7. Detail cell (disabled for total row)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
      }, { // 8. delete option cell (disabled for total raw)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW,
      },
    ])
  }

  /**
   * Builds a dataset selection row
   * @param {*} datasetSelection dataset selection, as described by BasketDatasetSelection
   * @param {boolean} showQuotaColumn should show quota column?
   * @param {boolean} showProcessings should show processing column?
   * @param {boolean} showFilters should show filters column?
   * @param {boolean} rowExpanded is row expanded?
   * @return TreeTableRow for the dataset selection as parameter
   */
  static buildDatasetSelectionRow({
    id, datasetIpid, datasetLabel, processDatasetDescription, fileSelectionDescription, objectsCount, filesSize, quota, itemsSelections = [],
  }, showQuotaColumn, showProcessings, showFilters, rowExpanded) {
    return new TreeTableRow(`dataset.selection.${id}`, [
      { // 1. label cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        datasetLabel,
      }, { // 2. objects count cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        effectiveObjectsCount: objectsCount,
        totalObjectsCount: OrderCartTableComponent.getTotalSelectionsObjectsCount(itemsSelections),
      }, { // 3. size cell (scaled for readability)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        capacity: OrderCartTableComponent.getStorageCapacity(filesSize),
      },
      ...(showQuotaColumn ? [{ // 4. quota cell, when quota is visible
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        quota,
      }] : []),
      ...(showProcessings ? [{ // 5. Processing cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        datasetSelectionIpId: datasetIpid,
        datasetSelectionId: id,
        process: processDatasetDescription,
        fileSelectionDescription,
      }] : []),
      ...(showFilters ? [{ // 6. File filters cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        datasetSelectionIpId: datasetIpid,
        datasetSelectionId: id,
        process: processDatasetDescription,
        fileSelectionDescription,
      }] : []),
      { // 7. Detail cell (disabled for dataset)
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
      }, { // 8. delete option cell
        type: OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW,
        datasetSelectionId: id,
      },
    ], itemsSelections.map((datedSelectionItem) => OrderCartTableComponent.buildDatedSelectionRow(id, datasetLabel, showQuotaColumn, showProcessings, showFilters, datedSelectionItem)), // sub rows
    rowExpanded)
  }

  static isColumnDisabled(columnKey, unlimitedQuota, showFilters, showProcessings) {
    switch (columnKey) {
      case OrderCartTableComponent.COLUMN_KEYS.QUOTA_SUMMARY:
        return unlimitedQuota
      case OrderCartTableComponent.COLUMN_KEYS.FILE_FILTERS:
        return !showFilters
      case OrderCartTableComponent.COLUMN_KEYS.PROCESSING:
        return !showProcessings
      default:
        return false
    }
  }

  /**
   * Initial state
   */
  state = {
    scrollAreaStyle: {
      height: 0,
    },
    // tree model, stored in state to 'buffer' quota changes (allows ignoring rate changes)
    treeTableModel: {
      // basket: initially undefined
      unlimitedQuota: false,
      currentQuota: 0,
      maxQuota: 0,
      quotaWarningCount: UIDomain.UISettingsConstants.DEFAULT_SETTINGS.quotaWarningCount,
    },
    activeColumns: [],
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      basket, quotaInfo: {
        quotaState, currentQuota, maxQuota, quotaWarningCount,
      }, showFilters, showProcessings,
    } = newProps
    // update tree model each time basket / RELATED quota information changes (ignores rate related)
    if (!isEqual(oldProps.basket, basket)
      || !isEqual(get(oldProps, 'quotaInfo.quotaState'), quotaState)
      || !isEqual(get(oldProps, 'quotaInfo.currentQuota'), currentQuota)
      || !isEqual(get(oldProps, 'quotaInfo.maxQuota'), maxQuota)
      || !isEqual(get(oldProps, 'quotaInfo.quotaWarningCount'), quotaWarningCount)) {
      const unlimitedQuota = quotaState === QUOTA_INFO_STATE_ENUM.UNLIMITED
      this.setState({
        treeTableModel: {
          basket,
          unlimitedQuota,
          currentQuota,
          maxQuota,
          quotaWarningCount,
        },
        activeColumns: reduce(OrderCartTableComponent.COLUMNS_DEFINITION, (acc, value) => {
          if (!OrderCartTableComponent.isColumnDisabled(value.key, unlimitedQuota, showFilters, showProcessings)) {
            acc.push(value)
          }
          return acc
        }, []),
      })
    }
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
   * @param {*} treeTableModel holding basket and light quota info (only quota part, not rate related)
   * @return [TreeTableRow] root tree table rows
   */
  buildTableRows = ({
    basket = { datasetSelections: [] }, unlimitedQuota, currentQuota, maxQuota, quotaWarningCount,
  }) => {
    // When showing datasets, map datasets to rows, otherwise, map directly selection items into root rows
    const { showDatasets, showProcessings, showFilters } = this.props
    const showQuota = !unlimitedQuota
    return [
      // A - Datasets or date selections based on conf
      ...(showDatasets
        ? basket.datasetSelections.map((selection) => OrderCartTableComponent.buildDatasetSelectionRow(selection, showQuota, showProcessings, showFilters, basket.datasetSelections.length <= OrderCartTableComponent.AUTO_EXPANDED_DS_SELECTIONS_COUNT))
        : flatMap(basket.datasetSelections, ({ id, datasetLabel, itemsSelections }) => itemsSelections
          .map((itemSelection) => OrderCartTableComponent.buildDatedSelectionRow(id, datasetLabel, showQuota, showProcessings, showFilters, itemSelection)))),
      // B - quota total row (possibly null)
      OrderCartTableComponent.buildTotalRow(basket, showQuota, showProcessings, showFilters, currentQuota, maxQuota, quotaWarningCount),
    ].filter((row) => !!row) // remove any null row
  }

  /**
   * Builds table cell for cell value as parameter (see methods above to build row cell values)
   * @param cellValue value set when row was built
   * @param level level of the cell parent row
   * @param columnIndex column index of the cell
   * @return TableRowColumn component for cell
   */
  buildTableCell = (cellValue, level, columnIndex) => {
    const { moduleTheme: { user: { content: { table: { optionColumn, totalRow } } } } } = this.context
    const { activeColumns } = this.state
    const columnKey = activeColumns[columnIndex].key
    return (
      <TableRowColumn
        key={`cell-${columnIndex}`}
        style={(() => {
          if (cellValue.type === OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW) {
            return totalRow.cell // total row graphics configuration
          }
          if (columnKey === OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DETAIL // specify options columns styles
            || columnKey === OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DELETE) {
            return optionColumn // options columns graphics configuration
          }
          if (columnKey === OrderCartTableComponent.COLUMN_KEYS.PROCESSING) {
            return optionColumn.columnButtonStyle
          }
          if (columnKey === OrderCartTableComponent.COLUMN_KEYS.FILE_FILTERS) {
            return optionColumn.columnButtonStyle
          }
          return null
        })()}
      >
        {
          this.buildTableCellContent(cellValue, columnKey)
        }
      </TableRowColumn>)
  }

  /**
   * Builds table cell content: converts cell model content into a react component when required (leaves it  unchanged otherwise)
   * @param {*} cellValue value set when row was built, depends on column
   * @param {string} columnKey key of the column to render
   * @return TableRowColumn component for cell
   */
  buildTableCellContent = (cellValue, columnKey) => {
    const { intl: { formatDate, formatMessage } } = this.context
    const {
      isFetching, onShowDuplicatedMessage, isProcessingDependenciesExist, processingSelectors,
      pluginMetaDataSelectors, linkProcessingDatasetActions, refreshBasket, isFileFilterDependenciesExist,
    } = this.props

    // transform content into element, according with column and level (dataset or selection)
    switch (columnKey) {
      case OrderCartTableComponent.COLUMN_KEYS.ID:
        // ID column: ID for dataset, date for dated selection and constant i18n text for total
        switch (cellValue.type) {
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW:
            return cellValue.datasetLabel
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW:
            return formatDate(new Date(Date.parse(cellValue.date)), OrderCartTableComponent.SELECTION_DATE_OPTIONS)
          case OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW:
          default:
            return formatMessage({ id: 'order-cart.module.basket.table.row.total.label' })
        }
      case OrderCartTableComponent.COLUMN_KEYS.OBJECTS_COUNT:
        // Object count column: render total and effective objects count, no matter the row type (holds duplicate message)
        return <ObjectsCountCellRenderComponent
          effectiveObjectsCount={cellValue.effectiveObjectsCount}
          totalObjectsCount={cellValue.totalObjectsCount}
          onShowDuplicatedMessage={onShowDuplicatedMessage}
        />
      case OrderCartTableComponent.COLUMN_KEYS.FILES_SIZE:
        // Size column: render cell value as size
        return <storage.FormattedStorageCapacity capacity={cellValue.capacity} />
      case OrderCartTableComponent.COLUMN_KEYS.QUOTA_SUMMARY:
        // Quota: render corresponding quota for dataset selection and dated selection,
        // and total with remaining and optional warning for total row
        switch (cellValue.type) {
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW:
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW:
            return cellValue.quota
          case OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW:
          default:
            return <TotalQuotaRenderComponent
              totalQuota={cellValue.totalQuota}
              currentQuota={cellValue.currentQuota}
              maxQuota={cellValue.maxQuota}
              quotaWarningCount={cellValue.quotaWarningCount}
            />
        }
      case OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DETAIL:
        // detail option column : render detail option for dated selection row,
        switch (cellValue.type) {
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW:
            return <ShowDatedItemSelectionDetailContainer
              datasetLabel={cellValue.datasetLabel}
              date={cellValue.date}
              selectionRequest={cellValue.selectionRequest}
              disabled={isFetching}
            />
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW:
          case OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW:
          default:
            return null
        }
      case OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DELETE: {
        // delete option column: render delete for dataset and dated selection
        switch (cellValue.type) {
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW:
            return <DeleteDatasetSelectionContainer
              datasetSelectionId={cellValue.datasetSelectionId}
              disabled={isFetching}
            />
          case OrderCartTableComponent.ROW_TYPE_ENUM.DATED_SELECTION_ROW:
            return <DeleteDatedItemSelectionContainer
              datasetSelectionId={cellValue.datasetSelectionId}
              itemsSelectionDate={cellValue.itemsSelectionDate}
              disabled={isFetching}
            />
          case OrderCartTableComponent.ROW_TYPE_ENUM.TOTAL_ROW:
          default:
            return null
        }
      }
      case OrderCartTableComponent.COLUMN_KEYS.PROCESSING: {
        return (cellValue.type === OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW && isProcessingDependenciesExist) ?
          <ManageDatasetProcessingContainer
            datasetIpid={cellValue.datasetSelectionIpId}
            datasetSelectionId={cellValue.datasetSelectionId}
            onProcessChanged={refreshBasket}
            process={cellValue.process}
            processingSelectors={processingSelectors}
            pluginMetaDataSelectors={pluginMetaDataSelectors}
            linkProcessingDatasetActions={linkProcessingDatasetActions}
            disabled={isFetching}
            fileSelectionDescription={cellValue.fileSelectionDescription}
            fileFiltersActions={fileFiltersActions}
          /> : null
      }
      case OrderCartTableComponent.COLUMN_KEYS.FILE_FILTERS: {
        return (cellValue.type === OrderCartTableComponent.ROW_TYPE_ENUM.DATASET_ROW && isFileFilterDependenciesExist) ?
          <ManageDatasetFileFiltersContainer
            datasetIpid={cellValue.datasetSelectionIpId}
            datasetSelectionId={cellValue.datasetSelectionId}
            process={cellValue.process}
            fileSelectionDescription={cellValue.fileSelectionDescription}
            onFileSelectionChanged={refreshBasket}
            fileFiltersActions={fileFiltersActions}
          /> : null
      }
      default:
        throw new Error(`Unknown column key ${columnKey}`)
    }
  }

  render() {
    const { scrollAreaStyle, treeTableModel, activeColumns } = this.state
    const { intl: { formatMessage }, moduleTheme: { user: { content: { table, scrollContentArea, spaceConsumer } } } } = this.context

    return (
      <TableLayout>
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
                    model={treeTableModel} // buffered in state
                    buildTreeTableRows={this.buildTableRows}
                    buildCellComponent={this.buildTableCell}
                    columns={activeColumns
                      .map(({ key, labelKey }) => (
                        <TableHeaderColumn
                          key={key}
                          style={(() => {
                            switch (key) {
                              case OrderCartTableComponent.COLUMN_KEYS.ID:
                                return table.firstColumnHeader
                              case OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DETAIL:
                              case OrderCartTableComponent.COLUMN_KEYS.OPTIONS_DELETE:
                                return table.optionColumn
                              default:
                                return undefined // default MUI theme
                            }
                          })()}
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
export default withQuotaInfo(OrderCartTableComponent)
