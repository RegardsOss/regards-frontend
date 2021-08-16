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
import map from 'lodash/map'
import get from 'lodash/get'
import clone from 'lodash/clone'
import size from 'lodash/size'
import isEqual from 'lodash/isEqual'
import {
  Card, CardTitle, CardText, CardActions,
} from 'material-ui/Card'
import ClearFilter from 'mdi-material-ui/Backspace'
import Refresh from 'mdi-material-ui/Refresh'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import SelectField from 'material-ui/SelectField'
import AddToPhotos from 'mdi-material-ui/PlusBoxMultiple'
import FilterIcon from 'mdi-material-ui/Filter'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/IconMenu'
import { CommonDomain, AdminInstanceDomain } from '@regardsoss/domain'
import { AdminInstanceShapes, CommonShapes, AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, HelpMessageComponent, CardActionsComponent, PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableColumnsVisibilityOption, TableHeaderLoadingComponent,
} from '@regardsoss/components'
import { accountActions, accountSelectors } from '../clients/AccountClient'
import AccountEditComponent from './render/AccountEditComponent'
import AccountAcceptComponent from './render/AccountAcceptComponent'
import AccountRefuseComponent from './render/AccountRefuseComponent'
import AccountEnableComponent from './render/AccountEnableComponent'
import AccountDeleteComponent from './render/AccountDeleteComponent'

const ACCOUNT_FILTERS = {
  EMAIL: 'email',
  FIRSTNAME: 'firstName',
  LASTNAME: 'lastName',
  STATUS: 'status',
  ORIGIN: 'origin',
  PROJECT: 'project',
}

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
    onRefresh: PropTypes.func.isRequired,
    isFetchingActions: PropTypes.bool.isRequired,
    origins: CommonShapes.ServiceProviderList.isRequired,
    projects: AdminShapes.ProjectList.isRequired,
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
    [ACCOUNT_FILTERS.PROJECT]: '',
  }

  static COLUMN_KEYS = {
    EMAIL: 'email',
    FIRSTNAME: 'firstName',
    LASTNAME: 'lastName',
    STATUS: 'status',
    ORIGIN: 'origin',
    PROJECT: 'project',
    ACTIONS: 'actions',
  }

  static COLUMN_ORDER_TO_QUERY = {
    [CommonDomain.SORT_ORDERS_ENUM.ASCENDING_ORDER]: 'ASC',
    [CommonDomain.SORT_ORDERS_ENUM.DESCENDING_ORDER]: 'DESC',
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
    requestParameters: {},
    columnsSorting: [],
    filters: AccountListComponent.DEFAULT_FILTERS_STATE,
    /** columns visibility map (no assertion on child columns keys) */
    columnsVisibility: {}, // note: empty by default, when column isn't found it should be considered visible
  }

  /**
   * Update a filter
   * @param {*} newFilterValue
   * @param {*} filterElement
   */
  updateFilter = (newFilterValue, filterElement) => {
    const { filters, requestParameters } = this.state
    const newFilters = {
      ...filters,
      [filterElement]: newFilterValue && newFilterValue !== '' ? newFilterValue : undefined,
    }
    const newState = {
      filters: newFilters,
      requestParameters: {
        ...requestParameters,
        ...newFilters,
      },
    }
    this.setState(newState)
  }

  /**
   * Clear filters
   */
  clearFilters = () => {
    const { requestParameters, filters } = this.state
    const newFilters = AccountListComponent.DEFAULT_FILTERS_STATE
    if (!isEqual(filters, newFilters)) {
      this.setState({
        filters: newFilters,
        requestParameters: {
          ...requestParameters,
          ...newFilters,
        },
      })
    }
  }

  /**
   * User callbacker: user updated columns visibility (this container considers only columns keys)
   * @param {[{key, visible}]} updatedColumns updated columns
   */
  onChangeColumnsVisibility = (updatedColumns) => {
    this.setState({
      // map: associate each column key with its visible stae
      columnsVisibility: updatedColumns.reduce((acc, { key, visible }) => ({
        ...acc,
        [key]: visible,
      }), {}),
    })
  }

  getColumnSortingData = (sortKey) => {
    const { columnsSorting } = this.state
    const columnIndex = columnsSorting.findIndex(({ columnKey }) => sortKey === columnKey)
    return columnIndex === -1 ? [CommonDomain.SORT_ORDERS_ENUM.NO_SORT, null] : [columnsSorting[columnIndex].order, columnIndex]
  }

  buildSortURL = (columnsSorting) => map(columnsSorting, ({ columnKey, order }) => `${columnKey},${AccountListComponent.COLUMN_ORDER_TO_QUERY[order]}`)

  onSort = (columnSortKey, order) => {
    const { columnsSorting, requestParameters } = this.state

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
      requestParameters: {
        ...requestParameters,
        sort: this.buildSortURL(newColumnSorting),
      },
    })
  }

  /**
   * User callback: closed delete dialog
   */
  onCloseDeleteDialog = () => {
    this.setState({
      deleteDialogOpened: false,
      entityToDeleteOrRefuse: null,
    })
  }

  /**
   * User callback: opened delete dialog
   */
  onOpenDeleteDialog = (entity) => {
    this.setState({
      deleteDialogOpened: true,
      entityToDeleteOrRefuse: entity,
    })
  }

  /**
   * User callback: closed refuse dialog
   */
  onCloseRefuseDialog = () => {
    this.setState({
      refuseDialogOpened: false,
      entityToDeleteOrRefuse: null,
    })
  }

  /**
   * User callback: opened refuse dialog
   */
  onOpenRefuseDialog = (entity) => {
    this.setState({
      refuseDialogOpened: true,
      entityToDeleteOrRefuse: entity,
    })
  }

  /**
   * Renders account deletion confirmation dialog
   */
  renderDeleteConfirmDialog = () => {
    const name = this.state.entityToDeleteOrRefuse ? this.state.entityToDeleteOrRefuse.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'account.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => this.props.onDelete(this.state.entityToDeleteOrRefuse.content.id)}
          onClose={this.onCloseDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  /**
   * Renders account refusal confirmation dialog
   */
  renderRefuseConfirmDialog = () => {
    const name = this.state.entityToDeleteOrRefuse ? this.state.entityToDeleteOrRefuse.content.email : ' '
    const title = this.context.intl.formatMessage({ id: 'account.list.refuse.message' })
    const message = this.context.intl.formatMessage({ id: 'account.list.refuse.message.detail' }, { name })
    return (<ConfirmDialogComponent
      open={this.state.refuseDialogOpened}
      dialogType={ConfirmDialogComponentTypes.REFUSE}
      onConfirm={() => this.props.onRefuse(this.state.entityToDeleteOrRefuse.content.email)}
      onClose={this.onCloseRefuseDialog}
      title={title}
      message={message}
    />)
  }

  render() {
    const {
      isFetchingActions,
      onBack, onEdit, onAccept, onEnable, isFetching,
      pageSize, origins, projects, waitingAccounts, allAccounts, onRefresh,
    } = this.props
    const {
      intl: { formatMessage }, muiTheme, moduleTheme: {
        accounts: {
          messagesDiv, waitingAccountsDiv, waitingAccountsMessage, filtersDiv, fieldStyle,
          fieldWidth,
        },
      },
    } = this.context
    const {
      filters, requestParameters, columnsVisibility,
    } = this.state
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'account.list.table.email' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...this.getColumnSortingData(AccountListComponent.COLUMN_KEYS.EMAIL), this.onSort)
        .build(),
      // 2 - firstname
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'account.list.table.firstname' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...this.getColumnSortingData(AccountListComponent.COLUMN_KEYS.FIRSTNAME), this.onSort)
        .build(),
      // 3 - lastname
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'account.list.table.lastname' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...this.getColumnSortingData(AccountListComponent.COLUMN_KEYS.LASTNAME), this.onSort)
        .build(),
      // 3 - status
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.STATUS}`)
        .label(formatMessage({ id: 'account.list.table.status' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.STATUS, true))
        .sortableHeaderCell(...this.getColumnSortingData(AccountListComponent.COLUMN_KEYS.STATUS), this.onSort)
        .build(),
      // 4 - origin
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.ORIGIN)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.ORIGIN}`)
        .label(formatMessage({ id: 'account.list.table.origin' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.ORIGIN, true))
        .sortableHeaderCell(...this.getColumnSortingData(AccountListComponent.COLUMN_KEYS.ORIGIN), this.onSort)
        .build(),
      // 5 - project
      new TableColumnBuilder(AccountListComponent.COLUMN_KEYS.PROJECT)
        .titleHeaderCell()
        .propertyRenderCell(`content.${AccountListComponent.COLUMN_KEYS.PROJECT}`)
        .label(formatMessage({ id: 'account.list.table.project' }))
        .visible(get(columnsVisibility, AccountListComponent.COLUMN_KEYS.PROJECT, true))
        .sortableHeaderCell(...this.getColumnSortingData(AccountListComponent.COLUMN_KEYS.PROJECT), this.onSort)
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
            onOpenRefuseDialog: this.onOpenRefuseDialog,
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
            onOpenDeleteDialog: this.onOpenDeleteDialog,
            isFetchingActions,
          },
        }])
        .build(),
    ]

    return (
      <Card>
        <CardTitle title={formatMessage({ id: 'accounts.title' })} subtitle={formatMessage({ id: 'accounts.subtitle' })} />
        <CardText>
          <div style={messagesDiv}>
            <HelpMessageComponent
              message={formatMessage({ id: 'account.list.info.why-cant-remove-account-having-project-user' })}
            />
            <div style={waitingAccountsDiv}>
              <div style={waitingAccountsMessage}>
                {formatMessage({ id: 'account.list.info.nb.waiting.accounts' }, { value: size(waitingAccounts) || 0 })}
              </div>
              <IconButton
                onClick={() => this.updateFilter(AdminInstanceDomain.ACCOUNT_STATUS_ENUM.PENDING, ACCOUNT_FILTERS.STATUS)}
                title={formatMessage({ id: 'account.list.info.nb.waiting.accounts.filter' })}
              >
                <FilterIcon />
              </IconButton>
            </div>
          </div>
          <TableLayout>
            <TableHeaderLine>
              <div style={filtersDiv}>
                <TableHeaderOptionsArea reducible>
                  <TableHeaderOptionGroup>
                    <TextField
                      hintText={formatMessage({ id: 'account.list.table.filters.email' })}
                      value={filters[ACCOUNT_FILTERS.EMAIL]}
                      onChange={(event, value) => this.updateFilter(value, ACCOUNT_FILTERS.EMAIL)}
                      style={{ ...fieldStyle, ...fieldWidth }}
                    />
                    <TextField
                      hintText={formatMessage({ id: 'account.list.table.filters.firstname' })}
                      value={filters[ACCOUNT_FILTERS.FIRSTNAME]}
                      onChange={(event, value) => this.updateFilter(value, ACCOUNT_FILTERS.FIRSTNAME)}
                      style={{ ...fieldStyle, ...fieldWidth }}
                    />
                    <TextField
                      hintText={formatMessage({ id: 'account.list.table.filters.lastname' })}
                      value={filters[ACCOUNT_FILTERS.LASTNAME]}
                      onChange={(event, value) => this.updateFilter(value, ACCOUNT_FILTERS.LASTNAME)}
                      style={fieldWidth}
                    />
                  </TableHeaderOptionGroup>
                  <TableHeaderOptionGroup>
                    <SelectField
                      id="account.list.table.filters.status"
                      value={filters[ACCOUNT_FILTERS.STATUS]}
                      hintText={formatMessage({ id: 'account.list.table.filters.status' })}
                      onChange={(event, index, value) => this.updateFilter(value, ACCOUNT_FILTERS.STATUS)}
                      style={{ ...fieldStyle, ...fieldWidth }}
                    >
                      <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.status.any' })} />
                      {map(AdminInstanceDomain.ACCOUNT_STATUS_ENUM, (status) => (
                        <MenuItem key={status} value={status} primaryText={formatMessage({ id: `account.list.table.filters.status.${status}` })} />
                      ))}
                    </SelectField>
                    <SelectField
                      id="account.list.table.filters.origin"
                      value={filters[ACCOUNT_FILTERS.ORIGIN]}
                      hintText={formatMessage({ id: 'account.list.table.filters.origin' })}
                      onChange={(event, index, value) => this.updateFilter(value, ACCOUNT_FILTERS.ORIGIN)}
                      style={{ ...fieldStyle, ...fieldWidth }}
                    >
                      <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.origin.any' })} />
                      {map(origins, (origin) => (
                        <MenuItem key={origin} value={origin.content.name} primaryText={origin.content.name} />
                      ))}
                    </SelectField>
                    <SelectField
                      id="account.list.table.filters.project"
                      value={filters[ACCOUNT_FILTERS.PROJECT]}
                      hintText={formatMessage({ id: 'account.list.table.filters.project' })}
                      onChange={(event, index, value) => this.updateFilter(value, ACCOUNT_FILTERS.PROJECT)}
                      style={fieldWidth}
                    >
                      <MenuItem key="any.option" value={null} primaryText={formatMessage({ id: 'account.list.table.filters.project.any' })} />
                      {map(projects, (project) => (
                        <MenuItem key={project} value={project.content.name} primaryText={project.content.name} />
                      ))}
                    </SelectField>
                    <IconButton
                      title={formatMessage({ id: 'account.list.table.filters.clear' })}
                      onClick={this.clearFilters}
                    >
                      <ClearFilter />
                    </IconButton>
                  </TableHeaderOptionGroup>
                </TableHeaderOptionsArea>
              </div>
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
                    onChangeColumnsVisibility={this.onChangeColumnsVisibility}
                  />
                  <FlatButton
                    label={formatMessage({ id: 'account.list.refresh' })}
                    icon={<Refresh />}
                    onClick={() => onRefresh(requestParameters)}
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
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'account.list.action.cancel' })}
            secondaryButtonClick={onBack}
          />
        </CardActions>
      </Card>
    )
  }
}

export default AccountListComponent
