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
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import { browserHistory } from 'react-router'
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
import Filter from 'mdi-material-ui/Filter'
import Dialog from 'material-ui/Dialog'
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
class OAISRequestManagerComponent extends React.Component {
  static propTypes = {
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    // onRefresh: PropTypes.func.isRequired,
    // tableSelection: PropTypes.arrayOf(IngestShapes.RequestEntity),
    selectionMode: PropTypes.string.isRequired,
    deleteRequests: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
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

  static COLUMN_KEY_TO_QUERY = {
    ID: 'column.id',
    TYPE: 'column.type',
    STATE: 'column.state',
    LASTSUBMITTED: 'column.lastSubmitted',
  }

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  static getColumnSortingData(columnsSorting, columnKey) {
    const foundColumnIndex = columnsSorting.findIndex(({ columnKey: localColumnKey }) => localColumnKey === columnKey)
    return foundColumnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[foundColumnIndex].order, foundColumnIndex]
  }

  static buildRequestParameters(columnsSorting, appliedFilters) {
    const {
      sessionOwner, session, providerId, from, to, type, state, lastUpdated,
    } = appliedFilters
    const newFilters = {}
    if (sessionOwner) {
      newFilters.sessionOwner = sessionOwner
    }
    if (session) {
      newFilters.session = session
    }
    if (providerId) {
      newFilters.providerIds = [providerId]
    }
    if (from) {
      newFilters.lastUpdate.from = from.toISOString()
    }
    if (to) {
      newFilters.lastUpdate.to = to.toISOString()
    }
    if (type) {
      newFilters.dType = type
    }
    if (state) {
      newFilters.state = state
    }
    if (lastUpdated) {
      newFilters.lastUpdated = lastUpdated
    }
    const requestParameters = {
      sort: columnsSorting.map(({ columnKey, order }) => `${OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY[columnKey]},${OAISRequestManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`),
      ...newFilters,
    }
    return requestParameters
  }

  state = {
    tableRequestParameters: {},
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
      const { query = {} } = browserHistory.getCurrentLocation()
      const { state } = query
      this.onRequestStateUpdated(this.props.featureManagerFilters, { state }, this.state.columnsSorting)
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
     if (!isEqual(newProps.featureManagerFilters, this.props.featureManagerFilters)) {
       this.onRequestStateUpdated(newProps.featureManagerFilters, this.state.appliedFilters, this.state.columnsSorting)
     }
   }

   onRequestStateUpdated = (featureManagerFilters, appliedFilters, columnsSorting) => {
     this.setState({
       columnsSorting,
       appliedFilters,
       tableRequestParameters: OAISRequestManagerComponent.buildRequestParameters(columnsSorting, { ...featureManagerFilters, ...appliedFilters }),
     })
   }

   onSort = (columnKey, order) => {
     const { columnsSorting } = this.state
     const newColumnSorting = columnsSorting
     const columnIndex = newColumnSorting.findIndex(columnArray => columnArray.columnKey === columnKey)
     if (order === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
       newColumnSorting.splice(columnIndex, 1)
     } else if (columnIndex === -1) {
       newColumnSorting.push({ columnKey, order })
     } else {
       newColumnSorting.splice(columnIndex, 1, { columnKey, order })
     }
     this.onRequestStateUpdated(this.props.featureManagerFilters, this.state.appliedFilters, newColumnSorting)
   }

  onFilterUpdated = (newFilterValue) => {
    const newAppliedFilters = {
      ...this.state.appliedFilters,
      ...newFilterValue,
    }
    this.onRequestStateUpdated(this.props.featureManagerFilters, newAppliedFilters, this.state.columnsSorting)
  }

  changeStateFilter = (event, index, values) => {
    console.error('values', values)
    this.onFilterUpdated({ state: values })
  }

  changeTypeFilter = (event, index, values) => {
    this.onFilterUpdated({ type: values })
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
    const { retryPayload, tableRequestParameters } = this.state
    const { retryRequests } = this.props
    const finalRetryPayload = {
      ...tableRequestParameters,
      ...retryPayload,
    }
    retryRequests(finalRetryPayload).then((actionResult) => {
      if (actionResult.error) {
        console.error('retryError')
      } else {
        console.error('noRetryError')
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
    this.setState({
      isRetrySelectionDialogOpened: true,
    })
  }

  onCloseRetrySelectionDialog = () => {
    this.setState({
      isRetrySelectionDialogOpened: false,
    })
  }

  renderRetrySelectionConfirmDialog = () => {
    const { isRetrySelectionDialogOpened, tableSelection } = this.state
    if (isRetrySelectionDialogOpened && !isEmpty(tableSelection)) {
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
    const { deletionPayload, tableRequestParameters } = this.state
    const { deleteRequests } = this.props
    const finalDeletionPayload = {
      ...tableRequestParameters,
      ...deletionPayload,
    }
    deleteRequests(finalDeletionPayload).then((actionResult) => {
      if (actionResult.error) {
        console.error('retryError')
      } else {
        console.error('noRetryError')
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
            selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            selectionMode: OAISRequestManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
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
    const { isDeleteSelectionDialogOpened, tableSelection } = this.state
    if (isDeleteSelectionDialogOpened && !isEmpty(tableSelection)) {
      return (
        <RequestDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteSelectionDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { pageSize } = this.props
    const { appliedFilters, tableRequestParameters, columnsSorting } = this.state
    const types = OAISRequestManagerComponent.REQUEST_TYPES
    const states = OAISRequestManagerComponent.REQUEST_STATES
    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, requestSelectors, requestTableActions, requestTableSelectors)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.ID).titleHeaderCell().propertyRenderCell('content.providerId')
        .label(formatMessage({ id: 'oais.requests.list.filters.providerId' }))
        .sortableHeaderCell(...OAISRequestManagerComponent.getColumnSortingData(columnsSorting, OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.ID), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.TYPE).titleHeaderCell().propertyRenderCell('content.dtype')
        .label(formatMessage({ id: 'oais.requests.list.filters.type' }))
        .sortableHeaderCell(...OAISRequestManagerComponent.getColumnSortingData(columnsSorting, OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.TYPE), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.STATE).titleHeaderCell()
        .rowCellDefinition({ Constructor: RequestStatusRenderCell, props: { onViewRequestErrors: this.onViewRequestErrors } })
        .label(formatMessage({ id: 'oais.requests.list.filters.state' }))
        .sortableHeaderCell(...OAISRequestManagerComponent.getColumnSortingData(columnsSorting, OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.STATE), this.onSort)
        .build(),
      new TableColumnBuilder(OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.LASTSUBMITTED).titleHeaderCell().propertyRenderCell('content.creationDate', DateValueRender)
        .label(formatMessage({ id: 'oais.requests.list.filters.lastSubmission' }))
        .sortableHeaderCell(...OAISRequestManagerComponent.getColumnSortingData(columnsSorting, OAISRequestManagerComponent.COLUMN_KEY_TO_QUERY.LASTSUBMITTED), this.onSort)
        .build(),
      new TableColumnBuilder('column.actions').titleHeaderCell()
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
                value={appliedFilters.type}
                onChange={this.changeTypeFilter}
              >
                {map(types, type => <MenuItem key={type} value={type} primaryText={type} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={formatMessage({ id: 'oais.packages.list.filters.state' })}
                value={appliedFilters.state}
                onChange={this.changeStateFilter}
              >
                {map(states, state => <MenuItem key={state} value={state} primaryText={state} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="retry"
                label={formatMessage({ id: 'oais.requests.list.filters.buttons.retry' })}
                icon={<Filter />}
                onClick={this.onRetrySelection}
              />
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="delete"
                label={formatMessage({ id: 'oais.requests.list.filters.buttons.delete' })}
                icon={<Filter />}
                onClick={this.onDeleteSelection}
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
            requestParams={tableRequestParameters}
            emptyComponent={OAISRequestManagerComponent.EMPTY_COMPONENT}
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
