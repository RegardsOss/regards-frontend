/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import isNil from 'lodash/isNil'
import isNull from 'lodash/isNull'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import Refresh from 'mdi-material-ui/Refresh'
import NoContentIcon from 'mdi-material-ui/CropFree'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableSelectionModes,
  DateValueRender, NoContentComponent, TableHeaderLine,
} from '@regardsoss/components'
import { withResourceDisplayControl, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import FlatButton from 'material-ui/FlatButton'
import ModeEdit from 'mdi-material-ui/Pencil'
import Delete from 'mdi-material-ui/Delete'
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
import AIPPostRequestDialog from './AIPPostRequestDialog'
import AIPTypeRender from './AIPTypeRender'
import AIPStatusRender from './AIPStatusRender'
import dependencies from '../../dependencies'

const ResourceFlatButton = withResourceDisplayControl(FlatButton)
/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
export class OAISPackageManagerComponent extends React.Component {
  static propTypes = {
    updateStateFromFeatureManagerFilters: PropTypes.func.isRequired,
    updateStateFromPackageManager: PropTypes.func.isRequired,
    pageMeta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    pageSize: PropTypes.number.isRequired,
    featureManagerFilters: OAISCriterionShape,
    productFilters: OAISCriterionShape,
    storages: PropTypes.arrayOf(PropTypes.string),
    fetchPage: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    deleteAips: PropTypes.func.isRequired,
    modifyAips: PropTypes.func.isRequired,
    tableSelection: PropTypes.arrayOf(IngestShapes.AIPEntity),
    selectionMode: PropTypes.string.isRequired,
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
      sessionOwner, session, providerId, from, to,
      type, state, storage, last,
    } = appliedFilters
    let contextRequestBodyParameters = {}
    if (sessionOwner) {
      contextRequestBodyParameters.sessionOwner = sessionOwner
    }
    if (session) {
      contextRequestBodyParameters.session = session
    }
    if (providerId) {
      // Use special % caracters to allow contains search cf FA https://thor.si.c-s.fr/gf/project/regards/tracker/?action=TrackerItemEdit&tracker_item_id=195896
      contextRequestBodyParameters.providerIds = [`%${providerId}%`]
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
    contextRequestBodyParameters.last = isNil(last) ? null : last
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
    deletionErrors: [],
    modifyErrors: [],
    isDeleteDialogOpened: false,
    isDeleteSelectionDialogOpened: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    this.onRequestStateUpdated(this.props.featureManagerFilters, this.props.productFilters || {}, this.state.contextRequestURLParameters)
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
    if (!isEqual(newProps.featureManagerFilters, this.props.featureManagerFilters) || !isEqual(newProps.productFilters, this.props.productFilters)) {
      this.onRequestStateUpdated(newProps.featureManagerFilters, newProps.productFilters, this.state.contextRequestURLParameters)
    }
  }

  onRequestStateUpdated = (featureManagerFilters, appliedFilters, contextRequestURLParameters) => {
    this.setState({
      contextRequestURLParameters,
      appliedFilters,
      contextRequestBodyParameters: OAISPackageManagerComponent.buildContextRequestBody({ ...featureManagerFilters, ...appliedFilters }),
    })
  }

  onRefresh = () => {
    const {
      pageMeta, pageSize, clearSelection, fetchPage,
    } = this.props
    const { contextRequestBodyParameters, contextRequestURLParameters, columnsSorting } = this.state
    let fetchPageSize = pageSize
    // compute page size to refresh all current entities in the table
    const lastPage = (pageMeta && pageMeta.number) || 0
    fetchPageSize = pageSize * (lastPage + 1)
    clearSelection()
    fetchPage(0, fetchPageSize, {}, columnsSorting, { ...contextRequestBodyParameters, ...contextRequestURLParameters })
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  buildSortURL = (columnsSorting) => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${OAISPackageManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`)

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

  /**
   * User callback: new product state filter selected
   * @param {*} event -
   * @param {*} index selected element index
   * @param {*} values selected value
   */
  onChangeStateFilter = (event, index, values) => {
    const { updateStateFromPackageManager } = this.props
    const finalNewValue = values && values !== '' ? values : undefined
    updateStateFromPackageManager({ state: finalNewValue })
  }

  /**
   * User callback: new product type filter selected
   * @param {*} event -
   * @param {*} index selected element index
   * @param {*} values selected value
   */
  onChangeTypeFilter = (event, index, values) => {
    const { updateStateFromPackageManager } = this.props
    const finalNewValue = values && values !== '' ? values : undefined
    updateStateFromPackageManager({ type: finalNewValue })
  }

  /**
   * User callback: new storage filter selected
   * @param {*} event -
   * @param {*} index selected element index
   * @param {*} values selected value
   */
  onChangeStorageFilter = (event, index, values) => {
    const { updateStateFromPackageManager } = this.props
    const finalNewValue = values && values !== '' ? values : undefined
    updateStateFromPackageManager({ storage: finalNewValue })
  }

  /**
   * User callback: new version filter selected
   * @param {*} event -
   * @param {*} index selected element index
   * @param {Boolean} values selected value (null / false / true)
   */
  onChangeVersionFilter = (event, index, values) => {
    const { updateStateFromPackageManager } = this.props
    updateStateFromPackageManager({ last: isNull(values) ? undefined : values })
  }

  onViewAIPHistory = (entity) => {
    const { updateStateFromFeatureManagerFilters } = this.props
    updateStateFromFeatureManagerFilters('providerId', entity.content.providerId)
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
    const { deletionPayload, contextRequestBodyParameters } = this.state
    const { deleteAips } = this.props
    const finalDeletionPayload = {
      ...contextRequestBodyParameters,
      ...deletionPayload,
      deletionMode,
    }
    deleteAips(finalDeletionPayload).then((actionResult) => {
      if (actionResult.error) {
        this.setState({
          deletionErrors: actionResult.error,
        })
      }
    })
  }

  onDelete = (aipToDelete) => {
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
            aipIds: map(tableSelection, (entity) => entity.content.aipId),
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isDeleteSelectionDialogOpened: true,
          deletionPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
            aipIds: map(tableSelection, (entity) => entity.content.aipId),
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

  onClosePostRequestDialog = () => {
    this.setState({
      deletionErrors: [],
      modifyErrors: [],
    })
  }

  renderPostRequestDialog = () => {
    const { deletionErrors, modifyErrors } = this.state
    if (!isEmpty(deletionErrors)) {
      return (
        <AIPPostRequestDialog
          onClose={this.onClosePostRequestDialog}
          deletionErrors={deletionErrors}
          modifyErrors={modifyErrors}
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
        this.setState({
          modifyErrors: actionResult.error,
        })
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
          contextRequestBodyParameters={this.state.modifyPayload}
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
            aipIds: map(tableSelection, (entity) => entity.content.aipId),
          },
        })
        break
      case TableSelectionModes.excludeSelected:
        this.setState({
          isModifySelectionDialogOpened: true,
          modifyPayload: {
            selectionMode: OAISPackageManagerComponent.DELETION_SELECTION_MODE.EXCLUDE,
            aipIds: map(tableSelection, (entity) => entity.content.aipId),
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
          contextRequestBodyParameters={this.state.modifyPayload}
          onClose={this.onCloseModifySelectionDialog}
        />
      )
    }
    return null
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { filter } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      pageSize, storages, tableSelection, selectionMode, productFilters,
    } = this.props
    const {
      contextRequestURLParameters, contextRequestBodyParameters,
    } = this.state
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const columns = [ // eslint wont fix: API issue
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, aipSelectors, aipTableActions, aipTableSelectors)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.PROVIDER_ID).titleHeaderCell().propertyRenderCell('content.aip.providerId')
        .label(formatMessage({ id: 'oais.aips.list.table.headers.providerId' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.PROVIDER_ID), this.onSort)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.TYPE).titleHeaderCell().propertyRenderCell('content.aip.ipType', AIPTypeRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.type' }))
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.STATE).titleHeaderCell().propertyRenderCell('content.state', AIPStatusRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.state' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.STATE), this.onSort)
        .fixedSizing(150)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.LASTUPDATE).titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(formatMessage({ id: 'oais.aips.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...this.getColumnSortingData(OAISPackageManagerComponent.COLUMN_KEYS.LASTUPDATE), this.onSort)
        .fixedSizing(200)
        .build(),
      new TableColumnBuilder(OAISPackageManagerComponent.COLUMN_KEYS.VERSION).titleHeaderCell().propertyRenderCell('content.version')
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
          <TableHeaderLine>
            <TableHeaderOptionsArea reducible>
              <TableHeaderOptionGroup>
                <SelectField
                  title={formatMessage({ id: 'oais.packages.tooltip.type' })}
                  style={filter.fieldStyle}
                  hintText={formatMessage({
                    id: 'oais.packages.list.filters.type',
                  })}
                  value={productFilters ? productFilters.type : null}
                  onChange={this.onChangeTypeFilter}
                >
                  <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'oais.package.type.any' })} />
                  {map(DamDomain.ENTITY_TYPES, (type) => <MenuItem key={type} value={type} primaryText={formatMessage({ id: `oais.package.type.${type}` })} />)}
                </SelectField>
                <SelectField
                  title={formatMessage({ id: 'oais.packages.tooltip.state' })}
                  style={filter.fieldStyle}
                  hintText={formatMessage({
                    id: 'oais.packages.list.filters.state',
                  })}
                  value={productFilters ? productFilters.state : null}
                  onChange={this.onChangeStateFilter}
                >
                  <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'oais.package.state.any' })} />
                  {map(IngestDomain.AIP_STATUS, (state) => <MenuItem key={state} value={state} primaryText={formatMessage({ id: `oais.package.state.${state}` })} />)}
                </SelectField>
                <SelectField
                  title={formatMessage({ id: 'oais.packages.tooltip.storage' })}
                  disabled={isEmpty(storages)}
                  style={filter.fieldStyle}
                  hintText={formatMessage({
                    id: 'oais.packages.list.filters.storage',
                  })}
                  value={productFilters ? productFilters.storage : null}
                  onChange={this.onChangeStorageFilter}
                >
                  <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'oais.package.storage.any' })} />
                  {map(storages, (storage) => <MenuItem key={storage} value={storage} primaryText={storage} />)}
                </SelectField>
                <SelectField
                  title={formatMessage({ id: 'oais.packages.tooltip.version' })}
                  style={filter.fieldStyle}
                  hintText={formatMessage({ id: 'oais.packages.list.filters.version' })}
                  value={productFilters && productFilters.last}
                  onChange={this.onChangeVersionFilter}
                >
                  <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'oais.package.version.any' })} />
                  <MenuItem key="last.option" value primaryText={formatMessage({ id: 'oais.package.version.last' })} />
                  <MenuItem key="older.option" value={false} primaryText={formatMessage({ id: 'oais.package.version.older' })} />
                </SelectField>
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <TableHeaderLine>
            <TableHeaderOptionsArea reducible />
            <TableHeaderOptionsArea reducible>
              <TableHeaderOptionGroup>
                <ResourceFlatButton
                  displayLogic={allMatchHateoasDisplayLogic}
                  resourceDependencies={dependencies.updateDependency}
                  hideDisabled
                  key="modifySelection"
                  title={formatMessage({ id: 'oais.packages.tooltip.selection.modify' })}
                  label={formatMessage({ id: 'oais.packages.list.filters.buttons.modify' })}
                  icon={<ModeEdit />}
                  onClick={this.onModifySelection}
                  disabled={isEmpty(tableSelection) && selectionMode === TableSelectionModes.includeSelected}
                />
                <ResourceFlatButton
                  key="deleteSelection"
                  displayLogic={allMatchHateoasDisplayLogic}
                  resourceDependencies={dependencies.deleteDependency}
                  hideDisabled
                  title={formatMessage({ id: 'oais.packages.tooltip.selection.delete' })}
                  label={formatMessage({ id: 'oais.packages.list.filters.buttons.delete' })}
                  icon={<Delete />}
                  onClick={this.onDeleteSelection}
                  disabled={isEmpty(tableSelection) && selectionMode === TableSelectionModes.includeSelected}
                />
              </TableHeaderOptionGroup>
              <TableHeaderOptionGroup>
                <FlatButton
                  label={formatMessage({ id: 'oais.packages.switch-to.refresh' })}
                  icon={<Refresh />}
                  onClick={this.onRefresh}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
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
        {this.renderPostRequestDialog()}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(OAISPackageManagerComponent))
