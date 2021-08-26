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
import { browserHistory } from 'react-router'
import get from 'lodash/get'
import size from 'lodash/size'
import Refresh from 'mdi-material-ui/Refresh'
import FlatButton from 'material-ui/FlatButton'
import SearchIcon from 'mdi-material-ui/FolderSearchOutline'
import DownloadCSVIcon from 'mdi-material-ui/BriefcaseDownload'
import { AccessShapes, UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  NoContentComponent, ConfirmDialogComponent, ConfirmDialogComponentTypes,
  ShowableAtRender, PageableInfiniteTableContainer,
  TableColumnBuilder, TableLayout, TableHeaderLine, TableHeaderOptionsArea, TableHeaderOptionGroup,
  TableHeaderContentBox, TableColumnsVisibilityOption, TableHeaderLoadingComponent,
  TableFilterSortingAndVisibilityContainer, DownloadButton,
} from '@regardsoss/components'
import { projectUserActions, projectUserSelectors } from '../../clients/ProjectUserClient'
import NoUserComponent from './NoUserComponent'
import EditProjectUserComponent from './options/EditProjectUserComponent'
import DeleteProjectUserComponent from './options/DeleteProjectUserComponent'
import EditQuotaComponent from './options/EditQuotaComponent'
import ProjectUserQuotaFiltersComponent from './filters/ProjectUserQuotaFiltersComponent'
import MaxQuotaDialogComponent from './dialog/MaxQuotaDialogComponent'
import QuotaRenderer from './render/QuotaRenderer'
import QUOTA_FILTERS from '../../domain/quotaFilters'

/**
 * ProjectUserQuotaComponent
 */
export class ProjectUserQuotaComponent extends React.Component {
  static propTypes = {
    csvLink: PropTypes.string.isRequired,
    allAccounts: AccessShapes.ProjectUserList.isRequired,
    pageSize: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDeleteAccount: PropTypes.func.isRequired,
    uiSettings: UIShapes.UISettings.isRequired,
    onSetMaxQuota: PropTypes.func.isRequired,
    showQuota: PropTypes.bool.isRequired,

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
    [QUOTA_FILTERS.EMAIL]: '',
    [QUOTA_FILTERS.LASTNAME]: '',
    [QUOTA_FILTERS.FIRSTNAME]: '',
    [QUOTA_FILTERS.QUOTA_LOW]: false,
  }

  static COLUMN_KEYS = {
    EMAIL: 'email',
    LASTNAME: 'lastName',
    FIRSTNAME: 'firstName',
    QUOTA: 'QUOTA',
    LAST_CONNEXION: 'lastConnexion',
    ACTIONS: 'actions',
  }

  static LOADING_COMPONENT = (
    <NoContentComponent
      titleKey="projectUser.list.table.loading.content.title"
      Icon={SearchIcon}
    />)

  state = {
    deleteDialogOpened: false,
    quotaDialogOpened: false,
    entityToProcess: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    const { updateFilter } = this.props
    // Extract quota filter from url
    const { query: currentQuery } = browserHistory.getCurrentLocation()
    const onlyLowQuota = get(currentQuery, QUOTA_FILTERS.QUOTA_LOW, '')
    if (onlyLowQuota) {
      updateFilter(!!onlyLowQuota, QUOTA_FILTERS.QUOTA_LOW)
    }
  }

  onClearFilters = () => {
    const { clearFilters } = this.props
    this.onUpdateLocation()
    clearFilters()
  }

  /**
   * Inner callback: updates location with user state changes (not yet reflected in class state)
   * @param {boolean} showOnlyLowQuotaUsers show only low quota users?
   */
  onUpdateLocation = (showOnlyLowQuotaUsers = false) => {
    const { pathname } = browserHistory.getCurrentLocation()
    let newQuery = {}
    if (showOnlyLowQuotaUsers) {
      newQuery = {
        [QUOTA_FILTERS.QUOTA_LOW]: 'true',
      }
    }
    browserHistory.replace({
      pathname,
      query: newQuery,
    })
  }

  /**
  * User callback: toggle only low quota
  */
  onToggleOnlyLowQuotaUsers = (onlyLowQuotaNewValue) => {
    const { updateFilter } = this.props
    this.onUpdateLocation(onlyLowQuotaNewValue)
    updateFilter(onlyLowQuotaNewValue, QUOTA_FILTERS.QUOTA_LOW)
  }

  onToggleDeleteDialog = (entity = null) => {
    this.setState({
      deleteDialogOpened: !this.state.deleteDialogOpened,
      entityToProcess: entity,
    })
  }

  onShowEditQuotaDialog = (entity) => {
    this.setState({
      quotaDialogOpened: true,
      entityToProcess: entity,
    })
  }

  /**
   * User callback: close quota edition dialog
   */
  onCloseEditQuotaDialog = () => {
    this.setState({
      quotaDialogOpened: false,
      entityToProcess: null,
    })
  }

  /**
   * User callback: confirm quota edition and close dialog
   * @param {number} maxQuota new user max quota
   */
  onConfirmQuotaEdition = (maxQuota) => {
    const { onSetMaxQuota } = this.props
    const { entityToProcess } = this.state
    onSetMaxQuota(entityToProcess, maxQuota)
    this.onCloseEditQuotaDialog()
  }

  /**
   * Renders account deletion confirmation dialog
   */
  renderDeleteConfirmDialog = () => {
    const { onDeleteAccount } = this.props
    const { entityToProcess } = this.state
    const { intl: { formatMessage } } = this.context
    const name = get(entityToProcess, 'content.email', '')
    const title = formatMessage({ id: 'projectUser.list.delete.message' }, { name })
    return (
      <ShowableAtRender
        show={this.state.deleteDialogOpened}
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

  render() {
    const {
      onEdit, pageSize, allAccounts, onRefresh, isLoading,
      getColumnSortingData, filters, requestParameters, columnsVisibility,
      onSort, updateFilter, onChangeColumnsVisibility, csvLink,
      uiSettings, showQuota,
    } = this.props
    const { quotaDialogOpened, entityToProcess } = this.state
    const { intl: { formatMessage }, muiTheme } = this.context
    const { admin: { minRowCount, maxRowCount } } = muiTheme.components.infiniteTable
    const columns = [ // eslint wont fix: Major API rework required
      // 1 - email
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL}`)
        .label(formatMessage({ id: 'projectUser.list.table.email' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.EMAIL), onSort)
        .build(),
      // 2 - last name
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastname' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.LASTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.FIRSLASTNAMETNAME), onSort)
        .build(),
      // 3 - first name
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME}`)
        .label(formatMessage({ id: 'projectUser.list.table.firstname' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.FIRSTNAME), onSort)
        .build(),
      // 3 - quota
      showQuota
        ? new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA)
          .titleHeaderCell()
          .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA}`)
          .label(formatMessage({ id: 'projectUser.list.table.quota' }))
          .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA, true))
          .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.QUOTA), onSort)
          .rowCellDefinition({
            Constructor: QuotaRenderer,
            props: {
              uiSettings,
            },
          })
          .build()
        : null,
      // 4 - last connexion
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNEXION)
        .titleHeaderCell()
        .propertyRenderCell(`content.${ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNEXION}`)
        .label(formatMessage({ id: 'projectUser.list.table.lastConnection' }))
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNEXION, true))
        .sortableHeaderCell(...getColumnSortingData(ProjectUserQuotaComponent.COLUMN_KEYS.LAST_CONNEXION), onSort)
        .build(),
      // 5 - actions
      new TableColumnBuilder(ProjectUserQuotaComponent.COLUMN_KEYS.ACTIONS)
        .titleHeaderCell()
        .visible(get(columnsVisibility, ProjectUserQuotaComponent.COLUMN_KEYS.ACTIONS, true))
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
          // edit quota option
          OptionConstructor: EditQuotaComponent,
          optionProps: { onShowEditQuotaDialog: this.onShowEditQuotaDialog },
        }])
        .build(),
    ]

    return (
      <TableLayout>
        <TableHeaderLine>
          <ProjectUserQuotaFiltersComponent
            onToggleOnlyLowQuotaUsers={this.onToggleOnlyLowQuotaUsers}
            filters={filters}
            updateFilter={updateFilter}
            clearFilters={this.onClearFilters}
          />
        </TableHeaderLine>
        <TableHeaderLine>
          {/* 1 - accounts count */}
          <TableHeaderContentBox>
            {formatMessage({ id: 'projectUser.list.info.nb.accounts' }, { value: size(allAccounts) || 0 })}
          </TableHeaderContentBox>
          {/* 2 - loading */}
          <TableHeaderLoadingComponent loading={isLoading} />
          {/* 3 - table options  */}
          <TableHeaderOptionsArea>
            <TableHeaderOptionGroup>
              <DownloadButton
                ButtonConstructor={FlatButton}
                icon={<DownloadCSVIcon />}
                label={formatMessage({ id: 'projectUser.list.exportCSV.label' })}
                downloadURL={csvLink}
                title={formatMessage({ id: 'projectUser.list.exportCSV.tooltip' })}
              />
              {/* columns visibility configuration  */}
              <TableColumnsVisibilityOption
                columns={columns}
                onChangeColumnsVisibility={onChangeColumnsVisibility}
              />
              <FlatButton
                label={formatMessage({ id: 'projectUser.list.refresh' })}
                icon={<Refresh />}
                onClick={() => onRefresh(requestParameters)}
              />
            </TableHeaderOptionGroup>
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
            ? <NoUserComponent key="no.content" hasFilter={filters !== ProjectUserQuotaComponent.DEFAULT_FILTERS_STATE} />
            : ProjectUserQuotaComponent.LOADING_COMPONENT}
        />
        <MaxQuotaDialogComponent
          open={quotaDialogOpened}
          user={entityToProcess}
          quotaWarningCount={uiSettings.quotaWarningCount}
          onClose={this.onCloseEditQuotaDialog}
          onConfirm={this.onConfirmQuotaEdition}
        />
        {this.renderDeleteConfirmDialog()}
      </TableLayout>
    )
  }
}

export default ProjectUserQuotaComponent
