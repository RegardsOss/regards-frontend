/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import values from 'lodash/values'
import clone from 'lodash/clone'
import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import every from 'lodash/every'
import isEqual from 'lodash/isEqual'
import Refresh from 'mdi-material-ui/Refresh'
import DeleteOnAllIcon from 'mdi-material-ui/DeleteForever'
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup, DateValueRender,
  NoContentComponent, TableHeaderLine, TableSelectionModes, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import {
  withResourceDisplayControl, allMatchHateoasDisplayLogic, LoadableContentDisplayDecorator,
} from '@regardsoss/display-control'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { FemDomain, CommonDomain } from '@regardsoss/domain'
import { FemShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import DeleteDialog from './options/DeleteDialog'
import RetryDialog from './options/RetryDialog'
import RequestDeleteOption from './options/RequestDeleteOption'
import RequestRetryOption from './options/RequestRetryOption'
import StatusRender from './render/StatusRender'
import ErrorDetailsDialog from './options/ErrorDetailsDialog'
import { FILTER_PARAMS } from '../domain/FilterParams'
import messages from '../i18n'
import styles from '../styles'

const ResourceFlatButton = withResourceDisplayControl(FlatButton)

/**
  * Displays the list of request
  * @author Théo Lasserre
  */
export class RequestManagerComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    onRefresh: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    tableSelection: PropTypes.arrayOf(FemShapes.Request),
    paneType: PropTypes.oneOf(FemDomain.REQUEST_TYPES),
    // eslint-disable-next-line react/forbid-prop-types
    clients: PropTypes.object.isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
  * Default state for filters edition
  */
  static DEFAULT_FILTERS_STATE = {
    [FILTER_PARAMS.STATE]: '',
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="feature.requests.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="feature.requests.loading.results"
    Icon={SearchIcon}
  />

  /** Possible dialog types for requests */
  static DIALOG_TYPES = {
    RETRY_DIALOG: 'retry',
    DELETE_DIALOG: 'delete',
    CONFIRM_DELETE_DIALOG: 'confirmDeleteDialog',
    CONFIRM_RETRY_DIALOG: 'confirmRetryDialog',
    ERRORS_DIALOG: 'errorDialog',
  }

  static SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static COLUMN_KEYS = {
    PROVIDER_ID: 'providerId',
    REGISTRATION_DATE: 'registrationDate',
    STATE: 'state',
    ACTIONS: 'actions',
  }

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  static buildSortURL = (columnsSorting) => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${RequestManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`)

  state = {
    [RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
    [RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
    [RequestManagerComponent.DIALOG_TYPES.CONFIRM_DELETE_DIALOG]: {
      open: false,
      payload: null,
      isLoading: true, // response time can be a little long for a group deletion. We display a loading until we receive payload
    },
    [RequestManagerComponent.DIALOG_TYPES.CONFIRM_RETRY_DIALOG]: {
      open: false,
      payload: null,
      isLoading: true, // response time can be a little long for a group retry. We display a loading until we receive payload
    },
    [RequestManagerComponent.DIALOG_TYPES.ERRORS_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
    columnsSorting: [],
    contextRequestParameters: {},
    appliedFilters: {},
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => {
    this.onFiltersUpdated(this.props.featureManagerFilters)
  }

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(newProps.featureManagerFilters, this.props.featureManagerFilters)) {
      this.onFiltersUpdated(newProps.featureManagerFilters)
    }
  }

  onFiltersUpdated = (featureManagerFilters) => {
    const { contextRequestParameters } = this.state
    this.setState({
      contextRequestParameters: {
        ...contextRequestParameters,
        ...featureManagerFilters,
      },
    })
  }

  onSort = (columnSortKey, order) => {
    const { columnsSorting, contextRequestParameters } = this.state

    const columnIndex = columnsSorting.findIndex(({ columnKey }) => columnSortKey === columnKey)
    const newColumnSorting = clone(columnsSorting)
    if (order === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
      newColumnSorting.splice(columnIndex, 1)
    } else if (columnIndex === -1) {
      newColumnSorting.push({ columnKey: columnSortKey, order })
    } else {
      newColumnSorting.splice(columnIndex, 1, { columnKey: columnSortKey, order })
    }
    this.setState({
      columnsSorting: newColumnSorting,
      contextRequestParameters: {
        ...contextRequestParameters,
        sort: RequestManagerComponent.buildSortURL(newColumnSorting),
      },
    })
  }

  /**
   * Inner callback: Opens dialog corresopnding to request type
   * @param {string} dialogRequestType dialog type for the request to handle, from RequestManagerComponent.DIALOG_TYPES
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onOpenActionDialog = (dialogRequestType, mode = TableSelectionModes.includeSelected, entities = null) => this.setState({
    [dialogRequestType]: {
      open: true,
      mode,
      entities,
    },
  })

  /**
   * Callback: On view request error for request as parameter (shows corresponding dialog)
   * @param {[*]} entity to view as an IngestShapes.RequestEntity
   */
  onViewRequestErrors = (entity) => this.onOpenActionDialog(RequestManagerComponent.DIALOG_TYPES.ERRORS_DIALOG, TableSelectionModes.includeSelected, [entity])

  /**
   * Callback: On retry requests for selection as parameter (shows corresponding dialog)
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onRetry = (entities, mode) => this.onOpenActionDialog(RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG, mode, entities)

  /**
   * Callback: On delete requests for selection as parameter (shows corresponding dialog)
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onDelete = (entities, mode) => this.onOpenActionDialog(RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG, mode, entities)

  /**
   * Inner callback: closes dialog corresponding to request type
   * @param {string} dialogRequestType dialog type for the request to handle, from RequestManagerComponent.DIALOG_TYPES
   */
  onCloseActionDialog = (dialogRequestType) => this.setState({
    [dialogRequestType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
      isLoading: true, // used only by confirm retry & confirm delete dialogs
    },
  })

  /**
   * Inner callback: confirms action dialog. It:
   * - Hides corresponding dialog
   * - Converts payload to send server action
   * @param {string} dialogRequestType dialog type for the request to handle, from RequestManagerComponent.DIALOG_TYPES
   * @return {*} payload for server action
   */
  onConfirmActionDialog = (dialogRequestType) => {
    const { mode, entities } = this.state[dialogRequestType]
    this.onCloseActionDialog(dialogRequestType)
    return {
      filters: {
        ...this.state.contextRequestParameters,
      },
      requestIdSelectionMode: mode === TableSelectionModes.includeSelected
        ? RequestManagerComponent.SELECTION_MODE.INCLUDE
        : RequestManagerComponent.SELECTION_MODE.EXCLUDE,
      requestIds: map(entities, (e) => e.content.id),
    }
  }

  /** User callback: retry or delete confirmed */
  onConfirm = (dialogType) => {
    const {
      retryRequests, deleteRequests, paneType,
    } = this.props
    const payload = this.onConfirmActionDialog(dialogType)
    let confirmDialogType
    let functionToCall
    switch (dialogType) {
      case RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG:
        confirmDialogType = RequestManagerComponent.DIALOG_TYPES.CONFIRM_RETRY_DIALOG
        functionToCall = retryRequests
        break
      case RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG:
      default:
        confirmDialogType = RequestManagerComponent.DIALOG_TYPES.CONFIRM_DELETE_DIALOG
        functionToCall = deleteRequests
    }
    this.onOpenActionDialog(confirmDialogType)
    functionToCall(payload, paneType).then((actionResult) => {
      if (!actionResult.error) {
        this.setState({
          [confirmDialogType]: {
            open: true,
            isLoading: false,
            payload: actionResult.payload,
          },
        })
      }
    })
  }

  renderConfirmDialog = (dialogType) => {
    const { intl: { formatMessage } } = this.context
    const { open, isLoading, payload } = this.state[dialogType]
    if (open) {
      const totalHandled = payload && payload.totalHandled ? payload.totalHandled : 0
      const totalRequested = payload && payload.totalRequested ? payload.totalRequested : 0
      return (
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.CONFIRM}
            title={formatMessage({ id: `feature.requests.${dialogType}.title` })}
            message={totalHandled === totalRequested
              ? formatMessage({ id: `feature.requests.${dialogType}.message.ok` })
              : formatMessage({ id: `feature.requests.${dialogType}.message.not-ok` }, { totalHandled })}
            onConfirm={() => this.onCloseActionDialog(dialogType)}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
        </LoadableContentDisplayDecorator>
      )
    }
    return null
  }

  renderDialog = (dialogType) => {
    const { open } = this.state[dialogType]
    if (open) {
      let component = null
      switch (dialogType) {
        case RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG:
          component = <DeleteDialog
            onConfirmDelete={() => this.onConfirm(RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG)}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        case RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG:
          component = <RetryDialog
            onConfirmRetry={() => this.onConfirm(RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG)}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        case RequestManagerComponent.DIALOG_TYPES.ERRORS_DIALOG:
          component = <ErrorDetailsDialog
            entity={this.state[RequestManagerComponent.DIALOG_TYPES.ERRORS_DIALOG].entities[0]}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        default:
      }
      return (component)
    }
    return null
  }

  isButtonDisabled = (dialogType) => {
    const { tableSelection, areAllSelected } = this.props
    let ret = !areAllSelected
    if (!isEmpty(tableSelection)) {
      ret = !every(tableSelection, (selection) => find(selection.links, (l) => l.rel === dialogType))
    }
    return ret
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { tableStyle: { loadingStyle } } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      tableSelection, onRefresh, paneType, clients, selectionMode,
      isFetching,
    } = this.props
    const { contextRequestParameters, columnsSorting } = this.state
    return (
      <div>
        <TableLayout>
          <TableHeaderLine key="table.options">
            <TableHeaderOptionsArea reducible />
            <TableHeaderOptionsArea key="options" reducible>
              <TableHeaderOptionGroup>
                <ResourceFlatButton
                  displayLogic={allMatchHateoasDisplayLogic}
                  hideDisabled
                  key="retrySelection"
                  title={formatMessage({ id: 'feature.requests.tooltip.selection.retry' })}
                  label={formatMessage({ id: 'feature.requests.list.filters.buttons.retry' })}
                  icon={<Refresh />}
                  onClick={() => this.onRetry(tableSelection, selectionMode)}
                  disabled={this.isButtonDisabled(RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG)}
                />
                <ResourceFlatButton
                  displayLogic={allMatchHateoasDisplayLogic}
                  hideDisabled
                  key="deleteSelection"
                  title={formatMessage({ id: 'feature.requests.tooltip.selection.delete' })}
                  label={formatMessage({ id: 'feature.requests.list.filters.buttons.delete' })}
                  icon={<DeleteOnAllIcon />}
                  onClick={() => this.onDelete(tableSelection, selectionMode)}
                  disabled={this.isButtonDisabled(RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG)}
                />
                {/* Data refresh */}
                <FlatButton
                  label={formatMessage({ id: 'dashboard.refresh' })}
                  icon={<Refresh />}
                  onClick={() => onRefresh(columnsSorting, contextRequestParameters)}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <div style={loadingStyle}>
            <TableHeaderLoadingComponent loading={isFetching} />
          </div>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={clients.actions}
            pageSelectors={clients.selectors}
            pageSize={RequestManagerComponent.PAGE_SIZE}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
            columns={[ // eslint wont fix: API issue
              new TableColumnBuilder()
                .selectionColumn(true, clients.selectors, clients.tableActions, clients.tableSelectors)
                .build(),
              new TableColumnBuilder(RequestManagerComponent.COLUMN_KEYS.PROVIDER_ID).titleHeaderCell().propertyRenderCell(paneType === FemDomain.REQUEST_TYPES_ENUM.EXTRACTION ? 'content.id' : 'content.providerId')
                .label(formatMessage(paneType === FemDomain.REQUEST_TYPES_ENUM.EXTRACTION ? { id: 'feature.requests.list.filters.id' } : { id: 'feature.requests.list.filters.providerId' }))
                .build(),
              new TableColumnBuilder(RequestManagerComponent.COLUMN_KEYS.REGISTRATION_DATE).titleHeaderCell().propertyRenderCell('content.registrationDate', DateValueRender)
                .label(formatMessage({ id: 'feature.requests.list.filters.lastSubmission' }))
                .sortableHeaderCell(...this.getColumnSortingData(RequestManagerComponent.COLUMN_KEYS.REGISTRATION_DATE), this.onSort)
                .build(),
              new TableColumnBuilder(RequestManagerComponent.COLUMN_KEYS.STATE)
                .label(formatMessage({ id: 'feature.requests.list.filters.state' }))
                .sortableHeaderCell(...this.getColumnSortingData(RequestManagerComponent.COLUMN_KEYS.STATE), this.onSort)
                .rowCellDefinition({ Constructor: StatusRender, props: { onViewRequestErrors: this.onViewRequestErrors } })
                .build(),
              new TableColumnBuilder(RequestManagerComponent.COLUMN_KEYS.ACTIONS).titleHeaderCell()
                .label(formatMessage({ id: 'feature.requests.list.filters.actions' }))
                .optionsColumn([
                  {
                    OptionConstructor: RequestRetryOption,
                    optionProps: { onRetry: this.onRetry },
                  },
                  {
                    OptionConstructor: RequestDeleteOption,
                    optionProps: { onDelete: this.onDelete },
                  }])
                .build(),
            ]}
            requestParams={contextRequestParameters}
            pathParams={{ type: paneType }}
            emptyComponent={isFetching ? RequestManagerComponent.LOADING_COMPONENT : RequestManagerComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
        {this.renderDialog(RequestManagerComponent.DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(RequestManagerComponent.DIALOG_TYPES.RETRY_DIALOG)}
        {this.renderDialog(RequestManagerComponent.DIALOG_TYPES.ERRORS_DIALOG)}
        {this.renderConfirmDialog(RequestManagerComponent.DIALOG_TYPES.CONFIRM_DELETE_DIALOG)}
        {this.renderConfirmDialog(RequestManagerComponent.DIALOG_TYPES.CONFIRM_RETRY_DIALOG)}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(RequestManagerComponent))
