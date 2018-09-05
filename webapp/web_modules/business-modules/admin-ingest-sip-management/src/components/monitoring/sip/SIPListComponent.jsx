/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import SIPListDateColumnRenderer from './SIPListDateColumnRenderer'
import SIPDetailComponent from './SIPDetailComponent'
import SIPDetailTableAction from './SIPDetailTableAction'
import SIPConfirmDeleteDialog from './SIPConfirmDeleteDialog'
import SIPListFiltersComponent from './SIPListFiltersComponent'
import SIPDeletionErrorDialog from './SIPDeletionErrorDialog'
import SIPListStateRenderer from './SIPListStateRenderer'
import { sipActions, sipSelectors } from '../../../clients/SIPClient'
import messages from '../../../i18n'
import styles from '../../../styles'

/**
 * SIP list
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
class SIPListComponent extends React.Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    sip: PropTypes.string, // Not mandatory. If a SIP is set (providerId) then display only SIPs with the same providerId
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    onBack: PropTypes.func.isRequired,
    chains: IngestShapes.IngestProcessingChainList.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onDeleteBySipId: PropTypes.func.isRequired,
    onDeleteByProviderId: PropTypes.func.isRequired,
    goToSipHistory: PropTypes.func.isRequired,
    goToSessionAIPsMonitoring: PropTypes.func.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    contextFilters: PropTypes.objectOf(PropTypes.string),
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    appliedFilters: {},
    sipToView: null,
    sipToDelete: null,
    deletionErrors: [],
  }

  componentWillMount() {
    this.setState({
      appliedFilters: this.props.contextFilters,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.contextFilters, this.props.contextFilters)) {
      this.setState({
        appliedFilters: nextProps.contextFilters,
      })
    }
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
            reason: formatMessage({ id: 'sip.delete.error.title' }, { id: providerId }),
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

  applyFilters = (filters) => {
    const { contextFilters } = this.props
    const appliedFilters = { ...filters, ...contextFilters }
    this.setState({ appliedFilters })
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
    } = this.props
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'sips.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      // id column
      new TableColumnBuilder('column.providerId').titleHeaderCell().propertyRenderCell('content.providerId')
        .label(intl.formatMessage({ id: 'sips.list.table.headers.providerId' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.sip.ipType')
        .label(intl.formatMessage({ id: 'sips.list.table.headers.type' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell()
        .rowCellDefinition({
          Constructor: SIPListStateRenderer,
          props: {
            goToSessionAIPsMonitoring,
            session,
          },
        })
        .label(intl.formatMessage({ id: 'sips.list.table.headers.state' }))
        .build(),
      new TableColumnBuilder('column.active').titleHeaderCell()
        .rowCellDefinition({ Constructor: SIPListDateColumnRenderer })
        .label(intl.formatMessage({ id: 'sips.list.table.headers.date' }))
        .build(),
      new TableColumnBuilder('column.version').titleHeaderCell().propertyRenderCell('content.version')
        .label(intl.formatMessage({ id: 'sips.list.table.headers.version' }))
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
        OptionConstructor: TableSimpleActionOption,
        optionProps: {
          onAction: this.goToSipHistory,
          icon: HistoryIcon,
          title: intl.formatMessage({ id: 'sips.list.sip-history.title' }),
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
            requestParams={this.state.appliedFilters}
            emptyComponent={emptyComponent}
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
        title={intl.formatMessage({ id: 'sips.list.sip-details.title' })}
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
    const { session, sip } = this.props
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'sips.session.title' }), formatMessage({ id: 'sips.session.sips.title' }, { session })]
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

    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrump()}
            subtitle={intl.formatMessage({ id: 'sips.list.subtitle' })}
          />
          {this.renderTable()}
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'sips.session.button.back' })}
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
