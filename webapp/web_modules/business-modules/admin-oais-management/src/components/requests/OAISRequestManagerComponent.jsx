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
import clone from 'lodash/clone'
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import values from 'lodash/values'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import Refresh from 'mdi-material-ui/Refresh'
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup, DateValueRender,
  TableSelectionModes, NoContentComponent, TableHeaderLine, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { CommonDomain, IngestDomain } from '@regardsoss/domain'
import FlatButton from 'material-ui/FlatButton'

import Dialog from 'material-ui/Dialog'
import { IngestShapes, CommonShapes } from '@regardsoss/shape'
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
import RequestTypeRenderCell from './RequestTypeRenderCell'
import VersionOptionSelectionDialog from './VersionOptionSelectionDialog'
import RequestOperationsMenuContainer from '../../containers/requests/RequestOperationsMenuContainer'
import AbortAllRequestsDialog from './AbortAllRequestsDialog'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
export class OAISRequestManagerComponent extends React.Component {
  static propTypes = {
    pageMeta: CommonShapes.PageMetadata.isRequired,
    pageLoading: PropTypes.bool.isRequired,
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    requestFilters: OAISCriterionShape,
    modeSelectionAllowed: PropTypes.bool.isRequired,
    clearSelection: PropTypes.func.isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    fetchPage: PropTypes.func.isRequired,
    updateStateFromRequestManager: PropTypes.func.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
    selectVersionOption: PropTypes.func.isRequired,
    abortRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** Possible dialog types for requests */
  static DIALOG_TYPES = {
    errorsDialog: 'errorsDialog',
    retryDialog: 'retryDialog',
    deleteDialog: 'deleteDialog',
    versionOptionSelectionDialog: 'versionOptionSelectionDialog',
    abortDialog: 'abortDialog',
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="oais.requests.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="oais.requests.loading.results"
    Icon={SearchIcon}
  />

  static DELETION_SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static COLUMN_KEYS = {
    ID: 'providerId',
    TYPE: 'dtype',
    STATE: 'state',
    LASTSUBMITTED: 'creationDate',
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
      contextRequestBodyParameters.states = [state] // handled as a muti-choice list on back
    }
    return contextRequestBodyParameters
  }

  static buildSortURL = (columnsSorting) => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${OAISRequestManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`)

  state = {
    contextRequestBodyParameters: {},
    contextRequestURLParameters: {},
    appliedFilters: {},
    columnsSorting: [],
    [OAISRequestManagerComponent.DIALOG_TYPES.errorsDialog]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [], // included or excluded depending on mode
    },
    [OAISRequestManagerComponent.DIALOG_TYPES.versionOptionSelectionDialog]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [OAISRequestManagerComponent.DIALOG_TYPES.retryDialog]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [OAISRequestManagerComponent.DIALOG_TYPES.deleteDialog]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [OAISRequestManagerComponent.DIALOG_TYPES.abortDialog]: {
      open: false,
      mode: TableSelectionModes.excludeSelected,
      entities: [],
    },
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => {
    this.onRequestStateUpdated(this.props.featureManagerFilters, this.props.requestFilters || {})
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
    if (!isEqual(newProps.featureManagerFilters, this.props.featureManagerFilters) || !isEqual(newProps.requestFilters, this.props.requestFilters)) {
      this.onRequestStateUpdated(newProps.featureManagerFilters, newProps.requestFilters)
    }
  }

  onRequestStateUpdated = (featureManagerFilters, appliedFilters) => {
    this.setState({
      appliedFilters,
      contextRequestBodyParameters: OAISRequestManagerComponent.buildContextRequestBody({ ...featureManagerFilters, ...appliedFilters }),
    })
  }

  onRefresh = () => {
    const {
      pageMeta, pageSize, clearSelection, fetchPage,
    } = this.props
    const { contextRequestBodyParameters, contextRequestURLParameters, columnsSorting } = this.state
    // compute page size to refresh all current entities in the table
    const lastPage = (pageMeta && pageMeta.number) || 0
    const fetchPageSize = pageSize * (lastPage + 1)
    clearSelection()
    fetchPage(0, fetchPageSize, {}, columnsSorting, { ...contextRequestBodyParameters, ...contextRequestURLParameters })
  }

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
        sort: OAISRequestManagerComponent.buildSortURL(newColumnSorting),
      },
    })
  }

  onFilterUpdated = (newFilterValue) => {
    const newAppliedFilters = {
      ...this.state.appliedFilters,
      ...newFilterValue,
    }
    this.onRequestStateUpdated(this.props.featureManagerFilters, newAppliedFilters)
  }

  onChangeStateFilter = (event, index, filterValues) => {
    const { updateStateFromRequestManager } = this.props
    const finalNewValue = filterValues || undefined
    updateStateFromRequestManager({ state: finalNewValue })
  }

  onChangeTypeFilter = (event, index, filterValues) => {
    const { updateStateFromRequestManager } = this.props
    const finalNewValue = filterValues || undefined
    updateStateFromRequestManager({ type: finalNewValue })
  }

  /**
   * Inner callback: Opens dialog corresopnding to request type
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   * @param {string} dialogRequestType dialog type for the request to handle, from OAISRequestManagerComponent.DIALOG_TYPES
   */
  onOpenActionDialog = (mode, entities, dialogRequestType) => this.setState({
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
  onViewRequestErrors = (entity) => this.onOpenActionDialog(TableSelectionModes.includeSelected, [entity], OAISRequestManagerComponent.DIALOG_TYPES.errorsDialog)

  /**
   * Callback: On select version option for requests as parameter (shows corresponding dialog)
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onSelectVersionOption = (mode, entities) => this.onOpenActionDialog(mode, entities, OAISRequestManagerComponent.DIALOG_TYPES.versionOptionSelectionDialog)

  /**
   * Callback: On retry requests for selection as parameter (shows corresponding dialog)
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onRetry = (mode, entities) => this.onOpenActionDialog(mode, entities, OAISRequestManagerComponent.DIALOG_TYPES.retryDialog)

  /**
   * Callback: On delete requests for selection as parameter (shows corresponding dialog)
   * @param {string} mode selection mode from TableSelectionModes
   * @param {[*]} entities entities as an array of IngestShapes.RequestEntity (to include or exclude from request)
   */
  onDelete = (mode, entities) => this.onOpenActionDialog(mode, entities, OAISRequestManagerComponent.DIALOG_TYPES.deleteDialog)

  /** Callback: On delete requests for selection as parameter (shows corresponding dialog). Mode and selection are ignored (always all selected) */
  onAbort = () => this.onOpenActionDialog(TableSelectionModes.excludeSelected, [], OAISRequestManagerComponent.DIALOG_TYPES.abortDialog)

  /**
   * Inner callback: closes dialog corresponding to request type
   * @param {string} dialogRequestType dialog type for the request to handle, from OAISRequestManagerComponent.DIALOG_TYPES
   */
  onCloseActionDialog = (dialogRequestType) => this.setState({
    [dialogRequestType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  })

  /** Callback: closes request errors dialog */
  onCloseRequestErrors = () => this.onCloseActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.errorsDialog)

  /** Callback: closes version options selection dialog */
  onCloseVersionOptionSelectionDialog = () => this.onCloseActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.versionOptionSelectionDialog)

  /** Callback: closes retry dialog */
  onCloseRetryDialog = () => this.onCloseActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.retryDialog)

  /** Callback: closes delete dialog */
  onCloseDeleteDialog = () => this.onCloseActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.deleteDialog)

  /** Callback: closes abort dialog */
  onCloseAbortDialog = () => this.onCloseActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.abortDialog)

  /**
   * Inner callback: confirms action dialog. It:
   * - Hides corresponding dialog
   * - Converts payload to send server action
   * @param {string} dialogRequestType dialog type for the request to handle, from OAISRequestManagerComponent.DIALOG_TYPES
   * @return {*} payload for server action
   */
  onConfirmActionDialog = (dialogRequestType) => {
    const { mode, entities } = this.state[dialogRequestType]
    this.onCloseActionDialog(dialogRequestType)
    return {
      ...this.state.contextRequestBodyParameters,
      requestIdSelectionMode: mode === TableSelectionModes.includeSelected
        ? OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE
        : OAISRequestManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
      requestIds: entities.map((e) => e.content.id),
    }
  }

  /**
   * User callback: version selection confirmed for selection as parameter, send to server
   * @param {string} newVersioningMode selected by user in IngestDomain.VERSIONING_MODES_ENUM
   */
  onConfirmVersionOptionSelectionDialog = (newVersioningMode) => {
    const { selectVersionOption } = this.props
    const payload = this.onConfirmActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.versionOptionSelectionDialog)
    selectVersionOption({
      ...payload,
      newVersioningMode,
    })
  }

  /** User callback: retry confirmed for selection as parameter, send to server */
  onConfirmRetry = () => {
    const { retryRequests } = this.props
    const payload = this.onConfirmActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.retryDialog)
    retryRequests(payload)
  }

  /** User callback: delete confirmed for selection as parameter, send to server */
  onConfirmDelete = () => {
    const { deleteRequests } = this.props
    const payload = this.onConfirmActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.deleteDialog)
    deleteRequests(payload)
  }

  /** Callback: applies abort */
  onConfirmAbort = () => {
    const { abortRequests } = this.props
    this.onConfirmActionDialog(OAISRequestManagerComponent.DIALOG_TYPES.abortDialog)
    abortRequests()
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      tableSelection, selectionMode, requestFilters, modeSelectionAllowed,
      pageSize, pageMeta, pageLoading,
    } = this.props
    const { contextRequestURLParameters, contextRequestBodyParameters } = this.state
    return (
      <div>
        <TableLayout>
          <TableHeaderLoadingComponent loading={pageLoading} />
          <TableHeaderLine key="table.options">
            <TableHeaderOptionsArea key="filtersArea" reducible alignLeft>
              <TableHeaderOptionGroup key="first">
                <SelectField
                  autoWidth
                  style={filter.fieldStyle}
                  hintText={formatMessage({ id: 'oais.requests.list.filters.type' })}
                  value={requestFilters ? requestFilters.type : null}
                  onChange={this.onChangeTypeFilter}
                >
                  <MenuItem key="no.value" value={null} primaryText={formatMessage({ id: 'oais.requests.type.any' })} />
                  {IngestDomain.AIP_REQUEST_TYPES.map((type) => <MenuItem key={type} value={type} primaryText={formatMessage({ id: `oais.requests.type.${type}` })} />)}
                </SelectField>
                <SelectField
                  autoWidth
                  style={filter.fieldStyle}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.state' })}
                  value={requestFilters ? requestFilters.state : null}
                  onChange={this.onChangeStateFilter}
                >
                  <MenuItem key="no.value" value={null} primaryText={formatMessage({ id: 'oais.requests.status.any' })} />
                  {IngestDomain.AIP_REQUEST_STATUS.map((status) => <MenuItem key={status} value={status} primaryText={formatMessage({ id: `oais.requests.status.${status}` })} />)}
                </SelectField>
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
            <TableHeaderOptionsArea key="options" reducible>
              <TableHeaderOptionGroup>
                {/* selection and advanced options */}
                <RequestOperationsMenuContainer
                  selectionMode={selectionMode}
                  tableSelection={tableSelection}
                  pageMeta={pageMeta}
                  onSelectVersionOption={this.onSelectVersionOption}
                  onRetrySelection={this.onRetry}
                  onDeleteSelection={this.onDelete}
                  onAbort={this.onAbort}
                />
                {/* Data refresh */}
                <FlatButton
                  label={formatMessage({ id: 'oais.packages.switch-to.refresh' })}
                  icon={<Refresh />}
                  onClick={this.onRefresh}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <PageableInfiniteTableContainer
            name="request-management-table"
            pageActions={requestActions}
            pageSelectors={requestSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
            columns={[ // eslint wont fix: API issue
              new TableColumnBuilder()
                .selectionColumn(true, requestSelectors, requestTableActions, requestTableSelectors)
                .build(),
              new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.ID).titleHeaderCell().propertyRenderCell('content.providerId')
                .label(formatMessage({ id: 'oais.requests.list.filters.providerId' }))
                .sortableHeaderCell(...this.getColumnSortingData(OAISRequestManagerComponent.COLUMN_KEYS.ID), this.onSort)
                .build(),
              new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.TYPE).titleHeaderCell()
                .propertyRenderCell('content.dtype', RequestTypeRenderCell)
                .label(formatMessage({ id: 'oais.requests.list.filters.type' }))
                .sortableHeaderCell(...this.getColumnSortingData(OAISRequestManagerComponent.COLUMN_KEYS.TYPE), this.onSort)
                .build(),
              new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEYS.STATE).titleHeaderCell()
                .rowCellDefinition({
                  Constructor: RequestStatusRenderCell,
                  props: {
                    modeSelectionAllowed,
                    onViewRequestErrors: this.onViewRequestErrors,
                    onSelectVersionOption: this.onSelectVersionOption,
                  },
                })
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
            ]}
            requestParams={contextRequestURLParameters}
            bodyParams={contextRequestBodyParameters}
            emptyComponent={pageLoading ? OAISRequestManagerComponent.LOADING_COMPONENT : OAISRequestManagerComponent.EMPTY_COMPONENT}
            fetchUsingPostMethod
          />
        </TableLayout>
        { /** -------- Dialogs -------- **/}
        <Dialog // 1. errors
          title={formatMessage({ id: 'oais.aips.list.aip-details.title' })}
          open={this.state[OAISRequestManagerComponent.DIALOG_TYPES.errorsDialog].open}
        >
          <RequestErrorDetailsComponent
            entity={this.state[OAISRequestManagerComponent.DIALOG_TYPES.errorsDialog].entities[0]}
            onClose={this.onCloseRequestErrors}
          />
        </Dialog>
        <VersionOptionSelectionDialog // 2. version option selection
          selection={this.state[OAISRequestManagerComponent.DIALOG_TYPES.versionOptionSelectionDialog]}
          onClose={this.onCloseVersionOptionSelectionDialog}
          onConfirm={this.onConfirmVersionOptionSelectionDialog}
        />
        <RequestRetryDialog // 3. retry
          open={this.state[OAISRequestManagerComponent.DIALOG_TYPES.retryDialog].open}
          onConfirmRetry={this.onConfirmRetry}
          onClose={this.onCloseRetryDialog}
        />
        <RequestDeleteDialog // 4. delete
          open={this.state[OAISRequestManagerComponent.DIALOG_TYPES.deleteDialog].open}
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteDialog}
        />
        <AbortAllRequestsDialog // 5. abort all
          open={this.state[OAISRequestManagerComponent.DIALOG_TYPES.abortDialog].open}
          onConfirmAbort={this.onConfirmAbort}
          onClose={this.onCloseAbortDialog}
        />
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISRequestManagerComponent))
