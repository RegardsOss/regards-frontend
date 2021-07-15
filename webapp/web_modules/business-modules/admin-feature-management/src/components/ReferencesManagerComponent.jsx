/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { CommonDomain } from '@regardsoss/domain'
import clone from 'lodash/clone'
import every from 'lodash/every'
import find from 'lodash/find'
import values from 'lodash/values'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import Refresh from 'mdi-material-ui/Refresh'
import NoContentIcon from 'mdi-material-ui/CropFree'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import {
  TableLayout, TableColumnBuilder, PageableInfiniteTableContainer,
  TableHeaderOptionsArea, TableHeaderOptionGroup, TableSelectionModes,
  DateValueRender, NoContentComponent, TableHeaderLine, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import { withResourceDisplayControl, allMatchHateoasDisplayLogic } from '@regardsoss/display-control'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import FlatButton from 'material-ui/FlatButton'
import ModeSend from 'mdi-material-ui/Send'
import Delete from 'mdi-material-ui/Delete'
import { FemShapes } from '@regardsoss/shape'
import { referencesActions, referencesSelectors } from '../clients/ReferencesClient'
import messages from '../i18n'
import styles from '../styles'
import { referencesTableSelectors, referencesTableActions } from '../clients/ReferencesTableClient'
import ReferenceDetailOption from './options/ReferenceDetailOption'
import ReferenceDeleteOption from './options/ReferenceDeleteOption'
import DeleteDialog from './options/DeleteDialog'
import ReferenceDetailDialog from './options/ReferenceDetailDialog'
import ReferenceNotifyDialog from './options/ReferenceNotifyDialog'
import ReferenceNotifyOption from './options/ReferenceNotifyOption'

const ResourceFlatButton = withResourceDisplayControl(FlatButton)

/**
* Displays the list of references
* @author Théo Lasserre
*/
export class ReferencesManagerComponent extends React.Component {
  static propTypes = {
    onRefresh: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    featureManagerFilters: PropTypes.object.isRequired,
    deleteReferences: PropTypes.func.isRequired,
    notifyReferences: PropTypes.func.isRequired,
    tableSelection: PropTypes.arrayOf(FemShapes.Reference),
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
    areAllSelected: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
  }

  static PAGE_SIZE = STATIC_CONF.TABLE.PAGE_SIZE || 20

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static EMPTY_COMPONENT = <NoContentComponent
    titleKey="feature.references.empty.results"
    Icon={NoContentIcon}
  />

  static LOADING_COMPONENT = <NoContentComponent
    titleKey="feature.references.loading.results"
    Icon={SearchIcon}
  />

  /** Possible dialog types for references */
  static DIALOG_TYPES = {
    DETAIL_DIALOG: 'detail',
    DELETE_DIALOG: 'delete',
    NOTIFY_DIALOG: 'notify',
  }

  static SELECTION_MODE = {
    INCLUDE: 'INCLUDE',
    EXCLUDE: 'EXCLUDE',
  }

  static COLUMN_KEYS = {
    PROVIDER_ID: 'providerId',
    LASTUPDATE: 'lastUpdate',
    VERSION: 'version',
    ACTIONS: 'actions',
  }

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
  }

  static buildContextRequestBody(appliedFilters) {
    const {
      source, session, providerId, from, to,
    } = appliedFilters
    const contextRequestParameters = {}
    if (source) {
      contextRequestParameters.source = source
    }
    if (session) {
      contextRequestParameters.session = session
    }
    if (providerId) {
      contextRequestParameters.providerId = providerId
    }
    if (from) {
      contextRequestParameters.from = from
    }
    if (to) {
      contextRequestParameters.to = to
    }
    return contextRequestParameters
  }

  static buildSortURL = (columnsSorting) => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${ReferencesManagerComponent.COLUMN_ORDER_TO_QUERY[order]}`)

  state = {
    [ReferencesManagerComponent.DIALOG_TYPES.DETAIL_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [ReferencesManagerComponent.DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [ReferencesManagerComponent.DIALOG_TYPES.NOTIFY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    columnsSorting: [],
    contextRequestParameters: {},
  }

  /**
    * Lifecycle method: component will mount. Used here to detect first properties change and update local state
    */
  UNSAFE_componentWillMount = () => {
    this.onFiltersUpdated(this.props.featureManagerFilters)
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
    if (!isEqual(newProps.featureManagerFilters, this.props.featureManagerFilters)) {
      this.onFiltersUpdated(newProps.featureManagerFilters)
    }
  }

  onFiltersUpdated = (featureManagerFilters) => {
    this.setState({
      contextRequestParameters: ReferencesManagerComponent.buildContextRequestBody({ ...featureManagerFilters }),
    })
  }

  onSort = (columnSortKey, order) => {
    const { columnsSorting, contextRequestParameters } = this.state

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
      contextRequestParameters: {
        ...contextRequestParameters,
        sort: ReferencesManagerComponent.buildSortURL(newColumnSorting),
      },
    })
  }

  /**
  * Inner callback: Opens dialog corresopnding to request type
  * @param {[*]} entities entities as an array of FemShapes.Reference
  * @param {string} dialogRequestType dialog type for the request to handle, from ReferencesManagerComponent.DIALOG_TYPES
  */
  onOpenActionDialog = (dialogRequestType, entities, mode = TableSelectionModes.includeSelected) => this.setState({
    [dialogRequestType]: {
      open: true,
      mode,
      entities,
    },
  })

  /**
  * Callback: On view detail reference
  * @param {[*]} entities entities as an array of FemShapes.Reference
  */
  onDetail = (entities) => this.onOpenActionDialog(ReferencesManagerComponent.DIALOG_TYPES.DETAIL_DIALOG, entities)

  /**
  * Callback: On delete requests for selection as parameter (shows corresponding dialog)
  * @param {[*]} entities entities as an array of FemShapes.Reference
  */
  onDelete = (entities, mode) => this.onOpenActionDialog(ReferencesManagerComponent.DIALOG_TYPES.DELETE_DIALOG, entities, mode)

  /**
  * Callback: On notify requests for selection as parameter (shows corresponding dialog)
  * @param {[*]} entities entities as an array of FemShapes.Reference
  */
  onNotify = (entities, mode) => this.onOpenActionDialog(ReferencesManagerComponent.DIALOG_TYPES.NOTIFY_DIALOG, entities, mode)

  /**
  * Inner callback: closes dialog corresponding to request type
  * @param {string} dialogRequestType dialog type for the request to handle, from ReferencesManagerComponent.DIALOG_TYPES
  */
  onCloseActionDialog = (dialogRequestType) => this.setState({
    [dialogRequestType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  })

  /**
  * Inner callback: confirms action dialog. It:
  * - Hides corresponding dialog
  * - Converts payload to send server action
  * @param {string} dialogRequestType dialog type for the request to handle, from ReferencesManagerComponent.DIALOG_TYPES
  * @return {*} payload for server action
  */
  onConfirmActionDialog = (dialogRequestType) => {
    const { entities, mode } = this.state[dialogRequestType]
    this.onCloseActionDialog(dialogRequestType)
    return {
      filters: {
        ...this.state.contextRequestParameters,
      },
      featureIdsSelectionMode: mode === TableSelectionModes.includeSelected
        ? ReferencesManagerComponent.SELECTION_MODE.INCLUDE
        : ReferencesManagerComponent.SELECTION_MODE.EXCLUDE,
      featureIds: map(entities, (e) => e.content.id),
    }
  }

  onConfirm = (dialogRequestType) => {
    const { deleteReferences, notifyReferences } = this.props
    const payload = this.onConfirmActionDialog(dialogRequestType)
    switch (dialogRequestType) {
      case ReferencesManagerComponent.DIALOG_TYPES.DELETE_DIALOG:
        deleteReferences(payload)
        break
      case ReferencesManagerComponent.DIALOG_TYPES.NOTIFY_DIALOG:
        notifyReferences(payload)
        break
      default:
        console.error('Invalid dialogue type', dialogRequestType)
    }
  }

  renderDialog = (dialogRequestType) => {
    const { open } = this.state[dialogRequestType]
    if (open) {
      let component = null
      switch (dialogRequestType) {
        case ReferencesManagerComponent.DIALOG_TYPES.DETAIL_DIALOG:
          component = <ReferenceDetailDialog
            reference={this.state[dialogRequestType].entities[0]}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case ReferencesManagerComponent.DIALOG_TYPES.DELETE_DIALOG:
          component = <DeleteDialog
            onConfirmDelete={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        case ReferencesManagerComponent.DIALOG_TYPES.NOTIFY_DIALOG:
          component = <ReferenceNotifyDialog
            onConfirmNotify={() => this.onConfirm(dialogRequestType)}
            onClose={() => this.onCloseActionDialog(dialogRequestType)}
          />
          break
        default:
      }
      return (component)
    }
    return null
  }

  isButtonDisabled = (dialogType) => {
    const { tableSelection, areAllSelected } = this.props
    let ret = !areAllSelected
    if (!isEmpty(tableSelection)) {
      ret = !every(tableSelection, (selection) => find(selection.links, (l) => l.rel === dialogType))
    }
    return ret
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  render() {
    const { intl: { formatMessage }, muiTheme, moduleTheme: { tableStyle: { loadingStyle } } } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const {
      onRefresh, tableSelection, selectionMode, isFetching,
    } = this.props
    const { contextRequestParameters, columnsSorting } = this.state
    // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
    const columns = [ // eslint wont fix: API issue
      // checkbox
      new TableColumnBuilder()
        .selectionColumn(true, referencesSelectors, referencesTableActions, referencesTableSelectors)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.PROVIDER_ID).titleHeaderCell().propertyRenderCell('content.providerId')
        .label(formatMessage({ id: 'feature.references.list.table.headers.providerId' }))
        .sortableHeaderCell(...this.getColumnSortingData(ReferencesManagerComponent.COLUMN_KEYS.PROVIDER_ID), this.onSort)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.LASTUPDATE).titleHeaderCell().propertyRenderCell('content.lastUpdate', DateValueRender)
        .label(formatMessage({ id: 'feature.references.list.table.headers.lastUpdate' }))
        .sortableHeaderCell(...this.getColumnSortingData(ReferencesManagerComponent.COLUMN_KEYS.LASTUPDATE), this.onSort)
        .fixedSizing(200)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.VERSION).titleHeaderCell().propertyRenderCell('content.version')
        .label(formatMessage({ id: 'feature.references.list.table.headers.version' }))
        .sortableHeaderCell(...this.getColumnSortingData(ReferencesManagerComponent.COLUMN_KEYS.VERSION), this.onSort)
        .fixedSizing(100)
        .build(),
      new TableColumnBuilder(ReferencesManagerComponent.COLUMN_KEYS.ACTIONS).titleHeaderCell()
        .label(formatMessage({ id: 'feature.references.list.filters.actions' }))
        .optionsColumn([{
          OptionConstructor: ReferenceDetailOption,
          optionProps: {
            onReferenceDetail: this.onDetail,
          },
        }, {
          OptionConstructor: ReferenceDeleteOption,
          optionProps: { onDelete: this.onDelete },
        }, {
          OptionConstructor: ReferenceNotifyOption,
          optionProps: { onNotify: this.onNotify },
        }])
        .build(),
    ]
    return (
      <div>
        <TableLayout>
          <TableHeaderLine>
            <TableHeaderOptionsArea reducible />
            <TableHeaderOptionsArea reducible>
              <TableHeaderOptionGroup>
                <ResourceFlatButton
                  displayLogic={allMatchHateoasDisplayLogic}
                  hideDisabled
                  key="notifySelection"
                  title={formatMessage({ id: 'feature.references.tooltip.selection.notify' })}
                  label={formatMessage({ id: 'feature.references.list.filters.buttons.notify' })}
                  icon={<ModeSend />}
                  onClick={() => this.onNotify(tableSelection, selectionMode)}
                  disabled={this.isButtonDisabled(ReferencesManagerComponent.DIALOG_TYPES.NOTIFY_DIALOG)}
                />
                <ResourceFlatButton
                  key="deleteSelection"
                  displayLogic={allMatchHateoasDisplayLogic}
                  hideDisabled
                  title={formatMessage({ id: 'feature.references.tooltip.selection.delete' })}
                  label={formatMessage({ id: 'feature.references.list.filters.buttons.delete' })}
                  icon={<Delete />}
                  onClick={() => this.onDelete(tableSelection, selectionMode)}
                  disabled={this.isButtonDisabled(ReferencesManagerComponent.DIALOG_TYPES.DELETE_DIALOG)}
                />
              </TableHeaderOptionGroup>
              <TableHeaderOptionGroup>
                <FlatButton
                  label={formatMessage({ id: 'dashboard.refresh' })}
                  icon={<Refresh />}
                  onClick={() => onRefresh(columnsSorting, contextRequestParameters)}
                />
              </TableHeaderOptionGroup>
            </TableHeaderOptionsArea>
          </TableHeaderLine>
          <div style={loadingStyle}>
            <TableHeaderLoadingComponent loading={isFetching} />
          </div>
          <PageableInfiniteTableContainer
            name="feature-management-table"
            pageActions={referencesActions}
            pageSelectors={referencesSelectors}
            pageSize={ReferencesManagerComponent.PAGE_SIZE}
            minRowCount={minRowCount}
            maxRowCount={maxRowCount}
            columns={columns}
            requestParams={contextRequestParameters}
            emptyComponent={isFetching ? ReferencesManagerComponent.LOADING_COMPONENT : ReferencesManagerComponent.EMPTY_COMPONENT}
          />
        </TableLayout>
        {this.renderDialog(ReferencesManagerComponent.DIALOG_TYPES.DETAIL_DIALOG)}
        {this.renderDialog(ReferencesManagerComponent.DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(ReferencesManagerComponent.DIALOG_TYPES.NOTIFY_DIALOG)}
      </div>
    )
  }
}

export default withModuleStyle(styles)(withI18n(messages)(ReferencesManagerComponent))
