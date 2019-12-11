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

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
class OAISPackageManagerComponent extends React.Component {
  static propTypes = {
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

  static SORTABLE_COLUMNS = {
    PROVIDER_ID: 'column.providerId',
    TYPE: 'column.type',
    STATE: 'column.state',
    ACTIVE: 'column.active',
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
      processing, from, state, providerId, source, session,
    } = appliedFilters

    const newFilters = {}
    if (processing) {
      newFilters.processing = processing
    }
    if (from) {
      newFilters.from = from.toISOString()
    }
    if (state) {
      newFilters.state = state
    }
    if (source) {
      newFilters.source = source
    }
    if (session) {
      newFilters.name = session
    }
    if (providerId) {
      // Add '%' caracter at starts and ends of the string to search for matching pattern and not strict value.
      newFilters.providerId = `%${providerId}%`
    }
    const requestParameters = {
      sort: columnsSorting.map(({ columnKey, order }) => `${OAISPackageManagerComponent.COLUMN_KEY_TO_QUERY[columnKey]},${OAISPackageManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`),
      ...newFilters,
    }
    return requestParameters
  }

  state = {
    componentFilters: {},
    requestParameters: {},
    aipToView: null,
    deletionPayload: {},
    // deletionErrors: [],
    // modifySelection: [],
    isDeleteDialogOpened: false,
    isDeleteSelectionDialogOpened: false,
    columnsSorting: [],
  }

  componentWillReceiveProps(nextProps) {
    const { featureManagerFilters } = this.state
    if (!isEqual(nextProps.featureManagerFilters, featureManagerFilters)) {
      this.setState({
        requestParameters: {
          ...this.state.requestParameters,
          ...nextProps.featureManagerFilters,
        },
      })
    }
  }

  onStateUpdated = (stateDiff) => {
    // const nextState = { ...this.state, ...stateDiff }
    // nextState.requestParameters = OAISPackageManagerComponent.buildRequestParameters(nextState.columnsSorting, nextState.appliedFilters)
    // this.setState(nextState)
  }

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

  onApplyFilters = () => {
    const { componentFilters, requestParameters } = this.state
    this.setState({
      componentFilters,
      requestParameters: {
        ...requestParameters,
        ...componentFilters,
      },
    })
  }

  onFilterUpdated = (newFilterValue) => {
    const { componentFilters } = this.state
    this.setState({
      componentFilters: {
        ...componentFilters,
        ...newFilterValue,
      },
    })
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
    this.setState({
      requestParameters: {
        ...this.state.requestParameters,
        providerId: entity.content.providerId,
      },
    })
  }

  onViewAIPDetail = (aipToView) => {
    this.setState({
      aipToView: aipToView || null,
    })
  }

  onCloseDetails = () => {
    this.setState({
      aipToView: null,
    })
  }

  renderAIPDetail = () => {
    const { intl } = this.context
    const { aipToView } = this.state
    if (aipToView) {
      return (
        <Dialog
          title={intl.formatMessage({ id: 'oais.aips.list.aip-details.title' })}
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
    return null
  }

  onConfirmDelete = (deletionMode) => {
    this.onCloseDeleteDialog()
    this.onCloseDeleteSelectionDialog()
    const { deletionPayload, requestParameters, componentFilters } = this.state
    const { deleteAips } = this.props
    const finalDeletionPayload = {
      ...requestParameters,
      ...componentFilters,
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
    const { isDeleteSelectionDialogOpened, tableSelection } = this.state
    if (isDeleteSelectionDialogOpened && !isEmpty(tableSelection)) {
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
    const { requestParameters, componentFilters } = this.state
    const { modifyAips } = this.props
    const finalModifyPayload = {
      ...requestParameters,
      ...componentFilters,
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
          selection={this.props.tableSelection}
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
    const { isModifySelectionDialogOpened, tableSelection } = this.state

    if (isModifySelectionDialogOpened && !isEmpty(tableSelection)) {
      return (
        <AIPModifyDialogContainer
          featureManagerFilters={this.props.featureManagerFilters}
          onConfirmModify={this.onConfirmModify}
          requestParameters={this.state.requestParameters}
          onClose={this.onCloseModifySelectionDialog}
        />
      )
    }
    return null
  }


  render() {
    const { intl, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const { pageSize, storages } = this.props
    const { componentFilters, requestParameters, columnsSorting } = this.state

    const columns = [
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, aipTableActions, aipTableSelectors)
        .build(),
      new TableColumnBuilder('column.providerId').titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.providerId'), this.onSort)
        .build(),
      new TableColumnBuilder('column.type').titleHeaderCell().propertyRenderCell('content.aip.ipType')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.type'), this.onSort)
        .build(),
      new TableColumnBuilder('column.state').titleHeaderCell().propertyRenderCell('content.state')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.state'), this.onSort)
        .build(),
      new TableColumnBuilder('column.lastUpdate').titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.lastUpdate'), this.onSort)
        .build(),
      new TableColumnBuilder('column.version').titleHeaderCell().propertyRenderCell('content.aip.version')
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.version' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.version'), this.onSort)
        .build(),
      new TableColumnBuilder('column.storages').titleHeaderCell().propertyRenderCell('content.storages', StorageArrayRender)
        .label(intl.formatMessage({ id: 'oais.aips.list.table.headers.data.storages' }))
        .sortableHeaderCell(...OAISPackageManagerComponent.getColumnSortingData(columnsSorting, 'column.storages'), this.onSort)
        .build(),
      new TableColumnBuilder('column.actions').titleHeaderCell()
        .label(intl.formatMessage({ id: 'oais.packages.list.filters.actions' }))
        .optionsColumn([{
          OptionConstructor: AIPHistoryOption,
          optionProps: { onViewAIPHistory: this.onViewAIPHistory },
        }, {
          OptionConstructor: AIPDetailOption,
          optionProps: { onViewDetail: this.onViewAIPDetail },
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
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.type',
                })}
                value={componentFilters.type}
                onChange={this.changeTypeFilter}
              >
                {map(DamDomain.ENTITY_TYPES, type => <MenuItem key={type} value={type} primaryText={type} />)}
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.state',
                })}
                value={componentFilters.state}
                onChange={this.changeStateFilter}
              >
                {map(IngestDomain.AIP_STATUS, state => <MenuItem key={state} value={state} primaryText={state} />)}
              </SelectField>
              <SelectField
                autoWidth
                style={filter.fieldStyle}
                hintText={intl.formatMessage({
                  id: 'oais.packages.list.filters.storage',
                })}
                value={componentFilters.storage}
                onChange={this.changeStorageFilter}
              >
                {map(storages, storage => <MenuItem key={storage} value={storage} primaryText={storage} />)}
              </SelectField>
            </TableHeaderOptionGroup>
            <TableHeaderOptionGroup>
              <FlatButton
                key="applyFilters"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.apply' })}
                icon={<Filter />}
                onClick={this.onApplyFilters}
              />
              <FlatButton
                key="modifySelection"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.modify' })}
                icon={<Filter />}
                onClick={this.onModifySelection}
              />
              <FlatButton
                key="deleteSelection"
                label={this.context.intl.formatMessage({ id: 'oais.packages.list.filters.buttons.delete' })}
                icon={<Filter />}
                onClick={this.onDeleteSelection}
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
            requestParams={requestParameters}
            emptyComponent={OAISPackageManagerComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
        {this.renderAIPDetail()}
        {this.renderDeleteConfirmDialog()}
        {this.renderDeleteSelectionConfirmDialog()}
        {this.renderModifyDialog()}
        {this.renderModifySelectionDialog()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISPackageManagerComponent))
