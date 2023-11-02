/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
  TableFilterSortingAndVisibilityContainer, CodeDisplayDialog,
  TableSelectionModes,
} from '@regardsoss/components'
import { CommonDomain } from '@regardsoss/domain'
import { MIME_TYPES } from '@regardsoss/mime-types'
import DIALOG_TYPES from '../domain/dialogTypes'
import ViewProductComponent from './options/ViewProductComponent'
import DeleteRequestComponent from './options/DeleteRequestComponent'
import HeaderActionsBarContainer from '../containers/HeaderActionsBarContainer'
import StatusRender from './render/StatusRender'
import { requestActions, requestSelectors } from '../clients/LTAClient'
import { tableActions, tableSelectors } from '../clients/TableClient'
import { FILTER_PARAMS } from '../domain/filters'

/**
 * @author Théo Lasserre
 */
class LTAManagerTableComponent extends React.Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    onDeleteRequest: PropTypes.func,
    pageSize: PropTypes.number,
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

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
    REQUEST_ID: 'id',
    CORRELATION_ID: 'correlationId',
    OWNER: 'owner',
    STATUS: 'status',
    SESSION: 'session',
    STATUS_DATE: 'statusDate',
    DATATYPE: 'product.datatype',
    CREATION_DATE: 'creationDate',
    MODEL: 'model',
    ACTIONS: 'column.table.options',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="lta.table.loading.content.title"
      Icon={SearchIcon}
    />)

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="lta.table.no.content.title"
      messageKey="lta.table.no.content.message"
      Icon={AddToPhotos}
    />)

  state = {
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.VIEW_PRODUCT_DIALOG]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
    [DIALOG_TYPES.VIEW_MESSAGE]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  }

  onOpenActionDialog = (dialogType, entities, mode = TableSelectionModes.includeSelected) => this.setState({
    [dialogType]: {
      open: true,
      mode,
      entities,
    },
  })

  onCloseActionDialog = (dialogType) => this.setState({
    [dialogType]: {
      open: false,
      mode: TableSelectionModes.includeSelected,
      entities: [],
    },
  })

  onDeleteSelection = (entities, mode) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, entities, mode)

  onDeleteProduct = (entity) => this.onOpenActionDialog(DIALOG_TYPES.DELETE_DIALOG, [entity])

  onViewProduct = (entity) => this.onOpenActionDialog(DIALOG_TYPES.VIEW_PRODUCT_DIALOG, [entity])

  onViewMessage = (entity) => this.onOpenActionDialog(DIALOG_TYPES.VIEW_MESSAGE, [entity])

  getEntityId = (entity) => {
    const id = get(entity, `content.${LTAManagerTableComponent.COLUMN_KEYS.REQUEST_ID}`, null)
    if (!id) {
      throw new Error('Invalid entitiy. Cannot retrieve id.', entity)
    }
    return id
  }

  onConfirmActionDialog = (dialogRequestType) => {
    const { bodyParameters } = this.props
    const { entities, mode } = this.state[dialogRequestType]
    const payload = {
      ...bodyParameters,
      [FILTER_PARAMS.IDS]: {
        [CommonDomain.REQUEST_PARAMETERS.VALUES]: map(entities, (e) => this.getEntityId(e)),
        [CommonDomain.REQUEST_PARAMETERS.MODE]: mode === TableSelectionModes.includeSelected ? TableSelectionModes.INCLUDE : TableSelectionModes.EXCLUDE,
      },
    }
    this.onCloseActionDialog(dialogRequestType)
    return payload
  }

  onConfirm = (dialogType) => {
    const { onDeleteRequest } = this.props
    const payload = this.onConfirmActionDialog(dialogType)
    switch (dialogType) {
      case DIALOG_TYPES.DELETE_DIALOG:
        onDeleteRequest(payload)
        break
      default:
        console.error('Invalid dialogue type : ', dialogType)
    }
  }

  renderDialog = (dialogType) => {
    const { intl: { formatMessage } } = this.context
    const { open, mode } = this.state[dialogType]
    if (open) {
      let component = null
      switch (dialogType) {
        case DIALOG_TYPES.DELETE_DIALOG:
          component = <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.DELETE}
            message={mode === TableSelectionModes.excludeSelected ? formatMessage({ id: 'lta.table.actions.delete.message' }) : null}
            onConfirm={() => this.onConfirm(dialogType)}
            onClose={() => this.onCloseActionDialog(dialogType)}
            title={formatMessage({ id: 'lta.table.actions.delete.title' })}
          />
          break
        case DIALOG_TYPES.VIEW_PRODUCT_DIALOG:
          component = <CodeDisplayDialog
            displayedContent={get(this.state[DIALOG_TYPES.VIEW_PRODUCT_DIALOG].entities[0], 'content.product', '')}
            title={formatMessage({ id: 'lta.table.actions.view.product.title' })}
            contentType={MIME_TYPES.JSON_MIME_TYPE}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        case DIALOG_TYPES.VIEW_MESSAGE:
          component = <CodeDisplayDialog
            displayedContent={get(this.state[DIALOG_TYPES.VIEW_MESSAGE].entities[0], 'content.message', '')}
            title={formatMessage({ id: 'lta.table.actions.view.message.tooltip' })}
            contentType={MIME_TYPES.TEXT}
            onClose={() => this.onCloseActionDialog(dialogType)}
          />
          break
        default:
      }
      return (component)
    }
    return null
  }

  render() {
    const {
      pageSize, isLoading,
      getColumnSortingData, columnsVisibility,
      onSort, onChangeColumnsVisibility,
      bodyParameters,
      requestParameters, pageMeta,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [
      new TableColumnBuilder()
        .selectionColumn(true, requestSelectors, tableActions, tableSelectors)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.CORRELATION_ID)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.CORRELATION_ID}`)
        .label(formatMessage({ id: 'lta.table.header.requestId' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.CORRELATION_ID, true))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.CORRELATION_ID), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.OWNER)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.OWNER}`)
        .label(formatMessage({ id: 'lta.table.header.owner' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.OWNER, false))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.OWNER), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.SESSION)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.SESSION}`)
        .label(formatMessage({ id: 'lta.table.header.session' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.SESSION, false))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.SESSION), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.DATATYPE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.DATATYPE}`)
        .label(formatMessage({ id: 'lta.table.header.datatype' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.DATATYPE, true))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.DATATYPE), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.STATUS_DATE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.STATUS_DATE}`)
        .label(formatMessage({ id: 'lta.table.header.statusDate' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.STATUS_DATE, true))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.STATUS_DATE), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .rowCellDefinition({ Constructor: StatusRender, props: { onViewMessage: this.onViewMessage } })
        .label(formatMessage({ id: 'lta.table.header.status' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.STATUS, true))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.STATUS), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.CREATION_DATE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.CREATION_DATE}`)
        .label(formatMessage({ id: 'lta.table.header.creationDate' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.CREATION_DATE, false))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.CREATION_DATE), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.MODEL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${LTAManagerTableComponent.COLUMN_KEYS.MODEL}`)
        .label(formatMessage({ id: 'lta.table.header.model' }))
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.MODEL, false))
        .sortableHeaderCell(...getColumnSortingData(LTAManagerTableComponent.COLUMN_KEYS.MODEL), onSort)
        .build(),
      new TableColumnBuilder(LTAManagerTableComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, LTAManagerTableComponent.COLUMN_KEYS.ACTIONS, true))
        .label(formatMessage({ id: 'lta.table.header.actions' }))
        .optionsColumn([{
          OptionConstructor: ViewProductComponent,
          optionProps: { onViewProduct: this.onViewProduct },
        }, {
          OptionConstructor: DeleteRequestComponent,
          optionProps: { isLoading, onDelete: this.onDeleteProduct },
        }])
        .build(),
    ]
    return (
      <TableLayout>
        <TableHeaderLine>
          <TableHeaderContentBox>
            {formatMessage({ id: 'lta.table.info.nb.requests' }, { value: get(pageMeta, 'totalElements', 0) })}
          </TableHeaderContentBox>
          <TableHeaderLoadingComponent loading={isLoading} />
          <TableHeaderOptionsArea>
            <HeaderActionsBarContainer
              columns={columns}
              onChangeColumnsVisibility={onChangeColumnsVisibility}
              onDelete={this.onDeleteSelection}
            />
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        <PageableInfiniteTableContainer
          name="lta-request-list-table"
          pageActions={requestActions}
          pageSelectors={requestSelectors}
          tableActions={tableActions}
          pageSize={pageSize}
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          columns={columns}
          requestParams={requestParameters}
          bodyParams={bodyParameters}
          fetchUsingPostMethod
          emptyComponent={isLoading ? LTAManagerTableComponent.LOADING_COMPONENT : LTAManagerTableComponent.EMPTY_COMPONENT}
        />
        {this.renderDialog(DIALOG_TYPES.DELETE_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.VIEW_PRODUCT_DIALOG)}
        {this.renderDialog(DIALOG_TYPES.VIEW_MESSAGE)}
      </TableLayout>
    )
  }
}
export default LTAManagerTableComponent
