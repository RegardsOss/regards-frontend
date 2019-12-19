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
class OAISPackageManagerComponent extends React.Component {
  static propTypes = {
    updateStateFromFeatureManagerFilters: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
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

  static COLUMN_KEY_TO_QUERY = {
    PROVIDER_ID: 'column.providerId',
    STATE: 'column.state',
    LASTUPDATE: 'column.lastUpdate',
    VERSION: 'column.version',
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
      sessionOwner, session, providerId, from, to, ipType, state, storage,
    } = appliedFilters
    const newFilters = {}
    if (sessionOwner) {
      newFilters.sessionOwner = sessionOwner
    }
    if (session) {
      newFilters.name = session
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
    if (ipType) {
      newFilters.ipType = ipType
    }
    if (state) {
      newFilters.state = state
    }
    if (storage) {
      newFilters.storages = [storage]
    }
    const requestParameters = {
      sort: columnsSorting.map(({ columnKey, order }) => `${OAISPackageManagerComponent.COLUMN_KEY_TO_QUERY[columnKey]},${OAISPackageManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`),
      ...newFilters,
    }
    return requestParameters
  }

  state = {
    tableRequestParameters: {},
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
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

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
      contextRequestParameters: OAISPackageManagerComponent.buildRequestParameters([], { ...featureManagerFilters, ...appliedFilters }),
      tableRequestParameters: OAISPackageManagerComponent.buildRequestParameters(columnsSorting, { ...featureManagerFilters, ...appliedFilters }),
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
    this.onFilterUpdated({ state: values })
  }

  changeTypeFilter = (event, index, values) => {
    this.onFilterUpdated({ ipType: values })
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
        sipIds: [
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
            sipIds: map(tableSelection, entity => entity.content.sip.sipId),
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
            sipIds: map(tableSelection, entity => entity.content.sip.sipId),
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

  onConfirmModify = (params) => {
    this.onCloseModifyDialog()
    this.onCloseModifySelectionDialog()
    // const { intl: { formatMessage } } = this.context
    const { requestParameters, appliedFilters } = this.state
    const { modifyAips } = this.props
    const finalModifyPayload = {
      ...requestParameters,
      ...appliedFilters,
      ...params,
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
      // modifyPayload: {
      //   selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.INCLUDE,
      //   sipIds: [
      //     aipToModify.content.aipId,
      //   ],
      // },
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
          contextRequestParameters={this.state.contextRequestParameters}
          onClose={this.onCloseModifyDialog}
        />
      )
    }
    return null
  }

  onModifySelection = () => {
    this.setState({
      isModifySelectionDialogOpened: true,
    })
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
          contextRequestParameters={this.state.contextRequestParameters}
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
    const { appliedFilters, tableRequestParameters, columnsSorting } = this.state

    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, aipTableActions, aipTableSelectors)
        .build(),
      new TableColumnBuilder('column.providerId').titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.providerId'), this.onSort)
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.aip.ipType')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell().propertyRenderCell('content.state')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.state'), this.onSort)
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder('column.lastUpdate').titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.lastUpdate'), this.onSort)
        .fixedSizing(200)
        .build(),
      new TableColumnBuilder('column.version').titleHeaderCell().propertyRenderCell('content.aip.version')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.version' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.version'), this.onSort)
        .fixedSizing(100)
        .build(),
      new TableColumnBuilder('column.storages').titleHeaderCell().propertyRenderCell('content.storages', StorageArrayRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.data.storages' }))
        .fixedSizing(300)
        .build(),
      new TableColumnBuilder('column.actions').titleHeaderCell()
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
                value={appliedFilters.ipType}
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
            requestParams={tableRequestParameters}
            emptyComponent={OAISPackageManagerComponent.EMPTY_COMPONENT}
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
