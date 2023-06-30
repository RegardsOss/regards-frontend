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
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableColumnsVisibilityOption, TableHeaderLoadingComponent, TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import AccountEditComponent from './render/AccountEditComponent'
import AccountAcceptComponent from './render/AccountAcceptComponent'
import AccountRefuseComponent from './render/AccountRefuseComponent'
import ProjectsRenderComponent from './render/ProjectsRenderComponent'
import AccountEnableComponent from './render/AccountEnableComponent'
import AccountDeleteComponent from './render/AccountDeleteComponent'
import StatusRenderComponent from './render/StatusRenderComponent'

/**
 * React component to list all REGARDS account.
 */
export class AccountTableListComponent extends React.Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    pageSize: PropTypes.number,
    onAccept: PropTypes.func,
    onRefuse: PropTypes.func,
    onEnable: PropTypes.func,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    isFetchingActions: PropTypes.bool.isRequired,
    pageMeta: PropTypes.shape({
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
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
    EMAIL: 'email',
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    STATUS: 'status',
    ORIGIN: 'origin',
    PROJECTS: 'projects',
    ACTIONS: 'column.table.options',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="account.list.table.content.loading"
      Icon={SearchIcon}
    />)

  static EMPTY_COMPONENT = (
    <NoContentComponent
      titleKey="account.list.table.no.content.title"
      messageKey="account.list.all.no.content.message"
      Icon={AddToPhotos}
    />)

  state = {
    deleteDialogOpened: false,
    refuseDialogOpened: false,
    entityToDeleteOrRefuse: null,
  }

  onToggleDeleteDialog = (entity = null) => {
    this.setState({
      deleteDialogOpened: !this.state.deleteDialogOpened,
      entityToDeleteOrRefuse: entity,
    })
  }

  onToggleRefuseDialog = (entity = null) => {
    this.setState({
      deleteDialogOpened: !this.state.refuseDialogOpened,
      entityToDeleteOrRefuse: entity,
    })
  }

  /**
   * Renders account deletion confirmation dialog
   */
  renderDeleteConfirmDialog = () => {
    const { onDelete } = this.props
    const { entityToDeleteOrRefuse, deleteDialogOpened } = this.state
    const { intl: { formatMessage } } = this.context
    const name = get(entityToDeleteOrRefuse, 'content.email', '')
    const title = formatMessage({ id: 'account.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => onDelete(entityToDeleteOrRefuse.content.id)}
          onClose={this.onToggleDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  /**
   * Renders account refusal confirmation dialog
   */
  renderRefuseConfirmDialog = () => {
    const { onRefuse } = this.props
    const { entityToDeleteOrRefuse, refuseDialogOpened } = this.state
    const { intl: { formatMessage } } = this.context
    const name = get(entityToDeleteOrRefuse, 'content.email', '')
    const title = formatMessage({ id: 'account.list.refuse.message' })
    const message = formatMessage({ id: 'account.list.refuse.message.detail' }, { name })
    return (<ConfirmDialogComponent
      open={refuseDialogOpened}
      dialogType={ConfirmDialogComponentTypes.REFUSE}
      onConfirm={() => onRefuse(entityToDeleteOrRefuse.content.email)}
      onClose={this.onToggleRefuseDialog}
      title={title}
      message={message}
    />)
  }

  render() {
    const {
      isFetchingActions,
      onEdit, onAccept, onEnable, isFetching,
      pageSize,
      requestParameters, columnsVisibility, onChangeColumnsVisibility,
      getColumnSortingData, onSort, pageMeta,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountTableListComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'account.list.table.email' }))
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...getColumnSortingData(AccountTableListComponent.COLUMN_KEYS.EMAIL), onSort)
        .build(),
      // 2 - firstname
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountTableListComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'account.list.table.firstname' }))
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(AccountTableListComponent.COLUMN_KEYS.FIRSTNAME), onSort)
        .build(),
      // 3 - lastname
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountTableListComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'account.list.table.lastname' }))
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(AccountTableListComponent.COLUMN_KEYS.LASTNAME), onSort)
        .build(),
      // 3 - status
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountTableListComponent.COLUMN_KEYS.STATUS}`, StatusRenderComponent)
        .label(formatMessage({ id: 'account.list.table.status' }))
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.STATUS, true))
        .sortableHeaderCell(...getColumnSortingData(AccountTableListComponent.COLUMN_KEYS.STATUS), onSort)
        .build(),
      // 4 - origin
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.ORIGIN)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountTableListComponent.COLUMN_KEYS.ORIGIN}`)
        .label(formatMessage({ id: 'account.list.table.origin' }))
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.ORIGIN, true))
        .sortableHeaderCell(...getColumnSortingData(AccountTableListComponent.COLUMN_KEYS.ORIGIN), onSort)
        .build(),
      // 5 - project
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.PROJECTS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountTableListComponent.COLUMN_KEYS.PROJECTS}`, ProjectsRenderComponent)
        .label(formatMessage({ id: 'account.list.table.projects' }))
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.PROJECTS, true))
        .sortableHeaderCell(...getColumnSortingData(AccountTableListComponent.COLUMN_KEYS.PROJECTS), onSort)
        .build(),
      // 6 - options
      new TableColumnBuilder(AccountTableListComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, AccountTableListComponent.COLUMN_KEYS.ACTIONS, true))
        .label(formatMessage({ id: 'account.list.table.action' }))
        .optionsColumn([{
          OptionConstructor: AccountEditComponent,
          optionProps: {
            onEdit,
            isFetchingActions,
          },
        }, {
          OptionConstructor: AccountAcceptComponent,
          optionProps: {
            onAccept,
            isFetchingActions,
          },
        }, {
          OptionConstructor: AccountRefuseComponent,
          optionProps: {
            onOpenRefuseDialog: this.onToggleRefuseDialog,
            isFetchingActions,
          },
        }, {
          OptionConstructor: AccountEnableComponent,
          optionProps: {
            onEnable,
            isFetchingActions,
          },
        }, {
          OptionConstructor: AccountDeleteComponent,
          optionProps: {
            onOpenDeleteDialog: this.onToggleDeleteDialog,
            isFetchingActions,
          },
        }])
        .build(),
    ]

    return (
      <TableLayout>
        <TableHeaderLine>
          {/* 1 - accounts count */}
          <TableHeaderContentBox>
            {formatMessage({ id: 'account.list.info.nb.accounts' }, { value: get(pageMeta, 'totalElements', 0) })}
          </TableHeaderContentBox>
          {/* 2 - loading */}
          <TableHeaderLoadingComponent loading={isFetching} />
          {/* 3 - table options  */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
            </TableHeaderOptionGroup>
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        <PageableInfiniteTableContainer
          name="accounts-list-table"
          pageActions={accountActions}
          pageSelectors={accountSelectors}
          pageSize={pageSize}
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          columns={columns}
          requestParams={requestParameters}
          emptyComponent={isFetching ? AccountTableListComponent.LOADING_COMPONENT : AccountTableListComponent.EMPTY_COMPONENT}
        />
        {this.renderDeleteConfirmDialog()}
        {this.renderRefuseConfirmDialog()}
      </TableLayout>
    )
  }
}

export default AccountTableListComponent
