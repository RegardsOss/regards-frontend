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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import {
  Card, CardTitle, CardMedia, CardActions,
} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import HistoryIcon from 'material-ui/svg-icons/action/history'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import {
  NoContentComponent, TableColumnBuilder, TableDeleteOption, TableSimpleActionOption,
  TableLayout, TableHeaderLineLoadingAndResults, PageableInfiniteTableContainer, Breadcrumb,
  CardActionsComponent,
} from '@regardsoss/components'
import { CommonDomain } from '@regardsoss/domain'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import { tableSelectors, tableActions } from '../../clients/TableClient'
import { SIPSwitchToAIPComponent } from './SIPSwitchToAIPComponent'
import SIPListDateColumnRenderer from './SIPListDateColumnRenderer'
import SIPDetailComponent from './SIPDetailComponent'
import SIPDetailTableAction from './SIPDetailTableAction'
import SIPConfirmDeleteDialog from './SIPConfirmDeleteDialog'
import SIPListFiltersComponent from './SIPListFiltersComponent'
import SIPDeletionErrorDialog from './SIPDeletionErrorDialog'
import SIPListStateRenderer from './SIPListStateRenderer'
import SIPRetryActionRenderer from './SIPRetryActionRenderer'
import { sipActions, sipSelectors } from '../../clients/SIPClient'
import messages from '../../i18n'
import styles from '../../styles'

/**
 * SIP list
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
class SIPListComponent extends React.Component {
  static propTypes = {
    session: PropTypes.string,
    sip: PropTypes.string, // Not mandatory. If a SIP is set (providerId) then display only SIPs with the same providerId
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    onGoToAIP: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onDeleteBySipId: PropTypes.func.isRequired,
    onDeleteByProviderId: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,
    goToSipHistory: PropTypes.func.isRequired,
    goToSessionAIPsMonitoring: PropTypes.func.isRequired,
    goToDataSourcesMonitoring: PropTypes.func.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    contextFilters: PropTypes.objectOf(PropTypes.string),
    // selection management
    isEmptySelection: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static SORTABLE_COLUMNS = {
    PROVIDER_ID: 'column.providerId',
    TYPE: 'column.type',
    STATE: 'column.state',
    ACTIVE: 'column.active',
    VERSION: 'column.version',
  }

  /**
   * Convert column id to query corresponding names
   */
  static COLUMN_KEY_TO_QUERY = {
    'column.providerId': 'providerId',
    'column.type': 'type',
    'column.state': 'state',
    'column.active': 'ingestDate',
    'column.version': 'version',
  }

  /**
   * Convert column order to request parameters value
   */
  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  /**
   * Converts columns order and filters state into request parameters
   * @param {[{columnKey: string, order: string}]} columnsSorting columns sorting definition, where order is a
   * @param {*} applyingFiltersState filters state from component state
   * @returns {*} requestParameters as an object compound of string and string arrays
   */
  static buildRequestParameters(columnsSorting, appliedFilters) {
    const requestParameters = {
      sort: columnsSorting.map(({ columnKey, order }) => `${SIPListComponent.COLUMN_KEY_TO_QUERY[columnKey]},${SIPListComponent.COLUMN_ORDER_TO_QUERY[order]}`),
      ...appliedFilters,
    }
    return requestParameters
  }

  static getColumnSortingData(columnsSorting, columnKey) {
    const foundColumnIndex = columnsSorting.findIndex(({ columnKey: localColumnKey }) => localColumnKey === columnKey)
    return foundColumnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[foundColumnIndex].order, foundColumnIndex]
  }

  state = {
    appliedFilters: {},
    sipToView: null,
    sipToDelete: null,
    deletionErrors: [],
    requestParameters: SIPListComponent.buildRequestParameters([], this.props.contextFilters),
    columnsSorting: [],
  }

  componentWillMount() {
    this.setState({
      appliedFilters: this.props.contextFilters,
    })
  }

  componentWillReceiveProps(nextProps) {
    const { contextFilters } = this.props

    if (!isEqual(nextProps.contextFilters, contextFilters)) {
      this.setState({
        appliedFilters: nextProps.contextFilters,
      })
    }
  }

  onStateUpdated = (stateDiff) => {
    const nextState = { ...this.state, ...stateDiff }
    nextState.requestParameters = SIPListComponent.buildRequestParameters(nextState.columnsSorting, nextState.appliedFilters)
    this.setState(nextState)
  }

  /**
   * User cb: Manage column sorting
   */
  onSort = (columnKey, order) => {
    const { columnsSorting } = this.state
    const newOrder = columnsSorting
    const columnIndex = newOrder.findIndex(columnArray => columnArray.columnKey === columnKey)
    if (order === CommonDomain.SORT_ORDERS_ENUM.NO_SORT) {
      newOrder.splice(columnIndex, 1)
    } else if (columnIndex === -1) {
      newOrder.push({ columnKey, order })
    } else {
      newOrder.splice(columnIndex, 1)
      newOrder.push({ columnKey, order })
    }
    this.onStateUpdated({ columnsSorting: newOrder })
  }

  applyFilters = (filters) => {
    const { contextFilters } = this.props
    const appliedFilters = { ...filters, ...contextFilters }
    this.onStateUpdated({ appliedFilters })
  }

  onCloseDetails = () => {
    this.setState({
      sipToView: null,
    })
  }

  onViewSIPDetail = (sipToView) => {
    this.setState({
      sipToView: sipToView || null,
    })
  }

  onBreadcrumbAction = (element, index) => {
    this.props.onBack(index)
  }

  onConfirmDeleteSIP = () => {
    this.onConfirmDelete(this.props.onDeleteBySipId)
  }

  onConfirmDeleteSIPs = () => {
    this.onConfirmDelete(this.props.onDeleteByProviderId)
  }

  onConfirmDelete = (deleteAction) => {
    this.closeDeleteDialog()
    const { sipToDelete, appliedFilters } = this.state
    if (sipToDelete) {
      const providerId = get(this.state, 'sipToDelete.content.providerId', '')
      const { intl: { formatMessage } } = this.context
      deleteAction(sipToDelete.content).then((actionResult) => {
        if (actionResult.error) {
          const errors = []
          errors.push({
            providerId,
            reason: formatMessage({ id: 'oais.sip.delete.error.title' }, { id: providerId }),
          })
          this.displayDeletionErrors(providerId, errors)
        } else {
          // Display error dialogs if errors are raised by the service.
          // A 200 OK response is sent by the backend. So we check errors into the response payload.
          this.displayDeletionErrors(providerId, get(actionResult, 'payload', []))
          // Refresh view
          this.props.onRefresh(appliedFilters)
        }
      })
    }
  }

  onDelete = (sipToDelete) => { // note: we ignore here the table callback (refresh will be performed locally)
    this.setState({
      sipToDelete,
    })
  }

  onCloseDeletionErrorDialog = () => {
    this.setState({
      deletionErrors: [],
      deletionErrorsId: null,
    })
  }

  closeDeleteDialog = () => {
    this.setState({
      sipToDelete: null,
    })
  }

  displayDeletionErrors = (providerId, rejectedSips) => {
    this.setState({
      deletionErrorsId: providerId,
      deletionErrors: map(rejectedSips, rejectedSip => `${rejectedSip.providerId} : ${rejectedSip.reason}`),
    })
  }

  goToSipHistory = (entity, index) => {
    this.props.goToSipHistory(entity.content.providerId)
  }


  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  handleRetry = sip => this.props.onRetry(sip, this.state.appliedFilters)

  renderDeleteConfirmDialog = () => {
    const { sipToDelete } = this.state
    if (sipToDelete) {
      return (
        <SIPConfirmDeleteDialog
          providerId={sipToDelete.content.providerId}
          onDeleteSip={this.onConfirmDeleteSIP}
          onDeleteSips={this.onConfirmDeleteSIPs}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  renderTable = () => {
    const { intl, muiTheme } = this.context
    const { sip } = this.props
    const {
      pageSize, resultsCount, initialFilters, chains, entitiesLoading, goToSessionAIPsMonitoring, session,
      goToDataSourcesMonitoring, isEmptySelection,
    } = this.props
    const { columnsSorting } = this.state
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'oais.sips.listempty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      new TableColumnBuilder()
        .selectionColumn(true, sipSelectors, tableActions, tableSelectors)
        .build(),
      // id column
      new TableColumnBuilder(SIPListComponent.SORTABLE_COLUMNS.PROVIDER_ID).titleHeaderCell().propertyRenderCell('content.providerId')
        .label(intl.formatMessage({ id: 'oais.sips.listtable.headers.providerId' }))
        .sortableHeaderCell(...SIPListComponent.getColumnSortingData(columnsSorting, SIPListComponent.SORTABLE_COLUMNS.PROVIDER_ID), this.onSort)
        .build(),
      new TableColumnBuilder(SIPListComponent.SORTABLE_COLUMNS.TYPE).titleHeaderCell().propertyRenderCell('content.sip.ipType')
        .label(intl.formatMessage({ id: 'oais.sips.listtable.headers.type' }))
        .build(),
      new TableColumnBuilder(SIPListComponent.SORTABLE_COLUMNS.STATE).titleHeaderCell()
        .rowCellDefinition({
          Constructor: SIPListStateRenderer,
          props: {
            goToSessionAIPsMonitoring,
            goToDataSourcesMonitoring,
            session,
          },
        })
        .label(intl.formatMessage({ id: 'oais.sips.listtable.headers.state' }))
        .sortableHeaderCell(...SIPListComponent.getColumnSortingData(columnsSorting, SIPListComponent.SORTABLE_COLUMNS.STATE), this.onSort)
        .build(),
      new TableColumnBuilder(SIPListComponent.SORTABLE_COLUMNS.ACTIVE).titleHeaderCell()
        .rowCellDefinition({ Constructor: SIPListDateColumnRenderer })
        .label(intl.formatMessage({ id: 'oais.sips.listtable.headers.date' }))
        .sortableHeaderCell(...SIPListComponent.getColumnSortingData(columnsSorting, SIPListComponent.SORTABLE_COLUMNS.ACTIVE), this.onSort)
        .build(),
      new TableColumnBuilder(SIPListComponent.SORTABLE_COLUMNS.VERSION).titleHeaderCell().propertyRenderCell('content.version')
        .label(intl.formatMessage({ id: 'oais.sips.listtable.headers.version' }))
        .sortableHeaderCell(...SIPListComponent.getColumnSortingData(columnsSorting, SIPListComponent.SORTABLE_COLUMNS.VERSION), this.onSort)
        .build(),
      new TableColumnBuilder().optionsColumn(sip ? [{ // sip detail options
        OptionConstructor: SIPDetailTableAction,
        optionProps: { onViewDetail: this.onViewSIPDetail },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          handleHateoas: true,
          disableInsteadOfHide: true,
          fetchPage: this.props.fetchPage,
          onDelete: this.onDelete, // note: this will not be used (refresh is handled locally)
          queryPageSize: 20,
        },
      }] : [{ // sip list options
        OptionConstructor: SIPRetryActionRenderer,
        optionProps: { onRetry: this.handleRetry },
      }, {
        OptionConstructor: TableSimpleActionOption,
        optionProps: {
          onAction: this.goToSipHistory,
          icon: HistoryIcon,
          title: intl.formatMessage({ id: 'oais.sips.listsip-history.title' }),
        },
      }, {
        OptionConstructor: SIPDetailTableAction,
        optionProps: { onViewDetail: this.onViewSIPDetail },
      }, {
        OptionConstructor: TableDeleteOption,
        optionProps: {
          handleHateoas: true,
          disableInsteadOfHide: true,
          fetchPage: this.props.fetchPage, // note: this will not be used (refresh is handled locally)
          onDelete: this.onDelete,
          queryPageSize: 20,
        },
      }])
        .build(),
    ]

    return (
      <CardMedia>
        <TableLayout>
          <SIPListFiltersComponent
            key={this.props.sip ? 'sip-history' : 'session-sips'}
            initialFilters={!this.props.sip ? initialFilters : null}
            applyFilters={this.applyFilters}
            handleRefresh={this.handleRefresh}
            chains={chains}
            emptyComponent={emptyComponent}
            isEmptySelection={isEmptySelection}
          />
          <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="sip-management-session-table"
            pageActions={sipActions}
            pageSelectors={sipSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={this.state.requestParameters}
          />
        </TableLayout>
      </CardMedia>
    )
  }


  renderSIPDetail = () => {
    const { intl } = this.context
    if (!this.state.sipToView) {
      return null
    }
    return (
      <Dialog
        title={intl.formatMessage({ id: 'oais.sips.listsip-details.title' })}
        open
        onRequestClose={this.handlesipToView}
      >
        <SIPDetailComponent
          sip={this.state.sipToView}
          onClose={this.onCloseDetails}
        />
      </Dialog>
    )
  }

  renderBreadCrump = () => {
    const { sip } = this.props
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'oais.session.title' })]
    if (sip) {
      elements.push(sip)
    }
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={this.onBreadcrumbAction}
      />
    )
  }

  render() {
    const { intl } = this.context
    const { onGoToAIP } = this.props
    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrump()}
          />
          <SIPSwitchToAIPComponent
            onGoToAIP={onGoToAIP}
          />
          {this.renderTable()}
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'oais.sips.session.button.back' })}
              mainButtonClick={this.props.onBack}
            />
          </CardActions>
        </Card>
        {this.renderSIPDetail()}
        {this.renderDeleteConfirmDialog()}
        <SIPDeletionErrorDialog
          providerId={this.state.deletionErrorsId}
          errors={this.state.deletionErrors}
          onClose={this.onCloseDeletionErrorDialog}
        />
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(SIPListComponent))
