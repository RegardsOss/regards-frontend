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
import size from 'lodash/size'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import Refresh from 'mdi-material-ui/Refresh'
import FlatButton from 'material-ui/FlatButton'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { AdminInstanceShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, CardActionsComponent, PageableInfiniteTableContainer,
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
import AccountFiltersComponent from './filters/AccountFiltersComponent'
import AccountMessageComponent from './message/AccountMessageComponent'
import ACCOUNT_FILTERS from '../domain/AccountFilters'

/**
 * React component to list all REGARDS account.
 */
export class AccountListComponent extends React.Component {
  static propTypes = {
    allAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    waitingAccounts: PropTypes.objectOf(AdminInstanceShapes.Account),
    isFetching: PropTypes.bool.isRequired,
    pageSize: PropTypes.number.isRequired,
    onAccept: PropTypes.func.isRequired,
    onRefuse: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    origins: PropTypes.arrayOf(PropTypes.string),
    projects: AdminShapes.ProjectList.isRequired,

    // table sorting, column visiblity & filters management
    requestParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    columnsVisibility: TableFilterSortingAndVisibilityContainer.COLUMN_VISIBILITY_PROP_TYPE,
    filters: TableFilterSortingAndVisibilityContainer.FILTERS_PROP_TYPE,
    onRefresh: PropTypes.func.isRequired,
    updateFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    onChangeColumnsVisibility: PropTypes.func.isRequired,
    getColumnSortingData: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default state for filters edition
   */
  static DEFAULT_FILTERS_STATE = {
    [ACCOUNT_FILTERS.EMAIL]: '',
    [ACCOUNT_FILTERS.FIRSTNAME]: '',
    [ACCOUNT_FILTERS.LASTNAME]: '',
    [ACCOUNT_FILTERS.STATUS]: '',
    [ACCOUNT_FILTERS.ORIGIN]: '',
    [ACCOUNT_FILTERS.PROJECTS]: '',
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
      onBack, onEdit, onAccept, onEnable, isFetching,
      pageSize, origins, projects, waitingAccounts, allAccounts, onRefresh,
      requestParameters, columnsVisibility, updateFilter, clearFilters, onChangeColumnsVisibility,
      getColumnSortingData, onSort, filters,
    } = this.props
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'account.list.table.email' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...getColumnSortingData(AccountListComponent.COLUMN_KEYS.EMAIL), onSort)
        .build(),
      // 2 - firstname
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'account.list.table.firstname' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(AccountListComponent.COLUMN_KEYS.FIRSTNAME), onSort)
        .build(),
      // 3 - lastname
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'account.list.table.lastname' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(AccountListComponent.COLUMN_KEYS.LASTNAME), onSort)
        .build(),
      // 3 - status
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.STATUS}`)
        .label(formatMessage({ id: 'account.list.table.status' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.STATUS, true))
        .sortableHeaderCell(...getColumnSortingData(AccountListComponent.COLUMN_KEYS.STATUS), onSort)
        .build(),
      // 4 - origin
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.ORIGIN)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.ORIGIN}`)
        .label(formatMessage({ id: 'account.list.table.origin' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.ORIGIN, true))
        .sortableHeaderCell(...getColumnSortingData(AccountListComponent.COLUMN_KEYS.ORIGIN), onSort)
        .build(),
      // 5 - project
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.PROJECTS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.PROJECTS}`, ProjectsRenderComponent)
        .label(formatMessage({ id: 'account.list.table.projects' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.PROJECTS, true))
        .sortableHeaderCell(...getColumnSortingData(AccountListComponent.COLUMN_KEYS.PROJECTS), onSort)
        .build(),
      // 6 - options
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.ACTIONS, true))
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
      <Card>
        <CardTitle title={formatMessage({ id: 'accounts.title' })} subtitle={formatMessage({ id: 'accounts.subtitle' })} />
        <CardText>
          <AccountMessageComponent
            waitingAccounts={waitingAccounts}
            updateFilter={updateFilter}
          />
          <TableLayout>
            <TableHeaderLine>
              <AccountFiltersComponent
                origins={origins}
                projects={projects}
                filters={filters}
                updateFilter={updateFilter}
                clearFilters={clearFilters}
              />
            </TableHeaderLine>
            <TableHeaderLine>
              {/* 1 - accounts count */}
              <TableHeaderContentBox>
                {formatMessage({ id: 'account.list.info.nb.accounts' }, { value: size(allAccounts) || 0 })}
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
                  <FlatButton
                    label={formatMessage({ id: 'account.list.refresh' })}
                    icon={<Refresh />}
                    onClick={onRefresh}
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
              emptyComponent={isFetching ? AccountListComponent.LOADING_COMPONENT : AccountListComponent.EMPTY_COMPONENT}
            />
          </TableLayout>
          {this.renderDeleteConfirmDialog()}
          {this.renderRefuseConfirmDialog()}
        </CardText>
        <CardActions>
          <CardActionsComponent
            secondaryButtonLabel={formatMessage({ id: 'account.list.action.cancel' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccountListComponent
