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
import get from 'lodash/get'
import values from 'lodash/values'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import { OrderClient } from '@regardsoss/client'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, RefreshPageableTableOption, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableHeaderOptionGroup, TableHeaderLoadingComponent,
  TableColumnsVisibilityOption, DateValueRender, StorageCapacityRender,
} from '@regardsoss/components'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import NoOrderComponent from './NoOrderComponent'
import OrderCountHeaderMessage from './OrderCountHeaderMessage'
import DeleteOrderContainer from '../../containers/orders/options/DeleteOrderContainer'
import DownloadOrderFilesAsZipContainer from '../../containers/orders/options/DownloadOrderFilesAsZipContainer'
import DownloadOrderMetaLinkFileContainer from '../../containers/orders/options/DownloadOrderMetaLinkFileContainer'
import PauseResumeOrderContainer from '../../containers/orders/options/PauseResumeOrderContainer'
import ShowOrderDatasetsContainer from '../../containers/orders/options/ShowOrderDatasetsContainer'
import ErrorsCountRender from './cells/ErrorsCountRender'
import StatusRender from './cells/StatusRender'

// Column keys
const NUMBER_KEY = 'number'
const CREATION_DATE_KEY = 'creation.date'
const EXPIRATION_DATE_KEY = 'expiration.date'
const OBJECTS_COUNT_KEY = 'objects.count'
const FILES_SIZE_KEY = 'files.size'
const ERRORS_COUNT_KEY = 'errors.count'
const PROGRESS_KEY = 'progress'
const STATUS_KEY = 'status'

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
    // actions and selectors for table
    ordersActions: PropTypes.instanceOf(OrderClient.OrderListActions).isRequired,
    ordersSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    orderStateActions: PropTypes.instanceOf(OrderClient.OrderStateActions).isRequired,
    // actions for navigation
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired, // used in mapDispatchToProps
    // dialog management callbacks
    // request failed callback: response => ()
    onShowRequestFailedInformation: PropTypes.func.isRequired,
    // shows asynchronous operation callback: () => ()
    onShowAsynchronousRequestInformation: PropTypes.func.isRequired,
    // shows delete confirmation callback: (completeDelete:boolean, onDelete:function like () => ()) => ()
    onShowDeleteConfirmation: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /** Default columns visibiltiy */
  static DEFAULT_COLUMNS_VISIBILITY = {
    [NUMBER_KEY]: true,
    [CREATION_DATE_KEY]: true,
    [EXPIRATION_DATE_KEY]: true,
    [OBJECTS_COUNT_KEY]: true,
    [FILES_SIZE_KEY]: true,
    [ERRORS_COUNT_KEY]: false,
    [PROGRESS_KEY]: true,
    [STATUS_KEY]: true,
    [TableColumnBuilder.optionsColumnKey]: true,
  }

  /** No data component (avoids re-rendering it) */
  static EMPTY_COMPONENT = <NoOrderComponent />

  /** Loading component (avoids re-rendering it) */
  static LOADING_COMPONENT = <TableHeaderLoadingComponent />

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
   * Counts an order files size (in dataset tasks)
   * @param {*} order order
   * @return files size, from dataset tasks
   */
  static getFilesSize(order) {
    return OrderListComponent.sumOnDatasets(order, 'filesSize')
  }

  /**
   * Returns an order progress
   * @param {*} order order
   * @return {number} progress percent, in [0, 100]
   */
  static getProgress(order) {
    return get(order, 'content.percentCompleted', 0)
  }

  /**
   * Builds options (removes / adds options according with display mode)
   * @return {[*]} table columns list
   */
  buildOptions = () => {
    const {
      displayMode, pageSize, hasDeleteCompletely, hasDeleteSuperficially, hasPauseResume,
      ordersActions, ordersSelectors, navigationActions, orderStateActions,
      onShowRequestFailedInformation, onShowAsynchronousRequestInformation, onShowDeleteConfirmation,
    } = this.props
    const options = []
    // 1 - Pause / resume order option (must have sufficient rights)
    if (hasPauseResume) {
      options.push({
        OptionConstructor: PauseResumeOrderContainer,
        optionProps: {
          pageSize,
          ordersActions,
          ordersSelectors,
          orderStateActions,
          onShowRequestFailedInformation,
          onShowAsynchronousRequestInformation,
        },
      })
    }
    // 2 - user only options: download zip and metalink files
    if (displayMode === ORDER_DISPLAY_MODES.USER) {
      options.push({ OptionConstructor: DownloadOrderMetaLinkFileContainer }, { OptionConstructor: DownloadOrderFilesAsZipContainer })
    }
    // 3 - delete option (superficial and complete)
    if (hasDeleteSuperficially || hasDeleteCompletely) {
      options.push({
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
      })
    }

    // 4 - Detail
    options.push({
      // show order detail (at last position to stay stable on multiple screens)
      OptionConstructor: ShowOrderDatasetsContainer,
      optionProps: { navigationActions },
    })

    return options
  }

  /**
   * Builds options (removes / adds options according with display mode)
   * @return {[*]} table columns list
   */
  buildColumns = () => {
    const { columnsVisibility } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth
    return [
      // number
      TableColumnBuilder.buildSimplePropertyColumn(
        NUMBER_KEY, formatMessage({ id: 'order.list.column.number' }),
        'content.id', 0, get(columnsVisibility, NUMBER_KEY, true),
      ),
      // Progress column
      TableColumnBuilder.buildSimpleColumnWithCell(
        PROGRESS_KEY, formatMessage({ id: 'order.list.column.progress' }),
        TableColumnBuilder.buildProgressPercentRenderCell(OrderListComponent.getProgress), 1,
        get(columnsVisibility, PROGRESS_KEY, true),
      ),
      // creation date
      TableColumnBuilder.buildSimplePropertyColumn(
        CREATION_DATE_KEY, formatMessage({ id: 'order.list.column.creation.date' }),
        'content.creationDate', 2, get(columnsVisibility, CREATION_DATE_KEY, true), DateValueRender,
      ),
      // expiration date
      TableColumnBuilder.buildSimplePropertyColumn(
        EXPIRATION_DATE_KEY, formatMessage({ id: 'order.list.column.expiration.date' }),
        'content.expirationDate', 3, get(columnsVisibility, EXPIRATION_DATE_KEY, true), DateValueRender,
      ),
      // objects count (as extracted, using getObjectCount)
      TableColumnBuilder.buildSimpleColumnWithCell(
        OBJECTS_COUNT_KEY, formatMessage({ id: 'order.list.column.object.count' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: OrderListComponent.getObjectsCount }]), 4,
        get(columnsVisibility, OBJECTS_COUNT_KEY, true),
      ),
      // total files size  (as extracted, using getFilesSize)
      TableColumnBuilder.buildSimpleColumnWithCell(
        FILES_SIZE_KEY, formatMessage({ id: 'order.list.column.files.size' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: OrderListComponent.getFilesSize, RenderConstructor: StorageCapacityRender }]),
        5, get(columnsVisibility, FILES_SIZE_KEY, true),
      ),
      // error files count
      TableColumnBuilder.buildSimplePropertyColumn(
        ERRORS_COUNT_KEY, formatMessage({ id: 'order.list.column.errors.count' }),
        'content.filesInErrorCount', 6, get(columnsVisibility, ERRORS_COUNT_KEY, true), ErrorsCountRender,
      ),

      // Status column
      TableColumnBuilder.buildSimpleColumnWithCell(
        STATUS_KEY, formatMessage({ id: 'order.list.column.status' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: StatusRender.getStatus, RenderConstructor: StatusRender }]),
        7, get(columnsVisibility, STATUS_KEY, true),
      ),

      // Options column
      TableColumnBuilder.buildOptionsColumn(
        formatMessage({ id: 'order.list.column.options' }),
        this.buildOptions(), get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true), fixedColumnWidth,
      ),
    ]
  }

  render() {
    const {
      displayMode, pageSize, isFetching, totalOrderCount, onChangeColumnsVisibility, ordersActions, ordersSelectors,
    } = this.props
    const columns = this.buildColumns()


    // render headers and table
    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - commands count */}
          <TableHeaderContentBox>
            <OrderCountHeaderMessage displayMode={displayMode} totalOrderCount={totalOrderCount} />
          </TableHeaderContentBox >
          {/* 2 - loading */
            isFetching ? OrderListComponent.LOADING_COMPONENT : null
          }
          {/* 3 - table options  */}
          <TableHeaderOptionsArea >
            <TableHeaderOptionGroup>
              {/* refresh option */}
              <RefreshPageableTableOption
                pageSize={pageSize}
                pageableTableActions={ordersActions}
                pageableTableSelectors={ordersSelectors}
              />
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea >
        </TableHeaderLine>
        {/* the table itself */}
        <PageableInfiniteTableContainer
          // infinite table configuration
          pageActions={ordersActions}
          pageSelectors={ordersSelectors}
          queryPageSize={pageSize}
          columns={columns}
          emptyComponent={OrderListComponent.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default OrderListComponent
