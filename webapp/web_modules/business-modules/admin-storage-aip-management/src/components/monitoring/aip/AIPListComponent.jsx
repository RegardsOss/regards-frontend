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
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import Snackbar from 'material-ui/Snackbar'
import {
  NoContentComponent, TableColumnBuilder, TableDeleteOption,
  TableLayout, TableHeaderLineLoadingAndResults, PageableInfiniteTableContainer, Breadcrumb,
  CardActionsComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import AIPListUpdateDateColumnRenderer from './AIPListUpdateDateColumnRenderer'
import AIPDetailComponent from './AIPDetailComponent'
import AIPDetailTableActionRenderer from './AIPDetailTableActionRenderer'
import AIPConfirmDeleteDialog from './AIPConfirmDeleteDialog'
import AIPListFiltersComponent from './AIPListFiltersComponent'
import AIPDeletionErrorDialog from './AIPDeletionErrorDialog'
import { aipActions, aipSelectors } from '../../../clients/AIPClient'
import { tableSelectors, tableActions } from '../../../clients/TableClient'
import messages from '../../../i18n'
import styles from '../../../styles'
import AIPListNbFilesColumnRenderer from './AIPListNbFilesColumnRenderer'
import AIPRemoveTagDialog from './AIPRemoveTagDialog'
import AIPAddTagDialog from './AIPAddTagDialog'
import AIPListStateRenderer from './AIPListStateRenderer'
import AIPStoreRetryActionRenderer from './AIPStoreRetryActionRenderer'

/**
 * AIP list
 * @author Léo Mieulet
 */
class AIPListComponent extends React.Component {
  static propTypes = {
    session: PropTypes.string.isRequired,
    isEmptySelection: PropTypes.bool.isRequired,
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    initialFilters: PropTypes.objectOf(PropTypes.string),
    contextFilters: PropTypes.objectOf(PropTypes.string),
    tags: PropTypes.arrayOf(PropTypes.string),
    searchingTags: PropTypes.bool.isRequired,
    sessionTags: PropTypes.arrayOf(PropTypes.string),
    searchingSessionTags: PropTypes.bool.isRequired,

    entitiesLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onDeleteByIpId: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,
    goToAipFiles: PropTypes.func.isRequired,
    fetchCommonTags: PropTypes.func.isRequired,
    addTags: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static SNACKBAR_DURATION = 7000

  state = {
    appliedFilters: {},
    aipToView: null,
    aipToDelete: null,
    deletionErrors: [],
    showAddTagDialog: false,
    showRemoveTagDialog: false,
    showSnackbar: false,
    snackbarMessage: '',
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
      aipToView: null,
    })
  }

  onCloseAddTags = () => {
    this.setState({
      showAddTagDialog: false,
    })
  }

  onCloseRemoveTags = () => {
    this.setState({
      showRemoveTagDialog: false,
    })
  }


  onViewAIPDetail = (aipToView) => {
    this.setState({
      aipToView: aipToView || null,
    })
  }

  onBreadcrumbAction = (element, index) => {
    this.props.onBack(index)
  }

  onConfirmDeleteAIP = () => {
    this.onConfirmDelete(this.props.onDeleteByIpId)
  }

  onConfirmDelete = (deleteAction) => {
    this.closeDeleteDialog()
    const { aipToDelete, appliedFilters } = this.state
    if (aipToDelete) {
      const aipId = get(this.state, 'aipToDelete.content.aipId', '')
      const { intl: { formatMessage } } = this.context
      deleteAction(aipToDelete.content).then((actionResult) => {
        if (actionResult.error) {
          const errors = []
          errors.push({
            aipId,
            reason: formatMessage({ id: 'aip.delete.error.title' }, { id: aipId }),
          })
          this.displayDeletionErrors(aipId, errors)
        } else {
          // Display error dialogs if errors are raised by the service.
          // A 200 OK response is sent by the backend. So we check errors into the response payload.
          this.displayDeletionErrors(aipId, get(actionResult, 'payload', []))
          // Refresh view
          this.props.onRefresh(appliedFilters)
        }
      })
    }
  }

  onDelete = (aipToDelete) => { // note: we ignore here the table callback (refresh will be performed locally)
    this.setState({
      aipToDelete,
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
      aipToDelete: null,
    })
  }

  displayDeletionErrors = (aipId, rejectedAips) => {
    this.setState({
      deletionErrorsId: aipId,
      deletionErrors: map(rejectedAips, rejectedAip => `${rejectedAip.aipId} : ${rejectedAip.reason}`),
    })
  }

  goToAipFiles = (entity) => {
    this.props.goToAipFiles(entity.id)
  }


  handleRefresh = () => this.props.onRefresh(this.state.appliedFilters)

  handleOpenAddTagDialog = () => {
    this.props.fetchCommonTags(this.state.appliedFilters)
    this.setState({
      showAddTagDialog: true,
    })
  }

  handleOpenRemoveTagDialog = () => {
    this.props.fetchCommonTags(this.state.appliedFilters)
    this.setState({
      showRemoveTagDialog: true,
    })
  }

  handleRemoveTags = (tags) => {
    const { intl } = this.context
    this.props.removeTags(this.state.appliedFilters, tags)
      .then((actionResult) => {
        if (get(actionResult, 'meta.status', 400) === 200) {
          this.onCloseRemoveTags()
          this.setState({
            showSnackbar: true,
            snackbarMessage: intl.formatMessage({ id: 'aips.list.snackbar.job-remove-tag' }),
          })
        } else if (get(actionResult, 'meta.status', 400) === 409) {
          this.setState({
            showSnackbar: true,
            snackbarMessage: intl.formatMessage({ id: 'aips.list.snackbar.job-failed' }),
          })
        } else {
          this.setState({
            showSnackbar: true,
            snackbarMessage: intl.formatMessage({ id: 'aips.list.snackbar.job-remove-tag-failed' }),
          })
        }
      })
  }

  handleAddTags = (tags) => {
    const { intl } = this.context
    this.props.addTags(this.state.appliedFilters, tags)
      .then((actionResult) => {
        if (get(actionResult, 'meta.status', 400) === 200) {
          this.onCloseAddTags()
          this.setState({
            showSnackbar: true,
            snackbarMessage: intl.formatMessage({ id: 'aips.list.snackbar.job-add-tag' }),
          })
        } else if (get(actionResult, 'meta.status', 400) === 409) {
          this.setState({
            showSnackbar: true,
            snackbarMessage: intl.formatMessage({ id: 'aips.list.snackbar.job-failed' }),
          })
        } else {
          this.setState({
            showSnackbar: true,
            snackbarMessage: intl.formatMessage({ id: 'aips.list.snackbar.job-add-tag-failed' }),
          })
        }
      })
  }

  handleSnackbarClose = () => {
    this.setState({
      showSnackbar: false,
      snackbarMessage: '',
    })
  }

  renderDeleteConfirmDialog = () => {
    const { aipToDelete } = this.state
    if (aipToDelete) {
      return (
        <AIPConfirmDeleteDialog
          aipId={aipToDelete.content.id}
          onDeleteAip={this.onConfirmDeleteAIP}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }


  renderAddTagDialog = () => {
    const { showAddTagDialog } = this.state
    const { tags, searchingTags } = this.props
    if (showAddTagDialog) {
      return (
        <AIPAddTagDialog
          onClose={this.onCloseAddTags}
          tags={tags}
          searchingTags={searchingTags}
          onSubmit={this.handleAddTags}
        />
      )
    }
    return null
  }


  renderRemoveTagDialog = () => {
    const { showRemoveTagDialog } = this.state
    const { tags, searchingTags } = this.props
    if (showRemoveTagDialog) {
      return (
        <AIPRemoveTagDialog
          onClose={this.onCloseRemoveTags}
          tags={tags}
          searchingTags={searchingTags}
          onSubmit={this.handleRemoveTags}
        />
      )
    }
    return null
  }


  renderTable = () => {
    const { intl, muiTheme } = this.context
    const {
      pageSize, resultsCount, entitiesLoading, isEmptySelection, sessionTags, searchingSessionTags,
      onRetry,
    } = this.props
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable

    const emptyComponent = (
      <NoContentComponent
        title={intl.formatMessage({ id: 'aips.list.empty.title' })}
        Icon={AddToPhotos}
      />
    )

    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, tableActions, tableSelectors)
        .build(),
      new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.providerId')
        .label(intl.formatMessage({ id: 'aips.list.table.headers.providerId' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.ipType')
        .label(intl.formatMessage({ id: 'aips.list.table.headers.type' }))
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell()
        .rowCellDefinition({
          Constructor: AIPListStateRenderer,
          props: {
            goToAipFiles: this.goToAipFiles,
          },
        })
        .label(intl.formatMessage({ id: 'aips.list.table.headers.state' }))
        .build(),
      new TableColumnBuilder('column.lastUpdate').titleHeaderCell()
        .rowCellDefinition({ Constructor: AIPListUpdateDateColumnRenderer })
        .label(intl.formatMessage({ id: 'aips.list.table.headers.lastUpdate' }))
        .build(),

      new TableColumnBuilder('column.nbFiles').titleHeaderCell()
        .propertyRenderCell('content', AIPListNbFilesColumnRenderer, {
          handleClick: this.goToAipFiles,
        })
        .label(intl.formatMessage({ id: 'aips.list.table.headers.nbFiles' }))
        .build(),
      new TableColumnBuilder().optionsColumn([{
        OptionConstructor: AIPStoreRetryActionRenderer,
        optionProps: { onRetry },
      }, {
        OptionConstructor: AIPDetailTableActionRenderer,
        optionProps: { onViewDetail: this.onViewAIPDetail },
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
          <AIPListFiltersComponent
            key="session-aips"
            initialFilters={this.props.initialFilters}
            applyFilters={this.applyFilters}
            isEmptySelection={isEmptySelection}
            handleRefresh={this.handleRefresh}
            openAddTagModal={this.handleOpenAddTagDialog}
            openRemoveTagModal={this.handleOpenRemoveTagDialog}
            sessionTags={sessionTags}
            searchingSessionTags={searchingSessionTags}
          />
          <TableHeaderLineLoadingAndResults isFetching={entitiesLoading} resultsCount={resultsCount} />
          <PageableInfiniteTableContainer
            name="aip-management-session-table"
            pageActions={aipActions}
            pageSelectors={aipSelectors}
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


  renderAIPDetail = () => {
    const { intl } = this.context
    if (!this.state.aipToView) {
      return null
    }
    return (
      <Dialog
        title={intl.formatMessage({ id: 'aips.list.aip-details.title' })}
        open
        onRequestClose={this.handleaipToView}
      >
        <AIPDetailComponent
          aip={this.state.aipToView}
          onClose={this.onCloseDetails}
        />
      </Dialog>
    )
  }

  renderBreadCrump = () => {
    const { session } = this.props
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'aips.session.title' }), formatMessage({ id: 'aips.session.aips.title' }, { session })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={this.onBreadcrumbAction}
      />
    )
  }

  renderSnackbar = () => this.state.showSnackbar ? (
    <Snackbar
      open
      message={this.state.snackbarMessage}
      autoHideDuration={AIPListComponent.SNACKBAR_DURATION}
      onRequestClose={this.handleSnackbarClose}
    />
  ) : null

  render() {
    const { intl } = this.context

    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrump()}
            subtitle={intl.formatMessage({ id: 'aips.list.subtitle' })}
          />
          {this.renderTable()}
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={intl.formatMessage({ id: 'aips.session.button.back' })}
              mainButtonClick={this.props.onBack}
            />
          </CardActions>
        </Card>
        {this.renderAIPDetail()}
        {this.renderRemoveTagDialog()}
        {this.renderAddTagDialog()}
        {this.renderDeleteConfirmDialog()}
        {this.renderSnackbar()}
        <AIPDeletionErrorDialog
          aipId={this.state.deletionErrorsId}
          errors={this.state.deletionErrors}
          onClose={this.onCloseDeletionErrorDialog}
        />
      </div>
    )
  }
}
export default withModuleStyle(styles)(withI18n(messages)(AIPListComponent))
