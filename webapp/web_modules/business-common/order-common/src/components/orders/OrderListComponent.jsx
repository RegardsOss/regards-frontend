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
import get from 'lodash/get'
import values from 'lodash/values'
import RefreshCircle from 'mdi-material-ui/RefreshCircle'
import FlatButton from 'material-ui/FlatButton'
import { BasicPageableSelectors, BasicListSelectors } from '@regardsoss/store-utils'
import { OrderClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { HOCUtils } from '@regardsoss/display-control'
import {
  PageableInfiniteTableContainer, AutoRefreshPageableTableHOC, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableHeaderOptionGroup, TableHeaderLoadingComponent,
  TableColumnsVisibilityOption, DateValueRender, StorageCapacityRender, NoContentComponent, StringValueRender,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import OrderCountHeaderMessage from './OrderCountHeaderMessage'
import DeleteOrderContainer from '../../containers/orders/options/DeleteOrderContainer'
import DownloadOrdersCSVSummaryContainer from '../../containers/orders/options/DownloadOrdersCSVSummaryContainer'
import DownloadOrderFilesAsZipContainer from '../../containers/orders/options/DownloadOrderFilesAsZipContainer'
import DownloadOrderMetaLinkFileContainer from '../../containers/orders/options/DownloadOrderMetaLinkFileContainer'
import PauseResumeOrderContainer from '../../containers/orders/options/PauseResumeOrderContainer'
import ShowOrderDatasetsContainer from '../../containers/orders/options/ShowOrderDatasetsContainer'
import RetryOrderContainer from '../../containers/orders/options/RetryOrderContainer'
import ShowOrderProcessingsContainer from '../../containers/orders/options/ShowOrderProcessingsContainer'
import ErrorsCountRender from './cells/ErrorsCountRender'
import StatusProgressRender from './cells/StatusProgressRender'
import ObjectAndFileCountRender from './cells/ObjectAndFileCountRender'

// Column keys
const OWNER_KEY = 'owner'
const LABEL_KEY = 'number'
const CREATION_DATE_KEY = 'creation.date'
const EXPIRATION_DATE_KEY = 'expiration.date'
const ORDER_ID_KEY = 'order.id'
const OBJECTS_COUNT_KEY = 'objects.count'
const FILES_SIZE_KEY = 'files.size'
const ERRORS_COUNT_KEY = 'errors.count'
const STATUS_PROGRESS_KEY = 'statusProgress'

/**
 * Order list component - displays user order list
 * @author Raphaël Mechali
 */
class OrderListComponent extends React.Component {
  static propTypes = {
    // component display mode
    displayMode: PropTypes.oneOf(values(ORDER_DISPLAY_MODES)).isRequired,
    // table query page size
    pageSize: PropTypes.number.isRequired,
    // is fetching?
    isFetching: PropTypes.bool,
    // total order count
    totalOrderCount: PropTypes.number.isRequired,
    /** Has access to delete completely order option? */
    hasDeleteCompletely: PropTypes.bool.isRequired,
    /** Has access to delete superficially order option? */
    hasDeleteSuperficially: PropTypes.bool.isRequired,
    /** Has access to pause and resume otpions? */
    hasPauseResume: PropTypes.bool.isRequired,
    // columns visibility, like (string: columnKey):(boolean: column visible)
    columnsVisibility: PropTypes.objectOf(PropTypes.bool).isRequired,
    // columns configuration callback
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    //actions and selectors for csv download
    downloadOrderActions: PropTypes.instanceOf(OrderClient.DownloadOrderSummaryCSVFileActions),
    // actions and selectors for table
    ordersRequestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    orderStateActions: PropTypes.instanceOf(OrderClient.OrderStateActions).isRequired,
    // actions for navigation, not provided when navigation is disabled
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions), // used in mapDispatchToProps
    // selector for processing
    processingSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // not provided in user mode
    pluginMetaDataSelectors: PropTypes.instanceOf(BasicListSelectors),
    // dialog management callbacks
    // request failed callback: response => ()
    onShowRequestFailedInformation: PropTypes.func.isRequired,
    // shows asynchronous operation callback: () => ()
    onShowAsynchronousRequestInformation: PropTypes.func.isRequired,
    // shows delete confirmation callback: (completeDelete:boolean, onDelete:function like () => ()) => ()
    onShowDeleteConfirmation: PropTypes.func.isRequired,
    // shows retry order dialog callback (orderLabel:string, canRetry:bool, canRestart:bool, onRetryModeSelected: () => {}))
    onShowRetryMode: PropTypes.func.isRequired,
    // show processings of an order in a dialog
    onShowProcessings: PropTypes.func.isRequired,
    isProcessingDependenciesExist: PropTypes.bool.isRequired,
    // optional children, can be used to add rows into orders table header
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Default user columns visibiltiy */
  static DEFAULT_USER_COLUMNS_VISIBILITY = {
    // owner & order id should not be display in user mode
    [LABEL_KEY]: true,
    [CREATION_DATE_KEY]: true,
    [EXPIRATION_DATE_KEY]: true,
    [OBJECTS_COUNT_KEY]: true,
    [FILES_SIZE_KEY]: true,
    [ERRORS_COUNT_KEY]: false,
    [STATUS_PROGRESS_KEY]: true,
    [TableColumnBuilder.optionsColumnKey]: true,
  }

  /** Default admin columns visibiltiy */
  static DEFAULT_ADMIN_COLUMNS_VISIBILITY = {
    [OWNER_KEY]: true,
    [LABEL_KEY]: true,
    [CREATION_DATE_KEY]: true,
    [EXPIRATION_DATE_KEY]: false,
    [ORDER_ID_KEY]: false,
    [OBJECTS_COUNT_KEY]: false,
    [FILES_SIZE_KEY]: true,
    [ERRORS_COUNT_KEY]: false,
    [STATUS_PROGRESS_KEY]: true,
    [TableColumnBuilder.optionsColumnKey]: true,
  }

  /** No data component (avoids re-rendering it) */
  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="no.order.information.title"
    messageKey="no.order.information.message"
  />

  /**
   * Sums up all properties from datasets tasks in order (must be a path to a numeric property)
   * @param {order} order order as described in OrderWithContent
   * @param {string} numericTaskProperty numeric dataset task property path
   * @return {number} sumed up properties values if found, 0 otherwise
   */
  static sumOnDatasets(order, numericTaskProperty) {
    return get(order, 'content.datasetTasks', []).reduce((sum, task) => sum + get(task, numericTaskProperty), 0)
  }

  /**
   * Counts an order objects (in dataset tasks)
   * @param {*} order order
   * @return objects count for order, from dataset tasks
   */
  static getObjectsCount(order) {
    return OrderListComponent.sumOnDatasets(order, 'objectsCount')
  }

  /**
   * Counts an order files (in dataset tasks)
   * @param {*} order order
   * @returns files count for order, from dataset tasks
   */
  static getFilesCount(order) {
    return OrderListComponent.sumOnDatasets(order, 'filesCount')
  }

  /**
   * Counts an order files size (in dataset tasks)
   * @param {*} order order
   * @return files size, from dataset tasks
   */
  static getFilesSize(order) {
    return OrderListComponent.sumOnDatasets(order, 'filesSize')
  }

  state = {
    isAutoRefreshEnabled: true,
  }

  toggleAutoRefresh = () => {
    this.setState({
      isAutoRefreshEnabled: !this.state.isAutoRefreshEnabled,
    })
  }

  /**
   * Builds options (removes / adds options according with display mode)
   * @return {[*]} table columns list
   */
  buildOptions = () => {
    const {
      displayMode, pageSize, hasDeleteCompletely, hasDeleteSuperficially, hasPauseResume,
      ordersActions, ordersSelectors, navigationActions, orderStateActions, onShowRetryMode,
      onShowRequestFailedInformation, onShowAsynchronousRequestInformation, onShowDeleteConfirmation,
      onShowProcessings, processingSelectors, pluginMetaDataSelectors, isProcessingDependenciesExist,
    } = this.props
    return [
      // 1 - Pause / resume order option (must have sufficient rights)
      hasPauseResume ? {
        OptionConstructor: PauseResumeOrderContainer,
        optionProps: {
          pageSize,
          ordersActions,
          ordersSelectors,
          orderStateActions,
          onShowRequestFailedInformation,
          onShowAsynchronousRequestInformation,
        },
      } : null,
      // 2 - metalink files
      { OptionConstructor: DownloadOrderMetaLinkFileContainer },
      // 3 - user only option: download zip
      displayMode === ORDER_DISPLAY_MODES.USER ? { OptionConstructor: DownloadOrderFilesAsZipContainer } : null,
      // 4 - retry option (only for error orders)
      { OptionConstructor: RetryOrderContainer, optionProps: { orderStateActions, onShowRetryMode } },
      // 5 - delete option (superficial and complete)
      hasDeleteSuperficially || hasDeleteCompletely ? {
        OptionConstructor: DeleteOrderContainer,
        optionProps: {
          hasDeleteSuperficially,
          hasDeleteCompletely,
          pageSize,
          ordersActions,
          ordersSelectors,
          orderStateActions,
          onShowDeleteConfirmation,
          onShowRequestFailedInformation,
        },
      } : null,
      // 6 - admin only option: show processing list of an order
      displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR && isProcessingDependenciesExist ? {
        OptionConstructor: ShowOrderProcessingsContainer,
        optionProps: {
          onShowProcessings,
          processingSelectors,
          pluginMetaDataSelectors,
        },
      } : null,
      // 7 - Detail (provided only when navigation is enabled)
      navigationActions ? {
        OptionConstructor: ShowOrderDatasetsContainer,
        optionProps: { navigationActions },
      } : null,
    ]
  }

  /**
   * @return {[*]} table columns list
   */
  buildColumns = () => {
    const { columnsVisibility, displayMode } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      // owner when in admin mode
      displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR
        ? new TableColumnBuilder(OWNER_KEY).titleHeaderCell().propertyRenderCell('content.owner')
          .visible(get(columnsVisibility, OWNER_KEY, true))
          .label(formatMessage({ id: 'order.list.column.owner' }))
          .build() : null,

      // label
      new TableColumnBuilder(LABEL_KEY).titleHeaderCell()
        .propertyRenderCell('content.label', StringValueRender, { multilineDisplay: true })
        .visible(get(columnsVisibility, LABEL_KEY, true))
        .label(formatMessage({ id: 'order.list.column.label' }))
        .build(),

      // statusProgress
      new TableColumnBuilder(STATUS_PROGRESS_KEY).titleHeaderCell()
        .rowCellDefinition({
          Constructor: StatusProgressRender,
          props: { displayMode },
        })
        .visible(get(columnsVisibility, STATUS_PROGRESS_KEY, true))
        .label(formatMessage({ id: 'order.list.column.status' }))
        .build(),

      // orderId when in admin mode
      displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR
        ? new TableColumnBuilder(ORDER_ID_KEY).titleHeaderCell().propertyRenderCell('content.id')
          .visible(get(columnsVisibility, ORDER_ID_KEY, false))
          .label(formatMessage({ id: 'order.list.column.id' }))
          .build() : null,

      // creation date
      new TableColumnBuilder(CREATION_DATE_KEY).titleHeaderCell().propertyRenderCell('content.creationDate', DateValueRender)
        .visible(get(columnsVisibility, CREATION_DATE_KEY, true))
        .label(formatMessage({ id: 'order.list.column.creation.date' }))
        .build(),

      // expiration date
      new TableColumnBuilder(EXPIRATION_DATE_KEY).titleHeaderCell().propertyRenderCell('content.expirationDate', DateValueRender)
        .visible(get(columnsVisibility, EXPIRATION_DATE_KEY, true))
        .label(formatMessage({ id: 'order.list.column.expiration.date' }))
        .build(),

      // objects count and files count (as extracted, using getObjectsCount and getFilesCount)
      new TableColumnBuilder(OBJECTS_COUNT_KEY).titleHeaderCell()
        .visible(get(columnsVisibility, OBJECTS_COUNT_KEY, true))
        .label(formatMessage({ id: 'order.list.column.object.count' }))
        .rowCellDefinition({
          Constructor: ObjectAndFileCountRender,
          props: { getObjectCount: OrderListComponent.getObjectsCount, getFilesCount: OrderListComponent.getFilesCount },
        })
        .build(),

      // total files size  (as extracted, using getFilesSize)
      new TableColumnBuilder(FILES_SIZE_KEY).titleHeaderCell()
        .valuesRenderCell([{ getValue: OrderListComponent.getFilesSize, RenderConstructor: StorageCapacityRender }])
        .visible(get(columnsVisibility, FILES_SIZE_KEY, true))
        .label(formatMessage({ id: 'order.list.column.files.size' }))
        .build(),

      // error files count
      new TableColumnBuilder(ERRORS_COUNT_KEY).titleHeaderCell().propertyRenderCell('content.filesInErrorCount', ErrorsCountRender)
        .visible(get(columnsVisibility, ERRORS_COUNT_KEY, true))
        .label(formatMessage({ id: 'order.list.column.errors.count' }))
        .build(),

      // Options column
      new TableColumnBuilder()
        .label(formatMessage({ id: 'order.list.column.options' }))
        .optionsColumn(this.buildOptions())
        .visible(get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true))
        .build(),
    ].filter((c) => !!c) // remove null elements
  }

  render() {
    const {
      displayMode, pageSize, isFetching, totalOrderCount, children, downloadOrderActions,
      onChangeColumnsVisibility, ordersRequestParameters, ordersActions, ordersSelectors,
    } = this.props
    const columns = this.buildColumns()
    const { admin: { minRowCount, maxRowCount } } = this.context.muiTheme.components.infiniteTable
    const { orderHistory: { rowHeight } } = this.context.muiTheme.module
    const { intl: { formatMessage } } = this.context
    const { isAutoRefreshEnabled } = this.state
    // render headers and table
    return (
      <TableLayout>
        {/* 0 - Table auto refresh HOC (no graphic) */}
        <AutoRefreshPageableTableHOC
          pageSize={pageSize}
          bodyParams={ordersRequestParameters}
          pageableTableActions={ordersActions}
          pageableTableSelectors={ordersSelectors}
          enableAutoRefresh={isAutoRefreshEnabled}
          fetchUsingPostMethod={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR}
        />
        <TableHeaderLine>
          {/* 1 - commands count */}
          <TableHeaderContentBox>
            <OrderCountHeaderMessage displayMode={displayMode} totalOrderCount={totalOrderCount} />
          </TableHeaderContentBox>
          {/* 2 - loading */}
          <TableHeaderLoadingComponent loading={isFetching} />
          {/* 3 - table options  */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              <FlatButton
                icon={<RefreshCircle />}
                label={formatMessage({ id: 'order.list.refresh.auto.label' })}
                secondary={!isAutoRefreshEnabled}
                onClick={this.toggleAutoRefresh}
              />
              {/* downlaod summary (when admin) */
                displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? (
                  <DownloadOrdersCSVSummaryContainer downloadOrderActions={downloadOrderActions} ordersRequestParameters={ordersRequestParameters} />
                ) : null
              }
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        {/** Optional additive header lines **/}
        {HOCUtils.renderChildren(children)}
        {/* the table itself */}
        <PageableInfiniteTableContainer
          // infinite table configuration
          bodyParams={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? ordersRequestParameters : {}}
          requestParams={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? {} : ordersRequestParameters}
          pageActions={ordersActions}
          pageSelectors={ordersSelectors}
          queryPageSize={pageSize}
          lineHeight={rowHeight}
          columns={columns}
          fetchUsingPostMethod={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR}
          emptyComponent={OrderListComponent.EMPTY_COMPONENT}
          minRowCount={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? minRowCount : null}
          maxRowCount={displayMode === ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR ? maxRowCount : null}
        />
      </TableLayout>
    )
  }
}
export default OrderListComponent
