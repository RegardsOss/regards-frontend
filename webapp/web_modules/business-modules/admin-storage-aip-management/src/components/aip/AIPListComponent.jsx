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
import get from 'lodash/get'
import {
  Card, CardTitle, CardMedia, CardActions,
} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import AddToPhotos from 'material-ui/svg-icons/image/add-to-photos'
import PageView from 'material-ui/svg-icons/action/pageview'
import Snackbar from 'material-ui/Snackbar'
import Refresh from 'material-ui/svg-icons/navigation/refresh'
import { StorageShapes } from '@regardsoss/shape'
import {
  Breadcrumb, NoContentComponent, CardActionsComponent, TableColumnBuilder,
  TableLayout, TableHeaderLine, TableHeaderContentBox, TableHeaderOptionsArea,
  TableHeaderOptionGroup, TableHeaderLoadingComponent, TableHeaderResultsCountMessage,
} from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import AIPDetailComponent from './AIPDetailComponent'
import AIPListFiltersComponent from './AIPListFiltersComponent'
import { aipSelectors } from '../../clients/AIPClient'
import { tableSelectors, tableActions } from '../../clients/TableClient'
import InfiniteAIPTableContainer from '../../containers/aip/InfiniteAIPTableContainer'
import DeleteAIPOnAllStoragesDialogContainer from '../../containers/aip/dialog/DeleteAIPOnAllStoragesDialogContainer'
import DeleteAIPOnSomeStoragesDialogContainer from '../../containers/aip/dialog/DeleteAIPOnSomeStoragesDialogContainer'
import DeleteSelectedAIPsOnAllStoragesOptionContainer from '../../containers/aip/options/DeleteSelectedAIPsOnAllStoragesOptionContainer'
import DeleteSelectedAIPsOnSomeStoragesOptionContainer from '../../containers/aip/options/DeleteSelectedAIPsOnSomeStoragesOptionContainer'
import AIPRemoveTagDialog from './dialogs/AIPRemoveTagDialog'
import AIPAddTagDialog from './dialogs/AIPAddTagDialog'
import AIPStoreRetryOption from './options/AIPStoreRetryOption'
import AIPDetailOption from './options/AIPDetailOption'
import DeleteAIPOnAllStoragesOption from './options/DeleteAIPOnAllStoragesOption'
import DeleteAIPOnSomeStoragesOption from './options/DeleteAIPOnSomeStoragesOption'
import AIPListUpdateDateColumnRenderer from './render/AIPListUpdateDateColumnRenderer'
import AIPListNbFilesColumnRenderer from './render/AIPListNbFilesColumnRenderer'
import AIPListStateRenderer from './render/AIPListStateRenderer'
import AIPListStoragesRenderComponent from './render/AIPListStoragesRenderComponent'

/**
 * AIP list
 * @author Léo Mieulet
 */
class AIPListComponent extends React.Component {
  static propTypes = {
    // page data
    pageSize: PropTypes.number.isRequired,
    resultsCount: PropTypes.number.isRequired,
    entitiesLoading: PropTypes.bool.isRequired,
    // selection management
    isEmptySelection: PropTypes.bool.isRequired,
    // tags management
    tags: PropTypes.arrayOf(PropTypes.string),
    searchingTags: PropTypes.bool.isRequired,
    sessionTags: PropTypes.arrayOf(PropTypes.string),
    searchingSessionTags: PropTypes.bool.isRequired,
    // Filter management
    initialFilters: PropTypes.objectOf(PropTypes.string),
    currentFilters: PropTypes.objectOf(PropTypes.string),
    // contextual data
    dataStorages: PropTypes.arrayOf(StorageShapes.PrioritizedDataStorageContent),
    session: PropTypes.string.isRequired,

    // callbacks
    onGoBack: PropTypes.func.isRequired,
    onRefresh: PropTypes.func.isRequired,
    onRetryAIPStorage: PropTypes.func.isRequired,
    onApplyFilters: PropTypes.func.isRequired,
    goToAipFiles: PropTypes.func.isRequired,
    fetchCommonTags: PropTypes.func.isRequired,
    addTags: PropTypes.func.isRequired,
    removeTags: PropTypes.func.isRequired,
  }

  static defaultProps = {
    dataStorages: [],
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Possible AIP deletion modes */
  static DELETION_MODE = {
    DELETE_ON_ALL_STORAGES: 'DELETE_ON_ALL_STORAGES',
    DELETE_ON_SOME_STORAGES: 'DELETE_ON_SOME_STORAGES',
  }

  static SNACKBAR_DURATION = 7000

  state = {
    aipToView: null,
    deleteOperation: null, // current delete operation or null
    showAddTagDialog: false,
    showRemoveTagDialog: false,
    showSnackbar: false,
    snackbarMessage: '',
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
    this.props.onGoBack(index)
  }


  /**
   * Callback: user asked to delete AIP files on every storages. Show corresponding dialog.
   * @param {string} aipSelectionMode selection mode for AIP to delete (included or excluded, from TableSelectionModes)
   * @param {[*]} toggleAIPs toggled AIP list (either to include or exclude from deletion request)
   */
  onDeleteEverywhere = (aipSelectionMode, toggleAIPs) => {
    this.setState({
      deleteOperation: {
        aipDeletionMode: AIPListComponent.DELETION_MODE.DELETE_ON_ALL_STORAGES,
        aipSelectionMode,
        toggleAIPs,
      },
    })
  }

  /**
   * Callback: user asked to delete AIP files on some storages. Show corresponding dialog.
   * @param {string} aipSelectionMode selection mode for AIP to delete (included or excluded, from TableSelectionModes)
   * @param {[*]} toggleAIPs toggled AIP list (either to include or exclude from deletion request)
   */
  onDeleteOnSomeStorages = (aipSelectionMode, toggleAIPs) => {
    this.setState({
      deleteOperation: {
        aipDeletionMode: AIPListComponent.DELETION_MODE.DELETE_ON_SOME_STORAGES,
        aipSelectionMode,
        toggleAIPs,
      },
    })
  }

  /**
   * After delete request was confirmed and performed or cancelled. Hide dialog
   */
  onCloseDeleteDialog = () => {
    this.setState({
      deleteOperation: null,
    })
  }

  goToAipFiles = (entity) => {
    this.props.goToAipFiles(entity.aip.id)
  }


  onOpenAddTagDialog = () => {
    this.props.fetchCommonTags()
    this.setState({
      showAddTagDialog: true,
    })
  }

  onOpenRemoveTagDialog = () => {
    this.props.fetchCommonTags()
    this.setState({
      showRemoveTagDialog: true,
    })
  }

  handleRemoveTags = (tags) => {
    const { intl } = this.context
    this.props.removeTags(tags)
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
    this.props.addTags(tags)
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

  /**
   * User callback: retry AIP storage
   */
  onRetryAIPStorage = aip => this.props.onRetryAIPStorage(aip)

  /**
   * Renders delete dialog for current deletion context (mode and selection)
   */
  renderDeleteDialog = () => {
    const { currentFilters, onRefresh } = this.props
    const { deleteOperation } = this.state

    if (deleteOperation) {
      switch (deleteOperation.aipDeletionMode) {
        case AIPListComponent.DELETION_MODE.DELETE_ON_ALL_STORAGES:
          return (
            <DeleteAIPOnAllStoragesDialogContainer
              aipSelectionMode={deleteOperation.aipSelectionMode}
              toggleAIPs={deleteOperation.toggleAIPs}
              currentFilters={currentFilters}
              onRefresh={onRefresh}
              onClose={this.onCloseDeleteDialog}
            />)
        case AIPListComponent.DELETION_MODE.DELETE_ON_SOME_STORAGES:
          return (
            <DeleteAIPOnSomeStoragesDialogContainer
              aipSelectionMode={deleteOperation.aipSelectionMode}
              toggleAIPs={deleteOperation.toggleAIPs}
              currentFilters={currentFilters}
              onRefresh={onRefresh}
              onClose={this.onCloseDeleteDialog}
            />)
        default:
          throw new Error(`Unkown delete AIP mode ${deleteOperation.aipDeletionMode}`)
      }
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
    const { intl } = this.context
    const {
      currentFilters, pageSize, resultsCount, entitiesLoading, isEmptySelection, sessionTags,
      searchingSessionTags, dataStorages, onRefresh, onApplyFilters,
    } = this.props

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
      new TableColumnBuilder('column.label').titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(intl.formatMessage({ id: 'aips.list.table.headers.providerId' }))
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.aip.ipType')
        .label(intl.formatMessage({ id: 'aips.list.table.headers.type' }))
        .build(),
      new TableColumnBuilder('column.dataStorages').titleHeaderCell()
        .rowCellDefinition({
          Constructor: AIPListStoragesRenderComponent,
          props: { dataStorages },
        })
        .label(intl.formatMessage({ id: 'aips.list.table.headers.data.storages' }))
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
        OptionConstructor: AIPStoreRetryOption,
        optionProps: { onRetry: this.onRetryAIPStorage },
      }, {
        OptionConstructor: AIPDetailOption,
        optionProps: { onViewDetail: this.onViewAIPDetail },
      }, { // Delete on some storage
        OptionConstructor: DeleteAIPOnSomeStoragesOption,
        optionProps: {
          onDelete: this.onDeleteOnSomeStorages,
        },
      }, { // Delete on all storages
        OptionConstructor: DeleteAIPOnAllStoragesOption,
        optionProps: {
          onDelete: this.onDeleteEverywhere,
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
            onApplyFilters={onApplyFilters}
            isEmptySelection={isEmptySelection}
            openAddTagModal={this.onOpenAddTagDialog}
            openRemoveTagModal={this.onOpenRemoveTagDialog}
            sessionTags={sessionTags}
            searchingSessionTags={searchingSessionTags}
          />
          {/* Results count, loading, selection and refresh actions */}
          <TableHeaderLine>
            <TableHeaderContentBox>
              <TableHeaderResultsCountMessage count={resultsCount} isFetching={entitiesLoading} />
            </TableHeaderContentBox>
            <TableHeaderLoadingComponent loading={entitiesLoading} />
            <TableHeaderOptionsArea reducible>
              <TableHeaderOptionGroup>
                <DeleteSelectedAIPsOnSomeStoragesOptionContainer onDelete={this.onDeleteOnSomeStorages} />
                <DeleteSelectedAIPsOnAllStoragesOptionContainer onDelete={this.onDeleteEverywhere} />
              </TableHeaderOptionGroup>
              <TableHeaderOptionGroup>
                <FlatButton
                  label={intl.formatMessage({ id: 'aips.session.refresh.button' })}
                  icon={<Refresh />}
                  onClick={onRefresh}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <InfiniteAIPTableContainer
            pageSize={pageSize}
            columns={columns}
            emptyComponent={emptyComponent}
            currentFilters={currentFilters}
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
              mainButtonClick={this.props.onGoBack}
            />
          </CardActions>
        </Card>
        {this.renderAIPDetail()}
        {this.renderRemoveTagDialog()}
        {this.renderAddTagDialog()}
        {this.renderDeleteDialog()}
        {this.renderSnackbar()}
      </div>
    )
  }
}
export default AIPListComponent
