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
import { BasicPageableSelectors, BasicPageableActions } from '@regardsoss/store-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  PageableInfiniteTableContainer, TableColumnBuilder, TableLayout, TableHeaderLine,
  TableHeaderOptionsArea, TableHeaderContentBox, TableHeaderOptionGroup,
  TableHeaderLoadingComponent, TableColumnsVisibilityOption,
  DateValueRender, StorageCapacityRender,
} from '@regardsoss/components'
import { ORDER_DISPLAY_MODES } from '../../model/OrderDisplayModes'
import OrderCountHeaderMessage from './OrderCountHeaderMessage'
import NoOrderComponent from './NoOrderComponent'
import DownloadOrderFilesAsZipContainer from '../../containers/orders/DownloadOrderFilesAsZipContainer'
import DownloadOrderMetaLinkFileContainer from '../../containers/orders/DownloadOrderMetaLinkFileContainer'
import ShowOrderDatasetsContainer from '../../containers/orders/ShowOrderDatasetsContainer'
import { OrdersNavigationActions } from '../../model/OrdersNavigationActions'
import ErrorsCountRender from './ErrorsCountRender'
import StatusRender from './StatusRender'

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
    // is fetching?
    isFetching: PropTypes.bool,
    // total order count
    totalOrderCount: PropTypes.number.isRequired,
    // columns visibility, like (string: columnKey):(boolean: column visible)
    columnsVisibility: PropTypes.objectOf(PropTypes.bool).isRequired,
    // columns configuration callback
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    // actions and selectors for table
    commandsActions: PropTypes.instanceOf(BasicPageableActions).isRequired,
    commandsSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired,
    // actions for navigation
    navigationActions: PropTypes.instanceOf(OrdersNavigationActions).isRequired, // used in mapDispatchToProps
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
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
   * Returns an order status
   * @param {*} order order
   * @return {ORDER_STATUS} status or undefined if unknown
   */
  static getStatus(order) {
    return get(order, 'content.status')
  }

  /**
   * Builds options (removes / adds options according with display mode)
   * @return {[*]} table columns list
   */
  buildOptions = () => {
    const { displayMode, navigationActions } = this.props
    // download options (user only)
    const downloadOptions = displayMode !== ORDER_DISPLAY_MODES.USER ?
      [] : [{ OptionConstructor: DownloadOrderFilesAsZipContainer }, { OptionConstructor: DownloadOrderMetaLinkFileContainer }]

    return [
      // downloads
      ...downloadOptions, {
        // show order detail (at last position to stay stable on multiple screens)
        OptionConstructor: ShowOrderDatasetsContainer,
        optionProps: { navigationActions },
      },
    ]
  }

  /**
   * Builds options (removes / adds options according with display mode)
   * @return {[*]} table columns list
   */
  buildColumns = () => {
    const { columnsVisibility } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const fixedColumnWidth = muiTheme['components:infinite-table'].fixedColumnsWidth
    const fixedDataColumnWidth = muiTheme['module:order-history'].fixedDataColumnWidth
    return [
      // number
      TableColumnBuilder.buildSimplePropertyColumn(NUMBER_KEY, formatMessage({ id: 'order.list.column.number' }),
        'content.id', 0, get(columnsVisibility, NUMBER_KEY, true)),

      // Progress column
      TableColumnBuilder.buildSimpleColumnWithCell(PROGRESS_KEY, formatMessage({ id: 'order.list.column.progress' }),
        TableColumnBuilder.buildProgressPercentRenderCell(OrderListComponent.getProgress), 1,
        get(columnsVisibility, PROGRESS_KEY, true), fixedDataColumnWidth),

      // creation date
      TableColumnBuilder.buildSimplePropertyColumn(CREATION_DATE_KEY, formatMessage({ id: 'order.list.column.creation.date' }),
        'content.creationDate', 2, get(columnsVisibility, CREATION_DATE_KEY, true), DateValueRender),

      // expiration date
      TableColumnBuilder.buildSimplePropertyColumn(EXPIRATION_DATE_KEY, formatMessage({ id: 'order.list.column.expiration.date' }),
        'content.expirationDate', 3, get(columnsVisibility, EXPIRATION_DATE_KEY, true), DateValueRender),

      // total files size  (as extracted, using getFilesSize)
      TableColumnBuilder.buildSimpleColumnWithCell(FILES_SIZE_KEY, formatMessage({ id: 'order.list.column.files.size' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: OrderListComponent.getFilesSize, RenderConstructor: StorageCapacityRender }]),
        4, get(columnsVisibility, FILES_SIZE_KEY, true)),

      // error files count
      TableColumnBuilder.buildSimplePropertyColumn(ERRORS_COUNT_KEY, formatMessage({ id: 'order.list.column.errors.count' }),
        'content.filesInErrorCount', 5, get(columnsVisibility, ERRORS_COUNT_KEY, true), ErrorsCountRender),

      // Status column
      TableColumnBuilder.buildSimpleColumnWithCell(STATUS_KEY, formatMessage({ id: 'order.list.column.status' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: OrderListComponent.getStatus, RenderConstructor: StatusRender }]),
        6, get(columnsVisibility, STATUS_KEY, true), fixedDataColumnWidth),
      // objects count (as extracted, using getObjectCount)
      // TODO
      TableColumnBuilder.buildSimpleColumnWithCell(OBJECTS_COUNT_KEY, formatMessage({ id: 'order.list.column.object.count' }),
        TableColumnBuilder.buildValuesRenderCell([{ getValue: OrderListComponent.getObjectsCount }]), 7,
        get(columnsVisibility, OBJECTS_COUNT_KEY, true)),
      // Options column
      TableColumnBuilder.buildOptionsColumn(formatMessage({ id: 'order.list.column.options' }),
        this.buildOptions(), get(columnsVisibility, TableColumnBuilder.optionsColumnKey, true), fixedColumnWidth),
    ]
  }

  render() {
    const { displayMode, isFetching, totalOrderCount, onChangeColumnsVisibility, commandsActions, commandsSelectors } = this.props
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
          pageActions={commandsActions}
          pageSelectors={commandsSelectors}
          columns={columns}
          emptyComponent={OrderListComponent.EMPTY_COMPONENT}
        />
      </TableLayout>
    )
  }
}
export default OrderListComponent
