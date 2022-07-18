/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import map from 'lodash/map'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea,
  TableHeaderContentBox, TableHeaderLoadingComponent,
  TableFilterSortingAndVisibilityContainer,
  TableSelectionModes,
} from '@regardsoss/components'
import { CommonDomain, WorkerDomain } from '@regardsoss/domain'
import DIALOG_TYPES from '../domain/dialogTypes'
import DeleteRequestComponent from './options/DeleteRequestComponent'
import RetryRequestComponent from './options/RetryRequestComponent'
import HeaderActionsBarContainer from '../containers/HeaderActionsBarContainer'
import StatusRender from './render/StatusRender'
import ErrorDetailsDialog from './dialogs/ErrorDetailsDialog'
import { requestActions, requestSelectors } from '../clients/WorkerRequestClient'
import { tableActions, tableSelectors } from '../clients/TableClient'

/**
 * @author Théo Lasserre
 */
class DataPreparationTableComponent extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onDeleteRequest: PropTypes.func,
    onRetryRequest: PropTypes.func,
    numberOfRequests: PropTypes.number.isRequired,
    pageSize: PropTypes.number,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    bodyParameters: TableFilterSortingAndVisibilityContainer.BODY_PARAMETERS_PROP_TYPE,
    columnsVisibility: TableFilterSortingAndVisibilityContainer.COLUMN_VISIBILITY_PROP_TYPE,
    onChangeColumnsVisibility: PropTypes.func,
    getColumnSortingData: PropTypes.func,
    onSort: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static COLUMN_KEYS = {
    SOURCE: 'source',
    SESSION: 'session',
    CONTENT_TYPE: 'contentType',
    STATUS: 'status',
    WORKER_TYPE: 'dispatchedWorkerType',
    CREATION_DATE: 'creationDate',
    ACTIONS: 'column.table.options',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="datapreparation.table.loading.content.title"
      Icon={SearchIcon}
    />)

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="datapreparation.table.no.content.title"
      messageKey="datapreparation.table.no.content.message"
      Icon={AddToPhotos}
    />)

  state = {
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
      multiple: false,
    },
    [DIALOG_TYPES.RETRY_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
      multiple: false,
    },
    [DIALOG_TYPES.ERRORS_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  }

  onOpenActionDialog = (dialogType, entities, mode = TableSelectionModes.includeSelected, multiple = false) => this.setState({
    [dialogType]: {
      open: true,
      mode,
      entities,
      multiple,
    },
  })

  onCloseActionDialog = (dialogType) => this.setState({
    [dialogType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  })

  /**
   * Callback: On view request error for request as parameter (shows corresponding dialog)
   * @param {[*]} entity to view as an IngestShapes.RequestEntity
   */
  onViewRequestErrors = (entity) => this.onOpenActionDialog(DIALOG_TYPES.ERRORS_DIALOG, [entity], TableSelectionModes.includeSelected)

  onRetry = (entities, mode, multiple) => this.onOpenActionDialog(DIALOG_TYPES.RETRY_DIALOG, entities, mode, multiple)

  onDelete = (entities, mode, multiple) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, entities, mode, multiple)

  onConfirmActionDialog = (dialogRequestType) => {
    const { requestParameters } = this.props
    const { entities, mode, multiple } = this.state[dialogRequestType]
    const payload = {
      ...requestParameters,
      [WorkerDomain.REQUEST_FILTERS.IDS]: {
        [CommonDomain.REQUEST_PARAMETERS.VALUES]: multiple ? map(entities, (e) => e.content.id) : [get(entities, 'content.id', '')],
        [CommonDomain.REQUEST_PARAMETERS.MODE]: mode === TableSelectionModes.includeSelected ? TableSelectionModes.INCLUDE : TableSelectionModes.EXCLUDE,
      },
    }
    this.onCloseActionDialog(dialogRequestType)
    return payload
  }

  onConfirm = (dialogType) => {
    const { onRetryRequest, onDeleteRequest } = this.props
    const payload = this.onConfirmActionDialog(dialogType)
    switch (dialogType) {
      case DIALOG_TYPES.RETRY_DIALOG:
        onRetryRequest(payload)
        break
      case DIALOG_TYPES.DELETE_DIALOG:
        onDeleteRequest(payload)
        break
      default:
        console.error('Invalid dialogue type : ', dialogType)
    }
  }

  renderDialog = (dialogType) => {
    const { intl: { formatMessage } } = this.context
    const { open } = this.state[dialogType]
    if (open) {
      let title
      let dialogConfirmType
      switch (dialogType) {
        case DIALOG_TYPES.RETRY_DIALOG:
          dialogConfirmType = ConfirmDialogComponentTypes.CONFIRM
          title = formatMessage({ id: 'datapreparation.table.actions.retry.title' })
          break
        case DIALOG_TYPES.DELETE_DIALOG:
          dialogConfirmType = ConfirmDialogComponentTypes.DELETE
          title = formatMessage({ id: 'datapreparation.table.actions.delete.title' })
          break
        case DIALOG_TYPES.ERRORS_DIALOG:
          return <ErrorDetailsDialog
            entity={this.state[dialogType].entities[0]}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
        default:
      }
      return (<ConfirmDialogComponent
        dialogType={dialogConfirmType}
        onConfirm={() => this.onConfirm(dialogType)}
        onClose={() => this.onCloseActionDialog(dialogType)}
        title={title}
      />)
    }
    return null
  }

  render() {
    const {
      pageSize, isLoading,
      getColumnSortingData, columnsVisibility,
      onSort, onChangeColumnsVisibility,
      numberOfRequests, bodyParameters,
      requestParameters,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [
      new TableColumnBuilder()
        .selectionColumn(true, requestSelectors, tableActions, tableSelectors)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.SOURCE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${DataPreparationTableComponent.COLUMN_KEYS.SOURCE}`)
        .label(formatMessage({ id: 'datapreparation.table.header.source' }))
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.SOURCE, true))
        .sortableHeaderCell(...getColumnSortingData(DataPreparationTableComponent.COLUMN_KEYS.SOURCE), onSort)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.SESSION)
        .titleHeaderCell()
        .propertyRenderCell(`content.${DataPreparationTableComponent.COLUMN_KEYS.SESSION}`)
        .label(formatMessage({ id: 'datapreparation.table.header.session' }))
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.SESSION, true))
        .sortableHeaderCell(...getColumnSortingData(DataPreparationTableComponent.COLUMN_KEYS.SESSION), onSort)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.CONTENT_TYPE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${DataPreparationTableComponent.COLUMN_KEYS.CONTENT_TYPE}`)
        .label(formatMessage({ id: 'datapreparation.table.header.contentType' }))
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.CONTENT_TYPE, true))
        .sortableHeaderCell(...getColumnSortingData(DataPreparationTableComponent.COLUMN_KEYS.CONTENT_TYPE), onSort)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.CREATION_DATE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${DataPreparationTableComponent.COLUMN_KEYS.CREATION_DATE}`)
        .label(formatMessage({ id: 'datapreparation.table.header.creationDate' }))
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.CREATION_DATE, true))
        .sortableHeaderCell(...getColumnSortingData(DataPreparationTableComponent.COLUMN_KEYS.CREATION_DATE), onSort)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.WORKER_TYPE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${DataPreparationTableComponent.COLUMN_KEYS.WORKER_TYPE}`)
        .label(formatMessage({ id: 'datapreparation.table.header.workerType' }))
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.WORKER_TYPE, true))
        .sortableHeaderCell(...getColumnSortingData(DataPreparationTableComponent.COLUMN_KEYS.WORKER_TYPE), onSort)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: StatusRender, props: { onViewRequestErrors: this.onViewRequestErrors } })
        .label(formatMessage({ id: 'datapreparation.table.header.status' }))
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.STATUS, true))
        .sortableHeaderCell(...getColumnSortingData(DataPreparationTableComponent.COLUMN_KEYS.STATUS), onSort)
        .build(),
      new TableColumnBuilder(DataPreparationTableComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, DataPreparationTableComponent.COLUMN_KEYS.ACTIONS, true))
        .label(formatMessage({ id: 'datapreparation.table.header.actions' }))
        .optionsColumn([{
          OptionConstructor: RetryRequestComponent,
          optionProps: { isLoading, onRetry: this.onRetry },
        }, {
          OptionConstructor: DeleteRequestComponent,
          optionProps: { isLoading, onDelete: this.onDelete },
        }])
        .build(),
    ]
    return (
      <TableLayout>
        <TableHeaderLine>
          <TableHeaderContentBox>
            {formatMessage({ id: 'datapreparation.table.info.nb.requests' }, { value: numberOfRequests })}
          </TableHeaderContentBox>
          <TableHeaderLoadingComponent loading={isLoading} />
          <TableHeaderOptionsArea>
            <HeaderActionsBarContainer
              columns={columns}
              onChangeColumnsVisibility={onChangeColumnsVisibility}
              onDelete={this.onDelete}
              onRetry={this.onRetry}
            />
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        <PageableInfiniteTableContainer
          name="worker-request-list-table"
          pageActions={requestActions}
          pageSelectors={requestSelectors}
          pageSize={pageSize}
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          columns={columns}
          requestParams={requestParameters}
          bodyParams={bodyParameters}
          fetchUsingPostMethod
          emptyComponent={isLoading ? DataPreparationTableComponent.LOADING_COMPONENT : DataPreparationTableComponent.EMPTY_COMPONENT}
        />
        {this.renderDialog(DIALOG_TYPES.RETRY_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.ERRORS_DIALOG)}
      </TableLayout>
    )
  }
}
export default DataPreparationTableComponent
