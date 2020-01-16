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
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableSelectionModes,
  DateValueRender, NoContentComponent,
} from '@regardsoss/components'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import FlatButton from 'material-ui/FlatButton'
import Filter from 'mdi-material-ui/Filter'
import { CommonDomain, DamDomain, IngestDomain } from '@regardsoss/domain'
import Dialog from 'material-ui/Dialog'
import { IngestShapes } from '@regardsoss/shape'
import { aipActions, aipSelectors } from '../../clients/AIPClient'
import messages from '../../i18n'
import styles from '../../styles'
import { aipTableSelectors, aipTableActions } from '../../clients/AIPTableClient'
import StorageArrayRender from './StorageArrayRender'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'
import AIPHistoryOption from './AIPHistoryOption'
import AIPDetailOption from './AIPDetailOption'
import AIPModifyOption from './AIPModifyOption'
import AIPDeleteOption from './AIPDeleteOption'
import AIPDetailComponent from './AIPDetailComponent'
import AIPModifyDialogContainer from '../../containers/packages/AIPModifyDialogContainer'
import AIPDeleteDialog from './AIPDeleteDialog'
import SIPDetailContainer from '../../containers/packages/SIPDetailContainer'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
export class OAISPackageManagerComponent extends React.Component {
  static propTypes = {
    updateStateFromFeatureManagerFilters: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    productFilters: OAISCriterionShape,
    storages: PropTypes.arrayOf(PropTypes.string),
    // onRefresh: PropTypes.func.isRequired,
    deleteAips: PropTypes.func.isRequired,
    modifyAips: PropTypes.func.isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.AIPEntity),
    selectionMode: PropTypes.string.isRequired,
    // fetchSip: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="oais.packages.empty.results"
    Icon={NoContentIcon}
  />

  static DELETION_SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static COLUMN_KEYS = {
    PROVIDER_ID: 'providerId',
    STATE: 'state',
    LASTUPDATE: 'lastUpdate',
    VERSION: 'version',
    STORAGES: 'storages',
    TYPE: 'type',
    ACTIONS: 'actions',
  }

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  static buildContextRequestBody(appliedFilters) {
    const {
      sessionOwner, session, providerId, from, to, type, state, storage,
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
      contextRequestBodyParameters = { ...contextRequestBodyParameters, lastUpdate: { ...contextRequestBodyParameters.lastUpdate, from } }
    }
    if (to) {
      contextRequestBodyParameters = { ...contextRequestBodyParameters, lastUpdate: { ...contextRequestBodyParameters.lastUpdate, to } }
    }
    if (type) {
      contextRequestBodyParameters.ipType = type
    }
    if (state) {
      contextRequestBodyParameters.state = state
    }
    if (storage) {
      contextRequestBodyParameters.storages = [storage]
    }
    return contextRequestBodyParameters
  }

  state = {
    contextRequestBodyParameters: {},
    contextRequestURLParameters: {},
    appliedFilters: {},
    columnsSorting: [],
    aipToView: null,
    aipToFetchSipFrom: null,
    deletionPayload: {},
    // deletionErrors: [],
    // modifySelection: [],
    isDeleteDialogOpened: false,
    isDeleteSelectionDialogOpened: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => {
    this.onRequestStateUpdated(this.props.featureManagerFilters, this.props.productFilters || {}, this.state.contextRequestURLParameters)
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
      this.onRequestStateUpdated(newProps.featureManagerFilters, this.state.appliedFilters, this.state.contextRequestURLParameters)
    }
  }

  onRequestStateUpdated = (featureManagerFilters, appliedFilters, contextRequestURLParameters) => {
    this.setState({
      contextRequestURLParameters,
      appliedFilters,
      contextRequestBodyParameters: OAISPackageManagerComponent.buildContextRequestBody({ ...featureManagerFilters, ...appliedFilters }),
    })
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  buildSortURL = columnsSorting => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${OAISPackageManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`)

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
    this.onRequestStateUpdated(this.props.featureManagerFilters, newAppliedFilters, this.state.contextRequestURLParameters)
  }

  changeStateFilter = (event, index, values) => {
    this.onFilterUpdated({ state: values })
  }

  changeTypeFilter = (event, index, values) => {
    this.onFilterUpdated({ type: values })
  }

  changeStorageFilter = (event, index, values) => {
    this.onFilterUpdated({ storage: values })
  }

  onViewAIPHistory = (entity) => {
    const { updateStateFromFeatureManagerFilters } = this.props
    updateStateFromFeatureManagerFilters({ providerId: entity.content.providerId })
  }

  onViewAIPDetail = (aipToView) => {
    this.setState({
      aipToView: aipToView || null,
    })
  }

  onViewSIPDetail = (aipToFetchSipFrom) => {
    this.setState({
      aipToFetchSipFrom: aipToFetchSipFrom || null,
    })
  }

  onCloseAIPDetail = () => {
    this.setState({
      aipToView: null,
    })
  }

  onCloseSIPDetail = () => {
    this.setState({
      aipToFetchSipFrom: null,
    })
  }

  renderAIPDetail = () => {
    const { intl: { formatMessage } } = this.context
    const { aipToView } = this.state
    if (aipToView) {
      return (
        <Dialog
          title={formatMessage({ id: 'oais.aips.list.aip-details.title' })}
          open
        >
          <AIPDetailComponent
            aip={aipToView}
            onClose={this.onCloseAIPDetail}
          />
        </Dialog>
      )
    }
    return null
  }

  renderSIPDetail = () => {
    const { aipToFetchSipFrom } = this.state
    if (aipToFetchSipFrom) {
      return (
        <SIPDetailContainer
          sipId={aipToFetchSipFrom.content.aip.sipId}
          onClose={this.onCloseSIPDetail}
        />
      )
    }
    return null
  }

  onConfirmDelete = (deletionMode) => {
    this.onCloseDeleteDialog()
    this.onCloseDeleteSelectionDialog()
    const { deletionPayload, tableRequestParameters } = this.state
    const { deleteAips } = this.props
    const finalDeletionPayload = {
      ...tableRequestParameters,
      ...deletionPayload,
      deletionMode,
    }
    deleteAips(finalDeletionPayload).then((actionResult) => {
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

  onDelete = (aipToDelete) => { // note: we ignore here the table callback (refresh will be performed locally)
    this.setState({
      isDeleteDialogOpened: true,
      deletionPayload: {
        selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
        aipIds: [
          aipToDelete.content.aipId,
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
        <AIPDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteDialog}
        />
      )
    }
    return null
  }

  onDeleteSelection = () => {
    const { tableSelection, selectionMode } = this.props

    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
            aipIds: map(tableSelection, entity => entity.content.sip.sipId),
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
            aipIds: map(tableSelection, entity => entity.content.sip.sipId),
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
        <AIPDeleteDialog
          onConfirmDelete={this.onConfirmDelete}
          onClose={this.onCloseDeleteSelectionDialog}
        />
      )
    }
    return null
  }

  onConfirmModify = (modifyParameters) => {
    this.onCloseModifyDialog()
    this.onCloseModifySelectionDialog()
    const { contextRequestBodyParameters, modifyPayload } = this.state
    const { modifyAips } = this.props
    const finalModifyPayload = {
      addTags: modifyParameters.tags.toAdd,
      removeTags: modifyParameters.tags.toDelete,
      addCategories: modifyParameters.categories.toAdd,
      removeCategories: modifyParameters.categories.toDelete,
      removeStorages: modifyParameters.storages.toDelete,
      criteria: { ...modifyPayload, ...contextRequestBodyParameters },
    }
    modifyAips(finalModifyPayload).then((actionResult) => {
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

  onModify = (aipToModify) => {
    this.setState({
      isModifyDialogOpened: true,
      modifyPayload: {
        selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
        aipIds: [
          aipToModify.content.aipId,
        ],
      },
    })
  }

  onCloseModifyDialog = () => {
    this.setState({
      isModifyDialogOpened: false,
    })
  }

  renderModifyDialog = () => {
    if (this.state.isModifyDialogOpened) {
      return (
        <AIPModifyDialogContainer
          onConfirmModify={this.onConfirmModify}
          contextRequestBodyParameters={this.state.contextRequestBodyParameters}
          onClose={this.onCloseModifyDialog}
        />
      )
    }
    return null
  }

  onModifySelection = () => {
    const { tableSelection, selectionMode } = this.props

    switch (selectionMode) {
      case TableSelectionModes.includeSelected:
        this.setState({
          isModifySelectionDialogOpened: true,
          modifyPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
            aipIds: map(tableSelection, entity => entity.content.aip.sipId),
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isModifySelectionDialogOpened: true,
          modifyPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
            aipIds: map(tableSelection, entity => entity.content.aipId),
          },
        })
        break
      default:
        break
    }
  }

  onCloseModifySelectionDialog = () => {
    this.setState({
      isModifySelectionDialogOpened: false,
    })
  }

  renderModifySelectionDialog = () => {
    const { isModifySelectionDialogOpened } = this.state

    if (isModifySelectionDialogOpened) {
      return (
        <AIPModifyDialogContainer
          onConfirmModify={this.onConfirmModify}
          contextRequestBodyParameters={this.state.contextRequestBodyParameters}
          onClose={this.onCloseModifySelectionDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { pageSize, storages, tableSelection } = this.props
    const {
      appliedFilters, contextRequestURLParameters, contextRequestBodyParameters,
    } = this.state
    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, aipTableActions, aipTableSelectors)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.PROVIDER_ID).titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.PROVIDER_ID), this.onSort)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.TYPE).titleHeaderCell().propertyRenderCell('content.aip.ipType')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.STATE).titleHeaderCell().propertyRenderCell('content.state')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.STATE), this.onSort)
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.LASTUPDATE).titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.LASTUPDATE), this.onSort)
        .fixedSizing(200)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.VERSION).titleHeaderCell().propertyRenderCell('content.aip.version')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.version' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.VERSION), this.onSort)
        .fixedSizing(100)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.STORAGES).titleHeaderCell().propertyRenderCell('content.storages', StorageArrayRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.data.storages' }))
        .fixedSizing(300)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.ACTIONS).titleHeaderCell()
        .label(formatMessage({ id: 'oais.packages.list.filters.actions' }))
        .optionsColumn([{
          OptionConstructor: AIPHistoryOption,
          optionProps: { onViewAIPHistory: this.onViewAIPHistory },
        }, {
          OptionConstructor: AIPDetailOption,
          optionProps: {
            onViewAIPDetail: this.onViewAIPDetail,
            onViewSIPDetail: this.onViewSIPDetail,
          },
        }, {
          OptionConstructor: AIPModifyOption,
          optionProps: { onModify: this.onModify },
        }, {
          OptionConstructor: AIPDeleteOption,
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
                title={formatMessage({ id: 'oais.packages.tooltip.type' })}
                style={filter.fieldStyle}
                hintText={formatMessage({
                  id: 'oais.packages.list.filters.type',
                })}
                value={appliedFilters.type}
                onChange={this.changeTypeFilter}
              >
                {map(DamDomain.ENTITY_TYPES, type => <MenuItem key={type} value={type} primaryText={type} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
              <SelectField
                autoWidth
                title={formatMessage({ id: 'oais.packages.tooltip.state' })}
                style={filter.fieldStyle}
                hintText={formatMessage({
                  id: 'oais.packages.list.filters.state',
                })}
                value={appliedFilters.state}
                onChange={this.changeStateFilter}
              >
                {map(IngestDomain.AIP_STATUS, state => <MenuItem key={state} value={state} primaryText={state} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
              <SelectField
                autoWidth
                title={formatMessage({ id: 'oais.packages.tooltip.storage' })}
                disabled={isEmpty(storages)}
                style={filter.fieldStyle}
                hintText={formatMessage({
                  id: 'oais.packages.list.filters.storage',
                })}
                value={appliedFilters.storage || ''}
                onChange={this.changeStorageFilter}
              >
                {map(storages, storage => <MenuItem key={storage} value={storage} primaryText={storage} />)}
                <MenuItem key="" value="" primaryText="" />
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="modifySelection"
                title={formatMessage({ id: 'oais.packages.tooltip.selection.modify' })}
                label={formatMessage({ id: 'oais.packages.list.filters.buttons.modify' })}
                icon={<Filter />}
                onClick={this.onModifySelection}
                disabled={isEmpty(tableSelection)}
              />
              <FlatButton
                key="deleteSelection"
                title={formatMessage({ id: 'oais.packages.tooltip.selection.delete' })}
                label={formatMessage({ id: 'oais.packages.list.filters.buttons.delete' })}
                icon={<Filter />}
                onClick={this.onDeleteSelection}
                disabled={isEmpty(tableSelection)}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
          <PageableInfiniteTableContainer
            name="package-management-table"
            pageActions={aipActions}
            pageSelectors={aipSelectors}
            pageSize={pageSize}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={contextRequestURLParameters}
            bodyParams={contextRequestBodyParameters}
            emptyComponent={OAISPackageManagerComponent.EMPTY_COMPONENT}
            fetchUsingPostMethod
          />
        </TableLayout>
        {this.renderAIPDetail()}
        {this.renderSIPDetail()}
        {this.renderDeleteConfirmDialog()}
        {this.renderDeleteSelectionConfirmDialog()}
        {this.renderModifyDialog()}
        {this.renderModifySelectionDialog()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISPackageManagerComponent))
