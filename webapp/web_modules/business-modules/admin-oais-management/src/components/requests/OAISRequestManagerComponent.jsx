/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import clone from 'lodash/clone'
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import NoContentIcon from 'material-ui/svg-icons/image/crop-free'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup, DateValueRender,
  TableSelectionModes, NoContentComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CommonDomain } from '@regardsoss/domain'
import FlatButton from 'material-ui/FlatButton'
import AvReplay from 'material-ui/svg-icons/av/replay'
import Stop from 'mdi-material-ui/Stop'
import Delete from 'mdi-material-ui/Delete'
import Dialog from 'material-ui/Dialog'
import { IngestShapes } from '@regardsoss/shape'
import { requestActions, requestSelectors } from '../../clients/RequestClient'
import messages from '../../i18n'
import styles from '../../styles'
import { requestTableSelectors, requestTableActions } from '../../clients/RequestTableClient'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'
import RequestRetryDialog from './RequestRetryDialog'
import RequestDeleteDialog from './RequestDeleteDialog'
import RequestDeleteOption from './RequestDeleteOption'
import RequestRetryOption from './RequestRetryOption'
import RequestStatusRenderCell from './RequestStatusRenderCell'
import RequestErrorDetailsComponent from './RequestErrorDetailsComponent'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
export class OAISRequestManagerComponent extends React.Component {
  static propTypes = {
    updateStateFromRequestManager: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    requestFilters: OAISCriterionShape,
    selectionMode: PropTypes.string.isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    abortRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="oais.requests.empty.results"
    Icon={NoContentIcon}
  />

  static REQUEST_STATES = {
    TO_SCHEDULE: 'TO_SCHEDULE',
    CREATED: 'CREATED',
    BLOCKED: 'BLOCKED',
    RUNNING: 'RUNNING',
    ERROR: 'ERROR',
  }

  static REQUEST_TYPES = {
    STORE_METADATA: 'STORE_METADATA',
    UPDATE: 'UPDATE',
    AIP_UPDATES_CREATOR: 'AIP_UPDATES_CREATOR',
    INGEST: 'INGEST',
    STORAGE_DELETION: 'STORAGE_DELETION',
    OAIS_DELETION: 'OAIS_DELETION',
  }

  static DELETION_SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static COLUMN_KEYS = {
    ID: 'id',
    TYPE: 'type',
    STATE: 'state',
    LASTSUBMITTED: 'lastSubmitted',
    ACTIONS: 'actions',

  }

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  static buildContextRequestBody(appliedFilters) {
    const {
      sessionOwner, session, providerId, from, to, type, state,
    } = appliedFilters
    let contextRequestBodyParameters = {}
    if (sessionOwner) {
      contextRequestBodyParameters.sessionOwner = sessionOwner
    }
    if (session) {
      contextRequestBodyParameters.session = session
    }
    if (providerId) {
      contextRequestBodyParameters.providerIds = [providerId]
    }
    if (from) {
      contextRequestBodyParameters = { ...contextRequestBodyParameters, creationDate: { ...contextRequestBodyParameters.creationDate, from } }
    }
    if (to) {
      contextRequestBodyParameters = { ...contextRequestBodyParameters, creationDate: { ...contextRequestBodyParameters.creationDate, to } }
    }
    if (type) {
      contextRequestBodyParameters.requestType = type
    }
    if (state) {
      contextRequestBodyParameters.state = state
    }
    return contextRequestBodyParameters
  }

  state = {
    contextRequestBodyParameters: {},
    contextRequestURLParameters: {},
    appliedFilters: {},
    columnsSorting: [],
    // retryPayload: {},
    // retryErrors: [],
    isRetryDialogOpened: false,
    isRetrySelectionDialogOpened: false,
    // deletionPayload: {},
    // deletionErrors: [],
    isDeleteDialogOpened: false,
    isDeleteSelectionDialogOpened: false,
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  componentWillMount = () => {
    this.onRequestStateUpdated(this.props.featureManagerFilters, this.props.requestFilters || {}, this.state.contextRequestURLParameters)
  }

  /**
    * Lifecycle method: component receive props. Used here to detect properties change and update local state
    * @param {*} nextProps next component properties
    */
  componentWillReceiveProps = (nextProps) => {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
    * Properties change detected: update local state
    * @param oldProps previous component properties
    * @param newProps next component properties
    */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(newProps.featureManagerFilters, this.props.featureManagerFilters) || !isEqual(newProps.requestFilters, this.props.requestFilters)) {
      this.onRequestStateUpdated(newProps.featureManagerFilters, newProps.requestFilters, this.state.contextRequestURLParameters)
    }
  }

  onRequestStateUpdated = (featureManagerFilters, appliedFilters, contextRequestURLParameters) => {
    this.setState({
      contextRequestURLParameters,
      appliedFilters,
      contextRequestBodyParameters: OAISRequestManagerComponent.buildContextRequestBody({ ...featureManagerFilters, ...appliedFilters }),
    })
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  buildSortURL = columnsSorting => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${OAISRequestManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`)

  onSort = (columnSortKey, order) => {
    const { columnsSorting } = this.state

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
      contextRequestURLParameters: {
        sort: this.buildSortURL(newColumnSorting),
      },
    })
  }

  onFilterUpdated = (newFilterValue) => {
    const newAppliedFilters = {
      ...this.state.appliedFilters,
      ...newFilterValue,
    }
    this.onRequestStateUpdated(this.props.featureManagerFilters, newAppliedFilters, this.state.columnsSorting)
  }

  changeStateFilter = (event, index, values) => {
    const { updateStateFromRequestManager } = this.props
    const finalNewValue = values && values !== '' ? values : undefined
    updateStateFromRequestManager({ state: finalNewValue })
  }

  changeTypeFilter = (event, index, values) => {
    const { updateStateFromRequestManager } = this.props
    const finalNewValue = values && values !== '' ? values : undefined
    updateStateFromRequestManager({ type: finalNewValue })
  }

  onViewRequestErrors = (requestErrorsToView) => {
    this.setState({
      requestErrorsToView: requestErrorsToView || null,
    })
  }

  onCloseRequestErrors = () => {
    this.setState({
      requestErrorsToView: null,
    })
  }

  renderRequestErrorsDetail = () => {
    const { intl } = this.context
    const { requestErrorsToView } = this.state
    if (requestErrorsToView) {
      return (
        <Dialog
          title={intl.formatMessage({ id: 'oais.aips.list.aip-details.title' })}
          open
        >
          <RequestErrorDetailsComponent
            entity={requestErrorsToView}
            onClose={this.onCloseRequestErrors}
          />
        </Dialog>
      )
    }
    return null
  }

  onConfirmRetry = () => {
    this.onCloseRetryDialog()
    this.onCloseRetrySelectionDialog()
    const { retryPayload, contextRequestBodyParameters } = this.state
    const { retryRequests } = this.props
    const finalRetryPayload = {
      ...contextRequestBodyParameters,
      ...retryPayload,
    }
    retryRequests(finalRetryPayload).then((actionResult) => {
      if (actionResult.error) {
        // const errors = []
        // errors.push({
        //   providerId,
        //   reason: formatMessage({ id: 'oais.sip.delete.error.title' }, { id: providerId }),
        // })
        // this.displayDeletionErrors(providerId, errors)
      } else {
        // Display error dialogs if errors are raised by the service.
        // A 200 OK response is sent by the backend. So we check errors into the response payload.
        // this.displayDeletionErrors(providerId, get(actionResult, 'payload', []))
        // Refresh view
        // this.props.onRefresh(appliedFilters)
      }
    })
  }

  onRetry = (requestToRetry) => {
    this.setState({
      isRetryDialogOpened: true,
      retryPayload: {
        selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
        requestIds: [
          requestToRetry.content.id,
        ],
      },
    })
  }

  onCloseRetryDialog = () => {
    this.setState({
      isRetryDialogOpened: false,
    })
  }

  renderRetryConfirmDialog = () => {
    const { isRetryDialogOpened } = this.state
    if (isRetryDialogOpened) {
      return (
        <RequestRetryDialog
          onConfirmRetry={this.onConfirmRetry}
          onClose={this.onCloseRetryDialog}
        />
      )
    }
    return null
  }

  onRetrySelection = () => {
    const { tableSelection, selectionMode } = this.props

    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        this.setState({
          isRetrySelectionDialogOpened: true,
          retryPayload: {
            requestIdSelectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
            requestIds: map(tableSelection, entity => entity.content.id),
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isRetrySelectionDialogOpened: true,
          retryPayload: {
            requestIdSelectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
            requestIds: map(tableSelection, entity => entity.content.id),
          },
        })
        break
      default:
        break
    }
  }

  onCloseRetrySelectionDialog = () => {
    this.setState({
      isRetrySelectionDialogOpened: false,
    })
  }

  renderRetrySelectionConfirmDialog = () => {
    const { isRetrySelectionDialogOpened } = this.state

    if (isRetrySelectionDialogOpened) {
      return (
        <RequestRetryDialog
          onConfirmRetry={this.onConfirmRetry}
          onClose={this.onCloseRetrySelectionDialog}
        />
      )
    }
    return null
  }

  onConfirmDelete = () => {
    this.onCloseDeleteDialog()
    this.onCloseDeleteSelectionDialog()
    const { deletionPayload, contextRequestBodyParameters } = this.state
    const { deleteRequests } = this.props
    const finalDeletionPayload = {
      ...contextRequestBodyParameters,
      ...deletionPayload,
    }
    deleteRequests(finalDeletionPayload).then((actionResult) => {
      if (actionResult.error) {
        // const errors = []
        // errors.push({
        //   providerId,
        //   reason: formatMessage({ id: 'oais.sip.delete.error.title' }, { id: providerId }),
        // })
        // this.displayDeletionErrors(providerId, errors)
      } else {
        // Display error dialogs if errors are raised by the service.
        // A 200 OK response is sent by the backend. So we check errors into the response payload.
        // this.displayDeletionErrors(providerId, get(actionResult, 'payload', []))
        // Refresh view
        // this.props.onRefresh(appliedFilters)
      }
    })
  }

  onDelete = (requestToDelete) => {
    this.setState({
      isDeleteDialogOpened: true,
      deletionPayload: {
        selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
        requestIds: [
          requestToDelete.content.id,
        ],
      },
    })
  }

  onCloseDeleteDialog = () => {
    this.setState({
      isDeleteDialogOpened: false,
    })
  }

  renderDeleteConfirmDialog = () => {
    const { isDeleteDialogOpened } = this.state
    if (isDeleteDialogOpened) {
      return (
        <RequestDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteDialog}
        />
      )
    }
    return null
  }

  onDeleteSelection = () => {
    const { selectionMode } = this.props

    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            requestIdSelectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            requestIdSelectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
          },
        })
        break
      default:
        break
    }
  }

  onCloseDeleteSelectionDialog = () => {
    this.setState({
      isDeleteSelectionDialogOpened: false,
    })
  }

  renderDeleteSelectionConfirmDialog = () => {
    const { isDeleteSelectionDialogOpened } = this.state
    if (isDeleteSelectionDialogOpened) {
      return (
        <RequestDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteSelectionDialog}
        />
      )
    }
    return null
  }

  onAbortSelection = () => {
    const { abortRequests } = this.props
    abortRequests()
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      pageSize, tableSelection, selectionMode, requestFilters,
    } = this.props
    const { contextRequestURLParameters, contextRequestBodyParameters } = this.state
    const types = OAISRequestManagerComponent.REQUEST_TYPES
    const states = OAISRequestManagerComponent.REQUEST_STATES
    const columns = [
      new TableColumnBuilder()
        .selectionColumn(true, requestSelectors, requestTableActions, requestTableSelectors)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.ID).titleHeaderCell().propertyRenderCell('content.providerId')
        .label(formatMessage({ id: 'oais.requests.list.filters.providerId' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISRequestManagerComponent.COLUMN_KEYS.ID), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.TYPE).titleHeaderCell().propertyRenderCell('content.dtype')
        .label(formatMessage({ id: 'oais.requests.list.filters.type' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISRequestManagerComponent.COLUMN_KEYS.TYPE), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.STATE).titleHeaderCell()
        .rowCellDefinition({ Constructor: RequestStatusRenderCell, props: { onViewRequestErrors: this.onViewRequestErrors } })
        .label(formatMessage({ id: 'oais.requests.list.filters.state' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISRequestManagerComponent.COLUMN_KEYS.STATE), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.LASTSUBMITTED).titleHeaderCell().propertyRenderCell('content.creationDate', DateValueRender)
        .label(formatMessage({ id: 'oais.requests.list.filters.lastSubmission' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISRequestManagerComponent.COLUMN_KEYS.LASTSUBMITTED), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.ACTIONS).titleHeaderCell()
        .label(formatMessage({ id: 'oais.requests.list.filters.actions' }))
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
    ]
    return (
      <div>
        <TableLayout>
          <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
            <TableHeaderOptionGroup key="first">
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={formatMessage({ id: 'oais.requests.list.filters.type' })}
                value={requestFilters ? requestFilters.type : ''}
                onChange={this.changeTypeFilter}
              >
                {map(types, type => <MenuItem key={type} value={type} primaryText={type} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={formatMessage({ id: 'oais.packages.list.filters.state' })}
                value={requestFilters ? requestFilters.state : ''}
                onChange={this.changeStateFilter || ''}
              >
                {map(states, state => <MenuItem key={state} value={state} primaryText={state} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="retry"
                label={formatMessage({ id: 'oais.requests.list.filters.buttons.retry' })}
                icon={<AvReplay />}
                onClick={this.onRetrySelection}
                disabled={isEmpty(tableSelection) && selectionMode === TableSelectionModes.includeSelected}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="delete"
                label={formatMessage({ id: 'oais.requests.list.filters.buttons.delete' })}
                icon={<Delete />}
                onClick={this.onDeleteSelection}
                disabled={isEmpty(tableSelection) && selectionMode === TableSelectionModes.includeSelected}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="abort"
                label={formatMessage({ id: 'oais.requests.list.filters.buttons.abort' })}
                icon={<Stop />}
                onClick={this.onAbortSelection}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={requestActions}
            pageSelectors={requestSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={contextRequestURLParameters}
            bodyParams={contextRequestBodyParameters}
            emptyComponent={OAISRequestManagerComponent.EMPTY_COMPONENT}
            fetchUsingPostMethod
          />
        </TableLayout>
        {this.renderRequestErrorsDetail()}
        {this.renderRetryConfirmDialog()}
        {this.renderRetrySelectionConfirmDialog()}
        {this.renderDeleteConfirmDialog()}
        {this.renderDeleteSelectionConfirmDialog()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISRequestManagerComponent))
