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
import isEqual from 'lodash/isEqual'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import { AdminShapes, CommonShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea,
  TableHeaderContentBox, TableHeaderLoadingComponent,
  TableFilterSortingAndVisibilityContainer,
} from '@regardsoss/components'
import isString from 'lodash/isString'
import isEmpty from 'lodash/isEmpty'
import { projectUserActions, projectUserSelectors } from '../../clients/ProjectUserClient'
import NoUserComponent from './NoUserComponent'
import ProjectUserStatusRenderCell from './render/ProjectUserStatusRenderCell'
import EditProjectUserComponent from './options/EditProjectUserComponent'
import DeleteProjectUserComponent from './options/DeleteProjectUserComponent'
import DenyAccessComponent from './options/DenyAccessComponent'
import AllowAccessComponent from './options/AllowAccessComponent'
import SendEmailComponent from './options/SendEmailComponent'
import ProjectUserAccountFiltersComponent from './filters/ProjectUserAccountFiltersComponent'
import ACCOUNT_FILTERS from '../../domain/AccountFilters'
import HeaderActionsBar from './HeaderActionsBar'
import { getQueryString } from '../../domain/QueryUtils'

const DIALOG_TYPES = {
  DELETE_DIALOG: 'deleteDialog',
  EMAIL_CONFIRMATION_DIALOG: 'emailConfirmationDialog',
}

export class ProjectUserAccountComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    csvLink: PropTypes.string.isRequired,
    totalElements: PropTypes.number.isRequired,
    origins: CommonShapes.ServiceProviderList.isRequired,
    pageSize: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDeleteAccount: PropTypes.func.isRequired,
    onValidate: PropTypes.func.isRequired,
    onDeny: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
    onSendEmailConfirmation: PropTypes.func.isRequired,
    roleList: AdminShapes.RoleList.isRequired,

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
    [ACCOUNT_FILTERS.CREATED_BEFORE]: null,
    [ACCOUNT_FILTERS.CREATED_AFTER]: null,
    [ACCOUNT_FILTERS.LAST_CONNECTION_BEFORE]: null,
    [ACCOUNT_FILTERS.LAST_CONNECTION_AFTER]: null,
    [ACCOUNT_FILTERS.EMAIL]: '',
    [ACCOUNT_FILTERS.LASTNAME]: '',
    [ACCOUNT_FILTERS.FIRSTNAME]: '',
    [ACCOUNT_FILTERS.STATUS]: undefined,
    [ACCOUNT_FILTERS.ORIGIN]: undefined,
    [ACCOUNT_FILTERS.ROLE]: undefined,
  }

  static COLUMN_KEYS = {
    EMAIL: 'email',
    LASTNAME: 'lastName',
    FIRSTNAME: 'firstName',
    STATUS: 'status',
    ORIGIN: 'origin',
    CREATION_DATE: 'created',
    LAST_CONNECTION: 'lastConnection',
    ACTIONS: 'column.table.options',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="projectUser.list.table.loading.content.title"
      Icon={SearchIcon}
    />)

  state = {
    [DIALOG_TYPES.DELETE_DIALOG]: {
      open: false,
      entityToProcess: null,
    },
    [DIALOG_TYPES.EMAIL_CONFIRMATION_DIALOG]: {
      open: false,
      userEmail: '',
    },
    csvLink: '',
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      filters,
      csvLink,
    } = newProps

    if (!isEqual(filters, oldProps.filters) || csvLink !== oldProps.csvLink) {
      const queryString = getQueryString(filters)
      this.setState({
        csvLink: `${csvLink}${queryString}`,
      })
    }
  }

  onToggleDeleteDialog = (entityToProcess = null) => {
    this.setState({
      [DIALOG_TYPES.DELETE_DIALOG]: {
        open: !this.state[DIALOG_TYPES.DELETE_DIALOG].open,
        entityToProcess,
      },
    })
  }

  onToggleEmailConfirmationDialog = (userEmail = '') => {
    this.setState({
      [DIALOG_TYPES.EMAIL_CONFIRMATION_DIALOG]: {
        open: !this.state[DIALOG_TYPES.EMAIL_CONFIRMATION_DIALOG].open,
        userEmail,
      },
    })
  }

  /**
   * Renders account deletion confirmation dialog
   */
  renderDeleteConfirmDialog = () => {
    const { onDeleteAccount } = this.props
    const { open, entityToProcess } = this.state[DIALOG_TYPES.DELETE_DIALOG]
    const { intl: { formatMessage } } = this.context
    const name = get(entityToProcess, 'content.email', '')
    const title = formatMessage({ id: 'projectUser.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={open}
      >
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          onConfirm={() => onDeleteAccount(entityToProcess.content.id)}
          onClose={this.onToggleDeleteDialog}
          title={title}
        />
      </ShowableAtRender>
    )
  }

  /**
  * Renders send email confirmation confirmation dialog
  */
  renderEmailConfirmDialog = () => {
    const { onSendEmailConfirmation } = this.props
    const { intl: { formatMessage } } = this.context
    const { userEmail, open } = this.state[DIALOG_TYPES.EMAIL_CONFIRMATION_DIALOG]
    if (isString(userEmail) && !isEmpty(userEmail)) {
      const title = formatMessage({ id: 'projectUser.list.email.confirmation.message' }, { email: userEmail })
      return (
        <ShowableAtRender
          show={open}
        >
          <ConfirmDialogComponent
            dialogType={ConfirmDialogComponentTypes.CONFIRM}
            onConfirm={() => onSendEmailConfirmation(userEmail)}
            onClose={this.onToggleEmailConfirmationDialog}
            title={title}
          />
        </ShowableAtRender>
      )
    }
    return null
  }

  render() {
    const {
      onEdit, onDisable, pageSize, origins, totalElements, onRefresh,
      onValidate, onDeny, isLoading, onEnable,
      getColumnSortingData, filters, requestParameters, columnsVisibility,
      onSort, updateFilter, clearFilters, onChangeColumnsVisibility,
      roleList,
    } = this.props
    const { csvLink } = this.state
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'projectUser.list.table.email' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.EMAIL), onSort)
        .build(),
      // 2 - last name
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastname' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.FIRSLASTNAMETNAME), onSort)
        .build(),
      // 3 - first name
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.firstname' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.FIRSTNAME), onSort)
        .build(),
      // 3 - status
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.STATUS)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.STATUS}`, ProjectUserStatusRenderCell)
        .label(formatMessage({ id: 'projectUser.list.table.status' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.STATUS, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.STATUS), onSort)
        .build(),
      // 4 - origin
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.ORIGIN)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.ORIGIN}`)
        .label(formatMessage({ id: 'projectUser.list.table.origin' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.ORIGIN, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.ORIGIN), onSort)
        .build(),
      // 5 - creation date
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.CREATION_DATE)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.CREATION_DATE}`)
        .label(formatMessage({ id: 'projectUser.list.table.created' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.CREATION_DATE, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.CREATION_DATE), onSort)
        .build(),
      // 6 - last connection
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.LAST_CONNECTION)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserAccountComponent.COLUMN_KEYS.LAST_CONNECTION}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastConnection' }))
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.LAST_CONNECTION, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserAccountComponent.COLUMN_KEYS.LAST_CONNECTION), onSort)
        .build(),
      // 7 - actions
      new TableColumnBuilder(ProjectUserAccountComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, ProjectUserAccountComponent.COLUMN_KEYS.ACTIONS, true))
        .label(formatMessage({ id: 'projectUser.list.table.actions' }))
        .optionsColumn([{
          // Delete
          OptionConstructor: DeleteProjectUserComponent,
          optionProps: { isLoading, onDelete: this.onToggleDeleteDialog },
        }, {
          // Edit
          OptionConstructor: EditProjectUserComponent,
          optionProps: { isLoading, onEdit },
        }, {
          // Allow access options
          OptionConstructor: AllowAccessComponent,
          optionProps: { isLoading, onValidate, onEnable },
        }, { // Deny access options
          OptionConstructor: DenyAccessComponent,
          optionProps: { isLoading, onDeny, onDisable },
        }, {
          OptionConstructor: SendEmailComponent,
          optionProps: { isLoading, onSendEmailConfirmation: this.onToggleEmailConfirmationDialog },
        }])
        .build(),
    ]

    return (
      <TableLayout>
        <TableHeaderLine>
          <ProjectUserAccountFiltersComponent
            origins={origins}
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={clearFilters}
            roleList={roleList}
          />
        </TableHeaderLine>
        <TableHeaderLine>
          {/* 1 - accounts count */}
          <TableHeaderContentBox>
            {formatMessage({ id: 'projectUser.list.info.nb.accounts' }, { value: totalElements })}
          </TableHeaderContentBox>
          {/* 2 - loading */}
          <TableHeaderLoadingComponent loading={isLoading} />
          {/* 3 - table options  */}
          <TableHeaderOptionsArea>
            <HeaderActionsBar
              csvLink={csvLink}
              columns={columns}
              requestParameters={requestParameters}
              onRefresh={onRefresh}
              onChangeColumnsVisibility={onChangeColumnsVisibility}
            />
          </TableHeaderOptionsArea>
        </TableHeaderLine>
        <PageableInfiniteTableContainer
          name="accounts-list-table"
          pageActions={projectUserActions}
          pageSelectors={projectUserSelectors}
          pageSize={pageSize}
          minRowCount={minRowCount}
          maxRowCount={maxRowCount}
          columns={columns}
          requestParams={requestParameters}
          emptyComponent={!isLoading
            ? <NoUserComponent key="no.content" hasFilter={filters !== ProjectUserAccountComponent.DEFAULT_FILTERS_STATE} />
            : ProjectUserAccountComponent.LOADING_COMPONENT}
        />
        {this.renderDeleteConfirmDialog()}
        {this.renderEmailConfirmDialog()}
      </TableLayout>
    )
  }
}

export default ProjectUserAccountComponent
